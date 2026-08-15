/* =========================================================
   STORAGE LAYER — browser LocalStorage
========================================================= */
const STORE_KEY = "placementTrackerData_v1";

const CATS = [
  {id:"apt", name:"Aptitude & Reasoning", color:"var(--amber)"},
  {id:"dsa", name:"Data Structures & Algorithms", color:"var(--coral)"},
  {id:"lang", name:"Programming Languages", color:"var(--blue)"},
  {id:"proj", name:"Projects", color:"var(--violet)"},
  {id:"comm", name:"Communication Skills", color:"var(--teal)"},
  {id:"resume", name:"Resume Preparation", color:"var(--amber)"},
  {id:"company", name:"Company-Specific Prep", color:"var(--coral)"},
];
const PRIORITIES = ["High","Medium","Low"];
const STATUSES = ["Pending","Ongoing","Done"];

/* Curated external learning resources per category — videos, articles and
   practice platforms from well-known, stable placement-prep sources. These
   open in a new tab; the app does not host or store this content. */
const RESOURCES = {
  apt: [
    {type:"Video", title:"Aptitude & Reasoning Placement Prep", source:"PrepInsta — YouTube", url:"https://www.youtube.com/@PrepInsta"},
    {type:"Practice", title:"Topic-wise Aptitude Practice Questions", source:"IndiaBIX", url:"https://www.indiabix.com/aptitude/questions-and-answers/"},
    {type:"Article", title:"Aptitude Questions and Answers", source:"GeeksforGeeks", url:"https://www.geeksforgeeks.org/aptitude-questions-and-answers-gq/"},
  ],
  dsa: [
    {type:"Video", title:"Striver's A2Z DSA Course", source:"takeUforward", url:"https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/"},
    {type:"Video", title:"take U forward — DSA & Interview Prep", source:"YouTube", url:"https://www.youtube.com/@takeuforward"},
    {type:"Practice", title:"Data Structures Practice Problems", source:"GeeksforGeeks", url:"https://www.geeksforgeeks.org/data-structures/"},
    {type:"Practice", title:"Coding Problem Set", source:"LeetCode", url:"https://leetcode.com/"},
  ],
  lang: [
    {type:"Video", title:"Programming Language Tutorials (C / C++ / Java / Python)", source:"CodeWithHarry — YouTube", url:"https://www.youtube.com/@CodeWithHarry"},
    {type:"Article", title:"Free Full-Length Programming Courses", source:"freeCodeCamp", url:"https://www.freecodecamp.org/"},
    {type:"Article", title:"Language Syntax & Reference Docs", source:"W3Schools", url:"https://www.w3schools.com/"},
  ],
  proj: [
    {type:"Article", title:"Project Ideas for Final-Year Students", source:"GeeksforGeeks", url:"https://www.geeksforgeeks.org/computer-science-projects/"},
    {type:"Practice", title:"Explore Trending Open-Source Projects", source:"GitHub", url:"https://github.com/trending"},
    {type:"Video", title:"Full Project Build Tutorials", source:"freeCodeCamp — YouTube", url:"https://www.youtube.com/@freecodecamp"},
  ],
  comm: [
    {type:"Practice", title:"Interview Warmup — Practice Speaking Answers", source:"Google", url:"https://grow.google/certificates/interview-warmup/"},
    {type:"Article", title:"Public Speaking & Communication Clubs", source:"Toastmasters International", url:"https://www.toastmasters.org/"},
    {type:"Article", title:"Interview Communication Tips", source:"Indeed Career Guide", url:"https://www.indeed.com/career-advice/interviewing"},
  ],
  resume: [
    {type:"Article", title:"How to Write a Resume — Full Guide", source:"Novoresume", url:"https://novoresume.com/career-blog/how-to-write-a-resume"},
    {type:"Practice", title:"Free Resume / CV Templates", source:"Overleaf", url:"https://www.overleaf.com/gallery/tagged/cv"},
    {type:"Article", title:"Resume Tips for Freshers", source:"Naukri Campus", url:"https://www.naukri.com/campus/resources"},
  ],
  company: [
    {type:"Article", title:"Company-Wise Interview Experiences", source:"GeeksforGeeks", url:"https://www.geeksforgeeks.org/company-preparation/"},
    {type:"Practice", title:"Company-Wise Coding Questions", source:"LeetCode", url:"https://leetcode.com/company/"},
    {type:"Article", title:"Interview Questions by Company", source:"Glassdoor", url:"https://www.glassdoor.com/Interview/index.htm"},
  ],
};

/* In-app self-graded quiz bank — multiple choice, answer is the option index. */
const PRACTICE_QUIZ = {
  apt: [
    {q:"If a train travels 60 km in 45 minutes, what is its speed in km/h?", options:["60","75","80","90"], answer:2},
    {q:"What is 15% of 240?", options:["24","30","36","40"], answer:2},
    {q:"A shopkeeper marks up an item by 25% and then gives a 20% discount. What is the net change in price?", options:["No change","5% loss","5% gain","10% loss"], answer:0},
    {q:"The ratio of two numbers is 3:5 and their sum is 96. What is the larger number?", options:["36","48","60","72"], answer:2},
    {q:"A can finish a job in 10 days, B in 15 days. Working together, how many days will they take?", options:["5","6","7.5","8"], answer:1},
    {q:"What comes next in the series: 2, 6, 12, 20, 30, ?", options:["36","40","42","45"], answer:2},
  ],
  dsa: [
    {q:"What is the time complexity of binary search on a sorted array of n elements?", options:["O(n)","O(log n)","O(n log n)","O(1)"], answer:1},
    {q:"Which data structure uses LIFO (Last In First Out) order?", options:["Queue","Stack","Linked List","Heap"], answer:1},
    {q:"What is the worst-case time complexity of QuickSort?", options:["O(n log n)","O(n)","O(n^2)","O(log n)"], answer:2},
    {q:"Which traversal of a Binary Search Tree visits nodes in ascending sorted order?", options:["Pre-order","Post-order","In-order","Level-order"], answer:2},
    {q:"What is the space complexity of an adjacency matrix for a graph with V vertices?", options:["O(V)","O(V+E)","O(V^2)","O(E)"], answer:2},
    {q:"Which data structure is best suited for implementing a priority queue?", options:["Array","Stack","Heap","Queue"], answer:2},
  ],
  lang: [
    {q:"In most C-family languages, what is the result of: 5 % 2 ?", options:["2","2.5","1","0"], answer:2},
    {q:"Which of these is NOT a primitive data type in Java?", options:["int","boolean","String","char"], answer:2},
    {q:"In Python, what does len([1,2,3,4]) return?", options:["3","4","5","Error"], answer:1},
    {q:"What does the 'static' keyword mean for a method in Java?", options:["It can only be called once","It belongs to the class, not an instance","It cannot be overridden","It runs before main()"], answer:1},
    {q:"In C++, which keyword is used to define a constant?", options:["final","const","let","readonly"], answer:1},
    {q:"What does print(2 ** 3) output in Python?", options:["6","8","9","23"], answer:1},
  ],
  company: [
    {q:"Which of these is NOT one of the four pillars of Object-Oriented Programming?", options:["Encapsulation","Compilation","Inheritance","Polymorphism"], answer:1},
    {q:"In a typical placement offer, what does 'CTC' stand for?", options:["Cost to Company","Certified Technical Candidate","Company Training Cost","Candidate Test Criteria"], answer:0},
    {q:"Normalization in DBMS is primarily used to reduce what?", options:["Query time","Data redundancy","Number of tables","Number of users"], answer:1},
    {q:"Which SQL clause filters groups after a GROUP BY?", options:["WHERE","HAVING","FILTER","ORDER BY"], answer:1},
    {q:"In networking, what does 'DNS' stand for?", options:["Domain Name System","Data Network Service","Digital Naming Standard","Distributed Node System"], answer:0},
    {q:"Which testing technique checks a program without executing the code?", options:["Unit testing","Static testing","Dynamic testing","Regression testing"], answer:1},
  ],
};

