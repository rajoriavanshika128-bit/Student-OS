# StudentOS X

> A dark-themed, glassmorphism-styled React SPA that functions as a **personal career operating system** for students — not a planner, not a to-do app, but a living dashboard that reconfigures itself around whoever is using it.


---

## What It Does

On first launch, a cinematic onboarding flow asks three questions — your degree, your current skills, and your dream role — and generates a **Career DNA Profile** that drives every feature in the app.

| Feature | Description |
|---|---|
| 🧬 **Career DNA Profile** | Glowing identity card generated from onboarding; persists across all sessions |
| 📊 **Skill Gap Engine** | Compares your skills against a JSON career map; renders animated progress bars |
| 🗺️ **Roadmap Engine** | Dynamic routes (`/roadmap/frontend`) + live GitHub API data per skill node |
| ⚡ **XP & Missions** | `useReducer`-powered gamification with a full-screen level-up animation |
| ⏱️ **Focus Zone** | Pomodoro timer via `useEffect` cleanup, session log, localStorage streak counter |
| 🏠 **Smart Dashboard** | `StatCard`, `XPBar`, `TrendingRepos` — all prop-driven, all reusable |

---

## Tech Stack

**React 18** · **React Router v6** · **GitHub REST API** · **Vanilla CSS (Custom Properties)** · **localStorage**

State lives in a single `studentOS_state` key via a custom `useLocalStorage` hook. `StudentContext` wraps the router — no prop drilling. UI built from scratch with `backdrop-filter: blur` glassmorphism — zero Tailwind, zero UI libraries.

---

## Quick Start

```bash
git clone https://github.com/your-username/Student-OS.git
cd Student-OS
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — the onboarding flow runs automatically on first launch.

---

## React Concepts Showcased

`useReducer` · `useEffect` with cleanups · `useContext` · custom hooks · dynamic `useParams` · controlled forms · localStorage persistence · prop-driven composition · live API with loading/error states

---

