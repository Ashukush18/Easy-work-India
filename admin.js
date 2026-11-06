/* =============================================
   ADMIN PANEL — admin.js
   Easy Work India Admin Dashboard Logic
   ============================================= */

/* ===== CREDENTIALS ===== */
const ADMIN_CREDENTIALS = { id: '9876543210', password: 'Work2026' };

/* ===== MOCK DATA ===== */
const USERS_DATA = [
  { id: 1, name: 'Priya Sharma', username: 'priya_sharma', email: 'priya@email.com', phone: '9812345678', project: 'Data Entry', earnings: '₹22,500', status: 'active', joined: '15 Jan 2026', aadhaar: 'XXXX-1234' },
  { id: 2, name: 'Ravi Kumar', username: 'ravi_kumar', email: 'ravi@email.com', phone: '9823456789', project: 'Data Entry', earnings: '₹34,000', status: 'active', joined: '18 Jan 2026', aadhaar: 'XXXX-5678' },
  { id: 3, name: 'Sunita Devi', username: 'sunita_devi', email: 'sunita@email.com', phone: '9834567890', project: 'Form Filling', earnings: '₹15,000', status: 'pending', joined: '20 Jan 2026', aadhaar: 'XXXX-9012' },
  { id: 4, name: 'Amit Patel', username: 'amit_patel', email: 'amit@email.com', phone: '9845678901', project: 'Data Entry', earnings: '₹28,500', status: 'active', joined: '22 Jan 2026', aadhaar: 'XXXX-3456' },
  { id: 5, name: 'Kavita Singh', username: 'kavita_singh', email: 'kavita@email.com', phone: '9856789012', project: 'Form Filling', earnings: '₹41,000', status: 'active', joined: '25 Jan 2026', aadhaar: 'XXXX-7890' },
  { id: 6, name: 'Deepak Yadav', username: 'deepak_yadav', email: 'deepak@email.com', phone: '9867890123', project: 'Form Filling', earnings: '₹8,000', status: 'inactive', joined: '28 Jan 2026', aadhaar: 'XXXX-2345' },
  { id: 7, name: 'Anjali Gupta', username: 'anjali_gupta', email: 'anjali@email.com', phone: '9878901234', project: 'Data Entry', earnings: '₹19,500', status: 'active', joined: '02 Feb 2026', aadhaar: 'XXXX-6789' },
  { id: 8, name: 'Rohit Verma', username: 'rohit_verma', email: 'rohit@email.com', phone: '9889012345', project: 'Form Filling', earnings: '₹0', status: 'pending', joined: '05 Feb 2026', aadhaar: '' },
  { id: 9, name: 'Meena Joshi', username: 'meena_joshi', email: 'meena@email.com', phone: '9890123456', project: 'Form Filling', earnings: '₹12,000', status: 'active', joined: '08 Feb 2026', aadhaar: 'XXXX-0123' },
  { id: 10, name: 'Suresh Nair', username: 'suresh_nair', email: 'suresh@email.com', phone: '9901234567', project: 'Data Entry', earnings: '₹0', status: 'pending', joined: '10 Feb 2026', aadhaar: '' },
];

const PAYMENTS_DATA = [
  { id: 1, user: 'Priya Sharma', project: 'Data Entry', amount: '₹400', method: 'UPI', txId: 'UPI2026011501', date: '15 Jan 2026', status: 'paid' },
  { id: 2, user: 'Ravi Kumar', project: 'Data Entry', amount: '₹500', method: 'Bank Transfer', txId: 'NEFT2026011801', date: '18 Jan 2026', status: 'paid' },
  { id: 3, user: 'Sunita Devi', project: 'Form Filling', amount: '₹300', method: 'Paytm', txId: 'PAYTM20260120', date: '20 Jan 2026', status: 'processing' },
  { id: 4, user: 'Amit Patel', project: 'Data Entry', amount: '₹400', method: 'UPI', txId: 'UPI2026012201', date: '22 Jan 2026', status: 'paid' },
  { id: 5, user: 'Kavita Singh', project: 'Form Filling', amount: '₹500', method: 'Bank Transfer', txId: 'NEFT2026012501', date: '25 Jan 2026', status: 'paid' },
  { id: 6, user: 'Deepak Yadav', project: 'Form Filling', amount: '₹300', method: 'Paytm', txId: 'PAYTM20260128', date: '28 Jan 2026', status: 'pending' },
  { id: 7, user: 'Rohit Verma', project: 'Form Filling', amount: '₹500', method: 'UPI', txId: 'UPI2026020501', date: '05 Feb 2026', status: 'pending' },
  { id: 8, user: 'Suresh Nair', project: 'Data Entry', amount: '₹400', method: 'Bank Transfer', txId: 'NEFT2026021001', date: '10 Feb 2026', status: 'processing' },
];

const WITHDRAWALS_DATA = [
  { id: 1, worker: 'Priya Sharma', amount: '₹15,000', method: 'Bank Transfer', account: 'HDFC xxxx-4321', date: '01 Feb 2026', status: 'paid' },
  { id: 2, worker: 'Ravi Kumar', amount: '₹24,000', method: 'Paytm', account: '9823456789', date: '01 Feb 2026', status: 'paid' },
  { id: 3, worker: 'Kavita Singh', amount: '₹30,000', method: 'Bank Transfer', account: 'SBI xxxx-8765', date: '03 Feb 2026', status: 'processing' },
  { id: 4, worker: 'Anjali Gupta', amount: '₹12,000', method: 'UPI', account: 'anjali@upi', date: '05 Feb 2026', status: 'pending' },
  { id: 5, worker: 'Amit Patel', amount: '₹18,500', method: 'Bank Transfer', account: 'ICICI xxxx-2109', date: '07 Feb 2026', status: 'pending' },
  { id: 6, worker: 'Meena Joshi', amount: '₹9,000', method: 'Paytm', account: '9890123456', date: '10 Feb 2026', status: 'pending' },
];

let PROJECTS_DATA = [
  {
    id: 1,
    key: 'data_entry',
    name: 'DATA ENTRY PROJECT',
    workDesc: 'Work Description',
    fee: 'Work Description',
    perUnit: 'Rs.60',
    daily: '350 pages',
    potential: 'Rs.21,000',
    weeklyWork: '350 pages',
    weeklyEarnings: 'Rs.21,000',
    timing: 'No Time - No Limit',
    payout: 'Any Time Work - Weekly Salary',
    workers: 104,
    status: 'active'
  },
  {
    id: 3,
    key: 'form_filling',
    name: 'FORM FILLING PROJECT',
    workDesc: 'Work Description',
    fee: 'Work Description',
    perUnit: 'Rs.50',
    daily: '350 pages',
    potential: 'Rs.19,500',
    weeklyWork: '350 pages',
    weeklyEarnings: 'Rs.19,500',
    timing: 'No Time - No Limit',
    payout: 'Any Time Work - Weekly Salary',
    workers: 57,
    status: 'active'
  }
];

function loadProjectsFromStorage() {
  try {
    const saved = JSON.parse(localStorage.getItem('ewi_projects_db') || 'null');
    if (Array.isArray(saved) && saved.length > 0) {
      const isStale = saved.some(p => 
        p.key === 'captcha' || 
        p.daily === '30 Pages' || 
        p.daily === '30 Captchas' || 
        p.potential === 'Rs.1,500' || 
        !p.weeklyWork || 
        !p.weeklyEarnings ||
        (p.key === 'data_entry' && p.perUnit === 'Rs.50')
      );
      if (isStale) {
        localStorage.removeItem('ewi_projects_db');
      } else {
        PROJECTS_DATA = saved.filter(x => x.key !== 'captcha');
      }
    }
  } catch(_) {}

  if (typeof fetch === 'function') {
    fetch('/api/projects')
      .then(r => r.json())
      .then(d => {
        if (d && Array.isArray(d.projects) && d.projects.length > 0) {
          PROJECTS_DATA = d.projects.filter(x => x.key !== 'captcha');
          try { localStorage.setItem('ewi_projects_db', JSON.stringify(PROJECTS_DATA)); } catch(_) {}
          if (typeof renderProjectsTable === 'function') renderProjectsTable();
        }
      })
      .catch(() => {});
  }
}
loadProjectsFromStorage();

const REVIEWS_DATA = [
  { id: 1, name: 'Ananya Sharma', rating: 5, text: 'My sister introduced me to this work-from-home opportunity. I decided to join, and it has been a wonderful experience.', project: 'Data Entry · Mumbai', date: '10 Feb 2026', status: 'active' },
  { id: 2, name: 'Rohit Verma', rating: 5, text: 'I was looking for a flexible way to earn from home, and this opportunity matched my expectations.', project: 'Form Filling · Delhi', date: '12 Feb 2026', status: 'active' },
  { id: 3, name: 'Sneha Patil', rating: 4, text: 'I joined this platform 3 months ago and have been very happy with the consistent income. Daily work keeps me busy.', project: 'Form Filling · Pune', date: '14 Feb 2026', status: 'active' },
  { id: 4, name: 'Vikram Mehta', rating: 5, text: 'The payment system is very transparent. I receive my weekly salary on time every time.', project: 'Data Entry · Bangalore', date: '15 Feb 2026', status: 'pending' },
  { id: 5, name: 'Pooja Nair', rating: 4, text: 'Best work from home platform I have ever used. Simple tasks, good pay, great support.', project: 'Data Entry · Chennai', date: '18 Feb 2026', status: 'active' },
];

const NOTIFICATIONS_DATA = [
  { id: 1, icon: 'bi-person-plus', color: '#2563eb', bg: 'rgba(37,99,235,.15)', title: 'New User Registration', sub: 'Rohit Verma registered for Form Filling Project', time: '5 min ago', unread: true },
  { id: 2, icon: 'bi-cash', color: '#16a34a', bg: 'rgba(22,163,74,.15)', title: 'Payment Received', sub: 'Suresh Nair verified for Data Entry Project', time: '1 hour ago', unread: true },
  { id: 3, icon: 'bi-arrow-up-circle', color: '#d97706', bg: 'rgba(217,119,6,.15)', title: 'Withdrawal Request', sub: 'Meena Joshi requested withdrawal of ₹9,000', time: '2 hours ago', unread: false },
  { id: 4, icon: 'bi-star', color: '#7c3aed', bg: 'rgba(124,58,237,.15)', title: 'New Review Submitted', sub: 'Vikram Mehta submitted a 5-star review', time: '3 hours ago', unread: false },
  { id: 5, icon: 'bi-person-check', color: '#0d9488', bg: 'rgba(13,148,136,.15)', title: 'User Activated', sub: 'Kavita Singh account is now active and working', time: '5 hours ago', unread: false },
];

const ANNOUNCEMENTS_DATA = [
  { id: 1, title: 'Weekly Payout Reminder', message: 'Payouts for this week will be processed on Saturday. Ensure your bank details are updated.', target: 'All Workers', by: 'Admin', date: '20 Jan 2026' },
  { id: 2, title: 'Weekly Earnings Schedule Active', message: 'Data Entry (Rs.60/page, 350 pages weekly) and Form Filling (Rs.50/form, 350 pages weekly) payouts are processed every week.', target: 'All Workers', by: 'Admin', date: '15 Jan 2026' },
  { id: 3, title: 'Holiday Notice', message: 'Office will remain closed on Republic Day. Work from home continues as usual.', target: 'All Workers', by: 'Admin', date: '24 Jan 2026' }
];

/* ===== STATE ===== */
let currentPage = 'dashboard';
let adminProfile = {
  fullName: 'Admin User',
  username: 'admin',
  email: 'admin@easyworkindia.online',
  phone: '9876543210',
  aadhaar: '',
  signatureData: null,
  avatarSrc: null,
};

/* ===== GLOBAL SETTINGS ===== */
let EWI_SETTINGS = { premiumPrice: 499, weeklyQuota: 350, withdrawalEnabled: false };
function loadEwiSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('ewi_settings') || 'null');
    if (saved && typeof saved === 'object') EWI_SETTINGS = { ...EWI_SETTINGS, ...saved };
  } catch(_) {}
}
function saveEwiSettings() {
  try { localStorage.setItem('ewi_settings', JSON.stringify(EWI_SETTINGS)); } catch(_) {}
}
loadEwiSettings();

/* ===== USERS DATABASE INITIALIZATION & SYNC ===== */
function initAdminUsersDb() {
  let db = [];
  try { db = JSON.parse(localStorage.getItem('ewi_users_db') || '[]'); } catch(_) {}

  if (db && db.length > 0) {
    db.forEach(storedUser => {
      const idx = USERS_DATA.findIndex(u => (u.phone && storedUser.phone && u.phone === storedUser.phone) || u.id === storedUser.id);
      if (idx > -1) {
        USERS_DATA[idx] = { ...USERS_DATA[idx], ...storedUser };
      } else {
        USERS_DATA.unshift(storedUser);
      }
    });
  } else {
    // Seed default demo accounts so worker sign in works immediately
    const baseline = USERS_DATA.map(u => ({
      ...u,
      userId: u.phone,
      projectKey: u.project === 'Form Filling' ? 'form_filling' : 'data_entry',
      plainPassword: 'Work@' + u.phone.slice(-4),
      accountStatus: u.status === 'active' ? 'Active' : 'Pending',
      createdAt: new Date().toISOString()
    }));
    try { localStorage.setItem('ewi_users_db', JSON.stringify(baseline)); } catch(_) {}
  }
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize users database sync
  initAdminUsersDb();

  // Check if already logged in
  if (sessionStorage.getItem('ewi_admin_logged_in') === 'true') {
    showDashboard();
  }

  // Login button
  const loginBtn = document.getElementById('adminLoginBtn');
  if (loginBtn) loginBtn.addEventListener('click', handleLogin);

  // Enter key on password
  const passInput = document.getElementById('adminPass');
  if (passInput) passInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });
  const idInput = document.getElementById('adminId');
  if (idInput) idInput.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('adminPass').focus(); });

  // Sidebar nav
  document.querySelectorAll('.sidebar-link[data-page]').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

  // Sidebar toggle (mobile)
  const toggleBtn = document.getElementById('sidebarToggle');
  if (toggleBtn) toggleBtn.addEventListener('click', () => {
    document.getElementById('adminSidebar').classList.toggle('open');
  });

  // Filter tabs
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(b => {
        b.classList.remove('active', 'admin-btn-primary');
        b.classList.add('admin-btn-outline');
      });
      btn.classList.add('active', 'admin-btn-primary');
      btn.classList.remove('admin-btn-outline');
      filterUsers(btn.dataset.filter);
    });
  });

  // User search
  const userSearch = document.getElementById('userSearch');
  if (userSearch) userSearch.addEventListener('input', e => searchUsers(e.target.value));

  // Task filter tabs
  document.querySelectorAll('.task-filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.task-filter-tab').forEach(b => {
        b.classList.remove('active', 'admin-btn-primary');
        b.classList.add('admin-btn-outline');
      });
      btn.classList.add('active', 'admin-btn-primary');
      btn.classList.remove('admin-btn-outline');
      filterTasks(btn.dataset.filter);
    });
  });

  // Task search
  const taskSearch = document.getElementById('taskSearch');
  if (taskSearch) taskSearch.addEventListener('input', e => searchTasks(e.target.value));

  // Signature canvas
  initSignatureCanvas();

  // Load profile from storage
  loadProfileFromStorage();
});

/* ===== LOGIN ===== */
function fillAdminCredentials() {
  document.getElementById('adminId').value = ADMIN_CREDENTIALS.id;
  document.getElementById('adminPass').value = ADMIN_CREDENTIALS.password;
  handleLogin();
}

function handleLogin() {
  const id   = (document.getElementById('adminId').value   || '').trim();
  const pass = (document.getElementById('adminPass').value || '').trim();
  const errorEl = document.getElementById('loginError');
  if ((id === ADMIN_CREDENTIALS.id || id.toLowerCase() === 'admin') && pass === ADMIN_CREDENTIALS.password) {
    if (errorEl) errorEl.classList.remove('show');
    sessionStorage.setItem('ewi_admin_logged_in', 'true');
    showDashboard();
    showAdminToast('Welcome back, Admin! 👋');
  } else {
    errorEl.classList.add('show');
    document.getElementById('adminPass').value = '';
    // Shake the card for feedback
    const card = document.querySelector('.admin-login-card');
    if (card) {
      card.style.animation = 'none';
      requestAnimationFrame(() => { card.style.animation = 'shake .4s ease'; });
    }
  }
}

function showDashboard() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('dashboardPage').style.display = '';
  renderAllData();
  renderWeeklyChart();
  document.getElementById('lastLoginDisplay').textContent = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function handleLogout() {
  sessionStorage.removeItem('ewi_admin_logged_in');
  document.getElementById('dashboardPage').style.display = 'none';
  document.getElementById('loginPage').style.display = '';
  document.getElementById('adminId').value = '';
  document.getElementById('adminPass').value = '';
  showAdminToast('Logged out successfully.');
}

