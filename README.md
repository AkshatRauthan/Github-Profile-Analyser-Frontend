# GitHub Profile Analyser — Frontend

Modern React dashboard for the GitHub Profile Analyser API. Dark theme inspired by **Cursor**, with Framer Motion animations.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion
- React Router
- Zustand (auth persistence)
- Recharts (contribution charts)
- Axios

## Setup

```bash
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:3000

npm run dev
```

Open `http://localhost:5173`

Ensure the backend is running and `CORS_ORIGINS` includes `http://localhost:5173`.

## Pages

| Route | Description |
|-------|-------------|
| `/login` | Sign in |
| `/register` | Create account |
| `/` | Dashboard |
| `/analyze` | Analyze GitHub username |
| `/profiles` | All analyzed profiles |
| `/profiles/:username` | Detail, rankings, heatmap |
| `/search` | Advanced filters |
| `/leaderboard` | Persona leaderboard |
| `/activity` | Analyze request log |
| `/compare` | Side-by-side profile comparison |
| `/auth/callback` | Google OAuth redirect handler |

## Features

- **Google OAuth** — Continue with Google on login/register (requires backend `GOOGLE_CLIENT_*` config; callback URL must hit backend, then redirects here)
- **Light / dark theme** — Toggle in sidebar or auth pages (persisted)
- **Profile comparison** — Compare up to 4 analyzed profiles with metrics + persona matrix

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview build |
