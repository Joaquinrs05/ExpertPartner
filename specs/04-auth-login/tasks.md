# Tasks: Auth — Login Screen + Guards

**Spec**: `specs/04-auth-login/spec.md`
**Plan**: `specs/04-auth-login/plan.md`
**Skill**: `skills/04-auth-login.md`

---

## Phase 1 — Foundational (blocks everything else)

- T001 Create `core/models/user.model.ts` — `User` interface + password lookup type
- T002 Create `core/services/auth.service.ts` — `BehaviorSubject`, mock users array, `login()`, `logout()`, `isLoggedIn()`, `getRole()`
- T003 [P] Create `core/guards/auth.guard.ts` — functional guard, redirects to `/login`
- T004 [P] Create `core/guards/role.guard.ts` — functional guard, reads role, redirects to correct portal

**Checkpoint**: Auth service and guards ready. Routes can now be protected.

---

## Phase 2 — Login Screen (US1 + US2 + US3)

- T005 Create `features/auth/login/login.component.ts` — reactive form, calls `AuthService.login()`, handles loading/error states, `OnPush`
- T006 Create `features/auth/login/login.component.css` — centered card layout, dot-grid background, inputs, button, focus states, error states, mobile-first
- T007 Create `features/auth/auth.routes.ts` — lazy route for `/login`
- T008 Wire root route `/` redirect logic based on role in `app.routes.ts`
- T009 Add `**` wildcard redirect to `/login` in `app.routes.ts`
- T010 Apply `authGuard` + `roleGuard` to `/admin/*` and `/employee/*` route definitions

**Checkpoint**: `/login` works end-to-end. Submit with valid credentials redirects. Invalid credentials shows error. Empty fields show red borders.

---

## Dependencies

- T003, T004 depend on T002 (need `AuthService`)
- T005 depends on T002 (injects `AuthService`)
- T008, T009, T010 depend on T003, T004
- T006 is parallel to T005
