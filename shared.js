/* shared.js – v0.0.12 */
/* ============================================================
   A King's Lifestyle — Core Module
   Auth · Campuses · Daily Codex · Transformation Engine
   LLM Persona Compression · Royal Library · Navigation
   Bible-only. No secular mode. Location-agnostic.
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
  { id:'nourishment', label:'Nourishment', numeral:'I',   href:'/nourishment', accent:'#A38255', lessons:29, desc:'Clean eating, hydration, and the Creator\u2019s blueprint for temple fuel.' },
  { id:'attire',      label:'Attire',      numeral:'II',  href:'/attire',      accent:'#8B7D6B', lessons:32, desc:'Fabrics, grooming, jewelry, shoes, hats, and the king\u2019s full wardrobe.' },
  { id:'mentality',   label:'Mentality',   numeral:'III', href:'/mentality',   accent:'#3D4F2F', lessons:11, desc:'Time mastery, servant leadership, advising the wise, and inner discipline.' },
  { id:'treasury',    label:'Treasury',    numeral:'IV',  href:'/treasury',    accent:'#7A6542', lessons:0,  desc:'Budget wisely, build wealth, and provide like a king should.' },
  { id:'templecare',  label:'Temple Care', numeral:'V',   href:'/templecare',  accent:'#6B5B4E', lessons:20, desc:'Grooming, hygiene, fitness, and royal rest. The full temple stewardship.' },
  { id:'presence',    label:'Presence',    numeral:'VI',  href:'/presence',    accent:'#3A3A3A', lessons:3,  desc:'Advanced body language, psychological influence, and commanding any room.' },
  { id:'speech',      label:'Speech',      numeral:'VII', href:'/speech',      accent:'#4A5568', lessons:2,  desc:'Speech in confrontation, persuasion without manipulation, and kingly conversation.' },
  { id:'legacy',      label:'Legacy',      numeral:'+',   href:'/legacy',      accent:'#571641', lessons:2,  desc:'Multi-generational leadership and building advisory councils that outlast you.' },
  { id:'library',     label:'Royal Library',numeral:'IX',  href:'/library',     accent:'#5C4033', lessons:25, desc:'Wisdom for the mind and spirit. Bible-anchored book studies for young kings.' }
];

/* ============================================================
   DAILY ROYAL CODEX — Mixed lesson rotation across all campuses
   ============================================================ */
