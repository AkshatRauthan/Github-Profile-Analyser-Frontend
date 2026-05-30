# API Integration

All HTTP calls go through a shared **Axios** instance in `src/api/client.ts`. Endpoint functions are split into `auth.ts` and `profiles.ts`.

---

## Base client

```typescript
// src/api/client.ts
baseURL: `${VITE_API_URL}/api/v1`
```

### Request interceptor

Attaches `Authorization: Bearer <accessToken>` from `useAuthStore`.

### Response interceptor

On `401` → logout + redirect to `/login`.

### Error helper

```typescript
getErrorMessage(error) // reads response.data.message or falls back
```

---

## Auth API (`src/api/auth.ts`)

| Function | Method | Path |
|----------|--------|------|
| `register(email, password, username)` | POST | `/auth/register` |
| `login(email, password)` | POST | `/auth/login` |
| `getAuthProfile()` | GET | `/auth/profile` |

---

## Profiles API (`src/api/profiles.ts`)

| Function | Method | Path |
|----------|--------|------|
| `analyzeProfile(username)` | POST | `/profiles/analyze/:username` |
| `getProfiles(page, limit)` | GET | `/profiles` |
| `getProfile(username)` | GET | `/profiles/:username` |
| `getAnalysisRequests(page, limit)` | GET | `/profiles/requests` |
| `searchProfiles(params)` | GET | `/profiles/search` |
| `getHeatmap(username, period)` | GET | `/profiles/:username/heatmap` |
| `getRepoComposition(username)` | GET | `/profiles/:username/composition` |
| `getPersonas()` | GET | `/profiles/personas` |
| `rankProfile(username)` | POST | `/profiles/rank/:username` |
| `getProfileRankings(username)` | GET | `/profiles/:username/rankings` |
| `getLeaderboard(persona, page, limit, minScore?)` | GET | `/profiles/rankings/leaderboard` |

---

## Response shape

Backend returns:

```json
{
  "success": true,
  "message": "...",
  "data": { }
}
```

Axios functions return `data.data` (the inner payload).

---

## TypeScript types

Shared interfaces in `src/types/index.ts`:

| Type | Used for |
|------|----------|
| `GitHubProfile` | Stored profile records |
| `ContributionHeatmap` | Heatmap + optional private fields |
| `RepoComposition` | Composition breakdown |
| `PersonaRanking` | Scores and metric breakdown |
| `LeaderboardResult` | Leaderboard table |
| `SearchResult` | Filtered profile list |

---

## Live vs stored data

| UI feature | Stored in DB | Live from GitHub |
|------------|--------------|------------------|
| Profile header, languages | Yes (analyze) | Re-fetched on analyze |
| Persona rankings | Yes (rank) | Re-computed on rank |
| Heatmap | No | Every page load |
| Repo composition | No | Every page load |

---

## Private data fields

When backend `GITHUB_TOKEN` has access, responses may include:

| Field | UI surface |
|-------|------------|
| `includesPrivateContributions` | Heatmap subtitle on profile detail |
| `privateContributions` | Count shown in subtitle |
| `includesPrivateRepos` | Badge on repository breakdown |
| `privateRepoCount` | Badge label |

See [backend private GitHub data](../../backend/docs/private-github-data.md).

---

## Related

- [Backend API reference](../../backend/docs/api-reference.md)
- [Profile Detail Report](profile-detail-report.md)
