/* shared.js – v0.0.6 */
/* ============================================================
   A King's Lifestyle — Shared Module
   Auth · Navigation · Verse Modal · LLM Chat · Utilities
   Bible-only. No secular mode.
   ============================================================ */

/* ---------- Crown SVG ---------- */
const CROWN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" width="44" height="33" fill="none" stroke="#A38255" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 48 L18 18 L40 30 L62 18 L70 48 Z"/><line x1="18" y1="18" x2="18" y2="13"/><circle cx="18" cy="11" r="2.5"/><line x1="40" y1="30" x2="40" y2="8"/><circle cx="40" cy="6" r="3"/><line x1="62" y1="18" x2="62" y2="13"/><circle cx="62" cy="11" r="2.5"/><line x1="8" y1="52" x2="72" y2="52"/></svg>`;
const CROWN_SM = CROWN_SVG.replace('width="44"','width="28"').replace('height="33"','height="21"');

/* ---------- HTML escape ---------- */
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML;}

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

/* ---------- Navigation Links ---------- */
const NAV_LINKS = [
  {href:"index.html",label:"Home"},{href:"nourishment.html",label:"Nourishment"},
  {href:"attire.html",label:"Attire"},{href:"mentality.html",label:"Mentality"},
  {href:"treasury.html",label:"Treasury"},{href:"body.html",label:"Body"},
  {href:"presence.html",label:"Presence"},{href:"speech.html",label:"Speech"},
  {href:"legacy.html",label:"Legacy"},{href:"journal.html",label:"Journal"},
  {href:"settings.html",label:"Settings"}
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
  var c=document.createElement('div');c.className='flex justify-center mb-8';c.innerHTML=CROWN_SVG;
  var h=document.createElement('h1');h.className='font-cinzel text-2xl text-[#571641] mb-4';h.textContent='Royal Access Required';
  var p=document.createElement('p');p.className='font-inter text-sm text-[#08052D]/60 mb-10 leading-relaxed';p.textContent='This area of the kingdom is reserved for those who have begun their transformation.';
  var a=document.createElement('a');a.href='index.html';a.className='inline-block px-8 py-3 bg-[#A38255] text-white font-cinzel tracking-wider rounded-lg hover:bg-[#571641] transition-all duration-500';a.textContent='Return to the Gates';
  var cv=document.createElement('p');cv.className='mt-6 text-xs text-[#08052D]/30 font-inter';cv.innerHTML='A <a href="https://calyvent.com" target="_blank" class="text-[#A38255] hover:underline">Calyvent</a> Venture';
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
  // Close
  var cls=document.createElement('button');cls.className='absolute top-4 right-4 text-[#571641] text-2xl hover:text-[#A38255] transition leading-none';cls.textContent='\u00D7';cls.onclick=function(){m.remove();};
  // Content
  var ref=document.createElement('div');ref.className='font-cinzel text-xs tracking-[0.3em] text-[#A38255] uppercase mb-4';ref.textContent=v.ref;
  var txt=document.createElement('p');txt.className='font-playfair text-xl text-[#571641] dark:text-[#A38255] italic leading-relaxed mb-6';txt.textContent='\u201C'+v.text+'\u201D';
  var ctxH=document.createElement('h3');ctxH.className='font-cinzel text-sm text-[#A38255] mb-2 tracking-wider';ctxH.textContent='HISTORICAL CONTEXT';
  var ctxP=document.createElement('p');ctxP.className='font-inter text-sm text-[#08052D]/70 dark:text-white/60 leading-relaxed mb-6';ctxP.textContent=v.context||'';
  var crH=document.createElement('h3');crH.className='font-cinzel text-sm text-[#A38255] mb-2 tracking-wider';crH.textContent='CROSS-REFERENCES';
  var crList=document.createElement('div');crList.className='flex flex-wrap gap-2 mb-6';
  (v.crossRefs||[]).forEach(function(cr){var tag=document.createElement('span');tag.className='px-3 py-1 bg-[#A38255]/10 text-[#571641] dark:text-[#A38255] text-xs font-inter rounded-full';tag.textContent=cr;crList.appendChild(tag);});
  var appH=document.createElement('h3');appH.className='font-cinzel text-sm text-[#A38255] mb-2 tracking-wider';appH.textContent='2026 APPLICATION';
  var appP=document.createElement('p');appP.className='font-inter text-sm text-[#08052D]/70 dark:text-white/60 leading-relaxed';appP.textContent=v.application||'';
  card.append(cls,ref,txt,ctxH,ctxP,crH,crList,appH,appP);m.appendChild(card);document.body.appendChild(m);
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
   NAVIGATION (private, sticky dark green)
   ============================================================ */
function buildNav(){
  var nav=document.getElementById('mainNav');if(!nav||!isLoggedIn())return;
  var cur=window.location.pathname.split('/').pop()||'index.html';nav.textContent='';
  var w=document.createElement('div');w.className='bg-[#052B20] text-white sticky top-0 z-50 shadow-lg';
  // Principle bar
  var pb=document.createElement('div');pb.className='bg-[#08052D] text-[#A38255] text-center text-sm py-2 px-4 font-playfair';pb.id='dailyPrinciple';
  // Main bar
  var mb=document.createElement('div');mb.className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between';
  var logo=document.createElement('a');logo.href='index.html';logo.className='flex items-center gap-3 group';logo.innerHTML=CROWN_SVG;
  var lt=document.createElement('span');lt.className='font-cinzel text-lg tracking-widest text-[#A38255] group-hover:text-white transition-colors hidden sm:inline';lt.textContent="A King\u2019s Lifestyle";logo.appendChild(lt);
  var dl=document.createElement('div');dl.className='hidden lg:flex items-center gap-1';
  NAV_LINKS.forEach(function(l){var a=document.createElement('a');a.href=l.href;a.className='px-3 py-1.5 rounded text-sm font-inter transition-colors '+(cur===l.href?'bg-[#A38255]/20 text-[#A38255]':'text-white/80 hover:text-[#A38255]');a.textContent=l.label;dl.appendChild(a);});
  var ct=document.createElement('div');ct.className='flex items-center gap-3';
  var sk=document.createElement('span');sk.className='text-xs text-[#A38255] font-inter hidden sm:inline';sk.title='Day streak';sk.textContent='Streak: ';var skn=document.createElement('span');skn.id='streakCount';skn.className='streak-count';skn.textContent='0';sk.appendChild(skn);
  var so=document.createElement('button');so.className='text-xs font-inter px-3 py-1.5 rounded border border-[#A38255]/30 text-[#A38255] hover:bg-[#A38255]/20 transition';so.textContent='Sign Out';so.onclick=signOut;
  var hb=document.createElement('button');hb.className='lg:hidden w-8 h-8 flex items-center justify-center text-[#A38255]';hb.innerHTML='<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';hb.onclick=toggleMobileMenu;
  ct.append(sk,so,hb);mb.append(logo,dl,ct);
  var mm=document.createElement('div');mm.id='mobileMenu';mm.className='lg:hidden hidden bg-[#052B20] border-t border-[#A38255]/20 pb-4';
  var mi=document.createElement('div');mi.className='flex flex-col px-4 gap-1';
  NAV_LINKS.forEach(function(l){var a=document.createElement('a');a.href=l.href;a.className='px-3 py-2 rounded text-sm font-inter '+(cur===l.href?'bg-[#A38255]/20 text-[#A38255]':'text-white/80 hover:text-[#A38255]');a.textContent=l.label;mi.appendChild(a);});
  mm.appendChild(mi);w.append(pb,mb,mm);nav.appendChild(w);
}
function toggleMobileMenu(){document.getElementById('mobileMenu')?.classList.toggle('hidden');}

/* ============================================================
   PRIVATE FOOTER
   ============================================================ */
function buildFooter(){
  var f=document.getElementById('mainFooter');if(!f)return;f.textContent='';
  var ft=document.createElement('footer');ft.className='bg-[#052B20] text-white/60 mt-20';
  var g=document.createElement('div');g.className='max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8';
  var c1=document.createElement('div');var br=document.createElement('div');br.className='flex items-center gap-3 mb-4';br.innerHTML=CROWN_SVG;
  var bn=document.createElement('span');bn.className='font-cinzel text-[#A38255] tracking-widest';bn.textContent="A King\u2019s Lifestyle";br.appendChild(bn);
  var tg=document.createElement('p');tg.className='text-sm font-inter leading-relaxed';tg.textContent='Genuine Transformation, No Shortcuts.';c1.append(br,tg);
  var c2=document.createElement('div');var c2h=document.createElement('h4');c2h.className='font-cinzel text-[#A38255] mb-3 text-sm tracking-wider';c2h.textContent='The Seven Pillars';
  var c2g=document.createElement('div');c2g.className='grid grid-cols-2 gap-1 text-sm font-inter';
  ['nourishment','attire','mentality','treasury','body','presence','speech','legacy'].forEach(function(p){var a=document.createElement('a');a.href=p+'.html';a.className='hover:text-[#A38255] transition capitalize';a.textContent=p.charAt(0).toUpperCase()+p.slice(1);c2g.appendChild(a);});
  c2.append(c2h,c2g);
  var c3=document.createElement('div');var c3h=document.createElement('h4');c3h.className='font-cinzel text-[#A38255] mb-3 text-sm tracking-wider';c3h.textContent='Quick Links';
  var c3l=document.createElement('div');c3l.className='flex flex-col gap-1 text-sm font-inter';
  [['journal.html','Journal'],['onboarding.html','Onboarding'],['settings.html','Settings'],['privacy.html','Privacy'],['terms.html','Terms']].forEach(function(x){var a=document.createElement('a');a.href=x[0];a.className='hover:text-[#A38255] transition';a.textContent=x[1];c3l.appendChild(a);});
  c3.append(c3h,c3l);g.append(c1,c2,c3);
  var bt=document.createElement('div');bt.className='border-t border-[#A38255]/10 text-center py-4 text-xs font-inter';
  bt.innerHTML='&copy; '+new Date().getFullYear()+' A King\u2019s Lifestyle. A <a href="https://calyvent.com" target="_blank" class="text-[#A38255] hover:underline">Calyvent</a> Venture &bull; <a href="https://calyvent.com" target="_blank" class="text-[#A38255] hover:underline">calyvent.com</a>';
  ft.append(g,bt);f.appendChild(ft);
}

/* ============================================================
   PUBLIC FOOTER
   ============================================================ */
function buildPublicFooter(){
  var f=document.getElementById('publicFooter');if(!f)return;f.textContent='';
  var ft=document.createElement('footer');ft.className='bg-[#052B20] text-white/60 mt-24';
  var inner=document.createElement('div');inner.className='max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6';
  var brand=document.createElement('div');brand.className='flex items-center gap-3';brand.innerHTML=CROWN_SVG;
  var bn=document.createElement('span');bn.className='font-cinzel text-[#A38255] tracking-widest text-sm';bn.textContent="A King\u2019s Lifestyle";brand.appendChild(bn);
  var lk=document.createElement('div');lk.className='flex items-center gap-8 text-sm font-inter';
  [['privacy.html','Privacy'],['terms.html','Terms']].forEach(function(x){var a=document.createElement('a');a.href=x[0];a.className='hover:text-[#A38255] transition';a.textContent=x[1];lk.appendChild(a);});
  var cv=document.createElement('p');cv.className='text-xs font-inter';cv.innerHTML='A <a href="https://calyvent.com" target="_blank" class="text-[#A38255] hover:underline">Calyvent</a> Venture &bull; <a href="https://calyvent.com" target="_blank" class="text-[#A38255] hover:underline">calyvent.com</a>';
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
  var hdr=document.createElement('div');hdr.className='text-center mb-8';var cw=document.createElement('div');cw.className='flex justify-center';cw.innerHTML=CROWN_SVG;
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
  if(hasGuestData()){setTimeout(function(){if(confirm('Migrate previous progress from guest session?')){msg.textContent='Progress migrated successfully.';}else{Object.keys(localStorage).filter(function(k){return k.startsWith('kl_')&&!['kl_userId','kl_userEmail','kl_isGuest','kl_dark'].includes(k);}).forEach(function(k){localStorage.removeItem(k);});}setTimeout(function(){location.reload();},600);},500);}
  else{setTimeout(function(){location.reload();},800);}
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
  var btn=document.createElement('button');btn.id='askKingFloat';btn.className='fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#A38255] text-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center';btn.innerHTML=CROWN_SM;btn.title='Ask the King';btn.onclick=toggleKingChat;document.body.appendChild(btn);
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
  // Loading
  var ld=document.createElement('div');ld.className='text-sm font-playfair text-[#571641] dark:text-[#A38255] italic opacity-60';ld.textContent='The King considers...';msgs.appendChild(ld);msgs.scrollTop=msgs.scrollHeight;
  var answer=await askLLM(q);ld.remove();
  var km=document.createElement('div');km.className='text-sm font-playfair text-[#571641] dark:text-[#A38255]';var kb=document.createElement('span');kb.className='bg-[#052B20]/5 dark:bg-white/5 px-3 py-2 rounded-lg inline-block max-w-[80%] italic';kb.textContent=answer;km.appendChild(kb);msgs.appendChild(km);msgs.scrollTop=msgs.scrollHeight;
}

/* ============================================================
   JOURNAL / CHECKLIST / PROGRESS / ONBOARDING
   ============================================================ */
function saveJournalEntry(p,pr,a){var e=JSON.parse(localStorage.getItem('kl_journal')||'[]');e.push({pillar:p,prompt:pr,answer:a,date:new Date().toISOString()});localStorage.setItem('kl_journal',JSON.stringify(e));}
function getJournalEntries(){return JSON.parse(localStorage.getItem('kl_journal')||'[]');}
function saveChecklist(p,items){localStorage.setItem('kl_checklist_'+p,JSON.stringify(items));}
function getChecklist(p){return JSON.parse(localStorage.getItem('kl_checklist_'+p)||'[]');}
function savePillarProgress(p,s,c){var pr=JSON.parse(localStorage.getItem('kl_progress')||'{}');if(!pr[p])pr[p]={};pr[p][s]=c;localStorage.setItem('kl_progress',JSON.stringify(pr));}
function getPillarProgress(){return JSON.parse(localStorage.getItem('kl_progress')||'{}');}
function saveOnboarding(d){localStorage.setItem('kl_onboarding',JSON.stringify(d));}
function getOnboarding(){return JSON.parse(localStorage.getItem('kl_onboarding')||'null');}

/* ============================================================
   TODAY'S RITUAL RECOMMENDATION
   ============================================================ */
function getTodayRitual(pillar,totalLessons){
  var absorbed=JSON.parse(localStorage.getItem('kl_'+pillar+'_absorbed')||'[]');
  for(var i=1;i<=totalLessons;i++){if(!absorbed.includes(i))return i;}
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
// const SUPABASE_URL = 'https://your-project.supabase.co';
// const SUPABASE_KEY = 'your-anon-key';
// const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
