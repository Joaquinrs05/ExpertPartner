# Agent History — ExpertPartner

> Changelog of all actions taken by agents. Each entry records what was done, which agent did it, and the outcome.

---

## Format

```
### [YYYY-MM-DD] Agent: <agent-name> | Feature: <feature-id>
**Action:** What was done
**Files changed:** List of created/modified files
**Outcome:** Result or observations
```

---

## Log

### [2026-05-01] Agent: implementer + reviewer | Feature: skill-04
**Action:** Built AuthService (signals, no BehaviorSubject), authGuard, roleGuard, LoginComponent, RegisterComponent (scope extended from original — register was not in feature_list but requested by user). All criteria passed on first review.
**Files changed:** `core/models/user.model.ts`, `core/services/auth.service.ts`, `core/guards/auth.guard.ts`, `core/guards/role.guard.ts`, `features/auth/login/*` (updated), `features/auth/register/*` (new), `features/auth/auth.routes.ts`, `app.routes.ts`
**Outcome:** All 11 acceptance criteria passed. Reviewer approved first pass. `ng build` compiles cleanly.
**Outcome:** `ng build --configuration development` passes with 0 errors. All guard logic, session persistence, and form validation implemented.

---

### [2026-05-01] Agent: implementer + reviewer | Feature: skill-03
**Action:** Built SidebarComponent, TopbarComponent, AdminShellComponent, EmployeeShellComponent with responsive layout. Reviewer rejected first pass (hardcoded `#ffffff` and `rgba()` color values). Fixed by adding 7 alpha tokens to `styles.css` and replacing all hardcoded values. Second review approved.
**Files changed:** `layout/sidebar/*`, `layout/topbar/*`, `layout/admin-shell/*`, `layout/employee-shell/*`, `features/admin/*/` (placeholders), `features/employee/*/` (placeholders), `app.routes.ts`, `admin.routes.ts`, `employee.routes.ts`, `styles.css` (7 new alpha tokens: `--color-white`, `--color-white-a08/a65/a06/a50`, `--color-emerald-a12/a10`)
**Outcome:** All 11 acceptance criteria passed on second review. `ng build` compiles cleanly.

---

### [2026-05-01] Agent: implementer + reviewer | Feature: skill-02
**Action:** Expanded `styles.css` with full typography scale, border-radius tokens, shadow token, font-family token, badge variants, `.input-focus`, `.badge-live` with pulse animation, and completed utility class implementations.
**Files changed:** `frontend/src/styles.css`
**Outcome:** All 11 acceptance criteria passed. Reviewer approved. `ng build` compiles cleanly.

---

### [2026-05-01] Agent: implementer + reviewer | Feature: skill-01
**Action:** Initialized Angular 17+ project inside `frontend/`. Configured tsconfig strict mode and path aliases, wired up CSS design tokens, loaded Inter font, set up lazy-loaded routing.
**Files changed:** `frontend/` (ng new), `tsconfig.json`, `src/styles.css`, `src/index.html`, `app.routes.ts`, `app.config.ts`, `app.ts`, `app.html`, feature route files, login placeholder component, full folder structure under `src/app/`
**Outcome:** All 7 acceptance criteria passed. Reviewer approved. `ng build` compiles cleanly.

---

### [2026-04-30] Agent: human | Feature: setup
**Action:** Created project scaffolding — CLAUDE.md, structure.md, skills/ (9 files), docs/, feature_list.json, history.md, current.md, progress/, .agents/
**Files changed:** All project meta files
**Outcome:** Project fully scaffolded and ready to begin skill-01
