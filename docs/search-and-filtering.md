# Search & Filtering

Filter and sort analyzed profiles in your workspace.

**Route:** `/search`  
**Component:** `SearchPage.tsx`

---

## Filters (UI)

| Field | Query param | Description |
|-------|-------------|-------------|
| Search | `q` | Keyword across username, name, bio, company, location, blog |
| Languages | `languages` | Comma-separated (e.g. `JavaScript,TypeScript`) |
| Min stars | `minStars` | Minimum total stars |
| Min repos | `minRepos` | Minimum public repo count |
| Persona | `persona` | One of 6 persona keys |
| Min persona score | `minPersonaScore` | Requires persona selected |
| Sort by | `sortBy` | Default `lastAnalyzedAt`; auto-switches to `personaScore` when persona filter active |
| Sort order | `sortOrder` | `asc` or `desc` |

Persona dropdown is populated from `GET /profiles/personas` on page load.

---

## Results

Matching profiles render as `ProfileCard` components with link to `/profiles/:username`.

Empty state when no results match filters.

---

## Backend filters not in UI

The backend supports many more filters (date ranges, `hasBio`, follower ranges, etc.) — see [backend profile search](../../backend/docs/profile-search.md). These can be added to the UI or called directly via API.

---

## Related

- [Backend profile search](../../backend/docs/profile-search.md)
- [Profiles list](routing.md) — `/profiles` paginated view without filters
