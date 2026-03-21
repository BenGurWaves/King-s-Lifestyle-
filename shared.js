/* ============================================================
   A King's Lifestyle — Shared Module
   ============================================================ */

/* ---------- SVG Crown Logo ---------- */
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

/* ---------- Daily Royal Principles ---------- */
const PRINCIPLES_BIBLE = [
  { text: "A king's heart is in the hand of the Lord; He directs it like a watercourse wherever He pleases.", ref: "Proverbs 21:1" },
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
  { text: "A true king governs himself before he governs others — his discipline is the river that shapes his realm.", ref: "Ancient Wisdom" },
  { text: "The discerning leader sees through pretence; his clarity is his greatest weapon.", ref: "Timeless Principle" },
  { text: "A man of integrity builds a kingdom that outlasts him; the greedy man builds on sand.", ref: "Royal Maxim" },
  { text: "The noblest pursuit is to uncover what lies hidden — curiosity is the crown of the wise.", ref: "Gentleman's Code" },
  { text: "Character elevates a man above his circumstances; its absence reduces him below them.", ref: "Classical Philosophy" },
  { text: "True mastery begins with humility — the wise man knows the limits of his knowledge.", ref: "Stoic Principle" },
  { text: "Surround yourself with those who sharpen your mind and challenge your spirit.", ref: "Mentor's Counsel" },
  { text: "Protect your inner world with fierce vigilance, for it shapes everything you become.", ref: "Royal Discipline" },
  { text: "No man succeeds alone; seek wise counsel before every significant decision.", ref: "Leadership Tenet" },
  { text: "Align your efforts with your highest purpose, and your path will unfold with clarity.", ref: "King's Philosophy" }
];

/* ---------- Navigation Links ---------- */
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

/* ---------- Guest ID ---------- */
function ensureGuest() {
  if (!localStorage.getItem('kl_userId')) {
    const id = 'guest-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    localStorage.setItem('kl_userId', id);
    localStorage.setItem('kl_isGuest', 'true');
  }
  return localStorage.getItem('kl_userId');
}

/* ---------- Bible / Secular Toggle ---------- */
function getMode() {
  return localStorage.getItem('kl_bibleMode') !== 'false'; // default Bible
}
function setMode(bible) {
  localStorage.setItem('kl_bibleMode', bible ? 'true' : 'false');
  renderDailyPrinciple();
  document.querySelectorAll('[data-bible]').forEach(el => el.style.display = bible ? '' : 'none');
  document.querySelectorAll('[data-secular]').forEach(el => el.style.display = bible ? 'none' : '');
}

/* ---------- Dark / Light ---------- */
function getDark() {
  return localStorage.getItem('kl_dark') === 'true';
}
function setDark(dark) {
  localStorage.setItem('kl_dark', dark ? 'true' : 'false');
  document.documentElement.classList.toggle('dark', dark);
  const btn = document.getElementById('darkToggleBtn');
  if (btn) btn.textContent = dark ? '☀' : '☾';
}

/* ---------- Daily Principle ---------- */
function getDayIndex() {
  const start = new Date('2024-01-01').getTime();
  return Math.floor((Date.now() - start) / 86400000) % 10;
}
function renderDailyPrinciple() {
  const el = document.getElementById('dailyPrinciple');
  if (!el) return;
  const bible = getMode();
  const p = bible ? PRINCIPLES_BIBLE[getDayIndex()] : PRINCIPLES_SECULAR[getDayIndex()];
  el.innerHTML = `<span class="font-playfair italic">"${p.text}"</span> <span class="ml-2 text-xs opacity-70">— ${p.ref}</span>`;
}

/* ---------- Progress Streak ---------- */
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

