# ExpertPartner Constitution

**Version**: 1.0 | **Ratified**: 2026-05-23 | **Last Amended**: 2026-05-23

---

## Core Principles

### Article I — Standalone Components Only

Every Angular component, pipe, and directive MUST be `standalone: true`. No NgModules are permitted under any circumstances.

### Article II — No External UI Libraries

Styling is done exclusively with CSS custom properties defined in `src/styles.css`. Angular Material, Tailwind, Bootstrap, and any other CSS/component library are forbidden.

### Article III — Typed Everything, No `any`

All TypeScript must be strict. No `any` types. Every data shape must have an interface defined in `core/models/`. Guessing at types creates bugs that are invisible at compile time.

### Article IV — Mock Data as Async Observables

All data comes from services returning `Observable<T>` via `of(MOCK_DATA).pipe(delay(200))`. No raw arrays in components. This makes the future swap to real HTTP trivial.

### Article V — Component State, Service State — Nothing Else

State lives either in the component (local UI state) or in a service `BehaviorSubject` (shared state). No global stores, no NgRx, no third-party state libraries.

### Article VI — Guards Are Functional

Route guards use the functional `CanActivateFn` pattern with `inject()`. No class-based guards.

### Article VII — Mobile-First CSS

All component styles start with mobile base rules. Tablet breakpoint: `@media (min-width: 768px)`. Desktop breakpoint: `@media (min-width: 1280px)`. Desktop is an enhancement, never the default.

### Article VIII — English Code, No Unnecessary Comments

All identifiers, variable names, function names, and file names are in English. Comments are only added when the WHY is non-obvious. No comments describing what the code does.

### Article IX — OnPush Change Detection Everywhere

Every component uses `changeDetection: ChangeDetectionStrategy.OnPush`. No exceptions. Performance is a feature.

---

## Design System Law

The design tokens defined in `src/styles.css` are the single source of truth. No hardcoded hex values, no hardcoded spacing values, no inline styles. Any color or spacing not covered by a token requires amending this constitution first.

| Token category | File |
|---|---|
| Colors | `--color-*` in `styles.css` |
| Spacing | `--space-*` in `styles.css` |
| Layout | `--sidebar-width`, `--topbar-height` in `styles.css` |
| Typography | `--font-family` + scale rules in `styles.css` |

---

## Portal Separation

The application has two portals with strict role-based access:

- **Admin portal** (`/admin/*`) — guards: `authGuard` + `roleGuard(admin)`
- **Employee portal** (`/employee/*`) — guards: `authGuard` + `roleGuard(employee)`

No component from the admin portal may be imported into the employee portal and vice versa. Shared UI lives exclusively in `shared/`.

---

## Out of Scope (Current Phase)

The following are explicitly deferred to future phases. No implementation, no placeholders, no stubs:

- Backend / Supabase integration
- Real JWT authentication
- AI email classification
- Real-time WebSockets
- Excel import
- Medical exam reminders
- Employee onboarding/offboarding manager
