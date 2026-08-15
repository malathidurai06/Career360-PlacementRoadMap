# Career 360 — Student Career Roadmap & Placement Readiness Tracking System

A browser-based placement preparation tracker built with pure HTML5, CSS3, and
vanilla JavaScript (ES6+). All data is saved locally via `localStorage` — no
server, build step, or install required.

## Folder structure
```
project/
├── index.html      Page shell — links the stylesheet and script below
├── css/
│   └── style.css    All styling (layout, components, theme)
├── js/
│   └── script.js    App logic: state, rendering, storage, charts
└── README.md
```

## Running it
Just open `index.html` in any modern browser (double-click it, or serve the
folder with any static file server). No build tools, no npm install.

Two external resources load over the network for styling and charts:
- Google Fonts (Space Grotesk, Inter, JetBrains Mono)
- Chart.js (via cdnjs) for the Analytics charts

If you need it fully offline, download those and update the `<link>`/`<script>`
tags in `index.html` to point to local copies.

## Features
- **Profile & career goals** — academic details, target role, companies, timeline
- **Roadmap & tasks** — categorized across Aptitude, DSA, Programming Languages,
  Projects, Communication, Resume, and Company-Specific Prep; full add/edit/
  complete/delete, with search and filters by category, status, and priority
- **Readiness scoring** — overall % and category % completion, mapped to
  Beginner / Intermediate / Advanced / Interview-Ready
- **Analytics** — weekly completions, 14-day readiness trend, category
  breakdown, and automatic skill-gap detection
- **Gamification** — current & longest streaks, 30-day consistency, and an
  11-badge achievement system with unlock dates
- **Resources** — curated reference videos, articles, and practice-site links
  for every category (e.g. takeUforward and GeeksforGeeks for DSA, IndiaBIX
  and PrepInsta for Aptitude, freeCodeCamp and CodeWithHarry for Programming
  Languages), so prep material and progress tracking live in one app. Edit
  the `RESOURCES` object near the top of `js/script.js` to add your own links.
- **Practice** — actual practice happens inside the app, not just links out:
  5-question auto-graded quizzes for Aptitude, DSA, Programming Languages,
  and Company-Specific Prep, plus self-practice prompts (speaking topics,
  resume checklist, project ideas) for Communication, Resume, and Projects.
  Attempts, scores, and streaks feed into Achievements. Edit `PRACTICE_QUIZ`
  and `PRACTICE_PROMPTS` in `js/script.js` to add your own questions.
- **Export** — download your data as `.json` or a readable `.txt` report

## Data storage
Everything (profile, tasks, streaks, achievements, history) is stored under a
single `localStorage` key: `placementTrackerData_v1`. Clearing your browser's
site data for this file will erase it — use the export buttons on the
Analytics page to back up your progress.
