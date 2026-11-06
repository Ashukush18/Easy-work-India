/* =============================================
   EASY WORK INDIA — app.js (Landing Page)
   ============================================= */

// Purge obsolete cache from previous versions (e.g. 30 Pages, Rs.1,500, or captcha)
(function purgeLegacyProjectCache() {
  try {
    const cachedProj = JSON.parse(localStorage.getItem('ewi_projects_db') || 'null');
    if (Array.isArray(cachedProj)) {
      const isObsolete = cachedProj.some(p => 
        p.key === 'captcha' || 
        p.daily === '30 Pages' || 
        p.daily === '30 Captchas' || 
        p.potential === 'Rs.1,500' || 
        p.potential === '\u20B91,500' || 
        !p.weeklyWork || 
        !p.weeklyEarnings ||
        (p.key === 'data_entry' && p.perUnit === 'Rs.50')
      );
      if (isObsolete) {
        localStorage.removeItem('ewi_projects_db');
      }
    }
    const cachedRates = JSON.parse(localStorage.getItem('ewi_unit_rates') || 'null');
    if (cachedRates && (cachedRates.captcha || cachedRates.data_entry !== 60 || cachedRates.form_filling !== 50)) {
      localStorage.setItem('ewi_unit_rates', JSON.stringify({ data_entry: 60, form_filling: 50 }));
    }
  } catch(_) {}
})();