/* Self-practice prompts for the categories that aren't naturally MCQ-based. */
const PRACTICE_PROMPTS = {
  comm: [
    "Describe a challenge you faced in a project and how you solved it.",
    "Why should we hire you for this role?",
    "Explain a technical concept to someone with no technical background.",
    "Talk about a time you worked in a team to meet a tight deadline.",
    "What are your biggest strengths and weaknesses?",
    "Describe a technology you're excited about and why.",
    "How do you handle constructive criticism?",
    "Where do you see yourself in five years?",
  ],
  resume: [
    "Does your resume fit on one page?",
    "Are your project descriptions outcome-focused, not just a list of tools?",
    "Have you quantified achievements wherever possible (%, numbers, time saved)?",
    "Is your contact information (email, phone, LinkedIn, GitHub) accurate?",
    "Have you proofread for spelling and grammar errors?",
    "Is your most relevant experience listed first?",
    "Have you avoided generic phrases like 'hardworking' without evidence?",
    "Have you tailored this resume to the specific role or company?",
  ],
  proj: [
    "Build a personal expense tracker with charts.",
    "Create a REST API for a library management system.",
    "Build a weather dashboard using a public API.",
    "Create a URL shortener service.",
    "Build a to-do list app with authentication.",
    "Create a chat application using WebSockets.",
    "Build a simple movie recommendation system.",
    "Create a portfolio website showcasing your projects.",
  ],
};

const ACHIEVEMENT_DEFS = [
  {id:"first_task",   icon:"🎯", name:"First Step",        desc:"Complete your first task",        test:d=>d.doneCount>=1},
  {id:"ten_tasks",     icon:"📘", name:"Getting Started",    desc:"Complete 10 tasks",                test:d=>d.doneCount>=10},
  {id:"fifty_tasks",   icon:"📗", name:"Half Century",       desc:"Complete 50 tasks",                test:d=>d.doneCount>=50},
  {id:"hundred_tasks", icon:"📕", name:"Century",            desc:"Complete 100 tasks",               test:d=>d.doneCount>=100},
  {id:"streak3",       icon:"🔥", name:"3-Day Streak",       desc:"Prepare 3 days in a row",          test:d=>d.longestStreak>=3},
  {id:"streak7",       icon:"⚡", name:"Week Warrior",       desc:"Prepare 7 days in a row",          test:d=>d.longestStreak>=7},
  {id:"streak30",      icon:"🏆", name:"Iron Discipline",    desc:"Prepare 30 days in a row",         test:d=>d.longestStreak>=30},
  {id:"cat_complete",  icon:"⭐", name:"Category Champion",  desc:"Reach 100% in any category",       test:d=>d.maxCatPct>=100},
  {id:"intermediate",  icon:"🟡", name:"Intermediate Reached",desc:"Reach 25% overall readiness",     test:d=>d.overall>=25},
  {id:"advanced",      icon:"🔵", name:"Advanced Reached",    desc:"Reach 55% overall readiness",     test:d=>d.overall>=55},
  {id:"interview_ready",icon:"✅", name:"Interview Ready",   desc:"Reach 80% overall readiness",      test:d=>d.overall>=80},
  {id:"first_quiz",    icon:"🧠", name:"Quiz Rookie",        desc:"Complete your first practice quiz", test:d=>d.quizCount>=1},
  {id:"perfect_score", icon:"💯", name:"Perfect Score",      desc:"Score 100% on a practice quiz",     test:d=>d.perfectQuiz},
  {id:"quiz_master",   icon:"🎓", name:"Quiz Master",        desc:"Complete 10 practice quizzes",      test:d=>d.quizCount>=10},
];

function defaultData(){
  return {
    profile:{ name:"", degree:"", branch:"", year:"", targetRole:"", targetCompanies:"", timeline:"" },
    tasks:[],
    stats:{ longestStreak:0 },
    achievements:{},      // id -> ISO date unlocked
    history:{},           // "YYYY-MM-DD" -> overall % snapshot for that day
    practiceHistory:[],   // {id, type:'quiz'|'prompt', category, score, total, date}
    createdAt:new Date().toISOString()
  };
}

let DATA = defaultData();
let STORAGE_BLOCKED = false;
let BANNER_DISMISSED = false;

function loadData(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(raw){
      const parsed = JSON.parse(raw);
      DATA = Object.assign(defaultData(), parsed);
      DATA.tasks = DATA.tasks || [];
      DATA.profile = DATA.profile || defaultData().profile;
      DATA.stats = DATA.stats || {longestStreak:0};
      DATA.achievements = DATA.achievements || {};
      DATA.history = DATA.history || {};
      DATA.practiceHistory = DATA.practiceHistory || [];
    }
  }catch(e){
    console.warn("Could not read saved data, starting fresh.", e);
  }
}

function saveData(){
  try{
    localStorage.setItem(STORE_KEY, JSON.stringify(DATA));
    STORAGE_BLOCKED = false;
    return true;
  }catch(e){
    console.error("LocalStorage save failed (storage may be full, disabled, or blocked by the browser).", e);
    STORAGE_BLOCKED = true;
    return false;
  }
}

function storageAvailable(){
  try{
    const k="__c360_test__";
    localStorage.setItem(k,"1");
    localStorage.removeItem(k);
    return true;
  }catch(e){
    return false;
  }
}

function uid(){ return Math.random().toString(36).slice(2,10); }
function flashSaved(){
  let t = document.getElementById("save-toast");
  if(!t){
    t = document.createElement("div");
    t.id = "save-toast";
    t.className = "save-toast";
    document.body.appendChild(t);
  }
  t.textContent = "Saved";
  t.classList.remove("show"); void t.offsetWidth; t.classList.add("show");
  clearTimeout(flashSaved._timer);
  flashSaved._timer = setTimeout(()=>{ t.classList.remove("show"); }, 1100);
}
function todayKey(){ return new Date().toISOString().slice(0,10); }

/* =========================================================
   DERIVED / COMPUTATION HELPERS
========================================================= */
function catInfo(id){ return CATS.find(c=>c.id===id) || CATS[0]; }
function tasksByCat(id){ return DATA.tasks.filter(t=>t.category===id); }

function catPct(id){
  const ts = tasksByCat(id);
  if(ts.length===0) return 0;
  return Math.round((ts.filter(t=>t.status==="Done").length/ts.length)*100);
}

function overallPct(){
  if(DATA.tasks.length===0) return 0;
  return Math.round((DATA.tasks.filter(t=>t.status==="Done").length/DATA.tasks.length)*100);
}

function readinessLevel(pct){
  if(pct>=80) return {label:"Interview-Ready", color:"var(--teal)"};
  if(pct>=55) return {label:"Advanced", color:"var(--blue)"};
  if(pct>=25) return {label:"Intermediate", color:"var(--amber)"};
  return {label:"Beginner", color:"var(--coral)"};
}

function dateKey(d){ return d.slice(0,10); }

function computeCurrentStreak(){
  const set = new Set(DATA.tasks.filter(t=>t.completedAt).map(t=>dateKey(t.completedAt)));
  let streak=0, cur=new Date();
  while(true){
    const key = cur.toISOString().slice(0,10);
    if(set.has(key)){ streak++; cur.setDate(cur.getDate()-1); } else break;
  }
  return streak;
}

function computeLongestStreak(){
  const dates = [...new Set(DATA.tasks.filter(t=>t.completedAt).map(t=>dateKey(t.completedAt)))].sort();
  if(dates.length===0) return 0;
  let longest=1, run=1;
  for(let i=1;i<dates.length;i++){
    const prev = new Date(dates[i-1]), cur = new Date(dates[i]);
    const diffDays = Math.round((cur-prev)/86400000);
    if(diffDays===1){ run++; longest=Math.max(longest,run); }
    else if(diffDays>1){ run=1; }
  }
  return Math.max(longest, computeCurrentStreak());
}