const DAILY_LESSONS = [
  // Designed to mix campuses so the user touches every area each week
  {campusId:'nourishment',lesson:1,title:'The Ancient Blueprint',brief:'Why the Creator engraved food laws on eternity.'},
  {campusId:'templecare',lesson:1,title:'The Temple Mandate',brief:'Your body is a temple of the Holy Spirit.'},
  {campusId:'attire',lesson:1,title:'The Covenant Ring',brief:'What adorns a king\u2019s hand speaks before he does.'},
  {campusId:'mentality',lesson:1,title:'The Servant King',brief:'Greatness is measured by service, not status.'},
  {campusId:'presence',lesson:1,title:'The Silent Commander',brief:'How to own a room without saying a word.'},
  {campusId:'nourishment',lesson:2,title:'Clean Design Decoded',brief:'Hoof, cud, fin, and scale as divine architecture.'},
  {campusId:'speech',lesson:1,title:'Words Under Pressure',brief:'How a king speaks when provoked.'},
  {campusId:'templecare',lesson:2,title:'Hairstyles for a King',brief:'Discipline begins at the crown of the head.'},
  {campusId:'legacy',lesson:1,title:'The Multi-Generational Vision',brief:'Building a legacy that outlasts your lifetime.'},
  {campusId:'nourishment',lesson:3,title:'The Royal Herd',brief:'Grass-fed beef, lamb, and venison at Whole Foods Aurora.'},
  {campusId:'templecare',lesson:13,title:'The Royal Rest Mandate',brief:'Sleep is not laziness \u2014 it is divine restoration.'},
  {campusId:'attire',lesson:2,title:'The Stewardship Watch',brief:'Time on a king\u2019s wrist is a statement of order.'},
  {campusId:'nourishment',lesson:4,title:'The Forbidden Swine',brief:'Why pork still weakens the temple in 2026.'},
  {campusId:'presence',lesson:2,title:'Reading the Room',brief:'Body language fluency in church, business, and family.'},
  {campusId:'templecare',lesson:3,title:'Beard & Facial Mastery',brief:'Trimmed, not marred \u2014 the line between vanity and neglect.'},
  {campusId:'mentality',lesson:2,title:'Leading as a Follower',brief:'The king who cannot follow cannot lead.'},
  {campusId:'nourishment',lesson:5,title:'Ocean Kings',brief:'Wild-caught salmon and cod vs farmed deception.'},
  {campusId:'templecare',lesson:14,title:'The Architecture of Sleep',brief:'How circadian rhythm mirrors creation\u2019s design.'},
  {campusId:'attire',lesson:3,title:'The Necklace Question',brief:'When a chain speaks and when it shouts.'},
  {campusId:'speech',lesson:2,title:'Persuasion Without Manipulation',brief:'The difference between influence and coercion.'},
  {campusId:'nourishment',lesson:6,title:'Birds of the Throne',brief:'Quail, chicken, and forgotten clean fowl.'},
  {campusId:'templecare',lesson:4,title:'Daily Shower Protocol',brief:'Wash yourselves, make yourselves clean.'},
  {campusId:'legacy',lesson:2,title:'The Advisory Council',brief:'Building a circle that sharpens your reign.'},
  {campusId:'presence',lesson:3,title:'Influence Without Words',brief:'Psychological presence in high-stakes settings.'},
  {campusId:'nourishment',lesson:7,title:'Genesis Gardens',brief:'Fruits, nuts, and honey that fuel royal energy.'},
  {campusId:'templecare',lesson:15,title:'The Evening Descent',brief:'How to wind down the temple for restoration.'},
  {campusId:'attire',lesson:4,title:'Modest Adornment',brief:'The theology of what you wear on your body.'},
  {campusId:'mentality',lesson:3,title:'Advising the Wise',brief:'How to counsel people smarter than you.'},
  {campusId:'nourishment',lesson:8,title:'The Gentleman\u2019s Table',brief:'Posture, pace, and presence while dining.'},
  {campusId:'templecare',lesson:5,title:'Shampoo & Scalp Stewardship',brief:'What touches the crown of the temple matters.'},
  {campusId:'nourishment',lesson:9,title:'Provision for Legacy',brief:'Hosting family meals that build lineage.'},
  {campusId:'templecare',lesson:16,title:'The Nap Theology',brief:'Short rest as a weapon of restoration.'},
  {campusId:'attire',lesson:5,title:'Rings of Meaning',brief:'Covenant, heritage, and the symbolism on your hand.'},
  {campusId:'nourishment',lesson:10,title:'Highway Kingship',brief:'Gas-station Epic Bars, tuna packs, and I-70 survival.'},
  {campusId:'templecare',lesson:6,title:'Teeth & Oral Care',brief:'Temple maintenance starts at the gate.'},
  {campusId:'nourishment',lesson:11,title:'Airport Thrones',brief:'Pre-security clean meals at Denver International.'},
  {campusId:'templecare',lesson:17,title:'Sleep Environment Design',brief:'The king\u2019s chamber as a sanctuary of rest.'},
  {campusId:'attire',lesson:6,title:'The Minimalist Standard',brief:'Less adorns more when the man carries weight.'},
  {campusId:'nourishment',lesson:12,title:'Plate Scanner Mastery',brief:'Real-time Leviticus 11 analysis in 2026.'},
  {campusId:'templecare',lesson:7,title:'Deodorant & Cologne',brief:'A king\u2019s scent arrives before him.'},
  {campusId:'nourishment',lesson:13,title:'Poolside Protocol',brief:'BBQ plates and gentleman etiquette.'},
  {campusId:'templecare',lesson:18,title:'Dreams & the Subconscious',brief:'What the Creator communicates through sleep.'},
  {campusId:'nourishment',lesson:14,title:'Jeans-at-Table Mastery',brief:'Sitting as royalty in any attire.'},
  {campusId:'templecare',lesson:8,title:'Skin Care for Kings',brief:'Aging with dignity, not denial.'},
  {campusId:'nourishment',lesson:15,title:'Slavic-American Fusion',brief:'Old-world discipline meets modern provision.'},
  {campusId:'templecare',lesson:19,title:'Jet Lag & Travel Sleep',brief:'Maintaining royal rest across time zones.'},
  {campusId:'nourishment',lesson:16,title:'Butchering with Honor',brief:'How a king prepares meat in 2026 kitchens.'},
  {campusId:'templecare',lesson:9,title:'Hand & Nail Discipline',brief:'First-impression details.'},
  {campusId:'nourishment',lesson:17,title:'Seasonal Creation Rhythm',brief:'Farmers markets in Aurora and wild foraging.'},
  {campusId:'templecare',lesson:20,title:'The Sleep Covenant',brief:'Your 30-day plan for royal rest.'},
  {campusId:'nourishment',lesson:18,title:'Daniel Fast Reset',brief:'21-day temple cleansing for 2026 warriors.'},
  {campusId:'templecare',lesson:10,title:'Full Temple Routine',brief:'Morning and evening rituals.'},
  {campusId:'nourishment',lesson:19,title:'Dining Out as Royalty',brief:'Chick-fil-A, Chipotle, and restaurant command.'},
  {campusId:'templecare',lesson:11,title:'Travel Grooming Kits',brief:'I-70 and airport ready.'},
  {campusId:'nourishment',lesson:20,title:'Recovery Fuel',brief:'Post-workout meals that restore the temple.'},
  {campusId:'templecare',lesson:12,title:'Fitness as Worship',brief:'Exercise as temple maintenance.'},
  {campusId:'nourishment',lesson:21,title:'Teaching the Next Generation',brief:'Children at the king\u2019s table.'},
  {campusId:'nourishment',lesson:22,title:'Travel Pantry Blueprint',brief:'Road-trip kits that never compromise.'},
  {campusId:'nourishment',lesson:23,title:'Energy That Lasts',brief:'Avoiding blood and fat traps in modern food.'},
  {campusId:'nourishment',lesson:24,title:'The 30-Day Covenant',brief:'Your personal nourishment plan.'},
  {campusId:'nourishment',lesson:25,title:'Capstone',brief:'Living Leviticus 11 as a king of faith.'},
  {campusId:'library',lesson:1,title:'The Renewed Mind',brief:'Romans 12:2 + Psycho-Cybernetics.'},
  {campusId:'library',lesson:5,title:'The Growth Decree',brief:'Philippians 4:13 + Mindset by Dweck.'},
  {campusId:'library',lesson:11,title:'Atomic Obedience',brief:'Luke 16:10 + Atomic Habits by Clear.'},
  {campusId:'library',lesson:12,title:'The Deep Chamber',brief:'Psalm 46:10 + Deep Work by Newport.'},
  {campusId:'library',lesson:18,title:'Purpose as Blueprint',brief:'Jeremiah 29:11 + Purpose Driven Life.'},
  {campusId:'library',lesson:22,title:'The Reason for Faith',brief:'1 Peter 3:15 + Mere Christianity.'},
  {campusId:'library',lesson:25,title:'The Unhurried King',brief:'Psalm 23:2 + Ruthless Elimination of Hurry.'},
  {campusId:'nourishment',lesson:26,title:'The Living Water Principle',brief:'John 4 + hydration science for the temple.'},
  {campusId:'nourishment',lesson:27,title:'Daily Hydration Discipline',brief:'Exact daily amounts for temple performance.'},
  {campusId:'mentality',lesson:4,title:'The King\u2019s Hours',brief:'Psalm 90:12 \u2014 time as divine stewardship.'},
  {campusId:'mentality',lesson:7,title:'The Sabbath Principle',brief:'Exodus 20:8 \u2014 holy rest as command.'},
  {campusId:'attire',lesson:23,title:'Beard Stewardship Expanded',brief:'Types, frequency, and styles for kings.'},
  {campusId:'attire',lesson:27,title:'Shoes That Walk in Wisdom',brief:'Proverbs 4:26 applied to footwear.'}
];

