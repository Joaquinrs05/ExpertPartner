# Design System — ExpertPartner

> Source of truth for all visual decisions. See also `CLAUDE.md` for the token reference.

## Brand Personality
"The Expert Partner" — composed, reliable, technologically advanced. Corporate/Modern aesthetic. Functional elegance over decoration.

## Colors
See `CLAUDE.md` → Design System → Colors.

## Typography
Font: **Inter** (Google Fonts). See `CLAUDE.md` → Design System → Typography.

## Spacing
4px base grid. See `CLAUDE.md` → Design System → Spacing.

## Elevation
See `CLAUDE.md` → Design System → Elevation.

## Components

### Tables
- No vertical borders
- 1px horizontal dividers only
- Sticky headers with light slate background
- Row hover: `#F1F5F9`
- Header font: 13px / 500 weight / uppercase tracking

### Cards
- `border: 1px solid var(--color-border)` — no shadow at rest
- Hover: `box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08)`
- Internal padding: 24px
- Border radius: 8px

### Buttons
- **Primary:** `--color-emerald` bg, white text, 4px radius
- **Secondary:** transparent bg, `--color-navy` border, `--color-navy` text
- **Ghost:** text-only, used inside tables

### Inputs
- White bg, `1px solid var(--color-border)`
- Focus: `border-color: var(--color-emerald)` + `box-shadow: 0 0 0 2px rgba(16,185,129,0.1)`

### Badges (pills)
- `border-radius: 9999px`, `padding: 2px 10px`, `font-size: 12px`, `font-weight: 600`
- URGENT: bg `#FEE2E2`, text `#EF4444`
- LEAD GEN: bg `#DBEAFE`, text `#3B82F6`
- FINANCE: bg `#E5E7EB`, text `#6B7280`
- LIVE: bg `#D1FAE5`, text `#065F46`, animated pulse

### Sidebar
- Background: `#0F172A` (Deep Navy)
- Active item: 4px left bar in `--color-emerald` + `rgba(16,185,129,0.08)` background tint
- Icons: thin-stroke (2px stroke width)
