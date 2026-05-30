# Theming & UI System

Cursor-inspired design system built with **Tailwind CSS v4** and CSS custom properties.

---

## Theme modes

| Mode | Default | Storage key |
|------|---------|-------------|
| Dark | Yes | `gpa-theme` |
| Light | No | `gpa-theme` |

`useThemeStore` (Zustand persist) applies `.dark` or `.light` class on `<html>` and sets `color-scheme`.

Toggle locations:

- Sidebar footer (`ThemeToggle`)
- Auth pages (login/register)
- Home page nav

---

## CSS variables

Defined in `src/index.css` under `:root.dark` and `:root.light`:

| Token | Usage |
|-------|-------|
| `--gpa-bg` | Page background |
| `--gpa-surface` | Cards, sidebar |
| `--gpa-elevated` | Raised surfaces |
| `--gpa-hover` | Hover states |
| `--gpa-border` | Borders |
| `--gpa-text` | Primary text |
| `--gpa-muted` | Secondary text |
| `--gpa-accent` | Violet accent |

Mapped to Tailwind via `@theme`:

```css
--color-cursor-bg: var(--gpa-bg);
--color-cursor-text: var(--gpa-text);
/* ... */
```

Use classes like `bg-cursor-surface`, `text-cursor-muted`, `border-cursor-border`.

---

## Typography

| Class | Usage |
|-------|-------|
| `text-gradient` | Page headings (gradient text) |
| `.app-reports` | Applied on `AppLayout` main — scales up report page font sizes |

Fonts: **Inter** (sans), **JetBrains Mono** (mono labels).

---

## Animation

**Framer Motion** used for:

- Page enter transitions (`opacity`, `y` offset)
- Sidebar active indicator (`layoutId="sidebar-active"`)
- Card stagger delays
- Button hover/tap (`GoogleAuthButton`, landing CTAs)

---

## UI primitives (`src/components/ui/`)

| Component | Props / behavior |
|-----------|------------------|
| `Button` | `variant`: default, ghost, outline; `size`: sm, md, lg |
| `Card` | Optional `glow`, `delay` for motion |
| `Input` | `label`, standard input props |
| `Badge` | `variant`: default, accent |
| `ScoreRing` | `score`, `label`, `sublabel` — SVG ring |

---

## Heatmap colors

`HeatmapChart` uses GitHub-style contribution levels:

| Level | Color (dark theme) |
|-------|-------------------|
| 0 | Empty cell |
| 1–4 | Increasing green intensity |

Cell size: **15px**, container height ~**168px**.

---

## Related

- [Components Reference](components-reference.md)