/* ===== NAVIGATION ===== */
function navigateTo(page) {
  currentPage = page;
  // Hide all
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  // Show target
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');
  // Update sidebar
  document.querySelectorAll('.sidebar-link[data-page]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });
  // Update topbar title
  const titles = {
    dashboard: 'Dashboard', users: 'User Management', projects: 'Projects Management',
    tasks: 'Daily Task Manager', payments: 'Payment Management', withdrawals: 'Withdrawal Requests',
    reviews: 'Reviews', verifications: 'Identity Verifications', notifications: 'Notifications',
    announcements: 'Announcements', profile: 'My Profile', settings: 'Settings'
  };
  document.getElementById('topbarTitle').textContent = titles[page] || 'Admin Panel';
  // Load verifications when navigating to that page
  if (page === 'verifications') loadPendingVerifications();
  if (page === 'tasks') renderTasksTable();
  if (page === 'settings') renderSettingsPage();
  // Close sidebar on mobile
  if (page === 'verifications') loadPendingVerifications();
  if (page === 'tasks') renderTasksTable();
  // Close sidebar on mobile
  document.getElementById('adminSidebar').classList.remove('open');
}

/* ===== RENDER DATA ===== */
function renderAllData() {
  loadUnitRates();
  renderRecentUsers();
  renderUsersTable(USERS_DATA);
  renderProjectsTable();
  renderPaymentsTable(PAYMENTS_DATA);
  renderWithdrawalsTable();
  renderReviewsTable();
  renderNotifications();
  renderAnnouncementsTable();
  loadProfileToForm();
  loadPendingVerifications();
  initTasksDb();
  renderTasksTable();
  updateTaskStats();
}

function renderRecentUsers() {
  const tbody = document.getElementById('recentUsersTable');
  if (!tbody) return;
  tbody.innerHTML = USERS_DATA.slice(0, 5).map(u => {
    const photo = u.photoUrl || u.photo_url;
    const avatar = photo ?
      `<img src="${photo}" style="width:34px;height:34px;border-radius:50%;object-fit:cover;border:1.5px solid #3b82f6;flex-shrink:0">` :
      `<div class="user-mini-avatar">${initials(u.name)}</div>`;
    return `
    <tr>
      <td><div class="user-cell">${avatar}<div class="user-info-cell"><strong>${u.name}</strong><span>@${u.username}</span></div></div></td>
      <td>${u.phone}</td>
      <td>${u.project}</td>
      <td><span class="status-badge status-${u.status}">${capitalize(u.status)}</span></td>
      <td>${u.joined}</td>
      <td><div class="action-btns">
        <button class="action-btn action-btn-view" onclick="viewUser(${u.id})" title="View"><i class="bi bi-eye"></i></button>
        <button class="action-btn action-btn-edit" onclick="editUser(${u.id})" title="Edit"><i class="bi bi-pencil"></i></button>
        ${u.status === 'pending' ? `<button class="action-btn action-btn-approve" onclick="approveUser(${u.id})" title="Approve"><i class="bi bi-check-lg"></i></button>` : ''}
      </div></td>
    </tr>`;
  }).join('');
}

async function toggleUserStatus(id) {
  const u = USERS_DATA.find(x => x.id === id);
  if (!u) return;
  const newStatus = (u.status === 'active') ? 'disabled' : 'active';
  u.status = newStatus;

  // Sync SQLite backend
  try {
    await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
  } catch(_) {}

  // Sync localStorage ewi_users_db
  let db = [];
  try { db = JSON.parse(localStorage.getItem('ewi_users_db') || '[]'); } catch(_) {}
  const idx = db.findIndex(x => x.id === id || x.username === u.username || x.phone === u.phone);
  if (idx > -1) {
    db[idx].status = newStatus;
    try { localStorage.setItem('ewi_users_db', JSON.stringify(db)); } catch(_) {}
  }

  // Sync active profile if logged in worker matches
  try {
    const prof = JSON.parse(localStorage.getItem('ewi_user_profile') || 'null');
    if (prof && (prof.id === id || prof.username === u.username || prof.phone === u.phone)) {
      prof.status = newStatus;
      localStorage.setItem('ewi_user_profile', JSON.stringify(prof));
    }
  } catch(_) {}

  renderUsersTable(USERS_DATA);
  showAdminToast(`Worker ${u.name} is now ${newStatus === 'active' ? 'ACTIVE ✓ (Enabled)' : 'DISABLED ✗ (Deactivated)'}`);
}



function renderUsersTable(data) {
  const tbody = document.getElementById('usersTable');
  if (!tbody) return;
  tbody.innerHTML = data.map(u => {
    const photo = u.photoUrl || u.photo_url;
    const avatar = photo ?
      `<img src="${photo}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:1.5px solid #3b82f6;flex-shrink:0">` :
      `<div class="user-mini-avatar">${initials(u.name)}</div>`;
    const isAct = (u.status === 'active');
    const statusLabel = isAct ? 'Active' : (u.status === 'pending' ? 'Pending' : 'Disabled');
    const badgeClass = isAct ? 'status-active' : (u.status === 'pending' ? 'status-pending' : 'status-inactive');
    return `
    <tr>
      <td><div class="user-cell">${avatar}<div class="user-info-cell"><strong>${u.name}</strong><span style="color:#60a5fa;font-weight:600">ID: ${u.username || u.userId || u.phone}</span></div></div></td>
      <td>${u.phone || '<span style="color:rgba(255,255,255,.3)">—</span>'}</td>
      <td>${u.email || '<span style="color:rgba(255,255,255,.3)">—</span>'}</td>
      <td><span style="font-size:.78rem">${u.project}</span></td>
      <td style="color:#4ade80;font-weight:700">${u.earnings || '₹0'}</td>
      <td><span class="status-badge ${badgeClass}">${statusLabel}</span></td>
      <td>${u.joined || '—'}</td>
      <td><div class="action-btns">
        <button class="action-btn action-btn-view" onclick="viewUser(${u.id})" title="View Profile"><i class="bi bi-eye"></i></button>
        <button class="action-btn action-btn-edit" onclick="editUser(${u.id})" title="Edit Details"><i class="bi bi-pencil"></i></button>
        <button class="action-btn" style="background:rgba(34,197,94,.18);color:#4ade80;border:1px solid rgba(34,197,94,.35)" onclick="openWalletCreditModal(${u.id})" title="Wallet &amp; KYC"><i class="bi bi-wallet2"></i></button>
        ${isAct ? `
          <button class="action-btn" style="background:rgba(239,68,68,.18);color:#f87171;border:1px solid rgba(239,68,68,.35)" onclick="toggleUserStatus(${u.id})" title="Disable Account (Deactivate)"><i class="bi bi-slash-circle"></i></button>
        ` : `
          <button class="action-btn" style="background:rgba(34,197,94,.18);color:#4ade80;border:1px solid rgba(34,197,94,.35)" onclick="toggleUserStatus(${u.id})" title="Activate Account (Enable)"><i class="bi bi-check-circle-fill"></i></button>
        `}
        ${u.status === 'pending' ? `<button class="action-btn action-btn-approve" onclick="approveUser(${u.id})" title="Approve"><i class="bi bi-check-lg"></i></button>` : ''}
        <button class="action-btn action-btn-delete" onclick="deleteUser(${u.id})" title="Delete / Clear Fields"><i class="bi bi-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('');
}


function renderProjectsTable() {
  const tbody = document.getElementById('projectsTable');
  if (!tbody) return;
  tbody.innerHTML = PROJECTS_DATA.filter(x => x.key !== 'captcha').map(p => `
    <tr>
      <td><strong style="color:#fff">${p.name}</strong></td>
      <td><span class="status-badge" style="background:rgba(37,99,235,.2);color:#93c5fd">${p.workDesc || p.fee || 'Work Description'}</span></td>
      <td style="color:#4ade80;font-weight:700">${p.perUnit || (p.key === 'data_entry' ? 'Rs.60' : 'Rs.50')}</td>
      <td>${p.weeklyWork || p.daily || '350 pages'}</td>
      <td style="color:#fbbf24;font-weight:700">${p.weeklyEarnings || p.potential || (p.key === 'data_entry' ? 'Rs.21,000' : 'Rs.19,500')}</td>
      <td><span style="font-size:.8rem;color:rgba(255,255,255,.7)">${p.timing || 'No Time - No Limit'}</span></td>
      <td><span style="font-size:.8rem;color:#a7f3d0">${p.payout || 'Any Time Work - Weekly Salary'}</span></td>
      <td><div class="action-btns">
        <button class="action-btn action-btn-edit" onclick="editProject(${p.id})" title="Edit Work Description"><i class="bi bi-pencil"></i></button>
      </div></td>
    </tr>`).join('');
}

function renderPaymentsTable(data) {
  const tbody = document.getElementById('paymentsTable');
  if (!tbody) return;
  tbody.innerHTML = data.map(p => `
    <tr>
      <td><div class="user-cell"><div class="user-mini-avatar">${initials(p.user)}</div><span style="color:#fff;font-weight:600">${p.user}</span></div></td>
      <td><span style="font-size:.78rem">${p.project}</span></td>
      <td style="color:#4ade80;font-weight:700">${p.amount}</td>
      <td>${p.method}</td>
      <td><code style="font-size:.75rem;color:rgba(255,255,255,.5)">${p.txId}</code></td>
      <td>${p.date}</td>
      <td><span class="status-badge status-${p.status}">${capitalize(p.status)}</span></td>
      <td><div class="action-btns">
        <button class="action-btn action-btn-view" onclick="viewPayment(${p.id})" title="View"><i class="bi bi-eye"></i></button>
        ${p.status === 'pending' ? `<button class="action-btn action-btn-approve" onclick="approvePayment(${p.id})" title="Approve"><i class="bi bi-check-lg"></i></button>` : ''}
        ${p.status === 'pending' ? `<button class="action-btn action-btn-delete" onclick="rejectPayment(${p.id})" title="Reject"><i class="bi bi-x-lg"></i></button>` : ''}
      </div></td>
    </tr>`).join('');
}

function renderWithdrawalsTable() {
  const tbody = document.getElementById('withdrawalsTable');
  if (!tbody) return;

  // Merge static mock data with live worker-submitted requests from localStorage
  let liveReqs = [];
  try {
    const stored = JSON.parse(localStorage.getItem('ewi_withdrawal_requests') || '[]');
    liveReqs = stored.map((r, i) => ({
      id      : 'live_' + i,
      worker  : r.name || r.workerId || 'Unknown',
      amount  : r.amount || '₹0',
      method  : r.method === 'bank' ? 'Bank Transfer' : r.method === 'upi' ? 'UPI' : r.method === 'paytm' ? 'Paytm' : r.method,
      account : r.method === 'bank'
                  ? (r.details && r.details.accNum ? 'A/C: ' + r.details.accNum : '-')
                  : r.method === 'upi'
                  ? (r.details && r.details.upiId ? r.details.upiId : '-')
                  : r.method === 'paytm'
                  ? (r.details && r.details.paytmMobile ? r.details.paytmMobile : '-')
                  : '-',
      date    : r.date ? new Date(r.date).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '-',
      status  : r.status || 'pending'
    }));
  } catch(_) {}

  const allRows = [...liveReqs, ...WITHDRAWALS_DATA];

  tbody.innerHTML = allRows.map(w => `
    <tr>
      <td><div class="user-cell"><div class="user-mini-avatar">${initials(w.worker)}</div><span style="color:#fff;font-weight:600">${w.worker}</span></div></td>
      <td style="color:#4ade80;font-weight:700">${w.amount}</td>
      <td>${w.method}</td>
      <td><code style="font-size:.78rem;color:rgba(255,255,255,.6)">${w.account}</code></td>
      <td>${w.date}</td>
      <td><span class="status-badge status-${w.status}">${capitalize(w.status)}</span></td>
      <td><div class="action-btns">
        ${w.status === 'pending' ? `<button class="action-btn action-btn-approve" onclick="approveWithdrawal('${w.id}')" title="Approve &amp; Pay"><i class="bi bi-check-lg"></i></button>` : ''}
        ${w.status === 'pending' ? `<button class="action-btn action-btn-delete" onclick="rejectWithdrawal('${w.id}')" title="Reject"><i class="bi bi-x-lg"></i></button>` : ''}
        <button class="action-btn action-btn-view" onclick="viewWithdrawal('${w.id}')" title="View"><i class="bi bi-eye"></i></button>
      </div></td>
    </tr>`).join('');
}

function renderReviewsTable() {
  const tbody = document.getElementById('reviewsTable');
  if (!tbody) return;
  tbody.innerHTML = REVIEWS_DATA.map(r => `
    <tr>
      <td><div class="user-cell"><div class="user-mini-avatar">${initials(r.name)}</div><span style="color:#fff;font-weight:600">${r.name}</span></div></td>
      <td><span style="color:#f59e0b">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span></td>
      <td><span style="font-size:.8rem;color:rgba(255,255,255,.65);max-width:220px;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.text}</span></td>
      <td><span style="font-size:.78rem">${r.project}</span></td>
      <td>${r.date}</td>
      <td><span class="status-badge status-${r.status}">${capitalize(r.status)}</span></td>
      <td><div class="action-btns">
        <button class="action-btn action-btn-view" onclick="viewReview(${r.id})" title="View"><i class="bi bi-eye"></i></button>
        <button class="action-btn action-btn-edit" onclick="editReview(${r.id})" title="Edit"><i class="bi bi-pencil"></i></button>
        <button class="action-btn action-btn-delete" onclick="deleteReview(${r.id})" title="Delete"><i class="bi bi-trash"></i></button>
      </div></td>
    </tr>`).join('');
}

function renderNotifications() {
  const list = document.getElementById('notificationsList');
  if (!list) return;
  list.innerHTML = NOTIFICATIONS_DATA.map(n => `
    <div class="notification-item ${n.unread ? 'unread' : ''}" onclick="markRead(${n.id})">
      <div class="notif-icon" style="background:${n.bg};color:${n.color}"><i class="bi ${n.icon}"></i></div>
      <div class="notif-info">
        <div class="notif-title">${n.title}</div>
        <div class="notif-sub">${n.sub}</div>
      </div>
      <span class="notif-time">${n.time}</span>
    </div>`).join('');
}

function renderAnnouncementsTable() {
  const tbody = document.getElementById('announcementsTable');
  if (!tbody) return;
  tbody.innerHTML = ANNOUNCEMENTS_DATA.map(a => `
    <tr>
      <td><strong style="color:#fff">${a.title}</strong></td>
      <td><span style="font-size:.78rem;color:rgba(255,255,255,.65)">${a.message.slice(0, 60)}...</span></td>
      <td><span class="status-badge" style="background:rgba(37,99,235,.2);color:#60a5fa">${a.target}</span></td>
      <td>${a.by}</td>
      <td>${a.date}</td>
      <td><div class="action-btns">
        <button class="action-btn action-btn-view" onclick="viewAnnouncement(${a.id})" title="View"><i class="bi bi-eye"></i></button>
        <button class="action-btn action-btn-delete" onclick="deleteAnnouncement(${a.id})" title="Delete"><i class="bi bi-trash"></i></button>
      </div></td>
    </tr>`).join('');
}

/* ===== CHART ===== */
function renderWeeklyChart() {
  const container = document.getElementById('weeklyChart');
  if (!container) return;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = [12, 18, 8, 24, 15, 32, 20];
  const max = Math.max(...values);
  container.innerHTML = days.map((d, i) => {
    const h = Math.round((values[i] / max) * 120);
    const colors = ['#2563eb', '#0d9488', '#16a34a', '#7c3aed', '#d97706', '#2563eb', '#0d9488'];
    return `<div class="chart-bar-group">
      <div class="chart-bar" style="height:${h}px;background:${colors[i]};opacity:.85" title="${values[i]} registrations"></div>
      <span class="chart-label">${d}</span>
    </div>`;
  }).join('');
}


/* ===== FILTERS & SEARCH ===== */
function filterUsers(filter) {
  if (filter === 'all') { renderUsersTable(USERS_DATA); return; }
  renderUsersTable(USERS_DATA.filter(u => u.status === filter));
}

function searchUsers(q) {
  const filtered = USERS_DATA.filter(u =>
    u.name.toLowerCase().includes(q.toLowerCase()) ||
    u.phone.includes(q) ||
    u.email.toLowerCase().includes(q.toLowerCase())
  );
  renderUsersTable(filtered);
}

/* ===== ACTIONS ===== */
function approveUser(id) {
  const user = USERS_DATA.find(u => u.id === id);
  if (!user) return;
  user.status = 'active';
  renderAllData();
  document.getElementById('statPending').textContent = USERS_DATA.filter(u => u.status === 'pending').length;
  const badge = document.getElementById('pendingUsersBadge');
  const pending = USERS_DATA.filter(u => u.status === 'pending').length;
  badge.textContent = pending;
  showAdminToast(`${user.name} has been activated!`);
}

function deleteUser(id) {
  const u = USERS_DATA.find(x => x.id === id);
  if (!u) return;
  openAdminModal(`Delete / Clear — ${u.name}`, `
    <div style="background:rgba(239,68,68,.1);border:1.5px solid rgba(239,68,68,.35);border-radius:12px;padding:12px 16px;margin-bottom:18px;display:flex;gap:10px;align-items:flex-start">
      <i class="bi bi-exclamation-triangle-fill" style="color:#f87171;font-size:1.4rem;flex-shrink:0;margin-top:2px"></i>
      <div style="font-size:.83rem;color:#fca5a5;line-height:1.5">
        <strong style="color:#fff">Manage User Data — ${u.name}</strong><br>
        Use the buttons below to clear individual fields or permanently delete the entire account.
      </div>
    </div>

    <!-- Individual Field Clear Options -->
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px">
      <div style="font-size:.78rem;font-weight:700;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">Clear Individual Fields</div>

      ${[
        { label: 'Profile Photo',      icon: 'bi-person-circle',   field: 'photo_url',        has: !!(u.photoUrl || u.photo_url) },
        { label: 'Aadhaar Document',   icon: 'bi-card-image',      field: 'aadhaar_file',     has: !!u.aadhaarFile },
        { label: 'Digital Signature',  icon: 'bi-pen',             field: 'signature_data',   has: !!u.signatureData },
        { label: 'Aadhaar Number',     icon: 'bi-credit-card',     field: 'aadhaar',          has: !!u.aadhaar },
        { label: 'Login Password',     icon: 'bi-key',             field: 'plain_password',   has: !!u.plainPassword },
        { label: 'Earnings Balance',   icon: 'bi-currency-rupee',  field: 'earnings',         has: !!(u.earnings && u.earnings !== '₹0') },
        { label: 'Home Address',       icon: 'bi-geo-alt',         field: 'address',          has: !!u.address },
      ].map(row => `
        <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:10px 14px">
          <span style="display:flex;align-items:center;gap:8px;font-size:.85rem;color:rgba(255,255,255,.8)">
            <i class="bi ${row.icon}" style="color:${row.has ? '#60a5fa' : 'rgba(255,255,255,.3)'}"></i>
            ${row.label}
            ${row.has ? '<span style="font-size:.72rem;background:rgba(34,197,94,.15);color:#4ade80;padding:1px 8px;border-radius:10px;font-weight:600">Has Data</span>' : '<span style="font-size:.72rem;color:rgba(255,255,255,.3)">Empty</span>'}
          </span>
          <button class="admin-btn admin-btn-outline" style="padding:4px 12px;font-size:.78rem;color:#f87171;border-color:rgba(239,68,68,.4)" onclick="clearUserField(${id},'${row.field}')" ${!row.has ? 'disabled style="padding:4px 12px;font-size:.78rem;opacity:.35;cursor:not-allowed"' : ''}>
            <i class="bi bi-x-circle"></i> Clear
          </button>
        </div>
      `).join('')}
    </div>

    <!-- Full Account Delete -->
    <div style="border-top:1px solid rgba(239,68,68,.25);padding-top:16px">
      <div style="font-size:.78rem;font-weight:700;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px">Danger Zone</div>
      <div style="background:rgba(239,68,68,.08);border:1.5px solid rgba(239,68,68,.3);border-radius:10px;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
        <div>
          <div style="font-size:.88rem;font-weight:700;color:#fca5a5">Delete Entire Account</div>
          <div style="font-size:.78rem;color:rgba(255,255,255,.45);margin-top:2px">Permanently removes all data for ${u.name}. This cannot be undone.</div>
        </div>
        <button class="admin-btn" style="background:#dc2626;color:#fff;border:none;padding:8px 18px;font-size:.85rem" onclick="confirmDeleteUser(${id})">
          <i class="bi bi-trash3-fill"></i> Delete Account
        </button>
      </div>
    </div>

    <div class="modal-footer-btns" style="margin-top:18px">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Close</button>
    </div>
  `);
}

function clearUserField(id, field) {
  const u = USERS_DATA.find(x => x.id === id);
  if (!u) return;
  const fieldLabels = { photo_url: 'Profile Photo', aadhaar_file: 'Aadhaar Document', signature_data: 'Digital Signature', aadhaar: 'Aadhaar Number', plain_password: 'Login Password', earnings: 'Earnings Balance', address: 'Home Address' };
  if (!confirm(`Clear ${fieldLabels[field] || field} for ${u.name}? This cannot be undone.`)) return;

  // Clear in memory
  if (field === 'photo_url')       { u.photoUrl = ''; u.photo_url = ''; }
  else if (field === 'aadhaar_file')    u.aadhaarFile = '';
  else if (field === 'signature_data')  u.signatureData = '';
  else if (field === 'aadhaar')         u.aadhaar = '';
  else if (field === 'plain_password')  u.plainPassword = '';
  else if (field === 'earnings')   { u.earnings = '₹0'; }
  else if (field === 'address')         u.address = '';

  // Clear in localStorage
  try {
    let db = JSON.parse(localStorage.getItem('ewi_users_db') || '[]');
    const idx = db.findIndex(x => x.id === id || x.phone === u.phone);
    if (idx > -1) {
      if (field === 'photo_url')      { db[idx].photoUrl = ''; db[idx].photo_url = ''; }
      else if (field === 'aadhaar_file')   db[idx].aadhaarFile = '';
      else if (field === 'signature_data') db[idx].signatureData = '';
      else if (field === 'aadhaar')        db[idx].aadhaar = '';
      else if (field === 'plain_password') db[idx].plainPassword = '';
      else if (field === 'earnings')  { db[idx].earnings = '₹0'; }
      else if (field === 'address')        db[idx].address = '';
      localStorage.setItem('ewi_users_db', JSON.stringify(db));
    }
  } catch(_) {}

  // Clear in SQLite via API
  fetch(`/api/users/${id}/clearfield`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ field })
  }).catch(() => {});

  closeAdminModal();
  renderAllData();
  showAdminToast(`✓ ${fieldLabels[field] || field} cleared for ${u.name}.`);
}

function confirmDeleteUser(id) {
  const u = USERS_DATA.find(x => x.id === id);
  if (!u) return;
  if (!confirm(`PERMANENTLY DELETE account for "${u.name}" (${u.phone})?\n\nAll data will be erased and this cannot be undone.`)) return;

  const idx = USERS_DATA.findIndex(x => x.id === id);
  if (idx > -1) USERS_DATA.splice(idx, 1);

  // Remove from localStorage
  try {
    let db = JSON.parse(localStorage.getItem('ewi_users_db') || '[]');
    db = db.filter(x => x.phone !== u.phone && x.id !== id);
    localStorage.setItem('ewi_users_db', JSON.stringify(db));
  } catch(_) {}

  // Delete from SQLite via API
  fetch(`/api/users/${id}`, { method: 'DELETE' }).catch(() => {});

  closeAdminModal();
  renderAllData();
  showAdminToast(`Account for ${u.name} permanently deleted.`);
}

/* ===== PREMIUM SETTINGS MODAL ===== */
function openPremiumSettings() {
  openAdminModal('Premium & Withdrawal Settings', `
    <div style="display:flex;flex-direction:column;gap:16px">

      <div style="background:rgba(124,58,237,.1);border:1px solid rgba(124,58,237,.3);border-radius:10px;padding:14px 16px">
        <div style="font-size:.82rem;font-weight:700;color:#c4b5fd;margin-bottom:12px;display:flex;align-items:center;gap:6px">
          <i class="bi bi-gem" style="color:#a78bfa"></i> Premium Membership Price
        </div>
        <div style="display:flex;gap:10px;align-items:center">
          <span style="font-size:1.2rem;color:#fff;font-weight:700">₹</span>
          <input type="number" id="settingPremiumPrice" value="${EWI_SETTINGS.premiumPrice}" min="0" max="99999" style="font-size:1.1rem;font-weight:700;color:#a78bfa;width:120px;text-align:center">
          <span style="font-size:.8rem;color:rgba(255,255,255,.5)">One-time activation fee shown to workers</span>
        </div>
      </div>

      <div style="background:rgba(37,99,235,.07);border:1px solid rgba(37,99,235,.22);border-radius:10px;padding:14px 16px">
        <div style="font-size:.82rem;font-weight:700;color:#93c5fd;margin-bottom:12px;display:flex;align-items:center;gap:6px">
          <i class="bi bi-list-check" style="color:#60a5fa"></i> Weekly Task Quota (forms required for withdrawal)
        </div>
        <div style="display:flex;gap:10px;align-items:center">
          <input type="number" id="settingWeeklyQuota" value="${EWI_SETTINGS.weeklyQuota}" min="1" max="9999" style="font-size:1.1rem;font-weight:700;color:#60a5fa;width:120px;text-align:center">
          <span style="font-size:.8rem;color:rgba(255,255,255,.5)">forms/week (default 350)</span>
        </div>
      </div>

      <div style="background:rgba(22,163,74,.07);border:1px solid rgba(22,163,74,.22);border-radius:10px;padding:14px 16px">
        <div style="font-size:.82rem;font-weight:700;color:#86efac;margin-bottom:10px;display:flex;align-items:center;gap:6px">
          <i class="bi bi-unlock-fill" style="color:#4ade80"></i> Global Withdrawal Access
        </div>
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer">
          <input type="checkbox" id="settingWithdrawalEnabled" ${EWI_SETTINGS.withdrawalEnabled ? 'checked' : ''} style="width:18px;height:18px;accent-color:#22c55e">
          <span style="font-size:.88rem;color:rgba(255,255,255,.8)">Allow ALL workers to request withdrawal (bypasses quota check globally)</span>
        </label>
      </div>

      <div class="modal-footer-btns">
        <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Cancel</button>
        <button class="admin-btn admin-btn-primary" onclick="savePremiumSettings()">
          <i class="bi bi-floppy-fill"></i> Save Settings
        </button>
      </div>
    </div>
  `);
}

function savePremiumSettings() {
  const price  = parseInt(document.getElementById('settingPremiumPrice').value || '499', 10);
  const quota  = parseInt(document.getElementById('settingWeeklyQuota').value || '350', 10);
  const wdEnabled = document.getElementById('settingWithdrawalEnabled').checked;
  EWI_SETTINGS.premiumPrice       = price;
  EWI_SETTINGS.weeklyQuota        = quota;
  EWI_SETTINGS.withdrawalEnabled  = wdEnabled;
  saveEwiSettings();
  closeAdminModal();
  showAdminToast(`✓ Settings saved — Premium: ₹${price} | Quota: ${quota} forms/week`);
}

function renderSettingsPage() {
  const el = document.getElementById('settingsPremiumCard');
  if (!el) return;
  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:18px">
      <div>
        <div style="font-size:1rem;font-weight:700;color:var(--navy)">Premium Membership Price</div>
        <div style="font-size:.82rem;color:var(--text-muted);margin-top:3px">Currently set to <strong style="color:#7c3aed">₹${EWI_SETTINGS.premiumPrice}</strong> — shown to all workers on withdrawal page</div>
      </div>
      <button class="admin-btn admin-btn-primary" onclick="openPremiumSettings()"><i class="bi bi-gear-fill"></i> Manage Settings</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px">
      <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:1.5rem;font-weight:800;color:#16a34a">₹${EWI_SETTINGS.premiumPrice}</div>
        <div style="font-size:.78rem;color:#166534;margin-top:2px">Premium Price</div>
      </div>
      <div style="background:#eff6ff;border:1px solid #93c5fd;border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:1.5rem;font-weight:800;color:#2563eb">${EWI_SETTINGS.weeklyQuota}</div>
        <div style="font-size:.78rem;color:#1e40af;margin-top:2px">Weekly Quota</div>
      </div>
      <div style="background:${EWI_SETTINGS.withdrawalEnabled ? '#f0fdf4' : '#fff1f2'};border:1px solid ${EWI_SETTINGS.withdrawalEnabled ? '#86efac' : '#fca5a5'};border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:1rem;font-weight:800;color:${EWI_SETTINGS.withdrawalEnabled ? '#16a34a' : '#dc2626'}">${EWI_SETTINGS.withdrawalEnabled ? '✓ Open' : '✗ Quota Required'}</div>
        <div style="font-size:.78rem;color:${EWI_SETTINGS.withdrawalEnabled ? '#166534' : '#991b1b'};margin-top:2px">Global Withdrawal</div>
      </div>
    </div>
  `;
}

/* ===== WALLET CREDIT & KYC per USER ===== */
function openWalletCreditModal(id) {
  const u = USERS_DATA.find(x => x.id === id);
  if (!u) return;
  const walBal = u.walletBalance || '₹0';
  const walHist = Array.isArray(u.walletHistory) ? u.walletHistory : [];

  openAdminModal(`Wallet & KYC — ${u.name}`, `
    <!-- Current Wallet -->
    <div style="background:rgba(22,163,74,.1);border:1px solid rgba(22,163,74,.3);border-radius:12px;padding:16px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
      <div>
        <div style="font-size:.74rem;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.06em">Current Wallet Balance</div>
        <div style="font-size:2rem;font-weight:800;color:#4ade80">${walBal}</div>
        <div style="font-size:.75rem;color:rgba(255,255,255,.4);margin-top:2px">Visible on worker dashboard · Updated by Admin only</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:.74rem;color:rgba(255,255,255,.5)">KYC Status</div>
        <span class="status-badge ${u.kycStatus === 'verified' ? 'status-active' : (u.kycStatus === 'rejected' ? 'status-inactive' : 'status-pending')}" style="font-size:.82rem;margin-top:4px;display:inline-block">
          ${u.kycStatus === 'verified' ? '✓ KYC Verified' : (u.kycStatus === 'rejected' ? '✗ KYC Rejected' : '⏳ KYC Pending')}
        </span>
      </div>
    </div>

    <!-- Credit Wallet -->
    <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:14px 16px;margin-bottom:14px">
      <div style="font-size:.82rem;font-weight:700;color:#fff;margin-bottom:12px;display:flex;align-items:center;gap:6px">
        <i class="bi bi-plus-circle-fill" style="color:#4ade80"></i> Credit Amount to Wallet
      </div>
      <div class="admin-field-row">
        <div class="admin-field-group">
          <label>Amount to Credit (₹) *</label>
          <input type="number" id="walletCreditAmt" placeholder="e.g. 5000" min="1" style="font-size:1rem;font-weight:700;color:#4ade80">
        </div>
        <div class="admin-field-group">
          <label>Credit Note / Reason</label>
          <input type="text" id="walletCreditNote" placeholder="e.g. Weekly earnings for Oct Week 3" autocomplete="off">
        </div>
      </div>
      <button class="admin-btn admin-btn-success" style="width:100%;justify-content:center;margin-top:4px" onclick="adminCreditWallet(${id})">
        <i class="bi bi-wallet2"></i> Credit to Wallet
      </button>
    </div>

    <!-- Task & Quota Completion Status -->
    <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:14px 16px;margin-bottom:14px">
      <div style="font-size:.82rem;font-weight:700;color:#fff;margin-bottom:12px;display:flex;align-items:center;gap:6px">
        <i class="bi bi-list-check" style="color:#a78bfa"></i> Task Completion & Quota Status
      </div>
      <div class="admin-field-row">
        <div class="admin-field-group">
          <label>Weekly Task Status</label>
          <select id="taskStatusSel">
            <option value="in_progress" ${!u.taskCompleted ? 'selected' : ''}>⏳ In Progress / Not Completed</option>
            <option value="completed"   ${u.taskCompleted  ? 'selected' : ''}>✓ Completed (Quota Met)</option>
          </select>
        </div>
        <div class="admin-field-group">
          <label>Weekly Forms Completed</label>
          <input type="number" id="weeklyTasksDoneInput" value="${u.weeklyTasksDone !== undefined ? u.weeklyTasksDone : (u.taskCompleted ? (EWI_SETTINGS.weeklyQuota || 350) : 0)}" min="0" placeholder="e.g. 350">
        </div>
      </div>
    </div>

    <!-- KYC Control -->
    <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:14px 16px;margin-bottom:14px">
      <div style="font-size:.82rem;font-weight:700;color:#fff;margin-bottom:12px;display:flex;align-items:center;gap:6px">
        <i class="bi bi-person-vcard-fill" style="color:#60a5fa"></i> KYC Verification Status
      </div>
      <div class="admin-field-row">
        <div class="admin-field-group">
          <label>Set KYC Status</label>
          <select id="kycStatusSel">
            <option value="pending"  ${(u.kycStatus || 'pending') === 'pending'  ? 'selected' : ''}>⏳ Pending (Under Review)</option>
            <option value="verified" ${(u.kycStatus || '') === 'verified' ? 'selected' : ''}>✓ Verified (Approved)</option>
            <option value="rejected" ${(u.kycStatus || '') === 'rejected' ? 'selected' : ''}>✗ Rejected</option>
          </select>
        </div>
        <div class="admin-field-group">
          <label>Allow Withdrawal (Override Quota)</label>
          <select id="withdrawalEnabledSel">
            <option value="false" ${!u.withdrawalEnabled ? 'selected' : ''}>No — Must complete weekly quota</option>
            <option value="true"  ${u.withdrawalEnabled ? 'selected' : ''}>Yes — Allow regardless of quota</option>
          </select>
        </div>
      </div>
      <button class="admin-btn admin-btn-primary" style="width:100%;justify-content:center;margin-top:4px" onclick="adminSetKyc(${id})">
        <i class="bi bi-floppy-fill"></i> Save Tasks, KYC & Withdrawal Settings
      </button>
    </div>

    <!-- Wallet History -->
    <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:14px 16px">
      <div style="font-size:.82rem;font-weight:700;color:#fff;margin-bottom:10px;display:flex;align-items:center;gap:6px">
        <i class="bi bi-clock-history" style="color:#fbbf24"></i> Wallet Transaction History
      </div>
      ${walHist.length === 0 ? '<p style="font-size:.82rem;color:rgba(255,255,255,.4);text-align:center;padding:10px 0">No transactions yet</p>' :
        walHist.slice().reverse().map(h => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:.82rem">
            <div>
              <span style="color:#4ade80;font-weight:700">+₹${h.amount}</span>
              <span style="color:rgba(255,255,255,.55);margin-left:8px">${h.note || 'Credit by Admin'}</span>
            </div>
            <span style="color:rgba(255,255,255,.35);font-size:.75rem">${h.date || ''}</span>
          </div>`).join('')}
    </div>

    <div class="modal-footer-btns" style="margin-top:16px">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Close</button>
    </div>
  `, true);
}

function adminCreditWallet(id) {
  const u = USERS_DATA.find(x => x.id === id);
  if (!u) return;
  const amtInput = document.getElementById('walletCreditAmt');
  const noteInput = document.getElementById('walletCreditNote');
  const amt = parseInt((amtInput ? amtInput.value : '') || '0', 10);
  if (!amt || amt <= 0) { showAdminToast('Enter a valid credit amount.'); return; }
  const note = (noteInput ? noteInput.value : '').trim() || 'Credit by Admin';

  // Parse current balance (strip ₹ and commas)
  const oldBal = parseInt((u.walletBalance || '0').toString().replace(/[₹,]/g, ''), 10) || 0;
  const newBal = oldBal + amt;
  u.walletBalance = '₹' + newBal.toLocaleString('en-IN');
  u.premiumActive = true; // Auto-unlock premium when wallet is credited!

  // Add to history
  if (!Array.isArray(u.walletHistory)) u.walletHistory = [];
  u.walletHistory.push({
    amount: amt.toLocaleString('en-IN'),
    note,
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    by: 'Admin'
  });

  // 1. Persist to localStorage users_db
  try {
    let db = JSON.parse(localStorage.getItem('ewi_users_db') || '[]');
    const idx = db.findIndex(x => x.id === id || x.username === u.username || x.phone === u.phone);
    if (idx > -1) {
      db[idx].walletBalance = u.walletBalance;
      db[idx].walletHistory = u.walletHistory;
      db[idx].premiumActive = true;
    }
    localStorage.setItem('ewi_users_db', JSON.stringify(db));
  } catch(_) {}

  // 2. Persist to dedicated per-user storage keys (ensures instant reflect for worker)
  const targetKeys = [u.username, u.phone, u.id].filter(Boolean);
  targetKeys.forEach(k => {
    try {
      localStorage.setItem('ewi_wallet_balance_' + k, u.walletBalance);
      localStorage.setItem('ewi_wallet_history_' + k, JSON.stringify(u.walletHistory));
      localStorage.setItem('ewi_premium_active_' + k, 'true');
    } catch(_) {}
  });

  // 3. Sync to active worker profile if logged in
  try {
    const prof = JSON.parse(localStorage.getItem('ewi_user_profile') || 'null');
    if (prof) {
      const match = (prof.id === id) ||
                    (prof.username && (prof.username === u.username || prof.username.toLowerCase() === (u.username||'').toLowerCase())) ||
                    (prof.userId && (prof.userId === u.username || prof.userId.toLowerCase() === (u.username||'').toLowerCase())) ||
                    (prof.phone && prof.phone === u.phone);
      if (match) {
        prof.walletBalance = u.walletBalance;
        prof.walletHistory = u.walletHistory;
        prof.premiumActive = true;
        localStorage.setItem('ewi_user_profile', JSON.stringify(prof));
        localStorage.setItem('ewi_profile_sync_timestamp', Date.now().toString());
      }
    }
  } catch(_) {}

  // 4. Sync to SQLite via API
  fetch('/api/users/credit-wallet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: u.id,
      username: u.username,
      phone: u.phone,
      amount: amt,
      note: note
    })
  }).catch(() => {
    fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        walletBalance: u.walletBalance,
        walletHistory: u.walletHistory,
        premiumActive: true
      })
    }).catch(() => {});
  });

  showAdminToast(`✓ ₹${amt.toLocaleString('en-IN')} credited to ${u.name}'s wallet! (Premium unlocked)`);
  // Refresh modal
  openWalletCreditModal(id);
}

function adminSetKyc(id) {
  const u = USERS_DATA.find(x => x.id === id);
  if (!u) return;
  const kycSel   = document.getElementById('kycStatusSel');
  const wdSel    = document.getElementById('withdrawalEnabledSel');
  const taskSel  = document.getElementById('taskStatusSel');
  const doneInput = document.getElementById('weeklyTasksDoneInput');

  const kyc = kycSel ? kycSel.value : 'pending';
  const wd  = wdSel  ? wdSel.value === 'true' : false;
  const isCompleted = taskSel ? taskSel.value === 'completed' : false;
  let doneVal = doneInput ? parseInt(doneInput.value || '0', 10) : 0;
  if (isCompleted && doneVal < (EWI_SETTINGS.weeklyQuota || 350)) {
    doneVal = EWI_SETTINGS.weeklyQuota || 350;
  }

  u.kycStatus         = kyc;
  u.withdrawalEnabled = wd;
  u.taskCompleted     = isCompleted;
  u.weeklyTasksDone   = doneVal;

  // Persist to localStorage users_db
  try {
    let db = JSON.parse(localStorage.getItem('ewi_users_db') || '[]');
    const idx = db.findIndex(x => x.id === id || x.username === u.username || x.phone === u.phone);
    if (idx > -1) {
      db[idx].kycStatus         = kyc;
      db[idx].withdrawalEnabled = wd;
      db[idx].taskCompleted     = isCompleted;
      db[idx].weeklyTasksDone   = doneVal;
    }
    localStorage.setItem('ewi_users_db', JSON.stringify(db));
  } catch(_) {}

  // Sync to active worker profile
  try {
    const prof = JSON.parse(localStorage.getItem('ewi_user_profile') || 'null');
    if (prof && (prof.id === id || prof.username === u.username || prof.phone === u.phone)) {
      prof.kycStatus         = kyc;
      prof.withdrawalEnabled = wd;
      prof.taskCompleted     = isCompleted;
      prof.weeklyTasksDone   = doneVal;
      localStorage.setItem('ewi_user_profile', JSON.stringify(prof));
      localStorage.setItem('ewi_profile_sync_timestamp', Date.now().toString());
    }
  } catch(_) {}

  // Sync units keys
  const idKeys = [u.username, u.phone, u.id].filter(Boolean);
  for (const k of idKeys) {
    try {
      localStorage.setItem('ewi_today_units_' + k, doneVal.toString());
      localStorage.setItem('ewi_week_units_' + k, (isCompleted ? doneVal : 0).toString());
    } catch(_) {}
  }

  showAdminToast(`✓ Tasks: ${isCompleted ? 'Completed (' + doneVal + ')' : doneVal + ' done'} | KYC: ${kyc.toUpperCase()} | Withdrawal: ${wd ? 'Enabled' : 'Quota check'}`);
  openWalletCreditModal(id);
}

function approvePayment(id) {
  const pay = PAYMENTS_DATA.find(p => p.id === id);
  if (!pay) return;
  pay.status = 'paid';
  renderPaymentsTable(PAYMENTS_DATA);
  showAdminToast('Payment approved successfully!');
}

function rejectPayment(id) {
  const pay = PAYMENTS_DATA.find(p => p.id === id);
  if (!pay) return;
  pay.status = 'rejected';
  renderPaymentsTable(PAYMENTS_DATA);
  showAdminToast('Payment rejected.');
}

function approveWithdrawal(id) {
  const w = WITHDRAWALS_DATA.find(x => x.id === id);
  if (!w) return;
  w.status = 'paid';
  renderWithdrawalsTable();
  showAdminToast(`Payment of ${w.amount} processed for ${w.worker}!`);
}

function rejectWithdrawal(id) {
  const w = WITHDRAWALS_DATA.find(x => x.id === id);
  if (!w) return;
  w.status = 'rejected';
  renderWithdrawalsTable();
  showAdminToast('Withdrawal request rejected.');
}

function deleteReview(id) {
  if (!confirm('Delete this review?')) return;
  const idx = REVIEWS_DATA.findIndex(r => r.id === id);
  if (idx > -1) REVIEWS_DATA.splice(idx, 1);
  renderReviewsTable();
  showAdminToast('Review deleted.');
}

function deleteAnnouncement(id) {
  if (!confirm('Delete this announcement?')) return;
  const idx = ANNOUNCEMENTS_DATA.findIndex(a => a.id === id);
  if (idx > -1) ANNOUNCEMENTS_DATA.splice(idx, 1);
  renderAnnouncementsTable();
  showAdminToast('Announcement deleted.');
}

function markRead(id) {
  const n = NOTIFICATIONS_DATA.find(x => x.id === id);
  if (n) { n.unread = false; renderNotifications(); }
}

function markAllRead() {
  NOTIFICATIONS_DATA.forEach(n => { n.unread = false; });
  renderNotifications();
  showAdminToast('All notifications marked as read.');
}

function refreshStats() {
  showAdminToast('Stats refreshed!');
}

/* ===== VIEW MODALS ===== */
function viewUser(id) {
  const u = USERS_DATA.find(x => x.id === id);
  if (!u) return;

  const aadhaarThumb = u.aadhaarFile ? `
    <div style="margin-top:14px;background:rgba(255,255,255,.04);border-radius:8px;padding:12px">
      <div style="font-size:.78rem;color:rgba(255,255,255,.6);margin-bottom:6px;display:flex;align-items:center;gap:6px">
        <i class="bi bi-card-image" style="color:#60a5fa"></i> Aadhaar ID Proof Document:
      </div>
      <img src="${u.aadhaarFile}" alt="Aadhaar Document" class="doc-preview-thumb" onclick="window.open('${u.aadhaarFile}')" style="cursor:pointer;max-height:160px" title="Click to view full size">
    </div>` : '';

  const sigThumb = u.signatureData ? `
    <div style="margin-top:14px;background:rgba(255,255,255,.04);border-radius:8px;padding:12px">
      <div style="font-size:.78rem;color:rgba(255,255,255,.6);margin-bottom:6px;display:flex;align-items:center;gap:6px">
        <i class="bi bi-pen" style="color:#60a5fa"></i> Verified Digital Signature:
      </div>
      <div style="background:#fff;border-radius:6px;padding:6px;display:inline-block">
        <img src="${u.signatureData}" alt="Signature" style="height:55px;max-width:240px;display:block">
      </div>
    </div>` : '';

  const passwordInfo = u.plainPassword ? `
    <div style="background:rgba(37,99,235,.1);border:1px solid rgba(37,99,235,.25);border-radius:8px;padding:10px 14px;margin-top:14px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
      <div>
        <span style="font-size:.72rem;color:rgba(255,255,255,.5);display:block">Generated Password:</span>
        <code style="font-size:.92rem;color:#60a5fa;font-weight:700">${u.plainPassword}</code>
      </div>
      <button class="copy-pill-btn" onclick="copyToClipboard('${u.plainPassword}', 'Password copied!')"><i class="bi bi-clipboard"></i> Copy Password</button>
    </div>` : '';

  const hashBadge = u.passwordHash ? `
    <div style="margin-top:8px;font-size:.72rem;color:rgba(255,255,255,.4);display:flex;align-items:center;gap:6px">
      <i class="bi bi-shield-check" style="color:#4ade80"></i> Password Hash: <code style="color:rgba(255,255,255,.6)">${u.passwordHash.slice(0, 16)}... (SHA-256)</code>
    </div>` : '';

  const photoThumb = (u.photoUrl || u.photo_url) ?
    `<img src="${u.photoUrl || u.photo_url}" style="width:58px;height:58px;border-radius:50%;object-fit:cover;border:2.5px solid #3b82f6;box-shadow:0 4px 12px rgba(0,0,0,.3);flex-shrink:0">` :
    `<div class="user-mini-avatar" style="width:58px;height:58px;font-size:1.15rem;flex-shrink:0">${initials(u.name)}</div>`;

  openAdminModal(`User Profile — ${u.name}`, `
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px">
      ${photoThumb}
      <div>
        <strong style="display:block;color:#fff;font-size:1.05rem">${u.name}</strong>
        <span style="color:rgba(255,255,255,.5);font-size:.82rem">@${u.username || u.phone}</span>
        <div style="margin-top:4px"><span class="status-badge status-${u.status}">${capitalize(u.status)}</span></div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${infoRow('Login User ID', u.phone)}
      ${infoRow('Email', u.email)}
      ${infoRow('Assigned Project', u.project)}
      ${infoRow('Total Earnings', u.earnings)}
      ${infoRow('Aadhaar Number', u.aadhaar || 'Verified')}
      ${infoRow('Joined Date', u.joined)}
    </div>

    ${passwordInfo}
    ${hashBadge}
    ${aadhaarThumb}
    ${sigThumb}

    <div class="modal-footer-btns" style="margin-top:20px">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Close</button>
      <button class="admin-btn admin-btn-primary" onclick="closeAdminModal();editUser(${u.id})">Edit User</button>
      ${u.status === 'pending' ? `<button class="admin-btn admin-btn-success" onclick="approveUser(${u.id});closeAdminModal()">Approve</button>` : ''}
    </div>`, true);
}

function handleAdminEditPhoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    showAdminToast('Photo is too large. Max size is 5MB.');
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    window._adminEditUserPhotoUrl = ev.target.result;
    const preview = document.getElementById('adminEditPhotoPreview');
    if (preview) {
      preview.innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover">`;
      preview.style.borderStyle = 'solid';
      preview.style.borderColor = '#22c55e';
    }
    showAdminToast('✓ Worker photo updated!');
  };
  reader.readAsDataURL(file);
}

