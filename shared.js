/* shared.js – v0.0.7 */
/* ============================================================
   A King's Lifestyle — Core Module
   Auth · Campuses · Navigation · Verse Modal · LLM · Quests
   Bible-only. No secular mode.
   ============================================================ */

/* ---------- Crown SVG ---------- */
const CROWN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" width="44" height="33" fill="none" stroke="#A38255" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 48 L18 18 L40 30 L62 18 L70 48 Z"/><line x1="18" y1="18" x2="18" y2="13"/><circle cx="18" cy="11" r="2.5"/><line x1="40" y1="30" x2="40" y2="8"/><circle cx="40" cy="6" r="3"/><line x1="62" y1="18" x2="62" y2="13"/><circle cx="62" cy="11" r="2.5"/><line x1="8" y1="52" x2="72" y2="52"/></svg>`;
const CROWN_SM = CROWN_SVG.replace('width="44"','width="28"').replace('height="33"','height="21"');

/* ---------- HTML escape ---------- */
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML;}

/* ============================================================
   CAMPUS DATA — Single source of truth
   ============================================================ */
const CAMPUSES = [
  { id:'nourishment', label:'Nourishment', numeral:'I',   href:'nourishment.html', accent:'#A38255', lessons:25, desc:'Clean eating by the Creator\u2019s blueprint. Leviticus 11 made practical for 2026.' },
  { id:'attire',      label:'Attire',      numeral:'II',  href:'attire.html',      accent:'#8B7D6B', lessons:0,  desc:'Dress with purpose. From boardroom to church to poolside.' },
  { id:'mentality',   label:'Mentality',   numeral:'III', href:'mentality.html',   accent:'#3D4F2F', lessons:0,  desc:'Habits, discipline, love, relationships, and inner warfare.' },
  { id:'treasury',    label:'Treasury',    numeral:'IV',  href:'treasury.html',    accent:'#7A6542', lessons:0,  desc:'Budget wisely, build wealth, and provide like a king should.' },
  { id:'templecare',  label:'Temple Care', numeral:'V',   href:'templecare.html',  accent:'#6B5B4E', lessons:12, desc:'Steward the dwelling place of the Holy Spirit. Grooming, hygiene, fitness.' },
  { id:'presence',    label:'Presence',    numeral:'VI',  href:'presence.html',    accent:'#3A3A3A', lessons:0,  desc:'Walk, sit, stand, and command any room with silent authority.' },
  { id:'speech',      label:'Speech',      numeral:'VII', href:'speech.html',      accent:'#4A5568', lessons:0,  desc:'Vocabulary, filler-word mastery, and powerful conversation.' },
  { id:'legacy',      label:'Legacy',      numeral:'+',   href:'legacy.html',      accent:'#571641', lessons:0,  desc:'Protect, provide, and lead your family with honor that outlasts you.' }
];

