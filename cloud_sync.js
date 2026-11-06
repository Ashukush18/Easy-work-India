/**
 * Easy Work India — Firebase Realtime Database Sync Engine
 * Stores ALL user data in Firebase so any device (phone/laptop/tablet)
 * can access accounts created by admin, anywhere in the world.
 *
 * Database: https://easy-work-india-default-rtdb.asia-southeast1.firebasedatabase.app
 */

(function (window) {
  'use strict';

  const FIREBASE_BASE     = 'https://easy-work-india-default-rtdb.asia-southeast1.firebasedatabase.app';
  const USERS_REF         = FIREBASE_BASE + '/ewi_users.json';
  const DELETED_USERS_REF = FIREBASE_BASE + '/ewi_deleted_users.json';
  const ADMIN_CRED_REF    = FIREBASE_BASE + '/ewi_admin_credentials.json';
  const USERS_KEY         = 'ewi_users_db'; // localStorage fallback key

  // Seed baseline default users (used only when Firebase & localStorage are both empty)
  const SEED_USERS = [
    {
      id: 1,
      name: 'Priya Sharma',
      username: 'priya_sharma',
      phone: '9812345678',
      email: 'priya@email.com',
      plainPassword: 'Work@2026',
      plain_password: 'Work@2026',
      project: 'Data Entry Project',
      projectKey: 'data_entry',
      project_key: 'data_entry',
      status: 'active',
      wallet_balance: '0',
      walletBalance: '0',
      wallet_history: [],
      permissions: {},
      auto_task_complete: 0,
      autoTaskComplete: false,
      joined: '01 Nov 2026'
    },
    {
      id: 2,
      name: 'Ravi Kumar',
      username: 'ravi_kumar',
      phone: '9823456789',
      email: 'ravi@email.com',
      plainPassword: 'Work@2026',
      plain_password: 'Work@2026',
      project: 'Data Entry Project',
      projectKey: 'data_entry',
      project_key: 'data_entry',
      status: 'active',
      wallet_balance: '0',
      walletBalance: '0',
      wallet_history: [],
      permissions: {},
      auto_task_complete: 0,
      autoTaskComplete: false,
      joined: '02 Nov 2026'
    },
    {
      id: 3,
      name: 'Sunita Devi',
      username: 'sunita_devi',
      phone: '9834567890',
      email: 'sunita@email.com',
      plainPassword: 'Work@2026',
      plain_password: 'Work@2026',
      project: 'Form Filling Project',
      projectKey: 'form_filling',
      project_key: 'form_filling',
      status: 'active',
      wallet_balance: '0',
      walletBalance: '0',
      wallet_history: [],
      permissions: {},
      auto_task_complete: 0,
      autoTaskComplete: false,
      joined: '02 Nov 2026'
    }
  ];

  /**
   * Convert a username/phone to a safe Firebase key
   * (Firebase keys cannot contain . # $ [ ] /)
   */
  function makeFirebaseKey(raw) {
    return String(raw || '').trim().toLowerCase().replace(/[.#$\[\]\/]/g, '_') || ('user_' + Date.now());
  }

  /**
   * Strip massive Base64 image data from a user object before saving to Firebase.
   * Keeps only credential + profile metadata (< 1KB per user).
   */
  function sanitizeForCloud(u) {
    if (!u) return null;

    const cleanUser  = (u.username  || u.userId || u.phone || '').toString().trim();
    const cleanPhone = (u.phone     || u.userId || u.username || '').toString().trim();
    const cleanPass  = (u.plainPassword || u.plain_password || u.password || 'Work@2026').toString().trim();

    // Keep photoUrl only if it's a real URL (not a multi-MB base64 data URI)
    let safePhoto = null;
    const raw = u.photoUrl || u.photo_url;
    if (raw && typeof raw === 'string' && raw.length < 500 && !raw.startsWith('data:')) {
      safePhoto = raw;
    }

    // Sanitize wallet_history — keep text entries only, strip any embedded images
    const rawHistory = Array.isArray(u.wallet_history) ? u.wallet_history
                     : Array.isArray(u.walletHistory)  ? u.walletHistory : [];
    const cleanHistory = rawHistory.map(h => {
      if (typeof h === 'string') return h;
      if (typeof h === 'object' && h) {
        return {
          date:   h.date   || '',
          type:   h.type   || '',
          amount: h.amount || 0,
          note:   h.note   || ''
        };
      }
      return null;
    }).filter(Boolean);

    return {
      id:               u.id || Date.now(),
      name:             u.name || 'Worker',
      username:         cleanUser,
      phone:            cleanPhone,
      userId:           cleanUser,
      email:            u.email   || '',
      plainPassword:    cleanPass,
      plain_password:   cleanPass,
      project:          u.project    || 'Data Entry Project',
      projectKey:       u.projectKey || u.project_key || 'data_entry',
      project_key:      u.projectKey || u.project_key || 'data_entry',
      status:           u.status  || 'active',
      address:          u.address || 'India',
      aadhaar:          u.aadhaar || '',
      panCard:          u.panCard || u.pan_card || '',
      pan_card:         u.panCard || u.pan_card || '',
      photoUrl:         safePhoto,
      wallet_balance:   String(u.wallet_balance  || u.walletBalance  || '0').replace(/[^\d.]/g, '') || '0',
      walletBalance:    String(u.wallet_balance  || u.walletBalance  || '0').replace(/[^\d.]/g, '') || '0',
      wallet_history:   cleanHistory,
      permissions:      (typeof u.permissions === 'object' && u.permissions) ? u.permissions : {},
      auto_task_complete: u.auto_task_complete ? 1 : (u.autoTaskComplete ? 1 : 0),
      autoTaskComplete:   Boolean(u.auto_task_complete || u.autoTaskComplete),
      task_completed:     u.task_completed  || 0,
      weekly_tasks_done:  u.weekly_tasks_done || 0,
      joined:             u.joined || 'Registered'
    };
  }

  // ─── localStorage helpers ────────────────────────────────────────────────────
  function getLocalUsers() {
    try {
      const stored = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      if (Array.isArray(stored)) {
        if (stored.length > 0) return stored;
        if (localStorage.getItem('ewi_initialized')) return [];
      }
    } catch (_) {}
    if (localStorage.getItem('ewi_initialized')) return [];
    return SEED_USERS.slice();
  }

  function setLocalUsers(users) {
    try {
      localStorage.setItem('ewi_initialized', 'true');
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem('ewi_all_users', JSON.stringify(users));
    } catch (_) {}
  }

  // ─── Main CloudSync API ──────────────────────────────────────────────────────
  const CloudSync = {

    /**
     * Fetch all users from Firebase Realtime Database.
     * Firebase is the master source of truth.
     * Deletions recorded in tombstones are forcefully purged.
     */
    async getUsers() {
      let firebaseUsers = null;

      try {
        const res = await fetch(USERS_REF, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === 'object' && !Array.isArray(data)) {
            firebaseUsers = Object.values(data).filter(Boolean);
          } else if (Array.isArray(data)) {
            firebaseUsers = data.filter(Boolean);
          } else if (data === null) {
            firebaseUsers = [];
          }
        }
      } catch (err) {
        console.warn('[CloudSync] Firebase getUsers failed, using local cache:', err.message);
      }

      // Fetch deletion tombstones to ensure deleted users NEVER reappear
      let deletedMap = {};
      try {
        const dRes = await fetch(DELETED_USERS_REF, { cache: 'no-store' });
        if (dRes.ok) {
          deletedMap = (await dRes.json()) || {};
        }
      } catch (_) {}

      const isUserDeleted = (u) => {
        if (!u) return true;
        const k1 = makeFirebaseKey(u.username);
        const k2 = makeFirebaseKey(u.phone);
        const k3 = makeFirebaseKey(u.userId);
        const k4 = makeFirebaseKey(u.id);
        return Boolean(deletedMap[k1] || deletedMap[k2] || deletedMap[k3] || deletedMap[k4]);
      };

      if (firebaseUsers !== null) {
        // Cloud Database is authoritative! Overwrite local cache with clean active users
        const activeUsers = firebaseUsers.filter(u => !isUserDeleted(u));
        setLocalUsers(activeUsers);
        return activeUsers;
      }

      // Offline fallback: filter local cache through tombstones
      const localUsers = getLocalUsers().filter(u => !isUserDeleted(u));
      return localUsers;
    },

    /**
     * Push sanitized full users list to Firebase.
     * Called whenever admin creates/updates/deletes a user.
     */
    async pushToCloud(users) {
      if (!Array.isArray(users)) return { ok: false, reason: 'empty' };

      if (users.length === 0) {
        setLocalUsers([]);
        try {
          await fetch(USERS_REF, {
            method:  'PUT',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({})
          });
        } catch (_) {}
        return { ok: true };
      }

      // Build a Firebase-compatible object: { username_key: userObj, ... }
      const usersObj = {};
      users.forEach(u => {
        const clean = sanitizeForCloud(u);
        if (!clean) return;
        const key = makeFirebaseKey(clean.username || clean.phone || clean.id);
        usersObj[key] = clean;
      });

      // Also save to localStorage immediately
      setLocalUsers(users);

      try {
        const controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
        const timer = controller ? setTimeout(() => controller.abort(), 3500) : null;

        const res = await fetch(USERS_REF, {
          method:  'PUT',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(usersObj),
          signal:  controller ? controller.signal : undefined
        });

        if (timer) clearTimeout(timer);

        if (res.ok) {
          console.log('[CloudSync] Firebase sync OK — ' + Object.keys(usersObj).length + ' users saved.');
          return { ok: true };
        } else {
          const text = await res.text();
          console.error('[CloudSync] Firebase PUT failed:', res.status, text);
          return { ok: false, status: res.status };
        }
      } catch (err) {
        console.warn('[CloudSync] Firebase sync timed out or unreachable (saved locally):', err.message);
        return { ok: false, reason: err.message };
      }
    },

    /**
     * Save or update a single user in Firebase and localStorage.
     */
    async saveUser(newUser) {
      const localUsers = getLocalUsers();
      const key = makeFirebaseKey(newUser.username || newUser.phone || newUser.id);
      const idx  = localUsers.findIndex(u => makeFirebaseKey(u.username || u.phone || u.id) === key);

      if (idx !== -1) {
        localUsers[idx] = Object.assign({}, localUsers[idx], newUser);
      } else {
        localUsers.unshift(newUser);
      }

      setLocalUsers(localUsers);
      // Run cloud push in background non-blocking so user creation is instantaneous
      this.pushToCloud(localUsers).catch(() => {});
      return localUsers;
    },

    /**
     * Find a user by username, phone, or id.
     * Checks tombstones first to ensure deleted users can never log in.
     */
    async findUser(loginId) {
      if (!loginId) return null;
      const clean = String(loginId).trim().toLowerCase();
      const cleanKey = makeFirebaseKey(loginId);

      // Check deletion tombstone in memory/Firebase
      try {
        const dRes = await fetch(FIREBASE_BASE + '/ewi_deleted_users/' + encodeURIComponent(cleanKey) + '.json', { cache: 'no-store' });
        if (dRes.ok) {
          const isDeleted = await dRes.json();
          if (isDeleted) return null; // User permanently deleted
        }
      } catch (_) {}

      const matchFn = u =>
        String(u.username  || '').toLowerCase().trim() === clean ||
        String(u.phone     || '').toLowerCase().trim() === clean ||
        String(u.userId    || '').toLowerCase().trim() === clean ||
        String(u.id        || '') === clean;

      // 1. Check local cache
      const localUsers = getLocalUsers();
      const localMatch = localUsers.find(matchFn);
      if (localMatch) return localMatch;

      // 2. Not in local cache (new device like a phone) — fetch fresh from Firebase
      try {
        const fresh = await this.getUsers();
        return fresh.find(matchFn) || null;
      } catch (_) {
        return null;
      }
    },

    /**
     * Delete a user permanently from Firebase and localStorage by username/phone/id.
     * Also records a tombstone in Firebase so other devices never resurrect them.
     */
    async deleteUser(loginId) {
      if (!loginId) return [];
      const cleanKey = makeFirebaseKey(loginId);

      // 1. Record tombstone in Firebase so all devices know this user is permanently deleted
      try {
        const tUrl = FIREBASE_BASE + '/ewi_deleted_users/' + encodeURIComponent(cleanKey) + '.json';
        await fetch(tUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Date.now())
        });
      } catch (_) {}

      // 2. Delete node from Firebase users
      try {
        const url = FIREBASE_BASE + '/ewi_users/' + encodeURIComponent(cleanKey) + '.json';
        await fetch(url, { method: 'DELETE' });
      } catch (_) {}

      // 3. Purge from local stores
      const localUsers = getLocalUsers().filter(u => {
        const k = makeFirebaseKey(u.username || u.phone || u.id);
        return k !== cleanKey && String(u.id) !== String(loginId) && String(u.phone) !== String(loginId) && String(u.username) !== String(loginId);
      });
      setLocalUsers(localUsers);

      // 4. Try backend SQLite DELETE if available
      try {
        await fetch('/api/users/' + encodeURIComponent(loginId), { method: 'DELETE' });
      } catch (_) {}

      return localUsers;
    },

    /**
     * Get admin credentials from Firebase / localStorage / defaults
     */
    async getAdminCredentials() {
      // 1. Try Firebase
      try {
        const res = await fetch(ADMIN_CRED_REF, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.password) {
            localStorage.setItem('ewi_admin_credentials', JSON.stringify(data));
            return data;
          }
        }
      } catch (_) {}

      // 2. Try localStorage
      try {
        const local = JSON.parse(localStorage.getItem('ewi_admin_credentials') || 'null');
        if (local && local.password) return local;
      } catch (_) {}

      // No custom credentials saved yet — return defaults with customized=false
      return { id: 'admin', password: 'Work2026', customized: false };
    },

    /**
     * Save admin credentials across Firebase, localStorage, and SQLite server.
     * Sets customized=true so old default passwords are permanently blocked.
     */
    async saveAdminCredentials(newId, newPassword) {
      const current = await this.getAdminCredentials();
      const creds = {
        id: (newId || current.id || 'admin').trim(),
        password: (newPassword || current.password || 'Work2026').trim(),
        customized: true,  // Once set, default passwords no longer work
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('ewi_admin_credentials', JSON.stringify(creds));

      // Push to Firebase Realtime Database
      try {
        await fetch(ADMIN_CRED_REF, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(creds)
        });
      } catch (_) {}

      // Push to server SQLite if running
      try {
        const controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
        const timer = controller ? setTimeout(() => controller.abort(), 2000) : null;
        await fetch('/api/admin/credentials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentPassword: current.password, newId: creds.id, newPassword: creds.password }),
          signal: controller ? controller.signal : undefined
        });
        if (timer) clearTimeout(timer);
      } catch (_) {}

      return creds;
    },

    /**
     * Fetch site settings (Terms & Conditions, Rates) from Firebase / localStorage / Server
     */
    async getSettings() {
      let remoteSettings = null;

      // 1. Try Firebase Realtime Database
      try {
        const res = await fetch(FIREBASE_BASE + '/ewi_settings.json', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === 'object') remoteSettings = data;
        }
      } catch (_) {}

      // 2. Try Node server /api/settings if available
      if (!remoteSettings) {
        try {
          const sRes = await fetch('/api/settings');
          if (sRes.ok) {
            const sData = await sRes.json();
            if (sData.ok && sData.settings) remoteSettings = sData.settings;
          }
        } catch (_) {}
      }

      // 3. Fallback to localStorage
      let localSettings = {};
      try {
        localSettings = JSON.parse(localStorage.getItem('ewi_settings') || '{}');
      } catch (_) {}

      const merged = Object.assign({}, localSettings, remoteSettings || {});
      try {
        localStorage.setItem('ewi_settings', JSON.stringify(merged));
      } catch (_) {}
      return merged;
    },

    /**
     * Save site settings (Terms & Conditions, Rates) to Firebase + localStorage + Server
     */
    async saveSettings(settings) {
      if (!settings || typeof settings !== 'object') return { ok: false };

      // 1. LocalStorage immediately
      let current = {};
      try {
        current = JSON.parse(localStorage.getItem('ewi_settings') || '{}');
      } catch (_) {}
      const updated = Object.assign({}, current, settings);
      try {
        localStorage.setItem('ewi_settings', JSON.stringify(updated));
      } catch (_) {}

      // 2. Firebase Realtime Database
      try {
        await fetch(FIREBASE_BASE + '/ewi_settings.json', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        });
      } catch (_) {}

      // 3. Node server if running
      try {
        await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        });
      } catch (_) {}

      return { ok: true, settings: updated };
    }
  };

  window.EWI_CloudSync = CloudSync;

  // Auto-sync from Firebase in background on every page load
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      CloudSync.getUsers().catch(() => {});
    });
  }

})(typeof window !== 'undefined' ? window : globalThis);