function getDailyLesson(){
  // Smart rotation: skip already-absorbed lessons, avoid same campus twice in a row
  var dayIndex=Math.floor((Date.now()-new Date('2024-01-01').getTime())/86400000);
  var lastCampus=localStorage.getItem('kl_last_daily_campus')||'';
  // Try from day index forward to find next unabsorbed lesson
  for(var i=0;i<DAILY_LESSONS.length;i++){
    var idx=(dayIndex+i)%DAILY_LESSONS.length;
    var dl=DAILY_LESSONS[idx];
    var absorbed=JSON.parse(localStorage.getItem('kl_'+dl.campusId+'_absorbed')||'[]');
    if(!absorbed.includes(dl.lesson)){
      // Prefer different campus than yesterday (but don't hard-block)
      if(i===0&&dl.campusId===lastCampus&&DAILY_LESSONS.length>1){
        var next=DAILY_LESSONS[(dayIndex+1)%DAILY_LESSONS.length];
        var nextAbsorbed=JSON.parse(localStorage.getItem('kl_'+next.campusId+'_absorbed')||'[]');
        if(!nextAbsorbed.includes(next.lesson)&&next.campusId!==lastCampus)return next;
      }
      return dl;
    }
  }
  // All absorbed — cycle from beginning
  return DAILY_LESSONS[dayIndex%DAILY_LESSONS.length];
}
function markDailyLessonCampus(campusId){localStorage.setItem('kl_last_daily_campus',campusId);}
function getTimeInvestedThisWeek(){
  var log=getHabitLog();var weekAgo=Date.now()-7*86400000;
  return log.filter(function(e){return new Date(e.date).getTime()>weekAgo;}).length;
}
function getLessonHistory(){
  var history=JSON.parse(localStorage.getItem('kl_lesson_history')||'[]');
  return history.slice(-20);
}
function addToLessonHistory(campusId,lessonNum,title){
  var history=JSON.parse(localStorage.getItem('kl_lesson_history')||'[]');
  history.push({campusId:campusId,lesson:lessonNum,title:title,date:new Date().toISOString()});
  if(history.length>100)history=history.slice(-100);
  localStorage.setItem('kl_lesson_history',JSON.stringify(history));
}
function getDailyLessonCampus(){
  var dl=getDailyLesson();
  return CAMPUSES.find(function(c){return c.id===dl.campusId;});
}

/* ============================================================
   LLM PERSONA COMPRESSION — Campus-specific system prompts
   ============================================================ */
var LLM_PERSONAS = {
  nourishment: 'You are the Lead Professor of Biblical Nutrition. Expert in Leviticus 11, clean/unclean foods, Hebrew food terminology, and modern grocery sourcing. Tie every answer to Scripture and practical modern application. Use the user\u2019s location (if provided) to personalize sourcing advice.',
  attire: 'You are the Lead Professor of Biblical Attire. Expert in modest adornment, Leviticus 19:19 fabric laws, 1 Timothy 2:9-10, jewelry symbolism, gentleman grooming. Tie every answer to Scripture and practical modern style.',
  mentality: 'You are the Lead Professor of Biblical Mentality. Expert in servant leadership (Matt 20:26), wisdom literature, psychological influence grounded in Proverbs, and advising the wise. Tie every answer to Scripture.',
  treasury: 'You are the Lead Professor of Biblical Treasury. Expert in Proverbs on wealth, tithing, stewardship, and practical financial strategies grounded in Scripture.',
  templecare: 'You are the Lead Professor of Biblical Temple Care. Expert in 1 Corinthians 6:19-20 body stewardship, grooming, sleep (Psalm 127:2), hygiene, and fitness as worship. Tie every answer to Scripture and practical modern life.',
  presence: 'You are the Lead Professor of Biblical Presence. Expert in body language, Proverbs on silence and discernment, psychological influence, and commanding rooms with quiet authority. Tie every answer to Scripture.',
  speech: 'You are the Lead Professor of Biblical Speech. Expert in Proverbs 15:1 gentle answers, persuasion without manipulation, 1 Timothy 4:12 speech as credential. Tie every answer to Scripture.',
  legacy: 'You are the Lead Professor of Biblical Legacy. Expert in multi-generational vision (Psalm 78), advisory councils (Proverbs 11:14), and building what outlasts your lifetime. Tie every answer to Scripture.',
  library: 'You are the Lead Professor of the King\u2019s Library. Expert in Biblical wisdom literature, visualization/mindset (Psycho-Cybernetics, Think and Grow Rich), productivity (Atomic Habits, Deep Work, Getting Things Done), and spiritual growth (Purpose Driven Life, Mere Christianity, Cost of Discipleship). Always anchor in Scripture first, then reference the relevant book as a practical tool.',
  default: 'You are the King\u2019s Counsel, a wise advisor grounded in Scripture across all domains of kingship \u2014 nourishment, attire, mentality, treasury, temple care, presence, speech, legacy, and the royal library. Respond with high vocabulary, brevity, and kingly authority.'
};

function getCurrentCampusId(){
  var path=window.location.pathname;
  for(var i=0;i<CAMPUSES.length;i++){if(path.indexOf(CAMPUSES[i].id)!==-1)return CAMPUSES[i].id;}
  return 'default';
}
function getCampusSystemPrompt(campusId){
  return (LLM_PERSONAS[campusId]||LLM_PERSONAS['default'])+' Reference relevant Bible verses. Keep responses under 100 words. Speak as a mentor, not a servant.';
}