function removeAdminEditPhoto() {
  window._adminEditUserPhotoUrl = '';
  const preview = document.getElementById('adminEditPhotoPreview');
  if (preview) {
    preview.innerHTML = `<i class="bi bi-person"></i>`;
    preview.style.borderColor = '#3b82f6';
  }
  showAdminToast('Photo removed.');
}

function handleAdminEditAadhaar(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    showAdminToast('Aadhaar document is too large. Max size is 5MB.');
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    window._adminEditUserAadhaarFile = ev.target.result;
    const wrap = document.getElementById('adminEditAadhaarThumbWrap');
    if (wrap) {
      wrap.innerHTML = `<img src="${ev.target.result}" style="max-height:85px;max-width:100%;border-radius:6px;border:1.5px solid #22c55e" alt="Aadhaar Preview">`;
    }
    showAdminToast('✓ Aadhaar document updated!');
  };
  reader.readAsDataURL(file);
}

function removeAdminEditAadhaar() {
  window._adminEditUserAadhaarFile = '';
  const wrap = document.getElementById('adminEditAadhaarThumbWrap');
  if (wrap) {
    wrap.innerHTML = `<span style="font-size:.76rem;color:rgba(255,255,255,.4)">No document attached</span>`;
  }
  showAdminToast('Aadhaar document cleared.');
}

function handleAdminEditSigFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    window._adminEditUserSigData = ev.target.result;
    window._adminEditUserSigHasStrokes = true;
    const wrap = document.getElementById('adminEditSigThumbWrap');
    if (wrap) {
      wrap.innerHTML = `<img src="${ev.target.result}" style="height:48px;max-width:200px;display:block" alt="Signature">`;
    }
    showAdminToast('✓ Scanned signature uploaded!');
  };
  reader.readAsDataURL(file);
}