/* ===== REVIEWS DATA — Dynamic Pool (shuffled on every page load) ===== */
const REVIEW_POOL = [
  { text: "My sister introduced me to this work-from-home opportunity and it has been a wonderful experience. I manage my daily routine while earning from home every week.", name: "Ananya Sharma", role: "Data Entry · Mumbai", stars: 5 },
  { text: "I was looking for a flexible way to earn from home, and this opportunity matched my expectations. The work is straightforward and I am satisfied with my earnings.", name: "Rohit Verma", role: "Form Filling · Delhi", stars: 5 },
  { text: "I joined this platform 3 months ago and have been very happy with the consistent income. The daily work keeps me busy and the salary is always on time every week.", name: "Sneha Patil", role: "Form Filling · Pune", stars: 4 },
  { text: "Excellent platform for work from home. The admin support is very helpful. Payments are always on time. I have referred many of my friends and they are all earning too.", name: "Vikram Mehta", role: "Data Entry · Bangalore", stars: 5 },
  { text: "I was skeptical at first, but after receiving my first payment I became a regular worker. The tasks are simple and anyone can do them from home with just a smartphone.", name: "Pooja Nair", role: "Data Entry · Chennai", stars: 4 },
  { text: "Best work from home experience ever. No pressure, no target, no time limit. I work whenever I want and still earn a decent amount every single week.", name: "Suresh Iyer", role: "Form Filling · Hyderabad", stars: 5 },
  { text: "The registration process is simple and the admin confirms everything quickly. I started earning within 2 days of joining. Highly recommended for homemakers.", name: "Meena Kumari", role: "Data Entry · Jaipur", stars: 5 },
  { text: "Very genuine platform. I complete my forms in the morning before my kids wake up and the salary comes every week without fail. Very trustworthy.", name: "Kavita Rani", role: "Form Filling · Lucknow", stars: 5 },
  { text: "I lost my job last year and was struggling. A friend told me about Easy Work India and now I earn over \u20B920,000 per week sitting at home. Life changer!", name: "Rajesh Kumar", role: "Data Entry · Bhopal", stars: 5 },
  { text: "Simple work, good pay. I do data entry in my free time and earn a nice weekly salary. The admin is very responsive and helps with any issues quickly.", name: "Priya Gupta", role: "Data Entry · Ahmedabad", stars: 4 },
  { text: "I am a housewife and this platform has helped me earn independently. The form filling task is very easy and the payment is always credited on time every week.", name: "Sunita Devi", role: "Form Filling · Nagpur", stars: 5 },
  { text: "No office, no boss, no fixed time. I work according to my convenience and earn weekly salary. This is the best part-time work I have ever done.", name: "Amit Tiwari", role: "Data Entry · Kanpur", stars: 4 },
  { text: "Started with data entry just to try and now it is my primary income. Very reliable platform. Admin always responds fast and payment is never delayed.", name: "Deepa Reddy", role: "Data Entry · Vizag", stars: 5 },
  { text: "I am a student and I do form filling tasks in the evening. It covers my monthly expenses easily. Very flexible and rewarding platform.", name: "Neha Singh", role: "Form Filling · Chandigarh", stars: 4 },
  { text: "My husband suggested this and now both of us are earning from home. The per-form rate is good and weekly payout is very satisfying.", name: "Lalita Patel", role: "Form Filling · Surat", stars: 5 },
  { text: "Joined 6 weeks ago and have already earned more than my previous part-time salary. Tasks are clear and the support team is always available.", name: "Harish Nair", role: "Data Entry · Kochi", stars: 5 },
  { text: "Easy to understand work, no skills required. I complete my daily quota in just 2-3 hours and the rest of the day is mine. Perfect for retired persons.", name: "Mohan Lal", role: "Data Entry · Agra", stars: 4 },
  { text: "I have been working here for 2 months and never faced any payment issue. Everything is transparent and the admin team is very professional.", name: "Geeta Mishra", role: "Form Filling · Varanasi", stars: 5 },
  { text: "Best decision I made this year. Work from home, no target pressure, weekly salary directly in my bank. What more can you ask for!", name: "Sunil Yadav", role: "Data Entry · Patna", stars: 5 },
  { text: "A trustworthy platform. I was worried initially but after receiving my first payout I was completely satisfied. Recommend to everyone looking for genuine online work.", name: "Rekha Joshi", role: "Form Filling · Indore", stars: 4 },
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Generate a fresh shuffled set of 7 reviews on every page load
let REVIEWS = shuffleArray(REVIEW_POOL).slice(0, 7);

/* ===== DYNAMIC PAYOUTS SYSTEM (LIVE AUTOMATIC UPDATES) ===== */
const WORKER_POOL = [
  { name: "Priya S.", city: "Mumbai" },
  { name: "Ravi K.", city: "Delhi" },
  { name: "Anjali G.", city: "Nagpur" },
  { name: "Amit P.", city: "Ahmedabad" },
  { name: "Kavita S.", city: "Lucknow" },
  { name: "Meena J.", city: "Jaipur" },
  { name: "Deepak Y.", city: "Indore" },
  { name: "Sunita D.", city: "Pune" },
  { name: "Rajeshwar M.", city: "Bhopal" },
  { name: "Pooja V.", city: "Thane" },
  { name: "Suresh N.", city: "Kochi" },
  { name: "Neha G.", city: "Chandigarh" },
  { name: "Vikram S.", city: "Bangalore" },
  { name: "Sneha P.", city: "Nashik" },
  { name: "Manoj T.", city: "Kanpur" },
  { name: "Deepa R.", city: "Surat" },
  { name: "Harish C.", city: "Patna" },
  { name: "Sunil B.", city: "Vadodara" },
  { name: "Aarti M.", city: "Hyderabad" },
  { name: "Dinesh K.", city: "Agra" }
];

const PAYOUT_METHODS = [
  "UPI / PhonePe",
  "Bank Transfer (IMPS)",
  "Paytm Wallet",
  "Google Pay / UPI",
  "Bank Transfer (NEFT)"
];

const PAYOUT_AMOUNTS = [20000, 21000, 22000, 22500, 23000, 24000, 24500, 25000, 26000, 27000, 27500, 28000, 29000, 29500, 30000];

function formatDynamicDate(offsetMinutes = 0) {
  const d = new Date(Date.now() - (offsetMinutes * 60 * 1000));
  const now = new Date();

  const isToday = (d.toDateString() === now.toDateString());
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = (d.toDateString() === yesterday.toDateString());

  const timeStr = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  if (isToday) {
    if (offsetMinutes <= 2) return `Just now (${timeStr})`;
    if (offsetMinutes < 60) return `Today, ${timeStr} (${offsetMinutes}m ago)`;
    return `Today, ${timeStr}`;
  }
  if (isYesterday) {
    return `Yesterday, ${timeStr}`;
  }
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + `, ${timeStr}`;
}

let LIVE_PAYOUTS = [
  { name: "Priya S.", city: "Mumbai", amount: "\u20B922,500", method: "Bank Transfer", project: "Data Entry", offsetMin: 4 },
  { name: "Ravi K.", city: "Delhi", amount: "\u20B928,000", method: "Paytm", project: "Form Filling", offsetMin: 18 },
  { name: "Anjali G.", city: "Nagpur", amount: "\u20B921,000", method: "UPI", project: "Data Entry", offsetMin: 45 },
  { name: "Amit P.", city: "Ahmedabad", amount: "\u20B925,500", method: "Bank Transfer", project: "Form Filling", offsetMin: 120 },
  { name: "Kavita S.", city: "Lucknow", amount: "\u20B929,500", method: "UPI / PhonePe", project: "Data Entry", offsetMin: 280 },
  { name: "Meena J.", city: "Jaipur", amount: "\u20B920,000", method: "Paytm", project: "Form Filling", offsetMin: 540 },
  { name: "Deepak Y.", city: "Indore", amount: "\u20B924,000", method: "Bank Transfer", project: "Data Entry", offsetMin: 1440 },
  { name: "Sunita D.", city: "Pune", amount: "\u20B927,000", method: "UPI", project: "Form Filling", offsetMin: 2880 }
];

/* ===== DOM HELPERS ===== */
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* ===== TOAST ===== */
let toastTimer;
function showToast(msg) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

/* ===== SECURITY / CRYPTO HELPERS ===== */
async function hashWithSalt(password, salt) {
  try {
    const enc = new TextEncoder();
    const data = enc.encode(salt + ':' + password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (err) {
    // Fallback simple hash for older environments
    let hash = 0;
    const str = salt + ':' + password;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return 'fb_' + Math.abs(hash).toString(16);
  }
}

/* ===== MODAL ===== */
function openModal(type) {
  const overlay = $('#modalOverlay');
  const content = $('#modalContent');
  if (!overlay || !content) return;
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  content.innerHTML = '';

  // All public requests lead to Sign In
  content.innerHTML = `
    <h2 id="modalTitle">Sign In to Your Account</h2>
    <p class="modal-intro">Enter your credentials to access your account dashboard.</p>

    <form id="loginForm" novalidate>
      <label class="form-field">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <span>Phone Number / User ID *</span>
        </div>
        <input type="text" name="userId" id="loginUserIdInput" inputmode="text" placeholder="Enter Mobile Number or User ID" required autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false">
      </label>
      <label class="form-field">
        <span>Password *</span>
        <div style="position:relative">
          <input type="password" name="password" id="loginPassInput" placeholder="Enter your password" required autocomplete="current-password" minlength="4" style="padding-right:44px">
          <button type="button" id="toggleLoginPass" aria-label="Toggle password visibility" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;color:#64748b;cursor:pointer;padding:6px;font-size:1.1rem;display:flex;align-items:center">
            <i class="bi bi-eye"></i>
          </button>
        </div>
      </label>
      <button class="btn btn-primary form-submit" type="submit" id="loginSubmitBtn">
        <i class="bi bi-box-arrow-in-right"></i> Sign In
      </button>

      <div style="margin-top:16px;padding-top:14px;border-top:1px solid #e2e8f0;font-size:.82rem;color:var(--text-muted);line-height:1.6;text-align:center">
        <span>Need an account or forgot password? Contact your Administrator to get your authorized User ID &amp; Password.</span>
      </div>
    </form>`;

  // Password visibility toggle
  const toggleBtn = $('#toggleLoginPass', content);
  const passInp   = $('#loginPassInput', content);
  if (toggleBtn && passInp) {
    toggleBtn.addEventListener('click', () => {
      const isPass = passInp.type === 'password';
      passInp.type = isPass ? 'text' : 'password';
      toggleBtn.innerHTML = isPass ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>';
    });
  }

  // ── Login form handler ──
  const loginForm = $('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const data     = new FormData(loginForm);
      const rawUser  = (data.get('userId') || data.get('phone') || '').trim();
      const phone    = rawUser.replace(/\s/g, '');
      const password = (data.get('password') || '').trim();

      if (!phone)    { showToast('Please enter your phone number, User ID, or admin.'); return; }
      if (!password) { showToast('Please enter your password.'); return; }

      // ── Admin credentials check → redirect directly to admin panel ──
      if ((phone === '9876543210' || phone.toLowerCase() === 'admin') && password === 'Work2026') {
        closeModal();
        showToast('Admin access verified! Opening Admin Panel...');
        try { sessionStorage.setItem('ewi_admin_logged_in', 'true'); } catch(_) {}
        setTimeout(() => { window.location.replace('admin.html'); }, 500);
        return;
      }

      // ── 1. Server-first SQLite Authentication (enables instant cross-device Android + Web login) ──
      try {
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: rawUser,
            phone: phone,
            password: password
          })
        });

        if (loginRes.ok) {
          const authData = await loginRes.json();
          if (authData.ok && authData.user) {
            const u = authData.user;
            const profile = {
              id: u.id,
              name: u.name,
              phone: u.phone,
              email: u.email || '',
              username: u.username || rawUser,
              userId: u.username || rawUser,
              projectKey: u.projectKey || 'data_entry',
              project: u.projectKey || (u.project ? u.project.toLowerCase().replace(/\s/g, '_') : 'data_entry'),
              earnings: u.earnings || '\u20B90',
              status: u.status || 'active',
              accountStatus: u.accountStatus || 'Active',
              joined: u.joined || 'Active',
              aadhaar: u.aadhaar || '',
              aadhaarFile: u.aadhaarFile || null,
              signatureData: u.signatureData || null,
              address: u.address || '',
              avatarSrc: u.photoUrl || null,
              photoUrl: u.photoUrl || null,
              walletBalance: u.walletBalance || '\u20B90',
              walletHistory: u.walletHistory || [],
              kycStatus: u.kycStatus || 'pending',
              withdrawalEnabled: Boolean(u.withdrawalEnabled),
              taskCompleted: Boolean(u.taskCompleted),
              weeklyTasksDone: u.weeklyTasksDone || 0,
              autoTaskComplete: Boolean(u.autoTaskComplete),
              premiumActive: Boolean(u.premiumActive),
              withdrawalDetails: u.withdrawalDetails || null
            };

            const verify = {
              aadhaar: {
                status: 'approved',
                num: u.aadhaar || '',
                name: u.name,
                file: u.aadhaarFile || null,
                approvedAt: new Date().toISOString()
              },
              sig: {
                status: 'approved',
                data: u.signatureData || null,
                approvedAt: new Date().toISOString()
              }
            };

            try {
              localStorage.setItem('ewi_user_profile', JSON.stringify(profile));
              localStorage.setItem('ewi_user_verify', JSON.stringify(verify));
              sessionStorage.setItem('ewi_user_logged_in', u.username || u.phone || rawUser);
              sessionStorage.setItem('ewi_login_id', rawUser);
              sessionStorage.setItem('ewi_login_pass', password);
            } catch(_) {}

            closeModal();
            showToast('Welcome back, ' + u.name + '! Redirecting to dashboard...');
            setTimeout(() => { window.location.replace('account.html'); }, 600);
            return;
          }
        } else if (loginRes.status === 401 || loginRes.status === 403) {
          const errData = await loginRes.json().catch(() => ({}));
          showToast(errData.error || 'Invalid credentials. Please contact Admin.');
          return;
        }
      } catch (netErr) {
        // Fallback to local storage if server is unreachable
      }

      // ── 2. Universal Cross-Device Cloud Sync & Local Storage Fallback ──
      let user = null;
      if (window.EWI_CloudSync) {
        user = await window.EWI_CloudSync.findUser(rawUser);
      }

      if (!user) {
        let usersDb = [];
        try { usersDb = JSON.parse(localStorage.getItem('ewi_users_db') || '[]'); } catch(_) {}
        const inputLower = phone.toLowerCase();
        user = usersDb.find(u => {
          const uPhone    = (u.phone    || '').replace(/\s/g, '');
          const uId       = (u.userId   || '').toString().trim().toLowerCase();
          const uUsername = (u.username || '').toLowerCase();
          return uPhone === phone || uId === inputLower || uUsername === inputLower;
        });
      }

      if (user) {
        // ── Account disabled check ──
        if (user.status === 'disabled' || user.status === 'inactive') {
          showToast('⛔ This account has been deactivated by administration. Please contact Admin.');
          return;
        }

        // Verify password
        const cleanPass = password.trim();
        let isValid = false;
        if (user.plainPassword) {
          isValid = (user.plainPassword === cleanPass);
        } else if (user.plain_password) {
          isValid = (user.plain_password === cleanPass);
        } else if (user.password) {
          isValid = (user.password === cleanPass);
        } else if (user.passwordHash && user.passwordSalt) {
          const testHash = await hashWithSalt(cleanPass, user.passwordSalt);
          isValid = (testHash === user.passwordHash);
        }

        if (isValid) {
          // Prepare active profile for account.html
          const profile = {
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email || '',
            username: user.username || user.userId || (user.name || 'user').toLowerCase().replace(/\s/g, '_'),
            userId: user.userId || user.username,
            projectKey: user.projectKey || 'data_entry',
            project: user.projectKey || (user.project ? user.project.toLowerCase().replace(/\s/g, '_') : 'data_entry'),
            earnings: user.earnings || '\u20B90',
            status: user.status || 'active',
            accountStatus: user.accountStatus || 'Active',
            joined: user.joined || 'Active',
            aadhaar: user.aadhaar || '',
            aadhaarFile: user.aadhaarFile || null,
            signatureData: user.signatureData || null,
            address: user.address || '',
            avatarSrc: user.photoUrl || user.photo_url || null,
            photoUrl: user.photoUrl || user.photo_url || null,
            walletBalance: user.walletBalance || user.wallet_balance || localStorage.getItem('ewi_wallet_balance_' + (user.username || user.phone)) || '\u20B90',
            walletHistory: user.walletHistory || (user.wallet_history ? (typeof user.wallet_history === 'string' ? JSON.parse(user.wallet_history) : user.wallet_history) : []),
            kycStatus: user.kycStatus || user.kyc_status || 'pending',
            withdrawalEnabled: Boolean(user.withdrawalEnabled || user.withdrawal_enabled),
            taskCompleted: Boolean(user.taskCompleted || user.task_completed),
            weeklyTasksDone: user.weeklyTasksDone !== undefined ? user.weeklyTasksDone : (user.weekly_tasks_done || 0),
            premiumActive: Boolean(user.premiumActive || user.premium_active || ((parseInt(((user.walletBalance || user.wallet_balance || '0')).replace(/[^\d]/g, ''), 10) || 0) > 0)),
            withdrawalDetails: user.withdrawalDetails || (user.withdrawal_details ? (typeof user.withdrawal_details === 'string' ? JSON.parse(user.withdrawal_details) : user.withdrawal_details) : null)
          };

          // Prepare verified Aadhaar & Signature state
          const verify = {
            aadhaar: {
              status: 'approved',
              num: user.aadhaar || '',
              name: user.name,
              file: user.aadhaarFile || null,
              approvedAt: user.createdAt || new Date().toISOString()
            },
            sig: {
              status: 'approved',
              data: user.signatureData || null,
              approvedAt: user.createdAt || new Date().toISOString()
            }
          };

          try {
            localStorage.setItem('ewi_user_profile', JSON.stringify(profile));
            localStorage.setItem('ewi_user_verify', JSON.stringify(verify));
            sessionStorage.setItem('ewi_user_logged_in', user.userId || user.username || user.phone || '');
              sessionStorage.setItem('ewi_login_id', rawUser);
              sessionStorage.setItem('ewi_login_pass', password);
          } catch(_) {}

          closeModal();
          showToast('Welcome back, ' + user.name + '! Redirecting to dashboard...');
          setTimeout(() => { window.location.replace('account.html'); }, 600);
          return;
        } else {
          showToast('Incorrect password. Please check your credentials or contact Admin.');
          return;
        }
      }

      // Check legacy single-profile fallback — only if phone AND password match
      let legacy = null;
      try { legacy = JSON.parse(localStorage.getItem('ewi_user_profile') || 'null'); } catch(_) {}
      if (legacy && legacy.phone === phone) {
        const legacyPass = legacy.plainPassword || legacy.plain_password || legacy.password || '';
        if (legacyPass && legacyPass === password) {
          closeModal();
          showToast('Welcome back, ' + (legacy.name || 'Worker') + '! Redirecting...');
          try { sessionStorage.setItem('ewi_user_logged_in', legacy.phone); } catch(_) {}
          setTimeout(() => { window.location.replace('account.html'); }, 600);
          return;
        }
      }

      showToast('No active account found for this ID. Please contact Admin for access.');
    });
  }
}

