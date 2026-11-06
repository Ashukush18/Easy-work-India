/**
 * Easy Work India — Production Server
 * Built with Node.js built-in HTTP and node:sqlite (ACID-compliant Database)
 * Zero external npm dependencies required!
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'database.sqlite');

// ── INITIALIZE SQLITE DATABASE ──
const db = new DatabaseSync(DB_FILE);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT,
    phone TEXT UNIQUE NOT NULL,
    email TEXT,
    project TEXT NOT NULL,
    project_key TEXT NOT NULL,
    earnings TEXT DEFAULT '₹0',
    status TEXT DEFAULT 'active',
    joined TEXT,
    aadhaar TEXT,
    aadhaar_file TEXT,
    signature_data TEXT,
    photo_url TEXT,
    password_hash TEXT,
    salt TEXT,
    plain_password TEXT,
    address TEXT,
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS rates (
    category TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    rate INTEGER NOT NULL,
    unit TEXT NOT NULL,
    daily_quota INTEGER DEFAULT 30,
    updated_at TEXT
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    difficulty TEXT DEFAULT 'Easy',
    duration_sec INTEGER DEFAULT 60,
    details_json TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS work_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT NOT NULL,
    task_id TEXT NOT NULL,
    category TEXT NOT NULL,
    completed_at TEXT NOT NULL,
    time_spent TEXT NOT NULL,
    amount TEXT NOT NULL,
    status TEXT DEFAULT 'Verified & Credited',
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    work_desc TEXT DEFAULT 'Work Description',
    fee TEXT NOT NULL,
    per_unit TEXT NOT NULL,
    daily TEXT NOT NULL,
    potential TEXT NOT NULL,
    weekly_work TEXT DEFAULT '350 pages',
    weekly_earnings TEXT DEFAULT 'Rs.21,000',
    timing TEXT DEFAULT 'No Time - No Limit',
    payout TEXT DEFAULT 'Any Time Work - Weekly Salary',
    workers INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    updated_at TEXT
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

// Ensure new columns exist on existing databases
try { db.exec("ALTER TABLE projects ADD COLUMN work_desc TEXT DEFAULT 'Work Description'"); } catch(_) {}
try { db.exec("ALTER TABLE projects ADD COLUMN weekly_work TEXT DEFAULT '350 pages'"); } catch(_) {}
try { db.exec("ALTER TABLE projects ADD COLUMN weekly_earnings TEXT DEFAULT 'Rs.21,000'"); } catch(_) {}
try { db.exec("ALTER TABLE projects ADD COLUMN timing TEXT DEFAULT 'No Time - No Limit'"); } catch(_) {}
try { db.exec("ALTER TABLE projects ADD COLUMN payout TEXT DEFAULT 'Any Time Work - Weekly Salary'"); } catch(_) {}
try { db.exec("ALTER TABLE users ADD COLUMN wallet_balance TEXT DEFAULT '₹0'"); } catch(_) {}
try { db.exec("ALTER TABLE users ADD COLUMN wallet_history TEXT DEFAULT '[]'"); } catch(_) {}
try { db.exec("ALTER TABLE users ADD COLUMN kyc_status TEXT DEFAULT 'pending'"); } catch(_) {}
try { db.exec("ALTER TABLE users ADD COLUMN withdrawal_enabled INTEGER DEFAULT 0"); } catch(_) {}
try { db.exec("ALTER TABLE users ADD COLUMN task_completed INTEGER DEFAULT 0"); } catch(_) {}
try { db.exec("ALTER TABLE users ADD COLUMN weekly_tasks_done INTEGER DEFAULT 0"); } catch(_) {}
try { db.exec("ALTER TABLE users ADD COLUMN premium_active INTEGER DEFAULT 0"); } catch(_) {}
try { db.exec("ALTER TABLE users ADD COLUMN withdrawal_details TEXT DEFAULT '{}'"); } catch(_) {}
try { db.exec("ALTER TABLE users ADD COLUMN pan_card TEXT DEFAULT ''"); } catch(_) {}
try { db.exec("ALTER TABLE users ADD COLUMN pan_file TEXT DEFAULT ''"); } catch(_) {}
try { db.exec("ALTER TABLE users ADD COLUMN permissions TEXT DEFAULT '{}'"); } catch(_) {}
try { db.exec("ALTER TABLE users ADD COLUMN auto_task_complete INTEGER DEFAULT 0"); } catch(_) {}

// Clean up captcha from SQLite database everywhere
try {
  db.exec("DELETE FROM rates WHERE category = 'captcha'");
  db.exec("DELETE FROM projects WHERE key = 'captcha' OR id = 2");
  db.exec("DELETE FROM tasks WHERE category = 'captcha'");
  db.exec("UPDATE users SET project = 'Data Entry Project', project_key = 'data_entry' WHERE project_key = 'captcha' OR project LIKE '%captcha%'");
} catch(_) {}

// ── SEED INITIAL DATABASE IF EMPTY ──
function seedDatabase() {
  // 1. Seed Rates
  const checkRates = db.prepare('SELECT COUNT(*) as count FROM rates').get();
  if (checkRates.count === 0) {
    const insertRate = db.prepare(`
      INSERT INTO rates (category, name, rate, unit, daily_quota, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const initialRates = [
      ['data_entry', 'Data Entry Project', 60, 'page', 350, new Date().toISOString()],
      ['form_filling', 'Form Filling Project', 50, 'form', 350, new Date().toISOString()]
    ];
    for (const r of initialRates) {
      insertRate.run(...r);
    }
    console.log('✓ Seeded default unit rates (Data Entry: ₹60, Form Filling: ₹50)');
  }

  // 1b. Seed Projects
  const checkProjects = db.prepare('SELECT COUNT(*) as count FROM projects').get();
  if (checkProjects.count === 0) {
    const insertProj = db.prepare(`
      INSERT INTO projects (id, key, name, work_desc, fee, per_unit, daily, potential, weekly_work, weekly_earnings, timing, payout, workers, status, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertProj.run(1, 'data_entry', 'DATA ENTRY PROJECT', 'Work Description', 'Work Description', 'Rs.60', '350 pages', 'Rs.21,000', '350 pages', 'Rs.21,000', 'No Time - No Limit', 'Any Time Work - Weekly Salary', 104, 'active', new Date().toISOString());
    insertProj.run(3, 'form_filling', 'FORM FILLING PROJECT', 'Work Description', 'Work Description', 'Rs.50', '350 pages', 'Rs.19,500', '350 pages', 'Rs.19,500', 'No Time - No Limit', 'Any Time Work - Weekly Salary', 57, 'active', new Date().toISOString());
    console.log('✓ Seeded default projects (Data Entry, Form Filling)');
  }

  // 2. Seed Tasks
  // 2. Seed Tasks (400 per category = 1,200 Total)
  const checkTasks = db.prepare('SELECT COUNT(*) as count FROM tasks').get();
  if (checkTasks.count < 1200) {
    const tasksPoolFile = path.join(__dirname, 'tasks_pool.json');
    if (fs.existsSync(tasksPoolFile)) {
      try {
        const pool = JSON.parse(fs.readFileSync(tasksPoolFile, 'utf8'));
        const insertTask = db.prepare(`
          INSERT OR REPLACE INTO tasks (id, category, title, difficulty, duration_sec, details_json, status, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        for (const t of pool) {
          const details = {};
          if (t.category === 'data_entry') {
            details.content = t.content;
            details.instructions = t.instructions;
            details.words = (t.content || '').trim().split(/\s+/).length;
          } else if (t.category === 'captcha') {
            details.captchaCode = t.captchaCode;
            details.instructions = t.instructions;
          } else if (t.category === 'form_filling') {
            details.formData = t.formData;
            details.instructions = t.instructions;
          }
          insertTask.run(
            t.id,
            t.category,
            t.title,
            t.difficulty || 'Medium',
            t.duration_sec || 90,
            JSON.stringify(details),
            t.status || 'active',
            new Date().toISOString()
          );
        }
        console.log(`✓ Seeded ${pool.length} tasks into SQLite from tasks_pool.json`);
      } catch (e) {
        console.error('Failed to seed tasks_pool.json:', e);
      }
    }
  }

  // 3. Seed Users
  const checkUsers = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (checkUsers.count === 0) {
    const insertUser = db.prepare(`
      INSERT INTO users (
        name, username, phone, email, project, project_key, earnings, status,
        joined, aadhaar, aadhaar_file, signature_data, photo_url,
        password_hash, salt, plain_password, address, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const initialUsers = [
      {
        name: 'Priya Sharma',
        username: 'priya_sharma',
        phone: '9812345678',
        email: 'priya@email.com',
        project: 'Data Entry Project',
        project_key: 'data_entry',
        earnings: '₹22,500',
        status: 'active',
        joined: '15 Jan 2026',
        aadhaar: 'XXXX-XXXX-1234',
        plain_password: 'Work@5678',
        photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        address: 'Flat 402, Sunshine Heights, Kothrud, Pune - 411038'
      },
      {
        name: 'Ravi Kumar',
        username: 'ravi_kumar',
        phone: '9823456789',
        email: 'ravi@email.com',
        project: 'Data Entry Project',
        project_key: 'data_entry',
        earnings: '₹34,000',
        status: 'active',
        joined: '18 Jan 2026',
        aadhaar: 'XXXX-XXXX-5678',
        plain_password: 'Work@6789',
        photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        address: 'House 12, Model Town, Civil Lines, Jaipur - 302006'
      },
      {
        name: 'Sunita Devi',
        username: 'sunita_devi',
        phone: '9834567890',
        email: 'sunita@email.com',
        project: 'Form Filling Project',
        project_key: 'form_filling',
        earnings: '₹15,000',
        status: 'active',
        joined: '20 Jan 2026',
        aadhaar: 'XXXX-XXXX-9012',
        plain_password: 'Work@7890',
        photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        address: 'Plot 88, Sector 14, Indira Nagar, Lucknow - 226016'
      }
    ];

    for (const u of initialUsers) {
      insertUser.run(
        u.name,
        u.username,
        u.phone,
        u.email,
        u.project,
        u.project_key,
        u.earnings,
        u.status,
        u.joined,
        u.aadhaar,
        '',
        '',
        u.photo_url,
        '',
        '',
        u.plain_password,
        u.address,
        new Date().toISOString()
      );
    }
    console.log(`✓ Seeded ${initialUsers.length} active demo workers`);
  }
}

seedDatabase();

// ── MIME TYPE MAPPER ──
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf'
};

// ── REQUEST BODY PARSER HELPER ──
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 25 * 1024 * 1024) { // 25MB limit for Base64 attachments
        req.destroy();
        reject(new Error('Payload Too Large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  });
  res.end(JSON.stringify(data));
}

// ── HTTP SERVER & ROUTER ──
const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // ══════════════════════════════════════════
  // API ROUTES
  // ══════════════════════════════════════════

  // 1. Health check
  if (pathname === '/api/status' && req.method === 'GET') {
    return sendJson(res, 200, {
      ok: true,
      service: 'Easy Work India Backend',
      database: 'SQLite (node:sqlite)',
      serverTime: new Date().toISOString()
    });
  }

  // 2. Authentication: Login
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    try {
      const { phone, password, userId } = await parseJsonBody(req);
      const cleanPhone = (phone || userId || '').trim();
      const cleanPass = (password || '').trim();

      // Admin Check — credentials from DB (fallback to defaults ONLY if no custom password ever set)
      const storedAdminId  = db.prepare("SELECT value FROM settings WHERE key='admin_id'").get();
      const storedAdminPwd = db.prepare("SELECT value FROM settings WHERE key='admin_password'").get();
      const storedCustomized = db.prepare("SELECT value FROM settings WHERE key='admin_password_customized'").get();
      const adminId  = storedAdminId  ? storedAdminId.value  : 'admin';
      const adminPwd = storedAdminPwd ? storedAdminPwd.value : 'Work2026';
      const isCustomized = storedCustomized && storedCustomized.value === 'true';

      // Build valid admin IDs: always includes stored/default IDs
      const validAdminIds = ['9876543210', adminId.toLowerCase(), 'admin'];

      // If password has been customized, ONLY the custom password works (defaults are blocked)
      // If not customized yet, also allow factory defaults for first login
      const isAdminId = validAdminIds.includes(cleanPhone.toLowerCase());
      let adminPassOk = false;
      if (isCustomized) {
        adminPassOk = (cleanPass === adminPwd);
      } else {
        adminPassOk = (cleanPass === adminPwd) || ['Work2026', '123456', 'admin123'].includes(cleanPass);
      }

      if (isAdminId && adminPassOk) {
        return sendJson(res, 200, {
          ok: true,
          role: 'admin',
          name: 'Super Admin',
          redirect: 'admin.html'
        });
      }

      // Worker Check in SQLite (by User ID / username case-insensitive, phone, or id)
      const stmt = db.prepare('SELECT * FROM users WHERE username = ? COLLATE NOCASE OR phone = ? OR id = ?');
      const user = stmt.get(cleanPhone, cleanPhone, isNaN(cleanPhone) ? -1 : parseInt(cleanPhone, 10));

      if (!user) {
        return sendJson(res, 401, { ok: false, error: 'User ID not found in registered worker accounts.' });
      }

      // Check disabled status
      if (user.status === 'inactive' || user.status === 'disabled') {
        return sendJson(res, 403, { ok: false, error: 'This worker account has been deactivated / disabled by administration. Please contact admin.' });
      }

      // Check password (supports plain password and SHA-256 hash)
      let match = (user.plain_password && user.plain_password === cleanPass);
      if (!match && user.password_hash && user.salt) {
        const testHash = crypto.createHash('sha256').update(user.salt + cleanPass).digest('hex');
        match = (testHash === user.password_hash);
      }
      if (!match) {
        return sendJson(res, 401, { ok: false, error: 'Incorrect password. Please verify and try again.' });
      }

      let walHist = [];
      try { walHist = JSON.parse(user.wallet_history || '[]'); } catch(_) {}
      let withDetails = null;
      try { withDetails = user.withdrawal_details ? (typeof user.withdrawal_details === 'string' ? JSON.parse(user.withdrawal_details) : user.withdrawal_details) : null; } catch(_) {}

      const walBalStr = user.wallet_balance || '₹0';
      const balNum = parseInt(walBalStr.replace(/[^\d]/g, ''), 10) || 0;
      const premActive = Boolean(user.premium_active || balNum > 0);

      return sendJson(res, 200, {
        ok: true,
        role: 'worker',
        redirect: 'account.html',
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          userId: user.username,
          phone: user.phone,
          email: user.email || '',
          project: user.project,
          projectKey: user.project_key || 'data_entry',
          earnings: user.earnings || '₹0',
          status: user.status || 'active',
          accountStatus: user.status === 'disabled' ? 'Disabled' : 'Active',
          joined: user.joined || 'Active',
          aadhaar: user.aadhaar || '',
          aadhaarFile: user.aadhaar_file || null,
          signatureData: user.signature_data || null,
          photoUrl: user.photo_url || null,
          address: user.address || '',
          walletBalance: walBalStr,
          walletHistory: walHist,
          kycStatus: user.kyc_status || 'pending',
          withdrawalEnabled: Boolean(user.withdrawal_enabled),
          taskCompleted: Boolean(user.task_completed),
          weeklyTasksDone: user.weekly_tasks_done || 0,
          autoTaskComplete: Boolean(user.auto_task_complete),
          premiumActive: premActive,
          withdrawalDetails: withDetails,
          permissions: (() => { try { return JSON.parse(user.permissions || '{}'); } catch(_) { return {}; } })(),
          photoUrl: user.photo_url || null,
          aadhaar: user.aadhaar || '',
          aadhaarFile: user.aadhaar_file || null,
          signatureData: user.signature_data || null,
          address: user.address || ''
        }
      });
    } catch (err) {
      return sendJson(res, 400, { ok: false, error: err.message });
    }
  }

  // 3. Unit Rates: GET
  if (pathname === '/api/rates' && req.method === 'GET') {
    const rows = db.prepare('SELECT * FROM rates').all();
    const ratesMap = {};
    rows.forEach(r => { ratesMap[r.category] = r.rate; });
    return sendJson(res, 200, { ok: true, rates: ratesMap, list: rows });
  }

  // 4. Unit Rates: POST (Admin updates rates)
  if (pathname === '/api/rates' && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      const updateRateStmt = db.prepare('UPDATE rates SET rate = ?, updated_at = ? WHERE category = ?');
      const updateProjStmt = db.prepare(`
        UPDATE projects SET
          per_unit = ?,
          potential = ?,
          updated_at = ?
        WHERE key = ?
      `);

      function syncCatRate(cat, num) {
        if (!isNaN(num) && num > 0) {
          const now = new Date().toISOString();
          updateRateStmt.run(num, now, cat);
          const unitSuffix = (cat === 'form_filling' ? '/form' : '/page');
          const potStr = `Rs.${(num * 350).toLocaleString('en-IN')}`;
          updateProjStmt.run(`Rs.${num}`, potStr, now, cat);
        }
      }

      const ratesObj = data.rates || ((data.data_entry !== undefined || data.form_filling !== undefined) ? data : null);
      if (ratesObj) {
        for (const [cat, val] of Object.entries(ratesObj)) {
          if (['data_entry', 'form_filling'].includes(cat)) {
            syncCatRate(cat, parseInt(val, 10));
          }
        }
      } else if (data.category && data.rate) {
        syncCatRate(data.category, parseInt(data.rate, 10));
      }

      const updated = db.prepare("SELECT * FROM rates WHERE category != 'captcha'").all();
      const ratesMap = {};
      updated.forEach(r => { ratesMap[r.category] = r.rate; });

      return sendJson(res, 200, { ok: true, message: 'Unit rates and projects updated successfully', rates: ratesMap });
    } catch (err) {
      return sendJson(res, 400, { ok: false, error: err.message });
    }
  }

  // 4b. Projects: GET (All projects for Admin, Homepage, and Account)
  if (pathname === '/api/projects' && req.method === 'GET') {
    const rows = db.prepare(`
      SELECT id, key, name, 
             COALESCE(work_desc, 'Work Description') as workDesc,
             fee,
             per_unit as perUnit, 
             daily, 
             potential,
             COALESCE(weekly_work, '350 pages') as weeklyWork,
             COALESCE(weekly_earnings, potential) as weeklyEarnings,
             COALESCE(timing, 'No Time - No Limit') as timing,
             COALESCE(payout, 'Any Time Work - Weekly Salary') as payout,
             workers, status 
      FROM projects 
      WHERE key != 'captcha'
      ORDER BY id ASC
    `).all();
    return sendJson(res, 200, { ok: true, projects: rows });
  }

  // 4c. Projects: POST / PUT (Admin updates project details & work description)
  if ((pathname === '/api/projects' || pathname.startsWith('/api/projects/')) && (req.method === 'POST' || req.method === 'PUT')) {
    try {
      const body = await parseJsonBody(req);
      const proj = body.project || body;
      const key = proj.key || (proj.id === 3 ? 'form_filling' : 'data_entry');
      const workDescVal = proj.workDesc || proj.work_desc || 'Work Description';
      const weeklyWorkVal = proj.weeklyWork || proj.weekly_work || '350 pages';
      const weeklyEarnVal = proj.weeklyEarnings || proj.weekly_earnings || (key === 'data_entry' ? 'Rs.21,000' : 'Rs.19,500');
      const timingVal = proj.timing || 'No Time - No Limit';
      const payoutVal = proj.payout || 'Any Time Work - Weekly Salary';
      const feeVal = proj.fee || workDescVal;

      const updateStmt = db.prepare(`
        UPDATE projects SET
          name = COALESCE(?, name),
          work_desc = COALESCE(?, work_desc),
          fee = COALESCE(?, fee),
          per_unit = COALESCE(?, per_unit),
          daily = COALESCE(?, daily),
          potential = COALESCE(?, potential),
          weekly_work = COALESCE(?, weekly_work),
          weekly_earnings = COALESCE(?, weekly_earnings),
          timing = COALESCE(?, timing),
          payout = COALESCE(?, payout),
          updated_at = ?
        WHERE key = ? OR id = ?
      `);
      updateStmt.run(
        proj.name,
        workDescVal,
        feeVal,
        proj.perUnit,
        weeklyWorkVal,
        weeklyEarnVal,
        weeklyWorkVal,
        weeklyEarnVal,
        timingVal,
        payoutVal,
        new Date().toISOString(),
        key,
        proj.id || 0
      );

      // Keep rates table synchronized if perUnit changed
      if (proj.perUnit) {
        const rateMatch = (proj.perUnit.toString()).match(/\d+/);
        if (rateMatch) {
          const numRate = parseInt(rateMatch[0], 10);
          db.prepare('UPDATE rates SET rate = ?, updated_at = ? WHERE category = ?').run(numRate, new Date().toISOString(), key);
        }
      }

      const rows = db.prepare(`
        SELECT id, key, name, 
               COALESCE(work_desc, 'Work Description') as workDesc,
               fee,
               per_unit as perUnit, 
               daily, 
               potential,
               COALESCE(weekly_work, '350 pages') as weeklyWork,
               COALESCE(weekly_earnings, potential) as weeklyEarnings,
               COALESCE(timing, 'No Time - No Limit') as timing,
               COALESCE(payout, 'Any Time Work - Weekly Salary') as payout,
               workers, status 
        FROM projects 
        WHERE key != 'captcha'
        ORDER BY id ASC
      `).all();
      return sendJson(res, 200, { ok: true, message: 'Project details and work description updated successfully everywhere', projects: rows });
    } catch (err) {
      return sendJson(res, 400, { ok: false, error: err.message });
    }
  }

  // 5a. Settings: GET (key/value store for admin credentials, terms, etc.)
  if (pathname === '/api/settings' && req.method === 'GET') {
    const rows = db.prepare('SELECT key, value FROM settings').all();
    const map = {};
    rows.forEach(r => { map[r.key] = r.value; });
    // Remove sensitive admin password from public response
    const safe = { ...map };
    delete safe['admin_password'];
    return sendJson(res, 200, { ok: true, settings: safe });
  }

  // 5b. Settings: POST (admin saves any setting)
  if (pathname === '/api/settings' && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      const upsert = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value');
      Object.entries(data).forEach(([k, v]) => upsert.run(k, String(v)));
      return sendJson(res, 200, { ok: true, message: 'Settings saved.' });
    } catch (err) {
      return sendJson(res, 400, { ok: false, error: err.message });
    }
  }

  // 5c. Admin Credentials: POST (change admin login ID and password)
  if (pathname === '/api/admin/credentials' && req.method === 'POST') {
    try {
      const { currentPassword, newId, newPassword } = await parseJsonBody(req);
      // Verify current password against stored settings
      const storedId  = db.prepare("SELECT value FROM settings WHERE key='admin_id'").get();
      const storedPwd = db.prepare("SELECT value FROM settings WHERE key='admin_password'").get();
      const storedCustomized = db.prepare("SELECT value FROM settings WHERE key='admin_password_customized'").get();
      const currentId  = storedId  ? storedId.value  : 'admin';
      const currentPwd = storedPwd ? storedPwd.value : 'Work2026';
      const isCustomized = storedCustomized && storedCustomized.value === 'true';

      const curTrimmed = (currentPassword || '').trim();

      // Once customized, ONLY the custom password authorizes a change
      // Before first customization, also allow factory defaults
      let authorized = curTrimmed === currentPwd;
      if (!authorized && !isCustomized) {
        authorized = ['Work2026', '123456', 'admin123'].includes(curTrimmed);
      }

      if (!authorized) {
        return sendJson(res, 403, { ok: false, error: 'Current password is incorrect.' });
      }

      const upsert = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value');
      if (newId)       upsert.run('admin_id', newId.trim());
      if (newPassword) {
        upsert.run('admin_password', newPassword.trim());
        // Mark password as customized so defaults are permanently disabled
        upsert.run('admin_password_customized', 'true');
      }
      return sendJson(res, 200, { ok: true, message: 'Admin credentials updated successfully.' });
    } catch (err) {
      return sendJson(res, 400, { ok: false, error: err.message });
    }
  }

  // 5d. Terms & Conditions: GET (public, shown on homepage)
  if (pathname === '/api/terms' && req.method === 'GET') {
    const row = db.prepare("SELECT value FROM settings WHERE key='terms_and_conditions'").get();
    return sendJson(res, 200, { ok: true, terms: row ? row.value : '' });
  }

  // 5. Users: GET (All users for Admin)
  if (pathname === '/api/users' && req.method === 'GET') {
    const users = db.prepare('SELECT * FROM users ORDER BY id DESC').all();
    return sendJson(res, 200, { ok: true, users });
  }

  // 6. Users: POST (Admin creates worker account with manual User ID, password, photo, aadhaar, signature)
  if (pathname === '/api/users' && req.method === 'POST') {
    try {
      const u = await parseJsonBody(req);
      const userId = (u.username || u.userId || '').trim();

      if (!u.name) {
        return sendJson(res, 400, { ok: false, error: 'Worker full name is required.' });
      }
      if (!userId) {
        return sendJson(res, 400, { ok: false, error: 'Worker User ID is required.' });
      }

      // Check if User ID or phone is already taken
      const existing = db.prepare('SELECT id FROM users WHERE username = ? OR (phone = ? AND phone != "" AND phone != ?)').get(userId, u.phone || '', userId);
      if (existing) {
        return sendJson(res, 409, { ok: false, error: 'A worker account with this User ID or Mobile number already exists.' });
      }

      const pKey = u.projectKey || (u.project === 'Form Filling' || (u.project || '').includes('Form') ? 'form_filling' : 'data_entry');
      const pName = u.project || (pKey === 'form_filling' ? 'Form Filling Project' : 'Data Entry Project');

      const permJson = typeof u.permissions === 'object' ? JSON.stringify(u.permissions) : (u.permissions || '{}');

      const insertStmt = db.prepare(`
        INSERT INTO users (
          name, username, phone, email, project, project_key, earnings, status,
          joined, aadhaar, aadhaar_file, signature_data, photo_url,
          password_hash, salt, plain_password, address, pan_card, pan_file, permissions, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

      insertStmt.run(
        u.name,
        userId,
        u.phone || userId,
        u.email || '',
        pName,
        pKey,
        u.earnings || '₹0',
        u.status || 'active',
        u.joined || nowStr,
        u.aadhaar || '',
        u.aadhaarFile || u.aadhaar_file || '',
        u.signatureData || u.signature_data || '',
        u.photoUrl || u.photo_url || '',
        u.passwordHash || '',
        u.salt || '',
        u.plainPassword || u.password || 'Work@2026',
        u.address || '',
        u.panCard || u.pan_card || '',
        u.panFile || u.pan_file || '',
        permJson,
        new Date().toISOString()
      );

      const created = db.prepare('SELECT * FROM users WHERE username = ?').get(userId);
      return sendJson(res, 201, { ok: true, message: 'Worker account created successfully', user: created });
    } catch (err) {
      return sendJson(res, 400, { ok: false, error: err.message });
    }
  }

  // Helper function to reliably find user by username, phone, or id
  function findUserInDb(data) {
    if (!data) return null;
    const username = (data.username || data.userId || '').toString().trim();
    const phone = (data.phone || '').toString().trim();
    const idNum = (data.id && !isNaN(data.id)) ? parseInt(data.id, 10) : -1;

    let user = null;
    if (username) {
      user = db.prepare('SELECT * FROM users WHERE username = ? COLLATE NOCASE').get(username);
    }
    if (!user && phone) {
      user = db.prepare('SELECT * FROM users WHERE phone = ?').get(phone);
    }
    if (!user && idNum > 0) {
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(idNum);
    }
    return user;
  }

  // 7. Users: GET by phone, username or id (Worker profile)
  if (pathname.startsWith('/api/users/') && !pathname.includes('/clearfield') && !pathname.includes('/credit-wallet') && !pathname.includes('/withdrawal-request') && req.method === 'GET') {
    const rawParam = decodeURIComponent(pathname.replace('/api/users/', '').trim());
    const isNum = !isNaN(rawParam) && rawParam !== '';
    const user = db.prepare('SELECT * FROM users WHERE username = ? COLLATE NOCASE OR phone = ? OR id = ?')
      .get(rawParam, rawParam, isNum ? parseInt(rawParam, 10) : -1);
    if (!user) return sendJson(res, 404, { ok: false, error: 'User not found' });
    return sendJson(res, 200, { ok: true, user });
  }

  // 8. Users: PUT (Admin updates user profile, including photo, aadhaar, signature, status, wallet, etc.)
  if (pathname.startsWith('/api/users/') && !pathname.includes('/clearfield') && !pathname.includes('/credit-wallet') && !pathname.includes('/withdrawal-request') && req.method === 'PUT') {
    try {
      const id = parseInt(pathname.replace('/api/users/', ''), 10);
      const data = await parseJsonBody(req);

      const updateStmt = db.prepare(`
        UPDATE users SET
          name = COALESCE(?, name),
          username = COALESCE(?, username),
          email = COALESCE(?, email),
          phone = COALESCE(?, phone),
          project = COALESCE(?, project),
          project_key = COALESCE(?, project_key),
          status = COALESCE(?, status),
          photo_url = COALESCE(?, photo_url),
          aadhaar = COALESCE(?, aadhaar),
          aadhaar_file = COALESCE(?, aadhaar_file),
          signature_data = COALESCE(?, signature_data),
          plain_password = COALESCE(?, plain_password),
          address = COALESCE(?, address),
          earnings = COALESCE(?, earnings),
          wallet_balance = COALESCE(?, wallet_balance),
          wallet_history = COALESCE(?, wallet_history),
          kyc_status = COALESCE(?, kyc_status),
          withdrawal_enabled = COALESCE(?, withdrawal_enabled),
          task_completed = COALESCE(?, task_completed),
          weekly_tasks_done = COALESCE(?, weekly_tasks_done),
          premium_active = COALESCE(?, premium_active),
          withdrawal_details = COALESCE(?, withdrawal_details),
          pan_card = COALESCE(?, pan_card),
          pan_file = COALESCE(?, pan_file),
          permissions = COALESCE(?, permissions),
          auto_task_complete = COALESCE(?, auto_task_complete)
        WHERE id = ?
      `);

      updateStmt.run(
        data.name !== undefined ? data.name : null,
        data.username !== undefined ? data.username : null,
        data.email !== undefined ? data.email : null,
        data.phone !== undefined ? data.phone : null,
        data.project !== undefined ? data.project : null,
        data.projectKey !== undefined ? data.projectKey : null,
        data.status !== undefined ? data.status : null,
        (data.photoUrl !== undefined ? data.photoUrl : (data.photo_url !== undefined ? data.photo_url : null)),
        data.aadhaar !== undefined ? data.aadhaar : null,
        (data.aadhaarFile !== undefined ? data.aadhaarFile : (data.aadhaar_file !== undefined ? data.aadhaar_file : null)),
        (data.signatureData !== undefined ? data.signatureData : (data.signature_data !== undefined ? data.signature_data : null)),
        (data.plainPassword !== undefined ? data.plainPassword : (data.plain_password !== undefined ? data.plain_password : null)),
        data.address !== undefined ? data.address : null,
        data.earnings !== undefined ? data.earnings : null,
        data.walletBalance !== undefined ? data.walletBalance : (data.wallet_balance !== undefined ? data.wallet_balance : null),
        data.walletHistory !== undefined ? (typeof data.walletHistory === 'string' ? data.walletHistory : JSON.stringify(data.walletHistory)) : (data.wallet_history !== undefined ? data.wallet_history : null),
        data.kycStatus !== undefined ? data.kycStatus : (data.kyc_status !== undefined ? data.kyc_status : null),
        data.withdrawalEnabled !== undefined ? (data.withdrawalEnabled ? 1 : 0) : null,
        data.taskCompleted !== undefined ? (data.taskCompleted ? 1 : 0) : null,
        data.weeklyTasksDone !== undefined ? data.weeklyTasksDone : null,
        data.premiumActive !== undefined ? (data.premiumActive ? 1 : 0) : null,
        data.withdrawalDetails !== undefined ? (typeof data.withdrawalDetails === 'string' ? data.withdrawalDetails : JSON.stringify(data.withdrawalDetails)) : null,
        data.panCard !== undefined ? data.panCard : (data.pan_card !== undefined ? data.pan_card : null),
        data.panFile !== undefined ? data.panFile : (data.pan_file !== undefined ? data.pan_file : null),
        data.permissions !== undefined ? (typeof data.permissions === 'string' ? data.permissions : JSON.stringify(data.permissions)) : null,
        data.autoTaskComplete !== undefined ? (data.autoTaskComplete ? 1 : 0) : null,
        id
      );

      const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
      return sendJson(res, 200, { ok: true, user: updated });
    } catch (err) {
      return sendJson(res, 400, { ok: false, error: err.message });
    }
  }

  // 8b. Users: Credit Wallet API (Admin credits wallet, auto-unlocks premium)
  if (pathname === '/api/users/credit-wallet' && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      const user = findUserInDb(data);
      if (!user) return sendJson(res, 404, { ok: false, error: 'User not found in registered database' });

      const amt = parseInt((data.amount || '0').toString().replace(/[^\d]/g, ''), 10) || 0;
      if (amt <= 0) return sendJson(res, 400, { ok: false, error: 'Invalid credit amount' });

      const oldBal = parseInt((user.wallet_balance || '0').replace(/[^\d]/g, ''), 10) || 0;
      const newBal = oldBal + amt;
      const newBalStr = '₹' + newBal.toLocaleString('en-IN');

      let hist = [];
      try { hist = JSON.parse(user.wallet_history || '[]'); } catch(_) {}
      hist.push({
        amount: amt.toLocaleString('en-IN'),
        note: data.note || 'Credit by Admin',
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        by: 'Admin'
      });

      // Auto-unlock premium when wallet is credited!
      const premiumUnlocked = newBal > 0 ? 1 : (user.premium_active || 0);

      db.prepare(`UPDATE users SET wallet_balance = ?, wallet_history = ?, premium_active = ? WHERE id = ?`)
        .run(newBalStr, JSON.stringify(hist), premiumUnlocked, user.id);

      const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(user.id);
      return sendJson(res, 200, { ok: true, user: updated, walletBalance: newBalStr, premiumActive: Boolean(premiumUnlocked) });
    } catch (err) {
      return sendJson(res, 400, { ok: false, error: err.message });
    }
  }

  // 8c. Users: Submit Withdrawal Request Details API
  if (pathname === '/api/users/withdrawal-request' && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      const user = findUserInDb(data);
      if (!user) return sendJson(res, 404, { ok: false, error: 'User not found' });

      const detailsStr = typeof data.details === 'string' ? data.details : JSON.stringify(data.details || {});
      db.prepare(`UPDATE users SET withdrawal_details = ? WHERE id = ?`).run(detailsStr, user.id);

      const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(user.id);
      return sendJson(res, 200, { ok: true, user: updated });
    } catch (err) {
      return sendJson(res, 400, { ok: false, error: err.message });
    }
  }

  // 9. Users: DELETE (Admin deletes user permanently by ID, Username, or Phone)
  if (pathname.startsWith('/api/users/') && !pathname.includes('/clearfield') && req.method === 'DELETE') {
    const rawId = decodeURIComponent(pathname.replace('/api/users/', '').trim());
    const numId = parseInt(rawId, 10);
    if (!isNaN(numId) && String(numId) === rawId) {
      db.prepare('DELETE FROM users WHERE id = ? OR username = ? OR phone = ?').run(numId, rawId, rawId);
    } else {
      db.prepare('DELETE FROM users WHERE username = ? OR phone = ?').run(rawId, rawId);
    }
    return sendJson(res, 200, { ok: true, message: 'User permanently deleted from database' });
  }

  // 9b. Users: PATCH clear individual field (photo, aadhaar_file, signature_data, etc.)
  if (pathname.startsWith('/api/users/') && pathname.endsWith('/clearfield') && req.method === 'PATCH') {
    try {
      const id = parseInt(pathname.replace('/api/users/', '').replace('/clearfield', ''), 10);
      const data = await parseJsonBody(req);
      const allowed = ['photo_url', 'aadhaar_file', 'signature_data', 'aadhaar', 'plain_password', 'password_hash', 'salt', 'address', 'earnings'];
      const field = data.field;
      if (!field || !allowed.includes(field)) return sendJson(res, 400, { ok: false, error: 'Invalid field' });
      db.prepare(`UPDATE users SET ${field} = NULL WHERE id = ?`).run(id);
      return sendJson(res, 200, { ok: true, message: `Field ${field} cleared` });
    } catch (err) {
      return sendJson(res, 400, { ok: false, error: err.message });
    }
  }

  // 10. Tasks: GET
  if (pathname === '/api/tasks' && req.method === 'GET') {
    const category = parsedUrl.searchParams.get('category');
    let rows;
    if (category) {
      rows = db.prepare('SELECT * FROM tasks WHERE category = ? ORDER BY id ASC').all(category);
    } else {
      rows = db.prepare('SELECT * FROM tasks ORDER BY id ASC').all();
    }
    const parsed = rows.map(t => {
      let details = {};
      try { details = JSON.parse(t.details_json); } catch(_) {}
      return { ...t, details };
    });
    return sendJson(res, 200, { ok: true, tasks: parsed });
  }

  // 11. Tasks: POST (Admin uploads new task)
  if (pathname === '/api/tasks' && req.method === 'POST') {
    try {
      const t = await parseJsonBody(req);
      if (!t.id || !t.category || !t.title) {
        return sendJson(res, 400, { ok: false, error: 'Task ID, Category, and Title are required.' });
      }
      const insertStmt = db.prepare(`
        INSERT OR REPLACE INTO tasks (id, category, title, difficulty, duration_sec, details_json, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      insertStmt.run(
        t.id,
        t.category,
        t.title,
        t.difficulty || 'Easy',
        t.durationSec || 60,
        JSON.stringify(t.details || {}),
        t.status || 'active',
        new Date().toISOString()
      );
      return sendJson(res, 201, { ok: true, message: 'Task uploaded successfully', task: t });
    } catch (err) {
      return sendJson(res, 400, { ok: false, error: err.message });
    }
  }

  // 12. Tasks: DELETE
  if (pathname.startsWith('/api/tasks/') && req.method === 'DELETE') {
    const id = pathname.replace('/api/tasks/', '').trim();
    db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
    return sendJson(res, 200, { ok: true, message: 'Task deleted' });
  }

  // 13. Task Submission: POST (Worker finishes a task, tracks earnings)
  if (pathname === '/api/tasks/submit' && req.method === 'POST') {
    try {
      const { phone, taskId, category, durationSeconds } = await parseJsonBody(req);

      if (!phone || !taskId || !category) {
        return sendJson(res, 400, { ok: false, error: 'Phone, taskId, and category are required.' });
      }

      // Get current rate from rates table
      const rateRow = db.prepare('SELECT rate FROM rates WHERE category = ?').get(category);
      const earnedAmount = rateRow ? rateRow.rate : (category === 'form_filling' ? 50 : 60);

      // Duration string
      const sec = durationSeconds || 30;
      const mins = Math.floor(sec / 60);
      const remSec = sec % 60;
      const timeSpentStr = (mins > 0 ? `${mins}m ` : '') + `${remSec}s`;

      const completedAtStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      // Insert work log
      db.prepare(`
        INSERT INTO work_logs (phone, task_id, category, completed_at, time_spent, amount, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(phone, taskId, category, completedAtStr, timeSpentStr, `₹${earnedAmount}`, 'Verified & Credited', new Date().toISOString());

      // Update user total earnings
      const user = db.prepare('SELECT * FROM users WHERE phone = ?').get(phone);
      let newTotal = earnedAmount;
      if (user) {
        const cur = parseInt((user.earnings || '0').replace(/[^\d]/g, '') || '0', 10);
        newTotal = cur + earnedAmount;
        const newEarningsStr = `₹${newTotal.toLocaleString('en-IN')}`;
        db.prepare('UPDATE users SET earnings = ? WHERE phone = ?').run(newEarningsStr, phone);
      }

      return sendJson(res, 200, {
        ok: true,
        earnedAmount,
        newTotalEarnings: `₹${newTotal.toLocaleString('en-IN')}`,
        historyItem: {
          taskId,
          category,
          completedAt: completedAtStr,
          timeSpent: timeSpentStr,
          amount: `₹${earnedAmount}`,
          status: 'Verified & Credited'
        }
      });
    } catch (err) {
      return sendJson(res, 400, { ok: false, error: err.message });
    }
  }

  // 14. Work History: GET
  if (pathname.startsWith('/api/work-history/') && req.method === 'GET') {
    const phone = pathname.replace('/api/work-history/', '').trim();
    const rows = db.prepare('SELECT * FROM work_logs WHERE phone = ? ORDER BY id DESC LIMIT 50').all(phone);
    return sendJson(res, 200, { ok: true, history: rows });
  }

  // ══════════════════════════════════════════
  // STATIC FILE SERVING
  // ══════════════════════════════════════════
  if (req.method === 'GET' || req.method === 'HEAD') {
    let filePath = pathname === '/' ? '/index.html' : pathname;
    let safePath = path.normalize(path.join(__dirname, filePath));

    // Support clean URLs without .html extension (e.g. /register, /account, /admin)
    if (!path.extname(safePath) && fs.existsSync(safePath + '.html')) {
      safePath = safePath + '.html';
    }

    // Security check
    if (!safePath.startsWith(__dirname)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      return res.end('Access Denied');
    }

    fs.stat(safePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        return res.end(`
          <!DOCTYPE html>
          <html>
          <head><title>404 Not Found</title></head>
          <body style="font-family:sans-serif;text-align:center;padding:50px">
            <h1>404 — Page Not Found</h1>
            <p>The requested page <code>${pathname}</code> was not found on this server.</p>
            <p><a href="/">Return to Home</a></p>
          </body>
          </html>
        `);
      }

      const ext = path.extname(safePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stats.size,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      });

      if (req.method === 'HEAD') return res.end();

      const readStream = fs.createReadStream(safePath);
      readStream.pipe(res);
    });
    return;
  }

  // Method not allowed
  res.writeHead(405, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'Method Not Allowed' }));
});

// ── START SERVER ──
server.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🚀 Easy Work India Live Server Running!`);
  console.log(`🌐 Local URL:   http://localhost:${PORT}`);
  console.log(`🌐 Network:     http://0.0.0.0:${PORT}`);
  console.log(`🗄️ Database:    SQLite (${DB_FILE})`);
  console.log(`👤 Admin Login: ID: 9876543210 (or 'admin') | Pass: Work2026`);
  console.log(`====================================================`);
});