/* ---------- Daily Royal Principles (Bible only, 10 verses) ---------- */
const PRINCIPLES = [
  { text:"A king\u2019s heart is in the hand of the Lord; He directs it like a watercourse wherever He pleases.", ref:"Proverbs 21:1", context:"Solomon understood that even the most powerful ruler is guided by God\u2019s hand. Your decisions, your appetites, your discipline \u2014 all flow from a source greater than willpower alone.", crossRefs:["Proverbs 16:9","Jeremiah 10:23"], application:"Before making any decision today \u2014 what to eat, how to speak, where to invest your energy \u2014 pause and ask: is this aligned with the blueprint, or am I improvising?" },
  { text:"When a king sits on his throne to judge, he winnows out all evil with his eyes.", ref:"Proverbs 20:8", context:"The throne is not just a seat of power \u2014 it is a seat of discernment. A king\u2019s eyes are trained to separate what is clean from what is corrupt, what builds from what destroys.", crossRefs:["Proverbs 20:26","Psalm 101:3"], application:"Audit one area of your life today with kingly discernment. Your plate, your schedule, your conversations \u2014 what needs to be winnowed out?" },
  { text:"By justice a king gives a country stability, but those who are greedy for bribes tear it down.", ref:"Proverbs 29:4", context:"Stability in your household begins with justice in your personal discipline. The man who cuts corners with his body will cut corners with his family.", crossRefs:["Proverbs 16:12","Isaiah 32:1"], application:"Where have you been accepting \u2018bribes\u2019 from convenience? Fast food instead of preparation? Shortcuts instead of the blueprint?" },
  { text:"It is the glory of God to conceal a matter; to search out a matter is the glory of kings.", ref:"Proverbs 25:2", context:"God embedded nutritional wisdom into Leviticus millennia before science confirmed it. The king\u2019s glory is in discovering what was hidden in plain sight.", crossRefs:["Deuteronomy 29:29","Romans 11:33"], application:"Study one food law from Leviticus 11 today. Research the modern science behind it. The convergence will strengthen your conviction." },
  { text:"Righteousness exalts a nation, but sin condemns any people.", ref:"Proverbs 14:34", context:"A nation is built family by family, meal by meal, habit by habit. Your personal righteousness \u2014 including what you put in the temple \u2014 contributes to the exaltation of your entire household.", crossRefs:["Psalm 33:12","Proverbs 11:11"], application:"One righteous meal today. One decision that honors the temple. That is how nations change \u2014 one king at a time." },
  { text:"The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.", ref:"Proverbs 9:10", context:"Wisdom does not begin with information. It begins with reverence. The man who fears God enough to follow His food laws will receive understanding that no textbook provides.", crossRefs:["Job 28:28","Psalm 111:10"], application:"Approach your next meal with reverence, not just hunger. The Creator designed your body and its fuel. Honor both." },
  { text:"Iron sharpens iron, and one man sharpens another.", ref:"Proverbs 27:17", context:"You cannot walk the king\u2019s path alone. Find one man who shares your commitment to the blueprint and sharpen each other weekly.", crossRefs:["Ecclesiastes 4:9-10","Hebrews 10:24-25"], application:"Share one principle from this pillar with a brother today. Teaching is the fastest way to internalize what you have learned." },
  { text:"Guard your heart above all else, for it determines the course of your life.", ref:"Proverbs 4:23", context:"The Hebrew word for \u2018heart\u2019 encompasses mind, will, and emotion. What enters your body through food affects all three. Guard the gate.", crossRefs:["Matthew 15:18","Philippians 4:7"], application:"What did you consume today \u2014 food, media, conversation \u2014 that either guarded or compromised your heart?" },
  { text:"Plans fail for lack of counsel, but with many advisers they succeed.", ref:"Proverbs 15:22", context:"Your 30-day nourishment plan needs accountability. A plan written in isolation stays in isolation. Share it with someone who will hold you to it.", crossRefs:["Proverbs 11:14","Proverbs 24:6"], application:"Write one nourishment goal and tell one person about it before the day ends." },
  { text:"Commit to the Lord whatever you do, and He will establish your plans.", ref:"Proverbs 16:3", context:"Commitment precedes establishment. You do not wait for perfect conditions to begin eating clean. You commit first, and the path appears.", crossRefs:["Psalm 37:5","Proverbs 3:5-6"], application:"Commit your nourishment journey to the Lord in prayer today. Then act on the commitment with your very next meal." }
];

/* ============================================================
   AUTH
   ============================================================ */
function isLoggedIn(){return localStorage.getItem('kl_isGuest')==='false';}
function ensureGuest(){
  if(!localStorage.getItem('kl_userId')){
    localStorage.setItem('kl_userId','guest-'+Math.random().toString(36).substring(2,7).toUpperCase());
    localStorage.setItem('kl_isGuest','true');
  }
  return localStorage.getItem('kl_userId');
}
function signOut(){
  localStorage.setItem('kl_isGuest','true');
  localStorage.removeItem('kl_userEmail');
  localStorage.setItem('kl_userId','guest-'+Math.random().toString(36).substring(2,7).toUpperCase());
  window.location.href='index.html';
}
function requireAuth(){if(!isLoggedIn()){showAuthWall();return false;}return true;}
function showAuthWall(){
  var w=document.createElement('div');
  w.className='min-h-screen bg-[#FFF6E6] flex items-center justify-center px-6 fixed inset-0 z-[200]';
  var inner=document.createElement('div');inner.className='text-center max-w-md';inner.style.animation='fadeInUp 0.6s ease-out';
  var c=document.createElement('div');c.className='flex justify-center mb-8';
  var crownHolder=document.createRange().createContextualFragment(CROWN_SVG);c.appendChild(crownHolder);
  var h=document.createElement('h1');h.className='font-cinzel text-2xl text-[#571641] mb-4';h.textContent='Royal Access Required';
  var p=document.createElement('p');p.className='font-inter text-sm text-[#08052D]/60 mb-10 leading-relaxed';p.textContent='This area of the kingdom is reserved for those who have begun their transformation.';
  var a=document.createElement('a');a.href='index.html';a.className='inline-block px-8 py-3 bg-[#A38255] text-white font-cinzel tracking-wider rounded-lg hover:bg-[#571641] transition-all duration-500';a.textContent='Return to the Gates';
  var cv=document.createElement('p');cv.className='mt-6 text-xs text-[#08052D]/30 font-inter';
  var cvLink=document.createElement('a');cvLink.href='https://calyvent.com';cvLink.target='_blank';cvLink.className='text-[#A38255] hover:underline';cvLink.textContent='Calyvent';
  cv.append('A ',cvLink,' Venture');
  inner.append(c,h,p,a,cv);w.appendChild(inner);document.body.textContent='';document.body.appendChild(w);
}

/* ============================================================
   DARK / LIGHT
   ============================================================ */
function getDark(){return localStorage.getItem('kl_dark')==='true';}
function setDark(d){localStorage.setItem('kl_dark',d?'true':'false');document.documentElement.classList.toggle('dark',d);}

/* ============================================================
   DAILY PRINCIPLE (Bible only)
   ============================================================ */