/* ---------- Build Navigation ---------- */
function buildNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const bible = getMode();
  const dark = getDark();

  nav.innerHTML = `
    <div class="bg-[#052B20] text-white sticky top-0 z-50 shadow-lg">
      <!-- Daily Principle Bar -->
      <div class="bg-[#08052D] text-[#A38255] text-center text-sm py-2 px-4 font-playfair" id="dailyPrinciple"></div>
      <!-- Main Nav -->
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="index.html" class="flex items-center gap-3 group">
          ${CROWN_SVG}
          <span class="font-cinzel text-lg tracking-widest text-[#A38255] group-hover:text-white transition-colors hidden sm:inline">A King's Lifestyle</span>
        </a>
        <!-- Desktop Links -->
        <div class="hidden lg:flex items-center gap-1">
          ${NAV_LINKS.map(l => `<a href="${l.href}" class="px-3 py-1.5 rounded text-sm font-inter transition-colors ${currentPage === l.href ? 'bg-[#A38255]/20 text-[#A38255]' : 'text-white/80 hover:text-[#A38255]'}">${l.label}</a>`).join('')}
        </div>
        <!-- Controls -->
        <div class="flex items-center gap-3">
          <span class="text-xs text-[#A38255] font-inter hidden sm:inline" title="Day streak">🔥 <span id="streakCount">0</span></span>
          <button id="darkToggleBtn" onclick="setDark(!getDark())" class="w-8 h-8 rounded-full bg-[#A38255]/20 text-[#A38255] hover:bg-[#A38255]/40 transition text-sm" title="Dark/Light mode">${dark ? '☀' : '☾'}</button>
          <button id="bibleToggleBtn" onclick="setMode(!getMode())" class="text-xs font-inter px-2 py-1 rounded border border-[#A38255]/30 text-[#A38255] hover:bg-[#A38255]/20 transition" title="Bible/Secular toggle">${bible ? 'Bible' : 'Secular'}</button>
          <button onclick="openSignIn()" class="text-xs font-inter px-3 py-1.5 rounded bg-[#A38255] text-[#052B20] hover:bg-[#A38255]/80 transition font-semibold" id="signInBtn">${localStorage.getItem('kl_isGuest') !== 'false' ? 'Sign In' : 'Account'}</button>
          <button id="mobileMenuBtn" class="lg:hidden w-8 h-8 flex items-center justify-center text-[#A38255]" onclick="toggleMobileMenu()">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </div>
      <!-- Mobile Menu -->
      <div id="mobileMenu" class="lg:hidden hidden bg-[#052B20] border-t border-[#A38255]/20 pb-4">
        <div class="flex flex-col px-4 gap-1">
          ${NAV_LINKS.map(l => `<a href="${l.href}" class="px-3 py-2 rounded text-sm font-inter ${currentPage === l.href ? 'bg-[#A38255]/20 text-[#A38255]' : 'text-white/80 hover:text-[#A38255]'}">${l.label}</a>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function toggleMobileMenu() {
  document.getElementById('mobileMenu')?.classList.toggle('hidden');
}

/* ---------- Build Footer ---------- */
function buildFooter() {
  const footer = document.getElementById('mainFooter');
  if (!footer) return;
  footer.innerHTML = `
    <footer class="bg-[#052B20] text-white/60 mt-20">
      <div class="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div class="flex items-center gap-3 mb-4">${CROWN_SVG}<span class="font-cinzel text-[#A38255] tracking-widest">A King's Lifestyle</span></div>
          <p class="text-sm font-inter leading-relaxed">Master the Ways of a King and Gentleman — Genuine Transformation, No Shortcuts.</p>
        </div>
        <div>
          <h4 class="font-cinzel text-[#A38255] mb-3 text-sm tracking-wider">The Seven Pillars</h4>
          <div class="grid grid-cols-2 gap-1 text-sm font-inter">
            <a href="nourishment.html" class="hover:text-[#A38255] transition">Nourishment</a>
            <a href="attire.html" class="hover:text-[#A38255] transition">Attire</a>
            <a href="mentality.html" class="hover:text-[#A38255] transition">Mentality</a>
            <a href="treasury.html" class="hover:text-[#A38255] transition">Treasury</a>
            <a href="body.html" class="hover:text-[#A38255] transition">Body</a>
            <a href="presence.html" class="hover:text-[#A38255] transition">Presence</a>
            <a href="speech.html" class="hover:text-[#A38255] transition">Speech</a>
            <a href="legacy.html" class="hover:text-[#A38255] transition">Legacy</a>
          </div>
        </div>
        <div>
          <h4 class="font-cinzel text-[#A38255] mb-3 text-sm tracking-wider">Quick Links</h4>
          <div class="flex flex-col gap-1 text-sm font-inter">
            <a href="journal.html" class="hover:text-[#A38255] transition">Journal</a>
            <a href="onboarding.html" class="hover:text-[#A38255] transition">Onboarding</a>
            <a href="settings.html" class="hover:text-[#A38255] transition">Settings</a>
          </div>
        </div>
      </div>
      <div class="border-t border-[#A38255]/10 text-center py-4 text-xs font-inter">
        &copy; ${new Date().getFullYear()} A King's Lifestyle. Built by <a href="https://calyvent.com" target="_blank" class="text-[#A38255] hover:underline">Calyvent</a>. All rights reserved.
      </div>
    </footer>
  `;
}