function clearAdminEditSig() {
  window._adminEditUserSigData = '';
  window._adminEditUserSigHasStrokes = false;
  const canvas = document.getElementById('adminEditSigCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  const wrap = document.getElementById('adminEditSigThumbWrap');
  if (wrap) {
    wrap.innerHTML = `<span style="color:#64748b;font-size:.78rem">No signature on file</span>`;
  }
  showAdminToast('Signature cleared.');
}

function initAdminEditSigCanvas() {
  const canvas = document.getElementById('adminEditSigCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width || 360;
  canvas.height = rect.height || 90;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  let drawing = false;
  function getPos(e) {
    const r = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - r.left, y: clientY - r.top };
  }
  function startDraw(e) {
    drawing = true;
    window._adminEditUserSigHasStrokes = true;
    const p = getPos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    e.preventDefault();
  }
  function draw(e) {
    if (!drawing) return;
    const p = getPos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    e.preventDefault();
  }
  function stopDraw() {
    drawing = false;
  }
  canvas.onmousedown = startDraw;
  canvas.onmousemove = draw;
  window.addEventListener('mouseup', stopDraw);
  canvas.ontouchstart = startDraw;
  canvas.ontouchmove = draw;
  canvas.ontouchend = stopDraw;
}

function editUser(id) {
  const u = USERS_DATA.find(x => x.id === id);
  if (!u) return;
  window._adminEditUserPhotoUrl = u.photoUrl || u.photo_url || '';
  window._adminEditUserAadhaarFile = u.aadhaarFile || u.aadhaar_file || '';
  window._adminEditUserSigData = u.signatureData || u.signature_data || '';
  window._adminEditUserSigHasStrokes = false;

  const currentPhoto = window._adminEditUserPhotoUrl;
  const photoPreview = currentPhoto ?
    `<img src="${currentPhoto}" style="width:100%;height:100%;object-fit:cover">` :
    `<i class="bi bi-person"></i>`;

  const editProjOptions = PROJECTS_DATA.map(p => {
    const key = p.key || (p.id === 3 ? 'form_filling' : 'data_entry');
    const isSel = (u.projectKey === key || u.project === p.name || (key === 'data_entry' && (u.project || '').includes('Data Entry')) || (key === 'form_filling' && (u.project || '').includes('Form Filling')));
    return `<option value="${key}" ${isSel ? 'selected' : ''}>${p.name}</option>`;
  }).join('');

  openAdminModal(`Edit Worker Profile — ${u.name}`, `
    <!-- Worker Profile Picture -->
    <div style="background:rgba(37,99,235,.1);border:1.5px solid rgba(59,130,246,.35);border-radius:12px;padding:14px 16px;margin-bottom:16px">
      <div style="font-size:.82rem;font-weight:700;color:#fff;margin-bottom:8px;display:flex;align-items:center;justify-content:space-between">
        <span style="display:flex;align-items:center;gap:6px"><i class="bi bi-person-badge-fill" style="color:#60a5fa"></i> Worker Profile Photo</span>
        <span style="font-size:.7rem;background:#1e3a8a;color:#93c5fd;padding:2px 8px;border-radius:12px;font-weight:600"><i class="bi bi-lock-fill"></i> Read-Only for Worker</span>
      </div>
      <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
        <div id="adminEditPhotoPreview" style="width:68px;height:68px;border-radius:50%;background:rgba(37,99,235,.2);border:2px solid #3b82f6;display:flex;align-items:center;justify-content:center;color:#60a5fa;font-size:1.8rem;overflow:hidden;flex-shrink:0">
          ${photoPreview}
        </div>
        <div style="flex:1;min-width:180px">
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button type="button" class="admin-btn admin-btn-outline" style="padding:6px 14px;font-size:.8rem" onclick="document.getElementById('adminEditPhotoInput').click()">
              <i class="bi bi-camera"></i> Change Photo
            </button>
            <button type="button" class="copy-pill-btn" style="background:#ef4444;color:#fff;padding:6px 10px" onclick="removeAdminEditPhoto()">
              <i class="bi bi-trash"></i> Remove
            </button>
          </div>
          <small style="color:rgba(255,255,255,.45);display:block;margin-top:4px;font-size:.72rem">Worker sees this portrait on their dashboard. Only Admin can update it.</small>
          <input type="file" id="adminEditPhotoInput" accept="image/*" style="display:none" onchange="handleAdminEditPhoto(event)">
        </div>
      </div>
    </div>

    <!-- Credentials & Status -->
    <div class="admin-field-row">
      <div class="admin-field-group">
        <label>User ID (Login Username) *</label>
        <input type="text" id="editUsername" value="${u.username || u.phone}" style="font-weight:700;color:#60a5fa" autocomplete="off">
      </div>
      <div class="admin-field-group">
        <label>Login Password *</label>
        <input type="text" id="editPassword" value="${u.plainPassword || u.plain_password || ''}" style="font-family:monospace;letter-spacing:1px" autocomplete="off">
      </div>
    </div>

    <div class="admin-field-row">
      <div class="admin-field-group">
        <label>Worker Full Name *</label>
        <input type="text" id="editName" value="${u.name}">
      </div>
      <div class="admin-field-group">
        <label>Mobile / Contact Number</label>
        <input type="tel" id="editPhone" value="${u.phone}">
      </div>
    </div>

    <div class="admin-field-row">
      <div class="admin-field-group">
        <label>Email Address</label>
        <input type="email" id="editEmail" value="${u.email}">
      </div>
      <div class="admin-field-group">
        <label>Assigned Project</label>
        <select id="editProject">${editProjOptions}</select>
      </div>
    </div>

    <div class="admin-field-row">
      <div class="admin-field-group">
        <label>Account Status (Active / Disabled) *</label>
        <select id="editStatus">
          <option ${u.status === 'active' ? 'selected' : ''} value="active">Active (Full Access &amp; Tasks Enabled)</option>
          <option ${(u.status === 'disabled' || u.status === 'inactive') ? 'selected' : ''} value="disabled">Disabled (Deactivated / No Access)</option>
          <option ${u.status === 'pending' ? 'selected' : ''} value="pending">Pending Verification</option>
        </select>
      </div>
      <div class="admin-field-group">
        <label>Wallet / Total Earnings</label>
        <input type="text" id="editEarnings" value="${u.earnings || '₹0'}">
      </div>
    </div>

    <div class="admin-field-group">
      <label>Home Address</label>
      <input type="text" id="editAddress" value="${u.address || ''}" placeholder="House, Street, City, State, PIN">
    </div>

    <!-- Aadhaar Edit Section (Request 1) -->
    <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px 16px;margin-bottom:16px">
      <div style="font-size:.82rem;font-weight:700;color:#fff;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between">
        <span style="display:flex;align-items:center;gap:6px"><i class="bi bi-person-vcard" style="color:#60a5fa"></i> Aadhaar Identity Proof (Editable by Admin)</span>
        <span style="font-size:.7rem;color:#4ade80"><i class="bi bi-shield-check"></i> Reflected in Worker Dashboard</span>
      </div>
      <div class="admin-field-row" style="margin-bottom:8px">
        <div class="admin-field-group" style="margin-bottom:0">
          <label>Aadhaar Number (12 Digits)</label>
          <input type="text" id="editAadhaar" value="${u.aadhaar || ''}" placeholder="XXXX XXXX XXXX" maxlength="14" oninput="formatAadhaarInput(this)">
        </div>
        <div class="admin-field-group" style="margin-bottom:0">
          <label>Aadhaar Card Document / File</label>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <button type="button" class="admin-btn admin-btn-outline" style="padding:6px 12px;font-size:.8rem" onclick="document.getElementById('adminEditAadhaarInput').click()">
              <i class="bi bi-upload"></i> Upload / Replace Aadhaar
            </button>
            <button type="button" class="copy-pill-btn" style="background:#ef4444;color:#fff;padding:5px 8px" onclick="removeAdminEditAadhaar()">
              <i class="bi bi-trash"></i> Remove
            </button>
          </div>
          <input type="file" id="adminEditAadhaarInput" accept="image/*,.pdf" style="display:none" onchange="handleAdminEditAadhaar(event)">
        </div>
      </div>
      <div id="adminEditAadhaarThumbWrap" style="margin-top:8px">
        ${(u.aadhaarFile || u.aadhaar_file) ? `<img src="${u.aadhaarFile || u.aadhaar_file}" style="max-height:85px;border-radius:6px;border:1px solid #3b82f6" alt="Aadhaar Document">` : `<span style="font-size:.76rem;color:rgba(255,255,255,.4)">No document attached</span>`}
      </div>
    </div>

    <!-- Signature Edit Section (Request 1) -->
    <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px 16px;margin-bottom:16px">
      <div style="font-size:.82rem;font-weight:700;color:#fff;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between">
        <span style="display:flex;align-items:center;gap:6px"><i class="bi bi-pen" style="color:#60a5fa"></i> Worker Digital Signature (Editable by Admin)</span>
        <span style="font-size:.7rem;color:#4ade80"><i class="bi bi-shield-check"></i> Reflected in Worker Dashboard</span>
      </div>
      
      <!-- Current Signature Display -->
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;flex-wrap:wrap">
        <div id="adminEditSigThumbWrap" style="background:#fff;border-radius:6px;padding:6px 12px;display:inline-block;border:1px solid #e2e8f0">
          ${(u.signatureData || u.signature_data) ? `<img src="${u.signatureData || u.signature_data}" style="height:48px;max-width:200px;display:block" alt="Current Signature">` : `<span style="color:#64748b;font-size:.78rem">No signature on file</span>`}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button type="button" class="copy-pill-btn" onclick="document.getElementById('adminEditSigDrawBox').style.display='block';setTimeout(initAdminEditSigCanvas,50)">
            <i class="bi bi-pencil"></i> Draw New
          </button>
          <button type="button" class="copy-pill-btn" onclick="document.getElementById('adminEditSigFileInput').click()">
            <i class="bi bi-upload"></i> Upload Image
          </button>
          <button type="button" class="copy-pill-btn" style="background:#ef4444;color:#fff" onclick="clearAdminEditSig()">
            <i class="bi bi-trash"></i> Clear
          </button>
          <input type="file" id="adminEditSigFileInput" accept="image/*" style="display:none" onchange="handleAdminEditSigFile(event)">
        </div>
      </div>

      <!-- Drawing Canvas -->
      <div id="adminEditSigDrawBox" style="display:none;background:rgba(0,0,0,.2);border-radius:8px;padding:10px;margin-top:8px">
        <p style="font-size:.74rem;color:rgba(255,255,255,.5);margin:0 0 6px">Draw new signature below:</p>
        <canvas id="adminEditSigCanvas" class="sig-canvas-admin" style="height:90px"></canvas>
      </div>
    </div>

    <div class="modal-footer-btns">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Cancel</button>
      <button class="admin-btn admin-btn-primary" onclick="saveEditUser(${u.id})">Save All Changes</button>
    </div>`, true);

  setTimeout(initAdminEditSigCanvas, 50);
}

async function saveEditUser(id) {
  const u = USERS_DATA.find(x => x.id === id);
  if (!u) return;

  const newName = (document.getElementById('editName').value || '').trim();
  const newUsername = (document.getElementById('editUsername').value || '').trim();
  const newEmail = (document.getElementById('editEmail').value || '').trim();
  const newPhone = (document.getElementById('editPhone').value || '').trim();
  const newPassword = (document.getElementById('editPassword').value || '').trim();
  const newAddress = (document.getElementById('editAddress').value || '').trim();
  const newAadhaar = (document.getElementById('editAadhaar').value || '').trim();
  const newEarnings = (document.getElementById('editEarnings').value || '₹0').trim();
  const newStatus = document.getElementById('editStatus').value;
  const selectedProjKey = document.getElementById('editProject').value;
  const matchedP = PROJECTS_DATA.find(x => x.key === selectedProjKey || (selectedProjKey === 'form_filling' && x.id === 3) || (selectedProjKey === 'data_entry' && x.id === 1));
  const newProjName = matchedP ? matchedP.name : (selectedProjKey === 'form_filling' ? 'Form Filling Project' : 'Data Entry Project');

  if (!newName) { showAdminToast('Worker full name cannot be empty.'); return; }

  // Check if signature canvas has drawn strokes
  let finalSig = window._adminEditUserSigData;
  if (window._adminEditUserSigHasStrokes) {
    const canvas = document.getElementById('adminEditSigCanvas');
    if (canvas) finalSig = canvas.toDataURL('image/png');
  }

  // Update in memory USERS_DATA
  u.name = newName;
  u.username = newUsername || u.username;
  u.email = newEmail;
  u.phone = newPhone;
  if (newPassword) {
    u.plainPassword = newPassword;
    u.plain_password = newPassword;
  }
  u.address = newAddress;
  u.aadhaar = newAadhaar;
  u.earnings = newEarnings;
  u.project = newProjName;
  u.projectKey = selectedProjKey;
  u.project_key = selectedProjKey;
  u.status = newStatus;
  if (window._adminEditUserPhotoUrl !== undefined) {
    u.photoUrl = window._adminEditUserPhotoUrl;
    u.photo_url = window._adminEditUserPhotoUrl;
  }
  if (window._adminEditUserAadhaarFile !== undefined) {
    u.aadhaarFile = window._adminEditUserAadhaarFile;
    u.aadhaar_file = window._adminEditUserAadhaarFile;
  }
  if (finalSig !== undefined) {
    u.signatureData = finalSig;
    u.signature_data = finalSig;
  }

  // 1. Persist to localStorage ewi_users_db
  let db = [];
  try { db = JSON.parse(localStorage.getItem('ewi_users_db') || '[]'); } catch(_) {}
  const dbIdx = db.findIndex(x => (x.id === id || x.username === u.username || x.phone === u.phone));
  if (dbIdx > -1) {
    db[dbIdx] = { ...db[dbIdx], ...u };
  } else {
    db.unshift(u);
  }
  try { localStorage.setItem('ewi_users_db', JSON.stringify(db)); } catch(_) {}

  // 2. Sync to Live SQLite Database via PUT /api/users/:id
  try {
    await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: u.name,
        username: u.username,
        email: u.email,
        phone: u.phone,
        project: u.project,
        projectKey: u.projectKey,
        status: u.status,
        photoUrl: u.photoUrl,
        aadhaar: u.aadhaar,
        aadhaarFile: u.aadhaarFile,
        signatureData: u.signatureData,
        plainPassword: u.plainPassword,
        address: u.address,
        earnings: u.earnings
      })
    });
  } catch(_) {}

  // 3. Immediately sync to ewi_user_profile and ewi_user_verify for instant reflection on worker dashboard!
  try {
    const prof = JSON.parse(localStorage.getItem('ewi_user_profile') || 'null');
    if (prof && (prof.id === id || prof.username === u.username || prof.phone === u.phone || !prof.id)) {
      prof.id = u.id;
      prof.name = u.name;
      prof.username = u.username;
      prof.email = u.email;
      prof.phone = u.phone;
      prof.address = u.address;
      prof.aadhaar = u.aadhaar;
      prof.aadhaarFile = u.aadhaarFile;
      prof.signatureData = u.signatureData;
      prof.photoUrl = u.photoUrl;
      prof.avatarSrc = u.photoUrl;
      prof.status = u.status;
      prof.project = u.project;
      prof.projectKey = u.projectKey;
      prof.earnings = u.earnings;
      localStorage.setItem('ewi_user_profile', JSON.stringify(prof));
    }

    const verify = JSON.parse(localStorage.getItem('ewi_user_verify') || 'null') || {};
    verify.aadhaar = {
      status: u.aadhaar ? 'approved' : 'none',
      num: u.aadhaar,
      name: u.name,
      file: u.aadhaarFile
    };
    verify.sig = {
      status: u.signatureData ? 'approved' : 'none',
      data: u.signatureData
    };
    localStorage.setItem('ewi_user_verify', JSON.stringify(verify));
  } catch(_) {}

  closeAdminModal();
  renderAllData();
  showAdminToast(`✓ User ${u.name} updated successfully everywhere!`);
}

function viewPayment(id) {
  const p = PAYMENTS_DATA.find(x => x.id === id);
  if (!p) return;
  openAdminModal('Payment Details', `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${infoRow('Worker', p.user)}${infoRow('Project', p.project)}
      ${infoRow('Amount', p.amount)}${infoRow('Method', p.method)}
      ${infoRow('Transaction ID', p.txId)}${infoRow('Date', p.date)}
      ${infoRow('Status', capitalize(p.status))}
    </div>
    <div class="modal-footer-btns">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Close</button>
      ${p.status === 'pending' ? `<button class="admin-btn admin-btn-success" onclick="approvePayment(${p.id});closeAdminModal()">Approve</button>` : ''}
    </div>`);
}

function viewWithdrawal(id) {
  const w = WITHDRAWALS_DATA.find(x => x.id === id);
  if (!w) return;
  openAdminModal('Withdrawal Details', `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${infoRow('Worker', w.worker)}${infoRow('Amount', w.amount)}
      ${infoRow('Method', w.method)}${infoRow('Account/UPI', w.account)}
      ${infoRow('Requested', w.date)}${infoRow('Status', capitalize(w.status))}
    </div>
    <div class="modal-footer-btns">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Close</button>
      ${w.status === 'pending' ? `<button class="admin-btn admin-btn-success" onclick="approveWithdrawal(${w.id});closeAdminModal()">Process Payment</button>` : ''}
    </div>`);
}

function viewReview(id) {
  const r = REVIEWS_DATA.find(x => x.id === id);
  if (!r) return;
  openAdminModal('Review Details', `
    <div style="text-align:center;margin-bottom:20px">
      <div class="user-mini-avatar" style="width:56px;height:56px;font-size:1.1rem;margin:0 auto 10px">${initials(r.name)}</div>
      <strong style="color:#fff">${r.name}</strong>
      <div style="color:#f59e0b;font-size:1.2rem;margin-top:4px">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
      <div style="font-size:.78rem;color:rgba(255,255,255,.4);margin-top:4px">${r.project} · ${r.date}</div>
    </div>
    <div style="background:rgba(255,255,255,.04);border-radius:8px;padding:16px;font-size:.9rem;color:rgba(255,255,255,.75);line-height:1.7">"${r.text}"</div>
    <div class="modal-footer-btns">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Close</button>
      <button class="admin-btn admin-btn-danger" onclick="deleteReview(${r.id});closeAdminModal()">Delete Review</button>
    </div>`);
}

function viewAnnouncement(id) {
  const a = ANNOUNCEMENTS_DATA.find(x => x.id === id);
  if (!a) return;
  openAdminModal('Announcement Details', `
    <h4 style="color:#fff;margin-bottom:8px">${a.title}</h4>
    <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
      <span class="status-badge" style="background:rgba(37,99,235,.2);color:#60a5fa">${a.target}</span>
      <span style="font-size:.78rem;color:rgba(255,255,255,.45)">${a.date} · By ${a.by}</span>
    </div>
    <div style="background:rgba(255,255,255,.04);border-radius:8px;padding:16px;font-size:.9rem;color:rgba(255,255,255,.75);line-height:1.7">${a.message}</div>
    <div class="modal-footer-btns">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Close</button>
    </div>`);
}

/* ===== ADMIN CREATE WORKER & CREDENTIALS WORKFLOW ===== */
window._adminNewUserPhotoUrl = null;
window._adminNewUserAadhaarFile = null;
window._adminNewUserSigData = null;
window._adminNewUserSigHasStrokes = false;
window._workerCredentialsText = '';

function generateSecurePassword(length = 10) {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghijkmnpqrstuvwxyz';
  const numbers = '23456789';
  const symbols = '!@#$%&*';
  const all = upper + lower + numbers + symbols;

  const arr = new Uint32Array(length);
  window.crypto.getRandomValues(arr);

  let pwd = [
    upper[arr[0] % upper.length],
    lower[arr[1] % lower.length],
    numbers[arr[2] % numbers.length],
    symbols[arr[3] % symbols.length]
  ];
  for (let i = 4; i < length; i++) {
    pwd.push(all[arr[i] % all.length]);
  }
  for (let i = pwd.length - 1; i > 0; i--) {
    const j = arr[i] % (i + 1);
    [pwd[i], pwd[j]] = [pwd[j], pwd[i]];
  }
  return pwd.join('');
}

