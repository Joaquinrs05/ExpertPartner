# ExpertPartner — AI Context & Rules

## Agent System

This project uses a multi-agent workflow. Before doing any work, every agent must read these files in order:

1. `CLAUDE.md` (this file) — rules and conventions
2. `specs/constitution.md` — immutable architectural principles (MUST NOT be violated)
3. `current.md` — what is being worked on right now
4. `feature_list.json` — full feature list with status and acceptance criteria
5. `specs/XX-feature-name/spec.md` — user stories, requirements, and success criteria for the feature
6. `specs/XX-feature-name/plan.md` — technical plan and data model (if it exists)
7. `specs/XX-feature-name/tasks.md` — ordered task list with parallelism markers
8. The assigned `skills/XX-name.md` — implementation reference and design details

### Spec-Driven Development

Every feature goes through three documents before implementation begins:

| Document | Purpose | Who writes it |
|---|---|---|
| `spec.md` | User stories, requirements, success criteria | Leader |
| `plan.md` | Technical approach, data model, component API | Leader |
| `tasks.md` | Ordered task list with [P] parallel markers | Leader |

Templates for creating new specs are in `.speckit/templates/`.

### Agent roles
- **Leader** (`.agents/leader.md`) — orchestrates, picks next task, writes specs/plans/tasks, never writes code
- **Implementer** (`.agents/implementer.md`) — executes tasks from `tasks.md` one at a time
- **Reviewer** (`.agents/reviewer.md`) — verifies each feature against `spec.md` success criteria before marking complete

### State files
- `current.md` — single in-progress task (IDLE when nothing is running)
- `feature_list.json` — feature status: `pending` → `in_progress` → `completed`
- `history.md` — append-only log of every action taken
- `progress/` — one summary file per completed feature + review files

---

## Project Overview

ExpertPartner is an Angular 17+ management suite for consultancy firms. It has two separate portals (Admin and Employee) with role-based routing, time tracking, a filtered email inbox, and team management.

**Current phase:** Frontend only. No backend exists yet. All data is mocked locally.

---

## Tech Stack

- **Framework:** Angular 17+ — standalone components only, no NgModules
- **Language:** TypeScript (strict mode)
- **Styling:** Pure CSS using custom properties (no Angular Material, no Tailwind, no component libraries)
- **Routing:** Angular Router with lazy-loaded feature routes and functional guards
- **State:** Component-level state + services with RxJS `BehaviorSubject` for shared state
- **Data:** In-memory mock data defined in service files — no HTTP calls until backend is ready
- **Tests:** None for now

---

## Coding Rules

### Angular
- Every component, pipe, and directive must be `standalone: true`
- Use `inject()` instead of constructor injection
- Use `input()` / `output()` signals for component I/O where possible; fall back to `@Input()`/`@Output()` only when needed
- Use `OnPush` change detection on all components
- Prefer `NgOptimizedImage` for any `<img>` tags
- Use `AsyncPipe` in templates instead of manual subscriptions

### TypeScript
- All code in English: variable names, function names, class names, comments
- No `any` types — define interfaces for everything
- All interfaces go in `core/models/`
- Keep files small and single-responsibility

### CSS
- Use only the CSS custom properties defined in `src/styles.css` — never hardcode color or spacing values
- Component styles go in their own `.css` file, never inline
- Mobile-first: base styles for mobile, `@media (min-width: 768px)` for tablet, `@media (min-width: 1280px)` for desktop
- No external CSS libraries

### General
- No comments explaining what the code does — only add a comment when the WHY is non-obvious
- No unused imports, variables, or dead code
- Do not create extra files (README, docs, changelogs) unless explicitly requested

---

## Design System

### Colors (CSS custom properties)

| Token | Value | Usage |
|---|---|---|
| `--color-navy` | `#0F172A` | Sidebar background |
| `--color-emerald` | `#10B981` | Primary CTAs, active states, success |
| `--color-surface` | `#F8FAFC` | App background |
| `--color-card` | `#FFFFFF` | Cards and containers |
| `--color-border` | `#E2E8F0` | Card and input borders |
| `--color-text` | `#191C1E` | Primary text |
| `--color-muted` | `#45464D` | Secondary text and labels |
| `--color-urgent` | `#EF4444` | URGENT badge text |
| `--color-urgent-bg` | `#FEE2E2` | URGENT badge background |
| `--color-lead` | `#3B82F6` | LEAD GEN badge text |
| `--color-lead-bg` | `#DBEAFE` | LEAD GEN badge background |
| `--color-finance` | `#6B7280` | FINANCE badge text |
| `--color-finance-bg` | `#E5E7EB` | FINANCE badge background |

### Typography — Inter (loaded from Google Fonts)

| Scale | Size | Weight | Usage |
|---|---|---|---|
| `h1` | 36px | 700 | Page titles |
| `h2` | 24px | 600 | Section subtitles |
| `h3` | 20px | 600 | Card headers |
| `body-lg` | 16px | 400 | Body text |
| `body-md` | 14px | 400 | Support text |
| `label-sm` | 12px | 600 | Uppercase labels, table headers |

### Spacing (4px base grid)

```
--space-xs: 4px  |  --space-sm: 8px  |  --space-md: 16px
--space-lg: 24px  |  --space-xl: 40px
```

### Layout

```
--sidebar-width: 260px
--topbar-height: 64px
Gutter between cards: 24px
Internal card padding: 24px
```