function closeModal() {
  const overlay = $('#modalOverlay');
  if (overlay) overlay.hidden = true;
  document.body.style.overflow = '';
}

/* ===== HEADER SCROLL EFFECT ===== */
window.addEventListener('scroll', () => {
  const header = $('.site-header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ===== HAMBURGER & MOBILE DRAWER ===== */
const hamburger = $('#hamburger');
const mainNav = $('#mainNav');
const navMobileCloseBtn = $('#navMobileCloseBtn');

function setMobileNavState(open) {
  if (!mainNav) return;
  if (open) {
    mainNav.classList.add('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  } else {
    mainNav.classList.remove('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

if (hamburger && mainNav) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mainNav.classList.contains('open');
    setMobileNavState(!isOpen);
  });

  if (navMobileCloseBtn) {
    navMobileCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setMobileNavState(false);
    });
  }

  $$('.nav-link, button', mainNav).forEach(el => {
    el.addEventListener('click', () => {
      setMobileNavState(false);
    });
  });

  // Close nav when tapping outside on mobile
  document.addEventListener('click', e => {
    if (mainNav.classList.contains('open') && !mainNav.contains(e.target) && !hamburger.contains(e.target)) {
      setMobileNavState(false);
    }
  });
}

/* ===== MODAL TRIGGERS (WORKER SIGN IN) ===== */
$('#headerLoginBtn')        && $('#headerLoginBtn').addEventListener('click',        () => openModal('login'));
$('#mobileHeaderLoginBtn')  && $('#mobileHeaderLoginBtn').addEventListener('click',  () => openModal('login'));
$('#headerRegisterBtn')     && $('#headerRegisterBtn').addEventListener('click',     () => openModal('login'));
$('#heroLoginBtn')      && $('#heroLoginBtn').addEventListener('click',      () => openModal('login'));
$('#heroRegisterBtn')   && $('#heroRegisterBtn').addEventListener('click',   () => openModal('login'));
$('#footerLogin')       && $('#footerLogin').addEventListener('click',       () => openModal('login'));
$('#footerRegister')    && $('#footerRegister').addEventListener('click',    () => openModal('login'));

/* ===== MODAL CLOSE ===== */
$('#modalClose') && $('#modalClose').addEventListener('click', closeModal);
$('#modalOverlay') && $('#modalOverlay').addEventListener('click', e => {
  if (e.target === $('#modalOverlay')) closeModal();
});
$('#demoModalClose') && $('#demoModalClose').addEventListener('click', closeDemoModal);
$('#demoModalOverlay') && $('#demoModalOverlay').addEventListener('click', e => {
  if (e.target === $('#demoModalOverlay')) closeDemoModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const overlay = $('#modalOverlay');
    if (overlay && !overlay.hidden) closeModal();
    const demoOverlay = $('#demoModalOverlay');
    if (demoOverlay && !demoOverlay.hidden) closeDemoModal();
  }
});

/* ===== REVIEWS CAROUSEL ===== */
let reviewIdx = 0;
function renderReviews() {
  const track = $('#reviewsTrack');
  const dotsEl = $('#reviewDots');
  if (!track || !dotsEl) return;
  track.innerHTML = REVIEWS.map(r => `
    <div class="review-card">
      <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
      <p class="review-text">"${r.text}"</p>
      <div class="review-person">
        <div class="rv-avatar">${r.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}</div>
        <div><strong>${r.name}</strong><span>${r.role}</span></div>
      </div>
    </div>`).join('');
  dotsEl.innerHTML = REVIEWS.map((_, i) => `<span class="${i === 0 ? 'active' : ''}" onclick="goReview(${i})"></span>`).join('');
}

function goReview(idx) {
  reviewIdx = idx;
  const track = $('#reviewsTrack');
  const cards = $$('.review-card', track);
  const dots = $$('.review-dots span');
  if (!cards.length) return;
  const cardW = cards[0].offsetWidth + 20;
  track.scrollTo({ left: idx * cardW, behavior: 'smooth' });
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

$('#revPrev') && $('#revPrev').addEventListener('click', () => {
  reviewIdx = (reviewIdx - 1 + REVIEWS.length) % REVIEWS.length;
  goReview(reviewIdx);
});
$('#revNext') && $('#revNext').addEventListener('click', () => {
  reviewIdx = (reviewIdx + 1) % REVIEWS.length;
  goReview(reviewIdx);
});
// Auto-advance
setInterval(() => {
  reviewIdx = (reviewIdx + 1) % REVIEWS.length;
  goReview(reviewIdx);
}, 5000);

/* ===== PAYOUTS TABLE (LIVE AUTO-UPDATING FEED) ===== */
let payoutUpdateTimer = null;
let toastTimeout = null;

function renderPayouts() {
  const tbody = $('#payoutsBody');
  if (!tbody) return;

  tbody.innerHTML = LIVE_PAYOUTS.map((p, i) => `
    <tr>
      <td><strong>${p.name}</strong></td>
      <td><span style="color:#64748b;font-size:.85rem">${p.city || 'India'}</span></td>
      <td><span class="badge" style="background:rgba(37,99,235,0.08);color:#2563eb;padding:3px 8px;border-radius:6px;font-size:0.75rem;font-weight:600">${p.project || (i % 2 === 0 ? 'Data Entry' : 'Form Filling')}</span></td>
      <td><strong style="color:#16a34a;font-weight:800;font-size:.95rem">${p.amount}</strong></td>
      <td><span style="font-size:.85rem;color:#334155;font-weight:600"><i class="bi bi-wallet2 text-primary me-1"></i> Withdrawal</span></td>
      <td><span class="payout-status-badge"><i class="bi bi-check-circle-fill"></i> Completed</span></td>
    </tr>`).join('');

  updatePayoutTimestamp();

  // Start live auto-update loop if not already started
  if (!payoutUpdateTimer) {
    payoutUpdateTimer = setInterval(autoAddNewPayout, 12000);
  }
}

function updatePayoutTimestamp() {
  const dateEl = $('#payoutsDate');
  if (!dateEl) return;
  const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  dateEl.innerHTML = `<span class="live-pulse-dot"></span> Live Disbursements Feed • Synchronized at ${nowTime} • Auto-updates live`;
}

function autoAddNewPayout() {
  const tbody = $('#payoutsBody');
  if (!tbody) return;

  // Pick random worker, amount, and payment method
  const worker = WORKER_POOL[Math.floor(Math.random() * WORKER_POOL.length)];
  const rawAmt = PAYOUT_AMOUNTS[Math.floor(Math.random() * PAYOUT_AMOUNTS.length)];
  const amountStr = '\u20B9' + rawAmt.toLocaleString('en-IN');
  const method = PAYOUT_METHODS[Math.floor(Math.random() * PAYOUT_METHODS.length)];
  const dateStr = formatDynamicDate(0);

  // Create new row
  const project = Math.random() > 0.5 ? 'Data Entry' : 'Form Filling';
  const tr = document.createElement('tr');
  tr.className = 'row-flash';
  tr.innerHTML = `
    <td><strong>${worker.name}</strong></td>
    <td><span style="color:#64748b;font-size:.85rem">${worker.city}</span></td>
    <td><span class="badge" style="background:rgba(37,99,235,0.08);color:#2563eb;padding:3px 8px;border-radius:6px;font-size:0.75rem;font-weight:600">${project}</span></td>
    <td><strong style="color:#16a34a;font-weight:800;font-size:.95rem">${amountStr}</strong></td>
    <td><span style="font-size:.85rem;color:#334155;font-weight:600"><i class="bi bi-wallet2 text-primary me-1"></i> Withdrawal</span></td>
    <td><span class="payout-status-badge"><i class="bi bi-check-circle-fill"></i> Completed</span></td>
  `;

  // Prepend to table
  tbody.insertBefore(tr, tbody.firstChild);

  // Keep max 8 rows
  if (tbody.children.length > 8) {
    tbody.removeChild(tbody.lastChild);
  }

  // Update live timestamp
  updatePayoutTimestamp();

  // Show floating live payout notification
  showFloatingPayoutToast(worker, amountStr, method);
}

function showFloatingPayoutToast(worker, amount, method) {
  const toast = $('#floatingPayoutToast');
  const nameEl = $('#fptName');
  const amtEl = $('#fptAmount');
  const methodEl = $('#fptMethod');
  const timeEl = $('#fptTime');
  if (!toast) return;

  if (nameEl) nameEl.textContent = `${worker.name} (${worker.city})`;
  if (amtEl) amtEl.textContent = amount;
  if (methodEl) methodEl.textContent = method;
  if (timeEl) timeEl.textContent = 'Just now';

  toast.classList.add('active');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('active');
  }, 4500);
}

