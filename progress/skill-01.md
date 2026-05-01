# skill-01 — Angular Project Setup

**Status:** Completed 2026-05-01  
**Agents:** Implementer + Reviewer  
**Verdict:** APPROVED

## What was built
- Angular 21 project initialized inside `frontend/` with `--standalone --routing --style=css --strict`
- `tsconfig.json`: `strict: true`, `strictTemplates: true`, path aliases for `@core/*`, `@shared/*`, `@features/*`, `@layout/*`
- `src/styles.css`: all 13 color tokens, 5 spacing tokens, layout tokens (`--sidebar-width`, `--topbar-height`), global reset, utility classes (`.card`, `.btn-primary`, `.btn-secondary`, `.badge-pill`)
- `src/index.html`: Inter font loaded from Google Fonts (weights 400, 600, 700) with preconnect hints
- `app.config.ts`: `provideRouter` wired up
- `app.routes.ts`: lazy-loaded routes for `/login`, `/admin`, `/employee` + redirects
- Full folder structure: `core/`, `shared/`, `layout/`, `features/auth/login/`, `features/admin/`, `features/employee/`

## Acceptance criteria
All 7 passed. `ng build --configuration development` compiles cleanly.