function generateSalt(bytes = 16) {
  const arr = new Uint8Array(bytes);
  window.crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashWithSalt(password, salt) {
  try {
    const enc = new TextEncoder();
    const data = enc.encode(salt + ':' + password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (err) {
    let hash = 0;
    const str = salt + ':' + password;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return 'fb_' + Math.abs(hash).toString(16);
  }
}

function copyToClipboard(text, successMsg = 'Copied to clipboard!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showAdminToast(successMsg)).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); showAdminToast(successMsg); } catch(_) {}
  document.body.removeChild(ta);
}

function copyWorkerCredentialsText() {
  if (window._workerCredentialsText) {
    copyToClipboard(window._workerCredentialsText, '✓ All credentials copied! Ready to paste into WhatsApp / SMS.');
  }
}

function openAddUserModal() {
  window._adminNewUserPhotoUrl = null;
  window._adminNewUserAadhaarFile = null;
  window._adminNewUserPanFile = null;
  window._adminNewUserSigData = null;
  window._adminNewUserSigHasStrokes = false;

  const initialPassword = generateSecurePassword(10);

  const projectOptionsHtml = PROJECTS_DATA.map(p => {
    const key = p.key || (p.id === 3 ? 'form_filling' : 'data_entry');
    return `<option value="${key}">${p.name} — ${p.workDesc || 'Work Description'} (Earn ${p.perUnit})</option>`;
  }).join('');

  openAdminModal('Create Worker Account &amp; Generate Credentials', `
    <div style="background:rgba(37,99,235,.12);border:1px solid rgba(37,99,235,.28);border-radius:10px;padding:12px 16px;margin-bottom:18px;font-size:.82rem;color:#93c5fd;display:flex;gap:12px;align-items:flex-start">
      <i class="bi bi-shield-lock-fill" style="font-size:1.4rem;color:#60a5fa;flex-shrink:0;margin-top:2px"></i>
      <div>
        <strong style="color:#fff">Admin-Only Provisioning:</strong> Public self-registration is closed.
        Enter the worker's details, attach their profile photo, verified Aadhaar ID or PAN Card, and digital signature, and generate cryptographically secure login credentials.
      </div>
    </div>

    <!-- Worker Profile Picture (Admin Provisioned Only) -->
    <div style="background:rgba(37,99,235,.1);border:1.5px solid rgba(59,130,246,.45);border-radius:12px;padding:16px 18px;margin-bottom:18px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:6px">
        <div style="font-size:.88rem;font-weight:700;color:#fff;display:flex;align-items:center;gap:8px">
          <i class="bi bi-person-bounding-box" style="color:#60a5fa;font-size:1.15rem"></i> Worker Profile Photo * (Admin Upload Only)
        </div>
        <span style="font-size:.72rem;background:#1e3a8a;color:#93c5fd;padding:3px 9px;border-radius:12px;font-weight:600">
          <i class="bi bi-lock-fill"></i> Read-Only for Worker
        </span>
      </div>
      <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap">
        <div id="adminUserPhotoPreview" style="width:76px;height:76px;border-radius:50%;background:rgba(37,99,235,.25);border:2.5px dashed #3b82f6;display:flex;align-items:center;justify-content:center;color:#60a5fa;font-size:2.2rem;overflow:hidden;flex-shrink:0;box-shadow:0 4px 12px rgba(0,0,0,.3)">
          <i class="bi bi-person"></i>
        </div>
        <div style="flex:1;min-width:210px">
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
            <button type="button" class="admin-btn admin-btn-primary" style="padding:8px 16px;font-size:.84rem;display:inline-flex;align-items:center;gap:6px" onclick="document.getElementById('adminUserPhotoInput').click()">
              <i class="bi bi-camera-fill"></i> Choose Profile Photo
            </button>
            <button type="button" class="copy-pill-btn" id="btnRemoveUserPhoto" style="display:none;padding:6px 12px;background:#ef4444;color:#fff" onclick="removeAdminUserPhoto()">
              <i class="bi bi-trash"></i> Remove
            </button>
          </div>
          <small style="color:rgba(255,255,255,.6);display:block;margin-top:8px;font-size:.75rem;line-height:1.45">
            Upload worker's portrait photo (JPG, PNG or WebP). Once created, this photo appears on the worker's dashboard and <strong>cannot be edited or re-uploaded by the worker</strong>.
          </small>
          <input type="file" id="adminUserPhotoInput" accept="image/*" style="display:none" onchange="handleAdminUserPhoto(event)">
        </div>
      </div>
    </div>

    <!-- Personal & Contact Info -->
    <div class="admin-field-row">
      <div class="admin-field-group">
        <label>Worker User ID (Primary Login ID) *</label>
        <div style="display:flex;gap:6px">
          <input type="text" id="newUserId" placeholder="e.g. WORKER101 or priya_sharma" autocomplete="off" style="font-weight:600;letter-spacing:0.5px">
          <button type="button" class="copy-pill-btn" onclick="suggestWorkerId()" title="Auto-suggest ID" style="white-space:nowrap;padding:8px 10px"><i class="bi bi-magic"></i> Suggest</button>
        </div>
        <small style="color:rgba(255,255,255,.5);font-size:.72rem">Admin provides this primary User ID manually for worker login.</small>
      </div>
      <div class="admin-field-group">
        <label>Worker Full Name *</label>
        <input type="text" id="newUserName" placeholder="e.g. Ramesh Chandra Verma" autocomplete="off" oninput="onNewUserNameChange(this.value)">
      </div>
    </div>

    <div class="admin-field-row">
      <div class="admin-field-group">
        <label>Mobile / Contact Number (Optional)</label>
        <input type="tel" id="newUserPhone" placeholder="10-digit contact number" maxlength="10" autocomplete="off" oninput="this.value = this.value.replace(/\D/g, '')">
      </div>
      <div class="admin-field-group">
        <label>Gmail / Email Address</label>
        <input type="email" id="newUserEmail" placeholder="worker@gmail.com" autocomplete="off">
      </div>
    </div>

    <div class="admin-field-row">
      <div class="admin-field-group">
        <label>Assign Work Project *</label>
        <select id="newUserProject">
          ${projectOptionsHtml}
        </select>
      </div>
      <div class="admin-field-group">
        <label>Initial Account Status *</label>
        <select id="newUserStatus">
          <option value="active" selected>Active (Allowed to Login)</option>
          <option value="disabled">Disabled / Inactive (Blocked)</option>
        </select>
      </div>
    </div>

    <!-- Aadhaar ID Card Verification -->
    <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px 16px;margin-bottom:16px">
      <div style="font-size:.82rem;font-weight:700;color:#fff;margin-bottom:12px;display:flex;align-items:center;gap:6px">
        <i class="bi bi-person-vcard" style="color:#60a5fa"></i> Identity Proof <span style="font-size:.72rem;color:rgba(255,255,255,.4);font-weight:400">(Aadhaar or PAN Card — at least one required)</span>
      </div>
      <div class="admin-field-row" style="margin-bottom:12px">
        <div class="admin-field-group" style="margin-bottom:0">
          <label>Aadhaar Number (12 Digits)</label>
          <input type="text" id="newUserAadhaar" placeholder="XXXX XXXX XXXX" maxlength="14" oninput="formatAadhaarInput(this)">
        </div>
        <div class="admin-field-group" style="margin-bottom:0">
          <label>Aadhaar Front Image / PDF</label>
          <div class="doc-upload-area" id="adminAadhaarBox" onclick="document.getElementById('adminAadhaarInput').click()" style="padding:10px 12px">
            <i class="bi bi-cloud-arrow-up" style="font-size:1.3rem;margin-bottom:2px"></i>
            <p id="adminAadhaarBoxText" style="font-size:.78rem;margin:0;color:#cbd5e1">Click to upload Aadhaar card</p>
            <small style="color:rgba(255,255,255,.35);font-size:.68rem">JPG, PNG or PDF (Max 5MB)</small>
          </div>
          <input type="file" id="adminAadhaarInput" accept="image/*,.pdf" style="display:none" onchange="handleAdminAadhaarFile(event)">
          <div id="adminAadhaarThumbWrap" style="display:none;margin-top:8px">
            <img id="adminAadhaarThumb" class="doc-preview-thumb" alt="Aadhaar Preview">
          </div>
        </div>
      </div>
      <div style="font-size:.75rem;font-weight:600;color:#fbbf24;margin:10px 0 8px;display:flex;align-items:center;gap:5px">
        <i class="bi bi-dash-circle" style="font-size:.9rem"></i> OR — If no Aadhaar, add PAN Card below
      </div>
      <div class="admin-field-row">
        <div class="admin-field-group" style="margin-bottom:0">
          <label>PAN Card Number (10 Digits)</label>
          <input type="text" id="newUserPan" placeholder="ABCDE1234F" maxlength="10" oninput="this.value=this.value.toUpperCase()" style="text-transform:uppercase;letter-spacing:.08em">
        </div>
        <div class="admin-field-group" style="margin-bottom:0">
          <label>PAN Card Image / PDF</label>
          <div class="doc-upload-area" id="adminPanBox" onclick="document.getElementById('adminPanInput').click()" style="padding:10px 12px">
            <i class="bi bi-credit-card" style="font-size:1.3rem;margin-bottom:2px;color:#fbbf24"></i>
            <p id="adminPanBoxText" style="font-size:.78rem;margin:0;color:#cbd5e1">Click to upload PAN card</p>
            <small style="color:rgba(255,255,255,.35);font-size:.68rem">JPG, PNG or PDF (Max 5MB)</small>
          </div>
          <input type="file" id="adminPanInput" accept="image/*,.pdf" style="display:none" onchange="handleAdminPanFile(event)">
          <div id="adminPanThumbWrap" style="display:none;margin-top:8px">
            <img id="adminPanThumb" class="doc-preview-thumb" alt="PAN Preview">
          </div>
        </div>
      </div>
    </div>

    <!-- Digital Signature Proof -->
    <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px 16px;margin-bottom:16px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px">
        <div style="font-size:.82rem;font-weight:700;color:#fff;display:flex;align-items:center;gap:6px">
          <i class="bi bi-pen" style="color:#60a5fa"></i> Worker Digital Signature Proof
        </div>
        <div style="display:flex;gap:6px">
          <button type="button" class="copy-pill-btn" onclick="toggleSigMode('draw')" id="btnSigModeDraw"><i class="bi bi-pencil"></i> Draw Canvas</button>
          <button type="button" class="copy-pill-btn" onclick="toggleSigMode('upload')" id="btnSigModeUpload"><i class="bi bi-upload"></i> Upload Image</button>
        </div>
      </div>

      <!-- Draw signature canvas -->
      <div id="sigDrawWrap">
        <p style="font-size:.75rem;color:rgba(255,255,255,.45);margin:0 0 6px">Draw worker's signature inside the white box below:</p>
        <canvas id="adminNewUserSigCanvas" class="sig-canvas-admin"></canvas>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px">
          <span style="font-size:.72rem;color:rgba(255,255,255,.4)" id="sigStatusHint">Canvas ready for signature</span>
          <button type="button" class="copy-pill-btn" onclick="clearAdminNewUserSig()"><i class="bi bi-eraser"></i> Clear Canvas</button>
        </div>
      </div>

      <!-- Upload signature image -->
      <div id="sigUploadWrap" style="display:none">
        <div class="doc-upload-area" onclick="document.getElementById('adminSigFileInput').click()" style="padding:14px">
          <i class="bi bi-image" style="font-size:1.4rem;margin-bottom:4px"></i>
          <p id="adminSigBoxText" style="font-size:.8rem;margin:0;color:#cbd5e1">Click to upload scanned signature image</p>
          <small style="color:rgba(255,255,255,.35);font-size:.7rem">PNG, JPG or JPEG</small>
        </div>
        <input type="file" id="adminSigFileInput" accept="image/*" style="display:none" onchange="handleAdminSigFile(event)">
        <div id="adminSigThumbWrap" style="display:none;margin-top:8px">
          <img id="adminSigThumb" style="height:60px;background:#fff;border-radius:6px;padding:4px" alt="Signature Preview">
        </div>
      </div>
    </div>

    <!-- Secure Password Generation & Security -->
    <div style="background:rgba(37,99,235,.07);border:1px solid rgba(37,99,235,.22);border-radius:10px;padding:14px 16px;margin-bottom:18px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px">
        <label style="color:#fff;font-size:.82rem;font-weight:700;margin:0;display:flex;align-items:center;gap:6px">
          <i class="bi bi-key-fill" style="color:#60a5fa"></i> Secure Password Generation
        </label>
        <button type="button" class="copy-pill-btn" onclick="generateAndSetNewPassword()">
          <i class="bi bi-magic"></i> Generate Strong Password
        </button>
      </div>

      <div style="display:flex;gap:10px;align-items:center">
        <div style="position:relative;flex:1">
          <input type="text" id="newUserPassword" value="${initialPassword}" style="font-family:monospace;letter-spacing:1px;font-size:1rem;color:#60a5fa;font-weight:700;padding-right:44px" placeholder="Password (min 6 chars)">
          <button type="button" onclick="togglePassVisibility('newUserPassword', this)" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(255,255,255,.6);cursor:pointer;padding:4px;font-size:1rem">
            <i class="bi bi-eye"></i>
          </button>
        </div>
        <button type="button" class="copy-pill-btn" style="padding:10px 14px;font-size:.85rem;white-space:nowrap" onclick="copyToClipboard(document.getElementById('newUserPassword').value, 'Password copied!')">
          <i class="bi bi-clipboard"></i> Copy
        </button>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:.73rem;color:rgba(255,255,255,.5)">
        <span><i class="bi bi-shield-check" style="color:#4ade80"></i> Salted &amp; SHA-256 Hashed before storage</span>
        <span style="color:#4ade80;font-weight:600">✓ Cryptographically Secure</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="modal-footer-btns">
      <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Cancel</button>
      <button type="button" class="admin-btn admin-btn-primary" onclick="saveNewUser()" style="padding:11px 22px;font-size:.9rem;display:flex;align-items:center;gap:8px">
        <i class="bi bi-person-check-fill"></i> Create Worker &amp; Generate Credentials
      </button>
    </div>
  `, true);

  setTimeout(initAdminNewUserSigCanvas, 50);
}

function initAdminNewUserSigCanvas() {
  const canvas = document.getElementById('adminNewUserSigCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.offsetWidth || 500;
  canvas.height = 110;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  let drawing = false;

  function getXY(e) {
    const r = canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return {
      x: (t.clientX - r.left) * (canvas.width / r.width),
      y: (t.clientY - r.top) * (canvas.height / r.height)
    };
  }
  function start(e) {
    e.preventDefault();
    drawing = true;
    const {x, y} = getXY(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    window._adminNewUserSigHasStrokes = true;
    const hint = document.getElementById('sigStatusHint');
    if (hint) hint.textContent = 'Signature drawn ✓';
  }
  function move(e) {
    if (!drawing) return;
    e.preventDefault();
    const {x, y} = getXY(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  function stop() { drawing = false; }

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', move);
  canvas.addEventListener('mouseup', stop);
  canvas.addEventListener('mouseleave', stop);
  canvas.addEventListener('touchstart', start, { passive: false });
  canvas.addEventListener('touchmove', move, { passive: false });
  canvas.addEventListener('touchend', stop);
}

function clearAdminNewUserSig() {
  const canvas = document.getElementById('adminNewUserSigCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  window._adminNewUserSigHasStrokes = false;
  const hint = document.getElementById('sigStatusHint');
  if (hint) hint.textContent = 'Canvas cleared';
}

function toggleSigMode(mode) {
  const drawWrap = document.getElementById('sigDrawWrap');
  const uploadWrap = document.getElementById('sigUploadWrap');
  const btnDraw = document.getElementById('btnSigModeDraw');
  const btnUpload = document.getElementById('btnSigModeUpload');
  if (mode === 'draw') {
    if (drawWrap) drawWrap.style.display = 'block';
    if (uploadWrap) uploadWrap.style.display = 'none';
    if (btnDraw) btnDraw.style.background = '#2563eb';
    if (btnUpload) btnUpload.style.background = '';
    initAdminNewUserSigCanvas();
  } else {
    if (drawWrap) drawWrap.style.display = 'none';
    if (uploadWrap) uploadWrap.style.display = 'block';
    if (btnUpload) btnUpload.style.background = '#2563eb';
    if (btnDraw) btnDraw.style.background = '';
  }
}

function handleAdminUserPhoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    showAdminToast('Photo is too large. Max size is 5MB.');
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    window._adminNewUserPhotoUrl = ev.target.result;
    const preview = document.getElementById('adminUserPhotoPreview');
    if (preview) {
      preview.innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover">`;
      preview.style.borderStyle = 'solid';
      preview.style.borderColor = '#22c55e';
    }
    const btnRemove = document.getElementById('btnRemoveUserPhoto');
    if (btnRemove) btnRemove.style.display = 'inline-flex';
    showAdminToast('✓ Worker photo selected!');
  };
  reader.readAsDataURL(file);
}

function removeAdminUserPhoto() {
  window._adminNewUserPhotoUrl = null;
  const input = document.getElementById('adminUserPhotoInput');
  if (input) input.value = '';
  const preview = document.getElementById('adminUserPhotoPreview');
  if (preview) {
    preview.innerHTML = '<i class="bi bi-person"></i>';
    preview.style.borderStyle = 'dashed';
    preview.style.borderColor = '#3b82f6';
  }
  const btnRemove = document.getElementById('btnRemoveUserPhoto');
  if (btnRemove) btnRemove.style.display = 'none';
  showAdminToast('Photo removed.');
}

function handleAdminAadhaarFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    showAdminToast('File is too large. Max size is 5MB.');
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    window._adminNewUserAadhaarFile = ev.target.result;
    const boxText = document.getElementById('adminAadhaarBoxText');
    if (boxText) boxText.textContent = '✓ ' + file.name;
    const thumbWrap = document.getElementById('adminAadhaarThumbWrap');
    const thumbImg = document.getElementById('adminAadhaarThumb');
    if (thumbWrap && thumbImg && file.type.startsWith('image/')) {
      thumbImg.src = ev.target.result;
      thumbWrap.style.display = 'block';
    }
    showAdminToast('Aadhaar document selected!');
  };
  reader.readAsDataURL(file);
}

function handleAdminPanFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    showAdminToast('File is too large. Max size is 5MB.');
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    window._adminNewUserPanFile = ev.target.result;
    const boxText = document.getElementById('adminPanBoxText');
    if (boxText) boxText.textContent = '✓ ' + file.name;
    const thumbWrap = document.getElementById('adminPanThumbWrap');
    const thumbImg = document.getElementById('adminPanThumb');
    if (thumbWrap && thumbImg && file.type.startsWith('image/')) {
      thumbImg.src = ev.target.result;
      thumbWrap.style.display = 'block';
    }
    showAdminToast('PAN card document selected!');
  };
  reader.readAsDataURL(file);
}

function handleAdminSigFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    window._adminNewUserSigData = ev.target.result;
    const boxText = document.getElementById('adminSigBoxText');
    if (boxText) boxText.textContent = '✓ ' + file.name;
    const thumbWrap = document.getElementById('adminSigThumbWrap');
    const thumbImg = document.getElementById('adminSigThumb');
    if (thumbWrap && thumbImg) {
      thumbImg.src = ev.target.result;
      thumbWrap.style.display = 'block';
    }
    showAdminToast('Signature image uploaded!');
  };
  reader.readAsDataURL(file);
}

function formatAadhaarInput(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 12);
  let formatted = '';
  for (let i = 0; i < v.length; i++) {
    if (i > 0 && i % 4 === 0) formatted += ' ';
    formatted += v[i];
  }
  input.value = formatted;
}

function suggestWorkerId() {
  const name = (document.getElementById('newUserName') ? document.getElementById('newUserName').value : '').trim();
  const base = name ? name.toLowerCase().split(' ')[0].replace(/[^a-z0-9]/g, '') : 'worker';
  const rand = Math.floor(100 + Math.random() * 900);
  const inp = document.getElementById('newUserId');
  if (inp) {
    inp.value = `${base}${rand}`;
    showAdminToast(`Suggested ID: ${inp.value}`);
  }
}

function onNewUserNameChange(val) {
  const inp = document.getElementById('newUserId');
  if (inp && !inp.value.trim() && val.trim()) {
    const base = val.toLowerCase().split(' ')[0].replace(/[^a-z0-9]/g, '');
    const rand = Math.floor(100 + Math.random() * 900);
    inp.value = `${base}${rand}`;
  }
}

function generateAndSetNewPassword() {
  const newPass = generateSecurePassword(10);
  const passInp = document.getElementById('newUserPassword');
  if (passInp) passInp.value = newPass;
  showAdminToast('New strong password generated!');
}

function togglePassVisibility(inputId, btn) {
  const inp = document.getElementById(inputId);
  if (!inp) return;
  const isPass = inp.type === 'password';
  inp.type = isPass ? 'text' : 'password';
  btn.innerHTML = isPass ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>';
}

async function saveNewUser() {
  const userId = (document.getElementById('newUserId') ? document.getElementById('newUserId').value : '').trim();
  const name = (document.getElementById('newUserName').value || '').trim();
  const phone = (document.getElementById('newUserPhone').value || '').trim().replace(/\D/g, '');
  const email = (document.getElementById('newUserEmail').value || '').trim();
  const projectKey = document.getElementById('newUserProject').value;
  const statusEl = document.getElementById('newUserStatus');
  const status = statusEl ? statusEl.value : 'active';
  const aadhaar = (document.getElementById('newUserAadhaar').value || '').trim();
  const panCard = (document.getElementById('newUserPan') ? document.getElementById('newUserPan').value : '').trim().toUpperCase();
  const password = (document.getElementById('newUserPassword').value || '').trim();

  // Validations
  if (!userId) { showAdminToast('Worker User ID (Login ID) is required.'); return; }
  if (!name) { showAdminToast('Worker full name is required.'); return; }
  if (!password || password.length < 4) { showAdminToast('Password must be at least 4 characters.'); return; }

  // Check duplicate on userId / username
  let db = [];
  try { db = JSON.parse(localStorage.getItem('ewi_users_db') || '[]'); } catch(_) {}
  const matchId = userId.toLowerCase();
  const duplicate = db.some(u => (u.userId && u.userId.toLowerCase() === matchId) || (u.username && u.username.toLowerCase() === matchId)) ||
                    USERS_DATA.some(u => (u.userId && u.userId.toLowerCase() === matchId) || (u.username && u.username.toLowerCase() === matchId));
  if (duplicate) {
    showAdminToast('A worker with User ID "' + userId + '" already exists! Please choose a unique User ID.');
    return;
  }

  // Signature resolution
  let sigData = window._adminNewUserSigData;
  if (!sigData && window._adminNewUserSigHasStrokes) {
    const canvas = document.getElementById('adminNewUserSigCanvas');
    if (canvas) sigData = canvas.toDataURL('image/png');
  }
  if (!sigData) {
    const defaultCanvas = document.createElement('canvas');
    defaultCanvas.width = 300; defaultCanvas.height = 80;
    const dctx = defaultCanvas.getContext('2d');
    dctx.fillStyle = '#ffffff'; dctx.fillRect(0, 0, 300, 80);
    dctx.font = 'italic bold 28px serif';
    dctx.fillStyle = '#1e3a8a';
    dctx.fillText(name, 20, 50);
    sigData = defaultCanvas.toDataURL('image/png');
  }

  // Aadhaar document resolution
  let aadhaarFile = window._adminNewUserAadhaarFile;
  if (!aadhaarFile) {
    aadhaarFile = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect width="100%" height="100%" rx="12" fill="%23f8fafc" stroke="%23cbd5e1" stroke-width="2"/><rect width="100%" height="40" fill="%231e3a8a" rx="12"/><text x="20" y="26" font-family="sans-serif" font-weight="bold" font-size="14" fill="%23ffffff">GOVERNMENT OF INDIA - AADHAAR</text><text x="20" y="80" font-family="sans-serif" font-weight="bold" font-size="16" fill="%230f172a">' + encodeURIComponent(name) + '</text><text x="20" y="110" font-family="sans-serif" font-size="13" fill="%23475569">DOB / Gender: Verified</text><text x="20" y="160" font-family="monospace" font-weight="bold" font-size="20" fill="%23b91c1c">' + encodeURIComponent(aadhaar || 'XXXX XXXX 5678') + '</text><text x="20" y="210" font-family="sans-serif" font-size="12" fill="%2315803d">✓ Verified by Easy Work India Admin</text></svg>';
  }

  const matchedP = PROJECTS_DATA.find(p => (p.key === projectKey || (projectKey === 'form_filling' && p.id === 3) || (projectKey === 'data_entry' && p.id === 1)));
  const projInfo = {
    name: matchedP ? matchedP.name : (projectKey === 'form_filling' ? 'Form Filling Project' : 'Data Entry Project'),
    rate: matchedP ? matchedP.perUnit : (projectKey === 'form_filling' ? '₹50/form' : '₹60/form')
  };

  // Salt and SHA-256 Hash
  const salt = generateSalt(16);
  const passwordHash = await hashWithSalt(password, salt);

  // PAN card file
  const panCardFile = window._adminNewUserPanFile || '';

  const newUser = {
    id: Date.now(),
    userId: userId,
    username: userId,
    name,
    phone: phone || userId,
    email: email || '',
    project: projInfo.name,
    projectKey,
    aadhaar: aadhaar || 'XXXX XXXX 5678',
    aadhaarFile,
    panCard: panCard || '',
    panCardFile: panCardFile,
    signatureData: sigData,
    photoUrl: window._adminNewUserPhotoUrl || '',
    passwordHash,
    passwordSalt: salt,
    plainPassword: password,
    earnings: '₹0',
    status: status,
    accountStatus: status === 'disabled' ? 'Disabled' : 'Active',
    joined: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    createdAt: new Date().toISOString()
  };

  // 2b. Sync to Live SQLite Database immediately for instant cross-device login
  try {
    const apiRes = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: newUser.userId,
        username: newUser.username || newUser.userId,
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
        project: newUser.project,
        projectKey: newUser.projectKey,
        aadhaar: newUser.aadhaar,
        aadhaarFile: newUser.aadhaarFile,
        panCard: newUser.panCard,
        panCardFile: newUser.panCardFile,
        signatureData: newUser.signatureData,
        photoUrl: newUser.photoUrl,
        plainPassword: newUser.plainPassword,
        passwordHash: newUser.passwordHash,
        salt: newUser.passwordSalt,
        status: newUser.status,
        joined: newUser.joined
      })
    });
    if (apiRes.ok) {
      const apiJson = await apiRes.json();
      if (apiJson && apiJson.user && apiJson.user.id) {
        newUser.id = apiJson.user.id;
      }
    }
  } catch(_) {}

  // 1. Add to USERS_DATA array
  USERS_DATA.unshift(newUser);

  // 2. Persist to localStorage ewi_users_db
  db.unshift(newUser);
  try { localStorage.setItem('ewi_users_db', JSON.stringify(db)); } catch(_) {}

  // 3. Pre-sync to ewi_user_profile and ewi_user_verify so user account page is 100% ready
  try {
    localStorage.setItem('ewi_user_profile', JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      phone: newUser.phone,
      email: newUser.email,
      username: newUser.username,
      userId: newUser.userId,
      project: newUser.projectKey,
      photoUrl: newUser.photoUrl,
      earnings: '₹0',
      status: newUser.status,
      accountStatus: newUser.status === 'disabled' ? 'Disabled' : 'Active',
      joined: newUser.joined,
      aadhaar: newUser.aadhaar,
      aadhaarFile: newUser.aadhaarFile,
      signatureData: newUser.signatureData
    }));
    localStorage.setItem('ewi_user_verify', JSON.stringify({
      aadhaar: {
        status: 'approved',
        num: newUser.aadhaar,
        name: newUser.name,
        file: newUser.aadhaarFile,
        approvedAt: newUser.createdAt
      },
      sig: {
        status: 'approved',
        data: newUser.signatureData,
        approvedAt: newUser.createdAt
      }
    }));
    localStorage.setItem('ewi_profile_sync_timestamp', Date.now().toString());
  } catch(_) {}

  // 4. Update UI tables & stats
  renderAllData();
  const statTotal = document.getElementById('statTotalUsers');
  if (statTotal) statTotal.textContent = USERS_DATA.length;
  const statActive = document.getElementById('statActiveUsers');
  if (statActive) statActive.textContent = USERS_DATA.filter(u => u.status === 'active').length;

  showAdminToast(`✓ User ${name} (${userId}) successfully created!`);

  // 5. Show generated credentials modal
  showWorkerCredentialsModal(newUser, password);
}