function computeConsistency(){
  const doneDates = new Set(DATA.tasks.filter(t=>t.completedAt).map(t=>dateKey(t.completedAt)));
  let active=0;
  for(let i=0;i<30;i++){
    const d=new Date(); d.setDate(d.getDate()-i);
    if(doneDates.has(d.toISOString().slice(0,10))) active++;
  }
  return Math.round((active/30)*100);
}

function weeklyCompletionSeries(){
  const weeks=[]; const now=new Date();
  for(let i=5;i>=0;i--){
    const end=new Date(now); end.setDate(now.getDate()-i*7);
    const start=new Date(end); start.setDate(end.getDate()-6);
    weeks.push({start,end,count:0,label:"W"+(6-i)});
  }
  DATA.tasks.forEach(t=>{
    if(!t.completedAt) return;
    const d=new Date(t.completedAt);
    weeks.forEach(w=>{ if(d>=w.start && d<=new Date(w.end.getTime()+86399999)) w.count++; });
  });
  return weeks;
}

function historySeries(){
  // last 14 recorded days, sorted
  const keys = Object.keys(DATA.history).sort();
  return keys.slice(-14).map(k=>({date:k, pct:DATA.history[k]}));
}

function recordHistorySnapshot(){
  DATA.history[todayKey()] = overallPct();
  // keep only last 60 days to avoid unbounded growth
  const keys = Object.keys(DATA.history).sort();
  if(keys.length>60){
    keys.slice(0, keys.length-60).forEach(k=>delete DATA.history[k]);
  }
}

function syncStatsAndAchievements(){
  const longest = computeLongestStreak();
  DATA.stats.longestStreak = Math.max(DATA.stats.longestStreak||0, longest);
  recordHistorySnapshot();

  const quizAttempts = DATA.practiceHistory.filter(p=>p.type==="quiz");
  const snapshot = {
    doneCount: DATA.tasks.filter(t=>t.status==="Done").length,
    longestStreak: DATA.stats.longestStreak,
    overall: overallPct(),
    maxCatPct: DATA.tasks.length ? Math.max(...CATS.map(c=>catPct(c.id))) : 0,
    quizCount: quizAttempts.length,
    perfectQuiz: quizAttempts.some(p=>p.total>0 && p.score===p.total)
  };
  ACHIEVEMENT_DEFS.forEach(a=>{
    if(!DATA.achievements[a.id] && a.test(snapshot)){
      DATA.achievements[a.id] = new Date().toISOString();
    }
  });
}

function recommendations(){
  const recs=[];
  const pcts = CATS.map(c=>({c,pct:catPct(c.id),count:tasksByCat(c.id).length}));
  const notStarted = pcts.filter(p=>p.count===0);
  const lagging = pcts.filter(p=>p.count>0 && p.pct<40).sort((a,b)=>a.pct-b.pct);
  const highPriorityPending = DATA.tasks.filter(t=>t.priority==="High" && t.status!=="Done");

  if(DATA.tasks.length===0){
    recs.push({icon:"→",text:"Your roadmap is empty. Add tasks under each preparation area to get started."});
    return recs;
  }
  if(notStarted.length) recs.push({icon:"→",text:`No tasks yet in ${notStarted.slice(0,2).map(p=>p.c.name).join(", ")}. Add a few starter topics there.`});
  if(lagging.length) recs.push({icon:"↓",text:`${lagging[0].c.name} is at ${lagging[0].pct}% — this is your biggest skill gap right now.`});
  if(highPriorityPending.length) recs.push({icon:"!",text:`${highPriorityPending.length} high-priority task${highPriorityPending.length>1?"s":""} still pending. Clear these first.`});
  if(computeCurrentStreak()===0 && DATA.tasks.some(t=>t.completedAt)) recs.push({icon:"•",text:"No activity today yet — complete one task to keep your streak alive."});
  if(overallPct()>=80) recs.push({icon:"✓",text:"You're in interview-ready range. Focus on mock interviews and company-specific prep."});
  if(recs.length===0) recs.push({icon:"✓",text:"Steady progress across the board. Keep the pace going."});
  return recs.slice(0,4);
}

function upcomingMilestones(){
  const locked = ACHIEVEMENT_DEFS.filter(a=>!DATA.achievements[a.id]);
  const doneCount = DATA.tasks.filter(t=>t.status==="Done").length;
  const overall = overallPct();
  const longest = DATA.stats.longestStreak||0;
  return locked.slice(0,3).map(a=>{
    let sub = a.desc;
    if(a.id.includes("tasks")){
      const target = a.id==="first_task"?1:a.id==="ten_tasks"?10:a.id==="fifty_tasks"?50:100;
      sub = `${doneCount}/${target} tasks completed`;
    } else if(a.id.startsWith("streak")){
      const target = a.id==="streak3"?3:a.id==="streak7"?7:30;
      sub = `Longest streak so far: ${longest}/${target} days`;
    } else if(["intermediate","advanced","interview_ready"].includes(a.id)){
      const target = a.id==="intermediate"?25:a.id==="advanced"?55:80;
      sub = `${overall}/${target}% overall readiness`;
    }
    return {icon:a.icon, title:a.name, sub};
  });
}

/* =========================================================
   RENDER STATE
========================================================= */
let ROUTE="dashboard";
let modalState=null;
let filters={q:"",cat:"all",status:"all",priority:"all"};

function nav(route){ ROUTE=route; render(); }

const ICONS = {
  dashboard:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>`,
  roadmap:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="12" r="2.3"/><circle cx="12" cy="5" r="2.3"/><circle cx="19" cy="12" r="2.3"/><circle cx="12" cy="19" r="2.3"/><path d="M7 11 L10 6.5 M14 6.5 L17 11 M17 13 L14 17.5 M10 17.5 L7 13"/></svg>`,
  tasks:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l2 2 4-4"/><rect x="3" y="4" width="18" height="16" rx="2.5"/></svg>`,
  practice:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>`,
  analytics:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V9M11 19V4M18 19v-7"/></svg>`,
  achieve:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5"/></svg>`,
  resources:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  play:`<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
  link:`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg>`,
  check:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M4 12l5 5 11-11"/></svg>`,
  x:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  profile:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3.4"/><path d="M4.5 20c1.5-4 4.2-6 7.5-6s6 2 7.5 6"/></svg>`,
  plus:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>`,
  edit:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20l1-4 11.5-11.5a2 2 0 0 1 3 3L8 19l-4 1z"/></svg>`,
  trash:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/></svg>`,
  download:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v13m0 0l-4.5-4.5M12 16l4.5-4.5"/><path d="M4 18v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1"/></svg>`,
};

/* =========================================================
   ROOT RENDER
========================================================= */
function render(){
  const app=document.getElementById("app");
  app.innerHTML = `
    ${STORAGE_BLOCKED && !BANNER_DISMISSED ? storageBanner() : ""}
    ${renderRail()}
    <div class="main">
      ${ROUTE==="dashboard" ? renderDashboard() : ""}
      ${ROUTE==="roadmap" ? renderRoadmap() : ""}
      ${ROUTE==="tasks" ? renderTasks() : ""}
      ${ROUTE==="practice" ? renderPractice() : ""}
      ${ROUTE==="analytics" ? renderAnalytics() : ""}
      ${ROUTE==="achievements" ? renderAchievements() : ""}
      ${ROUTE==="resources" ? renderResources() : ""}
      ${ROUTE==="profile" ? renderProfile() : ""}
    </div>
    ${modalState ? renderModal() : ""}
  `;
  attachHandlers();
  if(ROUTE==="analytics") drawCharts();
}

function storageBanner(){
  return `<div class="storage-banner">
    ⚠ This browser is blocking local storage, so nothing you enter will be saved. This usually happens in a
    preview/sandbox frame, incognito mode, or with strict privacy settings enabled. Open this file directly in a
    normal browser tab, or allow site data for it, then reload.
    <button class="banner-close" id="banner-close">&times;</button>
  </div>`;
}

