# GitHub Profile Analyser — Frontend

A React dashboard that turns the [GitHub Profile Analyser API](../backend/README.md) into a recruiter-friendly workspace — analyze developers, view reports, rank by persona, and compare candidates side by side.

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **Zustand**, and **Recharts**.

---

## The problem

The backend API delivers structured GitHub insights, but recruiters need a **visual workspace** — not raw JSON in Postman:

- No single screen to see **activity, repo mix, and persona scores** together
- Hard to **compare multiple candidates** without opening many tabs
- Screening workflows need **search, leaderboards, and audit logs** in one place
- Teams expect **sign-in, dark mode, and OAuth** — not curl commands

**Problem statement:**  
*How can we present GitHub screening data in a fast, readable UI that mirrors how hiring teams actually work?*

---

## What we are building

**GitHub Profile Analyser Frontend** is a single-page app that:

1. Authenticates users and attaches JWTs to every API call
2. Lets recruiters **analyze** GitHub usernames and browse saved profiles
3. Shows a **full profile report** — heatmap, repo composition, persona rankings
4. Supports **search, leaderboards, comparison, and activity logs**
5. Provides a **public landing page** for discovery and sign-up

All data comes from your private backend workspace — each user only sees profiles they analyzed.

---

## Why we built it this way

| Decision | Reason |
|----------|--------|
| **Vite + React 19** | Fast dev experience, modern concurrent features |
| **Zustand + persist** | Simple auth/theme state without boilerplate |
| **Tailwind v4 + CSS variables** | Cursor-inspired theming with light/dark toggle |
| **Live heatmap & composition** | Always fresh from GitHub — not stored in DB |
| **Separate `/` and `/dashboard`** | Marketing page stays public; app lives behind auth |
| **Axios interceptors** | Centralized token attachment and 401 handling |

---

## Features

### 1. Authentication

Sign in to access the screening workspace.

| Sub-feature | What it does |
|-------------|----------------|
| **Register** | Email, password, username → JWT stored locally |
| **Login** | Same flow; redirect to dashboard |
| **Google OAuth** | Redirect to backend → `/auth/callback` with tokens |
| **Protected routes** | All app pages require valid `accessToken` |
| **Auto logout** | 401 responses clear session → `/login` |
| **Persisted session** | Survives refresh via `localStorage` (`gpa-auth`) |

📄 [Full docs → docs/authentication.md](docs/authentication.md)

---

### 2. Landing page

Public home for guests and returning users.

| Sub-feature | What it does |
|-------------|----------------|
| **Hero + CTAs** | Register, login, or open dashboard |
| **Feature overview** | Six capability cards |
| **HeroPreview** | Mock report UI without API calls |
| **Theme toggle** | Light/dark on public pages |

📄 [Full docs → docs/landing-page.md](docs/landing-page.md)

---

### 3. Dashboard & analyze

Entry points for daily screening work.

| Sub-feature | What it does |
|-------------|----------------|
| **Dashboard** | Stats (profiles, stars, ranked count) + recent profiles |
| **Analyze** | Submit GitHub username → navigate to report |
| **Profiles list** | Paginated grid of all analyzed users |

📄 [Analyze → docs/analyze-profiles.md](docs/analyze-profiles.md) · [Routing → docs/routing.md](docs/routing.md)

---

### 4. Profile detail report

The core reporting view.

| Sub-feature | What it does |
|-------------|----------------|
| **Profile header** | Avatar, bio, stars, followers, best persona |
| **Language badges** | Top languages from stored analysis |
| **Contribution heatmap** | Week / month / year; GitHub-style calendar |
| **Repository breakdown** | Donut chart — languages, tech, frameworks, repo types |
| **Persona rankings** | Score ring + 8-metric breakdown per persona |
| **Rank profile** | Triggers backend deep analysis |
| **Private data badges** | Shows private repo/contribution counts when API includes them |

📄 [Full docs → docs/profile-detail-report.md](docs/profile-detail-report.md)

---

### 5. Search & filtering

Find candidates in your workspace.

| Sub-feature | What it does |
|-------------|----------------|
| **Keyword search** | Match name, bio, company, location, etc. |
| **Language filter** | Comma-separated languages |
| **Numeric filters** | Min stars, min repos |
| **Persona score** | Filter by persona + minimum score |
| **Sort** | By date or persona score |

📄 [Full docs → docs/search-and-filtering.md](docs/search-and-filtering.md)

---

### 6. Compare profiles