function getDayIndex(){return Math.floor((Date.now()-new Date('2024-01-01').getTime())/86400000)%10;}
function getTodayPrinciple(){return PRINCIPLES[getDayIndex()];}
function renderDailyPrinciple(){
  var el=document.getElementById('dailyPrinciple');if(!el)return;
  var p=getTodayPrinciple();el.textContent='';
  var span=document.createElement('span');span.className='font-playfair italic cursor-pointer hover:text-white/90 transition';
  span.textContent='\u201C'+p.text+'\u201D';span.onclick=function(){openVerseModal(p);};
  var ref=document.createElement('span');ref.className='ml-2 text-xs opacity-70';ref.textContent='\u2014 '+p.ref;
  el.append(span,ref);
}

/* ============================================================
   VERSE MODAL (clickable Bible verses)
   ============================================================ */
function openVerseModal(v){
  if(document.getElementById('verseModal'))return;
  var m=document.createElement('div');m.id='verseModal';
  m.className='fixed inset-0 z-[150] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4';
  m.style.animation='fadeIn 0.3s ease-out';
  m.onclick=function(e){if(e.target===m)m.remove();};
  var card=document.createElement('div');
  card.className='bg-[#FFF6E6] dark:bg-[#0a0a0a] rounded-2xl shadow-2xl max-w-lg w-full p-8 relative border border-[#A38255]/20 max-h-[90vh] overflow-y-auto';
  card.style.animation='fadeInUp 0.4s ease-out';
  var cls=document.createElement('button');cls.className='absolute top-4 right-4 text-[#571641] text-2xl hover:text-[#A38255] transition leading-none';cls.textContent='\u00D7';cls.onclick=function(){m.remove();};
  var refEl=document.createElement('div');refEl.className='font-cinzel text-xs tracking-[0.3em] text-[#A38255] uppercase mb-4';refEl.textContent=v.ref;
  var txt=document.createElement('p');txt.className='font-playfair text-xl text-[#571641] dark:text-[#A38255] italic leading-relaxed mb-6';txt.textContent='\u201C'+v.text+'\u201D';
  var ctxH=document.createElement('h3');ctxH.className='font-cinzel text-sm text-[#A38255] mb-2 tracking-wider';ctxH.textContent='HISTORICAL CONTEXT';
  var ctxP=document.createElement('p');ctxP.className='font-inter text-sm text-[#08052D]/70 dark:text-white/60 leading-relaxed mb-6';ctxP.textContent=v.context||'';
  var crH=document.createElement('h3');crH.className='font-cinzel text-sm text-[#A38255] mb-2 tracking-wider';crH.textContent='CROSS-REFERENCES';
  var crList=document.createElement('div');crList.className='flex flex-wrap gap-2 mb-6';
  (v.crossRefs||[]).forEach(function(cr){var tag=document.createElement('span');tag.className='px-3 py-1 bg-[#A38255]/10 text-[#571641] dark:text-[#A38255] text-xs font-inter rounded-full';tag.textContent=cr;crList.appendChild(tag);});
  var appH=document.createElement('h3');appH.className='font-cinzel text-sm text-[#A38255] mb-2 tracking-wider';appH.textContent='2026 APPLICATION';
  var appP=document.createElement('p');appP.className='font-inter text-sm text-[#08052D]/70 dark:text-white/60 leading-relaxed';appP.textContent=v.application||'';
  card.append(cls,refEl,txt,ctxH,ctxP,crH,crList,appH,appP);m.appendChild(card);document.body.appendChild(m);
}

/* ============================================================
   STREAK (2-day grace period)
   ============================================================ */
function updateStreak(){
  var today=new Date().toDateString();
  var last=localStorage.getItem('kl_lastVisit');
  var streak=parseInt(localStorage.getItem('kl_streak')||'0');
  if(last!==today){
    var yesterday=new Date(Date.now()-86400000).toDateString();
    var twoDaysAgo=new Date(Date.now()-172800000).toDateString();
    if(last===yesterday||last===twoDaysAgo){streak+=1;}else{streak=1;}
    localStorage.setItem('kl_streak',streak);
    localStorage.setItem('kl_lastVisit',today);
  }
  document.querySelectorAll('.streak-count').forEach(function(el){el.textContent=streak;});
  var el=document.getElementById('streakCount');if(el)el.textContent=streak;
}

/* ============================================================
   OVERALL MASTERY (aggregated across all campuses)
   ============================================================ */
function getOverallMastery(){
  var total=0,absorbed=0;
  CAMPUSES.forEach(function(c){
    if(c.lessons>0){
      total+=c.lessons;
      var arr=JSON.parse(localStorage.getItem('kl_'+c.id+'_absorbed')||'[]');
      absorbed+=arr.length;
    }
  });
  return total>0?Math.round((absorbed/total)*100):0;
}
function getCampusMastery(campusId){
  var c=CAMPUSES.find(function(x){return x.id===campusId;});
  if(!c||c.lessons===0)return 0;
  var arr=JSON.parse(localStorage.getItem('kl_'+c.id+'_absorbed')||'[]');
  return Math.round((arr.length/c.lessons)*100);
}

