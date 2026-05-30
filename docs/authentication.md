# Authentication

The frontend uses **JWT bearer tokens** stored in Zustand with `localStorage` persistence. All profile, ranking, and search features require a logged-in session.

---

## Sign up & sign in

### Email / password

| Page | Route | API |
|------|-------|-----|
| Register | `/register` | `POST /api/v1/auth/register` |
| Login | `/login` | `POST /api/v1/auth/login` |

On success, `useAuthStore.setAuth()` saves:

- `accessToken`
- `refreshToken`
- `user` (`id`, `email`, `username`, `authMethods`)

User is redirected to `/dashboard`.

### Google OAuth

| Step | What happens |
|------|----------------|
| 1 | User clicks **Continue with Google** (`GoogleAuthButton`) |
| 2 | Full-page redirect to `{VITE_API_URL}/api/v1/auth/google` |
| 3 | Backend OAuth → redirect to `/auth/callback?accessToken=&refreshToken=` |
| 4 | `AuthCallbackPage` calls `GET /auth/profile`, then `setAuth()` → `/dashboard` |

OAuth errors arrive as `?error=` query param and display on the callback page.

---

## Session persistence

Storage key: `gpa-auth` (Zustand persist middleware)

```typescript
// store/authStore.ts
persist({ name: 'gpa-auth' })
```

Tokens survive page refresh. Logout clears all auth state.

---

## Protected routes

`ProtectedRoute` wraps the main app layout. Unauthenticated users are redirected to `/login`.

Protected paths:

- `/dashboard`, `/analyze`, `/profiles`, `/profiles/:username`
- `/search`, `/compare`, `/leaderboard`, `/activity`

Public paths:

- `/`, `/login`, `/register`, `/auth/callback`

Logged-in users visiting `/login` or `/register` are redirected to `/dashboard`.

---

## API client behavior

`src/api/client.ts` attaches the token on every request:

```typescript
config.headers.Authorization = `Bearer ${accessToken}`
```

On **401** response:

1. `logout()` clears the store
2. Browser navigates to `/login`

> Token refresh is not implemented on the frontend yet — long sessions may require re-login when the access token expires.

---

## Sign out

Sidebar **Sign out** button:

1. Calls `logout()` from `authStore`
2. Redirects to `/login`

---

## Related

- [Routing & Navigation](routing.md)
- [API Integration](api-integration.md)
- [Backend authentication](../../backend/docs/authentication.md)
