# Landing Page

Public marketing page for unauthenticated visitors.

**Route:** `/`  
**Component:** `HomePage.tsx`

Always accessible — logged-in users are **not** auto-redirected (they can visit `/` and use **Open dashboard**).

---

## Sections

| Section | Content |
|---------|---------|
| **Nav** | Logo, theme toggle, Login / Register or Dashboard / Sign out |
| **Hero** | Headline, CTA buttons, `HeroPreview` mock report |
| **Features grid** | 6 feature cards with icons |
| **How it works** | 3-step flow: Analyze → Rank → Compare |
| **Footer** | Links to login/register |

---

## Feature cards

1. Deep profile analysis
2. Persona ranking (6 roles)
3. Contribution heatmaps
4. Search & filter
5. Side-by-side compare
6. Isolated user data

---

## HeroPreview

Static mock UI demonstrating the report layout (score ring, heatmap placeholder, persona badges) — no API calls.

---

## CTAs

| Auth state | Primary CTA |
|------------|---------------|
| Guest | Get started → `/register` |
| Logged in | Open dashboard → `/dashboard` |

---

## Related

- [Routing & Navigation](routing.md)
- [Authentication](authentication.md)