/* ============================================================
   NAVIGATION (v0.0.7 — clean campuses structure)
   ============================================================ */
function buildNav(){
  var nav=document.getElementById('mainNav');if(!nav||!isLoggedIn())return;
  var cur=window.location.pathname.split('/').pop()||'dashboard.html';nav.textContent='';
  var w=document.createElement('div');w.className='bg-[#052B20] text-white sticky top-0 z-50 shadow-lg';

  // Daily principle bar
  var pb=document.createElement('div');pb.className='bg-[#08052D] text-[#A38255] text-center text-sm py-2 px-4 font-playfair';pb.id='dailyPrinciple';

  // Main bar
  var mb=document.createElement('div');mb.className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between';

  // Logo
  var logo=document.createElement('a');logo.href='dashboard.html';logo.className='flex items-center gap-3 group';
  var logoSvg=document.createRange().createContextualFragment(CROWN_SVG);logo.appendChild(logoSvg);
  var lt=document.createElement('span');lt.className='font-cinzel text-lg tracking-widest text-[#A38255] group-hover:text-white transition-colors hidden sm:inline';lt.textContent="A King\u2019s Lifestyle";logo.appendChild(lt);

  // Desktop nav
  var dl=document.createElement('div');dl.className='hidden lg:flex items-center gap-1';

  // Dashboard link
  var dashLink=document.createElement('a');dashLink.href='dashboard.html';
  dashLink.className='px-3 py-1.5 rounded text-sm font-inter transition-colors '+(cur==='dashboard.html'?'bg-[#A38255]/20 text-[#A38255]':'text-white/80 hover:text-[#A38255]');
  dashLink.textContent='Dashboard';dl.appendChild(dashLink);

  // Campuses dropdown
  var dd=document.createElement('div');dd.className='relative';
  var ddBtn=document.createElement('button');ddBtn.className='px-3 py-1.5 rounded text-sm font-inter text-white/80 hover:text-[#A38255] transition-colors flex items-center gap-1';
  ddBtn.textContent='Campuses ';
  var caret=document.createElement('span');caret.className='text-xs opacity-60';caret.textContent='\u25BE';ddBtn.appendChild(caret);

  var ddPanel=document.createElement('div');ddPanel.className='absolute top-full left-0 mt-1 bg-[#052B20] border border-[#A38255]/20 rounded-xl shadow-xl w-56 hidden z-50';
  CAMPUSES.forEach(function(c){
    var a=document.createElement('a');a.href=c.href;
    a.className='flex items-center gap-3 px-4 py-2.5 text-sm font-inter transition-colors '+(cur===c.href?'text-[#A38255] bg-[#A38255]/10':'text-white/70 hover:text-[#A38255] hover:bg-white/5');
    var num=document.createElement('span');num.className='font-cinzel text-xs w-6 opacity-40';num.textContent=c.numeral;
    var name=document.createElement('span');name.textContent=c.label;
    a.append(num,name);ddPanel.appendChild(a);
  });
  ddBtn.onclick=function(e){e.stopPropagation();ddPanel.classList.toggle('hidden');};
  document.addEventListener('click',function(){ddPanel.classList.add('hidden');});
  dd.append(ddBtn,ddPanel);dl.appendChild(dd);

  // Journal + Settings
  [['journal.html','Journal'],['settings.html','Settings']].forEach(function(l){
    var a=document.createElement('a');a.href=l[0];
    a.className='px-3 py-1.5 rounded text-sm font-inter transition-colors '+(cur===l[0]?'bg-[#A38255]/20 text-[#A38255]':'text-white/80 hover:text-[#A38255]');
    a.textContent=l[1];dl.appendChild(a);
  });

  // Right controls
  var ct=document.createElement('div');ct.className='flex items-center gap-3';
  var sk=document.createElement('span');sk.className='text-xs text-[#A38255] font-inter hidden sm:inline';sk.title='Day streak';sk.textContent='Streak: ';
  var skn=document.createElement('span');skn.id='streakCount';skn.className='streak-count';skn.textContent='0';sk.appendChild(skn);
  var so=document.createElement('button');so.className='text-xs font-inter px-3 py-1.5 rounded border border-[#A38255]/30 text-[#A38255] hover:bg-[#A38255]/20 transition';so.textContent='Sign Out';so.onclick=signOut;
  var hb=document.createElement('button');hb.className='lg:hidden w-8 h-8 flex items-center justify-center text-[#A38255]';
  var hbSvg=document.createRange().createContextualFragment('<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>');
  hb.appendChild(hbSvg);hb.onclick=toggleMobileMenu;
  ct.append(sk,so,hb);mb.append(logo,dl,ct);

  // Mobile menu
  var mm=document.createElement('div');mm.id='mobileMenu';mm.className='lg:hidden hidden bg-[#052B20] border-t border-[#A38255]/20 pb-4';
  var mi=document.createElement('div');mi.className='flex flex-col px-4 gap-1';
  var mdash=document.createElement('a');mdash.href='dashboard.html';mdash.className='px-3 py-2 rounded text-sm font-inter '+(cur==='dashboard.html'?'bg-[#A38255]/20 text-[#A38255]':'text-white/80 hover:text-[#A38255]');mdash.textContent='Dashboard';mi.appendChild(mdash);
  var mlab=document.createElement('div');mlab.className='px-3 py-1 text-xs font-cinzel text-[#A38255]/40 tracking-widest mt-2';mlab.textContent='CAMPUSES';mi.appendChild(mlab);
  CAMPUSES.forEach(function(c){var a=document.createElement('a');a.href=c.href;a.className='px-3 py-2 rounded text-sm font-inter '+(cur===c.href?'bg-[#A38255]/20 text-[#A38255]':'text-white/80 hover:text-[#A38255]');a.textContent=c.label;mi.appendChild(a);});
  var mlab2=document.createElement('div');mlab2.className='px-3 py-1 text-xs font-cinzel text-[#A38255]/40 tracking-widest mt-2';mlab2.textContent='TOOLS';mi.appendChild(mlab2);
  [['journal.html','Journal'],['settings.html','Settings']].forEach(function(l){var a=document.createElement('a');a.href=l[0];a.className='px-3 py-2 rounded text-sm font-inter '+(cur===l[0]?'bg-[#A38255]/20 text-[#A38255]':'text-white/80 hover:text-[#A38255]');a.textContent=l[1];mi.appendChild(a);});
  mm.appendChild(mi);

  w.append(pb,mb,mm);nav.appendChild(w);
}
function toggleMobileMenu(){document.getElementById('mobileMenu')?.classList.toggle('hidden');}