function renderRail(){
  const items=[
    ["dashboard","Dashboard","dashboard"],["roadmap","Roadmap","roadmap"],["tasks","Tasks","tasks"],["practice","Practice","practice"],
    ["analytics","Analytics","analytics"],["achievements","Achievements","achieve"],["resources","Resources","resources"],["profile","Profile","profile"],
  ];
  const name = DATA.profile.name || "Your journey";
  return `
  <div class="rail">
    <div class="brand">
      <div class="mark">C360</div>
      <div class="name">Career 360</div>
      <div class="sub">${escapeHtml(name)}</div>
    </div>
    <div class="navgroup">
      <div class="navlabel">Navigate</div>
      ${items.map(([r,label,icon])=>`<button class="navitem ${ROUTE===r?'active':''}" data-nav="${r}">${ICONS[icon]}<span>${label}</span></button>`).join("")}
    </div>
    <div class="rail-foot">Saved in this browser's LocalStorage.</div>
  </div>`;
}

/* =========================================================
   DASHBOARD
========================================================= */
function renderDashboard(){
  const pct=overallPct(); const level=readinessLevel(pct);
  const done=DATA.tasks.filter(t=>t.status==="Done").length;
  const pending=DATA.tasks.filter(t=>t.status!=="Done").length;
  const streak=computeCurrentStreak();

  const recentDone = DATA.tasks.filter(t=>t.completedAt).sort((a,b)=>new Date(b.completedAt)-new Date(a.completedAt)).slice(0,5);
  const upcomingTasks = DATA.tasks.filter(t=>t.status!=="Done").sort((a,b)=>({High:0,Medium:1,Low:2}[a.priority]-{High:0,Medium:1,Low:2}[b.priority])).slice(0,5);
  const milestones = upcomingMilestones();

  return `
  <div class="pagehead"><div><h1>Dashboard</h1><p class="desc">Your placement preparation at a glance.</p></div></div>

  <div class="card hero" style="margin-bottom:18px;">
    <div class="hero-gauge">
      ${gaugeSvg(pct, level.color)}
      <div class="gauge-score mono">${pct}%</div>
      <div class="gauge-level" style="background:${level.color}22;color:${level.color};">${level.label}</div>
    </div>
    <div class="hero-side">
      <div class="hero-stat-row">
        <div class="hero-stat"><div class="num">${DATA.tasks.length}</div><div class="lbl">Total tasks</div></div>
        <div class="hero-stat"><div class="num" style="color:var(--teal)">${done}</div><div class="lbl">Completed</div></div>
        <div class="hero-stat"><div class="num" style="color:var(--coral)">${pending}</div><div class="lbl">Remaining</div></div>
        <div class="hero-stat"><div class="num" style="color:var(--amber)">${streak}🔥</div><div class="lbl">Day streak</div></div>
      </div>
      <div class="hero-note">Readiness is calculated from the share of completed tasks across all preparation categories. Reach 80% completion to move into the interview-ready range.</div>
    </div>
  </div>

  <div class="card" style="margin-bottom:18px;">
    <h3 class="cardtitle">${ICONS.roadmap} Route map</h3>
    <div class="routemap"><div class="route-track">
      ${CATS.map((c,i)=>{
        const p=catPct(c.id); const n=tasksByCat(c.id).length;
        return `<div class="station">
          ${i>0?`<div class="connector"><div class="connector-fill" style="width:${p}%;background:${c.color}"></div></div>`:""}
          <div class="ring-wrap">${ringSvg(p,c.color)}</div>
          <div class="catname">${c.name}</div>
          <div class="catpct" style="color:${c.color}">${p}%</div>
          <div class="cattasks">${n} task${n===1?"":"s"}</div>
        </div>`;
      }).join("")}
    </div></div>
  </div>

  <div class="grid cols-2">
    <div class="card">
      <h3 class="cardtitle">Category progress</h3>
      ${CATS.map(c=>{const p=catPct(c.id);
        return `<div class="barrow"><div class="blabel">${c.name}</div><div class="bartrack"><div class="barfill" style="width:${p}%;background:${c.color}"></div></div><div class="barpct">${p}%</div></div>`;
      }).join("")}
    </div>
    <div class="card">
      <h3 class="cardtitle">Recommendations</h3>
      ${recommendations().map(r=>`<div class="recitem"><span class="ricon mono" style="color:var(--amber)">${r.icon}</span><span>${r.text}</span></div>`).join("")}
    </div>
  </div>

  <div class="grid cols-2" style="margin-top:18px;">
    <div class="card">
      <h3 class="cardtitle">Recently completed</h3>
      ${recentDone.length ? recentDone.map(t=>listItem(t,true)).join("") : `<div class="empty">Nothing completed yet.</div>`}
    </div>
    <div class="card">
      <h3 class="cardtitle">Upcoming priorities</h3>
      ${upcomingTasks.length ? upcomingTasks.map(t=>listItem(t,false)).join("") : `<div class="empty">No pending tasks — add some in Roadmap.</div>`}
    </div>
  </div>

  <div class="card" style="margin-top:18px;">
    <h3 class="cardtitle">${ICONS.achieve} Upcoming milestones</h3>
    ${milestones.length ? milestones.map(m=>`
      <div class="milestone-row">
        <div class="m-icon">${m.icon}</div>
        <div class="m-main"><div class="m-title">${m.title}</div><div class="m-sub">${m.sub}</div></div>
      </div>`).join("") : `<div class="empty">All milestones unlocked — great work!</div>`}
  </div>
  `;
}

function listItem(t, showDate){
  const c=catInfo(t.category);
  const prColor = t.priority==="High"?"var(--coral)":t.priority==="Medium"?"var(--amber)":"var(--mist-dim)";
  return `<div class="listitem">
    <div class="dot" style="background:${c.color}"></div>
    <div class="li-title">${escapeHtml(t.title)}</div>
    <div class="tag" style="background:${prColor}22;color:${prColor}">${t.priority}</div>
    <div class="li-meta">${showDate && t.completedAt ? new Date(t.completedAt).toLocaleDateString() : c.name}</div>
  </div>`;
}

function gaugeSvg(pct,color){
  const r=70,cx=90,cy=85;
  const angle=-180+(pct/100)*180, rad=angle*Math.PI/180;
  const nx=cx+r*Math.cos(rad), ny=cy+r*Math.sin(rad);
  const arcLen=(pct/100)*Math.PI*r, circumference=Math.PI*r;
  return `<svg width="180" height="110" viewBox="0 0 180 110">
    <path d="M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${cx+r} ${cy}" fill="none" stroke="var(--ink-800)" stroke-width="12" stroke-linecap="round"/>
    <path d="M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${cx+r} ${cy}" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${circumference-arcLen}"/>
    <line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="var(--paper)" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="5" fill="var(--paper)"/>
  </svg>`;
}

function ringSvg(pct,color){
  const r=27,c=2*Math.PI*r,off=c-(pct/100)*c;
  return `<svg width="68" height="68" viewBox="0 0 68 68">
    <circle cx="34" cy="34" r="${r}" fill="none" stroke="var(--ink-800)" stroke-width="7"/>
    <circle cx="34" cy="34" r="${r}" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 34 34)"/>
    <text x="34" y="39" text-anchor="middle" font-size="13" font-family="JetBrains Mono, monospace" fill="var(--paper)" font-weight="600">${pct}</text>
  </svg>`;
}

