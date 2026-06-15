# Skill 04 — Auth: Login Screen + Guards

## Goal
Build the login page, mock auth service, and route guards.

## Status: ⬜ Pending

## Components & Services

### `core/services/auth.service.ts`
- `BehaviorSubject<User | null>` for current user
- `login(email, password)` — checks against mock users array, stores in `localStorage`
- `logout()` — clears state and localStorage
- `currentUser$` observable
- `isLoggedIn()` and `getRole()` helpers

Mock users:
```
admin@expertpartner.com / admin123 → role: admin
employee@expertpartner.com / emp123 → role: employee
```

### `core/guards/auth.guard.ts`
Functional guard. Redirects to `/login` if not authenticated.

### `core/guards/role.guard.ts`
Functional guard. Checks role from `AuthService`, redirects to correct portal.

### `features/auth/login/login.component`
Design reference: `stitch_consultancy_operations_hub/.../login_expert_partner/`

- Centered card on grey background with subtle dot-grid pattern
- Logo + "Expert Partner" title + "Management Suite Access" subtitle
- Email input with envelope icon
- Password input with lock icon + "Forgot password?" link (right-aligned, non-functional)
- "LOG IN →" button (black, full-width, uppercase)
- Loading spinner state on button while "authenticating" (200ms mock delay)
- Real-time validation: red border on empty fields at submit
- Focus state: emerald border + 2px glow
- Footer: legal text + "Contact IT Support" link

## Output
- `/login` works, form validates, redirects to `/admin/dashboard` or `/employee/dashboard` based on role
- Guards protect all `/admin/*` and `/employee/*` routes