async function enhanceWithLLM(lessonTitle,campusName){
  var cfg=getLLMConfig();
  if(!cfg.endpoint&&!cfg.apiKey)return null;
  var onboarding=getOnboarding();
  var context='';
  if(onboarding){
    if(onboarding.location)context+='The user is based in '+onboarding.location+'. ';
    if(onboarding.name)context+='Their name is '+onboarding.name+'. ';
    if(onboarding.goals)context+='Their goals: '+onboarding.goals+'. ';
    if(onboarding.experience)context+='Experience level: '+onboarding.experience+'. ';
  }
  var recentJournal=getJournalEntries().slice(-3).map(function(e){return e.answer;}).join(' ');
  if(recentJournal)context+='Recent reflections: '+recentJournal.substring(0,200)+'. ';
  var prompt='The user just read "'+lessonTitle+'" from '+campusName+'. '+context+'Give a personalized Royal Insight (60-80 words) connecting this lesson to their journey. Reference one Bible verse.';
  var campusId=CAMPUSES.find(function(c){return c.label===campusName;})?.id||'default';
  return askLLMWithPersona(prompt,campusId);
}
function hasLLMConfigured(){var cfg=getLLMConfig();return !!(cfg.endpoint||cfg.apiKey);}

/* ============================================================
   TRANSFORMATION ENGINE — Habit tracking, Temple Change Score,
   Micro-Quest Chains, Reflection Loop, Evolution Map
   ============================================================ */
function getHabitLog(){return JSON.parse(localStorage.getItem('kl_habit_log')||'[]');}
function logHabit(campusId,action){
  var log=getHabitLog();
  log.push({campus:campusId,action:action,date:new Date().toISOString()});
  if(log.length>500)log=log.slice(-500);
  localStorage.setItem('kl_habit_log',JSON.stringify(log));
}

function getTempleChangeScore(){
  var log=getHabitLog();
  var thirtyDaysAgo=Date.now()-30*86400000;
  var recent=log.filter(function(e){return new Date(e.date).getTime()>thirtyDaysAgo;});
  var daysActive=new Set(recent.map(function(e){return new Date(e.date).toDateString();})).size;
  var questsComplete=0;
  CAMPUSES.forEach(function(c){
    var q=getQuests(c.id);
    questsComplete+=Object.values(q).filter(function(v){return v===true;}).length;
  });
  var absorbed=0;
  CAMPUSES.forEach(function(c){
    absorbed+=JSON.parse(localStorage.getItem('kl_'+c.id+'_absorbed')||'[]').length;
  });
  return Math.min(100,Math.round((daysActive*2)+(questsComplete*3)+(absorbed*1.5)));
}

function getMicroQuestDay(){
  var start=localStorage.getItem('kl_quest_chain_start');
  if(!start){localStorage.setItem('kl_quest_chain_start',new Date().toISOString());return 1;}
  return Math.floor((Date.now()-new Date(start).getTime())/86400000)+1;
}

function getAdaptiveQuest(campusId,lessonNum){
  var day=getMicroQuestDay();
  var streak=parseInt(localStorage.getItem('kl_streak')||'0');
  if(day<=7)return {level:'Foundation',text:'Log one action from this lesson today. Write what you did and how it felt.',type:'log'};
  if(day<=14)return {level:'Integration',text:'Apply this lesson\u2019s principle for 3 consecutive days. Track each day in your journal.',type:'streak'};
  if(day<=21)return {level:'Mastery',text:'Teach this lesson\u2019s core principle to one person this week. Record their response.',type:'teach'};
  return {level:'Legacy',text:'Review your journal entries from the past 21 days. Write a one-paragraph summary of how this campus has changed your daily life.',type:'reflect'};
}

function getReflectionPrompt(campusId){
  var entries=getJournalEntries().filter(function(e){return e.pillar===campusId;}).slice(-2);
  if(entries.length===0)return null;
  return 'In a previous reflection, you wrote: \u201C'+entries[entries.length-1].answer.substring(0,120)+'\u2026\u201D How has your perspective evolved since then?';
}