/* =========================================================
   ROADMAP
========================================================= */
function renderRoadmap(){
  return `
  <div class="pagehead">
    <div><h1>Roadmap</h1><p class="desc">Your preparation path across every skill area.</p></div>
    <button class="btn primary" data-open-task="__new">${ICONS.plus} Add task</button>
  </div>
  <div class="grid cols-3">
    ${CATS.map(c=>{
      const ts=tasksByCat(c.id), p=catPct(c.id);
      return `<div class="card">
        <h3 class="cardtitle" style="justify-content:space-between;">
          <span style="display:flex;align-items:center;gap:8px;"><span class="dot" style="background:${c.color};width:10px;height:10px;"></span>${c.name}</span>
          <span class="mono" style="color:${c.color};font-size:13px;">${p}%</span>
        </h3>
        <div class="bartrack" style="margin-bottom:14px;"><div class="barfill" style="width:${p}%;background:${c.color}"></div></div>
        ${ts.length ? ts.map(t=>`
          <div class="listitem">
            <button class="chk ${t.status==='Done'?'done':''}" data-toggle="${t.id}">${t.status==='Done'?checkGlyph():""}</button>
            <div class="li-title" style="${t.status==='Done'?'text-decoration:line-through;color:var(--mist-dim)':''}">${escapeHtml(t.title)}</div>
            <button class="iconbtn" data-open-task="${t.id}">${ICONS.edit}</button>
            <button class="iconbtn" data-del="${t.id}">${ICONS.trash}</button>
          </div>`).join("") : `<div class="empty">No tasks yet.</div>`}
        <button class="btn ghost small" style="margin-top:12px;width:100%;justify-content:center;" data-open-task="__new" data-precat="${c.id}">${ICONS.plus} Add to ${c.name}</button>
      </div>`;
    }).join("")}
  </div>`;
}

function checkGlyph(){ return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-950)" stroke-width="3"><path d="M4 12l5 5 11-11"/></svg>`; }

/* =========================================================
   TASKS
========================================================= */
function renderTasks(){
  let list=DATA.tasks.slice();
  if(filters.q.trim()) list=list.filter(t=>t.title.toLowerCase().includes(filters.q.toLowerCase()));
  if(filters.cat!=="all") list=list.filter(t=>t.category===filters.cat);
  if(filters.status!=="all") list=list.filter(t=>t.status===filters.status);
  if(filters.priority!=="all") list=list.filter(t=>t.priority===filters.priority);
  list.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));

  return `
  <div class="pagehead">
    <div><h1>Tasks</h1><p class="desc">Search, filter, and manage every preparation activity.</p></div>
    <button class="btn primary" data-open-task="__new">${ICONS.plus} Add task</button>
  </div>
  <div class="card">
    <div class="toolbar">
      <input type="text" id="searchbox" placeholder="Search tasks..." value="${escapeAttr(filters.q)}">
      <select id="f-cat"><option value="all">All categories</option>${CATS.map(c=>`<option value="${c.id}" ${filters.cat===c.id?"selected":""}>${c.name}</option>`).join("")}</select>
      <select id="f-status"><option value="all">All statuses</option>${STATUSES.map(s=>`<option ${filters.status===s?"selected":""}>${s}</option>`).join("")}</select>
      <select id="f-priority"><option value="all">All priorities</option>${PRIORITIES.map(p=>`<option ${filters.priority===p?"selected":""}>${p}</option>`).join("")}</select>
    </div>
    ${list.length ? list.map(t=>taskRow(t)).join("") : `<div class="empty">No tasks match these filters.</div>`}
  </div>`;
}

function taskRow(t){
  const c=catInfo(t.category);
  const prColor = t.priority==="High"?"var(--coral)":t.priority==="Medium"?"var(--amber)":"var(--mist-dim)";
  return `<div class="task-row">
    <button class="chk ${t.status==='Done'?'done':''}" data-toggle="${t.id}">${t.status==='Done'?checkGlyph():""}</button>
    <div class="task-main ${t.status==='Done'?'done':''}">
      <div class="t-title">${escapeHtml(t.title)}</div>
      <div class="t-sub"><span class="dot" style="background:${c.color}"></span>${c.name}<span class="tag" style="background:${prColor}22;color:${prColor}">${t.priority}</span><span>${t.status}</span></div>
    </div>
    <div class="task-actions">
      <button class="iconbtn" data-open-task="${t.id}">${ICONS.edit}</button>
      <button class="iconbtn" data-del="${t.id}">${ICONS.trash}</button>
    </div>
  </div>`;
}

/* =========================================================
   ANALYTICS
========================================================= */
function renderAnalytics(){
  const consistency=computeConsistency();
  const totalDone=DATA.tasks.filter(t=>t.status==="Done").length;
  const gaps = CATS.map(c=>({c,pct:catPct(c.id),n:tasksByCat(c.id).length})).filter(x=>x.n>0 && x.pct<50).sort((a,b)=>a.pct-b.pct);

  return `
  <div class="pagehead">
    <div><h1>Analytics</h1><p class="desc">Trends, consistency, and skill-gap identification.</p></div>
    <div style="display:flex;gap:10px;">
      <button class="btn" id="export-json">${ICONS.download} Export data (.json)</button>
      <button class="btn primary" id="export-txt">${ICONS.download} Export report (.txt)</button>
    </div>
  </div>

  <div class="card" style="margin-bottom:18px;">
    <div class="streak-box">
      <div class="streak-item"><div class="num" style="color:var(--amber)">${computeCurrentStreak()}</div><div class="lbl">Current streak (days)</div></div>
      <div class="streak-item"><div class="num" style="color:var(--teal)">${consistency}%</div><div class="lbl">30-day consistency</div></div>
      <div class="streak-item"><div class="num">${totalDone}</div><div class="lbl">Tasks completed all-time</div></div>
      <div class="streak-item"><div class="num">${overallPct()}%</div><div class="lbl">Overall readiness</div></div>
    </div>
  </div>

  <div class="grid cols-2">
    <div class="card"><h3 class="cardtitle">Weekly completions</h3><div class="chartwrap"><canvas id="chart-weekly"></canvas></div></div>
    <div class="card"><h3 class="cardtitle">Category completion</h3><div class="chartwrap"><canvas id="chart-cat"></canvas></div></div>
  </div>

  <div class="grid cols-2" style="margin-top:18px;">
    <div class="card"><h3 class="cardtitle">Readiness trend (last 14 days)</h3><div class="chartwrap"><canvas id="chart-trend"></canvas></div></div>
    <div class="card">
      <h3 class="cardtitle">Skill gaps</h3>
      ${gaps.length ? gaps.map(g=>`<div class="recitem"><span class="ricon" style="color:${g.c.color}">●</span><span><b>${g.c.name}</b> is at ${g.pct}% completion — needs attention.</span></div>`).join("") : `<div class="empty">No major gaps detected — every started category is above 50%.</div>`}
    </div>
  </div>`;
}

let chartWeekly=null, chartCat=null, chartTrend=null;
function drawCharts(){
  if(typeof Chart==="undefined") return;
  const weeks=weeklyCompletionSeries();
  const ctx1=document.getElementById("chart-weekly");
  if(chartWeekly) chartWeekly.destroy();
  if(ctx1){
    chartWeekly=new Chart(ctx1,{type:"bar",data:{labels:weeks.map(w=>w.label),datasets:[{data:weeks.map(w=>w.count),backgroundColor:"#3FBFA6",borderRadius:5}]},
      options:{plugins:{legend:{display:false}},scales:{x:{ticks:{color:"#8B98A5"},grid:{display:false}},y:{ticks:{color:"#8B98A5",precision:0},grid:{color:"#2A3540"}}}}});
  }
  const ctx2=document.getElementById("chart-cat");
  if(chartCat) chartCat.destroy();
  if(ctx2){
    const resolved = CATS.map(c=>getComputedStyle(document.documentElement).getPropertyValue(c.color.replace("var(","").replace(")","")).trim()||"#E8A33D");
    chartCat=new Chart(ctx2,{type:"bar",data:{labels:CATS.map(c=>c.name.split(" ")[0]),datasets:[{data:CATS.map(c=>catPct(c.id)),backgroundColor:resolved,borderRadius:5}]},
      options:{indexAxis:"y",plugins:{legend:{display:false}},scales:{x:{min:0,max:100,ticks:{color:"#8B98A5"},grid:{color:"#2A3540"}},y:{ticks:{color:"#8B98A5"},grid:{display:false}}}}});
  }
  const ctx3=document.getElementById("chart-trend");
  if(chartTrend) chartTrend.destroy();
  if(ctx3){
    const series=historySeries();
    chartTrend=new Chart(ctx3,{type:"line",data:{labels:series.map(s=>s.date.slice(5)),datasets:[{data:series.map(s=>s.pct),borderColor:"#E8A33D",backgroundColor:"#E8A33D22",fill:true,tension:.3,pointRadius:2}]},
      options:{plugins:{legend:{display:false}},scales:{x:{ticks:{color:"#8B98A5"},grid:{display:false}},y:{min:0,max:100,ticks:{color:"#8B98A5"},grid:{color:"#2A3540"}}}}});
  }
}

