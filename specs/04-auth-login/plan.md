# Implementation Plan: Auth — Login Screen + Guards

**Branch**: `04-auth-login` | **Date**: 2026-05-23 | **Spec**: `specs/04-auth-login/spec.md`

---

## Summary

Build the Angular login screen with mock auth service and functional route guards. Users authenticate against a hardcoded array and are redirected based on role. Guards protect all `/admin/*` and `/employee/*` routes.

---

## Technical Context

**Framework**: Angular 17+ standalone components
**Language**: TypeScript (strict)
**Styling**: Pure CSS with custom properties from `styles.css`
**State**: `BehaviorSubject<User | null>` in `AuthService` + `localStorage`
**Routing**: Functional guards (`CanActivateFn`) with `inject()`
**Testing**: None (out of scope per CLAUDE.md)
**Target Platform**: Browser (desktop + mobile-first)

---

## Constitution Check

| Article | Status | Notes |
|---|---|---|
| I — Standalone components | PASS | All components standalone |
| II — No external UI libraries | PASS | Pure CSS only |
| III — No `any` types | PASS | `User` interface defined in `core/models/` |
| IV — Mock data as observables | PASS | Auth uses `of()` with `delay(200)` |
| V — Component + service state | PASS | `BehaviorSubject` in service |
| VI — Functional guards | PASS | `CanActivateFn` + `inject()` |
| VII — Mobile-first CSS | PASS | Base mobile, `768px` breakpoint |
| IX — OnPush change detection | PASS | Applied to `LoginComponent` |

---

## Project Structure

```
frontend/src/app/
├── core/
│   ├── models/
│   │   └── user.model.ts               ← User interface
│   ├── services/
│   │   └── auth.service.ts             ← BehaviorSubject + mock login
│   └── guards/
│       ├── auth.guard.ts               ← Redirect to /login if not authed
│       └── role.guard.ts               ← Redirect based on role
└── features/
    └── auth/
        ├── auth.routes.ts
        └── login/
            ├── login.component.ts      ← Form + validation + loading state
            └── login.component.css     ← Centered card, dot-grid bg
```

---

## Data Model

```typescript
// core/models/user.model.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'employee';
  avatarUrl?: string;
}

// Mock users (inside auth.service.ts)
const MOCK_USERS: User[] = [
  { id: '1', email: 'admin@expertpartner.com', name: 'Admin User', role: 'admin' },
  { id: '2', email: 'employee@expertpartner.com', name: 'John Doe', role: 'employee' },
];
```

---

## Auth Service API

```typescript
class AuthService {
  currentUser$: Observable<User | null>   // from BehaviorSubject
  login(email: string, password: string): Observable<User>  // of() + delay(200), throws if invalid
  logout(): void
  isLoggedIn(): boolean
  getRole(): 'admin' | 'employee' | null
}
```

---

## Guard Logic

```
authGuard:
  isLoggedIn() → true
  else → router.createUrlTree(['/login'])

roleGuard(requiredRole):
  getRole() === requiredRole → true
  getRole() === 'admin' → router.createUrlTree(['/admin/dashboard'])
  getRole() === 'employee' → router.createUrlTree(['/employee/dashboard'])
  else → router.createUrlTree(['/login'])
```

---

## Login Component States

| State | Visual |
|---|---|
| Default | White card, inputs with border, black LOG IN button |
| Field focused | Emerald border + 2px emerald glow at 10% opacity |
| Submitting | Button shows spinner, inputs disabled |
| Error | Error message below form, inputs retain values |
| Validation fail | Red borders on empty fields, no submit attempt |
