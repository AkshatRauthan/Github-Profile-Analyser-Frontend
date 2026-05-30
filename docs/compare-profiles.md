# Compare Profiles

Side-by-side comparison of up to **4 analyzed profiles**.

**Route:** `/compare`  
**Component:** `ComparePage.tsx`

---

## User flow

1. Page loads up to **50 profiles** from `GET /profiles?page=1&limit=50`
2. User selects 2–4 profiles via checkbox cards
3. Clicks **Compare selected** → fetches rankings for each via `getProfileRankings()`
4. Comparison table renders metrics and persona matrix

---

## Compared metrics

| Metric | Source field |
|--------|--------------|
| Total stars | `profile.totalStars` |
| Public repos | `profile.publicRepos` |
| Followers | `profile.followers` |
| Best persona score | `profile.bestPersonaScore` |

Highest value per row is highlighted.

---

## Persona matrix

When rankings load successfully, a grid shows each profile's **overall score per persona** (all 6). Profiles without rankings show empty cells.

---

## Limits

- Maximum **4** profiles selected at once (`MAX_COMPARE = 4`)
- Minimum **2** required to run comparison
- Only profiles already in your workspace appear in the picker

---

## Related

- [Profile Detail Report](profile-detail-report.md)
- [Leaderboard](leaderboard.md)
