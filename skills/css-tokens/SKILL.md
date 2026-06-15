---
name: css-tokens
description: "Trigger: writing any CSS for ExpertPartner. Enforces design token usage, mobile-first breakpoints, and component style rules. Never hardcode colors or spacing."
metadata:
  author: expertpartner
  version: 1.0
  license: MIT
---

## Hard Rules

- Never hardcode a color or spacing value — always use a CSS custom property
- Component styles go in their own `.css` file — never inline styles
- Mobile-first: base styles target mobile, then `@media (min-width: 768px)` for tablet, `@media (min-width: 1280px)` for desktop
- No external CSS libraries (no Tailwind, no Material, no Bootstrap)

## Token Reference

### Colors
```css
--color-navy: #0F172A        /* sidebar background */
--color-emerald: #10B981     /* primary CTAs, active states, success */
--color-surface: #F8FAFC     /* app background */
--color-card: #FFFFFF        /* cards and containers */
--color-border: #E2E8F0      /* card and input borders */
--color-text: #191C1E        /* primary text */
--color-muted: #45464D       /* secondary text and labels */
--color-urgent: #EF4444      /* URGENT badge text */
--color-urgent-bg: #FEE2E2
--color-lead: #3B82F6        /* LEAD GEN badge text */
--color-lead-bg: #DBEAFE
--color-finance: #6B7280     /* FINANCE badge text */
--color-finance-bg: #E5E7EB
```

### Spacing
```css
--space-xs: 4px   --space-sm: 8px   --space-md: 16px
--space-lg: 24px  --space-xl: 40px
```

### Layout
```css
--sidebar-width: 260px
--topbar-height: 64px
```

## Elevation Rules

| Level | When | CSS |
|---|---|---|
| 0 | App background | `background: var(--color-surface)` |
| 1 | Cards | `border: 1px solid var(--color-border)` — no shadow |
| 2 | Hover / floating | `box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08)` |

## Component Patterns

**Input focus:**
```css
input:focus {
  border-color: var(--color-emerald);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
}
```

**Sidebar active item:**
```css
.nav-item.active {
  border-left: 4px solid var(--color-emerald);
  background: rgba(16, 185, 129, 0.08);
}
```

**LIVE badge pulse:**
```css
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
```
