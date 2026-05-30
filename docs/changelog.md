# Changelog

Frontend-specific changes. See also [backend changelog](../../backend/docs/changelog.md) for API changes.

---

## 2026-05-30 — Full dashboard & reporting UI

### Pages & routing

| Change | Details |
|--------|---------|
| **Home page** | Public landing at `/` with hero, features, `HeroPreview` |
| **Dashboard** | Moved to `/dashboard` (no auto-redirect from `/` when logged in) |
| **Profile detail** | Heatmap + composition + rankings layout |
| **Compare** | Up to 4 profiles, metrics + persona matrix |
| **Activity** | Analyze request audit log |

### Components

| Component | Purpose |
|-----------|---------|
| `HeatmapChart` | GitHub-style contribution calendar |
| `RepoCompositionChart` | Donut chart with 4 dimension tabs |
| `RankingBreakdown` | Persona metric breakdown table |
| `ProfileCard` | Reusable list card |
| `GoogleAuthButton` | OAuth redirect |
| `ThemeToggle` | Light/dark mode |

### UX

- Private repo badge on composition when `includesPrivateRepos`
- Private contribution count on heatmap when `includesPrivateContributions`
- Framer Motion page transitions and sidebar active indicator
- `.app-reports` typography scale on authenticated layout
- 401 interceptor → auto logout and redirect to login

### Stack

- React 19, Vite, Tailwind v4, Zustand, Recharts, Axios, React Router, Framer Motion

---

## Related

- [Setup & Installation](setup-and-installation.md)
- [Components Reference](components-reference.md)
