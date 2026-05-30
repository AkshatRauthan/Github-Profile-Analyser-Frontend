# Routing & Navigation

Client-side routing via **React Router v7** (`BrowserRouter`). Route definitions live in `src/App.tsx`.

---

## Route map

| Route | Access | Component | Description |
|-------|--------|-----------|-------------|
| `/` | Public | `HomePage` | Marketing landing — always public |
| `/login` | Public* | `LoginPage` | Email/password + Google |
| `/register` | Public* | `RegisterPage` | Create account |
| `/auth/callback` | Public | `AuthCallbackPage` | Google OAuth return handler |
| `/dashboard` | Protected | `DashboardPage` | Workspace overview |
| `/analyze` | Protected | `AnalyzePage` | Analyze new GitHub username |
| `/profiles` | Protected | `ProfilesPage` | Paginated profile list |
| `/profiles/:username` | Protected | `ProfileDetailPage` | Full report view |
| `/search` | Protected | `SearchPage` | Advanced filters |
| `/compare` | Protected | `ComparePage` | Side-by-side comparison |
| `/leaderboard` | Protected | `LeaderboardPage` | Persona leaderboard |
| `/activity` | Protected | `ActivityPage` | Analyze request audit log |
| `*` | — | Redirect → `/` | Unknown paths |

\*Redirects to `/dashboard` if already authenticated.

---

## Layout structure

```
BrowserRouter
├── Public routes (no sidebar)
│   ├── HomePage
│   ├── LoginPage / RegisterPage
│   └── AuthCallbackPage
└── ProtectedRoute
    └── AppLayout (sidebar + main)
        ├── DashboardPage
        ├── AnalyzePage
        ├── ProfilesPage
        ├── ProfileDetailPage
        ├── SearchPage
        ├── ComparePage
        ├── LeaderboardPage
        └── ActivityPage
```

`AppLayout` renders a fixed **sidebar** (`Sidebar.tsx`) and an `<Outlet />` for page content. Report-heavy pages add the `app-reports` class for larger typography.

---

## Sidebar navigation

| Label | Path | Icon |
|-------|------|------|
| Dashboard | `/dashboard` | LayoutDashboard |
| Analyze | `/analyze` | UserPlus |
| Profiles | `/profiles` | Users |
| Search | `/search` | Search |
| Compare | `/compare` | GitCompare |
| Leaderboard | `/leaderboard` | Trophy |
| Activity | `/activity` | Activity |

Active route uses a Framer Motion `layoutId` highlight. Footer shows username, email, theme toggle, and sign out.

---

## Deep linking

- Profile cards link to `/profiles/{githubUsername}`
- After analyze, user is typically navigated to the new profile detail page
- Compare page does not use URL state for selected profiles (selection is in-memory)

---

## Related

- [Authentication](authentication.md)
- [Landing Page](landing-page.md)
