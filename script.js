/* =========================================================
   CAREER 360 — STUDENT CAREER ROADMAP & PLACEMENT SYSTEM
   Pure Vanilla JavaScript (ES6+) — 100% Fully Functional & Interactive
========================================================= */

const STORE_KEY = "placementTrackerData_v2";

const CATS = [
  { id: "apt", name: "Aptitude & Reasoning", color: "var(--accent-amber)", hex: "#f59e0b" },
  { id: "dsa", name: "Data Structures & Algorithms", color: "var(--accent-rose)", hex: "#f43f5e" },
  { id: "lang", name: "Programming Languages", color: "var(--accent-blue)", hex: "#3b82f6" },
  { id: "core", name: "Core CS & DBMS / OS", color: "var(--primary)", hex: "#8b5cf6" },
  { id: "proj", name: "Projects & Portfolio", color: "var(--accent-pink)", hex: "#ec4899" },
  { id: "comm", name: "Communication & HR", color: "var(--accent-emerald)", hex: "#10b981" },
  { id: "resume", name: "Resume & ATS Prep", color: "var(--accent-cyan)", hex: "#06b6d4" },
  { id: "company", name: "Company-Specific Prep", color: "var(--accent-amber)", hex: "#f59e0b" },
];

const PRIORITIES = ["High", "Medium", "Low"];
const STATUSES = ["Pending", "In Progress", "Done"];
const COMPANY_STAGES = [
  "Wishlist",
  "Applied",
  "Online Assessment",
  "Technical Round 1",
  "Technical Round 2",
  "HR Round",
  "Offer Received",
  "Rejected"
];