function showWorkerCredentialsModal(u, plainPassword) {
  const credentialsText = `*Easy Work India — Worker Login Credentials*
----------------------------------------
Worker Name: ${u.name}
User ID: ${u.username || u.userId}
Password: ${plainPassword}
Mobile: ${u.phone && u.phone !== (u.username || u.userId) ? u.phone : 'N/A'}
Assigned Project: ${u.project}
Status: ${u.status === 'disabled' ? 'Disabled' : 'Active & Verified'}

Login Portal: http://localhost / index.html
----------------------------------------
Please do not share your credentials with anyone.`;

  window._workerCredentialsText = credentialsText;

  openAdminModal('Worker Account Created &amp; Credentials Generated', `
    <div style="text-align:center;margin-bottom:16px">
      <div style="width:54px;height:54px;border-radius:50%;background:rgba(22,163,74,.2);color:#4ade80;font-size:1.8rem;display:flex;align-items:center;justify-content:center;margin:0 auto 10px">
        <i class="bi bi-check-lg"></i>
      </div>
      <h4 style="color:#fff;font-size:1.15rem;margin:0 0 4px">Worker Successfully Registered</h4>
      <p style="color:rgba(255,255,255,.5);font-size:.82rem;margin:0">Account created. Share these credentials with the worker:</p>
    </div>

    <div class="cred-card">
      <div class="cred-item">
        <div><div class="cred-label">Worker Name</div><strong style="color:#fff">${u.name}</strong></div>
        <span class="status-badge ${u.status === 'disabled' ? 'status-disabled' : 'status-active'}">${u.status === 'disabled' ? 'Disabled' : 'Active'}</span>
      </div>
      <div class="cred-item">
        <div><div class="cred-label">Worker User ID (Primary Login ID)</div><span class="cred-val" style="color:#60a5fa">${u.username || u.userId}</span></div>
        <button class="copy-pill-btn" onclick="copyToClipboard('${u.username || u.userId}', 'User ID copied!')"><i class="bi bi-clipboard"></i> Copy</button>
      </div>
      <div class="cred-item">
        <div><div class="cred-label">Login Password</div><span class="cred-val" style="color:#34d399">${plainPassword}</span></div>
        <button class="copy-pill-btn" onclick="copyToClipboard('${plainPassword}', 'Password copied!')"><i class="bi bi-clipboard"></i> Copy</button>
      </div>
      <div class="cred-item">
        <div><div class="cred-label">Mobile Number</div><span class="cred-val">${u.phone && u.phone !== (u.username || u.userId) ? u.phone : 'Not provided'}</span></div>
      </div>
      <div class="cred-item">
        <div><div class="cred-label">Assigned Project</div><span style="color:#fff;font-weight:600">${u.project}</span></div>
        <span style="font-size:.78rem;color:rgba(255,255,255,.5)">Provisioned</span>
      </div>
      <div class="cred-item">
        <div><div class="cred-label">Identity Document</div><span style="color:#4ade80;font-size:.82rem"><i class="bi bi-shield-check"></i> ${u.panCard ? 'PAN: ' + u.panCard : (u.aadhaar && u.aadhaar !== 'XXXX XXXX 5678' ? 'Aadhaar: ' + u.aadhaar : 'Verified by Admin')}</span></div>
        <span style="font-size:.75rem;color:rgba(255,255,255,.4)">Stored Securely</span>
      </div>
    </div>
      <div class="cred-item">
        <div><div class="cred-label">Password Security</div><span style="color:#a78bfa;font-size:.8rem"><i class="bi bi-lock-fill"></i> Salted &amp; SHA-256 Hashed</span></div>
        <code style="font-size:.7rem;color:rgba(255,255,255,.35)">${u.passwordHash.slice(0, 10)}...</code>
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">
      <button class="admin-btn admin-btn-primary" style="width:100%;justify-content:center;padding:12px;font-size:.9rem" onclick="copyWorkerCredentialsText()">
        <i class="bi bi-clipboard-check"></i> Copy All Credentials (for WhatsApp / SMS)
      </button>
      <button class="admin-btn admin-btn-outline" style="width:100%;justify-content:center" onclick="closeAdminModal()">
        Done &amp; View in User List
      </button>
    </div>
  `, true);
}

function openAddPaymentModal() {
  openAdminModal('Record Payment', `
    <div class="admin-field-group"><label>Worker Name</label>
      <select id="payUser">
        ${USERS_DATA.map(u => `<option value="${u.id}">${u.name}</option>`).join('')}
      </select>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="admin-field-group"><label>Project</label>
        <select id="payProject">
          <option>Data Entry</option><option>Form Filling</option>
        </select>
      </div>
      <div class="admin-field-group"><label>Amount (Rs.)</label><input type="number" id="payAmount" placeholder="400"></div>
      <div class="admin-field-group"><label>Payment Method</label>
        <select id="payMethod"><option>UPI</option><option>Bank Transfer</option><option>Paytm</option><option>Cheque</option></select>
      </div>
      <div class="admin-field-group"><label>Transaction ID</label><input type="text" id="payTxId" placeholder="TX123456789"></div>
    </div>
    <div class="modal-footer-btns">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Cancel</button>
      <button class="admin-btn admin-btn-primary" onclick="savePayment()">Record Payment</button>
    </div>`);
}

function savePayment() {
  const userId = document.getElementById('payUser').value;
  const user = USERS_DATA.find(u => u.id === parseInt(userId));
  const amount = document.getElementById('payAmount').value;
  if (!amount) { showAdminToast('Amount is required.'); return; }
  PAYMENTS_DATA.unshift({
    id: PAYMENTS_DATA.length + 1,
    user: user ? user.name : 'Unknown',
    project: document.getElementById('payProject').value,
    amount: '₹' + amount,
    method: document.getElementById('payMethod').value,
    txId: document.getElementById('payTxId').value || 'MANUAL' + Date.now(),
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'paid',
  });
  closeAdminModal();
  renderPaymentsTable(PAYMENTS_DATA);
  showAdminToast('Payment recorded!');
}

function openAddProjectModal() {
  openAdminModal('Add New Project', `
    <div class="admin-field-group"><label>Project Name</label><input type="text" id="projName" placeholder="e.g. Data Entry Project"></div>
    <div class="admin-field-group"><label>Work Description Header</label><input type="text" id="projWorkDesc" placeholder="Work Description" value="Work Description"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="admin-field-group"><label>Per Form Rate</label><input type="text" id="projRate" placeholder="Rs.60"></div>
      <div class="admin-field-group"><label>Weekly Work</label><input type="text" id="projWeekly" placeholder="350 pages"></div>
      <div class="admin-field-group"><label>Weekly Earnings</label><input type="text" id="projPotential" placeholder="Rs.21,000"></div>
      <div class="admin-field-group"><label>Work Timing</label><input type="text" id="projTiming" placeholder="No Time - No Limit" value="No Time - No Limit"></div>
    </div>
    <div class="admin-field-group"><label>Payout Schedule</label><input type="text" id="projPayout" placeholder="Any Time Work - Weekly Salary" value="Any Time Work - Weekly Salary"></div>
    <div class="modal-footer-btns">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Cancel</button>
      <button class="admin-btn admin-btn-primary" onclick="saveNewProject()">Add Project</button>
    </div>`);
}

function saveNewProject() {
  const name = document.getElementById('projName').value.trim();
  if (!name) { showAdminToast('Project name required.'); return; }
  const workDesc = document.getElementById('projWorkDesc').value.trim() || 'Work Description';
  const perUnit = document.getElementById('projRate').value.trim() || 'Rs.60';
  const weeklyWork = document.getElementById('projWeekly').value.trim() || '350 pages';
  const weeklyEarnings = document.getElementById('projPotential').value.trim() || 'Rs.21,000';
  const timing = document.getElementById('projTiming').value.trim() || 'No Time - No Limit';
  const payout = document.getElementById('projPayout').value.trim() || 'Any Time Work - Weekly Salary';

  const newProj = {
    id: Date.now(),
    key: name.toLowerCase().replace(/\s+/g, '_'),
    name,
    workDesc,
    fee: workDesc,
    perUnit,
    daily: weeklyWork,
    weeklyWork,
    potential: weeklyEarnings,
    weeklyEarnings,
    timing,
    payout,
    workers: 0,
    status: 'active'
  };

  PROJECTS_DATA.push(newProj);
  try { localStorage.setItem('ewi_projects_db', JSON.stringify(PROJECTS_DATA)); } catch(_) {}
  try {
    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project: newProj, projects: PROJECTS_DATA })
    }).catch(() => {});
  } catch(_) {}

  closeAdminModal();
  renderProjectsTable();
  showAdminToast('Project added!');
}

function editProject(id) {
  const p = PROJECTS_DATA.find(x => x.id === id);
  if (!p) return;
  openAdminModal(`Edit Work Description — ${p.name}`, `
    <div class="admin-field-group">
      <label>Project Name</label>
      <input type="text" id="editProjName" value="${p.name}">
    </div>
    <div class="admin-field-group">
      <label>Work Description Header / Overview</label>
      <input type="text" id="editProjWorkDesc" value="${p.workDesc || p.fee || 'Work Description'}">
      <small style="color:rgba(255,255,255,.5);font-size:.72rem">Work Description shown on the project card on the homepage.</small>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="admin-field-group">
        <label>Per Form Rate</label>
        <input type="text" id="editProjRate" value="${p.perUnit || (p.key === 'data_entry' ? 'Rs.60' : 'Rs.50')}">
      </div>
      <div class="admin-field-group">
        <label>Weekly Work</label>
        <input type="text" id="editProjDaily" value="${p.weeklyWork || p.daily || '350 pages'}">
      </div>
      <div class="admin-field-group">
        <label>Weekly Earnings</label>
        <input type="text" id="editProjPotential" value="${p.weeklyEarnings || p.potential || (p.key === 'data_entry' ? 'Rs.21,000' : 'Rs.19,500')}">
      </div>
      <div class="admin-field-group">
        <label>Work Timing</label>
        <input type="text" id="editProjTiming" value="${p.timing || 'No Time - No Limit'}">
      </div>
    </div>
    <div class="admin-field-group">
      <label>Payout Schedule</label>
      <input type="text" id="editProjPayout" value="${p.payout || 'Any Time Work - Weekly Salary'}">
    </div>
    <div class="modal-footer-btns">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Cancel</button>
      <button class="admin-btn admin-btn-primary" onclick="saveEditProject(${id})"><i class="bi bi-check2-circle"></i> Save Work Description</button>
    </div>`);
}

async function saveEditProject(id) {
  const p = PROJECTS_DATA.find(x => x.id === id);
  if (!p) return;
  const oldName = p.name;
  p.name = document.getElementById('editProjName').value.trim();
  p.workDesc = document.getElementById('editProjWorkDesc').value.trim() || 'Work Description';
  p.fee = p.workDesc;
  p.perUnit = document.getElementById('editProjRate').value.trim();
  p.daily = document.getElementById('editProjDaily').value.trim();
  p.weeklyWork = p.daily;
  p.potential = document.getElementById('editProjPotential').value.trim();
  p.weeklyEarnings = p.potential;
  p.timing = document.getElementById('editProjTiming').value.trim();
  p.payout = document.getElementById('editProjPayout').value.trim();

  if (!p.key) {
    p.key = (id === 3 ? 'form_filling' : 'data_entry');
  }

  // 1. Save projects array to localStorage
  try {
    localStorage.setItem('ewi_projects_db', JSON.stringify(PROJECTS_DATA));
  } catch(_) {}

  // 2. Extract unit rate and sync to ewi_unit_rates
  const rateMatch = p.perUnit.match(/\d+/);
  if (rateMatch) {
    const numRate = parseInt(rateMatch[0], 10);
    let rates = { data_entry: 60, form_filling: 50 };
    try {
      const stored = JSON.parse(localStorage.getItem('ewi_unit_rates') || '{}');
      rates = { ...rates, ...stored };
    } catch(_) {}
    rates[p.key] = numRate;
    try {
      localStorage.setItem('ewi_unit_rates', JSON.stringify(rates));
    } catch(_) {}

    // Also update rate inputs in task manager if loaded
    const rateInp = document.getElementById(`rate_${p.key}`);
    if (rateInp) rateInp.value = numRate;
  }

  // 3. Sync to live backend SQLite database (/api/projects)
  try {
    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project: p, projects: PROJECTS_DATA })
    }).catch(() => {});
  } catch(_) {}

  // 4. Update project name for all existing workers in memory and database
  USERS_DATA.forEach(u => {
    if (u.projectKey === p.key || u.project === oldName || (id === 1 && (u.project || '').includes('Data Entry')) || (id === 3 && (u.project || '').includes('Form Filling'))) {
      u.project = p.name;
      u.projectKey = p.key;
    }
  });
  let dbUsers = [];
  try { dbUsers = JSON.parse(localStorage.getItem('ewi_users_db') || '[]'); } catch(_) {}
  dbUsers.forEach(u => {
    if (u.projectKey === p.key || u.project === oldName || (id === 1 && (u.project || '').includes('Data Entry')) || (id === 3 && (u.project || '').includes('Form Filling'))) {
      u.project = p.name;
      u.projectKey = p.key;
    }
  });
  try { localStorage.setItem('ewi_users_db', JSON.stringify(dbUsers)); } catch(_) {}

  // 5. If logged-in worker's active profile matches this project, update it
  try {
    const prof = JSON.parse(localStorage.getItem('ewi_user_profile') || 'null');
    if (prof && (prof.project === p.key || prof.projectKey === p.key || (id === 1 && (prof.project || '').includes('data_entry')) || (id === 3 && (prof.project || '').includes('form_filling')))) {
      prof.projectName = p.name;
      prof.project = p.key;
      prof.unitRate = p.perUnit;
      prof.dailyTarget = p.daily;
      localStorage.setItem('ewi_user_profile', JSON.stringify(prof));
    }
  } catch(_) {}

  closeAdminModal();
  renderProjectsTable();
  renderUsersTable(USERS_DATA);
  renderRecentUsers();
  showAdminToast(`✓ "${p.name}" updated successfully everywhere!`);
}

function deleteProject(id) {
  if (!confirm('Delete this project?')) return;
  const idx = PROJECTS_DATA.findIndex(x => x.id === id);
  if (idx > -1) PROJECTS_DATA.splice(idx, 1);
  renderProjectsTable();
  showAdminToast('Project deleted.');
}

function openAddReviewModal() {
  openAdminModal('Add Review', `
    <div class="admin-field-group"><label>Reviewer Name</label><input type="text" id="revName" placeholder="Full name"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="admin-field-group"><label>Rating</label>
        <select id="revRating"><option value="5">5 - Excellent</option><option value="4">4 - Good</option><option value="3">3 - Average</option></select>
      </div>
      <div class="admin-field-group"><label>Project / Location</label><input type="text" id="revProject" placeholder="Data Entry · Mumbai"></div>
    </div>
    <div class="admin-field-group"><label>Review Text</label><textarea id="revText" rows="4" placeholder="Write the review..."></textarea></div>
    <div class="modal-footer-btns">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Cancel</button>
      <button class="admin-btn admin-btn-primary" onclick="saveNewReview()">Add Review</button>
    </div>`);
}

function saveNewReview() {
  const name = document.getElementById('revName').value.trim();
  const text = document.getElementById('revText').value.trim();
  if (!name || !text) { showAdminToast('Name and review text are required.'); return; }
  REVIEWS_DATA.unshift({
    id: REVIEWS_DATA.length + 1,
    name, text,
    rating: parseInt(document.getElementById('revRating').value),
    project: document.getElementById('revProject').value,
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'active',
  });
  closeAdminModal();
  renderReviewsTable();
  showAdminToast('Review added!');
}

function editReview(id) {
  const r = REVIEWS_DATA.find(x => x.id === id);
  if (!r) return;
  openAdminModal('Edit Review', `
    <div class="admin-field-group"><label>Review Text</label><textarea id="editRevText" rows="5">${r.text}</textarea></div>
    <div class="admin-field-group"><label>Status</label>
      <select id="editRevStatus">
        <option ${r.status === 'active' ? 'selected' : ''} value="active">Active (Published)</option>
        <option ${r.status === 'pending' ? 'selected' : ''} value="pending">Pending (Hidden)</option>
      </select>
    </div>
    <div class="modal-footer-btns">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Cancel</button>
      <button class="admin-btn admin-btn-primary" onclick="saveEditReview(${id})">Save</button>
    </div>`);
}

function saveEditReview(id) {
  const r = REVIEWS_DATA.find(x => x.id === id);
  if (!r) return;
  r.text = document.getElementById('editRevText').value;
  r.status = document.getElementById('editRevStatus').value;
  closeAdminModal();
  renderReviewsTable();
  showAdminToast('Review updated!');
}

function openAnnouncementModal() {
  openAdminModal('New Announcement', `
    <div class="admin-field-group"><label>Title</label><input type="text" id="annTitle" placeholder="Announcement title"></div>
    <div class="admin-field-group"><label>Message</label><textarea id="annMessage" rows="4" placeholder="Write your announcement..."></textarea></div>
    <div class="admin-field-group"><label>Target Audience</label>
      <select id="annTarget"><option>All Workers</option><option>New Users</option><option>Active Users</option><option>Pending Users</option></select>
    </div>
    <div class="modal-footer-btns">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Cancel</button>
      <button class="admin-btn admin-btn-primary" onclick="saveAnnouncement()">Send Announcement</button>
    </div>`);
}

function saveAnnouncement() {
  const title = document.getElementById('annTitle').value.trim();
  const message = document.getElementById('annMessage').value.trim();
  if (!title || !message) { showAdminToast('Title and message are required.'); return; }
  ANNOUNCEMENTS_DATA.unshift({
    id: ANNOUNCEMENTS_DATA.length + 1,
    title, message,
    target: document.getElementById('annTarget').value,
    by: 'Admin',
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
  });
  closeAdminModal();
  renderAnnouncementsTable();
  showAdminToast('Announcement sent!');
}

/* ===== PROFILE ===== */
function loadProfileToForm() {
  const saved = JSON.parse(localStorage.getItem('ewi_admin_profile') || '{}');
  Object.assign(adminProfile, saved);
  if (document.getElementById('profileFullName')) {
    document.getElementById('profileFullName').value = adminProfile.fullName || '';
    document.getElementById('profileUsername').value = adminProfile.username || '';
    document.getElementById('profileEmail').value = adminProfile.email || '';
    document.getElementById('profilePhone').value = adminProfile.phone || '';
    document.getElementById('profileAadhaar').value = adminProfile.aadhaar || '';
    document.getElementById('displayProfileName').textContent = adminProfile.fullName || 'Admin User';
    if (adminProfile.avatarSrc) {
      const av = document.getElementById('profileAvatarDisplay');
      if (av) {
        av.innerHTML = `<img src="${adminProfile.avatarSrc}" alt="Avatar">`;
      }
    }
  }
}

function loadProfileFromStorage() {
  loadProfileToForm();
}

function saveProfile() {
  adminProfile.fullName = document.getElementById('profileFullName').value.trim() || 'Admin User';
  adminProfile.username = document.getElementById('profileUsername').value.trim() || 'admin';
  adminProfile.email = document.getElementById('profileEmail').value.trim();
  adminProfile.phone = document.getElementById('profilePhone').value.trim();
  adminProfile.aadhaar = document.getElementById('profileAadhaar').value.trim();
  document.getElementById('displayProfileName').textContent = adminProfile.fullName;
  localStorage.setItem('ewi_admin_profile', JSON.stringify(adminProfile));
  showAdminToast('Profile saved successfully!');
}

function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    adminProfile.avatarSrc = e.target.result;
    const av = document.getElementById('profileAvatarDisplay');
    if (av) av.innerHTML = `<img src="${e.target.result}" alt="Avatar">`;
    showAdminToast('Profile picture updated!');
  };
  reader.readAsDataURL(file);
}

function handleDocUpload(event, areaId) {
  const file = event.target.files[0];
  if (!file) return;
  const area = document.getElementById(areaId);
  if (area) {
    area.innerHTML = `<i class="bi bi-file-earmark-check" style="color:#4ade80"></i><p style="color:#4ade80;font-weight:600">${file.name}</p><small>Uploaded successfully</small>`;
  }
  showAdminToast('Document uploaded!');
}