function closeFloatingToast() {
  const toast = $('#floatingPayoutToast');
  if (toast) toast.classList.remove('active');
  clearTimeout(toastTimeout);
}

/* ===== STAR RATING ===== */
let selectedRating = 0;
function initStarRating() {
  const stars = $$('#starPick i');
  stars.forEach((star, i) => {
    star.addEventListener('mouseover', () => { stars.forEach((s, j) => s.classList.toggle('on', j <= i)); });
    star.addEventListener('mouseout',  () => { stars.forEach((s, j) => s.classList.toggle('on', j < selectedRating)); });
    star.addEventListener('click',     () => {
      selectedRating = i + 1;
      stars.forEach((s, j) => s.classList.toggle('on', j < selectedRating));
    });
    // Touch support for star rating
    star.addEventListener('touchend', e => {
      e.preventDefault();
      selectedRating = i + 1;
      stars.forEach((s, j) => s.classList.toggle('on', j < selectedRating));
    });
  });
  const rateMsg = $('#rateMsg');
  const charsLeft = $('#charsLeft');
  if (rateMsg && charsLeft) {
    rateMsg.addEventListener('input', () => {
      charsLeft.textContent = 200 - rateMsg.value.length;
    });
  }
}

const rateForm = $('#rateForm');
if (rateForm) {
  rateForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!selectedRating) { showToast('Please select a star rating.'); return; }
    const msg = ($('#rateMsg') || {}).value || '';
    if (!msg.trim()) { showToast('Please write your review.'); return; }
    try {
      const reviews = JSON.parse(localStorage.getItem('ewi_reviews') || '[]');
      reviews.push({ rating: selectedRating, msg: msg.trim(), at: new Date().toISOString() });
      localStorage.setItem('ewi_reviews', JSON.stringify(reviews));
    } catch (_) {}
    const wrap = $('#rateFormWrap');
    if (wrap) wrap.style.display = 'none';
    const ty = $('#thankYou');
    if (ty) { ty.style.display = 'block'; ty.classList.add('show'); }
    showToast('Thank you for your feedback!');
  });
}

/* ===== ACTIVE NAV ON SCROLL ===== */
const sections = ['home', 'projects', 'terms', 'how', 'payouts', 'reviews', 'faq', 'contact'];
const navLinks = $$('.nav-link');
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === '#' + current);
  });
}, { passive: true });