/* Curated learning resources */
const RESOURCES = {
  apt: [
    { type: "Practice", title: "Topic-wise Aptitude Practice & Formulas", source: "IndiaBIX", url: "https://www.indiabix.com/aptitude/questions-and-answers/" },
    { type: "Video", title: "Aptitude & Logical Reasoning Masterclass", source: "PrepInsta — YouTube", url: "https://www.youtube.com/@PrepInsta" },
    { type: "Article", title: "Quantitative Aptitude Formulas & Tricks", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/aptitude-questions-and-answers-gq/" },
    { type: "Practice", title: "Verbal Ability & Reading Comprehension", source: "IndiaBIX", url: "https://www.indiabix.com/verbal-ability/questions-and-answers/" }
  ],
  dsa: [
    { type: "Video", title: "Striver's A2Z DSA Complete Course", source: "takeUforward", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
    { type: "Practice", title: "NeetCode 150 Core Practice Sheet", source: "NeetCode.io", url: "https://neetcode.io/practice" },
    { type: "Practice", title: "LeetCode Top Interview 150", source: "LeetCode", url: "https://leetcode.com/problem-list/top-interview-questions/" },
    { type: "Article", title: "Complete Data Structures Tutorial", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/data-structures/" }
  ],
  lang: [
    { type: "Video", title: "Complete Modern C++ / Java / Python Tutorial", source: "CodeWithHarry — YouTube", url: "https://www.youtube.com/@CodeWithHarry" },
    { type: "Article", title: "Free Programming & Algorithmic Curriculums", source: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
    { type: "Article", title: "JavaScript & Modern Web Reference Docs", source: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/" },
    { type: "Practice", title: "Interactive Coding Exercises", source: "W3Schools", url: "https://www.w3schools.com/" }
  ],
  core: [
    { type: "Article", title: "Database Management Systems (DBMS) Course", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/dbms/" },
    { type: "Video", title: "Operating Systems for Campus Placement", source: "Gate Smashers — YouTube", url: "https://www.youtube.com/@GateSmashers" },
    { type: "Article", title: "Computer Networks Essentials & OSI Model", source: "Javatpoint", url: "https://www.javatpoint.com/computer-network-tutorial" },
    { type: "Practice", title: "SQL 50 Practice Study Plan", source: "LeetCode SQL 50", url: "https://leetcode.com/studyplan/top-sql-50/" }
  ],
  proj: [
    { type: "Practice", title: "Trending Open Source Repositories & Templates", source: "GitHub Trending", url: "https://github.com/trending" },
    { type: "Article", title: "Unique Final Year Capstone Project Ideas", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/computer-science-projects/" },
    { type: "Video", title: "Full Stack App Builds (React, Node, DB)", source: "freeCodeCamp — YouTube", url: "https://www.youtube.com/@freecodecamp" }
  ],
  comm: [
    { type: "Practice", title: "Google Interview Warmup (AI Speech Practice)", source: "Google Career Certificates", url: "https://grow.google/certificates/interview-warmup/" },
    { type: "Article", title: "Top 50 Behavioral Interview Questions (STAR Method)", source: "The Muse", url: "https://www.themuse.com/advice/behavioral-interview-questions-answers-examples" },
    { type: "Article", title: "HR Interview Tips & Salary Negotiation", source: "Indeed Career Guide", url: "https://www.indeed.com/career-advice/interviewing" }
  ],
  resume: [
    { type: "Practice", title: "Clean Technical LaTeX Resume Templates", source: "Overleaf CV Gallery", url: "https://www.overleaf.com/gallery/tagged/cv" },
    { type: "Article", title: "Complete Guide to Writing an ATS-Proof Resume", source: "Novoresume", url: "https://novoresume.com/career-blog/how-to-write-a-resume" },
    { type: "Article", title: "Action Verbs & Impact Bullet Points", source: "Harvard FAS Resume Guide", url: "https://careerservices.fas.harvard.edu/" }
  ],
  company: [
    { type: "Article", title: "Company-Wise Interview Experiences & Archives", source: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/company-preparation/" },
    { type: "Practice", title: "Company Tagged Coding Questions", source: "LeetCode Companies", url: "https://leetcode.com/company/" },
    { type: "Article", title: "Salary, Reviews & Interview Questions", source: "Glassdoor", url: "https://www.glassdoor.com/Interview/index.htm" }
  ]
};

/* Quiz Questions Bank with Explanations */
const PRACTICE_QUIZ = {
  apt: [
    { q: "A train running at 72 km/h crosses a 260 m long platform in 23 seconds. What is the length of the train?", options: ["200 m", "240 m", "250 m", "180 m"], answer: 0, exp: "Speed = 72 * (5/18) = 20 m/s. Total Distance = Speed * Time = 20 * 23 = 460 m. Length of train = 460 - 260 = 200 m." },
    { q: "If A can finish a job in 12 days and B in 16 days, working together how many days will they take?", options: ["6.86 days", "7 days", "8 days", "5.5 days"], answer: 0, exp: "Combined 1-day work = 1/12 + 1/16 = 7/48. Total time = 48/7 ≈ 6.86 days." },
    { q: "What comes next in the sequence: 3, 8, 18, 38, 78, ...?", options: ["148", "158", "168", "156"], answer: 1, exp: "Pattern: x * 2 + 2. (3*2+2=8, 8*2+2=18, 18*2+2=38, 38*2+2=78, 78*2+2=158)." },
    { q: "A trader marks an item 30% above cost price and allows a discount of 10%. What is his profit percentage?", options: ["17%", "20%", "15%", "18%"], answer: 0, exp: "Net change = 30 - 10 - (30*10)/100 = 20 - 3 = 17%." },
    { q: "The average of 5 consecutive odd numbers is 27. What is the smallest of these numbers?", options: ["21", "23", "25", "27"], answer: 1, exp: "For 5 consecutive odd numbers, the middle number is the average (27). Numbers are 23, 25, 27, 29, 31. Smallest is 23." },
    { q: "Pointing to a photograph, Rohit said 'Her mother's only son is my father.' How is Rohit related to the lady in the photo?", options: ["Brother", "Uncle", "Nephew", "Son"], answer: 2, exp: "Her mother's only son is the lady's brother. Rohit's father is the lady's brother, making Rohit her nephew." }
  ],
  dsa: [
    { q: "What is the worst-case time complexity of QuickSort when the pivot is chosen poorly?", options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"], answer: 2, exp: "If the pivot is always the smallest or largest element on a sorted array, recursion depth is n, giving O(n^2)." },
    { q: "Which data structure is optimal for evaluating arithmetic expressions in Postfix notation?", options: ["Queue", "Stack", "Binary Heap", "Hash Table"], answer: 1, exp: "A Stack allows pushing operands and popping them immediately when an operator is encountered." },
    { q: "Which traversal on a Binary Search Tree (BST) visits keys in strictly non-decreasing sorted order?", options: ["Pre-order", "In-order", "Post-order", "Level-order"], answer: 1, exp: "In-order traversal visits Left Subtree -> Node -> Right Subtree, resulting in sorted output for a BST." },
    { q: "What is the time complexity to find an element in a balanced Red-Black Tree or AVL Tree of n elements?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answer: 1, exp: "Self-balancing binary search trees maintain a height of O(log n), guaranteeing search in O(log n)." },
    { q: "Which graph algorithm finds the single-source shortest paths on graphs with non-negative edge weights?", options: ["Kruskal's", "Dijkstra's", "Floyd-Warshall", "Tarjan's"], answer: 1, exp: "Dijkstra's algorithm greedily finds the shortest path from a source node using a min-priority queue in O((V+E) log V)." },
    { q: "What is the average time complexity of insertion, deletion, and search in a Hash Map?", options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"], answer: 2, exp: "With a good hash function and proper load factor rehashing, hash operations average O(1)." }
  ],
  lang: [
    { q: "In Java, what happens when you compare two Strings using '==' instead of '.equals()'?", options: ["It compares their character content", "It compares their memory references", "It throws a ClassCastException", "It converts both to lowercase"], answer: 1, exp: "'==' checks reference equality (memory location), whereas '.equals()' checks value equality (character content)." },
    { q: "In JavaScript, what is the output of: typeof null ?", options: ["'null'", "'undefined'", "'object'", "'boolean'"], answer: 2, exp: "In JS, typeof null returns 'object' due to a historical legacy bug in JS type representation." },
    { q: "In Python, which built-in data structure is immutable?", options: ["List", "Dictionary", "Tuple", "Set"], answer: 2, exp: "Tuples and Strings in Python are immutable; lists, dicts, and sets can be modified in-place." },
    { q: "In C++, what does declaring a destructor as 'virtual' in a base class ensure?", options: ["Base class cannot be instantiated", "Derived class destructor is properly called on delete", "Destructor runs faster", "Destructor cannot throw exceptions"], answer: 1, exp: "A virtual destructor ensures that deleting a derived object via a base pointer executes the derived class destructor first." },
    { q: "What is the concept of 'Hoisting' in JavaScript?", options: ["Moving execution to a web worker", "Declarations moved to the top of their scope before execution", "Automatic memory deallocation", "Converting sync functions to async"], answer: 1, exp: "Variable (var) and function declarations are hoisted to the top of their enclosing scope during compilation." }
  ],
  core: [
    { q: "In relational database design, which Normal Form eliminates Transitive Dependencies?", options: ["1NF", "2NF", "3NF", "BCNF"], answer: 2, exp: "3NF requires the table to be in 2NF and have no transitive functional dependencies on the primary key." },
    { q: "Which of the following is NOT one of the four essential ACID properties in DBMS?", options: ["Atomicity", "Consistency", "Isolation", "Durability / Availability"], answer: 3, exp: "ACID stands for Atomicity, Consistency, Isolation, and Durability. Availability is part of the CAP theorem." },
    { q: "What is the primary condition that causes a Deadlock in operating systems?", options: ["Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait", "Excessive CPU paging (Thrashing)", "Unsynchronized thread context switches", "Stack overflow in kernel mode"], answer: 0, exp: "Coffman's 4 conditions for deadlock are: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait." },
    { q: "At which layer of the OSI model do TCP and UDP protocols operate?", options: ["Network Layer", "Transport Layer", "Data Link Layer", "Session Layer"], answer: 1, exp: "Transport Layer (Layer 4) handles end-to-end communication, reliability, port multiplexing (TCP/UDP)." }
  ],
  company: [
    { q: "In software engineering offers, what does 'CTC' (Cost to Company) typically include?", options: ["Only base monthly salary", "Base salary + PF + Gratuity + Bonuses + ESOPs/Stocks", "Take-home pay after tax deductions", "Joining bonus only"], answer: 1, exp: "CTC is the total expenditure the employer commits, including base pay, variable bonuses, retirement benefits, and stock vesting." },
    { q: "Which interview framework is widely recommended for answering behavioral/HR questions?", options: ["SMART Goals", "STAR Method (Situation, Task, Action, Result)", "SWOT Analysis", "FIFO Method"], answer: 1, exp: "The STAR technique (Situation, Task, Action, Result) provides a structured, impact-oriented response format." },
    { q: "In technical system design, what does 'Horizontal Scaling' mean?", options: ["Adding more RAM/CPU to an existing single machine", "Adding more servers/nodes to distribute load", "Compressing database indexes", "Migrating from SQL to NoSQL"], answer: 1, exp: "Horizontal scaling (scaling out) involves adding more machine instances behind a load balancer." }
  ]
};

/* Interactive Flashcards Bank */
const FLASHCARDS = [
  { id: "f1", cat: "DSA", q: "What is the time complexity of searching in a Hash Table vs Binary Search Tree?", a: "Hash Table: Average O(1), Worst O(n).\nBalanced BST (AVL/Red-Black): Guaranteed O(log n) worst case." },
  { id: "f2", cat: "DSA", q: "When should you use BFS vs DFS in graph/tree traversals?", a: "BFS: Finding shortest path in unweighted graphs or level-order traversal.\nDFS: Exploring all paths, topological sort, cycle detection, game states." },
  { id: "f3", cat: "Core CS", q: "What is the difference between a Process and a Thread?", a: "A Process has its own independent address space and resources.\nThreads within the same process share code, data, and heap, but have separate stacks and program counters." },
  { id: "f4", cat: "Core CS", q: "Explain the CAP Theorem in distributed databases.", a: "A distributed system can guarantee at most 2 out of 3 properties:\n- Consistency (all nodes see same data)\n- Availability (every request gets a non-error response)\n- Partition Tolerance (system continues despite network message drops)." },
  { id: "f5", cat: "Languages", q: "What are the 4 Pillars of Object-Oriented Programming (OOP)?", a: "1. Encapsulation (bundling data & methods)\n2. Abstraction (hiding implementation details)\n3. Inheritance (code reuse)\n4. Polymorphism (overloading & overriding methods)" },
  { id: "f6", cat: "Languages", q: "What is the difference between Synchronous and Asynchronous code?", a: "Synchronous code blocks execution until the current operation finishes.\nAsynchronous code offloads long-running tasks (e.g. I/O, API calls) to run in the background without freezing the UI thread." },
  { id: "f7", cat: "HR & Comm", q: "How to answer: 'What is your biggest weakness?'", a: "Choose a genuine professional skill (not a personality flaw), explain steps you are actively taking to improve it, and highlight measurable progress." },
  { id: "f8", cat: "Core CS", q: "What is the difference between Clustered and Non-Clustered Indexes in SQL?", a: "Clustered Index: Physically sorts table data on disk (only 1 per table, typically Primary Key).\nNon-Clustered Index: Creates a separate index structure with pointers to data rows (multiple allowed)." },
  { id: "f9", cat: "DSA", q: "What is Dynamic Programming and when do you apply it?", a: "DP optimizes recursion by storing solutions to subproblems.\nApply when a problem has: 1. Overlapping Subproblems and 2. Optimal Substructure (e.g. Knapsack, LCS, Edit Distance)." },
  { id: "f10", cat: "Company", q: "What happens when you type a URL into a browser and hit Enter?", a: "1. DNS lookup to resolve IP\n2. TCP 3-way handshake (+ TLS handshake for HTTPS)\n3. HTTP Request sent\n4. Server processes & returns response\n5. Browser parses HTML/CSS/JS and renders DOM." }
];

/* Self-practice prompts */
const PRACTICE_PROMPTS = {
  comm: [
    "Tell me about a technical challenge you encountered in a project and how you resolved it using the STAR technique.",
    "Why are you interested in this target role and what makes you uniquely qualified for our engineering team?",
    "Explain how a Database Index works to a non-technical recruiter.",
    "Describe a situation where you had a disagreement with a teammate and how you arrived at a constructive solution.",
    "Where do you see your technical trajectory 3 years after joining our company?"
  ],
  resume: [
    "Verify: Does your resume strictly fit on 1 page with clean margins (0.5 to 0.75 in)?",
    "Verify: Does every project bullet start with a strong action verb (Architected, Implemented, Engineered, Optimized)?",
    "Verify: Have you quantified project metrics (e.g. 'reduced latency by 35%', 'processed 10k records')?",
    "Verify: Are your GitHub and LinkedIn links live, clickable, and matching your contact details?"
  ],
  proj: [
    "Build a Full-Stack Real-Time Chat App using WebSockets, JWT Authentication, and MongoDB/PostgreSQL.",
    "Develop an AI Resume Analyzer or Sentiment Analysis API with Python FastAPI and React frontend.",
    "Build a Distributed URL Shortener with Redis caching, rate limiting, and analytics dashboard."
  ]
};

/* Achievement Badge Definitions */
const ACHIEVEMENT_DEFS = [
  { id: "first_task", icon: "🎯", name: "First Step", desc: "Complete your first placement task", test: d => d.doneCount >= 1 },
  { id: "ten_tasks", icon: "🚀", name: "Momentum", desc: "Complete 10 placement tasks", test: d => d.doneCount >= 10 },
  { id: "fifty_tasks", icon: "⚔️", name: "Half Century", desc: "Complete 50 placement tasks", test: d => d.doneCount >= 50 },
  { id: "hundred_tasks", icon: "👑", name: "Century Warrior", desc: "Complete 100 placement tasks", test: d => d.doneCount >= 100 },
  { id: "streak1", icon: "🔥", name: "Spark Ignited", desc: "Start your placement preparation streak", test: d => d.currentStreak >= 1 || d.longestStreak >= 1 },
  { id: "streak3", icon: "⚡", name: "3-Day Spark", desc: "Prepare 3 consecutive days", test: d => d.longestStreak >= 3 },
  { id: "streak7", icon: "🛡️", name: "Week Warrior", desc: "Maintain a 7-day preparation streak", test: d => d.longestStreak >= 7 },
  { id: "streak30", icon: "🏆", name: "Iron Discipline", desc: "Prepare 30 days consistently", test: d => d.longestStreak >= 30 },
  { id: "first_quiz", icon: "🧠", name: "Quiz Rookie", desc: "Complete your first practice quiz", test: d => d.quizCount >= 1 },
  { id: "perfect_score", icon: "💯", name: "Perfect Score", desc: "Score 100% on any practice quiz", test: d => d.perfectQuiz },
  { id: "quiz_master", icon: "🎓", name: "Quiz Master", desc: "Complete 10 practice quizzes", test: d => d.quizCount >= 10 },
  { id: "flashcard_fan", icon: "🗂️", name: "Flashcard Pro", desc: "Master 5+ revision flashcards", test: d => d.flashcardsReviewed >= 5 },
  { id: "ats_checked", icon: "📄", name: "ATS Polished", desc: "Run your resume through the ATS scanner", test: d => d.atsChecked },
  { id: "company_applied", icon: "💼", name: "In The Hunt", desc: "Track your first placement job application", test: d => d.companiesTracked >= 1 },
  { id: "intermediate", icon: "🟡", name: "Intermediate", desc: "Reach 25% overall readiness", test: d => d.overall >= 25 },
  { id: "advanced", icon: "🔵", name: "Advanced", desc: "Reach 55% overall readiness", test: d => d.overall >= 55 },
  { id: "interview_ready", icon: "🌟", name: "Interview Ready", desc: "Reach 80% overall readiness", test: d => d.overall >= 80 }
];

/* Starter Roadmap Tasks for New Students — all initially PENDING (0% done) */
const STARTER_TASKS = [
  { title: "Master Time, Speed & Distance Formulas", category: "apt", priority: "High" },
  { title: "Practice Profit & Loss and Percentage Shortcuts", category: "apt", priority: "High" },
  { title: "Solve 20 Syllogisms & Seating Arrangement Problems", category: "apt", priority: "Medium" },
  { title: "Array: Two Pointers & Sliding Window Problems", category: "dsa", priority: "High" },
  { title: "Binary Search & Rotated Sorted Array variations", category: "dsa", priority: "High" },
  { title: "Tree Traversals (Inorder, Preorder, Level Order)", category: "dsa", priority: "High" },
  { title: "Graph BFS / DFS & Cycle Detection", category: "dsa", priority: "High" },
  { title: "Revise OOPs Concepts (Inheritance, Polymorphism, Abstraction)", category: "lang", priority: "High" },
  { title: "Understand Java/C++ Memory Model & Pointers", category: "lang", priority: "Medium" },
  { title: "Master SQL Joins, Group By & Aggregate Queries", category: "core", priority: "High" },
  { title: "Revise DBMS Normalization & ACID Properties", category: "core", priority: "High" },
  { title: "Operating Systems: Process vs Thread & Deadlocks", category: "core", priority: "High" },
  { title: "Deploy Full-Stack Project on Vercel/Render with Live Demo", category: "proj", priority: "High" },
  { title: "Add Readme with Architecture Diagram & Setup Steps", category: "proj", priority: "Medium" },
  { title: "Prepare 1-Minute 'Tell Me About Yourself' STAR Pitch", category: "comm", priority: "High" },
  { title: "Structure 3 STAR Behavioral Project Stories", category: "comm", priority: "High" },
  { title: "Format Resume with Overleaf LaTeX 1-Page Template", category: "resume", priority: "High" },
  { title: "Add Quantifiable Metrics to Experience & Projects", category: "resume", priority: "High" },
  { title: "Research Target Company Previous Year Test Papers", category: "company", priority: "High" },
  { title: "Complete 1 Full Mock Coding + Aptitude Drive", category: "company", priority: "High" }
];

function defaultData() {
  return {
    profile: {
      name: "",
      college: "",
      degree: "",
      branch: "",
      year: "",
      cgpa: "",
      targetRole: "",
      targetCompanies: "",
      timeline: ""
    },
    theme: "midnight",
    tasks: STARTER_TASKS.map((t, idx) => ({
      id: "task_" + idx,
      title: t.title,
      category: t.category,
      priority: t.priority,
      status: "Pending", // All initially Pending, 0% done
      createdAt: new Date().toISOString(),
      completedAt: null
    })),
    companies: [],
    knownFlashcards: {},
    atsChecked: false,
    stats: { longestStreak: 0 },
    achievements: {},
    history: {},
    checkinDates: [],
    practiceHistory: [],
    createdAt: new Date().toISOString()
  };
}

let DATA = defaultData();
let STORAGE_BLOCKED = false;
let BANNER_DISMISSED = false;

function loadData() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      DATA = Object.assign(defaultData(), parsed);
      DATA.tasks = DATA.tasks || defaultData().tasks;
      DATA.profile = DATA.profile || defaultData().profile;

      // Clean up legacy dummy defaults if present so user gets a fresh slate
      if (DATA.profile.name === "Placement Aspirant") DATA.profile.name = "";
      if (DATA.profile.targetCompanies === "Google, Amazon, Microsoft, TCS Digital, Infosys, Zoho" && !DATA.profile.college) {
        DATA.profile.targetCompanies = "";
        DATA.profile.targetRole = "";
        DATA.profile.degree = "";
        DATA.profile.branch = "";
        DATA.profile.year = "";
        DATA.profile.cgpa = "";
        DATA.profile.timeline = "";
      }

      DATA.companies = DATA.companies || [];
      DATA.knownFlashcards = DATA.knownFlashcards || {};
      DATA.stats = DATA.stats || { longestStreak: 0 };
      DATA.achievements = DATA.achievements || {};
      DATA.history = DATA.history || {};
      DATA.checkinDates = DATA.checkinDates || [];
      DATA.practiceHistory = DATA.practiceHistory || [];
    }
  } catch (e) {
    console.warn("Using fresh default state.", e);
  }
}

function saveData() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(DATA));
    STORAGE_BLOCKED = false;
    return true;
  } catch (e) {
    console.error("Storage error:", e);
    STORAGE_BLOCKED = true;
    return false;
  }
}

function applyTheme(themeName) {
  DATA.theme = themeName;
  document.documentElement.setAttribute("data-theme", themeName);
  saveData();
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function flashSaved(msg = "Saved successfully") {
  let t = document.getElementById("save-toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "save-toast";
    t.className = "save-toast";
    document.body.appendChild(t);
  }
  t.innerHTML = `<span>✓</span> ${msg}`;
  t.classList.remove("show");
  void t.offsetWidth;
  t.classList.add("show");
  clearTimeout(flashSaved._timer);
  flashSaved._timer = setTimeout(() => { t.classList.remove("show"); }, 1400);
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

/* Computation Helpers */
function catInfo(id) {
  return CATS.find(c => c.id === id) || CATS[0];
}

function tasksByCat(id) {
  return DATA.tasks.filter(t => t.category === id);
}

function catPct(id) {
  const ts = tasksByCat(id);
  if (ts.length === 0) return 0;
  return Math.round((ts.filter(t => t.status === "Done").length / ts.length) * 100);
}

function overallPct() {
  if (DATA.tasks.length === 0) return 0;
  return Math.round((DATA.tasks.filter(t => t.status === "Done").length / DATA.tasks.length) * 100);
}

function readinessLevel(pct) {
  if (pct >= 80) return { label: "Interview-Ready", color: "var(--accent-emerald)" };
  if (pct >= 55) return { label: "Advanced", color: "var(--accent-cyan)" };
  if (pct >= 25) return { label: "Intermediate", color: "var(--accent-amber)" };
  return { label: "Beginner", color: "var(--accent-rose)" };
}

function getAllActiveDates() {
  const dates = new Set();
  (DATA.checkinDates || []).forEach(d => dates.add(d.slice(0, 10)));
  (DATA.tasks || []).filter(t => t.completedAt).forEach(t => dates.add(t.completedAt.slice(0, 10)));
  (DATA.practiceHistory || []).forEach(p => dates.add(p.date.slice(0, 10)));
  return dates;
}

function computeCurrentStreak() {
  const activeDates = getAllActiveDates();
  if (activeDates.size === 0) return 0;

  const todayStr = todayKey();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  // If there's no activity today and no activity yesterday, streak is 0
  if (!activeDates.has(todayStr) && !activeDates.has(yesterdayStr)) {
    return 0;
  }

  let streak = 0;
  let cur = new Date();
  if (!activeDates.has(todayStr)) {
    cur.setDate(cur.getDate() - 1);
  }

  while (true) {
    const key = cur.toISOString().slice(0, 10);
    if (activeDates.has(key)) {
      streak++;
      cur.setDate(cur.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function computeLongestStreak() {
  const dates = [...getAllActiveDates()].sort();
  if (dates.length === 0) return 0;
  let longest = 1, run = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const cur = new Date(dates[i]);
    const diffDays = Math.round((cur - prev) / 86400000);
    if (diffDays === 1) {
      run++;
      longest = Math.max(longest, run);
    } else if (diffDays > 1) {
      run = 1;
    }
  }
  return Math.max(longest, computeCurrentStreak(), DATA.stats.longestStreak || 0);
}

function computeConsistency() {
  const activeDates = getAllActiveDates();
  if (activeDates.size === 0) return 0;
  let active = 0;
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    if (activeDates.has(d.toISOString().slice(0, 10))) active++;
  }
  return Math.round((active / 30) * 100);
}

function recordHistorySnapshot() {
  const pct = overallPct();
  const today = todayKey();
  if (pct > 0 || Object.keys(DATA.history).length > 0) {
    DATA.history[today] = pct;
  }
  const keys = Object.keys(DATA.history).sort();
  if (keys.length > 60) {
    keys.slice(0, keys.length - 60).forEach(k => delete DATA.history[k]);
  }
}

function syncStatsAndAchievements() {
  const currentStreak = computeCurrentStreak();
  const longest = computeLongestStreak();
  DATA.stats.longestStreak = Math.max(DATA.stats.longestStreak || 0, longest);
  recordHistorySnapshot();

  const quizAttempts = DATA.practiceHistory.filter(p => p.type === "quiz");
  const snapshot = {
    doneCount: DATA.tasks.filter(t => t.status === "Done").length,
    currentStreak: currentStreak,
    longestStreak: DATA.stats.longestStreak,
    overall: overallPct(),
    quizCount: quizAttempts.length,
    perfectQuiz: quizAttempts.some(p => p.total > 0 && p.score === p.total),
    flashcardsReviewed: Object.keys(DATA.knownFlashcards).length,
    atsChecked: !!DATA.atsChecked,
    companiesTracked: DATA.companies.length
  };

  let newlyUnlocked = false;
  ACHIEVEMENT_DEFS.forEach(a => {
    if (!DATA.achievements[a.id] && a.test(snapshot)) {
      DATA.achievements[a.id] = new Date().toISOString();
      newlyUnlocked = true;
    }
  });

  if (newlyUnlocked && typeof confetti === "function") {
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
  }
}

function getCountdownDays() {
  if (!DATA.profile.timeline) return null;
  const target = new Date(DATA.profile.timeline);
  if (isNaN(target.getTime())) return null;
  const now = new Date();
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff;
}

/* =========================================================
   ROUTING & STATE
========================================================= */
let ROUTE = "dashboard";
let modalState = null;
let practiceTab = "quizzes";
let practiceState = null;
let flashcardIdx = 0;
let flashcardFlipped = false;
let flashcardFilter = "all";
let interviewTimer = { active: false, seconds: 180, total: 180, interval: null };
let resumeState = { text: "", role: "sde", score: 0, analysis: null };
let filters = { q: "", cat: "all", status: "all", priority: "all" };

function nav(route) {
  ROUTE = route;
  render();
}

const ICONS = {
  dashboard: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>`,
  roadmap: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="12" r="2.5"/><circle cx="12" cy="5" r="2.5"/><circle cx="19" cy="12" r="2.5"/><circle cx="12" cy="19" r="2.5"/><path d="M7 11 L10 6.5 M14 6.5 L17 11 M17 13 L14 17.5 M10 17.5 L7 13"/></svg>`,
  tasks: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l2 2 4-4"/><rect x="3" y="4" width="18" height="16" rx="2.5"/></svg>`,
  practice: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>`,
  resume: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  company: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  analytics: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V9M11 19V4M18 19v-7"/></svg>`,
  achieve: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5"/></svg>`,
  resources: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  profile: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>`,
  plus: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>`,
  edit: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20l1-4 11.5-11.5a2 2 0 0 1 3 3L8 19l-4 1z"/></svg>`,
  trash: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/></svg>`,
  download: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v13m0 0l-4.5-4.5M12 16l4.5-4.5"/><path d="M4 18v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1"/></svg>`,
  upload: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 16V3m0 0l-4.5 4.5M12 3l4.5 4.5"/><path d="M4 18v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1"/></svg>`,
  print: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
  play: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
  link: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg>`,
  check: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M4 12l5 5 11-11"/></svg>`,
  x: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
};

/* =========================================================
   ROOT RENDER
========================================================= */
function render() {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    ${STORAGE_BLOCKED && !BANNER_DISMISSED ? storageBanner() : ""}
    ${renderRail()}
    <div class="main">
      ${renderTopHeader()}
      ${ROUTE === "dashboard" ? renderDashboard() : ""}
      ${ROUTE === "roadmap" ? renderRoadmap() : ""}
      ${ROUTE === "tasks" ? renderTasks() : ""}
      ${ROUTE === "practice" ? renderPractice() : ""}
      ${ROUTE === "resume" ? renderResumeChecker() : ""}
      ${ROUTE === "company" ? renderCompanyTracker() : ""}
      ${ROUTE === "analytics" ? renderAnalytics() : ""}
      ${ROUTE === "achievements" ? renderAchievements() : ""}
      ${ROUTE === "resources" ? renderResources() : ""}
      ${ROUTE === "profile" ? renderProfile() : ""}
    </div>
    ${modalState ? renderModal() : ""}
  `;

  attachHandlers();
  if (ROUTE === "analytics") drawCharts();
}

function storageBanner() {
  return `<div class="storage-banner">
    ⚠️ Browser storage is disabled or blocked in this environment. Changes will not persist after page refresh.
    <button class="banner-close" id="banner-close">&times;</button>
  </div>`;
}

function renderRail() {
  const items = [
    ["dashboard", "Dashboard", "dashboard", null],
    ["roadmap", "Roadmap", "roadmap", null],
    ["tasks", "Task Manager", "tasks", DATA.tasks.filter(t => t.status !== "Done").length],
    ["practice", "Practice Arena", "practice", null],
    ["resume", "ATS Resume Checker", "resume", null],
    ["company", "Company Tracker", "company", DATA.companies.length],
    ["analytics", "Analytics", "analytics", null],
    ["achievements", "Achievements", "achieve", Object.keys(DATA.achievements).length],
    ["resources", "Resources Library", "resources", null],
    ["profile", "Profile & Goals", "profile", null],
  ];

  const currentStreak = computeCurrentStreak();
  const theme = DATA.theme || "midnight";
  const displayName = DATA.profile.name ? escapeHtml(DATA.profile.name) : "Welcome Aspirant";
  const displaySub = DATA.profile.targetRole ? escapeHtml(DATA.profile.targetRole) : "Set up your profile →";

  return `
  <div class="rail">
    <div class="brand" data-nav="profile" style="cursor:pointer;" title="Click to edit profile">
      <div class="brand-icon">C360</div>
      <div class="brand-info">
        <div class="brand-title">${displayName}</div>
        <div class="brand-sub">${displaySub}</div>
      </div>
    </div>

    <div class="nav-section">Core Navigation</div>
    <div class="navgroup">
      ${items.map(([r, label, icon, count]) => `
        <button class="navitem ${ROUTE === r ? 'active' : ''}" data-nav="${r}">
          ${ICONS[icon]}
          <span>${label}</span>
          ${count !== null && count > 0 ? `<span class="nav-count">${count}</span>` : ""}
        </button>
      `).join("")}
    </div>

    <div class="theme-selector-wrap">
      <div class="theme-label">
        <span>Active Theme</span>
        <span style="color:var(--primary)">●</span>
      </div>
      <div class="theme-options">
        <button class="theme-btn ${theme === 'midnight' ? 'active' : ''}" data-theme-set="midnight" title="Midnight Indigo">🌌</button>
        <button class="theme-btn ${theme === 'cyber-obsidian' ? 'active' : ''}" data-theme-set="cyber-obsidian" title="Cyber Obsidian">⚡</button>
        <button class="theme-btn ${theme === 'nordic-slate' ? 'active' : ''}" data-theme-set="nordic-slate" title="Nordic Slate">❄️</button>
        <button class="theme-btn ${theme === 'light-studio' ? 'active' : ''}" data-theme-set="light-studio" title="Light Studio">☀️</button>
      </div>

      <div class="rail-footer-card">
        <span class="streak-icon">🔥</span>
        <div class="streak-text">
          <b>${currentStreak} Day Streak</b>
          <div style="color:var(--text-faint)">${currentStreak > 0 ? "Keep the streak alive!" : "Check in today"}</div>
        </div>
        <button class="btn small accent-emerald" id="btn-quick-checkin" title="Log today's study check-in">+1</button>
      </div>
    </div>
  </div>`;
}

function renderTopHeader() {
  const daysLeft = getCountdownDays();
  const titles = {
    dashboard: "Dashboard",
    roadmap: "Roadmap Tracks",
    tasks: "Task Planner",
    practice: "Practice & Assessment Arena",
    resume: "ATS Resume & Profile Evaluator",
    company: "Placement Drives & Applications",
    analytics: "Analytics & Readiness Insights",
    achievements: "Achievements & Gamification",
    resources: "Curated Resource Directory",
    profile: "Profile & Career Settings"
  };

  const descs = {
    dashboard: "Comprehensive 360° overview of your placement readiness and study momentum.",
    roadmap: "Step-by-step master tracks across Aptitude, DSA, Core CS, Projects & HR.",
    tasks: "Add, organize, filter, and crush your daily placement preparation milestones.",
    practice: "Test your skills with interactive quizzes, 3D flashcards, and timed mock interview prompts.",
    resume: "Analyze your resume against top software engineering keywords & ATS quality parameters.",
    company: "Track target company placement drives, packages, interview dates, and hiring stages.",
    analytics: "Visual progress charts, 14-day trends, category distribution, and skill-gap detection.",
    achievements: "Earn badges, track consistency streaks, and level up to Interview-Ready status.",
    resources: "Handpicked master tutorials, video playlists, and practice problem sheets.",
    profile: "Customize your personal details, target roles, dream companies, and placement deadline."
  };

  return `
  <div class="pagehead">
    <div>
      <h1>${titles[ROUTE] || "Career 360"}</h1>
      <p class="desc">${descs[ROUTE] || ""}</p>
    </div>
    <div class="header-actions">
      ${daysLeft !== null ? `
        <div class="target-countdown-pill">
          <span class="clock-dot"></span>
          <span>${daysLeft > 0 ? `${daysLeft} Days to Target Placement` : "Placement Season Active!"}</span>
        </div>
      ` : ""}
      <button class="btn primary small" data-open-task="__new">${ICONS.plus} Quick Task</button>
    </div>
  </div>`;
}

/* =========================================================
   DASHBOARD
========================================================= */
function renderDashboard() {
  const pct = overallPct();
  const level = readinessLevel(pct);
  const done = DATA.tasks.filter(t => t.status === "Done").length;
  const inProgress = DATA.tasks.filter(t => t.status === "In Progress").length;
  const pending = DATA.tasks.filter(t => t.status === "Pending").length;
  const streak = computeCurrentStreak();

  const recentDone = DATA.tasks.filter(t => t.completedAt).sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt)).slice(0, 4);
  const priorityTasks = DATA.tasks.filter(t => t.status !== "Done").sort((a, b) => ({ High: 0, Medium: 1, Low: 2 }[a.priority] - { High: 0, Medium: 1, Low: 2 }[b.priority])).slice(0, 4);
  const recommendationsList = generateRecommendations();

  const targetRoleText = DATA.profile.targetRole ? `<b>${escapeHtml(DATA.profile.targetRole)}</b>` : "your target role";
  const targetCompanyText = DATA.profile.targetCompanies ? ` at <b>${escapeHtml(DATA.profile.targetCompanies)}</b>` : "";

  return `
  <div class="card hero" style="margin-bottom:22px;">
    <div class="hero-gauge">
      ${gaugeSvg(pct, level.color)}
      <div class="gauge-score mono">${pct}%</div>
      <div class="gauge-level" style="background:${level.color}22;color:${level.color};border:1px solid ${level.color}55;">${level.label}</div>
    </div>
    <div class="hero-side">
      <div class="hero-stat-row">
        <div class="hero-stat"><div class="num" style="color:var(--text-main)">${DATA.tasks.length}</div><div class="lbl">Total Tasks</div></div>
        <div class="hero-stat"><div class="num" style="color:var(--accent-emerald)">${done}</div><div class="lbl">Completed</div></div>
        <div class="hero-stat"><div class="num" style="color:var(--accent-amber)">${inProgress + pending}</div><div class="lbl">In Progress / Pending</div></div>
        <div class="hero-stat"><div class="num" style="color:var(--accent-rose)">${streak}🔥</div><div class="lbl">Day Streak</div></div>
      </div>
      <div class="hero-note">
        🎯 <b>Career Goal:</b> Preparing for ${targetRoleText}${targetCompanyText}.
        ${done === 0 ? "Check off tasks or take a quiz to begin building your readiness momentum!" : `You have completed <b>${done} tasks</b>. Reach <b>80% completion</b> across tracks for Interview-Ready status.`}
      </div>
    </div>
  </div>

  <div class="card" style="margin-bottom:22px;">
    <div class="card-header">
      <h3 class="cardtitle">${ICONS.roadmap} Placement Roadmap Master Route</h3>
      <button class="btn small ghost" data-nav="roadmap">View All Tracks →</button>
    </div>
    <div class="routemap">
      <div class="route-track">
        ${CATS.map((c, i) => {
          const p = catPct(c.id);
          const n = tasksByCat(c.id).length;
          return `
          <div class="station" data-nav="roadmap">
            ${i > 0 ? `<div class="connector"><div class="connector-fill" style="width:${p}%;background:${c.color};"></div></div>` : ""}
            <div class="ring-wrap">${ringSvg(p, c.color)}</div>
            <div class="catname">${c.name}</div>
            <div class="catpct mono" style="color:${c.color}">${p}%</div>
            <div class="cattasks">${n} topics</div>
          </div>`;
        }).join("")}
      </div>
    </div>
  </div>

  <div class="grid cols-2" style="margin-bottom:22px;">
    <div class="card">
      <h3 class="cardtitle">Category Progress Breakdown</h3>
      ${CATS.map(c => {
        const p = catPct(c.id);
        return `
        <div class="barrow">
          <div class="blabel"><span class="dot" style="background:${c.color};margin-right:6px;"></span>${c.name}</div>
          <div class="bartrack"><div class="barfill" style="width:${p}%;background:${c.color}"></div></div>
          <div class="barpct mono">${p}%</div>
        </div>`;
      }).join("")}
    </div>

    <div class="card">
      <h3 class="cardtitle">Strategic Action Recommendations</h3>
      ${recommendationsList.map(r => `
        <div class="recitem">
          <span class="ricon mono" style="color:${r.color || 'var(--primary)'}">${r.icon}</span>
          <span>${r.text}</span>
        </div>
      `).join("")}
    </div>
  </div>

  <div class="grid cols-2">
    <div class="card">
      <div class="card-header">
        <h3 class="cardtitle">Priority Action Items</h3>
        <button class="btn small ghost" data-nav="tasks">Manage Tasks →</button>
      </div>
      ${priorityTasks.length ? priorityTasks.map(t => taskRow(t, true)).join("") : `<div class="empty">All priority tasks cleared! Click "Add Task" to plan new topics.</div>`}
    </div>

    <div class="card">
      <div class="card-header">
        <h3 class="cardtitle">Recently Mastered Topics</h3>
        <button class="btn small ghost" data-nav="tasks">View All →</button>
      </div>
      ${recentDone.length ? recentDone.map(t => listItem(t, true)).join("") : `<div class="empty">No tasks completed yet. Check off items as you study to build your streak!</div>`}
    </div>
  </div>
  `;
}

function generateRecommendations() {
  const recs = [];
  const pcts = CATS.map(c => ({ c, pct: catPct(c.id), count: tasksByCat(c.id).length }));
  const lagging = pcts.filter(p => p.count > 0 && p.pct < 40).sort((a, b) => a.pct - b.pct);
  const highPriorityPending = DATA.tasks.filter(t => t.priority === "High" && t.status !== "Done");

  if (lagging.length > 0 && lagging[0].pct > 0) {
    recs.push({ icon: "⚠️", color: "var(--accent-rose)", text: `<b>${lagging[0].c.name}</b> is at ${lagging[0].pct}%. Prioritize this track to balance your placement preparation.` });
  } else if (DATA.tasks.filter(t => t.status === "Done").length === 0) {
    recs.push({ icon: "🚀", color: "var(--primary)", text: `Start your preparation today! Click the checkbox on any task in the <b>Roadmap</b> to earn your first streak flame.` });
  }
  if (highPriorityPending.length > 0) {
    recs.push({ icon: "⚡", color: "var(--accent-amber)", text: `You have <b>${highPriorityPending.length} high-priority topics</b> pending. Focus on clearing these first.` });
  }
  if (!DATA.profile.name) {
    recs.push({ icon: "👤", color: "var(--accent-cyan)", text: `Personalize your tracker: Enter your name and target companies in the <b>Profile & Goals</b> tab.` });
  }
  if (!DATA.atsChecked) {
    recs.push({ icon: "📄", color: "var(--accent-emerald)", text: `Evaluate your resume with the <b>ATS Resume Checker</b> to optimize keywords for recruiters.` });
  }
  if (recs.length < 4) {
    recs.push({ icon: "🧠", color: "var(--accent-blue)", text: `Test your knowledge with a quick 5-question test in the <b>Practice Arena</b>.` });
  }
  return recs.slice(0, 4);
}

function listItem(t, showDate) {
  const c = catInfo(t.category);
  const prColor = t.priority === "High" ? "var(--accent-rose)" : t.priority === "Medium" ? "var(--accent-amber)" : "var(--text-faint)";
  return `
  <div class="listitem">
    <div class="dot" style="background:${c.color}"></div>
    <div class="li-title">${escapeHtml(t.title)}</div>
    <div class="tag" style="background:${prColor}22;color:${prColor}">${t.priority}</div>
    <div class="li-meta">${showDate && t.completedAt ? new Date(t.completedAt).toLocaleDateString() : c.name}</div>
  </div>`;
}

function gaugeSvg(pct, color) {
  const r = 70, cx = 95, cy = 90;
  const arcLen = (pct / 100) * Math.PI * r;
  const circumference = Math.PI * r;
  return `
  <svg width="190" height="115" viewBox="0 0 190 115">
    <path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="none" stroke="var(--bg-surface-hover)" stroke-width="14" stroke-linecap="round"/>
    <path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${circumference - arcLen}" style="transition:stroke-dashoffset 0.8s ease;"/>
  </svg>`;
}

function ringSvg(pct, color) {
  const r = 26, c = 2 * Math.PI * r, off = c - (pct / 100) * c;
  return `
  <svg width="72" height="72" viewBox="0 0 72 72">
    <circle cx="36" cy="36" r="${r}" fill="none" stroke="var(--bg-surface-elevated)" stroke-width="7"/>
    <circle cx="36" cy="36" r="${r}" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 36 36)" style="transition:stroke-dashoffset 0.8s ease;"/>
    <text x="36" y="41" text-anchor="middle" font-size="13" font-family="'JetBrains Mono', monospace" fill="var(--text-main)" font-weight="700">${pct}</text>
  </svg>`;
}

/* =========================================================
   ROADMAP VIEW
========================================================= */
function renderRoadmap() {
  return `
  <div class="grid cols-2" style="margin-bottom:20px;">
    ${CATS.map(c => {
      const ts = tasksByCat(c.id);
      const p = catPct(c.id);
      const doneCount = ts.filter(t => t.status === "Done").length;
      return `
      <div class="card" style="border-top:3px solid ${c.color}">
        <div class="card-header">
          <h3 class="cardtitle" style="margin-bottom:0;">
            <span class="dot" style="background:${c.color};width:10px;height:10px;"></span>
            ${c.name}
          </h3>
          <span class="mono" style="font-weight:700;color:${c.color}">${doneCount}/${ts.length} (${p}%)</span>
        </div>
        <div class="bartrack" style="margin-bottom:16px;">
          <div class="barfill" style="width:${p}%;background:${c.color}"></div>
        </div>
        <div style="max-height:280px;overflow-y:auto;padding-right:4px;">
          ${ts.length ? ts.map(t => taskRow(t, true)).join("") : `<div class="empty">No tasks in this track. Add starter topics below.</div>`}
        </div>
        <button class="btn ghost small" style="margin-top:14px;width:100%;justify-content:center;border:1px dashed var(--border-strong);" data-open-task="__new" data-precat="${c.id}">
          ${ICONS.plus} Add Topic to ${c.name}
        </button>
      </div>`;
    }).join("")}
  </div>`;
}

/* =========================================================
   TASK PLANNER VIEW
========================================================= */
function renderTasks() {
  let list = DATA.tasks.slice();
  if (filters.q.trim()) list = list.filter(t => t.title.toLowerCase().includes(filters.q.toLowerCase()));
  if (filters.cat !== "all") list = list.filter(t => t.category === filters.cat);
  if (filters.status !== "all") list = list.filter(t => t.status === filters.status);
  if (filters.priority !== "all") list = list.filter(t => t.priority === filters.priority);
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const total = DATA.tasks.length;
  const done = DATA.tasks.filter(t => t.status === "Done").length;
  const inProgress = DATA.tasks.filter(t => t.status === "In Progress").length;

  return `
  <div class="card" style="margin-bottom:20px;">
    <div class="streak-box">
      <div class="streak-item"><div class="num" style="color:var(--text-main)">${total}</div><div class="lbl">Total Topics</div></div>
      <div class="streak-item"><div class="num" style="color:var(--accent-emerald)">${done}</div><div class="lbl">Completed</div></div>
      <div class="streak-item"><div class="num" style="color:var(--accent-amber)">${inProgress}</div><div class="lbl">In Progress</div></div>
      <div class="streak-item"><div class="num" style="color:var(--accent-rose)">${total - done - inProgress}</div><div class="lbl">Pending</div></div>
    </div>
  </div>

  <div class="card">
    <div class="toolbar">
      <input type="text" id="searchbox" placeholder="Search tasks, algorithms, topics..." value="${escapeAttr(filters.q)}">
      <select id="f-cat">
        <option value="all">All Tracks</option>
        ${CATS.map(c => `<option value="${c.id}" ${filters.cat === c.id ? "selected" : ""}>${c.name}</option>`).join("")}
      </select>
      <select id="f-status">
        <option value="all">All Statuses</option>
        ${STATUSES.map(s => `<option ${filters.status === s ? "selected" : ""}>${s}</option>`).join("")}
      </select>
      <select id="f-priority">
        <option value="all">All Priorities</option>
        ${PRIORITIES.map(p => `<option ${filters.priority === p ? "selected" : ""}>${p}</option>`).join("")}
      </select>
      <button class="btn small ghost" id="reset-filters">Reset</button>
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:12.5px;color:var(--text-muted);">
      <span>Showing <b>${list.length}</b> of ${total} tasks</span>
      <button class="btn small" id="btn-seed-tasks" title="Reset/Add comprehensive placement topics">+ Load Starter Roadmap</button>
    </div>

    ${list.length ? list.map(t => taskRow(t)).join("") : `<div class="empty">No tasks match the active search and filter criteria.</div>`}
  </div>`;
}

function taskRow(t, compact = false) {
  const c = catInfo(t.category);
  const prColor = t.priority === "High" ? "var(--accent-rose)" : t.priority === "Medium" ? "var(--accent-amber)" : "var(--text-faint)";
  const isDone = t.status === "Done";

  return `
  <div class="task-row">
    <button class="chk ${isDone ? 'done' : ''}" data-toggle="${t.id}" title="${isDone ? 'Mark as Pending' : 'Mark as Done'}">
      ${isDone ? ICONS.check : ""}
    </button>
    <div class="task-main ${isDone ? 'done' : ''}">
      <div class="t-title">${escapeHtml(t.title)}</div>
      <div class="t-sub">
        <span class="dot" style="background:${c.color}"></span>
        <span>${c.name}</span>
        <span class="tag" style="background:${prColor}22;color:${prColor}">${t.priority}</span>
        <span style="color:var(--text-faint)">• ${t.status}</span>
        ${t.completedAt ? `<span style="color:var(--accent-emerald)">✓ ${new Date(t.completedAt).toLocaleDateString()}</span>` : ""}
      </div>
    </div>
    <div class="task-actions">
      <button class="iconbtn" data-open-task="${t.id}" title="Edit">${ICONS.edit}</button>
      <button class="iconbtn danger" data-del="${t.id}" title="Delete">${ICONS.trash}</button>
    </div>
  </div>`;
}

/* =========================================================
   PRACTICE SUITE (QUIZZES, FLASHCARDS, MOCK INTERVIEWS)
========================================================= */
function renderPractice() {
  if (practiceState && practiceState.mode === "quiz") return renderQuizSession();

  return `
  <div class="practice-tab-nav">
    <button class="practice-tab-btn ${practiceTab === 'quizzes' ? 'active' : ''}" data-ptab="quizzes">🧠 Topic Quizzes</button>
    <button class="practice-tab-btn ${practiceTab === 'flashcards' ? 'active' : ''}" data-ptab="flashcards">🗂️ 3D Flashcards</button>
    <button class="practice-tab-btn ${practiceTab === 'simulator' ? 'active' : ''}" data-ptab="simulator">🎙️ Mock Interview Simulator</button>
    <button class="practice-tab-btn ${practiceTab === 'history' ? 'active' : ''}" data-ptab="history">📊 Practice History</button>
  </div>

  ${practiceTab === "quizzes" ? renderQuizArena() : ""}
  ${practiceTab === "flashcards" ? renderFlashcardsArena() : ""}
  ${practiceTab === "simulator" ? renderInterviewSimulator() : ""}
  ${practiceTab === "history" ? renderPracticeHistory() : ""}
  `;
}

function renderQuizArena() {
  const totalQuizzes = DATA.practiceHistory.filter(p => p.type === "quiz").length;
  const avgScore = totalQuizzes ? Math.round(DATA.practiceHistory.filter(p => p.type === "quiz").reduce((s, p) => s + (p.score / p.total) * 100, 0) / totalQuizzes) : 0;

  return `
  <div class="card" style="margin-bottom:20px;">
    <div class="streak-box">
      <div class="streak-item"><div class="num" style="color:var(--accent-amber)">${totalQuizzes}</div><div class="lbl">Quizzes Completed</div></div>
      <div class="streak-item"><div class="num" style="color:var(--accent-emerald)">${avgScore}%</div><div class="lbl">Average Accuracy</div></div>
      <div class="streak-item"><div class="num" style="color:var(--accent-cyan)">5 Questions</div><div class="lbl">Timed Per Quiz</div></div>
    </div>
  </div>

  <div class="grid cols-3">
    ${CATS.filter(c => PRACTICE_QUIZ[c.id]).map(c => {
      const attempts = DATA.practiceHistory.filter(p => p.category === c.id && p.type === "quiz");
      const best = attempts.length ? Math.max(...attempts.map(a => Math.round((a.score / a.total) * 100))) : null;
      return `
      <div class="card" style="border-top:3px solid ${c.color}">
        <h3 class="cardtitle"><span class="dot" style="background:${c.color};width:10px;height:10px;"></span>${c.name}</h3>
        <p style="font-size:12.5px;color:var(--text-muted);margin-bottom:14px;">
          ${attempts.length ? `Completed: <b>${attempts.length} attempts</b> · Best score: <b style="color:${c.color}">${best}%</b>` : "No attempts yet. Test your knowledge!"}
        </p>
        <button class="btn primary small" style="width:100%;justify-content:center;" data-start-quiz="${c.id}">
          ${ICONS.play} Start 5-Q Quiz
        </button>
      </div>`;
    }).join("")}
  </div>`;
}

function startQuiz(catId) {
  const bank = PRACTICE_QUIZ[catId] || [];
  if (!bank.length) return;
  const shuffled = [...bank].sort(() => Math.random() - 0.5).slice(0, 5);
  practiceState = { catId, mode: "quiz", questions: shuffled, idx: 0, score: 0, answered: false, selected: null, finished: false };
  render();
}

function selectQuizOption(i) {
  if (!practiceState || practiceState.answered) return;
  practiceState.selected = i;
  practiceState.answered = true;
  if (i === practiceState.questions[practiceState.idx].answer) {
    practiceState.score++;
  }
  render();
}

function nextQuizQuestion() {
  if (!practiceState) return;
  if (practiceState.idx < practiceState.questions.length - 1) {
    practiceState.idx++;
    practiceState.answered = false;
    practiceState.selected = null;
    render();
  } else {
    practiceState.finished = true;
    const today = todayKey();
    if (!DATA.checkinDates.includes(today)) {
      DATA.checkinDates.push(today);
    }
    DATA.practiceHistory.push({
      id: uid(),
      type: "quiz",
      category: practiceState.catId,
      score: practiceState.score,
      total: practiceState.questions.length,
      date: new Date().toISOString()
    });
    syncStatsAndAchievements();
    saveData();
    render();
  }
}

function renderQuizSession() {
  const s = practiceState;
  const c = catInfo(s.catId);

  if (s.finished) {
    const pct = Math.round((s.score / s.questions.length) * 100);
    const level = pct >= 80 ? "Outstanding Mastery!" : pct >= 60 ? "Good Effort — Keep Reviewing" : "Needs More Practice";
    return `
    <div class="card" style="max-width:540px;margin:30px auto;text-align:center;padding:40px 24px;">
      <div style="font-size:14px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;font-weight:700;">Quiz Completed</div>
      <h2 style="margin:8px 0;">${c.name}</h2>
      <div class="mono" style="font-size:52px;font-weight:800;color:${c.color};margin:12px 0;">${s.score} / ${s.questions.length}</div>
      <div class="gauge-level" style="display:inline-block;background:${c.color}22;color:${c.color};border:1px solid ${c.color}55;margin-bottom:24px;font-size:13px;padding:6px 16px;">
        ${level} (${pct}%)
      </div>
      <div style="display:flex;gap:12px;justify-content:center;">
        <button class="btn ghost" id="pr-exit">Back to Arena</button>
        <button class="btn primary" id="pr-retry">${ICONS.play} Retake Quiz</button>
      </div>
    </div>`;
  }

  const q = s.questions[s.idx];
  return `
  <div class="card" style="max-width:680px;margin:0 auto;">
    <div class="card-header" style="border-bottom:1px solid var(--border-subtle);padding-bottom:12px;">
      <div>
        <span class="dot" style="background:${c.color}"></span>
        <b style="color:${c.color}">${c.name}</b>
        <span style="color:var(--text-faint);margin-left:8px;">Question ${s.idx + 1} of ${s.questions.length}</span>
      </div>
      <button class="btn small ghost" id="pr-exit">Exit</button>
    </div>

    <div style="margin:20px 0 24px;">
      <h3 style="font-size:16px;line-height:1.5;font-weight:600;">${escapeHtml(q.q)}</h3>
    </div>

    ${q.options.map((opt, i) => {
      let cls = "quiz-opt";
      const letters = ["A", "B", "C", "D"];
      if (s.answered) {
        if (i === q.answer) cls += " correct";
        else if (i === s.selected) cls += " wrong";
      }
      return `
      <button class="${cls}" data-opt="${i}" ${s.answered ? "disabled" : ""}>
        <span class="quiz-opt-letter">${letters[i]}</span>
        <span style="flex:1;">${escapeHtml(opt)}</span>
        ${s.answered && i === q.answer ? `<span style="color:var(--accent-emerald)">✓</span>` : ""}
        ${s.answered && i === s.selected && i !== q.answer ? `<span style="color:var(--accent-rose)">✗</span>` : ""}
      </button>`;
    }).join("")}

    ${s.answered && q.exp ? `
      <div class="quiz-explanation-box">
        <b>Explanation:</b> ${escapeHtml(q.exp)}
      </div>
    ` : ""}

    ${s.answered ? `
      <div style="margin-top:20px;display:flex;justify-content:flex-end;">
        <button class="btn primary" id="pr-next">${s.idx < s.questions.length - 1 ? "Next Question →" : "View Score & Summary"}</button>
      </div>
    ` : ""}
  </div>`;
}

function renderFlashcardsArena() {
  const filtered = flashcardFilter === "all" ? FLASHCARDS : FLASHCARDS.filter(f => f.cat.toLowerCase() === flashcardFilter.toLowerCase());
  const card = filtered[flashcardIdx % filtered.length] || FLASHCARDS[0];
  const isKnown = !!DATA.knownFlashcards[card.id];

  return `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px;">
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn small ${flashcardFilter === 'all' ? 'primary' : 'ghost'}" data-fc-filter="all">All (${FLASHCARDS.length})</button>
      <button class="btn small ${flashcardFilter === 'dsa' ? 'primary' : 'ghost'}" data-fc-filter="dsa">DSA</button>
      <button class="btn small ${flashcardFilter === 'core cs' ? 'primary' : 'ghost'}" data-fc-filter="core cs">Core CS & DBMS</button>
      <button class="btn small ${flashcardFilter === 'languages' ? 'primary' : 'ghost'}" data-fc-filter="languages">Languages</button>
      <button class="btn small ${flashcardFilter === 'hr & comm' ? 'primary' : 'ghost'}" data-fc-filter="hr & comm">HR & Comm</button>
    </div>
    <div style="font-size:12.5px;color:var(--text-muted);">
      Card <b>${(flashcardIdx % filtered.length) + 1}</b> of ${filtered.length} · Mastered: <b style="color:var(--accent-emerald)">${Object.keys(DATA.knownFlashcards).length}</b>
    </div>
  </div>

  <div class="flashcard-container">
    <div class="flashcard-inner ${flashcardFlipped ? 'flipped' : ''}" id="flashcard-flip-target">
      <div class="flashcard-front">
        <span class="flashcard-tag" style="color:var(--primary)">${card.cat} • Question</span>
        <div class="flashcard-prompt">${escapeHtml(card.q)}</div>
        <span class="flashcard-hint">💡 Click anywhere on the card to reveal answer</span>
      </div>
      <div class="flashcard-back">
        <span class="flashcard-tag" style="color:var(--accent-emerald)">${card.cat} • Answer</span>
        <div class="flashcard-answer" style="white-space:pre-line;">${escapeHtml(card.a)}</div>
        <span class="flashcard-hint">🔄 Click to flip back</span>
      </div>
    </div>
  </div>

  <div style="display:flex;justify-content:center;align-items:center;gap:14px;">
    <button class="btn" id="fc-prev">← Previous</button>
    <button class="btn ${isKnown ? 'accent-emerald' : 'ghost'}" id="fc-toggle-known">
      ${isKnown ? "✓ Mastered" : "Mark as Mastered"}
    </button>
    <button class="btn primary" id="fc-next">Next Card →</button>
  </div>`;
}

function renderInterviewSimulator() {
  const prompts = [
    ...PRACTICE_PROMPTS.comm,
    ...PRACTICE_PROMPTS.resume,
    ...PRACTICE_PROMPTS.proj
  ];
  const activePrompt = prompts[Math.floor(Date.now() / 86400000) % prompts.length];

  return `
  <div class="grid cols-equal-2">
    <div class="card">
      <h3 class="cardtitle">🎙️ Timed Mock Interview Scenario</h3>
      <div style="background:var(--bg-surface-elevated);border:1px solid var(--border-subtle);border-radius:12px;padding:20px;margin-bottom:18px;font-size:15px;line-height:1.6;">
        "${escapeHtml(activePrompt)}"
      </div>
      <div style="font-size:12.5px;color:var(--text-muted);margin-bottom:14px;">
        Structure your response using the <b>STAR Technique</b>:
        <ul style="margin:6px 0 0 18px;">
          <li><b>Situation:</b> Context and problem setup</li>
          <li><b>Task:</b> What you needed to accomplish</li>
          <li><b>Action:</b> The specific technical steps you took</li>
          <li><b>Result:</b> The quantifiable impact achieved</li>
        </ul>
      </div>
      <div style="text-align:center;padding:14px;background:var(--bg-surface-elevated);border-radius:12px;">
        <div style="font-size:11px;text-transform:uppercase;color:var(--text-faint);font-weight:700;">Pitch Countdown Timer</div>
        <div class="timer-display" id="sim-timer-display">03:00</div>
        <div style="display:flex;gap:10px;justify-content:center;">
          <button class="btn primary small" id="sim-timer-toggle">Start Timer</button>
          <button class="btn ghost small" id="sim-timer-reset">Reset</button>
        </div>
      </div>
    </div>

    <div class="card">
      <h3 class="cardtitle">Response & Self-Rubric</h3>
      <div class="field">
        <label>Your Live Response (Type or practice speaking aloud)</label>
        <textarea class="input-control" id="sim-response-text" rows="8" placeholder="Type your response notes or key talking points here..."></textarea>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <button class="btn small" id="sim-speech-btn">🎙️ Voice Dictation</button>
        <button class="btn primary small" id="sim-save-practice">Save Practice Session</button>
      </div>
    </div>
  </div>`;
}

function renderPracticeHistory() {
  const history = DATA.practiceHistory.slice().reverse();
  return `
  <div class="card">
    <h3 class="cardtitle">Practice Log & Quiz History</h3>
    ${history.length ? `
      <div class="company-table-wrap">
        <table class="company-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${history.map(h => {
              const c = catInfo(h.category);
              const pct = Math.round((h.score / h.total) * 100);
              return `
              <tr>
                <td>${new Date(h.date).toLocaleDateString()} ${new Date(h.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td><span class="tag" style="background:var(--primary-glow);color:var(--primary)">${h.type.toUpperCase()}</span></td>
                <td><span class="dot" style="background:${c.color};margin-right:6px;"></span>${c.name}</td>
                <td class="mono"><b>${h.score} / ${h.total}</b> (${pct}%)</td>
                <td><span class="tag" style="background:${pct >= 70 ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'};color:${pct >= 70 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">${pct >= 70 ? 'Passed' : 'Needs Review'}</span></td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    ` : `<div class="empty">No practice sessions logged yet. Complete quizzes or flashcards above to record history!</div>`}
  </div>`;
}

/* =========================================================
   ATS RESUME ANALYZER
========================================================= */
function renderResumeChecker() {
  return `
  <div class="grid cols-equal-2">
    <div class="card">
      <div class="card-header">
        <h3 class="cardtitle">Paste Your Resume Text</h3>
        <button class="btn small ghost" id="btn-load-sample-resume">Load Sample</button>
      </div>
      <div class="field">
        <label>Select Target Engineering Role</label>
        <select class="input-control" id="ats-role-select">
          <option value="sde" ${resumeState.role === 'sde' ? 'selected' : ''}>Software Development Engineer (SDE / Full-Stack)</option>
          <option value="data" ${resumeState.role === 'data' ? 'selected' : ''}>Data Analyst / AI & ML Engineer</option>
          <option value="devops" ${resumeState.role === 'devops' ? 'selected' : ''}>Cloud & DevOps Engineer</option>
        </select>
      </div>
      <div class="field">
        <label>Resume Content (Plain Text)</label>
        <textarea class="input-control" id="ats-resume-input" rows="12" placeholder="Paste your complete resume text here (Contact, Education, Skills, Projects, Experience)...">${escapeHtml(resumeState.text || "")}</textarea>
      </div>
      <button class="btn primary" id="btn-analyze-resume" style="width:100%;justify-content:center;">
        ⚡ Run Instant ATS Scan & Score
      </button>
    </div>

    <div class="card">
      <h3 class="cardtitle">ATS Analysis & Keyword Audit</h3>
      ${resumeState.analysis ? renderAtsResults(resumeState.analysis) : `
        <div class="empty" style="padding:60px 20px;">
          <div style="font-size:36px;margin-bottom:12px;">📄</div>
          <b>No resume analyzed yet</b>
          <p style="color:var(--text-faint);margin-top:6px;font-size:12.5px;">Paste your resume text on the left and click "Run Instant ATS Scan" to evaluate keyword coverage, action verbs, and quantified impact metrics.</p>
        </div>
      `}
    </div>
  </div>`;
}

function analyzeResumeText(text, role) {
  const sdeKeywords = ["data structures", "algorithms", "c++", "java", "python", "javascript", "react", "node", "sql", "git", "api", "docker", "database", "system design", "mongodb", "postgresql", "aws"];
  const dataKeywords = ["python", "sql", "pandas", "numpy", "machine learning", "tableau", "power bi", "data analysis", "statistics", "tensorflow", "scikit-learn", "deep learning", "r"];
  const devopsKeywords = ["docker", "kubernetes", "aws", "ci/cd", "linux", "git", "terraform", "jenkins", "bash", "monitoring", "ansible", "cloud", "security"];

  const targetKeywords = role === "data" ? dataKeywords : role === "devops" ? devopsKeywords : sdeKeywords;
  const lower = text.toLowerCase();

  const foundKeywords = targetKeywords.filter(k => lower.includes(k));
  const missingKeywords = targetKeywords.filter(k => !lower.includes(k));

  const actionVerbs = ["architected", "developed", "engineered", "built", "implemented", "optimized", "reduced", "increased", "designed", "led", "automated", "created"];
  const foundVerbs = actionVerbs.filter(v => lower.includes(v));

  const hasMetrics = /\d+[%kKmM]?|\b\d+\b/.test(text);
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const hasPhone = /\+?\d{10,13}/.test(text);
  const hasLinkedIn = lower.includes("linkedin");
  const hasGitHub = lower.includes("github");

  let score = 30;
  score += Math.min(35, Math.round((foundKeywords.length / targetKeywords.length) * 35));
  score += Math.min(15, foundVerbs.length * 3);
  if (hasMetrics) score += 10;
  if (hasEmail && hasPhone) score += 5;
  if (hasLinkedIn || hasGitHub) score += 5;

  score = Math.min(100, Math.max(0, score));

  return {
    score,
    foundKeywords,
    missingKeywords,
    foundVerbs,
    hasMetrics,
    hasEmail,
    hasPhone,
    hasLinkedIn,
    hasGitHub
  };
}

function renderAtsResults(res) {
  const color = res.score >= 80 ? "var(--accent-emerald)" : res.score >= 60 ? "var(--accent-amber)" : "var(--accent-rose)";
  return `
  <div style="display:flex;align-items:center;gap:20px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border-subtle);">
    <div class="ats-score-badge" style="border-color:${color};box-shadow:0 0 20px ${color}44;">
      <span class="score-val" style="color:${color}">${res.score}</span>
      <span class="score-lbl">ATS Score</span>
    </div>
    <div>
      <h4 style="font-size:16px;margin-bottom:4px;">${res.score >= 80 ? "🔥 Excellent ATS Alignment!" : res.score >= 60 ? "👍 Moderate Match — Room for Improvement" : "⚠️ Needs Critical Keyword Optimization"}</h4>
      <p style="font-size:12.5px;color:var(--text-muted);">
        Found <b>${res.foundKeywords.length}</b> essential keywords and <b>${res.foundVerbs.length}</b> strong impact action verbs.
      </p>
    </div>
  </div>

  <div class="ats-checklist-item">
    <span class="ats-status-icon ${res.hasEmail && res.hasPhone ? 'pass' : 'warn'}">${res.hasEmail && res.hasPhone ? '✓' : '!'}</span>
    <div><b>Contact Information:</b> ${res.hasEmail && res.hasPhone ? 'Email and phone formatted properly.' : 'Make sure both Email and Phone are easily identifiable.'}</div>
  </div>

  <div class="ats-checklist-item">
    <span class="ats-status-icon ${res.hasGitHub || res.hasLinkedIn ? 'pass' : 'warn'}">${res.hasGitHub || res.hasLinkedIn ? '✓' : '!'}</span>
    <div><b>Online Presence:</b> ${res.hasGitHub || res.hasLinkedIn ? 'GitHub / LinkedIn profiles detected.' : 'Add your live LinkedIn and GitHub profile URLs.'}</div>
  </div>

  <div class="ats-checklist-item">
    <span class="ats-status-icon ${res.hasMetrics ? 'pass' : 'warn'}">${res.hasMetrics ? '✓' : '!'}</span>
    <div><b>Quantified Results:</b> ${res.hasMetrics ? 'Metrics and numbers detected in bullet points (%, numbers).' : 'Add measurable outcomes (e.g. "Reduced query time by 30%").'}</div>
  </div>

  <div style="margin-top:16px;">
    <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:var(--text-faint);margin-bottom:8px;">Recommended Keywords to Add:</div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;">
      ${res.missingKeywords.slice(0, 8).map(k => `<span class="tag" style="background:rgba(244,63,94,0.15);color:var(--accent-rose);border:1px solid rgba(244,63,94,0.3)">+ ${k}</span>`).join("")}
    </div>
  </div>`;
}

/* =========================================================
   COMPANY PLACEMENT TRACKER
========================================================= */
function renderCompanyTracker() {
  const list = DATA.companies;
  const stageColors = {
    "Wishlist": "var(--text-faint)",
    "Applied": "var(--accent-blue)",
    "Online Assessment": "var(--accent-amber)",
    "Technical Round 1": "var(--primary)",
    "Technical Round 2": "var(--accent-pink)",
    "HR Round": "var(--accent-cyan)",
    "Offer Received": "var(--accent-emerald)",
    "Rejected": "var(--accent-rose)"
  };

  return `
  <div class="card" style="margin-bottom:20px;">
    <div class="card-header">
      <div>
        <h3 class="cardtitle" style="margin-bottom:0;">💼 Placement Drives & Company Applications</h3>
        <p style="font-size:12.5px;color:var(--text-muted);margin-top:4px;">Manage campus drives, package CTCs, and interview rounds.</p>
      </div>
      <button class="btn primary small" id="btn-add-company">${ICONS.plus} Add Company Drive</button>
    </div>

    ${list.length ? `
      <div class="company-table-wrap">
        <table class="company-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Package (CTC)</th>
              <th>Drive Date</th>
              <th>Hiring Stage</th>
              <th>Notes / Action</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${list.map(c => {
              const color = stageColors[c.stage] || "var(--primary)";
              return `
              <tr>
                <td><b>${escapeHtml(c.company)}</b></td>
                <td>${escapeHtml(c.role)}</td>
                <td class="mono" style="color:var(--accent-emerald);font-weight:700;">${escapeHtml(c.packageCtc || "-")}</td>
                <td class="mono">${c.driveDate || "-"}</td>
                <td><span class="stage-badge" style="background:${color}22;color:${color};border:1px solid ${color}44;">${c.stage}</span></td>
                <td style="font-size:12px;color:var(--text-muted);">${escapeHtml(c.notes || "")}</td>
                <td>
                  <div style="display:flex;gap:6px;">
                    <button class="iconbtn" data-edit-company="${c.id}" title="Edit">${ICONS.edit}</button>
                    <button class="iconbtn danger" data-del-company="${c.id}" title="Delete">${ICONS.trash}</button>
                  </div>
                </td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    ` : `<div class="empty">No company drives tracked yet. Click "Add Company Drive" to record your target applications!</div>`}
  </div>`;
}

/* =========================================================
   ANALYTICS & CHARTS
========================================================= */
function renderAnalytics() {
  const consistency = computeConsistency();
  const totalDone = DATA.tasks.filter(t => t.status === "Done").length;
  const streak = computeCurrentStreak();

  return `
  <div class="card" style="margin-bottom:20px;">
    <div class="streak-box">
      <div class="streak-item"><div class="num" style="color:var(--accent-rose)">${streak}🔥</div><div class="lbl">Active Streak (Days)</div></div>
      <div class="streak-item"><div class="num" style="color:var(--accent-emerald)">${consistency}%</div><div class="lbl">30-Day Activity Matrix</div></div>
      <div class="streak-item"><div class="num" style="color:var(--accent-cyan)">${totalDone}</div><div class="lbl">Total Completed Tasks</div></div>
      <div class="streak-item"><div class="num" style="color:var(--primary)">${overallPct()}%</div><div class="lbl">Overall Readiness</div></div>
    </div>
  </div>

  <div class="grid cols-2" style="margin-bottom:20px;">
    <div class="card">
      <h3 class="cardtitle">Weekly Task Velocity</h3>
      <div class="chartwrap"><canvas id="chart-weekly"></canvas></div>
    </div>
    <div class="card">
      <h3 class="cardtitle">Category Completion %</h3>
      <div class="chartwrap"><canvas id="chart-cat"></canvas></div>
    </div>
  </div>

  <div class="grid cols-2" style="margin-bottom:20px;">
    <div class="card">
      <h3 class="cardtitle">14-Day Readiness Momentum Trend</h3>
      <div class="chartwrap"><canvas id="chart-trend"></canvas></div>
    </div>
    <div class="card">
      <h3 class="cardtitle">Data & Report Management</h3>
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:18px;">
        Export your complete placement progress as JSON for backup, import existing data, or download/print a clean placement dossier.
      </p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn primary small" id="export-json">${ICONS.download} Export JSON Backup</button>
        <button class="btn small" id="btn-import-json">${ICONS.upload} Import JSON File</button>
        <button class="btn small" id="export-txt">${ICONS.download} Text Summary</button>
        <button class="btn small" id="btn-print-report">${ICONS.print} Print Placement Dossier</button>
      </div>
      <input type="file" id="file-import-input" accept=".json" style="display:none;">
    </div>
  </div>`;
}

let chartWeekly = null, chartCat = null, chartTrend = null;
function drawCharts() {
  if (typeof Chart === "undefined") return;

  const weeks = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const end = new Date(now);
    end.setDate(now.getDate() - i * 7);
    const start = new Date(end);
    start.setDate(end.getDate() - 6);
    weeks.push({ start, end, count: 0, label: "W" + (6 - i) });
  }

  DATA.tasks.forEach(t => {
    if (!t.completedAt) return;
    const d = new Date(t.completedAt);
    weeks.forEach(w => {
      if (d >= w.start && d <= new Date(w.end.getTime() + 86399999)) w.count++;
    });
  });

  const ctx1 = document.getElementById("chart-weekly");
  if (chartWeekly) chartWeekly.destroy();
  if (ctx1) {
    chartWeekly = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: weeks.map(w => w.label),
        datasets: [{
          data: weeks.map(w => w.count),
          backgroundColor: "#8b5cf6",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "#94a3b8" }, grid: { display: false } },
          y: { ticks: { color: "#94a3b8", precision: 0 }, grid: { color: "rgba(255,255,255,0.06)" } }
        }
      }
    });
  }

  const ctx2 = document.getElementById("chart-cat");
  if (chartCat) chartCat.destroy();
  if (ctx2) {
    chartCat = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: CATS.map(c => c.name.split(" ")[0]),
        datasets: [{
          data: CATS.map(c => catPct(c.id)),
          backgroundColor: CATS.map(c => c.hex),
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { min: 0, max: 100, ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.06)" } },
          y: { ticks: { color: "#94a3b8" }, grid: { display: false } }
        }
      }
    });
  }

  const ctx3 = document.getElementById("chart-trend");
  if (chartTrend) chartTrend.destroy();
  if (ctx3) {
    const keys = Object.keys(DATA.history).sort().slice(-14);
    const series = keys.length ? keys.map(k => ({ date: k.slice(5), pct: DATA.history[k] })) : [{ date: "Today", pct: overallPct() }];

    chartTrend = new Chart(ctx3, {
      type: "line",
      data: {
        labels: series.map(s => s.date),
        datasets: [{
          data: series.map(s => s.pct),
          borderColor: "#06b6d4",
          backgroundColor: "rgba(6, 182, 212, 0.15)",
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointBackgroundColor: "#06b6d4"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "#94a3b8" }, grid: { display: false } },
          y: { min: 0, max: 100, ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.06)" } }
        }
      }
    });
  }
}

/* =========================================================
   ACHIEVEMENTS VIEW
========================================================= */
function renderAchievements() {
  const current = computeCurrentStreak();
  const longest = DATA.stats.longestStreak || 0;
  const unlockedCount = ACHIEVEMENT_DEFS.filter(a => DATA.achievements[a.id]).length;

  return `
  <div class="card" style="margin-bottom:20px;">
    <div class="streak-box">
      <div class="streak-item"><div class="num" style="color:var(--accent-rose)">${current}🔥</div><div class="lbl">Active Streak</div></div>
      <div class="streak-item"><div class="num" style="color:var(--accent-amber)">${longest}</div><div class="lbl">Longest Streak</div></div>
      <div class="streak-item"><div class="num" style="color:var(--accent-emerald)">${unlockedCount} / ${ACHIEVEMENT_DEFS.length}</div><div class="lbl">Badges Unlocked</div></div>
      <div class="streak-item"><div class="num" style="color:var(--primary)">${computeConsistency()}%</div><div class="lbl">Consistency Matrix</div></div>
    </div>
  </div>

  <div class="card">
    <h3 class="cardtitle">🏆 Placement Achievement Badges</h3>
    <div class="badge-grid">
      ${ACHIEVEMENT_DEFS.map(a => {
        const unlocked = DATA.achievements[a.id];
        return `
        <div class="badge ${unlocked ? 'unlocked' : 'locked'}">
          <div class="bicon">${a.icon}</div>
          <div class="bname">${a.name}</div>
          <div class="bdesc">${a.desc}</div>
          ${unlocked ? `<div class="bdate">Unlocked ${new Date(unlocked).toLocaleDateString()}</div>` : `<div class="bdate" style="color:var(--text-faint)">Locked</div>`}
        </div>`;
      }).join("")}
    </div>
  </div>`;
}

/* =========================================================
   RESOURCES VIEW
========================================================= */
function renderResources() {
  return `
  <div class="grid cols-3">
    ${CATS.map(c => {
      const items = RESOURCES[c.id] || [];
      return `
      <div class="card" style="border-top:3px solid ${c.color}">
        <h3 class="cardtitle"><span class="dot" style="background:${c.color}"></span>${c.name}</h3>
        ${items.map(r => `
          <a href="${escapeAttr(r.url)}" target="_blank" rel="noopener noreferrer" class="res-item">
            <span class="res-icon" style="background:var(--bg-surface-elevated);color:${c.color}">${r.type === 'Video' ? ICONS.play : ICONS.link}</span>
            <span class="res-main">
              <span class="res-title">${escapeHtml(r.title)}</span>
              <span class="res-source">${escapeHtml(r.source)} • <span style="color:${c.color}">${r.type}</span></span>
            </span>
          </a>
        `).join("")}
      </div>`;
    }).join("")}
  </div>`;
}

/* =========================================================
   PROFILE VIEW
========================================================= */
function renderProfile() {
  const p = DATA.profile;
  return `
  <div class="grid cols-equal-2">
    <div class="card">
      <h3 class="cardtitle">Student & Academic Profile</h3>
      <div class="form-grid">
        <div class="field"><label>Full Name</label><input type="text" class="input-control" id="p-name" value="${escapeAttr(p.name)}" placeholder="e.g. Your Name"></div>
        <div class="field"><label>College / University</label><input type="text" class="input-control" id="p-college" value="${escapeAttr(p.college || '')}" placeholder="e.g. Your College / University"></div>
        <div class="field"><label>Degree</label><input type="text" class="input-control" id="p-degree" value="${escapeAttr(p.degree)}" placeholder="e.g. B.Tech / B.E / MCA"></div>
        <div class="field"><label>Branch / Major</label><input type="text" class="input-control" id="p-branch" value="${escapeAttr(p.branch)}" placeholder="e.g. Computer Science, IT, ECE"></div>
        <div class="field"><label>Year of Study</label><input type="text" class="input-control" id="p-year" value="${escapeAttr(p.year)}" placeholder="e.g. 3rd Year / Final Year"></div>
        <div class="field"><label>Current CGPA / Percentage</label><input type="text" class="input-control" id="p-cgpa" value="${escapeAttr(p.cgpa || '')}" placeholder="e.g. 8.5 CGPA / 85%"></div>
      </div>
    </div>

    <div class="card">
      <h3 class="cardtitle">Placement Goals & Target Timeline</h3>
      <div class="field"><label>Target Primary Role</label><input type="text" class="input-control" id="p-role" value="${escapeAttr(p.targetRole)}" placeholder="e.g. Software Development Engineer (SDE), Data Analyst"></div>
      <div class="field"><label>Target Placement Season Date</label><input type="date" class="input-control" id="p-timeline" value="${escapeAttr(p.timeline)}"></div>
      <div class="field"><label>Target Dream Companies</label><input type="text" class="input-control" id="p-companies" value="${escapeAttr(p.targetCompanies)}" placeholder="e.g. Google, Amazon, Microsoft, TCS, Infosys, Zoho"></div>
      <div style="margin-top:24px;display:flex;gap:10px;">
        <button class="btn primary" id="save-profile">Save Profile & Goals</button>
        <button class="btn ghost" id="reset-data-btn" style="color:var(--accent-rose);">Reset All Data</button>
      </div>
    </div>
  </div>`;
}

/* =========================================================
   TASK & COMPANY MODALS
========================================================= */
function renderModal() {
  if (modalState.type === "company") {
    const isNew = modalState.id === "__new";
    const c = isNew ? { company: "", role: DATA.profile.targetRole || "", packageCtc: "", driveDate: todayKey(), stage: "Applied", notes: "" } : DATA.companies.find(x => x.id === modalState.id);
    return `
    <div class="overlay" id="overlay">
      <div class="modal">
        <h3>${isNew ? "Add Company Placement Drive" : "Edit Placement Drive"}</h3>
        <div class="field"><label>Company Name</label><input type="text" class="input-control" id="mc-company" value="${escapeAttr(c.company)}" placeholder="e.g. Amazon / Microsoft"></div>
        <div class="field"><label>Job Role</label><input type="text" class="input-control" id="mc-role" value="${escapeAttr(c.role)}" placeholder="e.g. SDE-1 / Graduate Engineer Trainee"></div>
        <div class="form-grid">
          <div class="field"><label>Package (CTC)</label><input type="text" class="input-control" id="mc-ctc" value="${escapeAttr(c.packageCtc)}" placeholder="e.g. 12 LPA"></div>
          <div class="field"><label>Drive Date</label><input type="date" class="input-control" id="mc-date" value="${escapeAttr(c.driveDate)}"></div>
        </div>
        <div class="field"><label>Current Hiring Stage</label><select class="input-control" id="mc-stage">${COMPANY_STAGES.map(s => `<option ${c.stage === s ? "selected" : ""}>${s}</option>`).join("")}</select></div>
        <div class="field"><label>Notes / Round Details</label><input type="text" class="input-control" id="mc-notes" value="${escapeAttr(c.notes)}" placeholder="e.g. Round 1 technical completed, preparing for system design"></div>
        <div class="modal-actions">
          <button class="btn ghost" id="m-cancel">Cancel</button>
          <button class="btn primary" id="mc-save">${isNew ? "Add Drive" : "Save Changes"}</button>
        </div>
      </div>
    </div>`;
  }

  // Task Modal
  const isNew = modalState.id === "__new";
  const t = isNew ? { title: "", category: modalState.precat || CATS[0].id, priority: "High", status: "Pending" } : DATA.tasks.find(x => x.id === modalState.id);

  return `
  <div class="overlay" id="overlay">
    <div class="modal">
      <h3>${isNew ? "Add Placement Task" : "Edit Placement Task"}</h3>
      <div class="field"><label>Task Title / Topic</label><input type="text" class="input-control" id="m-title" value="${escapeAttr(t.title)}" placeholder="e.g. Solve 10 Dynamic Programming questions"></div>
      <div class="field"><label>Category Track</label><select class="input-control" id="m-category">${CATS.map(c => `<option value="${c.id}" ${t.category === c.id ? "selected" : ""}>${c.name}</option>`).join("")}</select></div>
      <div class="form-grid">
        <div class="field"><label>Priority</label><select class="input-control" id="m-priority">${PRIORITIES.map(p => `<option ${t.priority === p ? "selected" : ""}>${p}</option>`).join("")}</select></div>
        <div class="field"><label>Status</label><select class="input-control" id="m-status">${STATUSES.map(s => `<option ${t.status === s ? "selected" : ""}>${s}</option>`).join("")}</select></div>
      </div>
      <div class="modal-actions">
        <button class="btn ghost" id="m-cancel">Cancel</button>
        <button class="btn primary" id="m-save">${isNew ? "Create Task" : "Save Changes"}</button>
      </div>
    </div>
  </div>`;
}

/* =========================================================
   EVENT HANDLERS & INTERACTIONS
========================================================= */
function attachHandlers() {
  document.querySelectorAll("[data-nav]").forEach(el => {
    el.onclick = () => nav(el.getAttribute("data-nav"));
  });

  document.querySelectorAll("[data-theme-set]").forEach(el => {
    el.onclick = () => {
      applyTheme(el.getAttribute("data-theme-set"));
      render();
    };
  });

  // Daily Quick Check-in button in sidebar
  const checkinBtn = document.getElementById("btn-quick-checkin");
  if (checkinBtn) {
    checkinBtn.onclick = () => {
      const today = todayKey();
      if (!DATA.checkinDates.includes(today)) {
        DATA.checkinDates.push(today);
      }
      syncStatsAndAchievements();
      saveData();
      const currentStreak = computeCurrentStreak();
      flashSaved(`Study Check-in logged! Streak: ${currentStreak} Day${currentStreak > 1 ? 's' : ''} 🔥`);
      render();
    };
  }

  // Task Done toggle
  document.querySelectorAll("[data-toggle]").forEach(el => {
    el.onclick = () => {
      const id = el.getAttribute("data-toggle");
      const t = DATA.tasks.find(x => x.id === id);
      if (!t) return;

      const today = todayKey();
      if (t.status === "Done") {
        t.status = "Pending";
        t.completedAt = null;
      } else {
        t.status = "Done";
        t.completedAt = new Date().toISOString();
        if (!DATA.checkinDates.includes(today)) {
          DATA.checkinDates.push(today);
        }
      }
      syncStatsAndAchievements();
      saveData();
      const currentStreak = computeCurrentStreak();
      flashSaved(t.status === "Done" ? `Task completed! Streak: ${currentStreak} Day${currentStreak > 1 ? 's' : ''} 🔥` : "Task marked pending");
      render();
    };
  });

  document.querySelectorAll("[data-del]").forEach(el => {
    el.onclick = () => {
      const id = el.getAttribute("data-del");
      DATA.tasks = DATA.tasks.filter(x => x.id !== id);
      syncStatsAndAchievements();
      saveData();
      render();
    };
  });

  document.querySelectorAll("[data-open-task]").forEach(el => {
    el.onclick = () => {
      modalState = { type: "task", id: el.getAttribute("data-open-task"), precat: el.getAttribute("data-precat") };
      render();
    };
  });

  // Practice Tabs
  document.querySelectorAll("[data-ptab]").forEach(el => {
    el.onclick = () => {
      practiceTab = el.getAttribute("data-ptab");
      practiceState = null;
      render();
    };
  });

  // Quiz events
  document.querySelectorAll("[data-start-quiz]").forEach(el => {
    el.onclick = () => startQuiz(el.getAttribute("data-start-quiz"));
  });
  document.querySelectorAll("[data-opt]").forEach(el => {
    el.onclick = () => selectQuizOption(parseInt(el.getAttribute("data-opt"), 10));
  });
  const prNext = document.getElementById("pr-next");
  if (prNext) prNext.onclick = nextQuizQuestion;
  const prRetry = document.getElementById("pr-retry");
  if (prRetry) prRetry.onclick = () => { if (practiceState) startQuiz(practiceState.catId); };
  const prExit = document.getElementById("pr-exit");
  if (prExit) prExit.onclick = () => { practiceState = null; render(); };

  // Flashcards events
  const fcFlipTarget = document.getElementById("flashcard-flip-target");
  if (fcFlipTarget) {
    fcFlipTarget.onclick = () => {
      flashcardFlipped = !flashcardFlipped;
      fcFlipTarget.classList.toggle("flipped", flashcardFlipped);
    };
  }
  const fcNext = document.getElementById("fc-next");
  if (fcNext) {
    fcNext.onclick = () => {
      flashcardFlipped = false;
      flashcardIdx++;
      render();
    };
  }
  const fcPrev = document.getElementById("fc-prev");
  if (fcPrev) {
    fcPrev.onclick = () => {
      flashcardFlipped = false;
      flashcardIdx = Math.max(0, flashcardIdx - 1);
      render();
    };
  }
  const fcToggleKnown = document.getElementById("fc-toggle-known");
  if (fcToggleKnown) {
    fcToggleKnown.onclick = () => {
      const filtered = flashcardFilter === "all" ? FLASHCARDS : FLASHCARDS.filter(f => f.cat.toLowerCase() === flashcardFilter.toLowerCase());
      const card = filtered[flashcardIdx % filtered.length] || FLASHCARDS[0];
      if (DATA.knownFlashcards[card.id]) {
        delete DATA.knownFlashcards[card.id];
      } else {
        DATA.knownFlashcards[card.id] = true;
      }
      syncStatsAndAchievements();
      saveData();
      render();
    };
  }
  document.querySelectorAll("[data-fc-filter]").forEach(el => {
    el.onclick = () => {
      flashcardFilter = el.getAttribute("data-fc-filter");
      flashcardIdx = 0;
      flashcardFlipped = false;
      render();
    };
  });

  // Interview Simulator Timer
  const simTimerDisplay = document.getElementById("sim-timer-display");
  const simTimerToggle = document.getElementById("sim-timer-toggle");
  const simTimerReset = document.getElementById("sim-timer-reset");
  if (simTimerToggle) {
    simTimerToggle.onclick = () => {
      if (interviewTimer.active) {
        clearInterval(interviewTimer.interval);
        interviewTimer.active = false;
        simTimerToggle.textContent = "Resume Timer";
      } else {
        interviewTimer.active = true;
        simTimerToggle.textContent = "Pause Timer";
        interviewTimer.interval = setInterval(() => {
          if (interviewTimer.seconds > 0) {
            interviewTimer.seconds--;
            const mins = Math.floor(interviewTimer.seconds / 60).toString().padStart(2, '0');
            const secs = (interviewTimer.seconds % 60).toString().padStart(2, '0');
            if (simTimerDisplay) simTimerDisplay.textContent = `${mins}:${secs}`;
          } else {
            clearInterval(interviewTimer.interval);
            interviewTimer.active = false;
            simTimerToggle.textContent = "Time's Up!";
            flashSaved("⏰ Time is up for this interview scenario!");
          }
        }, 1000);
      }
    };
  }
  if (simTimerReset) {
    simTimerReset.onclick = () => {
      clearInterval(interviewTimer.interval);
      interviewTimer.active = false;
      interviewTimer.seconds = 180;
      if (simTimerDisplay) simTimerDisplay.textContent = "03:00";
      if (simTimerToggle) simTimerToggle.textContent = "Start Timer";
    };
  }
  const simSavePractice = document.getElementById("sim-save-practice");
  if (simSavePractice) {
    simSavePractice.onclick = () => {
      const today = todayKey();
      if (!DATA.checkinDates.includes(today)) {
        DATA.checkinDates.push(today);
      }
      DATA.practiceHistory.push({
        id: uid(),
        type: "interview",
        category: "comm",
        score: 5,
        total: 5,
        date: new Date().toISOString()
      });
      syncStatsAndAchievements();
      saveData();
      flashSaved("Mock interview practice response logged!");
      render();
    };
  }

  // ATS Resume events
  const btnAnalyzeResume = document.getElementById("btn-analyze-resume");
  if (btnAnalyzeResume) {
    btnAnalyzeResume.onclick = () => {
      const text = (document.getElementById("ats-resume-input").value || "").trim();
      const role = document.getElementById("ats-role-select").value;
      if (!text) {
        alert("Please enter or paste your resume text first.");
        return;
      }
      const analysis = analyzeResumeText(text, role);
      resumeState = { text, role, score: analysis.score, analysis };
      DATA.atsChecked = true;
      syncStatsAndAchievements();
      saveData();
      render();
    };
  }
  const btnLoadSampleResume = document.getElementById("btn-load-sample-resume");
  if (btnLoadSampleResume) {
    btnLoadSampleResume.onclick = () => {
      const sample = `John Doe | john.doe@email.com | +91 9876543210 | linkedin.com/in/johndoe | github.com/johndoe
EDUCATION: B.Tech in Computer Science and Engineering, CGPA: 8.8 (2022 - 2026)
SKILLS: C++, Java, Python, JavaScript, TypeScript, SQL, React, Node.js, Express, Docker, Git, REST APIs, MongoDB, PostgreSQL
PROJECTS: Full-Stack Placement Portal (React, Node.js, PostgreSQL)
- Architected and deployed a responsive portal handling 5,000+ active sessions.
- Reduced database query latency by 42% through efficient indexing and Redis caching.
- Integrated JWT authentication and role-based access control for recruiters.`;
      const input = document.getElementById("ats-resume-input");
      if (input) input.value = sample;
    };
  }

  // Company events
  const btnAddCompany = document.getElementById("btn-add-company");
  if (btnAddCompany) {
    btnAddCompany.onclick = () => {
      modalState = { type: "company", id: "__new" };
      render();
    };
  }
  document.querySelectorAll("[data-edit-company]").forEach(el => {
    el.onclick = () => {
      modalState = { type: "company", id: el.getAttribute("data-edit-company") };
      render();
    };
  });
  document.querySelectorAll("[data-del-company]").forEach(el => {
    el.onclick = () => {
      const id = el.getAttribute("data-del-company");
      DATA.companies = DATA.companies.filter(c => c.id !== id);
      syncStatsAndAchievements();
      saveData();
      render();
    };
  });

  // Modal events
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.onclick = (e) => {
      if (e.target === overlay) {
        modalState = null;
        render();
      }
    };
    const mCancel = document.getElementById("m-cancel");
    if (mCancel) mCancel.onclick = () => { modalState = null; render(); };

    const mSave = document.getElementById("m-save");
    if (mSave) {
      mSave.onclick = () => {
        const title = document.getElementById("m-title").value.trim();
        if (!title) return;
        const category = document.getElementById("m-category").value;
        const priority = document.getElementById("m-priority").value;
        const status = document.getElementById("m-status").value;

        if (modalState.id === "__new") {
          const isDone = status === "Done";
          const today = todayKey();
          if (isDone && !DATA.checkinDates.includes(today)) {
            DATA.checkinDates.push(today);
          }
          DATA.tasks.push({
            id: uid(),
            title,
            category,
            priority,
            status,
            createdAt: new Date().toISOString(),
            completedAt: isDone ? new Date().toISOString() : null
          });
        } else {
          const t = DATA.tasks.find(x => x.id === modalState.id);
          t.title = title;
          t.category = category;
          t.priority = priority;
          if (status === "Done" && t.status !== "Done") {
            t.completedAt = new Date().toISOString();
            const today = todayKey();
            if (!DATA.checkinDates.includes(today)) {
              DATA.checkinDates.push(today);
            }
          }
          if (status !== "Done") t.completedAt = null;
          t.status = status;
        }
        syncStatsAndAchievements();
        saveData();
        modalState = null;
        render();
      };
    }

    const mcSave = document.getElementById("mc-save");
    if (mcSave) {
      mcSave.onclick = () => {
        const company = document.getElementById("mc-company").value.trim();
        if (!company) return;
        const role = document.getElementById("mc-role").value.trim();
        const packageCtc = document.getElementById("mc-ctc").value.trim();
        const driveDate = document.getElementById("mc-date").value;
        const stage = document.getElementById("mc-stage").value;
        const notes = document.getElementById("mc-notes").value.trim();

        if (modalState.id === "__new") {
          DATA.companies.push({ id: uid(), company, role, packageCtc, driveDate, stage, notes });
        } else {
          const c = DATA.companies.find(x => x.id === modalState.id);
          c.company = company;
          c.role = role;
          c.packageCtc = packageCtc;
          c.driveDate = driveDate;
          c.stage = stage;
          c.notes = notes;
        }
        syncStatsAndAchievements();
        saveData();
        modalState = null;
        render();
      };
    }
  }

  // Search and Filters
  const sb = document.getElementById("searchbox");
  if (sb) {
    sb.oninput = () => {
      filters.q = sb.value;
      render();
      const nb = document.getElementById("searchbox");
      if (nb) {
        nb.focus();
        nb.selectionStart = nb.value.length;
      }
    };
  }
  const fc = document.getElementById("f-cat");
  if (fc) fc.onchange = () => { filters.cat = fc.value; render(); };
  const fs = document.getElementById("f-status");
  if (fs) fs.onchange = () => { filters.status = fs.value; render(); };
  const fp = document.getElementById("f-priority");
  if (fp) fp.onchange = () => { filters.priority = fp.value; render(); };
  const resetFilters = document.getElementById("reset-filters");
  if (resetFilters) {
    resetFilters.onclick = () => {
      filters = { q: "", cat: "all", status: "all", priority: "all" };
      render();
    };
  }

  const btnSeedTasks = document.getElementById("btn-seed-tasks");
  if (btnSeedTasks) {
    btnSeedTasks.onclick = () => {
      if (confirm("Load starter roadmap topics? Existing custom tasks will be preserved.")) {
        STARTER_TASKS.forEach(t => {
          if (!DATA.tasks.some(existing => existing.title === t.title)) {
            DATA.tasks.push({
              id: uid(),
              title: t.title,
              category: t.category,
              priority: t.priority,
              status: "Pending",
              createdAt: new Date().toISOString(),
              completedAt: null
            });
          }
        });
        syncStatsAndAchievements();
        saveData();
        flashSaved("Starter roadmap topics loaded!");
        render();
      }
    };
  }

  // Profile Save
  const saveProfileBtn = document.getElementById("save-profile");
  if (saveProfileBtn) {
    saveProfileBtn.onclick = () => {
      DATA.profile = {
        name: document.getElementById("p-name").value.trim(),
        college: document.getElementById("p-college").value.trim(),
        degree: document.getElementById("p-degree").value.trim(),
        branch: document.getElementById("p-branch").value.trim(),
        year: document.getElementById("p-year").value.trim(),
        cgpa: document.getElementById("p-cgpa").value.trim(),
        targetRole: document.getElementById("p-role").value.trim(),
        timeline: document.getElementById("p-timeline").value,
        targetCompanies: document.getElementById("p-companies").value.trim(),
      };
      saveData();
      flashSaved("Profile & Goals saved successfully!");
      render();
    };
  }

  const resetDataBtn = document.getElementById("reset-data-btn");
  if (resetDataBtn) {
    resetDataBtn.onclick = () => {
      if (confirm("Are you sure you want to reset all data and streaks to zero? This cannot be undone.")) {
        DATA = defaultData();
        saveData();
        flashSaved("All data and streaks reset to zero.");
        render();
      }
    };
  }

  // Export / Import
  const expJson = document.getElementById("export-json");
  if (expJson) {
    expJson.onclick = () => downloadFile("placement-progress-backup.json", JSON.stringify(DATA, null, 2), "application/json");
  }

  const btnImportJson = document.getElementById("btn-import-json");
  const fileImportInput = document.getElementById("file-import-input");
  if (btnImportJson && fileImportInput) {
    btnImportJson.onclick = () => fileImportInput.click();
    fileImportInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed && typeof parsed === "object") {
            DATA = Object.assign(defaultData(), parsed);
            syncStatsAndAchievements();
            saveData();
            flashSaved("Data successfully imported from file!");
            render();
          }
        } catch (err) {
          alert("Invalid JSON backup file.");
        }
      };
      reader.readAsText(file);
    };
  }

  const expTxt = document.getElementById("export-txt");
  if (expTxt) expTxt.onclick = () => downloadFile("placement-dossier-report.txt", buildTextReport(), "text/plain");

  const btnPrintReport = document.getElementById("btn-print-report");
  if (btnPrintReport) btnPrintReport.onclick = () => window.print();
}

function buildTextReport() {
  const pct = overallPct();
  const level = readinessLevel(pct);
  let lines = [];
  lines.push("=================================================");
  lines.push("CAREER 360 — STUDENT PLACEMENT READINESS DOSSIER");
  lines.push("Generated: " + new Date().toLocaleString());
  lines.push("=================================================");
  lines.push("");
  lines.push("STUDENT PROFILE");
  lines.push("- Name: " + (DATA.profile.name || "Not specified"));
  lines.push("- College: " + (DATA.profile.college || "Not specified"));
  lines.push("- Degree & Branch: " + (DATA.profile.degree || "-") + " (" + (DATA.profile.branch || "-") + ")");
  lines.push("- Year of Study: " + (DATA.profile.year || "-") + " | CGPA: " + (DATA.profile.cgpa || "-"));
  lines.push("- Target Role: " + (DATA.profile.targetRole || "Not specified"));
  lines.push("- Target Companies: " + (DATA.profile.targetCompanies || "Not specified"));
  lines.push("- Target Date: " + (DATA.profile.timeline || "Not specified"));
  lines.push("");
  lines.push("READINESS SUMMARY");
  lines.push("- Overall Completion: " + pct + "%");
  lines.push("- Assessment Level: " + level.label);
  lines.push("- Preparation Streak: " + computeCurrentStreak() + " Days");
  lines.push("- Longest Streak: " + (DATA.stats.longestStreak || 0) + " Days");
  lines.push("- 30-Day Consistency: " + computeConsistency() + "%");
  lines.push("");
  lines.push("CATEGORY BREAKDOWN");
  CATS.forEach(c => lines.push(`- ${c.name}: ${catPct(c.id)}% (${tasksByCat(c.id).length} topics)`));
  lines.push("");
  lines.push("COMPANY APPLICATION PIPELINE");
  DATA.companies.forEach(c => lines.push(`- [${c.stage}] ${c.company} — ${c.role} (${c.packageCtc || "N/A"})`));
  lines.push("");
  lines.push("UNLOCKED BADGES (" + Object.keys(DATA.achievements).length + ")");
  ACHIEVEMENT_DEFS.filter(a => DATA.achievements[a.id]).forEach(a => lines.push(`- ${a.icon} ${a.name}: ${a.desc}`));
  lines.push("");
  lines.push("TASK & TOPICS LIST (" + DATA.tasks.length + ")");
  DATA.tasks.forEach(t => lines.push(`[${t.status === "Done" ? "X" : " "}] (${t.priority}) ${t.title} — ${catInfo(t.category).name}`));
  return lines.join("\n");
}

function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(s) {
  return (s || "").toString().replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}

function escapeAttr(s) {
  return escapeHtml(s);
}

/* =========================================================
   INITIALIZATION
========================================================= */
function init() {
  loadData();
  applyTheme(DATA.theme || "midnight");
  syncStatsAndAchievements();
  saveData();
  render();
}

init();