/* ============================================================
   PRIVATE FOOTER
   ============================================================ */
function buildFooter(){
  var f=document.getElementById('mainFooter');if(!f)return;f.textContent='';
  var ft=document.createElement('footer');ft.className='bg-[#052B20] text-white/60 mt-20';
  var g=document.createElement('div');g.className='max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8';

  // Col 1 — Brand
  var c1=document.createElement('div');
  var br=document.createElement('div');br.className='flex items-center gap-3 mb-4';
  var brSvg=document.createRange().createContextualFragment(CROWN_SVG);br.appendChild(brSvg);
  var bn=document.createElement('span');bn.className='font-cinzel text-[#A38255] tracking-widest';bn.textContent="A King\u2019s Lifestyle";br.appendChild(bn);
  var tg=document.createElement('p');tg.className='text-sm font-inter leading-relaxed';tg.textContent='Genuine Transformation, No Shortcuts.';c1.append(br,tg);

  // Col 2 — Campuses
  var c2=document.createElement('div');var c2h=document.createElement('h4');c2h.className='font-cinzel text-[#A38255] mb-3 text-sm tracking-wider';c2h.textContent='Royal Campuses';
  var c2g=document.createElement('div');c2g.className='grid grid-cols-2 gap-1 text-sm font-inter';
  CAMPUSES.forEach(function(c){var a=document.createElement('a');a.href=c.href;a.className='hover:text-[#A38255] transition';a.textContent=c.label;c2g.appendChild(a);});
  c2.append(c2h,c2g);

  // Col 3 — Links
  var c3=document.createElement('div');var c3h=document.createElement('h4');c3h.className='font-cinzel text-[#A38255] mb-3 text-sm tracking-wider';c3h.textContent='Quick Links';
  var c3l=document.createElement('div');c3l.className='flex flex-col gap-1 text-sm font-inter';
  [['dashboard.html','Dashboard'],['journal.html','Journal'],['settings.html','Settings'],['privacy.html','Privacy'],['terms.html','Terms']].forEach(function(x){var a=document.createElement('a');a.href=x[0];a.className='hover:text-[#A38255] transition';a.textContent=x[1];c3l.appendChild(a);});
  c3.append(c3h,c3l);g.append(c1,c2,c3);

  // Bottom bar
  var bt=document.createElement('div');bt.className='border-t border-[#A38255]/10 text-center py-4 text-xs font-inter';
  var yr=document.createElement('span');yr.textContent='\u00A9 '+new Date().getFullYear()+' A King\u2019s Lifestyle. A ';
  var cvLink=document.createElement('a');cvLink.href='https://calyvent.com';cvLink.target='_blank';cvLink.className='text-[#A38255] hover:underline';cvLink.textContent='Calyvent';
  var dot=document.createTextNode(' Venture');
  bt.append(yr,cvLink,dot);
  ft.append(g,bt);f.appendChild(ft);
}

/* ============================================================
   PUBLIC FOOTER
   ============================================================ */
