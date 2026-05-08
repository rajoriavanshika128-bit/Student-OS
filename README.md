# StudentOS X

A career dashboard for students — built with React, no UI libraries, no shortcuts.

You tell it your degree, your skills, and the role you're working toward. It stores that as your **Career DNA** and uses it to personalise everything: what skills you're missing, what missions to do today, how your GitHub activity looks, and where you stand on the path to your goal.

---

## Pages

| Route | What it does |
|---|---|
| `/` | Dashboard — greeting, XP ring, stat cards, today's mission log |
| `/skill-gap` | Shows exactly which skills your dream role needs and which you're missing |
| `/roadmap` | A structured learning path based on your target role |
| `/missions` | Daily tasks that earn XP when completed |
| `/github` | Pulls your GitHub repos, languages, and contribution activity live |
| `/profile` | Your full Career DNA card with GitHub stats and a contribution heatmap |
| `/jobs` | Job listings filtered by role, with a modal detail view |
| `/interview` | Role-specific interview questions and answers |
| `/resume` | A simple resume builder section |
| `/focus` | Pomodoro-style focus timer with session tracking |
| `/projects` | Curated project ideas sorted by your skill level |
| `/resources` | Handpicked learning resources per role |

---

## How the state works

Everything personal — your role, skills, XP, level, streak — lives in a `DNAContext` that wraps the whole app. It uses `useReducer` internally so state changes are predictable, and syncs to `localStorage` on every update so nothing is lost on refresh.

There's no backend. No database. Just React context + localStorage doing the heavy lifting.

---

## What's connected to real APIs

- **GitHub REST API** — fetches your repos, languages, follower count, and the last 100 events to build a contribution heatmap
- **Google Gemini API** — used in the Interview section to generate practice questions based on your role

Everything else is driven by the data files in `src/data/` — role-to-skills mapping, mission templates, roadmap content, project ideas, and interview Q&As.

---

## Design

Dark background (`#0a0a0f`), glassmorphism cards, red accent (`#e53935`), monospace labels, Playfair Display headings. Fully hand-written CSS — no Tailwind, no component libraries. Custom CSS properties for spacing, colour, and typography, defined once in `index.css` and used everywhere.

Animations are CSS-only. The XP ring is a raw SVG with `stroke-dashoffset`. The level-up celebration is a full-screen overlay with confetti. All of it written from scratch.

---

## Getting started

```bash
git clone https://github.com/rajoriavanshika128-bit/Student-OS.git
cd Student-OS
npm install
npm run dev
```

Open `http://localhost:5173` — onboarding runs automatically if no Career DNA is found.

---

## Project structure

```
src/
├── components/       # Sidebar, Onboarding, AnimatedCounter, XPToast, etc.
├── context/          # DNAContext — global Career DNA state
├── data/             # Role skills map, missions, roadmap, resources, projects
├── pages/            # One file per route
├── utils/            # Favourites helper
├── App.jsx           # Routes + layout shell
└── index.css         # Full design system (tokens, components, animations)
```

---

## Built by

**Vanshika Rajoria** — project lead, architecture, design system, most of the pages  
**Janvi Saraf** — Jobs page, Focus Timer, Resources  
**Himanshi Yadav** — Resume Builder, Interview section, data files

---

## React concepts used

`useReducer` · `useContext` · `useEffect` with cleanup · `useRef` · `useState` · `useNavigate` · `useParams` · controlled forms · `ErrorBoundary` class component · `AbortController` for fetch cleanup · `localStorage` persistence · dynamic routing
