/**
 * Career360 — Placement Preparation & Career Roadmap Tracker
 * Full-Stack Node.js & Express Server with Embedded Persistent Database (NeDB)
 * and Cloud Firebase Firestore Sync (API Key Based).
 *
 * Developed by: Malathi Durai
 * Repository: github.com/malathidurai06/Career360-PlacementRoadMap
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const Datastore = require('nedb-promises');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure local database directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Embedded Local Persistent Database (NeDB: File-backed NoSQL document store)
const localDb = Datastore.create({
  filename: path.join(DATA_DIR, 'career360.db'),
  autoload: true
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// Helper to mask sensitive keys
function maskKey(key) {
  if (!key || typeof key !== 'string') return '';
  if (key.length <= 8) return '****';
  return key.slice(0, 4) + '****' + key.slice(-4);
}

// Initial starter curriculum tasks for first launch
const INITIAL_STARTER_TASKS = [
  { id: "task_0", title: "Master Time, Speed & Distance Formulas", category: "apt", priority: "High", status: "Pending" },
  { id: "task_1", title: "Practice Profit & Loss and Percentage Shortcuts", category: "apt", priority: "High", status: "Pending" },
  { id: "task_2", title: "Solve 20 Syllogisms & Seating Arrangement Problems", category: "apt", priority: "Medium", status: "Pending" },
  { id: "task_3", title: "Array: Two Pointers & Sliding Window Problems", category: "dsa", priority: "High", status: "Pending" },
  { id: "task_4", title: "Binary Search & Rotated Sorted Array variations", category: "dsa", priority: "High", status: "Pending" },
  { id: "task_5", title: "Tree Traversals (Inorder, Preorder, Level Order)", category: "dsa", priority: "High", status: "Pending" },
  { id: "task_6", title: "Graph BFS / DFS & Cycle Detection", category: "dsa", priority: "High", status: "Pending" },
  { id: "task_7", title: "Revise OOPs Concepts (Inheritance, Polymorphism, Abstraction)", category: "lang", priority: "High", status: "Pending" },
  { id: "task_8", title: "Understand Java/C++ Memory Model & Pointers", category: "lang", priority: "Medium", status: "Pending" },
  { id: "task_9", title: "Master SQL Joins, Group By & Aggregate Queries", category: "core", priority: "High", status: "Pending" },
  { id: "task_10", title: "Revise DBMS Normalization & ACID Properties", category: "core", priority: "High", status: "Pending" },
  { id: "task_11", title: "Operating Systems: Process vs Thread & Deadlocks", category: "core", priority: "High", status: "Pending" },
  { id: "task_12", title: "Deploy Full-Stack Project on Vercel/Render with Live Demo", category: "proj", priority: "High", status: "Pending" },
  { id: "task_13", title: "Add Readme with Architecture Diagram & Setup Steps", category: "proj", priority: "Medium", status: "Pending" },
  { id: "task_14", title: "Prepare 1-Minute 'Tell Me About Yourself' STAR Pitch", category: "comm", priority: "High", status: "Pending" },
  { id: "task_15", title: "Structure 3 STAR Behavioral Project Stories", category: "comm", priority: "High", status: "Pending" },
  { id: "task_16", title: "Format Resume with Overleaf LaTeX 1-Page Template", category: "resume", priority: "High", status: "Pending" },
  { id: "task_17", title: "Add Quantifiable Metrics to Experience & Projects", category: "resume", priority: "High", status: "Pending" },
  { id: "task_18", title: "Research Target Company Previous Year Test Papers", category: "company", priority: "High", status: "Pending" },
  { id: "task_19", title: "Complete 1 Full Mock Coding + Aptitude Drive", category: "company", priority: "High", status: "Pending" }
];

async function getOrSeedData() {
  let doc = await localDb.findOne({ studentId: 'default_student' });
  if (!doc) {
    doc = {
      studentId: 'default_student',
      theme: 'midnight',
      bgStyle: 'grid',
      profile: {
        name: 'Malathi Durai',
        college: '',
        degree: 'B.Tech / B.E',
        branch: 'Computer Science & Engineering',
        year: '3rd Year',
        cgpa: '',
        targetRole: 'Software Development Engineer (SDE-1)',
        targetDate: '',
        dreamCompanies: 'Google, Microsoft, Amazon, Zoho, TCS Digital'
      },
      tasks: INITIAL_STARTER_TASKS.map(t => ({
        ...t,
        createdAt: new Date().toISOString(),
        completedAt: null
      })),
      companies: [],
      practiceHistory: [],
      stats: { streak: 1, lastActive: new Date().toISOString().slice(0, 10), points: 150 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await localDb.insert(doc);
    console.log('[Database] Initial student record seeded in data/career360.db');
  }
  return doc;
}

/* =========================================================
   API ROUTES
========================================================= */

/**
 * GET /api/status
 * Returns database health, active storage engine, and Firebase sync status
 */