/* ===== DYNAMIC PROJECT DETAILS & UNIT RATE SYNC ===== */
function syncHomepageProjects() {
  function applyRates(rates) {
    if (!rates || typeof rates !== 'object') return;
    const deRate = parseInt(rates.data_entry, 10);
    const ffRate = parseInt(rates.form_filling, 10);

    if (!isNaN(deRate)) {
      const deRateEl = document.getElementById('homeProjRate_data_entry');
      const dePotEl = document.getElementById('homeProjPotential_data_entry');
      const bigRate = document.getElementById('projBigRate_data_entry');
      const bigWeekly = document.getElementById('projBigWeekly_data_entry');
      const earnText = deRate === 60 ? 'Rs.21,000' : `Rs.${(deRate * 350).toLocaleString('en-IN')}`;
      if (deRateEl) deRateEl.textContent = `Rs.${deRate}`;
      if (dePotEl) dePotEl.textContent = earnText;
      if (bigRate) bigRate.textContent = `Rs.${deRate}`;
      if (bigWeekly) bigWeekly.textContent = `${earnText} weekly`;
    }

    if (!isNaN(ffRate)) {
      const ffRateEl = document.getElementById('homeProjRate_form_filling');
      const ffPotEl = document.getElementById('homeProjPotential_form_filling');
      const bigRate = document.getElementById('projBigRate_form_filling');
      const bigWeekly = document.getElementById('projBigWeekly_form_filling');
      const earnText = ffRate === 50 ? 'Rs.19,500' : `Rs.${(ffRate * 350).toLocaleString('en-IN')}`;
      if (ffRateEl) ffRateEl.textContent = `Rs.${ffRate}`;
      if (ffPotEl) ffPotEl.textContent = earnText;
      if (bigRate) bigRate.textContent = `Rs.${ffRate}`;
      if (bigWeekly) bigWeekly.textContent = `${earnText} weekly`;
    }
  }

  function applyProjects(projList) {
    if (!Array.isArray(projList)) return;
    projList.forEach(p => {
      if (p.key === 'captcha') return; // skip captcha completely
      const key = p.key || (p.id === 3 ? 'form_filling' : 'data_entry');
      const titleEl = document.getElementById(`homeProjTitle_${key}`);
      const descEl = document.getElementById(`homeProjDesc_${key}`);
      const rateEl = document.getElementById(`homeProjRate_${key}`);
      const dailyEl = document.getElementById(`homeProjDaily_${key}`);
      const potEl = document.getElementById(`homeProjPotential_${key}`);
      const timingEl = document.getElementById(`homeProjTiming_${key}`);
      const payoutEl = document.getElementById(`homeProjPayout_${key}`);
      const bigRate = document.getElementById(`projBigRate_${key}`);
      const bigDaily = document.getElementById(`projBigDaily_${key}`);
      const bigWeekly = document.getElementById(`projBigWeekly_${key}`);

      if (titleEl && p.name) titleEl.textContent = p.name.toUpperCase();
      if (descEl) descEl.textContent = 'Work Description';
      
      const isDE = (key === 'data_entry');
      const defaultRate = isDE ? 'Rs.60' : 'Rs.50';
      const defaultEarn = isDE ? 'Rs.21,000' : 'Rs.19,500';
      const defaultWork = '350 pages';

      const rateVal = (p.perUnit && !p.perUnit.includes('30') && !p.perUnit.includes('Captchas')) ? p.perUnit : defaultRate;
      const workVal = (p.weeklyWork && p.weeklyWork !== '30 Pages' && p.weeklyWork !== '30 Captchas') ? p.weeklyWork : defaultWork;
      const earnVal = (p.weeklyEarnings && p.weeklyEarnings !== 'Rs.1,500' && p.weeklyEarnings !== '\u20B91,500') ? p.weeklyEarnings : defaultEarn;

      const cleanRate = rateVal.replace('\u20B9', 'Rs.').replace(/\/(page|form|unit)/gi, '').trim();
      const finalRate = cleanRate.startsWith('Rs.') ? cleanRate : `Rs.${cleanRate}`;
      const finalEarn = earnVal.replace('\u20B9', 'Rs.').trim();
      const finalWork = workVal.replace(/pages/i, 'Pages');

      if (rateEl) rateEl.textContent = finalRate;
      if (dailyEl) dailyEl.textContent = finalWork;
      if (potEl) potEl.textContent = finalEarn;
      if (timingEl) timingEl.textContent = p.timing || 'No Time - No Limit';
      if (payoutEl) payoutEl.textContent = p.payout || 'Any Time Work - Weekly Salary';
      if (bigRate) bigRate.textContent = finalRate;
      if (bigDaily) bigDaily.textContent = `${workVal.toLowerCase()}/week`;
      if (bigWeekly) bigWeekly.textContent = `${finalEarn} weekly`;
    });
  }

  // 1. Instant load from localStorage
  try {
    const cachedRates = JSON.parse(localStorage.getItem('ewi_unit_rates') || 'null');
    if (cachedRates) applyRates(cachedRates);

    const cachedProj = JSON.parse(localStorage.getItem('ewi_projects_db') || 'null');
    if (cachedProj) applyProjects(cachedProj);
  } catch(_) {}

  // 2. Fetch live from SQLite backend
  if (typeof fetch === 'function') {
    fetch('/api/rates')
      .then(r => r.json())
      .then(data => {
        if (data && data.rates) {
          try { localStorage.setItem('ewi_unit_rates', JSON.stringify(data.rates)); } catch(_) {}
          applyRates(data.rates);
        }
      })
      .catch(() => {});

    fetch('/api/projects')
      .then(r => r.json())
      .then(data => {
        if (data && Array.isArray(data.projects)) {
          try { localStorage.setItem('ewi_projects_db', JSON.stringify(data.projects)); } catch(_) {}
          applyProjects(data.projects);
        }
      })
      .catch(() => {});
  }
}

window.addEventListener('storage', e => {
  if (e.key === 'ewi_projects_db' || e.key === 'ewi_unit_rates') {
    syncHomepageProjects();
  }
});

/* ===== 2-PAGE INTERACTIVE PRACTICE DEMO SYSTEM ===== */
const DEMO_PAGES_DATA_ENTRY = [
  {
    page: 1,
    title: "National Solar Mission and Grid Integration Application (Record 01)",
    source: `NATIONAL SOLAR MISSION ROOFTOP REGISTRY — RECORD 01
Application: SOLAR-2026-9041 | Circle: Western Distribution
Beneficiary: Rameshwar Dayal Sharma | Gender: Male
Aadhaar: 4821 9012 3341 | Mobile: +91 98220 19482
Address: Surya Enclave, Baner Road, Pune - 411045
Capacity: 3.5 kW | Subsidy: Rs. 78,000
Inspection: Verified compliant under BIS norms.`
  },
  {
    page: 2,
    title: "Agricultural Land Record and Crop Insurance Ledger (Record 02)",
    source: `AGRICULTURAL REVENUE & CROP INSURANCE LEDGER — SHEET 02
Serial: AGRI-REV-2026-7721 | Sub-District: Khed Taluka
Landowner: Rameshwar Tukaram Patil | Age: 52
Aadhaar: 7412 3901 8852 | Mobile: +91 98901 28472
Domicile: Village Khed, Post Manchar, Pune - 410501
Holding: 4.85 Hectares | Coverage: Rs. 2,40,000
Attestation: Field survey verified by Talathi.`
  }
];

const DEMO_PAGES_FORM_FILLING = [
  {
    page: 1,
    title: "Residential Solar Subsidy Application",
    record: {
      appNo: "SOLAR-2026-9041",
      name: "Rameshwar Dayal Sharma",
      phone: "9822019482",
      email: "rameshwar.sharma@gmail.com",
      aadhaar: "4821 9012 3341",
      location: "Pune, Maharashtra",
      scheme: "3 kW Residential Rooftop Solar",
      amount: "Rs.78,000"
    }
  },
  {
    page: 2,
    title: "Micro-Enterprise Equipment Finance Loan",
    record: {
      appNo: "SME-2026-4418",
      name: "Sunita Devi Rao",
      phone: "9845012399",
      email: "sunita.rao99@gmail.com",
      aadhaar: "6612 8840 1923",
      location: "Nagpur, Maharashtra",
      scheme: "Kisan & Small Business Equipment Loan",
      amount: "Rs.1,50,000"
    }
  }
];

