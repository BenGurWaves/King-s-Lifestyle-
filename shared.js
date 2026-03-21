/* shared.js – v0.0.3 */
/* ============================================================
   A King's Lifestyle — Shared Module
   Auth · Navigation · Utilities · Chat
   ============================================================ */

/* ---------- SVG Crown Logo (three peaks, no sword) ---------- */
const CROWN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" width="44" height="33" fill="none" stroke="#A38255" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M10 48 L18 18 L40 30 L62 18 L70 48 Z"/>
  <line x1="18" y1="18" x2="18" y2="13"/>
  <circle cx="18" cy="11" r="2.5"/>
  <line x1="40" y1="30" x2="40" y2="8"/>
  <circle cx="40" cy="6" r="3"/>
  <line x1="62" y1="18" x2="62" y2="13"/>
  <circle cx="62" cy="11" r="2.5"/>
  <line x1="8" y1="52" x2="72" y2="52"/>
</svg>`;

const CROWN_SM = CROWN_SVG.replace('width="44"','width="28"').replace('height="33"','height="21"');

/* ---------- HTML escape (prevents XSS in user-generated content) ---------- */
function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/* ---------- Daily Royal Principles (10 Bible + 10 Secular) ---------- */
const PRINCIPLES_BIBLE = [
  { text: "A king\u2019s heart is in the hand of the Lord; He directs it like a watercourse wherever He pleases.", ref: "Proverbs 21:1" },
  { text: "When a king sits on his throne to judge, he winnows out all evil with his eyes.", ref: "Proverbs 20:8" },
  { text: "By justice a king gives a country stability, but those who are greedy for bribes tear it down.", ref: "Proverbs 29:4" },
  { text: "It is the glory of God to conceal a matter; to search out a matter is the glory of kings.", ref: "Proverbs 25:2" },
  { text: "Righteousness exalts a nation, but sin condemns any people.", ref: "Proverbs 14:34" },
  { text: "The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.", ref: "Proverbs 9:10" },
  { text: "Iron sharpens iron, and one man sharpens another.", ref: "Proverbs 27:17" },
  { text: "Guard your heart above all else, for it determines the course of your life.", ref: "Proverbs 4:23" },
  { text: "Plans fail for lack of counsel, but with many advisers they succeed.", ref: "Proverbs 15:22" },
  { text: "Commit to the Lord whatever you do, and He will establish your plans.", ref: "Proverbs 16:3" }
];

const PRINCIPLES_SECULAR = [
  { text: "A true king governs himself before he governs others \u2014 his discipline is the river that shapes his realm.", ref: "Ancient Wisdom" },
  { text: "The discerning leader sees through pretence; his clarity is his greatest weapon.", ref: "Timeless Principle" },
  { text: "A man of integrity builds a kingdom that outlasts him; the greedy man builds on sand.", ref: "Royal Maxim" },
  { text: "The noblest pursuit is to uncover what lies hidden \u2014 curiosity is the crown of the wise.", ref: "Gentleman\u2019s Code" },
  { text: "Character elevates a man above his circumstances; its absence reduces him below them.", ref: "Classical Philosophy" },
  { text: "True mastery begins with humility \u2014 the wise man knows the limits of his knowledge.", ref: "Stoic Principle" },
  { text: "Surround yourself with those who sharpen your mind and challenge your spirit.", ref: "Mentor\u2019s Counsel" },
  { text: "Protect your inner world with fierce vigilance, for it shapes everything you become.", ref: "Royal Discipline" },
  { text: "No man succeeds alone; seek wise counsel before every significant decision.", ref: "Leadership Tenet" },
  { text: "Align your efforts with your highest purpose, and your path will unfold with clarity.", ref: "King\u2019s Philosophy" }
];

/* ---------- Navigation Links (private only) ---------- */
const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "nourishment.html", label: "Nourishment" },
  { href: "attire.html", label: "Attire" },
  { href: "mentality.html", label: "Mentality" },
  { href: "treasury.html", label: "Treasury" },
  { href: "body.html", label: "Body" },
  { href: "presence.html", label: "Presence" },
  { href: "speech.html", label: "Speech" },
  { href: "legacy.html", label: "Legacy" },
  { href: "journal.html", label: "Journal" },
  { href: "settings.html", label: "Settings" }
];

/* ============================================================
   AUTH STATE
   ============================================================ */
function isLoggedIn() {
  return localStorage.getItem('kl_isGuest') === 'false';
}

function ensureGuest() {
  if (!localStorage.getItem('kl_userId')) {
    const id = 'guest-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    localStorage.setItem('kl_userId', id);
    localStorage.setItem('kl_isGuest', 'true');
  }
  return localStorage.getItem('kl_userId');
}

function signOut() {
  localStorage.setItem('kl_isGuest', 'true');
  localStorage.removeItem('kl_userEmail');
  const id = 'guest-' + Math.random().toString(36).substring(2, 7).toUpperCase();
  localStorage.setItem('kl_userId', id);
  window.location.href = 'index.html';
}

function requireAuth() {
  if (!isLoggedIn()) {
    showAuthWall();
    return false;
  }
  return true;
}

function showAuthWall() {
  const wall = document.createElement('div');
  wall.className = 'min-h-screen bg-[#FFF6E6] flex items-center justify-center px-6 fixed inset-0 z-[200]';
  const inner = document.createElement('div');
  inner.className = 'text-center max-w-md';
  inner.style.animation = 'fadeInUp 0.6s ease-out';

  const crown = document.createElement('div');
  crown.className = 'flex justify-center mb-8';
  crown.innerHTML = CROWN_SVG;

  const h1 = document.createElement('h1');
  h1.className = 'font-cinzel text-2xl text-[#571641] mb-4';
  h1.textContent = 'Royal Access Required';

  const p = document.createElement('p');
  p.className = 'font-inter text-sm text-[#08052D]/60 mb-10 leading-relaxed';
  p.textContent = 'This area of the kingdom is reserved for those who have begun their transformation.';

  const a = document.createElement('a');
  a.href = 'index.html';
  a.className = 'inline-block px-8 py-3 bg-[#A38255] text-white font-cinzel tracking-wider rounded-lg hover:bg-[#571641] transition-all duration-500';
  a.textContent = 'Return to the Gates';

  const calyvent = document.createElement('p');
  calyvent.className = 'mt-6 text-xs text-[#08052D]/30 font-inter';
  calyvent.innerHTML = 'A <a href="https://calyvent.com" target="_blank" class="text-[#A38255] hover:underline">Calyvent</a> Venture';

  inner.append(crown, h1, p, a, calyvent);
  wall.appendChild(inner);
  document.body.textContent = '';
  document.body.appendChild(wall);
}

/* ============================================================
   BIBLE / SECULAR (persisted, toggled from settings)
   ============================================================ */
function getMode() {
  return localStorage.getItem('kl_bibleMode') !== 'false';
}
function setMode(bible) {
  localStorage.setItem('kl_bibleMode', bible ? 'true' : 'false');
  renderDailyPrinciple();
  document.querySelectorAll('[data-bible]').forEach(el => el.style.display = bible ? '' : 'none');
  document.querySelectorAll('[data-secular]').forEach(el => el.style.display = bible ? 'none' : '');
}

/* ============================================================
   DARK / LIGHT (persisted, toggled from settings)
   ============================================================ */
function getDark() {
  return localStorage.getItem('kl_dark') === 'true';
}
function setDark(dark) {
  localStorage.setItem('kl_dark', dark ? 'true' : 'false');
  document.documentElement.classList.toggle('dark', dark);
}

/* ============================================================
   DAILY PRINCIPLE
   ============================================================ */
function getDayIndex() {
  const start = new Date('2024-01-01').getTime();
  return Math.floor((Date.now() - start) / 86400000) % 10;
}
function renderDailyPrinciple() {
  const el = document.getElementById('dailyPrinciple');
  if (!el) return;
  const bible = getMode();
  const p = bible ? PRINCIPLES_BIBLE[getDayIndex()] : PRINCIPLES_SECULAR[getDayIndex()];
  el.textContent = '';
  const span1 = document.createElement('span');
  span1.className = 'font-playfair italic';
  span1.textContent = '\u201C' + p.text + '\u201D';
  const span2 = document.createElement('span');
  span2.className = 'ml-2 text-xs opacity-70';
  span2.textContent = '\u2014 ' + p.ref;
  el.append(span1, span2);
}

/* ============================================================
   STREAK
   ============================================================ */
function updateStreak() {
  const today = new Date().toDateString();
  const last = localStorage.getItem('kl_lastVisit');
  let streak = parseInt(localStorage.getItem('kl_streak') || '0');
  if (last !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    streak = (last === yesterday) ? streak + 1 : 1;
    localStorage.setItem('kl_streak', streak);
    localStorage.setItem('kl_lastVisit', today);
  }
  const el = document.getElementById('streakCount');
  if (el) el.textContent = streak;
}

/* ============================================================
   BUILD NAVIGATION (private pages only — sticky dark green)
   ============================================================ */
function buildNav() {
  const nav = document.getElementById('mainNav');
  if (!nav || !isLoggedIn()) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  nav.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'bg-[#052B20] text-white sticky top-0 z-50 shadow-lg';

  // Daily Principle Bar
  const principleBar = document.createElement('div');
  principleBar.className = 'bg-[#08052D] text-[#A38255] text-center text-sm py-2 px-4 font-playfair';
  principleBar.id = 'dailyPrinciple';

  // Main Nav Bar
  const mainBar = document.createElement('div');
  mainBar.className = 'max-w-7xl mx-auto px-4 py-3 flex items-center justify-between';

  // Logo
  const logo = document.createElement('a');
  logo.href = 'index.html';
  logo.className = 'flex items-center gap-3 group';
  logo.innerHTML = CROWN_SVG;
  const logoText = document.createElement('span');
  logoText.className = 'font-cinzel text-lg tracking-widest text-[#A38255] group-hover:text-white transition-colors hidden sm:inline';
  logoText.textContent = "A King\u2019s Lifestyle";
  logo.appendChild(logoText);

  // Desktop Links
  const deskLinks = document.createElement('div');
  deskLinks.className = 'hidden lg:flex items-center gap-1';
  NAV_LINKS.forEach(l => {
    const a = document.createElement('a');
    a.href = l.href;
    a.className = 'px-3 py-1.5 rounded text-sm font-inter transition-colors ' +
      (currentPage === l.href ? 'bg-[#A38255]/20 text-[#A38255]' : 'text-white/80 hover:text-[#A38255]');
    a.textContent = l.label;
    deskLinks.appendChild(a);
  });

  // Controls
  const controls = document.createElement('div');
  controls.className = 'flex items-center gap-3';

  const streakSpan = document.createElement('span');
  streakSpan.className = 'text-xs text-[#A38255] font-inter hidden sm:inline';
  streakSpan.title = 'Day streak';
  streakSpan.textContent = 'Streak: ';
  const streakNum = document.createElement('span');
  streakNum.id = 'streakCount';
  streakNum.textContent = '0';
  streakSpan.appendChild(streakNum);

  const signOutBtn = document.createElement('button');
  signOutBtn.className = 'text-xs font-inter px-3 py-1.5 rounded border border-[#A38255]/30 text-[#A38255] hover:bg-[#A38255]/20 transition';
  signOutBtn.textContent = 'Sign Out';
  signOutBtn.onclick = signOut;

  const mobileBtn = document.createElement('button');
  mobileBtn.className = 'lg:hidden w-8 h-8 flex items-center justify-center text-[#A38255]';
  mobileBtn.innerHTML = '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
  mobileBtn.onclick = toggleMobileMenu;

  controls.append(streakSpan, signOutBtn, mobileBtn);
  mainBar.append(logo, deskLinks, controls);

  // Mobile Menu
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobileMenu';
  mobileMenu.className = 'lg:hidden hidden bg-[#052B20] border-t border-[#A38255]/20 pb-4';
  const mobileInner = document.createElement('div');
  mobileInner.className = 'flex flex-col px-4 gap-1';
  NAV_LINKS.forEach(l => {
    const a = document.createElement('a');
    a.href = l.href;
    a.className = 'px-3 py-2 rounded text-sm font-inter ' +
      (currentPage === l.href ? 'bg-[#A38255]/20 text-[#A38255]' : 'text-white/80 hover:text-[#A38255]');
    a.textContent = l.label;
    mobileInner.appendChild(a);
  });
  mobileMenu.appendChild(mobileInner);

  wrapper.append(principleBar, mainBar, mobileMenu);
  nav.appendChild(wrapper);
}

function toggleMobileMenu() {
  document.getElementById('mobileMenu')?.classList.toggle('hidden');
}

/* ============================================================
   BUILD PRIVATE FOOTER
   ============================================================ */
function buildFooter() {
  const footer = document.getElementById('mainFooter');
  if (!footer) return;

  footer.textContent = '';
  const f = document.createElement('footer');
  f.className = 'bg-[#052B20] text-white/60 mt-20';

  const grid = document.createElement('div');
  grid.className = 'max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8';

  // Col 1 — Brand
  const col1 = document.createElement('div');
  const brandRow = document.createElement('div');
  brandRow.className = 'flex items-center gap-3 mb-4';
  brandRow.innerHTML = CROWN_SVG;
  const brandName = document.createElement('span');
  brandName.className = 'font-cinzel text-[#A38255] tracking-widest';
  brandName.textContent = "A King\u2019s Lifestyle";
  brandRow.appendChild(brandName);
  const tagline = document.createElement('p');
  tagline.className = 'text-sm font-inter leading-relaxed';
  tagline.textContent = 'Genuine Transformation, No Shortcuts.';
  col1.append(brandRow, tagline);

  // Col 2 — Pillars
  const col2 = document.createElement('div');
  const col2h = document.createElement('h4');
  col2h.className = 'font-cinzel text-[#A38255] mb-3 text-sm tracking-wider';
  col2h.textContent = 'The Seven Pillars';
  const col2grid = document.createElement('div');
  col2grid.className = 'grid grid-cols-2 gap-1 text-sm font-inter';
  ['nourishment','attire','mentality','treasury','body','presence','speech','legacy'].forEach(p => {
    const a = document.createElement('a');
    a.href = p + '.html';
    a.className = 'hover:text-[#A38255] transition capitalize';
    a.textContent = p.charAt(0).toUpperCase() + p.slice(1);
    col2grid.appendChild(a);
  });
  col2.append(col2h, col2grid);

  // Col 3 — Quick Links
  const col3 = document.createElement('div');
  const col3h = document.createElement('h4');
  col3h.className = 'font-cinzel text-[#A38255] mb-3 text-sm tracking-wider';
  col3h.textContent = 'Quick Links';
  const col3links = document.createElement('div');
  col3links.className = 'flex flex-col gap-1 text-sm font-inter';
  [['journal.html','Journal'],['onboarding.html','Onboarding'],['settings.html','Settings'],['privacy.html','Privacy'],['terms.html','Terms']].forEach(([href,label]) => {
    const a = document.createElement('a');
    a.href = href;
    a.className = 'hover:text-[#A38255] transition';
    a.textContent = label;
    col3links.appendChild(a);
  });
  col3.append(col3h, col3links);

  grid.append(col1, col2, col3);

  // Bottom bar
  const bottom = document.createElement('div');
  bottom.className = 'border-t border-[#A38255]/10 text-center py-4 text-xs font-inter';
  bottom.innerHTML = '&copy; ' + new Date().getFullYear() + ' A King\u2019s Lifestyle. A <a href="https://calyvent.com" target="_blank" class="text-[#A38255] hover:underline">Calyvent</a> Venture. All rights reserved.';

  f.append(grid, bottom);
  footer.appendChild(f);
}

/* ============================================================
   BUILD PUBLIC FOOTER (landing page + public pages)
   ============================================================ */
function buildPublicFooter() {
  const footer = document.getElementById('publicFooter');
  if (!footer) return;

  footer.textContent = '';
  const f = document.createElement('footer');
  f.className = 'bg-[#052B20] text-white/60 mt-24';
  const inner = document.createElement('div');
  inner.className = 'max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6';

  const brand = document.createElement('div');
  brand.className = 'flex items-center gap-3';
  brand.innerHTML = CROWN_SVG;
  const bName = document.createElement('span');
  bName.className = 'font-cinzel text-[#A38255] tracking-widest text-sm';
  bName.textContent = "A King\u2019s Lifestyle";
  brand.appendChild(bName);

  const links = document.createElement('div');
  links.className = 'flex items-center gap-8 text-sm font-inter';
  [['privacy.html','Privacy'],['terms.html','Terms']].forEach(([href,label]) => {
    const a = document.createElement('a');
    a.href = href;
    a.className = 'hover:text-[#A38255] transition';
    a.textContent = label;
    links.appendChild(a);
  });

  const calyvent = document.createElement('p');
  calyvent.className = 'text-xs font-inter';
  calyvent.innerHTML = 'A <a href="https://calyvent.com" target="_blank" class="text-[#A38255] hover:underline">Calyvent</a> Venture';

  inner.append(brand, links, calyvent);
  f.appendChild(inner);
  footer.appendChild(f);
}

/* ============================================================
   SIGN-IN MODAL (with guest data migration)
   ============================================================ */
let authMode = 'login';

function openSignIn(defaultTab) {
  if (document.getElementById('signInModal')) return;
  authMode = defaultTab || 'login';

  const modal = document.createElement('div');
  modal.id = 'signInModal';
  modal.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm';
  modal.style.animation = 'fadeIn 0.3s ease-out';
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

  const card = document.createElement('div');
  card.className = 'bg-[#FFF6E6] rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 relative border border-[#A38255]/20';
  card.style.animation = 'fadeInUp 0.4s ease-out';

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'absolute top-4 right-4 text-[#571641] text-2xl hover:text-[#A38255] transition leading-none';
  closeBtn.textContent = '\u00D7';
  closeBtn.onclick = () => modal.remove();

  // Header
  const header = document.createElement('div');
  header.className = 'text-center mb-8';
  const crownWrap = document.createElement('div');
  crownWrap.className = 'flex justify-center';
  crownWrap.innerHTML = CROWN_SVG;
  const title = document.createElement('h2');
  title.className = 'font-cinzel text-[#571641] text-xl mt-4';
  title.textContent = 'Enter the Kingdom';
  const subtitle = document.createElement('p');
  subtitle.className = 'font-inter text-xs text-[#08052D]/40 mt-1';
  subtitle.textContent = 'Your transformation awaits.';
  header.append(crownWrap, title, subtitle);

  // Tabs
  const tabs = document.createElement('div');
  tabs.className = 'flex mb-6 border-b border-[#A38255]/20';
  const tabLogin = document.createElement('button');
  tabLogin.id = 'tabLogin';
  tabLogin.textContent = 'Sign In';
  tabLogin.onclick = () => showAuthTab('login');
  const tabRegister = document.createElement('button');
  tabRegister.id = 'tabRegister';
  tabRegister.textContent = 'Create Account';
  tabRegister.onclick = () => showAuthTab('register');
  tabs.append(tabLogin, tabRegister);
  showAuthTabStyle(tabLogin, tabRegister, authMode);

  // Form
  const form = document.createElement('form');
  form.className = 'space-y-4';
  form.onsubmit = handleAuth;

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'authEmail';
  emailInput.placeholder = 'Email';
  emailInput.required = true;
  emailInput.className = 'w-full px-4 py-3 rounded-lg border border-[#A38255]/30 bg-white/50 font-inter text-sm text-[#08052D] focus:outline-none focus:border-[#A38255] transition';

  const passInput = document.createElement('input');
  passInput.type = 'password';
  passInput.id = 'authPassword';
  passInput.placeholder = 'Password';
  passInput.required = true;
  passInput.minLength = 6;
  passInput.className = 'w-full px-4 py-3 rounded-lg border border-[#A38255]/30 bg-white/50 font-inter text-sm text-[#08052D] focus:outline-none focus:border-[#A38255] transition';

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'w-full py-3 bg-[#A38255] text-white font-cinzel tracking-wider rounded-lg hover:bg-[#571641] transition-all duration-500';
  submitBtn.textContent = 'Enter';

  form.append(emailInput, passInput, submitBtn);

  const msg = document.createElement('div');
  msg.id = 'authMessage';
  msg.className = 'mt-4 text-center text-sm font-inter text-[#571641]';

  card.append(closeBtn, header, tabs, form, msg);
  modal.appendChild(card);
  document.body.appendChild(modal);
  emailInput.focus();
}

function showAuthTab(mode) {
  authMode = mode;
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  if (tabLogin && tabRegister) showAuthTabStyle(tabLogin, tabRegister, mode);
}

function showAuthTabStyle(tabLogin, tabRegister, mode) {
  const active = 'flex-1 py-2 font-inter text-sm border-b-2 border-[#A38255] text-[#571641]';
  const inactive = 'flex-1 py-2 font-inter text-sm border-b-2 border-transparent text-[#571641]/40';
  tabLogin.className = mode === 'login' ? active : inactive;
  tabRegister.className = mode === 'register' ? active : inactive;
}

function hasGuestData() {
  return !!(
    localStorage.getItem('kl_journal') ||
    localStorage.getItem('kl_progress') ||
    localStorage.getItem('kl_onboarding') ||
    Object.keys(localStorage).some(k => k.startsWith('kl_checklist_'))
  );
}

function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById('authEmail').value;
  const msg = document.getElementById('authMessage');

  // Supabase placeholder — swap with real auth
  localStorage.setItem('kl_userEmail', email);
  localStorage.setItem('kl_isGuest', 'false');
  localStorage.setItem('kl_userId', email);

  msg.textContent = authMode === 'register'
    ? 'Account created. Welcome to the Kingdom.'
    : 'Welcome back, King.';

  if (hasGuestData()) {
    setTimeout(() => {
      if (confirm('Migrate previous progress from guest session?\n\nThis will transfer your journal entries, checklists, onboarding answers, and pillar progress to your new account.')) {
        msg.textContent = 'Progress migrated successfully.';
      } else {
        Object.keys(localStorage)
          .filter(k => k.startsWith('kl_') && !['kl_userId','kl_userEmail','kl_isGuest','kl_bibleMode','kl_dark'].includes(k))
          .forEach(k => localStorage.removeItem(k));
      }
      setTimeout(() => location.reload(), 600);
    }, 500);
  } else {
    setTimeout(() => location.reload(), 800);
  }
}

/* ============================================================
   ASK THE KING CHAT (floating button + modal)
   ============================================================ */
const KING_RESPONSES = [
  "A king does not react \u2014 he responds with measured wisdom. Consider what outcome truly serves your kingdom.",
  "Every challenge is merely a lesson dressed in difficulty. What is this moment teaching you?",
  "The gentleman\u2019s way is patience. Let others rush; you move with purpose and precision.",
  "Your character is your crown. No circumstance can remove what you have built within.",
  "A wise king listens twice as much as he speaks. Seek first to understand, then to be understood.",
  "Discipline today purchases the freedom you desire tomorrow. Stay the course.",
  "The mark of royalty is not in the crown but in the composure under fire.",
  "Guard your energy as a king guards his treasury. Not everyone deserves your time."
];

function buildAskTheKing() {
  if (document.getElementById('askKingFloat')) return;
  const btn = document.createElement('button');
  btn.id = 'askKingFloat';
  btn.className = 'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#A38255] text-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center';
  btn.innerHTML = CROWN_SM;
  btn.title = 'Ask the King';
  btn.onclick = toggleKingChat;
  document.body.appendChild(btn);
}

function toggleKingChat() {
  const existing = document.getElementById('kingChatModal');
  if (existing) { existing.remove(); return; }

  const modal = document.createElement('div');
  modal.id = 'kingChatModal';
  modal.className = 'fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-[#FFF6E6] dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-[#A38255]/30 overflow-hidden';
  modal.style.animation = 'fadeInUp 0.3s ease-out';

  // Header
  const chatHeader = document.createElement('div');
  chatHeader.className = 'bg-[#052B20] px-4 py-3 flex items-center justify-between';
  const chatTitle = document.createElement('span');
  chatTitle.className = 'font-cinzel text-[#A38255] text-sm tracking-wider';
  chatTitle.textContent = 'Ask the King';
  const chatClose = document.createElement('button');
  chatClose.className = 'text-[#A38255] hover:text-white transition text-lg leading-none';
  chatClose.textContent = '\u00D7';
  chatClose.onclick = () => modal.remove();
  chatHeader.append(chatTitle, chatClose);

  // Messages
  const chatMessages = document.createElement('div');
  chatMessages.id = 'kingChatMessages';
  chatMessages.className = 'h-64 overflow-y-auto p-4 space-y-3';
  const intro = document.createElement('div');
  intro.className = 'text-sm font-playfair text-[#571641]/60 dark:text-[#A38255]/60 italic';
  intro.textContent = 'Speak your question, and the King shall counsel you...';
  chatMessages.appendChild(intro);

  // Input form
  const chatForm = document.createElement('form');
  chatForm.className = 'flex border-t border-[#A38255]/20';
  const chatInput = document.createElement('input');
  chatInput.type = 'text';
  chatInput.id = 'kingChatInput';
  chatInput.placeholder = 'Ask anything...';
  chatInput.className = 'flex-1 px-4 py-3 bg-transparent font-inter text-sm text-[#08052D] dark:text-white/80 focus:outline-none';
  const chatSubmit = document.createElement('button');
  chatSubmit.type = 'submit';
  chatSubmit.className = 'px-4 text-[#A38255] hover:text-[#571641] transition text-lg';
  chatSubmit.textContent = '\u279E';
  chatForm.append(chatInput, chatSubmit);
  chatForm.onsubmit = sendKingMessage;

  modal.append(chatHeader, chatMessages, chatForm);
  document.body.appendChild(modal);
  chatInput.focus();
}

function sendKingMessage(e) {
  e.preventDefault();
  const input = document.getElementById('kingChatInput');
  const messages = document.getElementById('kingChatMessages');
  const q = input.value.trim();
  if (!q) return;

  // User message (escaped)
  const userMsg = document.createElement('div');
  userMsg.className = 'text-sm font-inter text-right text-[#052B20] dark:text-white/80';
  const userBubble = document.createElement('span');
  userBubble.className = 'bg-[#A38255]/10 px-3 py-2 rounded-lg inline-block max-w-[80%]';
  userBubble.textContent = q;
  userMsg.appendChild(userBubble);
  messages.appendChild(userMsg);
  input.value = '';
  messages.scrollTop = messages.scrollHeight;

  // King response
  setTimeout(() => {
    const response = KING_RESPONSES[Math.floor(Math.random() * KING_RESPONSES.length)];
    const kingMsg = document.createElement('div');
    kingMsg.className = 'text-sm font-playfair text-[#571641] dark:text-[#A38255]';
    const kingBubble = document.createElement('span');
    kingBubble.className = 'bg-[#052B20]/5 dark:bg-white/5 px-3 py-2 rounded-lg inline-block max-w-[80%] italic';
    kingBubble.textContent = response;
    kingMsg.appendChild(kingBubble);
    messages.appendChild(kingMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 600);
}

/* ============================================================
   JOURNAL
   ============================================================ */
function saveJournalEntry(pillar, prompt, answer) {
  const entries = JSON.parse(localStorage.getItem('kl_journal') || '[]');
  entries.push({ pillar, prompt, answer, date: new Date().toISOString() });
  localStorage.setItem('kl_journal', JSON.stringify(entries));
}
function getJournalEntries() {
  return JSON.parse(localStorage.getItem('kl_journal') || '[]');
}

/* ============================================================
   CHECKLIST
   ============================================================ */
function saveChecklist(pillar, items) {
  localStorage.setItem('kl_checklist_' + pillar, JSON.stringify(items));
}
function getChecklist(pillar) {
  return JSON.parse(localStorage.getItem('kl_checklist_' + pillar) || '[]');
}

/* ============================================================
   PILLAR PROGRESS
   ============================================================ */
function savePillarProgress(pillar, section, completed) {
  const progress = JSON.parse(localStorage.getItem('kl_progress') || '{}');
  if (!progress[pillar]) progress[pillar] = {};
  progress[pillar][section] = completed;
  localStorage.setItem('kl_progress', JSON.stringify(progress));
}
function getPillarProgress() {
  return JSON.parse(localStorage.getItem('kl_progress') || '{}');
}

/* ============================================================
   ONBOARDING
   ============================================================ */
function saveOnboarding(data) {
  localStorage.setItem('kl_onboarding', JSON.stringify(data));
}
function getOnboarding() {
  return JSON.parse(localStorage.getItem('kl_onboarding') || 'null');
}

/* ============================================================
   INIT HELPERS
   ============================================================ */
function initPrivate() {
  buildNav();
  buildFooter();
  renderDailyPrinciple();
  updateStreak();
  setDark(getDark());
  setMode(getMode());
  buildAskTheKing();
}

function initPublic() {
  ensureGuest();
  buildPublicFooter();
}

/* ============================================================
   SERVICE WORKER
   ============================================================ */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

/* ============================================================
   SUPABASE PLACEHOLDER
   ============================================================ */
// const SUPABASE_URL = 'https://your-project.supabase.co';
// const SUPABASE_KEY = 'your-anon-key';
// const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
