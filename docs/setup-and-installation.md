# Setup & Installation

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18 or higher |
| npm | 9+ |
| Backend API | Running at `VITE_API_URL` (see [backend setup](../../backend/docs/setup-and-installation.md)) |

## Clone & install

```bash
cd "GitHub Profile Analyser/frontend"
npm install
```

## Environment configuration

```bash
cp .env.example .env
```

### Required variables

```env
VITE_API_URL=http://localhost:3000
```

`VITE_API_URL` must point to the **backend base URL** (no `/api/v1` suffix — the client adds that automatically).

### Backend CORS

Ensure the backend `.env` includes the frontend origin:

```env
CORS_ORIGINS=http://localhost:5173
FRONTEND_URL=http://localhost:5173
```

## Running the dev server

```bash
npm run dev
```

Open `http://localhost:5173`

## Production build

```bash
npm run build
npm run preview   # optional: preview dist locally
```

Output is written to `dist/`. Serve as static files behind any CDN or static host; configure your host to fallback to `index.html` for client-side routing.

### Vercel

This repo includes `vercel.json` so routes like `/auth/callback` (Google OAuth) rewrite to `index.html` instead of returning 404.

In the Vercel project:

1. **Root directory:** `frontend` (if deploying from monorepo)
2. **Environment variable:** `VITE_API_URL` = your backend URL (HF Space or other)
3. **Backend `FRONTEND_URL`:** set to your Vercel URL, e.g. `https://github-profile-analyser-eight.vercel.app`
4. **Backend `CORS_ORIGINS`:** include the Vercel URL
5. **Google OAuth console:** authorized redirect URI = backend callback (`https://your-api.../api/v1/auth/google/callback`)

Redeploy after adding `vercel.json` if OAuth callback was 404 before.

## Google OAuth (optional)

Requires backend Google credentials. Flow:

1. User clicks **Continue with Google** on login/register
2. Browser redirects to `{VITE_API_URL}/api/v1/auth/google`
3. Backend handles OAuth and redirects to `{FRONTEND_URL}/auth/callback?accessToken=...&refreshToken=...`
4. `AuthCallbackPage` stores tokens and navigates to `/dashboard`

Backend must set `GOOGLE_CALLBACK_URL` and `FRONTEND_URL` correctly.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| API calls fail / CORS errors | Check `VITE_API_URL` and backend `CORS_ORIGINS` |
| Redirected to login immediately | Token expired or invalid — log in again |
| Google sign-in fails | Verify backend `GOOGLE_CLIENT_*` and callback URL |
| Blank page after deploy | Configure SPA fallback to `index.html` (included: `vercel.json` on Vercel) |
| OAuth callback 404 on Vercel | Redeploy with `vercel.json`; set backend `FRONTEND_URL` to Vercel domain |
| Heatmap/composition empty | Backend may be down or GitHub rate limited — check network tab |

## Related

- [Authentication](authentication.md)
- [API Integration](api-integration.md)
- [Backend setup](../../backend/docs/setup-and-installation.md)