/* ---------- Sign-In Modal ---------- */
function openSignIn() {
  if (document.getElementById('signInModal')) return;
  const modal = document.createElement('div');
  modal.id = 'signInModal';
  modal.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn';
  modal.innerHTML = `
    <div class="bg-[#FFF6E6] dark:bg-[#0a0a0a] rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 relative border border-[#A38255]/20">
      <button onclick="document.getElementById('signInModal').remove()" class="absolute top-4 right-4 text-[#571641] text-xl hover:text-[#A38255]">&times;</button>
      <div class="text-center mb-6">${CROWN_SVG}<h2 class="font-cinzel text-[#571641] text-xl mt-3">Enter the Kingdom</h2></div>
      <div id="authTabs" class="flex mb-6 border-b border-[#A38255]/20">
        <button onclick="showAuthTab('login')" class="flex-1 py-2 font-inter text-sm border-b-2 border-[#A38255] text-[#571641]" id="tabLogin">Sign In</button>
        <button onclick="showAuthTab('register')" class="flex-1 py-2 font-inter text-sm border-b-2 border-transparent text-[#571641]/50" id="tabRegister">Create Account</button>
      </div>
      <form id="authForm" onsubmit="handleAuth(event)" class="space-y-4">
        <input type="email" id="authEmail" placeholder="Email" required class="w-full px-4 py-3 rounded-lg border border-[#A38255]/30 bg-white/50 font-inter text-sm focus:outline-none focus:border-[#A38255]">
        <input type="password" id="authPassword" placeholder="Password" required class="w-full px-4 py-3 rounded-lg border border-[#A38255]/30 bg-white/50 font-inter text-sm focus:outline-none focus:border-[#A38255]">
        <button type="submit" class="w-full py-3 bg-[#A38255] text-white font-cinzel rounded-lg hover:bg-[#8a6d47] transition">Enter</button>
      </form>
      <div id="authMessage" class="mt-4 text-center text-sm font-inter text-[#571641]"></div>
    </div>
  `;
  document.body.appendChild(modal);
}

let authMode = 'login';
function showAuthTab(mode) {
  authMode = mode;
  document.getElementById('tabLogin').className = `flex-1 py-2 font-inter text-sm border-b-2 ${mode === 'login' ? 'border-[#A38255] text-[#571641]' : 'border-transparent text-[#571641]/50'}`;
  document.getElementById('tabRegister').className = `flex-1 py-2 font-inter text-sm border-b-2 ${mode === 'register' ? 'border-[#A38255] text-[#571641]' : 'border-transparent text-[#571641]/50'}`;
}

function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById('authEmail').value;
  const msg = document.getElementById('authMessage');
  if (authMode === 'register') {
    // Supabase-ready placeholder
    localStorage.setItem('kl_userEmail', email);
    localStorage.setItem('kl_isGuest', 'false');
    msg.textContent = 'Account created! Welcome to the Kingdom.';
    if (localStorage.getItem('kl_userId')?.startsWith('guest-')) {
      setTimeout(() => {
        if (confirm('Migrate your previous guest progress to this account?')) {
          msg.textContent = 'Progress migrated successfully.';
        }
        localStorage.setItem('kl_userId', email);
        setTimeout(() => location.reload(), 800);
      }, 600);
    }
  } else {
    localStorage.setItem('kl_userEmail', email);
    localStorage.setItem('kl_isGuest', 'false');
    localStorage.setItem('kl_userId', email);
    msg.textContent = 'Welcome back, King.';
    setTimeout(() => location.reload(), 800);
  }
}

/* ---------- Ask the King Chat ---------- */
function buildAskTheKing() {
  if (document.getElementById('askKingFloat')) return;
  const btn = document.createElement('button');
  btn.id = 'askKingFloat';
  btn.className = 'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#A38255] text-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center';
  btn.innerHTML = CROWN_SVG.replace('width="44"', 'width="28"').replace('height="33"', 'height="21"');
  btn.title = 'Ask the King';
  btn.onclick = openKingChat;
  document.body.appendChild(btn);
}

