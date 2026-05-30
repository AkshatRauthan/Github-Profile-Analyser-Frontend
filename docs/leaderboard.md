# Leaderboard

View top-ranked profiles for a specific engineering persona.

**Route:** `/leaderboard`  
**Component:** `LeaderboardPage.tsx`

---

## Controls

| Control | API param |
|---------|-----------|
| Persona selector | `persona` (required) |
| Min score filter | `minScore` (optional) |
| Pagination | `page`, `limit` |

Personas loaded from `GET /profiles/personas`.

---

## Table columns

| Column | Description |
|--------|-------------|
| Rank | Position in leaderboard |
| Profile | Avatar, username, name — links to `/profiles/:username` |
| Score | Overall persona score / 100 |
| Grade | Excellent / Strong / Good / Moderate / Developing |

Only profiles **you** have analyzed and ranked appear.

---

## API

```typescript
getLeaderboard(persona, page, limit, minScore?)
// → GET /api/v1/profiles/rankings/leaderboard
```

---

## Related

- [Backend persona ranking](../../backend/docs/persona-ranking.md)
- [Search & Filtering](search-and-filtering.md) — filter by persona score
