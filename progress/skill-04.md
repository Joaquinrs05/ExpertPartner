# skill-04 — Auth: Login Screen + Guards (+ Register)

**Status:** Completed 2026-05-01  
**Agents:** Implementer + Reviewer (1 review cycle)  
**Verdict:** APPROVED

## Scope note
Register screen was added at user request — not in original feature_list.json. Treated as part of skill-04.

## What was built
- `User` interface at `core/models/user.model.ts` (no password field exposed)
- `AuthService` — signal-based (`signal()`, `computed()`), no BehaviorSubject. `login()`, `register()`, `logout()`, `currentUser`, `isLoggedIn`, `role`. Session persisted in localStorage.
- `auth.guard.ts` — functional CanActivateFn, redirects to `/login` if not authenticated
- `role.guard.ts` — functional CanActivateFn, reads `route.data['role']`, redirects to correct portal on mismatch
- `LoginComponent` — centered card with dot-grid bg, email + password with inline SVG icons, validation, 200ms spinner, error message, link to `/register`
- `RegisterComponent` — same visual style, name + email + password + confirm fields, password min 6 chars, passwords-match validation, link to `/login`
- `app.routes.ts` — admin/employee routes protected by `[authGuard, roleGuard]` with `data: { role }`

## Mock credentials
- `admin@expertpartner.com` / `admin123` → role: admin → `/admin/dashboard`
- `employee@expertpartner.com` / `emp123` → role: employee → `/employee/dashboard`

## Acceptance criteria
All 11 passed on first review. `ng build --configuration development` compiles cleanly.