function openKingChat() {
  if (document.getElementById('kingChatModal')) {
    document.getElementById('kingChatModal').remove();
    return;
  }
  const modal = document.createElement('div');
  modal.id = 'kingChatModal';
  modal.className = 'fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-[#FFF6E6] dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-[#A38255]/30 overflow-hidden animate-fadeIn';
  modal.innerHTML = `
    <div class="bg-[#052B20] px-4 py-3 flex items-center justify-between">
      <span class="font-cinzel text-[#A38255] text-sm">Ask the King</span>
      <button onclick="document.getElementById('kingChatModal').remove()" class="text-[#A38255] hover:text-white">&times;</button>
    </div>
    <div id="kingChatMessages" class="h-64 overflow-y-auto p-4 space-y-3">
      <div class="text-sm font-inter text-[#571641]/70 italic">Speak your question, and the King shall counsel you...</div>
    </div>
    <form onsubmit="sendKingMessage(event)" class="flex border-t border-[#A38255]/20">
      <input type="text" id="kingChatInput" placeholder="Ask anything..." class="flex-1 px-4 py-3 bg-transparent font-inter text-sm focus:outline-none">
      <button type="submit" class="px-4 text-[#A38255] hover:text-[#571641] transition">&#10148;</button>
    </form>
  `;
  document.body.appendChild(modal);
}

const KING_RESPONSES = [
  "A king does not react — he responds with measured wisdom. Consider what outcome truly serves your kingdom.",
  "Remember: every challenge is merely a lesson dressed in difficulty. What is this moment teaching you?",
  "The gentleman's way is patience. Let others rush; you move with purpose and precision.",
  "Your character is your crown. No circumstance can remove what you have built within.",
  "A wise king listens twice as much as he speaks. Seek first to understand, then to be understood.",
  "Discipline today purchases the freedom you desire tomorrow. Stay the course.",
  "The mark of royalty is not in the crown but in the composure under fire.",
  "Guard your energy as a king guards his treasury. Not everyone deserves your time."
];

function sendKingMessage(e) {
  e.preventDefault();
  const input = document.getElementById('kingChatInput');
  const messages = document.getElementById('kingChatMessages');
  const q = input.value.trim();
  if (!q) return;
  messages.innerHTML += `<div class="text-sm font-inter text-right text-[#052B20] dark:text-white/80"><span class="bg-[#A38255]/10 px-3 py-1.5 rounded-lg inline-block">${q}</span></div>`;
  input.value = '';
  setTimeout(() => {
    const response = KING_RESPONSES[Math.floor(Math.random() * KING_RESPONSES.length)];
    messages.innerHTML += `<div class="text-sm font-playfair text-[#571641] dark:text-[#A38255]"><span class="bg-[#052B20]/5 px-3 py-1.5 rounded-lg inline-block italic">${response}</span></div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 600);
}

/* ---------- Journal Save Helper ---------- */
function saveJournalEntry(pillar, prompt, answer) {
  const entries = JSON.parse(localStorage.getItem('kl_journal') || '[]');
  entries.push({ pillar, prompt, answer, date: new Date().toISOString() });
  localStorage.setItem('kl_journal', JSON.stringify(entries));
}

/* ---------- Checklist Helper ---------- */
function saveChecklist(pillar, items) {
  localStorage.setItem('kl_checklist_' + pillar, JSON.stringify(items));
}
function getChecklist(pillar) {
  return JSON.parse(localStorage.getItem('kl_checklist_' + pillar) || '[]');
}

/* ---------- Pillar Progress ---------- */
function savePillarProgress(pillar, section, completed) {
  const progress = JSON.parse(localStorage.getItem('kl_progress') || '{}');
  if (!progress[pillar]) progress[pillar] = {};
  progress[pillar][section] = completed;
  localStorage.setItem('kl_progress', JSON.stringify(progress));
}

/* ---------- Init ---------- */
function initKingsLifestyle() {
  ensureGuest();
  buildNav();
  buildFooter();
  renderDailyPrinciple();
  updateStreak();
  setDark(getDark());
  buildAskTheKing();
}

document.addEventListener('DOMContentLoaded', initKingsLifestyle);

/* ---------- Service Worker Registration ---------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

/* ---------- Supabase Placeholder ---------- */
// const SUPABASE_URL = 'https://your-project.supabase.co';
// const SUPABASE_KEY = 'your-anon-key';
// const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