function buildPublicFooter(){
  var f=document.getElementById('publicFooter');if(!f)return;f.textContent='';
  var ft=document.createElement('footer');ft.className='bg-[#052B20] text-white/60 mt-24';
  var inner=document.createElement('div');inner.className='max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6';
  var brand=document.createElement('div');brand.className='flex items-center gap-3';
  var brandSvg=document.createRange().createContextualFragment(CROWN_SVG);brand.appendChild(brandSvg);
  var bname=document.createElement('span');bname.className='font-cinzel text-[#A38255] tracking-widest text-sm';bname.textContent="A King\u2019s Lifestyle";brand.appendChild(bname);
  var lk=document.createElement('div');lk.className='flex items-center gap-8 text-sm font-inter';
  [['privacy.html','Privacy'],['terms.html','Terms']].forEach(function(x){var a=document.createElement('a');a.href=x[0];a.className='hover:text-[#A38255] transition';a.textContent=x[1];lk.appendChild(a);});
  var cv=document.createElement('p');cv.className='text-xs font-inter';
  var cvA=document.createElement('a');cvA.href='https://calyvent.com';cvA.target='_blank';cvA.className='text-[#A38255] hover:underline';cvA.textContent='Calyvent';
  cv.append('A ',cvA,' Venture');
  inner.append(brand,lk,cv);ft.appendChild(inner);f.appendChild(ft);
}

/* ============================================================
   SIGN-IN MODAL
   ============================================================ */
var authMode='login';
function openSignIn(dt){
  if(document.getElementById('signInModal'))return;authMode=dt||'login';
  var m=document.createElement('div');m.id='signInModal';m.className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4';m.style.animation='fadeIn 0.3s ease-out';m.onclick=function(e){if(e.target===m)m.remove();};
  var card=document.createElement('div');card.className='bg-[#FFF6E6] rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-[#A38255]/20';card.style.animation='fadeInUp 0.4s ease-out';
  var cls=document.createElement('button');cls.className='absolute top-4 right-4 text-[#571641] text-2xl hover:text-[#A38255] transition leading-none';cls.textContent='\u00D7';cls.onclick=function(){m.remove();};
  var hdr=document.createElement('div');hdr.className='text-center mb-8';
  var cw=document.createElement('div');cw.className='flex justify-center';
  var cwSvg=document.createRange().createContextualFragment(CROWN_SVG);cw.appendChild(cwSvg);
  var t=document.createElement('h2');t.className='font-cinzel text-[#571641] text-xl mt-4';t.textContent='Enter the Kingdom';
  var st=document.createElement('p');st.className='font-inter text-xs text-[#08052D]/40 mt-1';st.textContent='Your transformation awaits.';hdr.append(cw,t,st);
  var tabs=document.createElement('div');tabs.className='flex mb-6 border-b border-[#A38255]/20';
  var tl=document.createElement('button');tl.id='tabLogin';tl.textContent='Sign In';tl.onclick=function(){showAuthTab('login');};
  var tr=document.createElement('button');tr.id='tabRegister';tr.textContent='Create Account';tr.onclick=function(){showAuthTab('register');};
  tabs.append(tl,tr);showAuthTabStyle(tl,tr,authMode);
  var form=document.createElement('form');form.className='space-y-4';form.onsubmit=handleAuth;
  var ei=document.createElement('input');ei.type='email';ei.id='authEmail';ei.placeholder='Email';ei.required=true;ei.className='w-full px-4 py-3 rounded-lg border border-[#A38255]/30 bg-white/50 font-inter text-sm text-[#08052D] focus:outline-none focus:border-[#A38255] transition';
  var pi=document.createElement('input');pi.type='password';pi.id='authPassword';pi.placeholder='Password';pi.required=true;pi.minLength=6;pi.className='w-full px-4 py-3 rounded-lg border border-[#A38255]/30 bg-white/50 font-inter text-sm text-[#08052D] focus:outline-none focus:border-[#A38255] transition';
  var sb=document.createElement('button');sb.type='submit';sb.className='w-full py-3 bg-[#A38255] text-white font-cinzel tracking-wider rounded-lg hover:bg-[#571641] transition-all duration-500';sb.textContent='Enter';
  form.append(ei,pi,sb);
  var msg=document.createElement('div');msg.id='authMessage';msg.className='mt-4 text-center text-sm font-inter text-[#571641]';
  card.append(cls,hdr,tabs,form,msg);m.appendChild(card);document.body.appendChild(m);ei.focus();
}
function showAuthTab(mode){authMode=mode;var tl=document.getElementById('tabLogin'),tr=document.getElementById('tabRegister');if(tl&&tr)showAuthTabStyle(tl,tr,mode);}
function showAuthTabStyle(tl,tr,mode){var a='flex-1 py-2 font-inter text-sm border-b-2 border-[#A38255] text-[#571641]',i='flex-1 py-2 font-inter text-sm border-b-2 border-transparent text-[#571641]/40';tl.className=mode==='login'?a:i;tr.className=mode==='register'?a:i;}
function hasGuestData(){return !!(localStorage.getItem('kl_journal')||localStorage.getItem('kl_progress')||localStorage.getItem('kl_onboarding')||Object.keys(localStorage).some(function(k){return k.startsWith('kl_checklist_');}));}
function handleAuth(e){
  e.preventDefault();var email=document.getElementById('authEmail').value;var msg=document.getElementById('authMessage');
  localStorage.setItem('kl_userEmail',email);localStorage.setItem('kl_isGuest','false');localStorage.setItem('kl_userId',email);
  msg.textContent=authMode==='register'?'Account created. Welcome to the Kingdom.':'Welcome back, King.';
  if(hasGuestData()){setTimeout(function(){if(confirm('Migrate previous progress from guest session?')){msg.textContent='Progress migrated successfully.';}else{Object.keys(localStorage).filter(function(k){return k.startsWith('kl_')&&!['kl_userId','kl_userEmail','kl_isGuest','kl_dark'].includes(k);}).forEach(function(k){localStorage.removeItem(k);});}setTimeout(function(){window.location.href='dashboard.html';},600);},500);}
  else{setTimeout(function(){window.location.href='dashboard.html';},800);}
}