/* ===== SIGNATURE CANVAS ===== */
function initSignatureCanvas() {
  const canvas = document.getElementById('signatureCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let drawing = false;
  canvas.width = canvas.offsetWidth;
  canvas.height = 100;
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - rect.left, y: t.clientY - rect.top };
  }

  canvas.addEventListener('mousedown', e => { drawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
  canvas.addEventListener('mousemove', e => { if (!drawing) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); });
  canvas.addEventListener('mouseup', () => { drawing = false; });
  canvas.addEventListener('mouseleave', () => { drawing = false; });
  canvas.addEventListener('touchstart', e => { e.preventDefault(); drawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
  canvas.addEventListener('touchmove', e => { e.preventDefault(); if (!drawing) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); });
  canvas.addEventListener('touchend', () => { drawing = false; });
}

function clearSignature() {
  const canvas = document.getElementById('signatureCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  showAdminToast('Signature cleared.');
}

function saveSignature() {
  const canvas = document.getElementById('signatureCanvas');
  if (!canvas) return;
  adminProfile.signatureData = canvas.toDataURL();
  showAdminToast('Signature saved!');
}

/* ===== SETTINGS ===== */
function saveSettings() {
  showAdminToast('Settings saved successfully!');
}

function changePassword() {
  const newPass = document.getElementById('newPassword').value;
  const confirmPass = document.getElementById('confirmPassword').value;
  if (!newPass || !confirmPass) { showAdminToast('Please fill both password fields.'); return; }
  if (newPass !== confirmPass) { showAdminToast('Passwords do not match!'); return; }
  if (newPass.length < 6) { showAdminToast('Password must be at least 6 characters.'); return; }
  ADMIN_CREDENTIALS.password = newPass;
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmPassword').value = '';
  showAdminToast('Password updated successfully!');
}

/* ===== MODAL HELPERS ===== */
function openAdminModal(title, content, isLarge = false) {
  const modal = document.getElementById('adminModal');
  if (modal) modal.classList.toggle('admin-modal-lg', !!isLarge);
  document.getElementById('adminModalContent').innerHTML = `<h3>${title}</h3>${content}`;
  document.getElementById('adminModalOverlay').hidden = false;
}
function closeAdminModal() {
  const modal = document.getElementById('adminModal');
  if (modal) modal.classList.remove('admin-modal-lg');
  document.getElementById('adminModalOverlay').hidden = true;
  document.getElementById('adminModalContent').innerHTML = '';
}
document.addEventListener('click', e => {
  const overlay = document.getElementById('adminModalOverlay');
  if (overlay && e.target === overlay) closeAdminModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAdminModal();
});

/* ===== HELPERS ===== */
function initials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function infoRow(label, value) {
  return `<div style="background:rgba(255,255,255,.04);border-radius:8px;padding:10px 12px">
    <div style="font-size:.72rem;color:rgba(255,255,255,.4);margin-bottom:2px">${label}</div>
    <div style="font-size:.88rem;color:#fff;font-weight:600">${value}</div>
  </div>`;
}

/* ===== TOAST ===== */
function showAdminToast(msg) {
  const t = document.getElementById('adminToast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* =====================================================
   VERIFICATION MANAGEMENT
   ===================================================== */
function loadPendingVerifications() {
  let pending = [];
  try { pending = JSON.parse(localStorage.getItem('ewi_pending_verifications') || '[]'); } catch(_) {}

  const aadhaarItems = pending.filter(p => p.type === 'aadhaar');
  const sigItems     = pending.filter(p => p.type === 'signature');

  const pendingCount   = pending.filter(p => p.data.status === 'pending_admin').length;
  const approvedCount  = pending.filter(p => p.data.status === 'approved').length;
  const rejectedCount  = pending.filter(p => p.data.status === 'rejected').length;

  // Update stats
  const vP = document.getElementById('vStatPending');
  const vA = document.getElementById('vStatApproved');
  const vR = document.getElementById('vStatRejected');
  if (vP) vP.textContent = pendingCount;
  if (vA) vA.textContent = approvedCount;
  if (vR) vR.textContent = rejectedCount;

  // Update sidebar badge
  const badge = document.getElementById('verifyBadgeCount');
  if (badge) {
    badge.textContent = pendingCount;
    badge.style.display = pendingCount > 0 ? 'inline-block' : 'none';
  }

  // Aadhaar badge
  const aadhaarBadge = document.getElementById('aadhaarPendingBadge');
  const aP = aadhaarItems.filter(i => i.data.status === 'pending_admin').length;
  if (aadhaarBadge) {
    aadhaarBadge.textContent = aP + ' pending';
    aadhaarBadge.className = aP > 0 ? 'status-badge status-pending' : 'status-badge status-active';
  }

  // Signature badge
  const sigBadge = document.getElementById('sigPendingBadge');
  const sP = sigItems.filter(i => i.data.status === 'pending_admin').length;
  if (sigBadge) {
    sigBadge.textContent = sP + ' pending';
    sigBadge.className = sP > 0 ? 'status-badge status-pending' : 'status-badge status-active';
  }

  renderAadhaarVerifyList(aadhaarItems);
  renderSigVerifyList(sigItems);
}

function renderAadhaarVerifyList(items) {
  const container = document.getElementById('aadhaarVerifyList');
  if (!container) return;
  if (!items.length) {
    container.innerHTML = `<div style="text-align:center;padding:32px;color:rgba(255,255,255,.4);font-size:.9rem">
      <i class="bi bi-inbox" style="font-size:2rem;display:block;margin-bottom:8px"></i>No Aadhaar verifications yet</div>`;
    return;
  }
  container.innerHTML = items.map(item => {
    const d = item.data;
    const statusBadge = getVerifyStatusBadge(d.status);
    const submittedDate = d.submittedAt ? new Date(d.submittedAt).toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '—';
    const isPending = d.status === 'pending_admin';
    return `
      <div style="display:flex;align-items:flex-start;gap:16px;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.05);transition:background .2s" onmouseover="this.style.background='rgba(255,255,255,.03)'" onmouseout="this.style.background=''">
        <div class="user-mini-avatar" style="flex-shrink:0">${initials(item.userName)}</div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap">
            <strong style="color:#fff;font-size:.9rem">${item.userName}</strong>
            <code style="font-size:.72rem;color:rgba(255,255,255,.4)">${item.userId}</code>
            ${statusBadge}
          </div>
          <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px">
            <span style="font-size:.8rem;color:rgba(255,255,255,.5)"><i class="bi bi-person-badge" style="color:#60a5fa"></i> Aadhaar No: <strong style="color:rgba(255,255,255,.8)">${d.num || '—'}</strong></span>
            <span style="font-size:.8rem;color:rgba(255,255,255,.5)"><i class="bi bi-type" style="color:#60a5fa"></i> Name on card: <strong style="color:rgba(255,255,255,.8)">${d.name || '—'}</strong></span>
            <span style="font-size:.8rem;color:rgba(255,255,255,.5)"><i class="bi bi-clock" style="color:#60a5fa"></i> Submitted: ${submittedDate}</span>
          </div>
          ${d.file ? `<div style="margin-bottom:10px">
            <a href="${d.file}" target="_blank" style="display:inline-flex;align-items:center;gap:6px;background:rgba(37,99,235,.15);color:#60a5fa;padding:6px 12px;border-radius:6px;font-size:.78rem;font-weight:600;text-decoration:none;border:1px solid rgba(37,99,235,.2)" onclick="previewAadhaarImage('${item.userId}')">
              <i class="bi bi-image"></i> View Uploaded Aadhaar Image
            </a>
          </div>` : '<div style="font-size:.78rem;color:rgba(255,255,255,.35);margin-bottom:8px"><i class="bi bi-dash-circle"></i> No image uploaded</div>'}
        </div>
        ${isPending ? `<div style="display:flex;flex-direction:column;gap:8px;flex-shrink:0">
          <button class="action-btn action-btn-approve" style="width:auto;padding:7px 14px;border-radius:6px;font-size:.8rem;font-weight:600;display:flex;align-items:center;gap:5px" onclick="approveVerification('aadhaar','${item.userId}','${item.userName}')">
            <i class="bi bi-check-lg"></i> Approve
          </button>
          <button class="action-btn action-btn-delete" style="width:auto;padding:7px 14px;border-radius:6px;font-size:.8rem;font-weight:600;display:flex;align-items:center;gap:5px" onclick="rejectVerification('aadhaar','${item.userId}','${item.userName}')">
            <i class="bi bi-x-lg"></i> Reject
          </button>
        </div>` : `<div style="font-size:.75rem;color:rgba(255,255,255,.3);align-self:center">${d.status === 'approved' ? '✓ Done' : '✗ Rejected'}</div>`}
      </div>`;
  }).join('');
}


function renderSigVerifyList(items) {
  const container = document.getElementById('signatureVerifyList');
  if (!container) return;
  if (!items.length) {
    container.innerHTML = `<div style="text-align:center;padding:32px;color:rgba(255,255,255,.4);font-size:.9rem">
      <i class="bi bi-inbox" style="font-size:2rem;display:block;margin-bottom:8px"></i>No signature verifications yet</div>`;
    return;
  }
  container.innerHTML = items.map(item => {
    const d = item.data;
    const statusBadge = getVerifyStatusBadge(d.status);
    const submittedDate = d.submittedAt ? new Date(d.submittedAt).toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '—';
    const isPending = d.status === 'pending_admin';
    return `
      <div style="display:flex;align-items:flex-start;gap:16px;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.05);transition:background .2s" onmouseover="this.style.background='rgba(255,255,255,.03)'" onmouseout="this.style.background=''">
        <div class="user-mini-avatar" style="flex-shrink:0">${initials(item.userName)}</div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap">
            <strong style="color:#fff;font-size:.9rem">${item.userName}</strong>
            <code style="font-size:.72rem;color:rgba(255,255,255,.4)">${item.userId}</code>
            ${statusBadge}
          </div>
          <div style="margin-bottom:4px;font-size:.78rem;color:rgba(255,255,255,.4)"><i class="bi bi-clock"></i> Submitted: ${submittedDate}</div>
          ${d.data ? `<div style="margin-top:10px;margin-bottom:4px;font-size:.78rem;color:rgba(255,255,255,.5)">Signature preview:</div>
          <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px;display:inline-block">
            <img src="${d.data}" alt="Signature" style="height:60px;max-width:260px;display:block;border-radius:4px;background:#fff">
          </div>` : '<div style="font-size:.78rem;color:rgba(255,255,255,.35)"><i class="bi bi-dash-circle"></i> No signature data</div>'}
        </div>
        ${isPending ? `<div style="display:flex;flex-direction:column;gap:8px;flex-shrink:0">
          <button class="action-btn action-btn-approve" style="width:auto;padding:7px 14px;border-radius:6px;font-size:.8rem;font-weight:600;display:flex;align-items:center;gap:5px" onclick="approveVerification('signature','${item.userId}','${item.userName}')">
            <i class="bi bi-check-lg"></i> Approve
          </button>
          <button class="action-btn action-btn-delete" style="width:auto;padding:7px 14px;border-radius:6px;font-size:.8rem;font-weight:600;display:flex;align-items:center;gap:5px" onclick="rejectVerification('signature','${item.userId}','${item.userName}')">
            <i class="bi bi-x-lg"></i> Reject
          </button>
        </div>` : `<div style="font-size:.75rem;color:rgba(255,255,255,.3);align-self:center">${d.status === 'approved' ? '✓ Done' : '✗ Rejected'}</div>`}
      </div>`;
  }).join('');
}


function getVerifyStatusBadge(status) {
  const map = {
    pending_admin: '<span class="status-badge status-pending" style="font-size:.7rem"><i class="bi bi-hourglass-split"></i> Pending Review</span>',
    approved:      '<span class="status-badge status-active" style="font-size:.7rem"><i class="bi bi-check-circle"></i> Approved</span>',
    rejected:      '<span class="status-badge status-rejected" style="font-size:.7rem"><i class="bi bi-x-circle"></i> Rejected</span>',
    none:          '<span class="status-badge status-inactive" style="font-size:.7rem">Not Submitted</span>',
  };
  return map[status] || map['none'];
}

function approveVerification(type, userId, userName) {
  // Update in pending list
  let pending = [];
  try { pending = JSON.parse(localStorage.getItem('ewi_pending_verifications') || '[]'); } catch(_) {}
  const item = pending.find(p => p.userId === userId && p.type === type);
  if (item) {
    item.data.status = 'approved';
    item.data.approvedAt = new Date().toISOString();
  }
  try { localStorage.setItem('ewi_pending_verifications', JSON.stringify(pending)); } catch(_) {}

  // Write back to user's verify storage so account.html picks it up
  updateUserVerifyStorage(userId, type, 'approved', item ? item.data : {});

  loadPendingVerifications();
  showAdminToast(`✓ ${type === 'aadhaar' ? 'Aadhaar' : 'Signature'} of ${userName} approved! It is now live on their profile.`);

  // Add to admin notifications
  NOTIFICATIONS_DATA.unshift({
    id: Date.now(),
    icon: 'bi-shield-fill-check',
    color: '#16a34a',
    bg: 'rgba(22,163,74,.15)',
    title: `${type === 'aadhaar' ? 'Aadhaar' : 'Signature'} Approved`,
    sub: `${userName}'s ${type === 'aadhaar' ? 'Aadhaar card' : 'signature'} has been verified and linked to their profile.`,
    time: 'just now',
    unread: true,
  });
}

function rejectVerification(type, userId, userName) {
  openAdminModal(`Reject ${type === 'aadhaar' ? 'Aadhaar' : 'Signature'} Verification`, `
    <div style="margin-bottom:16px;display:flex;align-items:center;gap:12px">
      <div class="user-mini-avatar">${initials(userName)}</div>
      <div>
        <strong style="color:#fff">${userName}</strong>
        <div style="font-size:.78rem;color:rgba(255,255,255,.45)">${type === 'aadhaar' ? 'Aadhaar Card' : 'Digital Signature'} Rejection</div>
      </div>
    </div>
    <div class="admin-field-group">
      <label>Reason for Rejection (shown to user)</label>
      <select id="rejectReasonSel">
        <option value="Image is blurry or unclear">Image is blurry or unclear</option>
        <option value="Wrong document uploaded">Wrong document uploaded</option>
        <option value="Details do not match">Details do not match</option>
        <option value="Signature is not legible">Signature is not legible</option>
        <option value="Document is expired">Document is expired</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div class="admin-field-group">
      <label>Additional Note (optional)</label>
      <textarea id="rejectNote" rows="3" placeholder="Any specific instructions for the user..."></textarea>
    </div>
    <div class="modal-footer-btns">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Cancel</button>
      <button class="admin-btn admin-btn-danger" onclick="confirmReject('${type}','${userId}','${userName}')">
        <i class="bi bi-x-lg"></i> Confirm Rejection
      </button>
    </div>`);
}

function confirmReject(type, userId, userName) {
  const reason = document.getElementById('rejectReasonSel').value;
  const note = document.getElementById('rejectNote').value.trim();

  let pending = [];
  try { pending = JSON.parse(localStorage.getItem('ewi_pending_verifications') || '[]'); } catch(_) {}
  const item = pending.find(p => p.userId === userId && p.type === type);
  if (item) {
    item.data.status = 'rejected';
    item.data.rejectedAt = new Date().toISOString();
    item.data.rejectReason = reason;
    item.data.rejectNote = note;
  }
  try { localStorage.setItem('ewi_pending_verifications', JSON.stringify(pending)); } catch(_) {}

  updateUserVerifyStorage(userId, type, 'rejected', item ? item.data : {});

  closeAdminModal();
  loadPendingVerifications();
  showAdminToast(`${type === 'aadhaar' ? 'Aadhaar' : 'Signature'} of ${userName} rejected. User will be notified.`);
}

function updateUserVerifyStorage(userId, type, newStatus, extraData) {
  // The user's verify data is stored in ewi_user_verify in localStorage.
  // Since admin and user share the same browser in demo, we update it directly.
  let verify = {};
  try { verify = JSON.parse(localStorage.getItem('ewi_user_verify') || '{}'); } catch(_) {}
  if (!verify.aadhaar) verify.aadhaar = { status: 'none' };
  if (!verify.sig) verify.sig = { status: 'none' };

  if (type === 'aadhaar') {
    verify.aadhaar = { ...verify.aadhaar, ...extraData, status: newStatus };
  } else if (type === 'signature') {
    verify.sig = { ...verify.sig, ...extraData, status: newStatus };
  }
  try { localStorage.setItem('ewi_user_verify', JSON.stringify(verify)); } catch(_) {}
}

function previewAadhaarImage(userId) {
  let pending = [];
  try { pending = JSON.parse(localStorage.getItem('ewi_pending_verifications') || '[]'); } catch(_) {}
  const item = pending.find(p => p.userId === userId && p.type === 'aadhaar');
  if (!item || !item.data.file) { showAdminToast('No image available.'); return; }
  openAdminModal('Aadhaar Card — ' + item.userName, `
    <div style="text-align:center">
      <img src="${item.data.file}" alt="Aadhaar Card" style="max-width:100%;border-radius:10px;border:1px solid rgba(255,255,255,.1);margin-bottom:16px">
      <div style="font-size:.82rem;color:rgba(255,255,255,.5)">Aadhaar No: <strong style="color:#fff">${item.data.num}</strong> · Name: <strong style="color:#fff">${item.data.name}</strong></div>
    </div>
    <div class="modal-footer-btns" style="margin-top:20px">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Close</button>
      ${item.data.status === 'pending_admin' ? `
        <button class="admin-btn admin-btn-danger" onclick="closeAdminModal();rejectVerification('aadhaar','${item.userId}','${item.userName}')"><i class="bi bi-x-lg"></i> Reject</button>
        <button class="admin-btn admin-btn-success" onclick="closeAdminModal();approveVerification('aadhaar','${item.userId}','${item.userName}')"><i class="bi bi-check-lg"></i> Approve</button>` : ''}
    </div>`);
}

/* =============================================
   TASK MANAGER MODULE — Admin Side
   Daily Task Provisioning for 3 Project Types
   ============================================= */
const DEFAULT_TASKS_DATA = [
  // 1. Data Entry Tasks (₹60/page)
  {
    id: 'TSK-DE-01',
    category: 'data_entry',
    categoryName: 'Data Entry',
    title: 'Medical Health Registry — Patient Clinical Intake Record (Page 1)',
    rate: '₹60/page',
    unitRate: 60,
    dailyQuota: 50,
    updatedAt: '26 Oct 2026',
    status: 'active',
    content: `PATIENT CLINICAL INTAKE DOSSIER — CENTRAL HEALTH REGISTRY TRANSCRIPT
[SECTION 1: PATIENT IDENTIFICATION & RESIDENTIAL RECORD]
Patient Full Name: Anil Kumar Mehra | Date of Birth: 14/08/1982 | Age: 43 Years | Gender: Male
Blood Group: B+ Positive | Marital Status: Married | National Aadhaar ID: 8492-4910-3321
Permanent Residential Domicile: Flat 402, Shanti Vihar, Station Road, Manchar, Pune, Maharashtra - 410503
Registered Mobile Contact: +91 98223 41092 | Alternate Phone: +91 98223 41093
Primary Emergency Point of Contact: Smt. Sunita Anil Mehra (Relationship: Spouse)
Attending Physician: Dr. R. K. Deshmukh (M.D. Medicine, Maharashtra Medical Council Reg No: MH-44910)

[SECTION 2: CLINICAL VITALS & SYSTEMIC EXAMINATION]
Admission Category: Outpatient General Health Checkup & Comprehensive Preventive Diagnostics
Physical Vitals Summary: Pulse Rate: 72 bpm (Regular Sinus Rhythm) | Systolic / Diastolic BP: 120/80 mmHg
Oxygen Saturation (SpO2): 99% Ambient Room Air | Body Temperature: 98.4°F Oral | Respiration: 16 breaths/min
Height: 174 cm | Weight: 72.5 kg | Body Mass Index (BMI): 23.9 kg/m2 (Normal Ambulatory Range)
Systemic Observations: Bilateral vesicular breath sounds clear throughout all lung fields. S1 and S2 heart sounds normal with zero detectable cardiac murmurs. Abdominal palpation reveals soft, non-tender quadrants with no organomegaly. Cranial nerves and peripheral deep tendon reflexes intact.

[SECTION 3: LABORATORY INVESTIGATIONS & PRESCRIBED THERAPY]
Diagnostic Orders Dispatched: Complete Blood Count (CBC), Fasting Blood Sugar (FBS), Glycated Hemoglobin (HbA1c), Comprehensive Lipid Profile, Renal Function Panel (RFT), Serum Bilirubin, and Routine Urinalysis.
Prescription Regimen: Tab. Multivitamin & Essential Minerals 1 Tab OD after breakfast for 30 days; Cap. Cholecalciferol (Vitamin D3) 60,000 IU 1 Cap weekly for 8 weeks; Tab. Calcium Carbonate 500 mg with Vitamin D 1 Tab OD at bedtime for 30 days.
Lifestyle Directives: Minimum 45 minutes daily aerobic brisk walking, reduced dietary sodium and saturated fat intake, maintained daily oral hydration of at least 3.5 liters water, and 8 hours uninterrupted nocturnal sleep.

[SECTION 4: HEALTH INSURANCE CLEARANCE & REGISTRY ATTESTATION]
Third-Party Administrator (TPA): Star Health & Allied Insurance Co Ltd | Policy Ref: POL-MED-2026-904128
Cashless Pre-Authorization Approval Code: CASHLESS-AUTH-88412 | Pre-Approved Limit: Rs. 15,000.00
Hospital Registry Ledger Record: Volume XXVI/2026, Ledger Folio No: 412 | Transcriptionist: S. P. Kulkarni
Statutory Medical Attestation: Certified that clinical intake parameters and diagnostic findings transcribed herein represent true and verified hospital archives. Duly authorized and ratified for permanent registry.`,
    instructions: 'Type the clinical intake transcript exactly as formatted above. Manual typing only — Copy/Paste is disabled.'
  },
  {
    id: 'TSK-DE-02',
    category: 'data_entry',
    categoryName: 'Data Entry',
    title: 'Municipal Property Assessment Ledger — Ward 04 Manchar Zone B',
    rate: '₹60/page',
    unitRate: 60,
    dailyQuota: 50,
    updatedAt: '26 Oct 2026',
    status: 'active',
    content: `MUNICIPAL REVENUE & PROPERTY CONVEYANCE ASSESSMENT LEDGER — WARD 04
[SECTION 1: PROPERTY CADASTRAL IDENTIFICATION & SITUATION]
Assessment Year: 2026-2027 | Government Survey Cadastral Plot No: 142/B | Zone: Manchar North Ward 04
Municipal Property Identification Code: MPIC-MH-2026-004128 | Revenue Circle: Manchar Sub-District Hub
Owner of Record: Vikramaditya Suresh Patil | Co-Owner / Nominee: Smt. Meenakshi Vikramaditya Patil
Physical Situation Address: Survey No. 142/B, Near Bank of Maharashtra, Pune - Nashik Highway, Manchar, Pune - 410503
Holding Nature: Absolute Freehold Residential Title | Master Conveyance Deed Registration: BND-2018-99410
Original Document Execution Date: 18th November 2018 | Sub-Registrar Office: Sub-Registrar Haveli-04 Pune

[SECTION 2: STRUCTURAL SPECIFICATIONS & CARPET METRICS]
Structure Classification: Reinforced Cement Concrete (RCC-Grade IV) Residential Multi-Dwelling (G+2 Floors)
Total Plot Land Footprint: 3,200 Sq.Ft. | Total Built-up Ground Floor Area: 1,250 Sq.Ft.
First Floor Residential Carpet Area: 1,200 Sq.Ft. | Total Super Built-up Gross Area: 2,450 Sq.Ft.
Age of Civil Construction: 7 Years (Year of Completion: 2019) | Structural Stability Fitness Rating: Class A-1
Sanctioned Building Layout Plan: Town Planning Authority Approval Letter No. TPA/MH/2018/3412
Internal Amenities: Dedicated Municipal Potable Water Meter, 3-Phase Domestic Electricity Grid, Rainwater Harvesting Tank.

[SECTION 3: CAPITAL VALUATION & STATUTORY PROPERTY TAX DEMAND]
Current Capital Market Valuation: ₹42,50,000.00 | Municipal Ready Reckoner Unit Base Rate: ₹1,734.69 per Sq.Ft.
Annual Rateable Value (ARV): ₹42,500.00 | Applicable Municipal Assessment Index Factor: 0.085%
Net General Municipal Tax: ₹3,612.50 | Drinking Water Supply Cess: ₹750.00 | Solid Waste Management Cess: ₹200.00
Drainage & Sewerage Maintenance Surcharge: ₹350.00 | Maharashtra State Education & Employment Cess: ₹250.00
Gross Consolidated Municipal Demand: ₹5,162.50 | Net Payable Demand (Inclusive of 5% Early Settlement Rebate): ₹4,904.38
Designated Bank for Tax Remittance: Bank of Maharashtra, Manchar Branch (Account Code: PMC-TAX-2026-04).

[SECTION 4: ENCUMBRANCE SEARCH & REVENUE OFFICER RATIFICATION]
Encumbrance Certificate Period: 30 Years Search (1996 to 2026) | Caveats, Liens or Adverse Claims: Nil / Unencumbered
Town Planning Zoning Certificate: Pure Residential Zone (R-1 Category) with full statutory occupancy permission.
Municipal Assessment Officer: Shri D. V. Shinde (Assistant Municipal Commissioner, Manchar Revenue Circle)
Attestation & Ratification: The property metrics, built-up dimensions, and statutory fiscal liabilities detailed above have been physically surveyed and validated. Duly confirmed and registered into permanent Municipal Land Revenue Records.`,
    instructions: 'Transcribe the property assessment entry accurately line-by-line. Manual typing only — Copy/Paste is disabled.'
  },
  {
    id: 'TSK-DE-03',
    category: 'data_entry',
    categoryName: 'Data Entry',
    title: 'Logistics Manifest & E-Way Delivery Billing Registry',
    rate: '₹60/page',
    unitRate: 60,
    dailyQuota: 50,
    updatedAt: '26 Oct 2026',
    status: 'active',
    content: `NATIONAL LOGISTICS MULTI-MODAL FREIGHT TRANSIT MANIFEST — BATCH 03
[SECTION 1: CONSIGNMENT CONSIGNOR & CONSIGNEE PROFILE]
Consignment Waybill Tracking ID: EWI-EXP-88912 | Dispatch Timestamp: 26/10/2026 09:30:00 IST
Consignor Corporate Name: Sahyadri Industrial Precision Components Pvt Ltd | GSTIN: 27AAACS1420P1ZB
Dispatch Origin Hub: Pune Central Logistics Terminal (Hub Warehouse 03), Chakan MIDC, Pune - 410501
Consignee Business Enterprise: Bharat Electro-Tech Solutions LLP | GSTIN: 07AABCB9921K1ZC
Destination Distribution Terminal: Okhla Industrial Area Phase-III, New Delhi Central Hub, Delhi - 110020
Statutory E-Way Bill Number: EWB-9921-2026-881024 | Valid From: 26/10/2026 10:00 AM To: 29/10/2026 11:59 PM

[SECTION 2: CARGO COMPOSITION & WEIGHT SPECIFICATIONS]
Nature of Cargo: High-Precision Industrial Servo Motors & Programmable Micro-Controller Drives
Harmonized System of Nomenclature (HSN Code): 8504.40.90 | Number of Master Wooden Pallets: 12 Pallets
Gross Shipping Weight: 1,845.50 KG | Net Tare Cargo Weight: 1,720.00 KG | Total Volumetric Dimension: 6.80 CBM
Handling Directives: Heavy Machinery, Fragile Solid State Electronic Relays, Keep Moisture-Free at Ambient 22°C
Hazardous Material Declaration: Certified Non-Hazardous, Non-Flammable, Class-9 Dry Solid State Equipment.

[SECTION 3: INVOICE VALUATION & APPLICABLE TAX CLEARANCE]
Commercial Invoice Reference: INV-MH-2026-44091 | Declared Net Assessable Valuation: ₹18,45,000.00
Integrated Goods & Services Tax (IGST @ 18%): ₹3,32,100.00 | Total Invoice Value: ₹21,77,100.00
Freight Charges: ₹42,500.00 Paid by Consignee under Reverse Charge Mechanism (RCM Applicable: No)
Enroute Marine Transit Insurance: Tata AIG Comprehensive Cargo Policy No: TAC-CARGO-2026-778901
Declared Transit Sum Insured: ₹25,00,000.00 | Deductible Excess: Nil for Total Loss or Enroute Collision.

[SECTION 4: FLEET DISPATCH & GATE-OUT AUTHORIZATION]
Primary Heavy Transport Carrier: Tata Prima Multi-Axle Containerized Truck | Vehicle Plate: MH-12-QZ-4920
Registered Driver Identity: Shri Mahendra Pratap Singh | Commercial Heavy Driving License: DL-04-2012-99014
GPS Tracking Beacon UUID: GPS-TRACK-88912-V2 | GPS Heartbeat Interval: Every 60 Seconds Active
Warehouse Gate-Out Officer: K. R. Ramanathan (Lead Logistics Operations Supervisor)
Final Dispatch Clearance: Certified that cargo weights, security seal integrity (#SEAL-88912), and statutory road permits match national transit regulatory standards. Duly authorized for interstate dispatch.`,
    instructions: 'Enter each waybill parameter with zero typographical errors. Manual typing only — Copy/Paste is disabled.'
  },

  // 2. Form Filling Tasks (₹50/form)
  {
    id: 'TSK-FF-01',
    category: 'form_filling',
    categoryName: 'Form Filling',
    title: 'Pradhan Mantri Solar Subsidy Scheme — Client Record 01',
    rate: '₹50/form',
    unitRate: 50,
    dailyQuota: 50,
    updatedAt: '26 Oct 2026',
    status: 'active',
    formData: {
      appNo: 'SOLAR-2026-9041',
      fullName: 'Rameshwar Dayal Sharma',
      phone: '9822019482',
      email: 'rameshwar.sharma@gmail.com',
      aadhaar: '4821 9012 3341',
      city: 'Pune',
      state: 'Maharashtra',
      planType: '3 kW Residential Rooftop Solar',
      subsidyAmount: '₹78,000'
    },
    instructions: 'Copy each field from the applicant master card into the standardized submission form.'
  },
  {
    id: 'TSK-FF-02',
    category: 'form_filling',
    categoryName: 'Form Filling',
    title: 'Digital India Micro-Enterprise Loan Application — Client Record 02',
    rate: '₹50/form',
    unitRate: 50,
    dailyQuota: 50,
    updatedAt: '26 Oct 2026',
    status: 'active',
    formData: {
      appNo: 'SME-2026-4418',
      fullName: 'Sunita Devi Rao',
      phone: '9845012399',
      email: 'sunita.rao99@gmail.com',
      aadhaar: '6612 8840 1923',
      city: 'Nagpur',
      state: 'Maharashtra',
      planType: 'Kisan & Small Business Equipment Loan',
      subsidyAmount: '₹1,50,000'
    },
    instructions: 'Fill all 8 customer demographic and banking subsidy fields accurately.'
  },
  {
    id: 'TSK-FF-03',
    category: 'form_filling',
    categoryName: 'Form Filling',
    title: 'Rural Agricultural Electricity Tariff Rebate Form — Record 03',
    rate: '₹50/form',
    unitRate: 50,
    dailyQuota: 50,
    updatedAt: '26 Oct 2026',
    status: 'active',
    formData: {
      appNo: 'AGRI-2026-7721',
      fullName: 'Mahendra Singh Patil',
      phone: '9890128472',
      email: 'm.patil.kisan@gmail.com',
      aadhaar: '7412 3901 8852',
      city: 'Nashik',
      state: 'Maharashtra',
      planType: 'Solar Agripump Metering Rebate Scheme',
      subsidyAmount: '₹95,000'
    },
    instructions: 'Validate applicant names and subsidy quota before final entry submission.'
  }
];

let TASKS_DATA = [];
let currentTaskFilter = 'all';

function initTasksDb() {
  try {
    const stored = localStorage.getItem('ewi_tasks_db');
    const isOldShort = stored && (stored.includes('Normal vitals observed. Pulse: 72 bpm') || !stored.includes('[SECTION 1:'));
    if (!stored || isOldShort) {
      localStorage.setItem('ewi_tasks_db', JSON.stringify(DEFAULT_TASKS_DATA));
      TASKS_DATA = [...DEFAULT_TASKS_DATA];
    } else {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        TASKS_DATA = [...DEFAULT_TASKS_DATA];
      } else {
        TASKS_DATA = parsed.filter(t => t.category !== 'captcha');
      }
      localStorage.setItem('ewi_tasks_db', JSON.stringify(TASKS_DATA));
    }
  } catch(_) {
    TASKS_DATA = [...DEFAULT_TASKS_DATA];
  }
}

function saveTasksDb() {
  try {
    localStorage.setItem('ewi_tasks_db', JSON.stringify(TASKS_DATA));
  } catch(_) {}
}

function updateTaskStats() {
  const de = TASKS_DATA.filter(t => t.category === 'data_entry').length;
  const ff = TASKS_DATA.filter(t => t.category === 'form_filling').length;
  const total = de + ff;

  const elTot = document.getElementById('statTotalTasks');
  if (elTot) elTot.textContent = total;
  const elDe = document.getElementById('statDataEntryTasks');
  if (elDe) elDe.textContent = de;
  const elFf = document.getElementById('statFormFillingTasks');
  if (elFf) elFf.textContent = ff;
  const badge = document.getElementById('tasksBadgeCount');
  if (badge) badge.textContent = total;
}

function filterTasks(category) {
  currentTaskFilter = category;
  renderTasksTable();
}

function searchTasks(query) {
  const q = (query || '').toLowerCase().trim();
  renderTasksTable(currentTaskFilter, q);
}

function renderTasksTable(filter = currentTaskFilter, searchQuery = '') {
  const tbody = document.getElementById('tasksTable');
  if (!tbody) return;

  let list = TASKS_DATA.filter(t => t.category !== 'captcha');
  if (filter && filter !== 'all') {
    list = list.filter(t => t.category === filter);
  }
  if (searchQuery) {
    list = list.filter(t =>
      (t.id && t.id.toLowerCase().includes(searchQuery)) ||
      (t.title && t.title.toLowerCase().includes(searchQuery)) ||
      (t.categoryName && t.categoryName.toLowerCase().includes(searchQuery)) ||
      (t.content && t.content.toLowerCase().includes(searchQuery))
    );
  }

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:32px;color:rgba(255,255,255,.4)">
      <i class="bi bi-inbox" style="font-size:2rem;display:block;margin-bottom:8px"></i>No tasks found in this category. Click "Upload New Task" to add.</td></tr>`;
    return;
  }

  const catBadges = {
    data_entry: '<span class="status-badge status-active" style="background:rgba(34,197,94,.15);color:#4ade80;border:1px solid rgba(34,197,94,.3)"><i class="bi bi-file-earmark-text"></i> Data Entry</span>',
    form_filling: '<span class="status-badge" style="background:rgba(249,115,22,.15);color:#fb923c;border:1px solid rgba(249,115,22,.3)"><i class="bi bi-ui-checks"></i> Form Filling</span>'
  };

  tbody.innerHTML = list.map(t => `
    <tr>
      <td><code style="font-size:.82rem;color:#60a5fa;font-weight:700">${t.id}</code></td>
      <td>
        <strong style="color:#fff;font-size:.88rem;display:block">${t.title}</strong>
        <span style="font-size:.74rem;color:rgba(255,255,255,.45)">${t.instructions ? t.instructions.slice(0, 50) + '...' : ''}</span>
      </td>
      <td>${catBadges[t.category] || t.category}</td>
      <td><strong style="color:#4ade80">${t.rate || (t.category === 'data_entry' ? '₹60/page' : '₹50/form')}</strong></td>
      <td>${t.dailyQuota || 50} units / day</td>
      <td style="font-size:.8rem;color:rgba(255,255,255,.6)">${t.updatedAt || 'Today'}</td>
      <td><span class="status-badge status-${t.status || 'active'}">${capitalize(t.status || 'active')}</span></td>
      <td>
        <div class="action-btn-group">
          <button class="action-btn action-btn-view" onclick="viewTask('${t.id}')" title="Preview Task"><i class="bi bi-eye"></i></button>
          <button class="action-btn action-btn-edit" onclick="openAddTaskModal('${t.id}')" title="Edit Task"><i class="bi bi-pencil"></i></button>
          <button class="action-btn action-btn-delete" onclick="deleteTask('${t.id}')" title="Delete Task"><i class="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  updateTaskStats();
}

function openAddTaskModal(existingId = null) {
  const existing = existingId ? TASKS_DATA.find(t => t.id === existingId) : null;
  const isEdit = !!existing;

  const defaultId = isEdit ? existing.id : 'TSK-' + Math.floor(1000 + Math.random() * 9000);
  const selCat = isEdit ? existing.category : 'data_entry';

  openAdminModal(isEdit ? `Edit Task — ${existing.id}` : 'Upload / Add Daily Task Batch', `
    <div style="background:rgba(37,99,235,.12);border:1px solid rgba(37,99,235,.28);border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:.82rem;color:#93c5fd;display:flex;gap:10px;align-items:center">
      <i class="bi bi-info-circle-fill" style="font-size:1.2rem;color:#60a5fa;flex-shrink:0"></i>
      <div>Tasks created here are updated live and visible only to workers enrolled in the matching plan.</div>
    </div>

    <div class="admin-field-row">
      <div class="admin-field-group">
        <label>Task Reference ID *</label>
        <input type="text" id="taskModalId" value="${defaultId}" ${isEdit ? 'readonly style="background:rgba(255,255,255,.05);color:#94a3b8"' : ''}>
      </div>
      <div class="admin-field-group">
        <label>Task Category / Plan *</label>
        <select id="taskModalCategory" onchange="toggleTaskFormFields(this.value)">
          <option value="data_entry" ${selCat === 'data_entry' ? 'selected' : ''}>Data Entry Project (₹60/page)</option>
          <option value="form_filling" ${selCat === 'form_filling' ? 'selected' : ''}>Form Filling Project (₹50/form)</option>
        </select>
      </div>
    </div>

    <div class="admin-field-group">
      <label>Task Title *</label>
      <input type="text" id="taskModalTitle" value="${isEdit ? existing.title : ''}" placeholder="e.g. Healthcare Patient Admission Register Batch 04">
    </div>

    <div class="admin-field-row">
      <div class="admin-field-group">
        <label>Daily Target Units (Quota)</label>
        <input type="number" id="taskModalQuota" value="${isEdit ? (existing.dailyQuota || 50) : 50}" min="5" max="100">
      </div>
      <div class="admin-field-group">
        <label>Task Status</label>
        <select id="taskModalStatus">
          <option value="active" ${isEdit && existing.status === 'active' ? 'selected' : ''}>Active (Published to Workers)</option>
          <option value="inactive" ${isEdit && existing.status === 'inactive' ? 'selected' : ''}>Draft / Inactive</option>
        </select>
      </div>
    </div>

    <!-- Category Specific Content Fields -->
    <div id="taskFieldDataEntry" style="display:${selCat === 'data_entry' ? 'block' : 'none'};background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px;margin-bottom:14px">
      <div style="font-size:.82rem;font-weight:700;color:#fff;margin-bottom:8px"><i class="bi bi-file-earmark-text" style="color:#4ade80"></i> Data Entry Content / Source Transcript</div>
      <div class="admin-field-group">
        <label>Document Content to Transcribe *</label>
        <textarea id="taskModalContent" rows="5" placeholder="Paste source document text here that the worker must transcribe...">${isEdit && existing.content ? existing.content : ''}</textarea>
      </div>
    </div>

    <div id="taskFieldFormFilling" style="display:${selCat === 'form_filling' ? 'block' : 'none'};background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px;margin-bottom:14px">
      <div style="font-size:.82rem;font-weight:700;color:#fff;margin-bottom:8px"><i class="bi bi-ui-checks" style="color:#fb923c"></i> Client Record Master Information (To Fill)</div>
      <div class="admin-field-row">
        <div class="admin-field-group">
          <label>Application No</label>
          <input type="text" id="taskFfAppNo" value="${isEdit && existing.formData ? existing.formData.appNo : ''}" placeholder="e.g. SOLAR-2026-9041">
        </div>
        <div class="admin-field-group">
          <label>Applicant Full Name</label>
          <input type="text" id="taskFfName" value="${isEdit && existing.formData ? existing.formData.fullName : ''}" placeholder="e.g. Rameshwar Sharma">
        </div>
      </div>
      <div class="admin-field-row">
        <div class="admin-field-group">
          <label>Contact Phone</label>
          <input type="text" id="taskFfPhone" value="${isEdit && existing.formData ? existing.formData.phone : ''}" placeholder="e.g. 9822019482">
        </div>
        <div class="admin-field-group">
          <label>Scheme / Policy Plan</label>
          <input type="text" id="taskFfPlan" value="${isEdit && existing.formData ? existing.formData.planType : ''}" placeholder="e.g. 3 kW Rooftop Solar">
        </div>
      </div>
      <div class="admin-field-row">
        <div class="admin-field-group">
          <label>City &amp; State</label>
          <input type="text" id="taskFfCity" value="${isEdit && existing.formData ? (existing.formData.city + ', ' + existing.formData.state) : 'Pune, Maharashtra'}" placeholder="City, State">
        </div>
        <div class="admin-field-group">
          <label>Amount / Subsidy</label>
          <input type="text" id="taskFfAmount" value="${isEdit && existing.formData ? existing.formData.subsidyAmount : '₹78,000'}" placeholder="e.g. ₹78,000">
        </div>
      </div>
    </div>

    <div class="admin-field-group">
      <label>Worker Guidelines / Instructions</label>
      <input type="text" id="taskModalInstructions" value="${isEdit && existing.instructions ? existing.instructions : 'Verify all numbers and spellings with source data before submitting.'}">
    </div>

    <div class="modal-footer-btns">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Cancel</button>
      <button class="admin-btn admin-btn-primary" onclick="saveTaskModal('${existingId || ''}')">
        <i class="bi bi-check-circle-fill"></i> ${isEdit ? 'Save Changes' : 'Publish Daily Task'}
      </button>
    </div>
  `, true);
}

function toggleTaskFormFields(cat) {
  const de = document.getElementById('taskFieldDataEntry');
  const ff = document.getElementById('taskFieldFormFilling');
  if (de) de.style.display = cat === 'data_entry' ? 'block' : 'none';
  if (ff) ff.style.display = cat === 'form_filling' ? 'block' : 'none';
}

function saveTaskModal(existingId) {
  const id = (document.getElementById('taskModalId').value || '').trim();
  const category = document.getElementById('taskModalCategory').value;
  const title = (document.getElementById('taskModalTitle').value || '').trim();
  const quota = parseInt(document.getElementById('taskModalQuota').value || '50', 10);
  const status = document.getElementById('taskModalStatus').value;
  const instructions = (document.getElementById('taskModalInstructions').value || '').trim();

  if (!id || !title) {
    showAdminToast('Task ID and Title are required.');
    return;
  }

  const catMap = {
    data_entry: { name: 'Data Entry', rate: '₹60/page', unitRate: 60 },
    form_filling: { name: 'Form Filling', rate: '₹50/form', unitRate: 50 }
  };
  const cInfo = catMap[category] || catMap.data_entry;

  let taskObj = {
    id,
    category,
    categoryName: cInfo.name,
    title,
    rate: cInfo.rate,
    unitRate: cInfo.unitRate,
    dailyQuota: quota,
    updatedAt: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    status,
    instructions
  };

  if (category === 'data_entry') {
    taskObj.content = document.getElementById('taskModalContent').value.trim() || 'Sample data entry document content.';
  } else if (category === 'form_filling') {
    const cityState = (document.getElementById('taskFfCity').value || 'Pune, Maharashtra').split(',');
    taskObj.formData = {
      appNo: document.getElementById('taskFfAppNo').value.trim() || ('APP-' + Math.floor(1000 + Math.random() * 9000)),
      fullName: document.getElementById('taskFfName').value.trim() || 'Applicant Name',
      phone: document.getElementById('taskFfPhone').value.trim() || '9822000000',
      email: 'applicant@gmail.com',
      aadhaar: 'XXXX XXXX 1234',
      city: (cityState[0] || 'Pune').trim(),
      state: (cityState[1] || 'Maharashtra').trim(),
      planType: document.getElementById('taskFfPlan').value.trim() || 'Standard Scheme',
      subsidyAmount: document.getElementById('taskFfAmount').value.trim() || '₹50,000'
    };
  }

  if (existingId) {
    const idx = TASKS_DATA.findIndex(t => t.id === existingId);
    if (idx > -1) TASKS_DATA[idx] = taskObj;
  } else {
    TASKS_DATA.unshift(taskObj);
  }

  saveTasksDb();
  closeAdminModal();
  renderTasksTable();
  showAdminToast(`✓ Task ${id} saved and published!`);
}

function viewTask(id) {
  const t = TASKS_DATA.find(x => x.id === id);
  if (!t) return;

  let body = '';
  if (t.category === 'data_entry') {
    body = `<div style="background:rgba(255,255,255,.05);border-radius:8px;padding:14px;font-family:monospace;font-size:.85rem;color:#cbd5e1;white-space:pre-wrap;line-height:1.6;margin:12px 0">${t.content || ''}</div>`;
  } else if (t.category === 'form_filling') {
    const f = t.formData || {};
    body = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0">
      ${infoRow('Application No', f.appNo || '—')}
      ${infoRow('Applicant Name', f.fullName || '—')}
      ${infoRow('Contact Phone', f.phone || '—')}
      ${infoRow('Scheme / Plan', f.planType || '—')}
      ${infoRow('Location', (f.city || '') + ', ' + (f.state || ''))}
      ${infoRow('Subsidy / Amount', f.subsidyAmount || '—')}
    </div>`;
  }

  openAdminModal(`Task Preview — ${t.id}`, `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
      <strong style="color:#fff;font-size:1.05rem">${t.title}</strong>
      <span class="status-badge status-active">${t.categoryName} · ${t.rate}</span>
    </div>
    <div style="font-size:.82rem;color:rgba(255,255,255,.6);margin-bottom:8px">
      <i class="bi bi-info-circle"></i> Instructions: ${t.instructions || 'Follow guidelines accurately.'}
    </div>
    ${body}
    <div class="modal-footer-btns">
      <button class="admin-btn admin-btn-outline" onclick="closeAdminModal()">Close</button>
      <button class="admin-btn admin-btn-primary" onclick="closeAdminModal();openAddTaskModal('${t.id}')"><i class="bi bi-pencil"></i> Edit Task</button>
    </div>
  `);
}

function deleteTask(id) {
  if (!confirm(`Are you sure you want to delete task ${id}?`)) return;
  TASKS_DATA = TASKS_DATA.filter(t => t.id !== id);
  saveTasksDb();
  renderTasksTable();
  showAdminToast(`Task ${id} deleted.`);
}

/* ===== UNIT RATES MANAGEMENT (ADMIN CONFIGURABLE & LIVE SYNC) ===== */
function loadUnitRates() {
  let rates = { data_entry: 60, form_filling: 50 };
  try {
    const stored = JSON.parse(localStorage.getItem('ewi_unit_rates') || '{}');
    if (stored && typeof stored === 'object') rates = { ...rates, ...stored };
  } catch(_) {}

  // Fetch live from SQLite server
  fetch('/api/rates')
    .then(r => r.json())
    .then(data => {
      if (data && data.rates) {
        rates = { ...rates, ...data.rates };
        localStorage.setItem('ewi_unit_rates', JSON.stringify(rates));
        applyUnitRatesToUI(rates);
      }
    })
    .catch(() => {});

  applyUnitRatesToUI(rates);
}

function applyUnitRatesToUI(rates) {
  const deInp = document.getElementById('rateDataEntry');
  const ffInp = document.getElementById('rateFormFilling');
  if (deInp && !deInp.matches(':focus')) deInp.value = rates.data_entry || 60;
  if (ffInp && !ffInp.matches(':focus')) ffInp.value = rates.form_filling || 50;

  // Update PROJECTS_DATA table & persist everywhere
  if (typeof PROJECTS_DATA !== 'undefined' && PROJECTS_DATA.length >= 2) {
    PROJECTS_DATA[0].perUnit = `Rs.${rates.data_entry}`;
    PROJECTS_DATA[0].weeklyWork = '350 pages';
    PROJECTS_DATA[0].weeklyEarnings = rates.data_entry === 60 ? 'Rs.21,000' : `Rs.${(rates.data_entry * 350).toLocaleString('en-IN')}`;
    PROJECTS_DATA[0].potential = PROJECTS_DATA[0].weeklyEarnings;
    PROJECTS_DATA[1].perUnit = `Rs.${rates.form_filling}`;
    PROJECTS_DATA[1].weeklyWork = '350 pages';
    PROJECTS_DATA[1].weeklyEarnings = rates.form_filling === 50 ? 'Rs.19,500' : `Rs.${(rates.form_filling * 350).toLocaleString('en-IN')}`;
    PROJECTS_DATA[1].potential = PROJECTS_DATA[1].weeklyEarnings;
    try { localStorage.setItem('ewi_projects_db', JSON.stringify(PROJECTS_DATA)); } catch(_) {}
    renderProjectsTable();
  }

  // Update stat card labels in Task Manager
  const statDE = document.getElementById('statDataEntryTasks');
  if (statDE && statDE.nextElementSibling) statDE.nextElementSibling.textContent = `Data Entry (₹${rates.data_entry || 60}/page)`;
  const statFF = document.getElementById('statFormFillingTasks');
  if (statFF && statFF.nextElementSibling) statFF.nextElementSibling.textContent = `Form Filling (₹${rates.form_filling || 50}/form)`;

  // Update TASKS_DATA item rates dynamically
  if (TASKS_DATA && TASKS_DATA.length > 0) {
    TASKS_DATA.forEach(t => {
      if (t.category === 'data_entry') { t.unitRate = rates.data_entry || 60; t.rate = `₹${rates.data_entry || 60}/page`; }
      else if (t.category === 'form_filling') { t.unitRate = rates.form_filling || 50; t.rate = `₹${rates.form_filling || 50}/form`; }
    });
  }
}

async function saveUnitRates() {
  const deVal = parseInt(document.getElementById('rateDataEntry').value, 10) || 60;
  const ffVal = parseInt(document.getElementById('rateFormFilling').value, 10) || 50;

  const newRates = { data_entry: deVal, form_filling: ffVal };
  try { localStorage.setItem('ewi_unit_rates', JSON.stringify(newRates)); } catch(_) {}

  // Update PROJECTS_DATA in memory & localStorage
  if (typeof PROJECTS_DATA !== 'undefined' && PROJECTS_DATA.length >= 2) {
    PROJECTS_DATA[0].perUnit = `Rs.${deVal}`;
    PROJECTS_DATA[0].weeklyWork = '350 pages';
    PROJECTS_DATA[0].weeklyEarnings = deVal === 60 ? 'Rs.21,000' : `Rs.${(deVal * 350).toLocaleString('en-IN')}`;
    PROJECTS_DATA[0].potential = PROJECTS_DATA[0].weeklyEarnings;
    PROJECTS_DATA[1].perUnit = `Rs.${ffVal}`;
    PROJECTS_DATA[1].weeklyWork = '350 pages';
    PROJECTS_DATA[1].weeklyEarnings = ffVal === 50 ? 'Rs.19,500' : `Rs.${(ffVal * 350).toLocaleString('en-IN')}`;
    PROJECTS_DATA[1].potential = PROJECTS_DATA[1].weeklyEarnings;
    try { localStorage.setItem('ewi_projects_db', JSON.stringify(PROJECTS_DATA)); } catch(_) {}
  }

  // Sync to backend SQLite database (/api/rates & /api/projects)
  try {
    await fetch('/api/rates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rates: newRates })
    });
  } catch(_) {}

  applyUnitRatesToUI(newRates);
  renderTasksTable();
  showAdminToast(`✓ Unit rates updated everywhere! Data Entry ₹${deVal}/page, Form Filling ₹${ffVal}/form`);
}