let activeDemoProject = 'data_entry';
let activeDemoPage = 1;
const completedDemoPages = {
  data_entry: new Set(),
  form_filling: new Set()
};

function openDemoModal(projectKey = 'data_entry', pageNum = 1) {
  activeDemoProject = projectKey;
  activeDemoPage = pageNum;
  const overlay = document.getElementById('demoModalOverlay');
  if (!overlay) return;
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  renderDemoWorkspace();
}

function closeDemoModal() {
  const overlay = document.getElementById('demoModalOverlay');
  if (overlay) overlay.hidden = true;
  document.body.style.overflow = '';
}

function switchDemoPage(pageNum) {
  activeDemoPage = pageNum;
  renderDemoWorkspace();
}

function switchDemoProject(projKey) {
  activeDemoProject = projKey;
  activeDemoPage = 1;
  renderDemoWorkspace();
}

function calculateTypingAccuracy(input, target) {
  if (!input || !target) return 0;
  const inWords = input.trim().split(/\s+/);
  const tgtWords = target.trim().split(/\s+/);
  let matches = 0;
  inWords.forEach((w, i) => {
    if (tgtWords[i] && w.toLowerCase() === tgtWords[i].toLowerCase()) matches++;
  });
  return Math.min(100, Math.round((matches / Math.max(inWords.length, 1)) * 100));
}

function handleDemoTyping(textarea, targetText) {
  const val = textarea.value;
  const chars = val.length;
  const words = val.trim() ? val.trim().split(/\s+/).length : 0;
  const acc = calculateTypingAccuracy(val, targetText);

  const charEl = document.getElementById('demoCharCount');
  const wordEl = document.getElementById('demoWordCount');
  const accEl = document.getElementById('demoAccuracy');

  if (charEl) charEl.innerHTML = `<i class="bi bi-fonts"></i> ${chars} characters`;
  if (wordEl) wordEl.innerHTML = `<i class="bi bi-card-text"></i> ${words} words`;
  if (accEl) accEl.innerHTML = `<i class="bi bi-patch-check"></i> Accuracy: ${acc}%`;
}

function autoFillDemoPage(projKey, pageNum) {
  if (projKey === 'data_entry') {
    const p = DEMO_PAGES_DATA_ENTRY.find(x => x.page === pageNum);
    const ta = document.getElementById('demoTypingArea');
    if (p && ta) {
      ta.value = p.source;
      handleDemoTyping(ta, p.source);
      showToast('Sample document text auto-filled! Click Submit.');
    }
  } else {
    const p = DEMO_PAGES_FORM_FILLING.find(x => x.page === pageNum);
    if (p) {
      const rec = p.record;
      const fApp = document.getElementById('dfAppNo');
      const fName = document.getElementById('dfName');
      const fPhone = document.getElementById('dfPhone');
      const fEmail = document.getElementById('dfEmail');
      const fAadhaar = document.getElementById('dfAadhaar');
      const fLoc = document.getElementById('dfLocation');
      const fScheme = document.getElementById('dfScheme');
      const fAmt = document.getElementById('dfAmount');

      if (fApp) fApp.value = rec.appNo;
      if (fName) fName.value = rec.name;
      if (fPhone) fPhone.value = rec.phone;
      if (fEmail) fEmail.value = rec.email;
      if (fAadhaar) fAadhaar.value = rec.aadhaar;
      if (fLoc) fLoc.value = rec.location;
      if (fScheme) fScheme.value = rec.scheme;
      if (fAmt) fAmt.value = rec.amount;
      showToast('Sample form fields auto-filled! Click Submit.');
    }
  }
}