### Elevation

- **Level 0** — App background (`--color-surface`)
- **Level 1** — Cards: `border: 1px solid var(--color-border)`, no shadow
- **Level 2** — Hover/floating: `box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08)`
- **Sidebar** — Hard depth break using `--color-navy`

### Component Rules

- **Tables:** No vertical borders, only 1px horizontal dividers; row hover `#F1F5F9`; sticky headers
- **Buttons primary:** `--color-emerald` background, white text
- **Buttons secondary:** transparent background, navy border
- **Inputs:** white bg, 1px `--color-border` border; on focus → emerald border + 2px emerald glow at 10% opacity
- **Status badges:** pill shape (`border-radius: 9999px`), colored bg + matching text
- **Sidebar active state:** 4px left accent bar in emerald + subtle tinted background
- **Badge LIVE:** CSS `@keyframes pulse` animation

---

## Project Structure

```
frontend/
└── src/
    ├── styles.css              ← Global tokens + resets
    ├── app/
    │   ├── app.config.ts
    │   ├── app.routes.ts
    │   ├── core/
    │   │   ├── guards/         ← auth.guard.ts, role.guard.ts (functional guards)
    │   │   ├── interceptors/   ← auth.interceptor.ts
    │   │   ├── services/       ← auth, attendance, email, team services
    │   │   └── models/         ← TypeScript interfaces
    │   ├── shared/
    │   │   ├── components/     ← badge, avatar, progress-bar, kpi-card, data-table
    │   │   └── pipes/          ← time-ago, truncate
    │   ├── layout/
    │   │   ├── admin-shell/
    │   │   ├── employee-shell/
    │   │   ├── sidebar/
    │   │   └── topbar/
    │   └── features/
    │       ├── auth/           ← login
    │       ├── admin/          ← dashboard, emails, team, settings
    │       └── employee/       ← dashboard, attendance
```

---

## Routes

```
/login                     → LoginComponent (public)
/admin/dashboard           → Admin Dashboard    [auth + role=admin]
/admin/emails              → Filtered Emails    [auth + role=admin]
/admin/team                → Team Management    [auth + role=admin]
/admin/attendance          → Attendance         [auth + role=admin]
/admin/settings            → Settings           [auth + role=admin]
/employee/dashboard        → Employee Dashboard [auth + role=employee]
/employee/attendance       → My Attendance      [auth + role=employee]
/                          → redirect based on role
**                         → redirect to /login
```

---

## Mock Data Strategy

Services return **hardcoded arrays** wrapped in `of()` from RxJS to simulate async behavior. This makes swapping to real HTTP calls trivial later.

```typescript
// Example pattern for mock services
getConsultants(): Observable<Consultant[]> {
  return of(MOCK_CONSULTANTS).pipe(delay(200));
}
```

Mock data files live alongside their service or in a `core/mock-data/` folder.

---

## Authentication (Mock)

`auth.service.ts` holds a hardcoded users array. Login checks email + password against this array and stores the user in a `BehaviorSubject` and `localStorage`.

Mock users to always include:
- `admin@expertpartner.com` / `admin123` → role: `admin`
- `employee@expertpartner.com` / `emp123` → role: `employee`

Guards are functional:
```typescript
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn() ? true : router.createUrlTree(['/login']);
};
```

---

## Screens Reference

Original designs are in `stitch_consultancy_operations_hub/`. Each folder contains `screen.png` (visual reference) and `code.html` (HTML/CSS reference — do not copy directly, adapt to Angular component architecture).

| Folder | Screen |
|---|---|
| `login_expert_partner` | Login page |
| `admin_dashboard_expert_partner` | Admin dashboard |
| `employee_dashboard_expert_partner` | Employee dashboard |
| `attendance_tracking_expert_partner_1` | Attendance (off duty, two buttons) |
| `attendance_tracking_expert_partner_2` | Attendance (start of day, one CTA) |
| `filtered_emails_expert_partner` | Email inbox |
| `team_management_expert_partner_1` | Team table with Import Excel button |
| `team_management_expert_partner_2` | Team table without Import Excel button |

---

## Build Order (Skills)

| # | Skill file | What it builds |
|---|---|---|
| 01 | `skills/01-setup-angular.md` | Angular project init, folder structure, global CSS tokens |
| 02 | `skills/02-design-tokens.md` | Typography, spacing, color tokens wired up |
| 03 | `skills/03-layout-sidebar.md` | Admin shell, Employee shell, Sidebar, Topbar |
| 04 | `skills/04-auth-login.md` | Login screen, mock auth service, guards |
| 05 | `skills/05-admin-dashboard.md` | KPI cards, Activity Monitor, Express Inbox |
| 06 | `skills/06-employee-dashboard.md` | Clock widget, Weekly Hours, Profile card |
| 07 | `skills/07-attendance.md` | Attendance screen (both variants), Recent Activity table |
| 08 | `skills/08-filtered-emails.md` | Email list, category badges, star toggle |
| 09 | `skills/09-team-management.md` | Consultant table, filters, pagination |

---

## Out of Scope (Future Phases)

- Backend / Supabase integration
- Real authentication (JWT, sessions)
- Email AI classification (OpenAI)
- Real-time WebSockets
- Medical exam reminders (40-day alert)
- Employee onboarding/offboarding manager
- Import from Excel