Side-by-side evaluation.

| Sub-feature | What it does |
|-------------|----------------|
| **Select up to 4** | From analyzed profiles |
| **Metric comparison** | Stars, repos, followers, best score |
| **Persona matrix** | All 6 persona scores per candidate |
| **Highlight winners** | Highest value per metric row |

📄 [Full docs → docs/compare-profiles.md](docs/compare-profiles.md)

---

### 7. Leaderboard & activity

| Sub-feature | What it does |
|-------------|----------------|
| **Leaderboard** | Top profiles per persona with min score filter |
| **Activity log** | Success/failed analyze attempts with timestamps |

📄 [Leaderboard → docs/leaderboard.md](docs/leaderboard.md) · [Activity → docs/activity-log.md](docs/activity-log.md)

---

### 8. Theming & components

| Sub-feature | What it does |
|-------------|----------------|
| **Dark / light mode** | Persisted preference (`gpa-theme`) |
| **Design tokens** | Cursor-style violet accent, glass surfaces |
| **Framer Motion** | Page transitions, sidebar indicator |
| **Recharts** | Composition donut charts |

📄 [Theming → docs/theming-and-ui.md](docs/theming-and-ui.md) · [Components → docs/components-reference.md](docs/components-reference.md)

---

## How it fits together

```
Register / Login  →  Dashboard  →  Analyze username
                                        │
                    ┌───────────────────┼───────────────────┐
                    ▼                   ▼                   ▼
            Profile report          Search            Compare (≤4)
         heatmap · composition    · leaderboard      · persona matrix
         · persona rankings      · activity log
```

**Example flow**

1. Register at `/register`
2. Analyze `octocat` at `/analyze`
3. View report at `/profiles/octocat` → click **Rank profile**
4. Search frontend candidates at `/search?persona=frontend_developer`
5. Compare top picks at `/compare`

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Language | TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router |
| State | Zustand (persist) |
| HTTP | Axios |
| Charts | Recharts |
| Animation | Framer Motion |
| Icons | Lucide React |

---

## Quick start

```bash
cp .env.example .env
# VITE_API_URL=http://localhost:3000

npm install
npm run dev
```

- App: `http://localhost:5173`
- Backend must be running — see [backend setup](../backend/docs/setup-and-installation.md)

More detail: [docs/setup-and-installation.md](docs/setup-and-installation.md)

---

## Project structure

```
frontend/
├── docs/                 # Feature documentation (this folder)
├── src/
│   ├── api/              # Axios client, auth + profile endpoints
│   ├── components/       # UI, charts, layout
│   ├── pages/            # Route pages
│   ├── store/            # Zustand (auth, theme)
│   ├── types/            # TypeScript interfaces
│   ├── lib/              # Utilities
│   ├── App.tsx           # Router
│   └── index.css         # Theme tokens + Tailwind
├── .env.example
└── README.md
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [Setup & installation](docs/setup-and-installation.md) | Env, CORS, OAuth, troubleshooting |
| [Authentication](docs/authentication.md) | Login, register, Google, session |
| [Routing & navigation](docs/routing.md) | All routes and sidebar |
| [API integration](docs/api-integration.md) | Axios, endpoints, types |
| [Profile detail report](docs/profile-detail-report.md) | Main report page |
| [Analyze profiles](docs/analyze-profiles.md) | Analyze flow |
| [Search & filtering](docs/search-and-filtering.md) | Search page |
| [Compare profiles](docs/compare-profiles.md) | Comparison tool |
| [Leaderboard](docs/leaderboard.md) | Persona leaderboard |
| [Activity log](docs/activity-log.md) | Audit log |
| [Landing page](docs/landing-page.md) | Public home |
| [Theming & UI](docs/theming-and-ui.md) | Design system |
| [Components reference](docs/components-reference.md) | Component catalog |
| [Changelog](docs/changelog.md) | Recent changes |

Index: [docs/README.md](docs/README.md)

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Backend base URL (e.g. `http://localhost:3000`) |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (`:5173`) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

---

## Backend & API

| Resource | Link |
|----------|------|
| Backend README | [../backend/README.md](../backend/README.md) |
| API reference | [../backend/docs/api-reference.md](../backend/docs/api-reference.md) |
| Postman collection | [../backend/postman/README.md](../backend/postman/README.md) |
| Private GitHub data | [../backend/docs/private-github-data.md](../backend/docs/private-github-data.md) |

---

## Author

**Akshat Rauthan**
