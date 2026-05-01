# skill-02 — Design Tokens & Global Styles

**Status:** Completed 2026-05-01  
**Agents:** Implementer + Reviewer  
**Verdict:** APPROVED

## What was built
Expanded `frontend/src/styles.css` with:
- Border-radius tokens: `--radius-sm/md/lg/full`
- Elevation token: `--shadow-card`
- Typography token: `--font-family`
- Typography utility classes: `.text-h1` through `.text-label-sm`
- Badge variants: `.badge-urgent`, `.badge-lead`, `.badge-finance`
- `.input-focus` reusable focus style
- `@keyframes pulse` + `.badge-live` animation class
- Completed utility classes with CSS custom properties (no hardcoded values)
- Full global reset with font-smoothing

## Acceptance criteria
All 11 passed. `ng build --configuration development` compiles cleanly.

## Notes
Two `rgba()` values outside `:root` (hover on `.btn-secondary` and glow on `.input-focus`) use hardcoded color components — known CSS limitation since `var()` cannot be used inside `rgba()` without RGB component variables. Both correctly mirror their token counterparts.
