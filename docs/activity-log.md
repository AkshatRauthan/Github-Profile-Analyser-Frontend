# Activity Log

Audit trail of every profile analyze attempt.

**Route:** `/activity`  
**Component:** `ActivityPage.tsx`

---

## Data source

```typescript
getAnalysisRequests(page, limit)
// → GET /api/v1/profiles/requests
```

---

## Each entry shows

| Field | Description |
|-------|-------------|
| `githubUsername` | Target GitHub user |
| `status` | `success` or `failed` |
| `errorMessage` | Present on failed attempts |
| `createdAt` | Timestamp |
| Link | To profile detail when `status === 'success'` |

---

## Use cases

- Debug failed analyzes (invalid username, rate limits)
- Track when profiles were first added to workspace
- Transparency for screening workflows

---

## Related

- [Analyze Profiles](analyze-profiles.md)
- [Backend profile analysis — audit log](../../backend/docs/profile-analysis.md)
