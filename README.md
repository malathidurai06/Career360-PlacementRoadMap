# Career360 — Student Career Roadmap & Placement Readiness Tracker

[![Node.js](https://img.shields.io/badge/Node.js-v20+-68a063?style=flat&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat&logo=express)](https://expressjs.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-ffca28?style=flat&logo=firebase)](https://firebase.google.com/)
[![NeDB](https://img.shields.io/badge/Database-Embedded_NeDB-06b6d4?style=flat)](https://github.com/bajankristof/nedb-promises)
[![JavaScript](https://img.shields.io/badge/Vanilla_JS-ES6+-f7df1e?style=flat&logo=javascript)](https://developer.mozilla.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An end-to-end full-stack placement preparation portal and career roadmap management system designed for engineering students preparing for campus placement drives, technical interviews, and off-campus opportunities.

Developed by **Malathi Durai** ([@malathidurai06](https://github.com/malathidurai06)).

---

## 🏗️ System Architecture

Career360 uses a high-performance, developer-friendly **Hybrid Persistence Architecture**:
- **Instant Persistent Local Layer (NeDB)**: Embedded file-backed NoSQL document store (`data/career360.db`). Runs immediately upon cloning with **zero database installation required**.
- **Cloud Synchronization Layer (Google Firebase Firestore)**: Syncs student roadmaps across devices using a standard Firebase Web API Key & Project ID.
- **Offline Resilience Layer**: In-browser `localStorage` cache ensuring instant initial renders and full offline functionality.
- **GitHub-Ready & Secure**: No credentials or connection strings are ever leaked to git. All sensitive keys remain in `.env` (gitignored).

```mermaid
graph TD
    Client["Browser Client (Vanilla JS + CSS3 + Chart.js + Firebase SDK)"]
    ExpressAPI["Express.js Server (Port 5000)"]
    NeDB[("Local Persistent NeDB File DB (data/career360.db)")]
    Firestore[("Google Cloud Firestore (API Key Sync)")]
    LocalCache[("Browser localStorage Cache")]

    Client <-->|"Instant UI Reads & Offline Fallback"| LocalCache
    Client <-->|"REST API Requests (/api/data, /api/tasks)"| ExpressAPI
    ExpressAPI <-->|"Persistent Disk Storage"| NeDB
    Client -.->|"Real-Time Cloud Sync (API Key)"| Firestore
```

---

## 🌟 Key Features

### 1. 📊 Real-Time Readiness Dashboard
- **SVG Semi-Circular Readiness Gauge**: Computes your placement readiness score based on task completion across all tracks.
- **Subway Route Map**: Interactive graphical route connecting all 8 core preparation tracks.
- **Smart Preparation Advisor**: Detects lagging categories, highlights pending high-priority topics, and recommends next actions.
- **Daily Check-in & Streak Counter**: Encourages daily preparation with active flame indicators and 30-day consistency analytics.

### 2. 🗺️ Placement Roadmap & Task Manager
- Categorized across **8 core tracks**:
  1. *Aptitude & Logical Reasoning*
  2. *Data Structures & Algorithms (DSA)*
  3. *Programming Languages (C++, Java, Python, JavaScript)*
  4. *Core CS (DBMS, OS, Computer Networks, SQL)*
  5. *Projects & Portfolio*
  6. *Communication & HR Preparation*
  7. *Resume & ATS Optimization*
  8. *Company-Specific Placement Prep*
- Full CRUD task operations with live search, track filtering, priority tags (High, Medium, Low), and status toggling (Pending, In Progress, Done).
- One-click **"Load Starter Roadmap"** with 20+ curated foundational placement topics.

### 3. 🧠 Comprehensive Practice Arena
- **Timed Practice Quizzes**: 5-question multi-topic quizzes with immediate answer feedback and in-depth explanations.
- **3D Revision Flashcards**: Interactive 3D flip cards covering DSA complexities, Core CS definitions, and OOP principles.
- **Mock Interview Simulator**: Built-in 3-minute pitch countdown timer with STAR method prompts and response logger.
- **Test History Log**: Automatically records quiz attempts, scores, and dates.

### 4. 📄 In-Browser ATS Resume Evaluator
- Analyzes pasted resume text against industry keywords for SDE, Data Analyst, and Full-Stack roles.
- Scans for essential engineering keywords, strong action verbs, quantifiable achievements, and section formatting.
- Computes an instant ATS Match Score (0–100) with actionable keyword suggestions.

### 5. 💼 Placement Drives & Company Tracker
- Track campus and off-campus recruitment drives (Google, Amazon, TCS, Infosys, Zoho, etc.).
- Log CTC packages, drive dates, round notes, and hiring stages (*Wishlist*, *Applied*, *Online Assessment*, *Technical Round 1 & 2*, *HR Round*, *Offer Received*, *Rejected*).

### 6. 📈 Visual Analytics & Placement Dossier
- **Chart.js Visualizations**: Weekly task velocity, category completion %, and 14-day momentum trend.
- **Printable Placement Dossier**: Generate a clean, print-ready PDF/paper placement readiness summary for mentors and placement cells.
- **JSON Data Backup & Restore**: Download full data backups or import existing progress files.

### 7. 🎨 Multi-Theme & Unique Dynamic Background System
Customize the visual experience on the fly with instant persistence:
- **6 Premium Color Themes**:
  - 🌌 **Midnight Aurora** (Default) — Deep indigo/violet with glowing amethyst accents
  - ⚡ **Cyber Obsidian** — Pitch-black dark mode with high-contrast neon emerald & cyan
  - 🌊 **Oceanic Sapphire** — Deep abyssal navy with bioluminescent azure & cyan
  - 🌆 **Tokyo Sunset** — Midnight violet with electric fuchsia, magenta & sunset amber
  - ❄️ **Nordic Frost** — Calming arctic slate with cool ice-blue highlights
  - ☀️ **Light Studio** — Crisp pearl white with clean indigo accents and frosted glass
- **4 Unique Background Styles**:
  - 📐 **Matrix Grid** — High-tech engineering dot-matrix and blueprint grid with soft radial vignette
  - 🌟 **Ambient Aurora** — Floating, breathing multi-orbital ambient aurora light beams
  - 🌌 **Cosmic Stars** — Deep-space starfield with subtle starlight constellation gradients
  - 💎 **Clean Minimal** — Distraction-free pure focused background with soft blurred vignette

---

## 🗄️ Database & Cloud Sync Configuration

### Zero-Setup Default:
Career360 automatically starts with an embedded file database (`data/career360.db`). You do not need to install MongoDB, MySQL, or any other software.

### Optional Cloud Sync with Firebase Firestore (API Key):
1. Create a free project on [Firebase Console](https://console.firebase.google.com/).
2. Enable **Cloud Firestore** in test mode.
3. In Project Settings > Web App, copy your **Web API Key** and **Project ID**.
4. Open the Career360 web portal, click the **Database Status Pill** in the top navigation, paste your keys, and click **Connect Cloud Firestore**.
5. Your roadmap data will now automatically sync across devices in real time.

---

## 🚀 Getting Started & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/malathidurai06/Career360-PlacementRoadMap.git
cd Career360-PlacementRoadMap
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Application
```bash
npm start
```
For development with auto-reloading:
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5000
```

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/status` | Check database health, persistent file status, and Firebase sync configuration |
| `GET` | `/api/data` | Fetch current student roadmap document from database |
| `POST` | `/api/data` | Save/Sync entire user data document to persistent database |
| `POST` | `/api/tasks` | Add or update a specific task |
| `DELETE` | `/api/tasks/:id` | Remove a task |
| `POST` | `/api/profile` | Update student profile information |
| `POST` | `/api/companies` | Add or update a company drive |
| `DELETE` | `/api/companies/:id` | Delete a company drive entry |
| `POST` | `/api/firebase-config` | Update and save Firebase API Key configuration securely to `.env` |

---

## 📂 Project Directory Structure

```
├── data/
│   └── career360.db        # Embedded persistent JSON/document database
├── .env.example            # Environment variables template (Firebase API Key guide)
├── .env                    # Active local environment variables (gitignored)
├── index.html              # Core single-page application structure + Firebase SDK
├── package.json            # Node.js dependencies (Express, NeDB, CORS, Dotenv)
├── README.md               # Project documentation
├── script.js               # Frontend application logic, Firebase sync & SPA router
├── server.js               # Express REST API backend with embedded NeDB & Firebase config
└── style.css               # Design system, glassmorphism tokens, and themes
```

---

## 👤 Author

**Malathi Durai**
- GitHub: [@malathidurai06](https://github.com/malathidurai06)
- Repository: [Career360-PlacementRoadMap](https://github.com/malathidurai06/Career360-PlacementRoadMap)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
