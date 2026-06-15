# Skill 02 — Design Tokens & Global Styles

## Goal
Implement all CSS custom properties, typography scale, reset, and utility classes in `src/styles.css`.

## Status: ⬜ Pending

## What to implement

### CSS Custom Properties
All tokens defined in CLAUDE.md: colors, spacing, layout dimensions, border-radius, shadows, typography.

### Typography
- Load Inter from Google Fonts in `index.html`
- Define `.text-h1` through `.label-sm` utility classes

### Global Reset
- `box-sizing: border-box`
- Remove default margins/padding
- `font-family: var(--font-family)`
- `background: var(--color-surface)`

### Utility Classes
```css
.card { background: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-lg); }
.btn-primary { background: var(--color-emerald); color: white; ... }
.btn-secondary { border: 1px solid var(--color-navy); ... }
.badge-pill { border-radius: var(--radius-full); padding: 2px 10px; font-size: 12px; font-weight: 600; }
```

## Output
- All tokens available project-wide via CSS variables
- No hardcoded colors or spacing values anywhere in component CSS files