/* =========================================================
   ACHIEVEMENTS / GAMIFICATION
========================================================= */
function renderAchievements(){
  const current=computeCurrentStreak(), longest=DATA.stats.longestStreak||0, consistency=computeConsistency();
  const unlockedCount = ACHIEVEMENT_DEFS.filter(a=>DATA.achievements[a.id]).length;
  return `
  <div class="pagehead"><div><h1>Achievements</h1><p class="desc">Streaks, consistency, and milestones earned.</p></div></div>

  <div class="card" style="margin-bottom:18px;">
    <div class="streak-box">
      <div class="streak-item"><div class="num" style="color:var(--amber)">${current}🔥</div><div class="lbl">Current streak</div></div>
      <div class="streak-item"><div class="num" style="color:var(--coral)">${longest}</div><div class="lbl">Longest streak</div></div>
      <div class="streak-item"><div class="num" style="color:var(--teal)">${consistency}%</div><div class="lbl">30-day consistency</div></div>
      <div class="streak-item"><div class="num">${unlockedCount}/${ACHIEVEMENT_DEFS.length}</div><div class="lbl">Badges unlocked</div></div>
    </div>
  </div>

  <div class="card">
    <h3 class="cardtitle">Badge collection</h3>
    <div class="badge-grid">
      ${ACHIEVEMENT_DEFS.map(a=>{
        const unlocked = DATA.achievements[a.id];
        return `<div class="badge ${unlocked?"":"locked"}">
          <div class="bicon">${a.icon}</div>
          <div class="bname">${a.name}</div>
          <div class="bdesc">${a.desc}</div>
          ${unlocked ? `<div class="bdate">Unlocked ${new Date(unlocked).toLocaleDateString()}</div>` : `<div class="bdate" style="color:var(--mist-dim)">Locked</div>`}
        </div>`;
      }).join("")}
    </div>
  </div>`;
}

/* =========================================================
   RESOURCES — reference material per skill area
========================================================= */
function typeColor(type){
  return type==="Video" ? "var(--coral)" : type==="Practice" ? "var(--teal)" : "var(--blue)";
}
function typeIcon(type){ return type==="Video" ? ICONS.play : ICONS.link; }

/* =========================================================
   PRACTICE — in-app quizzes and self-practice prompts
========================================================= */
let practiceState = null; // {catId, mode:'quiz'|'prompt', questions, idx, score, answered, selected, finished, prompt}

function practiceStatsFor(catId){
  const attempts = DATA.practiceHistory.filter(p=>p.category===catId && p.type==="quiz");
  const promptCount = DATA.practiceHistory.filter(p=>p.category===catId && p.type==="prompt").length;
  const best = attempts.length ? Math.max(...attempts.map(a=>Math.round((a.score/a.total)*100))) : null;
  return { attempts: attempts.length, best, promptCount };
}

function startQuiz(catId){
  const bank = PRACTICE_QUIZ[catId] || [];
  const shuffled = [...bank].sort(()=>Math.random()-0.5).slice(0,5);
  practiceState = { catId, mode:"quiz", questions:shuffled, idx:0, score:0, answered:false, selected:null, finished:false };
  render();
}
function selectQuizOption(i){
  if(!practiceState || practiceState.answered) return;
  practiceState.selected = i;
  practiceState.answered = true;
  if(i === practiceState.questions[practiceState.idx].answer) practiceState.score++;
  render();
}
function nextQuizQuestion(){
  if(!practiceState) return;
  if(practiceState.idx < practiceState.questions.length-1){
    practiceState.idx++; practiceState.answered=false; practiceState.selected=null;
    render();
  } else {
    practiceState.finished = true;
    DATA.practiceHistory.push({ id:uid(), type:"quiz", category:practiceState.catId, score:practiceState.score, total:practiceState.questions.length, date:new Date().toISOString() });
    syncStatsAndAchievements(); saveData();
    render();
  }
}
function retryQuiz(){ if(practiceState) startQuiz(practiceState.catId); }

function showPrompt(catId){
  const bank = PRACTICE_PROMPTS[catId] || [];
  if(!bank.length) return;
  const idx = Math.floor(Math.random()*bank.length);
  practiceState = { catId, mode:"prompt", prompt:bank[idx] };
  render();
}
function newPrompt(){ if(practiceState) showPrompt(practiceState.catId); }
function markPracticed(){
  if(!practiceState) return;
  DATA.practiceHistory.push({ id:uid(), type:"prompt", category:practiceState.catId, date:new Date().toISOString() });
  syncStatsAndAchievements(); saveData();
  practiceState = null; render();
}
function exitPractice(){ practiceState = null; render(); }

function renderPractice(){
  if(practiceState && practiceState.mode==="quiz") return renderQuizSession();
  if(practiceState && practiceState.mode==="prompt") return renderPromptSession();

  const totalQuizzes = DATA.practiceHistory.filter(p=>p.type==="quiz").length;
  const avgScore = totalQuizzes ? Math.round(DATA.practiceHistory.filter(p=>p.type==="quiz").reduce((s,p)=>s+(p.score/p.total)*100,0)/totalQuizzes) : 0;
  const totalPrompts = DATA.practiceHistory.filter(p=>p.type==="prompt").length;

  return `
  <div class="pagehead"><div><h1>Practice</h1><p class="desc">Practice every topic right inside the app — quizzes for technical areas, prompts for the rest.</p></div></div>

  <div class="card" style="margin-bottom:18px;">
    <div class="streak-box">
      <div class="streak-item"><div class="num" style="color:var(--amber)">${totalQuizzes}</div><div class="lbl">Quizzes attempted</div></div>
      <div class="streak-item"><div class="num" style="color:var(--teal)">${avgScore}%</div><div class="lbl">Average quiz score</div></div>
      <div class="streak-item"><div class="num" style="color:var(--blue)">${totalPrompts}</div><div class="lbl">Prompts practiced</div></div>
    </div>
  </div>

  <div class="grid cols-3">
    ${CATS.map(c=>{
      const hasQuiz = !!PRACTICE_QUIZ[c.id];
      const hasPrompt = !!PRACTICE_PROMPTS[c.id];
      const stats = practiceStatsFor(c.id);
      return `<div class="card">
        <h3 class="cardtitle"><span class="dot" style="background:${c.color};width:10px;height:10px;"></span>${c.name}</h3>
        ${hasQuiz ? `
          <div style="font-size:12px;color:var(--mist);margin-bottom:10px;">
            ${stats.attempts ? `${stats.attempts} attempt${stats.attempts>1?"s":""} · best ${stats.best}%` : "No attempts yet"}
          </div>
          <button class="btn primary small" style="width:100%;justify-content:center;margin-bottom:8px;" data-start-quiz="${c.id}">${ICONS.practice} Start quiz (5 Qs)</button>
        ` : ""}
        ${hasPrompt ? `
          <div style="font-size:12px;color:var(--mist);margin-bottom:10px;">${stats.promptCount ? `${stats.promptCount} prompt${stats.promptCount>1?"s":""} practiced` : "Self-practice prompts"}</div>
          <button class="btn small" style="width:100%;justify-content:center;" data-start-prompt="${c.id}">${ICONS.practice} Get a prompt</button>
        ` : ""}
      </div>`;
    }).join("")}
  </div>`;
}