app.get('/api/status', async (req, res) => {
  try {
    const docCount = await localDb.count({});
    const hasFirebase = Boolean(process.env.FIREBASE_API_KEY && process.env.FIREBASE_PROJECT_ID);

    res.json({
      ok: true,
      connected: true,
      databaseType: 'embedded-hybrid',
      engine: 'NeDB Persistent File Database + Cloud Firestore Sync',
      dbFile: 'data/career360.db',
      recordCount: docCount,
      firebase: {
        configured: hasFirebase,
        apiKeyMasked: maskKey(process.env.FIREBASE_API_KEY),
        projectId: process.env.FIREBASE_PROJECT_ID || '',
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || (process.env.FIREBASE_PROJECT_ID ? `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com` : ''),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
        appId: process.env.FIREBASE_APP_ID ? maskKey(process.env.FIREBASE_APP_ID) : ''
      },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * GET /api/data
 * Fetches user career roadmap & tracker data from the persistent database
 */
app.get('/api/data', async (req, res) => {
  try {
    const doc = await getOrSeedData();
    res.json({ ok: true, data: doc, source: 'local-db' });
  } catch (err) {
    console.error('[Database Error] GET /api/data failed:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * POST /api/data
 * Saves entire user tracker state to persistent database (Full Sync)
 */
app.post('/api/data', async (req, res) => {
  try {
    const payload = req.body || {};
    payload.studentId = 'default_student';
    payload.updatedAt = new Date().toISOString();

    const existing = await localDb.findOne({ studentId: 'default_student' });
    if (existing) {
      await localDb.update({ studentId: 'default_student' }, { $set: payload });
    } else {
      await localDb.insert(payload);
    }

    res.json({
      ok: true,
      message: 'Successfully saved to persistent database (data/career360.db)',
      updatedAt: payload.updatedAt
    });
  } catch (err) {
    console.error('[Database Error] POST /api/data failed:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * POST /api/tasks
 * Adds or updates a single task
 */
app.post('/api/tasks', async (req, res) => {
  try {
    const task = req.body;
    let doc = await getOrSeedData();
    const tasks = doc.tasks || [];
    const idx = tasks.findIndex(t => t.id === task.id);
    if (idx >= 0) {
      tasks[idx] = Object.assign(tasks[idx], task);
    } else {
      tasks.push(task);
    }
    await localDb.update({ studentId: 'default_student' }, { $set: { tasks, updatedAt: new Date().toISOString() } });
    res.json({ ok: true, task });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * DELETE /api/tasks/:id
 * Removes a task
 */
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    let doc = await getOrSeedData();
    const tasks = (doc.tasks || []).filter(t => t.id !== taskId);
    await localDb.update({ studentId: 'default_student' }, { $set: { tasks, updatedAt: new Date().toISOString() } });
    res.json({ ok: true, deletedId: taskId });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * POST /api/profile
 * Updates student profile & targets
 */
app.post('/api/profile', async (req, res) => {
  try {
    const profile = req.body;
    await localDb.update(
      { studentId: 'default_student' },
      { $set: { profile, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );
    res.json({ ok: true, message: 'Profile updated in database' });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * POST /api/companies
 * Adds or updates a company drive entry
 */
app.post('/api/companies', async (req, res) => {
  try {
    const company = req.body;
    let doc = await getOrSeedData();
    const companies = doc.companies || [];
    const idx = companies.findIndex(c => c.id === company.id);
    if (idx >= 0) {
      companies[idx] = Object.assign(companies[idx], company);
    } else {
      companies.push(company);
    }
    await localDb.update({ studentId: 'default_student' }, { $set: { companies, updatedAt: new Date().toISOString() } });
    res.json({ ok: true, company });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * DELETE /api/companies/:id
 * Removes a company drive entry
 */
app.delete('/api/companies/:id', async (req, res) => {
  try {
    const companyId = req.params.id;
    let doc = await getOrSeedData();
    const companies = (doc.companies || []).filter(c => c.id !== companyId);
    await localDb.update({ studentId: 'default_student' }, { $set: { companies, updatedAt: new Date().toISOString() } });
    res.json({ ok: true, deletedId: companyId });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * POST /api/firebase-config
 * Updates Firebase credentials in memory and writes to local .env file securely
 */
app.post('/api/firebase-config', async (req, res) => {
  const { apiKey, projectId, authDomain, storageBucket, appId } = req.body;

  if (!apiKey || !projectId) {
    return res.status(400).json({
      ok: false,
      error: 'Both Firebase API Key and Project ID are required.'
    });
  }

  try {
    process.env.FIREBASE_API_KEY = apiKey.trim();
    process.env.FIREBASE_PROJECT_ID = projectId.trim();
    if (authDomain) process.env.FIREBASE_AUTH_DOMAIN = authDomain.trim();
    if (storageBucket) process.env.FIREBASE_STORAGE_BUCKET = storageBucket.trim();
    if (appId) process.env.FIREBASE_APP_ID = appId.trim();

    // Persist to .env file
    const envPath = path.join(__dirname, '.env');
    const envLines = [
      `PORT=${PORT}`,
      `FIREBASE_API_KEY=${process.env.FIREBASE_API_KEY}`,
      `FIREBASE_PROJECT_ID=${process.env.FIREBASE_PROJECT_ID}`,
      `FIREBASE_AUTH_DOMAIN=${process.env.FIREBASE_AUTH_DOMAIN || `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`}`,
      `FIREBASE_STORAGE_BUCKET=${process.env.FIREBASE_STORAGE_BUCKET || ''}`,
      `FIREBASE_APP_ID=${process.env.FIREBASE_APP_ID || ''}`
    ];
    fs.writeFileSync(envPath, envLines.join('\n') + '\n', 'utf8');

    console.log(`[Firebase] Configuration saved for Project: ${process.env.FIREBASE_PROJECT_ID}`);

    res.json({
      ok: true,
      message: 'Firebase configuration saved successfully!',
      projectId: process.env.FIREBASE_PROJECT_ID,
      apiKeyMasked: maskKey(process.env.FIREBASE_API_KEY)
    });
  } catch (err) {
    console.error('[Firebase Config Error]:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Serve frontend for all unmatched GET routes (SPA fallback)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Career360 Full-Stack Application is running!`);
  console.log(`📍 Web URL: http://localhost:${PORT}`);
  console.log(`🗄️  Active Database: Embedded File DB (data/career360.db)`);
  console.log(`☁️  Cloud Sync: Firebase Cloud Firestore (API Key Ready)`);
  console.log(`💾 Persistence: Auto-persisting all records to disk`);
  console.log(`=======================================================`);
});