function submitDemoTask(projKey, pageNum) {
  completedDemoPages[projKey].add(pageNum);
  const earned = projKey === 'data_entry' ? 'Rs.60' : 'Rs.50';
  const unitName = projKey === 'data_entry' ? 'Page' : 'Form';

  const alertBox = document.getElementById('demoSuccessAlert');
  if (alertBox) {
    alertBox.style.display = 'flex';
    alertBox.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px">
        <i class="bi bi-check-circle-fill" style="color:#16a34a;font-size:1.6rem"></i>
        <div>
          <strong style="color:#166534;font-size:.95rem">Demo ${unitName} ${pageNum} Completed Successfully!</strong>
          <span style="display:block;font-size:.82rem;color:#15803d">Practice credit +${earned} recorded for this demo page. Accuracy verified.</span>
        </div>
      </div>
      <div>
        ${pageNum < 2 ? `
          <button class="btn btn-primary btn-sm" onclick="switchDemoPage(${pageNum + 1})">
            Next Demo Page (Page ${pageNum + 1}) <i class="bi bi-arrow-right"></i>
          </button>
        ` : `
          <button class="btn btn-primary btn-sm" onclick="closeDemoModal();openModal('login')">
            <i class="bi bi-box-arrow-in-right"></i> Login
          </button>
        `}
      </div>
    `;
  }
  showToast(`✓ Demo ${unitName} ${pageNum} completed! Practice reward: ${earned}`);

  // Update tabs
  const tabBtn = document.getElementById(`demoTabBtn_${pageNum}`);
  if (tabBtn) {
    tabBtn.classList.add('completed');
    tabBtn.innerHTML = `<i class="bi bi-check-circle-fill" style="color:#16a34a"></i> Page ${pageNum}`;
  }
}

function renderDemoWorkspace() {
  const container = document.getElementById('demoModalContent');
  if (!container) return;

  const isDE = activeDemoProject === 'data_entry';
  const pagesList = isDE ? DEMO_PAGES_DATA_ENTRY : DEMO_PAGES_FORM_FILLING;
  const curPage = pagesList.find(p => p.page === activeDemoPage) || pagesList[0];
  const rateLabel = isDE ? 'Rs.60 / page' : 'Rs.50 / form';
  const themeClass = isDE ? 'green' : 'gold';

  // 5 page buttons HTML
  const pageTabsHtml = [1, 2].map(num => {
    const isAct = num === activeDemoPage;
    const isDone = completedDemoPages[activeDemoProject].has(num);
    const icon = isDone ? '<i class="bi bi-check-circle-fill" style="color:#16a34a"></i>' : '<i class="bi bi-file-earmark-text"></i>';
    return `
      <button class="demo-page-tab-btn ${isAct ? 'active ' + themeClass : ''} ${isDone ? 'completed' : ''}" id="demoTabBtn_${num}" onclick="switchDemoPage(${num})">
        ${icon} Page ${num}
      </button>
    `;
  }).join('');

  let workspaceHtml = '';

  if (isDE) {
    workspaceHtml = `
      <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:12px;padding:16px;margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px">
          <strong style="font-size:.88rem;color:var(--navy);display:flex;align-items:center;gap:6px">
            <i class="bi bi-file-text-fill" style="color:#16a34a"></i> Official Source Document (Page ${curPage.page} of 2)
          </strong>
          <div style="display:flex;gap:6px;align-items:center">
            <span style="font-size:.74rem;background:#fee2e2;color:#b91c1c;padding:3px 8px;border-radius:8px;font-weight:700">
              <i class="bi bi-shield-slash-fill"></i> Copy-Paste Disabled
            </span>
            <span style="font-size:.78rem;background:#dcfce7;color:#166534;padding:3px 10px;border-radius:12px;font-weight:700">
              Demo Rate: ${rateLabel}
            </span>
          </div>
        </div>
        <div style="font-size:.78rem;color:#64748b;margin-bottom:8px"><em>${curPage.title}</em></div>
        <div class="demo-doc-sheet" id="demoSourceText" oncopy="return false;" oncontextmenu="return false;" onselectstart="return false;">${curPage.source}</div>
      </div>

      <div style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;flex-wrap:wrap;gap:6px">
          <label style="font-size:.82rem;font-weight:700;color:var(--navy)">Your Typing Workspace (Type accurately below):</label>
          <button type="button" class="copy-pill-btn" style="background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;font-size:.74rem;padding:2px 8px;border-radius:8px" onclick="autoFillDemoPage('data_entry', ${curPage.page})">
            <i class="bi bi-magic"></i> Auto-Type Sample Text
          </button>
        </div>
        <textarea id="demoTypingArea" class="demo-typing-box" rows="10" placeholder="Start typing the exact document text here to test your transcription accuracy..." oncopy="return false;" oncut="return false;" onpaste="return false;" oncontextmenu="return false;" oninput="handleDemoTyping(this, \`${curPage.source.replace(/`/g, '\\`')}\`)"></textarea>
        <div class="demo-stats-bar">
          <span id="demoCharCount"><i class="bi bi-fonts"></i> 0 characters</span>
          <span id="demoWordCount"><i class="bi bi-card-text"></i> 0 words</span>
          <span id="demoAccuracy" style="color:#16a34a;font-weight:700"><i class="bi bi-patch-check"></i> Accuracy: 0%</span>
        </div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
        <span style="font-size:.78rem;color:#64748b"><i class="bi bi-shield-check" style="color:#16a34a"></i> Practice demo submission · 2 Demo Pages Available</span>
        <button class="btn btn-primary" onclick="submitDemoTask('data_entry', ${curPage.page})" style="background:#16a34a;border-color:#16a34a">
          <i class="bi bi-check2-circle"></i> Submit Page ${curPage.page} &amp; Verify
        </button>
      </div>
    `;
  } else {
    // Form Filling
    const rec = curPage.record;
    workspaceHtml = `
      <div style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:12px;padding:16px;margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px">
          <strong style="font-size:.88rem;color:#92400e;display:flex;align-items:center;gap:6px">
            <i class="bi bi-ui-checks-grid" style="color:#d97706"></i> Source Applicant Master Record (Page ${curPage.page} of 5)
          </strong>
          <div style="display:flex;gap:6px;align-items:center">
            <span style="font-size:.74rem;background:#fee2e2;color:#b91c1c;padding:3px 8px;border-radius:8px;font-weight:700">
              <i class="bi bi-shield-slash-fill"></i> Copy-Paste Disabled
            </span>
            <span style="font-size:.78rem;background:#fef3c7;color:#92400e;padding:3px 10px;border-radius:12px;font-weight:700">
              Demo Rate: ${rateLabel}
            </span>
          </div>
        </div>
        <div style="font-size:.78rem;color:#b45309;margin-bottom:10px"><em>${curPage.title}</em></div>
        <div class="demo-record-grid" oncopy="return false;" oncontextmenu="return false;" onselectstart="return false;">
          <div class="demo-record-cell"><strong>Application No:</strong><span>${rec.appNo}</span></div>
          <div class="demo-record-cell"><strong>Full Name:</strong><span>${rec.name}</span></div>
          <div class="demo-record-cell"><strong>Mobile Phone:</strong><span>${rec.phone}</span></div>
          <div class="demo-record-cell"><strong>Email Address:</strong><span>${rec.email}</span></div>
          <div class="demo-record-cell"><strong>Aadhaar Number:</strong><span>${rec.aadhaar}</span></div>
          <div class="demo-record-cell"><strong>Location / City:</strong><span>${rec.location}</span></div>
          <div class="demo-record-cell"><strong>Scheme Name:</strong><span>${rec.scheme}</span></div>
          <div class="demo-record-cell"><strong>Subsidy Amount:</strong><span>${rec.amount}</span></div>
        </div>
      </div>

      <div style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px">
          <label style="font-size:.82rem;font-weight:700;color:var(--navy)">Fill Submission Form Below:</label>
          <button type="button" class="copy-pill-btn" style="background:#fff7ed;color:#ea580c;border:1px solid #ffedd5;font-size:.74rem;padding:2px 8px;border-radius:8px" onclick="autoFillDemoPage('form_filling', ${curPage.page})">
            <i class="bi bi-magic"></i> Auto-Fill Record
          </button>
        </div>
        <div class="demo-form-fields-grid">
          <div><label style="font-size:.75rem;font-weight:600;color:#64748b">Application No</label><input type="text" id="dfAppNo" class="form-field-input" placeholder="e.g. SOLAR-2026-9041" oncopy="return false;" oncut="return false;" onpaste="return false;" oncontextmenu="return false;" style="width:100%;border:1.5px solid #cbd5e1;border-radius:8px;padding:8px 10px;font-size:.85rem"></div>
          <div><label style="font-size:.75rem;font-weight:600;color:#64748b">Full Name</label><input type="text" id="dfName" class="form-field-input" placeholder="e.g. Rameshwar Dayal Sharma" oncopy="return false;" oncut="return false;" onpaste="return false;" oncontextmenu="return false;" style="width:100%;border:1.5px solid #cbd5e1;border-radius:8px;padding:8px 10px;font-size:.85rem"></div>
          <div><label style="font-size:.75rem;font-weight:600;color:#64748b">Mobile Phone</label><input type="text" id="dfPhone" class="form-field-input" placeholder="e.g. 9822019482" oncopy="return false;" oncut="return false;" onpaste="return false;" oncontextmenu="return false;" style="width:100%;border:1.5px solid #cbd5e1;border-radius:8px;padding:8px 10px;font-size:.85rem"></div>
          <div><label style="font-size:.75rem;font-weight:600;color:#64748b">Email Address</label><input type="text" id="dfEmail" class="form-field-input" placeholder="e.g. rameshwar.sharma@gmail.com" oncopy="return false;" oncut="return false;" onpaste="return false;" oncontextmenu="return false;" style="width:100%;border:1.5px solid #cbd5e1;border-radius:8px;padding:8px 10px;font-size:.85rem"></div>
          <div><label style="font-size:.75rem;font-weight:600;color:#64748b">Aadhaar Number</label><input type="text" id="dfAadhaar" class="form-field-input" placeholder="e.g. 4821 9012 3341" oncopy="return false;" oncut="return false;" onpaste="return false;" oncontextmenu="return false;" style="width:100%;border:1.5px solid #cbd5e1;border-radius:8px;padding:8px 10px;font-size:.85rem"></div>
          <div><label style="font-size:.75rem;font-weight:600;color:#64748b">Location / City</label><input type="text" id="dfLocation" class="form-field-input" placeholder="e.g. Pune, Maharashtra" oncopy="return false;" oncut="return false;" onpaste="return false;" oncontextmenu="return false;" style="width:100%;border:1.5px solid #cbd5e1;border-radius:8px;padding:8px 10px;font-size:.85rem"></div>
          <div><label style="font-size:.75rem;font-weight:600;color:#64748b">Scheme / Plan</label><input type="text" id="dfScheme" class="form-field-input" placeholder="e.g. 3 kW Residential Rooftop Solar" oncopy="return false;" oncut="return false;" onpaste="return false;" oncontextmenu="return false;" style="width:100%;border:1.5px solid #cbd5e1;border-radius:8px;padding:8px 10px;font-size:.85rem"></div>
          <div><label style="font-size:.75rem;font-weight:600;color:#64748b">Subsidy Amount</label><input type="text" id="dfAmount" class="form-field-input" placeholder="e.g. Rs.78,000" oncopy="return false;" oncut="return false;" onpaste="return false;" oncontextmenu="return false;" style="width:100%;border:1.5px solid #cbd5e1;border-radius:8px;padding:8px 10px;font-size:.85rem"></div>
        </div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
        <span style="font-size:.78rem;color:#64748b"><i class="bi bi-shield-check" style="color:#16a34a"></i> Practice demo submission · 2 Demo Pages Available</span>
        <button class="btn btn-primary" onclick="submitDemoTask('form_filling', ${curPage.page})" style="background:#d97706;border-color:#d97706">
          <i class="bi bi-check2-circle"></i> Submit Form Page ${curPage.page} &amp; Verify
        </button>
      </div>
    `;
  }

  container.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:12px">
      <div>
        <div class="demo-header-badge">
          <i class="bi bi-stars"></i> 2 DEMO PAGES AVAILABLE • FREE TRIAL
        </div>
        <h2 style="font-size:1.4rem;color:var(--navy);margin:4px 0 2px">
          ${isDE ? 'Data Entry Practice Demo' : 'Form Filling Practice Demo'}
        </h2>
        <p style="font-size:.85rem;color:#64748b;margin:0">
          Try the official work environment with 2 real practice pages before signing in.
        </p>
      </div>
      <div style="display:flex;gap:6px">
        <button class="copy-pill-btn" style="${isDE ? 'background:#16a34a;color:#fff' : 'background:#f1f5f9;color:#334155'}" onclick="switchDemoProject('data_entry')">
          <i class="bi bi-file-earmark-text"></i> Data Entry Demo
        </button>
        <button class="copy-pill-btn" style="${!isDE ? 'background:#d97706;color:#fff' : 'background:#f1f5f9;color:#334155'}" onclick="switchDemoProject('form_filling')">
          <i class="bi bi-ui-checks"></i> Form Filling Demo
        </button>
      </div>
    </div>

    <!-- 5 Page Buttons -->
    <div style="font-size:.78rem;font-weight:700;color:var(--navy);margin-top:12px">Select Demo Page (1 to 2):</div>
    <div class="demo-page-tabs">
      ${pageTabsHtml}
    </div>

    <div id="demoSuccessAlert" class="demo-success-alert" style="display:none;margin-bottom:14px"></div>

    ${workspaceHtml}

    <!-- Bottom Action CTA -->
    <div class="demo-footer-cta">
      <div>
        <strong style="font-size:.9rem;color:var(--navy);display:block">Ready to start earning real weekly salary?</strong>
        <span style="font-size:.8rem;color:#64748b">Worker accounts and login credentials are provided by Administration.</span>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn btn-outline" onclick="closeDemoModal()" style="font-size:.88rem;padding:8px 16px">Close Demo</button>
        <button class="btn btn-primary" onclick="closeDemoModal();openModal('login')" style="font-size:.88rem;padding:8px 18px">
          <i class="bi bi-box-arrow-in-right"></i> Login
        </button>
      </div>
    </div>
  `;

  bindAntiCopyPasteDemoProtection();
}

function bindAntiCopyPasteDemoProtection() {
  const elements = document.querySelectorAll(
    '#demoTypingArea, #demoSourceText, #dfAppNo, #dfName, #dfPhone, #dfEmail, #dfAadhaar, #dfLocation, #dfScheme, #dfAmount, .demo-doc-sheet, .demo-record-grid'
  );
  elements.forEach(el => {
    ['copy', 'cut', 'paste', 'contextmenu', 'drop', 'dragstart', 'dragover'].forEach(evt => {
      el.addEventListener(evt, e => {
        e.preventDefault();
        e.stopPropagation();
        showToast('⚠️ Copy-Paste is strictly disabled (Android & Web). Manual typing required.');
        return false;
      }, { passive: false });
    });

    // Android virtual keyboard clipboard insertion
    el.addEventListener('beforeinput', e => {
      if (e.inputType === 'insertFromPaste' || e.inputType === 'insertFromDrop' || e.inputType === 'insertReplacementText') {
        e.preventDefault();
        e.stopPropagation();
        showToast('⚠️ Clipboard insertion blocked. Please type manually.');
        return false;
      }
    }, { passive: false });

    // Desktop keyboard shortcuts
    el.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'C' || e.key === 'V' || e.key === 'X')) {
        e.preventDefault();
        e.stopPropagation();
        showToast('⚠️ Keyboard shortcuts disabled. Manual typing required.');
        return false;
      }
      if (e.shiftKey && e.key === 'Insert') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });
  });
}

