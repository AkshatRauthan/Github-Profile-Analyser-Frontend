# Analyze Profiles

Submit a GitHub username to fetch and store profile insights.

**Route:** `/analyze`  
**Component:** `AnalyzePage.tsx`

---

## User flow

1. User enters a GitHub username (e.g. `octocat`)
2. Clicks **Analyze profile**
3. Frontend calls `POST /api/v1/profiles/analyze/:username`
4. On success → navigates to `/profiles/{username}`

---

## What gets stored

The backend persists profile metadata from GitHub:

- Name, bio, location, company, avatar
- Followers, following, public repo count
- Total stars and top 5 languages (from fetched repos)
- Account creation date, `lastAnalyzedAt`

When the backend has a `GITHUB_TOKEN` with `repo` scope, **private repos the token can access** are included in star/language totals.

---

## Error handling

Common errors surfaced via `getErrorMessage()`:

| Error | Cause |
|-------|-------|
| GitHub user not found | Invalid username |
| Rate limit exceeded | Missing or exhausted `GITHUB_TOKEN` on backend |
| Unauthorized | Session expired — redirect to login |

Failed attempts appear in the [Activity Log](activity-log.md).

---

## Re-analyze

From **Profile Detail**, users can re-run analysis to refresh stored data. Same upsert behavior on the backend — updates existing record.

---

## Related

- [Profile Detail Report](profile-detail-report.md)
- [Backend profile analysis](../../backend/docs/profile-analysis.md)