/* ============================================================
   ASK THE KING — REAL LLM CHAT
   ============================================================ */
function getLLMConfig(){
  return {
    provider:localStorage.getItem('kl_llm_provider')||'',
    endpoint:localStorage.getItem('kl_llm_endpoint')||'',
    apiKey:localStorage.getItem('kl_llm_apiKey')||'',
    model:localStorage.getItem('kl_llm_model')||''
  };
}
function saveLLMConfig(provider,endpoint,apiKey,model){
  localStorage.setItem('kl_llm_provider',provider);
  localStorage.setItem('kl_llm_endpoint',endpoint);
  localStorage.setItem('kl_llm_apiKey',apiKey);
  localStorage.setItem('kl_llm_model',model);
}

var FALLBACK_RESPONSES=[
  "A king does not react \u2014 he responds with measured wisdom. Consider what outcome truly serves your kingdom.",
  "Every challenge is merely a lesson dressed in difficulty. What is this moment teaching you?",
  "Your character is your crown. No circumstance can remove what you have built within.",
  "Discipline today purchases the freedom you desire tomorrow. Stay the course.",
  "Guard your energy as a king guards his treasury. Not everyone deserves your time.",
  "Connect your LLM in Settings for true royal counsel. Until then, meditate on Scripture and the principles within these pillars."
];

async function askLLM(question){
  var cfg=getLLMConfig();
  if(!cfg.endpoint&&!cfg.apiKey)return FALLBACK_RESPONSES[Math.floor(Math.random()*FALLBACK_RESPONSES.length)];
  var systemPrompt='You are the King\'s Counsel, a wise advisor grounded in Scripture (especially Proverbs, Leviticus 11, and the wisdom literature). Respond with high vocabulary, brevity, and kingly authority. Reference relevant Bible verses. Keep responses under 100 words. Speak as a mentor, not a servant.';
  try{
    if(cfg.provider==='ollama'){
      var res=await fetch(cfg.endpoint+'/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:cfg.model||'llama3.2',messages:[{role:'system',content:systemPrompt},{role:'user',content:question}],stream:false})});
      var data=await res.json();return data.message?.content||'The counsel is unavailable at this hour.';
    }else{
      var url=cfg.endpoint||'https://api.openai.com/v1/chat/completions';
      var res2=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+cfg.apiKey},body:JSON.stringify({model:cfg.model||'gpt-4o-mini',messages:[{role:'system',content:systemPrompt},{role:'user',content:question}],max_tokens:150})});
      var data2=await res2.json();return data2.choices?.[0]?.message?.content||'The counsel is unavailable at this hour.';
    }
  }catch(err){return 'The counsel chamber is unreachable. Check your LLM connection in Settings.';}
}