/* ===== LOGGED-IN WORKER UI SYNC & LOGOUT ===== */
function logoutWorkerFromHome() {
  if (confirm('Are you sure you want to logout?')) {
    sessionStorage.removeItem('ewi_user_logged_in');
    sessionStorage.removeItem('ewi_login_id');
    sessionStorage.removeItem('ewi_login_pass');
    localStorage.removeItem('ewi_user_profile');
    localStorage.removeItem('ewi_user_verify');
    window.location.reload();
  }
}

function checkLoggedInWorkerUI() {
  let profile = null;
  try {
    profile = JSON.parse(localStorage.getItem('ewi_user_profile') || 'null');
  } catch (_) {}

  // IMPORTANT: Only show logged-in UI if the worker has an ACTIVE session token.
  // ewi_user_profile alone (set by admin when creating/editing users) must NOT trigger auto-login.
  // sessionStorage is cleared on tab/browser close, so this is safe.
  const sessionId = sessionStorage.getItem('ewi_user_logged_in');
  if (!sessionId) {
    // No active session — if profile was left behind by admin actions, clear it
    if (profile) {
      localStorage.removeItem('ewi_user_profile');
    }
    return; // Not logged in
  }

  if (profile && profile.name) {
    const firstName = profile.name.split(' ')[0];
    const headerBtn = $('#headerLoginBtn');
    if (headerBtn) {
      headerBtn.innerHTML = `<i class="bi bi-person-check-fill"></i> ${firstName}'s Account`;
      headerBtn.onclick = e => { e.preventDefault(); e.stopPropagation(); window.location.href = 'account.html'; };

      // Desktop header logout button
      let dskLogout = $('#headerLogoutBtn');
      if (!dskLogout && headerBtn.parentNode) {
        dskLogout = document.createElement('button');
        dskLogout.id = 'headerLogoutBtn';
        dskLogout.className = 'btn btn-outline-light ms-2';
        dskLogout.style.cssText = 'padding:7px 12px;font-size:0.85rem;border-color:rgba(255,255,255,0.25);';
        dskLogout.title = 'Logout Account';
        dskLogout.innerHTML = '<i class="bi bi-box-arrow-right"></i>';
        dskLogout.onclick = e => { e.preventDefault(); e.stopPropagation(); logoutWorkerFromHome(); };
        headerBtn.parentNode.appendChild(dskLogout);
      }
    }
    const mobHeaderBtn = $('#mobileHeaderLoginBtn');
    if (mobHeaderBtn) {
      mobHeaderBtn.innerHTML = `<i class="bi bi-person-check-fill"></i> Account`;
      mobHeaderBtn.onclick = e => { e.preventDefault(); e.stopPropagation(); window.location.href = 'account.html'; };
    }
    const mobNavBtn = $('#mobileNavLoginBtn');
    if (mobNavBtn) {
      mobNavBtn.innerHTML = `<i class="bi bi-speedometer2"></i> Open Worker Dashboard`;
      mobNavBtn.onclick = e => { e.preventDefault(); e.stopPropagation(); window.location.href = 'account.html'; };

      // Mobile nav logout button
      let mobLogout = $('#mobileNavLogoutBtn');
      if (!mobLogout && mobNavBtn.parentNode) {
        mobLogout = document.createElement('button');
        mobLogout.id = 'mobileNavLogoutBtn';
        mobLogout.className = 'btn btn-full mt-2';
        mobLogout.style.cssText = 'width:100%;margin-top:10px;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.4);color:#fca5a5;font-weight:600;padding:10px 14px;border-radius:8px;cursor:pointer;';
        mobLogout.innerHTML = '<i class="bi bi-box-arrow-right me-1"></i> Logout';
        mobLogout.onclick = e => { e.preventDefault(); e.stopPropagation(); logoutWorkerFromHome(); };
        mobNavBtn.parentNode.appendChild(mobLogout);
      }
    }
    const heroBtn = $('#heroLoginBtn');
    if (heroBtn) {
      heroBtn.innerHTML = `<i class="bi bi-speedometer2"></i> Go to Dashboard`;
      heroBtn.onclick = e => { e.preventDefault(); e.stopPropagation(); window.location.href = 'account.html'; };
    }
  }
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  syncHomepageProjects();
  renderReviews();
  renderPayouts();
  initStarRating();
  checkLoggedInWorkerUI();
});



