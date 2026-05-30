# Components Reference

Catalog of reusable components in `src/components/`.

---

## Layout

| Component | File | Description |
|-----------|------|-------------|
| `AppLayout` | `layout/AppLayout.tsx` | Sidebar + `<Outlet />`, adds `app-reports` class |
| `Sidebar` | `layout/Sidebar.tsx` | Nav links, user info, theme toggle, logout |
| `ProtectedRoute` | `ProtectedRoute.tsx` | Auth guard → redirect `/login` |

---

## Branding

| Component | File | Description |
|-----------|------|-------------|
| `AppLogo` | `AppLogo.tsx` | SVG logo; `size`: sm, md, lg |
| `HeroPreview` | `HeroPreview.tsx` | Static mock report for landing page |

---

## Auth

| Component | File | Description |
|-----------|------|-------------|
| `GoogleAuthButton` | `GoogleAuthButton.tsx` | Redirects to backend Google OAuth |
| `ThemeToggle` | `ThemeToggle.tsx` | Light/dark switch; optional `showLabel` |

---

## Data visualization

| Component | File | Description |
|-----------|------|-------------|
| `HeatmapChart` | `HeatmapChart.tsx` | Props: `data: ContributionHeatmap` |
| `RepoCompositionChart` | `RepoCompositionChart.tsx` | Props: `data: RepoComposition`; tabs for 4 dimensions |
| `ScoreRing` | `ui/ScoreRing.tsx` | Circular progress for persona score |
| `RankingBreakdown` | `RankingBreakdown.tsx` | Props: `ranking: PersonaRanking` — metric table |

---

## Profile display

| Component | File | Description |
|-----------|------|-------------|
| `ProfileCard` | `ProfileCard.tsx` | Summary card for list/search; links to detail |

---

## Utilities

| Module | File | Exports |
|--------|------|---------|
| `cn` | `lib/utils.ts` | Tailwind class merge |
| `formatNumber` | `lib/utils.ts` | Compact number formatting |
| `personaLabel` | `lib/utils.ts` | Human-readable persona name |
| `scoreColor` | `lib/utils.ts` | Color class by score tier |

---

## Pages

| Page | File |
|------|------|
| Home | `pages/HomePage.tsx` |
| Login | `pages/LoginPage.tsx` |
| Register | `pages/RegisterPage.tsx` |
| Auth callback | `pages/AuthCallbackPage.tsx` |
| Dashboard | `pages/DashboardPage.tsx` |
| Analyze | `pages/AnalyzePage.tsx` |
| Profiles list | `pages/ProfilesPage.tsx` |
| Profile detail | `pages/ProfileDetailPage.tsx` |
| Search | `pages/SearchPage.tsx` |
| Compare | `pages/ComparePage.tsx` |
| Leaderboard | `pages/LeaderboardPage.tsx` |
| Activity | `pages/ActivityPage.tsx` |

---

## State stores

| Store | File | Persists |
|-------|------|----------|
| `useAuthStore` | `store/authStore.ts` | `gpa-auth` |
| `useThemeStore` | `store/themeStore.ts` | `gpa-theme` |

---

## Related

- [Theming & UI System](theming-and-ui.md)
- [API Integration](api-integration.md)