function renderQuizSession(){
  const s = practiceState;
  const c = catInfo(s.catId);
  if(s.finished){
    const pct = Math.round((s.score/s.questions.length)*100);
    const level = pct>=80 ? "Excellent" : pct>=50 ? "Good effort" : "Needs more practice";
    return `
    <div class="pagehead"><div><h1>Practice — ${c.name}</h1><p class="desc">Quiz complete.</p></div></div>
    <div class="card" style="max-width:480px;text-align:center;padding:36px 24px;">
      <div style="font-size:14px;color:var(--mist);">Your score</div>
      <div class="mono" style="font-size:44px;font-weight:700;color:${c.color};margin:8px 0;">${s.score}/${s.questions.length}</div>
      <div class="gauge-level" style="display:inline-block;background:${c.color}22;color:${c.color};margin-bottom:20px;">${level} — ${pct}%</div>
      <div style="display:flex;gap:10px;justify-content:center;">
        <button class="btn ghost" id="pr-exit">Back to Practice</button>
        <button class="btn primary" id="pr-retry">Try again</button>
      </div>
    </div>`;
  }
  const q = s.questions[s.idx];
  return `
  <div class="pagehead">
    <div><h1>Practice — ${c.name}</h1><p class="desc">Question ${s.idx+1} of ${s.questions.length} · Score so far: ${s.score}</p></div>
    <button class="btn ghost small" id="pr-exit">Exit</button>
  </div>
  <div class="card" style="max-width:600px;">
    <div style="font-size:15px;font-weight:500;margin-bottom:18px;line-height:1.5;">${escapeHtml(q.q)}</div>
    ${q.options.map((opt,i)=>{
      let cls="quiz-opt";
      if(s.answered){
        if(i===q.answer) cls+=" correct";
        else if(i===s.selected) cls+=" wrong";
      }
      return `<button class="${cls}" data-opt="${i}" ${s.answered?"disabled":""}>
        <span class="quiz-opt-mark">${s.answered && i===q.answer ? ICONS.check : (s.answered && i===s.selected ? ICONS.x : "")}</span>
        <span>${escapeHtml(opt)}</span>
      </button>`;
    }).join("")}
    ${s.answered ? `<button class="btn primary" id="pr-next" style="margin-top:14px;">${s.idx<s.questions.length-1?"Next question":"See results"}</button>` : ""}
  </div>`;
}

function renderPromptSession(){
  const c = catInfo(practiceState.catId);
  return `
  <div class="pagehead"><div><h1>Practice — ${c.name}</h1><p class="desc">Self-practice prompt — work through it, then mark it done.</p></div></div>
  <div class="card" style="max-width:560px;">
    <div style="font-size:15px;font-weight:500;line-height:1.6;padding:18px;background:var(--ink-800);border-radius:10px;margin-bottom:16px;">
      ${escapeHtml(practiceState.prompt)}
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <button class="btn ghost" id="pr-exit">Exit</button>
      <button class="btn" id="pr-newprompt">New prompt</button>
      <button class="btn primary" id="pr-markdone">Mark as practiced</button>
    </div>
  </div>`;
}

function renderResources(){
  return `
  <div class="pagehead">
    <div><h1>Resources</h1><p class="desc">Reference videos, articles, and practice sites for every preparation area — everything in one place.</p></div>
  </div>
  <div class="grid cols-3">
    ${CATS.map(c=>{
      const items = RESOURCES[c.id] || [];
      return `<div class="card">
        <h3 class="cardtitle"><span class="dot" style="background:${c.color};width:10px;height:10px;"></span>${c.name}</h3>
        ${items.length ? items.map(r=>`
          <a href="${escapeAttr(r.url)}" target="_blank" rel="noopener noreferrer" class="res-item">
            <span class="res-icon" style="background:${typeColor(r.type)}22;color:${typeColor(r.type)}">${typeIcon(r.type)}</span>
            <span class="res-main">
              <span class="res-title">${escapeHtml(r.title)}</span>
              <span class="res-source">${escapeHtml(r.source)} · <span style="color:${typeColor(r.type)}">${r.type}</span></span>
            </span>
          </a>`).join("") : `<div class="empty">No resources listed yet.</div>`}
      </div>`;
    }).join("")}
  </div>
  <div class="card" style="margin-top:18px;">
    <h3 class="cardtitle">About these links</h3>
    <div style="font-size:12.5px;color:var(--mist);line-height:1.6;">
      These point to established, widely-used placement-prep platforms and channels (GeeksforGeeks, LeetCode,
      freeCodeCamp, takeUforward, IndiaBIX, and similar). They open in a new tab — this app does not host, embed,
      or store any of that content. To add your own links, edit the <span class="mono">RESOURCES</span> object
      near the top of <span class="mono">js/script.js</span>.
    </div>
  </div>`;
}

/* =========================================================
   PROFILE
========================================================= */
function renderProfile(){
  const p=DATA.profile;
  return `
  <div class="pagehead"><div><h1>Profile</h1><p class="desc">Your academic details and career goal.</p></div></div>
  <div class="card" style="max-width:640px;">
    <h3 class="cardtitle">Personal & academic</h3>
    <div class="form-grid">
      <div class="field"><label>Full name</label><input type="text" id="p-name" value="${escapeAttr(p.name)}"></div>
      <div class="field"><label>Degree</label><input type="text" id="p-degree" value="${escapeAttr(p.degree)}" placeholder="e.g. B.E / B.Tech"></div>
      <div class="field"><label>Branch</label><input type="text" id="p-branch" value="${escapeAttr(p.branch)}" placeholder="e.g. Computer Science"></div>
      <div class="field"><label>Year of study</label><input type="text" id="p-year" value="${escapeAttr(p.year)}" placeholder="e.g. Final year"></div>
    </div>
  </div>
  <div class="card" style="max-width:640px;margin-top:18px;">
    <h3 class="cardtitle">Career goal</h3>
    <div class="form-grid">
      <div class="field"><label>Target job role</label><input type="text" id="p-role" value="${escapeAttr(p.targetRole)}" placeholder="e.g. SDE, Analyst"></div>
      <div class="field"><label>Target completion timeline</label><input type="date" id="p-timeline" value="${escapeAttr(p.timeline)}"></div>
      <div class="field" style="grid-column:1/-1;"><label>Target companies</label><input type="text" id="p-companies" value="${escapeAttr(p.targetCompanies)}" placeholder="Comma separated"></div>
    </div>
    <button class="btn primary" id="save-profile">Save profile</button>
  </div>`;
}

/* =========================================================
   MODAL
========================================================= */
function renderModal(){
  const isNew = modalState.id==="__new";
  const t = isNew ? {title:"",category:modalState.precat||CATS[0].id,priority:"Medium",status:"Pending"} : DATA.tasks.find(x=>x.id===modalState.id);
  return `<div class="overlay" id="overlay">
    <div class="modal">
      <h3>${isNew?"Add task":"Edit task"}</h3>
      <div class="field"><label>Task title</label><input type="text" id="m-title" value="${escapeAttr(t.title)}" placeholder="e.g. Solve 10 array problems"></div>
      <div class="field"><label>Category</label><select id="m-category">${CATS.map(c=>`<option value="${c.id}" ${t.category===c.id?"selected":""}>${c.name}</option>`).join("")}</select></div>
      <div class="field"><label>Priority</label><select id="m-priority">${PRIORITIES.map(p=>`<option ${t.priority===p?"selected":""}>${p}</option>`).join("")}</select></div>
      <div class="field"><label>Status</label><select id="m-status">${STATUSES.map(s=>`<option ${t.status===s?"selected":""}>${s}</option>`).join("")}</select></div>
      <div class="modal-actions">
        <button class="btn ghost" id="m-cancel">Cancel</button>
        <button class="btn primary" id="m-save">${isNew?"Add task":"Save changes"}</button>
      </div>
    </div>
  </div>`;
}