function getEvolutionMapData(){
  return CAMPUSES.map(function(c){
    var absorbed=JSON.parse(localStorage.getItem('kl_'+c.id+'_absorbed')||'[]').length;
    var quests=Object.values(getQuests(c.id)).filter(function(v){return v===true;}).length;
    var habits=getHabitLog().filter(function(e){return e.campus===c.id;}).length;
    return {id:c.id,label:c.label,accent:c.accent,numeral:c.numeral,lessons:c.lessons,absorbed:absorbed,quests:quests,habits:habits,score:c.lessons>0?Math.round((absorbed/c.lessons)*100):0};
  });
}

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
  window.location.href='/';
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
  var a=document.createElement('a');a.href='/';a.className='inline-block px-8 py-3 bg-[#A38255] text-white font-cinzel tracking-wider rounded-lg hover:bg-[#571641] transition-all duration-500';a.textContent='Return to the Gates';
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
function getDayIndex(){
  // Rotate every 24h using localStorage timestamp
  var stored=localStorage.getItem('kl_verse_index');
  var lastChange=localStorage.getItem('kl_verse_changed');
  var now=Date.now();
  if(stored!==null&&lastChange&&(now-parseInt(lastChange))<86400000)return parseInt(stored);
  var idx=stored!==null?(parseInt(stored)+1)%PRINCIPLES.length:Math.floor((now-new Date('2024-01-01').getTime())/86400000)%PRINCIPLES.length;
  localStorage.setItem('kl_verse_index',idx);localStorage.setItem('kl_verse_changed',now);
  return idx;
}
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
  var cur=window.location.pathname||'/dashboard';nav.textContent='';
  var w=document.createElement('div');w.className='bg-[#052B20] text-white sticky top-0 z-50 shadow-lg';

  // Daily principle bar
  var pb=document.createElement('div');pb.className='bg-[#08052D] text-[#A38255] text-center text-sm py-2 px-4 font-playfair';pb.id='dailyPrinciple';

  // Main bar
  var mb=document.createElement('div');mb.className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between';

  // Logo
  var logo=document.createElement('a');logo.href='/dashboard';logo.className='flex items-center gap-3 group';
  var logoSvg=document.createRange().createContextualFragment(CROWN_SVG);logo.appendChild(logoSvg);
  var lt=document.createElement('span');lt.className='font-cinzel text-lg tracking-widest text-[#A38255] group-hover:text-white transition-colors hidden sm:inline';lt.textContent="A King\u2019s Lifestyle";logo.appendChild(lt);

  // Desktop nav
  var dl=document.createElement('div');dl.className='hidden lg:flex items-center gap-1';

  // Dashboard link
  var dashLink=document.createElement('a');dashLink.href='/dashboard';
  dashLink.className='px-3 py-1.5 rounded text-sm font-inter transition-colors '+(cur==='/dashboard'?'bg-[#A38255]/20 text-[#A38255]':'text-white/80 hover:text-[#A38255]');
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
  [['/journal','Journal'],['/settings','Settings']].forEach(function(l){
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
  var mdash=document.createElement('a');mdash.href='/dashboard';mdash.className='px-3 py-2 rounded text-sm font-inter '+(cur==='/dashboard'?'bg-[#A38255]/20 text-[#A38255]':'text-white/80 hover:text-[#A38255]');mdash.textContent='Dashboard';mi.appendChild(mdash);
  var mlab=document.createElement('div');mlab.className='px-3 py-1 text-xs font-cinzel text-[#A38255]/40 tracking-widest mt-2';mlab.textContent='CAMPUSES';mi.appendChild(mlab);
  CAMPUSES.forEach(function(c){var a=document.createElement('a');a.href=c.href;a.className='px-3 py-2 rounded text-sm font-inter '+(cur===c.href?'bg-[#A38255]/20 text-[#A38255]':'text-white/80 hover:text-[#A38255]');a.textContent=c.label;mi.appendChild(a);});
  var mlab2=document.createElement('div');mlab2.className='px-3 py-1 text-xs font-cinzel text-[#A38255]/40 tracking-widest mt-2';mlab2.textContent='TOOLS';mi.appendChild(mlab2);
  [['/journal','Journal'],['/settings','Settings']].forEach(function(l){var a=document.createElement('a');a.href=l[0];a.className='px-3 py-2 rounded text-sm font-inter '+(cur===l[0]?'bg-[#A38255]/20 text-[#A38255]':'text-white/80 hover:text-[#A38255]');a.textContent=l[1];mi.appendChild(a);});
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
  [['/dashboard','Dashboard'],['/journal','Journal'],['/settings','Settings'],['/privacy','Privacy'],['/terms','Terms']].forEach(function(x){var a=document.createElement('a');a.href=x[0];a.className='hover:text-[#A38255] transition';a.textContent=x[1];c3l.appendChild(a);});
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
  [['/privacy','Privacy'],['/terms','Terms']].forEach(function(x){var a=document.createElement('a');a.href=x[0];a.className='hover:text-[#A38255] transition';a.textContent=x[1];lk.appendChild(a);});
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
  if(hasGuestData()){setTimeout(function(){if(confirm('Migrate previous progress from guest session?')){msg.textContent='Progress migrated successfully.';}else{Object.keys(localStorage).filter(function(k){return k.startsWith('kl_')&&!['kl_userId','kl_userEmail','kl_isGuest','kl_dark'].includes(k);}).forEach(function(k){localStorage.removeItem(k);});}setTimeout(function(){window.location.href='/dashboard';},600);},500);}
  else{setTimeout(function(){window.location.href='/dashboard';},800);}
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
  return askLLMWithPersona(question,getCurrentCampusId());
}
async function askLLMWithPersona(question,campusId){
  var cfg=getLLMConfig();
  if(!cfg.endpoint&&!cfg.apiKey)return FALLBACK_RESPONSES[Math.floor(Math.random()*FALLBACK_RESPONSES.length)];
  var systemPrompt=getCampusSystemPrompt(campusId||'default');
  var messages=[{role:'system',content:systemPrompt},{role:'user',content:question}];
  try{
    if(cfg.provider==='ollama'){
      var ollamaUrl=cfg.endpoint.replace(/\/+$/,'')+'/api/chat';
      // Use text/plain to avoid CORS preflight (simple request — no OPTIONS sent)
      var res=await fetch(ollamaUrl,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify({model:cfg.model||'llama3.2',messages:messages,stream:false})});
      if(!res.ok){var et=await res.text().catch(function(){return '';});return 'Ollama HTTP '+res.status+': '+(et.substring(0,80)||'Error')+'. Ensure ollama is running.';}
      var data=await res.json();return data.message?.content||data.response||'Empty Ollama response. Check model name: '+cfg.model;
    }else{
      var url=cfg.endpoint||'https://api.openai.com/v1/chat/completions';
      var hdrs={'Content-Type':'application/json','Authorization':'Bearer '+cfg.apiKey};
      if(cfg.provider==='openrouter'){hdrs['HTTP-Referer']='https://akingslifestyle.calyvent.com';hdrs['X-Title']='A Kings Lifestyle';}
      var res2=await fetch(url,{method:'POST',mode:'cors',headers:hdrs,body:JSON.stringify({model:cfg.model||'gpt-4o-mini',messages:messages,max_tokens:150})});
      var raw=await res2.text();
      if(!res2.ok)return 'API HTTP '+res2.status+': '+raw.substring(0,120);
      var data2=JSON.parse(raw);
      return data2.choices?.[0]?.message?.content||data2.choices?.[0]?.text||data2.message?.content||data2.response||'Unexpected response format. Open console (F12). Model: '+cfg.model;
    }
  }catch(err){
    if(err.message&&err.message.indexOf('Failed to fetch')!==-1&&cfg.provider==='ollama'){
      return 'Cannot reach Ollama at '+cfg.endpoint+'. Fix: open terminal, run OLLAMA_ORIGINS=* ollama serve';}
    return 'Connection failed: '+(err.message||'Network error')+'. Check endpoint/key in Settings.';}
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
   IMAGE GENERATION — Grok Imagine via Replicate / fal.ai
   ============================================================ */
function getImageGenConfig(){
  return {
    provider:localStorage.getItem('kl_imggen_provider')||'replicate',
    apiKey:localStorage.getItem('kl_imggen_apiKey')||'',
    model:localStorage.getItem('kl_imggen_model')||'grok-imagine-image'
  };
}
function saveImageGenConfig(provider,apiKey,model){
  localStorage.setItem('kl_imggen_provider',provider||'replicate');
  localStorage.setItem('kl_imggen_apiKey',apiKey||'');
  localStorage.setItem('kl_imggen_model',model||'grok-imagine-image');
}
function hasImageGenConfigured(){return !!getImageGenConfig().apiKey;}

async function generateRoyalVisualization(prompt){
  var cfg=getImageGenConfig();
  if(!cfg.apiKey)return null;
  var fullPrompt=prompt+' in royal gentleman style, elegant, cinematic, golden hour lighting, oil painting quality';
  try{
    if(cfg.provider==='fal'){
      var res=await fetch('https://fal.run/fal-ai/grok-2-aurora/image-to-image',{
        method:'POST',headers:{'Authorization':'Key '+cfg.apiKey,'Content-Type':'application/json'},
        body:JSON.stringify({prompt:fullPrompt,image_size:'landscape_16_9'})
      });
      var data=await res.json();
      if(data.images&&data.images[0])return data.images[0].url;
      return null;
    }else{
      var res2=await fetch('https://api.replicate.com/v1/predictions',{
        method:'POST',headers:{'Authorization':'Token '+cfg.apiKey,'Content-Type':'application/json'},
        body:JSON.stringify({version:cfg.model,input:{prompt:fullPrompt}})
      });
      var pred=await res2.json();
      if(pred.error)return null;
      var getUrl=pred.urls&&pred.urls.get?pred.urls.get:'https://api.replicate.com/v1/predictions/'+pred.id;
      for(var i=0;i<30;i++){
        await new Promise(function(r){setTimeout(r,2000);});
        var check=await fetch(getUrl,{headers:{'Authorization':'Token '+cfg.apiKey}});
        var status=await check.json();
        if(status.status==='succeeded'&&status.output){
          return Array.isArray(status.output)?status.output[0]:status.output;
        }
        if(status.status==='failed')return null;
      }
      return null;
    }
  }catch(err){return null;}
}

var IMGGEN_ICON_SVG='<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/></svg>';

function _resetVizBtn(btn){
  btn.textContent='';
  var frag=document.createRange().createContextualFragment(IMGGEN_ICON_SVG);
  btn.appendChild(frag);btn.appendChild(document.createTextNode(' Generate Royal Visualization'));
}

function buildRoyalVisualizationBtn(lessonTitle,campusName,container){
  var btn=document.createElement('button');
  btn.className='royal-viz-btn w-full py-3 mt-4 border-2 border-royal-gold text-royal-gold font-cinzel tracking-wider rounded-xl hover:bg-royal-gold hover:text-white transition-all duration-500 flex items-center justify-center gap-3';
  var cfg=getImageGenConfig();
  if(!cfg.apiKey){
    btn.textContent='Connect Grok Imagine in Settings for custom visuals';
    btn.onclick=function(){window.location.href='/settings';};
  }else{
    _resetVizBtn(btn);
    btn.onclick=async function(){
      btn.disabled=true;btn.textContent='Generating your royal vision...';btn.classList.add('opacity-60');
      var onboarding=getOnboarding();
      var goals=onboarding&&onboarding.goals?onboarding.goals:'becoming a king, gentleman, and man of God';
      var prompt='A young king learning about '+lessonTitle+' from '+campusName+'. Goals: '+goals+'.';
      var url=await generateRoyalVisualization(prompt);
      btn.disabled=false;btn.classList.remove('opacity-60');
      if(url){
        btn.textContent='Generate Another Vision';
        var imgWrap=document.createElement('div');imgWrap.className='mt-4 rounded-xl overflow-hidden border border-royal-gold/20';imgWrap.style.animation='fadeIn 0.8s ease-out';
        var img=document.createElement('img');img.src=url;img.alt='Your Personalized Royal Vision';img.className='w-full';img.loading='lazy';
        var cap=document.createElement('p');cap.className='text-center font-playfair italic text-sm text-royal-gold/70 py-3 bg-royal-sapphire/5 dark:bg-white/5';cap.textContent='Your Personalized Royal Vision';
        imgWrap.append(img,cap);container.parentNode.insertBefore(imgWrap,container.nextSibling);
      }else{
        _resetVizBtn(btn);
      }
    };
  }
  container.appendChild(btn);
}

/* ============================================================
   SPACED REPETITION — Review from 7 days ago
   ============================================================ */
function getSpacedRepetitionCards(){
  var history=JSON.parse(localStorage.getItem('kl_lesson_history')||'[]');
  var sevenDaysAgo=Date.now()-7*86400000;
  var eightDaysAgo=Date.now()-8*86400000;
  var cards=history.filter(function(h){
    var t=new Date(h.date).getTime();
    return t>=eightDaysAgo&&t<=sevenDaysAgo;
  });
  var seen={};
  return cards.filter(function(c){
    var key=c.campusId+'_'+c.lesson;
    if(seen[key])return false;
    seen[key]=true;return true;
  }).slice(0,3);
}

function buildSpacedRepSection(containerId){
  var container=document.getElementById(containerId);if(!container)return;
  var cards=getSpacedRepetitionCards();
  if(cards.length===0)return;
  container.textContent='';
  var wrap=document.createElement('div');wrap.className='mb-10 animate-fadeIn';
  var hdr=document.createElement('div');hdr.className='flex items-center gap-3 mb-4';
  var badge=document.createElement('span');badge.className='px-3 py-1 bg-royal-gold/10 text-royal-gold font-cinzel text-xs tracking-wider rounded-full';badge.textContent='SPACED REPETITION';
  var title=document.createElement('h3');title.className='font-cinzel text-lg text-royal-plum dark:text-royal-gold';title.textContent='Review from 7 Days Ago';
  hdr.append(badge,title);wrap.appendChild(hdr);
  var grid=document.createElement('div');grid.className='grid grid-cols-1 md:grid-cols-'+Math.min(cards.length,3)+' gap-4';
  cards.forEach(function(card){
    var campus=CAMPUSES.find(function(c){return c.id===card.campusId;});
    var el=document.createElement('a');
    el.href=(campus?campus.href:'/')+'#lesson-'+String(card.lesson).padStart(2,'0');
    el.className='block p-5 bg-white dark:bg-royal-sapphire/20 border border-royal-gold/15 rounded-xl hover:border-royal-gold/40 transition group';
    var campLabel=document.createElement('span');campLabel.className='text-xs font-cinzel tracking-wider text-royal-gold/60';campLabel.textContent=campus?campus.label:'Lesson';
    var tit=document.createElement('p');tit.className='font-cinzel text-sm text-royal-plum dark:text-royal-gold mt-1 group-hover:text-royal-gold transition';tit.textContent=card.title||('Lesson '+card.lesson);
    var hint=document.createElement('p');hint.className='text-xs font-inter text-royal-sapphire/40 dark:text-white/30 mt-2';hint.textContent='Revisit to strengthen retention';
    el.append(campLabel,tit,hint);grid.appendChild(el);
  });
  wrap.appendChild(grid);container.appendChild(wrap);
}

/* ============================================================
   ACTIVE LEARNING — Build Your Royal Habit checkpoints
   ============================================================ */
function getHabitCheckpoints(campusId){return JSON.parse(localStorage.getItem('kl_habits_'+campusId)||'{}');}
function saveHabitCheckpoint(campusId,lessonNum,value){
  var h=getHabitCheckpoints(campusId);h['lesson_'+lessonNum]=value;
  localStorage.setItem('kl_habits_'+campusId,JSON.stringify(h));
}

function buildActiveCheckpoint(campusId,lessonNum,container){
  var wrap=document.createElement('div');wrap.className='bg-royal-gold/5 dark:bg-royal-gold/10 border border-royal-gold/15 rounded-xl p-5 mt-6';wrap.style.animation='fadeIn 0.5s ease-out';
  var hdr=document.createElement('div');hdr.className='flex items-center gap-2 mb-3';
  var iconFrag=document.createRange().createContextualFragment('<svg width="18" height="18" fill="none" stroke="#A38255" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>');
  hdr.appendChild(iconFrag);
  var label=document.createElement('span');label.className='font-cinzel text-xs tracking-wider text-royal-gold';label.textContent='BUILD YOUR ROYAL HABIT';
  hdr.appendChild(label);wrap.appendChild(hdr);
  var existing=getHabitCheckpoints(campusId)['lesson_'+lessonNum]||'';
  var inp=document.createElement('input');inp.type='text';inp.value=existing;
  inp.placeholder='One specific action I will take from this lesson today...';
  inp.className='w-full px-4 py-3 rounded-lg border border-royal-gold/20 bg-white/70 dark:bg-white/5 font-inter text-sm focus:outline-none focus:border-royal-gold transition dark:text-white/80';
  inp.oninput=function(){saveHabitCheckpoint(campusId,lessonNum,inp.value);logHabit(campusId,'habit_checkpoint');};
  wrap.appendChild(inp);container.appendChild(wrap);
}

/* ============================================================
   STORYTELLING — Narrative intros per lesson
   ============================================================ */
function buildStorytellingIntro(campusLabel,lessonTitle,container){
  var wrap=document.createElement('div');wrap.className='mb-8 px-6 py-5 bg-gradient-to-r from-royal-gold/5 to-transparent dark:from-royal-gold/10 dark:to-transparent border-l-2 border-royal-gold rounded-r-xl';
  wrap.style.animation='fadeIn 0.8s ease-out';
  var p=document.createElement('p');p.className='font-playfair italic text-royal-plum dark:text-royal-gold/80 text-sm leading-relaxed';
  p.textContent='Imagine yourself as the young king stepping into the throne room of '+campusLabel+'. Today\u2019s lesson, \u201C'+lessonTitle+',\u201D is not merely information \u2014 it is an instrument of transformation. As you absorb these words, you are not the same man who opened this page. The knowledge itself changes the architecture of your mind, and what you do with it in the next twenty-four hours determines whether you remain a student or become a king.';
  wrap.appendChild(p);
  if(container.firstChild){container.insertBefore(wrap,container.firstChild);}else{container.appendChild(wrap);}
}

/* ============================================================
   SOCIAL SHARING — Share your Royal Insight
   ============================================================ */
var SHARE_ICON_SVG='<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"/></svg>';

function _resetShareBtn(btn){
  btn.textContent='';
  var frag=document.createRange().createContextualFragment(SHARE_ICON_SVG);
  btn.appendChild(frag);btn.appendChild(document.createTextNode('Share Your Royal Insight'));
}

function buildShareInsightBtn(lessonTitle,campusLabel,container){
  var btn=document.createElement('button');
  btn.className='w-full py-3 mt-3 border border-royal-gold/20 text-royal-gold/70 font-cinzel text-xs tracking-wider rounded-xl hover:bg-royal-gold/5 transition flex items-center justify-center gap-2';
  _resetShareBtn(btn);
  btn.onclick=function(){
    var text='\u201C'+lessonTitle+'\u201D from '+campusLabel+' \u2014 A King\u2019s Lifestyle\nhttps://akingslifestyle.com';
    if(navigator.share){
      navigator.share({title:lessonTitle+' \u2014 A King\u2019s Lifestyle',text:text}).catch(function(){});
    }else if(navigator.clipboard){
      navigator.clipboard.writeText(text).then(function(){
        btn.textContent='Insight copied to clipboard';
        setTimeout(function(){_resetShareBtn(btn);},2000);
      });
    }
  };
  container.appendChild(btn);
}

/* ============================================================
   ENHANCED LLM PERSONALIZATION — Custom interactive elements
   ============================================================ */
async function enhanceLessonWithLLM(lessonTitle,campusName,container){
  var cfg=getLLMConfig();
  if(!cfg.endpoint&&!cfg.apiKey)return;
  var onboarding=getOnboarding();
  var context='';
  if(onboarding){
    if(onboarding.location)context+='Location: '+onboarding.location+'. ';
    if(onboarding.goals)context+='Goals: '+onboarding.goals+'. ';
    if(onboarding.experience)context+='Experience: '+onboarding.experience+'. ';
  }
  var recentJournal=getJournalEntries().slice(-3).map(function(e){return e.answer;}).join(' ');
  if(recentJournal)context+='Recent journal: '+recentJournal.substring(0,300)+'. ';
  var prompt='The user just read "'+lessonTitle+'" from '+campusName+'. '+context+'Generate a personalized Royal Insight (60-80 words) connecting this lesson to their journey with one Bible verse. Then suggest a personalized visualization prompt.';
  var campusId=CAMPUSES.find(function(c){return c.label===campusName;})?.id||'default';
  var result=await askLLMWithPersona(prompt,campusId);
  if(!result)return;
  var wrap=document.createElement('div');wrap.className='mt-6 space-y-4';wrap.style.animation='fadeInUp 0.6s ease-out';
  var hdr=document.createElement('div');hdr.className='flex items-center gap-2';
  var badge=document.createElement('span');badge.className='px-3 py-1 bg-royal-plum/10 dark:bg-royal-gold/10 text-royal-plum dark:text-royal-gold font-cinzel text-xs tracking-wider rounded-full';badge.textContent='PERSONALIZED COUNSEL';
  hdr.appendChild(badge);wrap.appendChild(hdr);
  var content=document.createElement('div');content.className='bg-white dark:bg-royal-sapphire/20 border border-royal-gold/15 rounded-xl p-5';
  var text=document.createElement('p');text.className='font-playfair italic text-royal-plum dark:text-royal-gold/80 text-sm leading-relaxed';text.textContent=result;
  content.appendChild(text);wrap.appendChild(content);container.appendChild(wrap);
}

var ENHANCE_ICON_SVG='<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/></svg>';

function _resetEnhanceBtn(btn,label){
  btn.textContent='';
  var frag=document.createRange().createContextualFragment(ENHANCE_ICON_SVG);
  btn.appendChild(frag);btn.appendChild(document.createTextNode(' '+(label||'Enhance Lesson')));
}

function buildEnhanceLessonBtn(lessonTitle,campusName,container){
  var cfg=getLLMConfig();
  var btn=document.createElement('button');
  btn.className='w-full py-3 mt-3 bg-royal-plum/10 dark:bg-royal-gold/10 text-royal-plum dark:text-royal-gold font-cinzel text-xs tracking-wider rounded-xl hover:bg-royal-plum/20 dark:hover:bg-royal-gold/20 transition flex items-center justify-center gap-2';
  if(!cfg.endpoint&&!cfg.apiKey){
    btn.textContent='Connect LLM in Settings to personalize lessons';
    btn.onclick=function(){window.location.href='/settings';};
  }else{
    _resetEnhanceBtn(btn);
    btn.onclick=async function(){
      btn.disabled=true;btn.textContent='The King\u2019s counsel considers...';btn.classList.add('opacity-60');
      await enhanceLessonWithLLM(lessonTitle,campusName,container);
      btn.disabled=false;btn.classList.remove('opacity-60');
      _resetEnhanceBtn(btn,'Enhance Again');
    };
  }
  container.appendChild(btn);
}

/* ============================================================
   TEMPLE CHANGE SCORE — Enhanced with time investment
   ============================================================ */
function getTempleChangeScoreEnhanced(){
  var log=getHabitLog();
  var thirtyDaysAgo=Date.now()-30*86400000;
  var recent=log.filter(function(e){return new Date(e.date).getTime()>thirtyDaysAgo;});
  var daysActive=new Set(recent.map(function(e){return new Date(e.date).toDateString();})).size;
  var questsComplete=0;
  CAMPUSES.forEach(function(c){var q=getQuests(c.id);questsComplete+=Object.values(q).filter(function(v){return v===true;}).length;});
  var absorbed=0;
  CAMPUSES.forEach(function(c){absorbed+=JSON.parse(localStorage.getItem('kl_'+c.id+'_absorbed')||'[]').length;});
  var historyEntries=JSON.parse(localStorage.getItem('kl_lesson_history')||'[]');
  var recentHistory=historyEntries.filter(function(h){return new Date(h.date).getTime()>thirtyDaysAgo;});
  var timeBonus=Math.min(20,recentHistory.length*2);
  var habitBonus=0;
  CAMPUSES.forEach(function(c){var h=getHabitCheckpoints(c.id);habitBonus+=Object.values(h).filter(function(v){return v&&v.length>5;}).length;});
  return Math.min(100,Math.round((daysActive*2)+(questsComplete*3)+(absorbed*1.5)+timeBonus+(habitBonus*2)));
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