function buildAskTheKing(){
  if(document.getElementById('askKingFloat'))return;
  var btn=document.createElement('button');btn.id='askKingFloat';btn.className='fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#A38255] text-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center';
  var btnSvg=document.createRange().createContextualFragment(CROWN_SM);btn.appendChild(btnSvg);
  btn.title='Ask the King';btn.onclick=toggleKingChat;document.body.appendChild(btn);
}
function toggleKingChat(){
  var ex=document.getElementById('kingChatModal');if(ex){ex.remove();return;}
  var m=document.createElement('div');m.id='kingChatModal';m.className='fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-[#FFF6E6] dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-[#A38255]/30 overflow-hidden';m.style.animation='fadeInUp 0.3s ease-out';
  var hd=document.createElement('div');hd.className='bg-[#052B20] px-4 py-3 flex items-center justify-between';
  var ht=document.createElement('span');ht.className='font-cinzel text-[#A38255] text-sm tracking-wider';ht.textContent='Ask the King';
  var hc=document.createElement('button');hc.className='text-[#A38255] hover:text-white transition text-lg leading-none';hc.textContent='\u00D7';hc.onclick=function(){m.remove();};hd.append(ht,hc);
  var msgs=document.createElement('div');msgs.id='kingChatMessages';msgs.className='h-64 overflow-y-auto p-4 space-y-3';
  var cfg=getLLMConfig();var intro=document.createElement('div');intro.className='text-sm font-playfair text-[#571641]/60 dark:text-[#A38255]/60 italic';
  intro.textContent=cfg.endpoint||cfg.apiKey?'Speak your question, and the King shall counsel you...':'Connect your LLM in Settings for true royal counsel. Until then, I offer stored wisdom.';msgs.appendChild(intro);
  var frm=document.createElement('form');frm.className='flex border-t border-[#A38255]/20';frm.onsubmit=sendKingMessage;
  var inp=document.createElement('input');inp.type='text';inp.id='kingChatInput';inp.placeholder='Ask anything...';inp.className='flex-1 px-4 py-3 bg-transparent font-inter text-sm text-[#08052D] dark:text-white/80 focus:outline-none';
  var sub=document.createElement('button');sub.type='submit';sub.className='px-4 text-[#A38255] hover:text-[#571641] transition text-lg';sub.textContent='\u279E';
  frm.append(inp,sub);m.append(hd,msgs,frm);document.body.appendChild(m);inp.focus();
}
async function sendKingMessage(e){
  e.preventDefault();var inp=document.getElementById('kingChatInput');var msgs=document.getElementById('kingChatMessages');var q=inp.value.trim();if(!q)return;
  var um=document.createElement('div');um.className='text-sm font-inter text-right text-[#052B20] dark:text-white/80';var ub=document.createElement('span');ub.className='bg-[#A38255]/10 px-3 py-2 rounded-lg inline-block max-w-[80%]';ub.textContent=q;um.appendChild(ub);msgs.appendChild(um);inp.value='';msgs.scrollTop=msgs.scrollHeight;
  var ld=document.createElement('div');ld.className='text-sm font-playfair text-[#571641] dark:text-[#A38255] italic opacity-60';ld.textContent='The King considers...';msgs.appendChild(ld);msgs.scrollTop=msgs.scrollHeight;
  var answer=await askLLM(q);ld.remove();
  var km=document.createElement('div');km.className='text-sm font-playfair text-[#571641] dark:text-[#A38255]';var kb=document.createElement('span');kb.className='bg-[#052B20]/5 dark:bg-white/5 px-3 py-2 rounded-lg inline-block max-w-[80%] italic';kb.textContent=answer;km.appendChild(kb);msgs.appendChild(km);msgs.scrollTop=msgs.scrollHeight;
}

/* ============================================================
   JOURNAL / CHECKLIST / PROGRESS / ONBOARDING / QUESTS
   ============================================================ */
function saveJournalEntry(p,pr,a){var e=JSON.parse(localStorage.getItem('kl_journal')||'[]');e.push({pillar:p,prompt:pr,answer:a,date:new Date().toISOString()});localStorage.setItem('kl_journal',JSON.stringify(e));}
function getJournalEntries(){return JSON.parse(localStorage.getItem('kl_journal')||'[]');}
function saveChecklist(p,items){localStorage.setItem('kl_checklist_'+p,JSON.stringify(items));}
function getChecklist(p){return JSON.parse(localStorage.getItem('kl_checklist_'+p)||'[]');}
function savePillarProgress(p,s,c){var pr=JSON.parse(localStorage.getItem('kl_progress')||'{}');if(!pr[p])pr[p]={};pr[p][s]=c;localStorage.setItem('kl_progress',JSON.stringify(pr));}
function getPillarProgress(){return JSON.parse(localStorage.getItem('kl_progress')||'{}');}
function saveOnboarding(d){localStorage.setItem('kl_onboarding',JSON.stringify(d));}
function getOnboarding(){return JSON.parse(localStorage.getItem('kl_onboarding')||'null');}

// Quest tracking
function getQuests(campusId){return JSON.parse(localStorage.getItem('kl_quests_'+campusId)||'{}');}
function saveQuest(campusId,lessonNum,completed){
  var q=getQuests(campusId);q['lesson_'+lessonNum]=completed;
  localStorage.setItem('kl_quests_'+campusId,JSON.stringify(q));
}
function isQuestComplete(campusId,lessonNum){var q=getQuests(campusId);return q['lesson_'+lessonNum]===true;}

/* ============================================================
   TODAY'S RITUAL RECOMMENDATION
   ============================================================ */
function getTodayRitual(pillar,totalLessons){
  var absorbed=JSON.parse(localStorage.getItem('kl_'+pillar+'_absorbed')||'[]');
  for(var i=1;i<=totalLessons;i++){if(!absorbed.includes(i))return i;}
  return null;
}
function getNextRitualAcrossCampuses(){
  for(var i=0;i<CAMPUSES.length;i++){
    var c=CAMPUSES[i];if(c.lessons===0)continue;
    var next=getTodayRitual(c.id,c.lessons);
    if(next)return {campus:c,lesson:next};
  }
  return null;
}

/* ============================================================
   INIT
   ============================================================ */
function initPrivate(){buildNav();buildFooter();renderDailyPrinciple();updateStreak();setDark(getDark());buildAskTheKing();}
function initPublic(){ensureGuest();buildPublicFooter();}

/* ============================================================
   SERVICE WORKER + SUPABASE PLACEHOLDER
   ============================================================ */
if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){});});}