/* =========================================================
   EVENT HANDLERS
========================================================= */
function attachHandlers(){
  document.querySelectorAll("[data-nav]").forEach(el=>{ el.onclick=()=>nav(el.getAttribute("data-nav")); });

  const bannerClose=document.getElementById("banner-close");
  if(bannerClose) bannerClose.onclick=()=>{ BANNER_DISMISSED=true; render(); };

  document.querySelectorAll("[data-start-quiz]").forEach(el=>{ el.onclick=()=>startQuiz(el.getAttribute("data-start-quiz")); });
  document.querySelectorAll("[data-start-prompt]").forEach(el=>{ el.onclick=()=>showPrompt(el.getAttribute("data-start-prompt")); });
  document.querySelectorAll("[data-opt]").forEach(el=>{ el.onclick=()=>selectQuizOption(parseInt(el.getAttribute("data-opt"),10)); });
  const prNext=document.getElementById("pr-next"); if(prNext) prNext.onclick=nextQuizQuestion;
  const prRetry=document.getElementById("pr-retry"); if(prRetry) prRetry.onclick=retryQuiz;
  const prExit=document.getElementById("pr-exit"); if(prExit) prExit.onclick=exitPractice;
  const prNewPrompt=document.getElementById("pr-newprompt"); if(prNewPrompt) prNewPrompt.onclick=newPrompt;
  const prMarkDone=document.getElementById("pr-markdone"); if(prMarkDone) prMarkDone.onclick=markPracticed;

  document.querySelectorAll("[data-toggle]").forEach(el=>{
    el.onclick=()=>{
      const id=el.getAttribute("data-toggle");
      const t=DATA.tasks.find(x=>x.id===id);
      if(!t) return;
      if(t.status==="Done"){ t.status="Pending"; t.completedAt=null; }
      else { t.status="Done"; t.completedAt=new Date().toISOString(); }
      syncStatsAndAchievements(); saveData(); render();
    };
  });

  document.querySelectorAll("[data-del]").forEach(el=>{
    el.onclick=()=>{
      const id=el.getAttribute("data-del");
      DATA.tasks=DATA.tasks.filter(x=>x.id!==id);
      syncStatsAndAchievements(); saveData(); render();
    };
  });

  document.querySelectorAll("[data-open-task]").forEach(el=>{
    el.onclick=()=>{ modalState={id:el.getAttribute("data-open-task"), precat:el.getAttribute("data-precat")}; render(); };
  });

  const overlay=document.getElementById("overlay");
  if(overlay){
    overlay.onclick=(e)=>{ if(e.target===overlay){ modalState=null; render(); } };
    document.getElementById("m-cancel").onclick=()=>{ modalState=null; render(); };
    document.getElementById("m-save").onclick=()=>{
      const title=document.getElementById("m-title").value.trim();
      if(!title) return;
      const category=document.getElementById("m-category").value;
      const priority=document.getElementById("m-priority").value;
      const status=document.getElementById("m-status").value;
      if(modalState.id==="__new"){
        DATA.tasks.push({id:uid(),title,category,priority,status,createdAt:new Date().toISOString(),completedAt:status==="Done"?new Date().toISOString():null});
      } else {
        const t=DATA.tasks.find(x=>x.id===modalState.id);
        t.title=title; t.category=category; t.priority=priority;
        if(status==="Done" && t.status!=="Done") t.completedAt=new Date().toISOString();
        if(status!=="Done") t.completedAt=null;
        t.status=status;
      }
      syncStatsAndAchievements(); saveData();
      modalState=null; render();
    };
  }

  const sb=document.getElementById("searchbox");
  if(sb){
    sb.oninput=()=>{ filters.q=sb.value; render();
      const nb=document.getElementById("searchbox"); nb.focus(); nb.selectionStart=nb.value.length; };
  }
  const fc=document.getElementById("f-cat"); if(fc) fc.onchange=()=>{ filters.cat=fc.value; render(); };
  const fs=document.getElementById("f-status"); if(fs) fs.onchange=()=>{ filters.status=fs.value; render(); };
  const fp=document.getElementById("f-priority"); if(fp) fp.onchange=()=>{ filters.priority=fp.value; render(); };

  const profileFieldMap = {
    "p-name":"name","p-degree":"degree","p-branch":"branch","p-year":"year",
    "p-role":"targetRole","p-timeline":"timeline","p-companies":"targetCompanies"
  };
  let profileSaveTimer = null;
  Object.keys(profileFieldMap).forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.oninput = ()=>{
      DATA.profile[profileFieldMap[id]] = el.value;
      clearTimeout(profileSaveTimer);
      profileSaveTimer = setTimeout(()=>{ saveData(); flashSaved(); }, 400);
    };
  });

  const saveProfileBtn=document.getElementById("save-profile");
  if(saveProfileBtn){
    saveProfileBtn.onclick=()=>{
      DATA.profile={
        name:document.getElementById("p-name").value,
        degree:document.getElementById("p-degree").value,
        branch:document.getElementById("p-branch").value,
        year:document.getElementById("p-year").value,
        targetRole:document.getElementById("p-role").value,
        timeline:document.getElementById("p-timeline").value,
        targetCompanies:document.getElementById("p-companies").value,
      };
      const ok = saveData();
      if(ok){
        saveProfileBtn.textContent = "Saved ✓";
        saveProfileBtn.disabled = true;
        setTimeout(()=>{ saveProfileBtn.textContent="Save profile"; saveProfileBtn.disabled=false; }, 1400);
      } else {
        render();
      }
    };
  }

  const expJson=document.getElementById("export-json");
  if(expJson) expJson.onclick=()=>downloadFile("placement-progress.json", JSON.stringify(DATA,null,2), "application/json");
  const expTxt=document.getElementById("export-txt");
  if(expTxt) expTxt.onclick=()=>downloadFile("placement-readiness-report.txt", buildTextReport(), "text/plain");
}

function buildTextReport(){
  const pct=overallPct(); const level=readinessLevel(pct);
  let lines=[];
  lines.push("PLACEMENT READINESS REPORT");
  lines.push("Generated: "+new Date().toLocaleString());
  lines.push("");
  lines.push("Name: "+(DATA.profile.name||"-"));
  lines.push("Target role: "+(DATA.profile.targetRole||"-"));
  lines.push("Target companies: "+(DATA.profile.targetCompanies||"-"));
  lines.push("");
  lines.push("Overall progress: "+pct+"%");
  lines.push("Readiness level: "+level.label);
  lines.push("Current streak: "+computeCurrentStreak()+" days");
  lines.push("Longest streak: "+(DATA.stats.longestStreak||0)+" days");
  lines.push("30-day consistency: "+computeConsistency()+"%");
  lines.push("");
  lines.push("CATEGORY BREAKDOWN");
  CATS.forEach(c=>lines.push(`- ${c.name}: ${catPct(c.id)}% (${tasksByCat(c.id).length} tasks)`));
  lines.push("");
  lines.push("BADGES UNLOCKED");
  ACHIEVEMENT_DEFS.filter(a=>DATA.achievements[a.id]).forEach(a=>lines.push(`- ${a.name} (${new Date(DATA.achievements[a.id]).toLocaleDateString()})`));
  lines.push("");
  lines.push("TASK LIST");
  DATA.tasks.forEach(t=>lines.push(`[${t.status==="Done"?"x":" "}] (${t.priority}) ${t.title} — ${catInfo(t.category).name}`));
  return lines.join("\n");
}

function downloadFile(filename, content, mime){
  const blob=new Blob([content],{type:mime});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url; a.download=filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(s){ return (s||"").replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m])); }
function escapeAttr(s){ return escapeHtml(s); }

/* =========================================================
   INIT
========================================================= */
function init(){
  STORAGE_BLOCKED = !storageAvailable();
  loadData();
  syncStatsAndAchievements();
  saveData();
  render();
}
init();
