# Profile Detail Report

The primary reporting view for a single analyzed GitHub user.

**Route:** `/profiles/:username`  
**Component:** `ProfileDetailPage.tsx`

---

## Layout (top to bottom)

```
┌─────────────────────────────────────────────────┐
│  Back link · Avatar · Name · Bio · Meta stats   │
│  [Rank profile] [View on GitHub]                │
├─────────────────────────────────────────────────┤
│  Language badges (topLanguages)                 │
├─────────────────────────────────────────────────┤
│  CONTRIBUTIONS                                  │
│  Week | Month | Year toggle                     │
│  Total count (+ private note if applicable)     │
│  HeatmapChart (GitHub-style calendar)           │
├──────────────────────┬──────────────────────────┤
│  REPOSITORY BREAKDOWN│  PERSONA RANKINGS        │
│  RepoCompositionChart│  ScoreRing               │
│  (donut + tabs)      │  Persona tabs            │
│  [N private badge]   │  RankingBreakdown table  │
└──────────────────────┴──────────────────────────┘
```

---

## Data loading

Four parallel/sequential API calls on mount:

| Data | API | Refresh trigger |
|------|-----|-----------------|
| Profile | `getProfile(username)` | Page load |
| Rankings | `getProfileRankings(username)` | Load + after rank |
| Heatmap | `getHeatmap(username, period)` | Period toggle |
| Composition | `getRepoComposition(username)` | Load + after re-analyze |

Rankings gracefully degrade to empty if profile has not been ranked yet.

---

## Actions

### Rank profile

Calls `POST /profiles/rank/:username`. Button shows loading state while ranking runs (can take 10–30s due to GitHub API calls).

Updates:

- All 6 persona scores
- `bestPersona` / `bestPersonaScore` on profile header
- Score ring and breakdown for selected persona

### Heatmap period toggle

| Button | Period value |
|--------|--------------|
| Week | `currWeek` |
| Month | `currMonth` |
| Year | `currYear` (default) |

### Persona selector

Tabs or buttons switch `selectedPersona` to view each persona's `RankingBreakdown`.

---

## Private data indicators

When backend token has access:

- **Heatmap:** `(includes N private)` next to contribution total
- **Composition:** violet **N private** badge in section header

---

## Components used

| Component | Role |
|-----------|------|
| `HeatmapChart` | 15px cells, ~168px height, GitHub green scale |
| `RepoCompositionChart` | Recharts donut + dimension tabs |
| `ScoreRing` | Circular score / 100 |
| `RankingBreakdown` | Metric table with weights |
| `Badge` | Languages, persona, private repo count |

---

## Related

- [API Integration](api-integration.md)
- [Backend persona ranking](../../backend/docs/persona-ranking.md)
- [Backend repo composition](../../backend/docs/repo-composition.md)
- [Backend contribution heatmap](../../backend/docs/contribution-heatmap.md)
