# Feature Specification: Auth — Login Screen + Guards

**Feature Branch**: `04-auth-login`
**Created**: 2026-05-23
**Status**: Ready
**Skill**: `skills/04-auth-login.md`

---

## User Scenarios & Testing

### User Story 1 — Admin logs in and lands on their dashboard (Priority: P1)

An admin user opens the app, enters their credentials, and is redirected to the admin dashboard.

**Why this priority**: Without auth, no other screen is reachable. This is the entry gate to the entire app.

**Independent Test**: Navigate to `/login`, enter `admin@expertpartner.com` / `admin123`, click LOG IN — should land on `/admin/dashboard`.

**Acceptance Scenarios**:

1. **Given** the user is on `/login`, **When** they enter valid admin credentials and submit, **Then** they are redirected to `/admin/dashboard`.
2. **Given** the user is on `/login`, **When** they enter wrong credentials, **Then** an error message is shown and no redirect occurs.
3. **Given** the user is unauthenticated, **When** they navigate directly to `/admin/dashboard`, **Then** they are redirected to `/login`.

---

### User Story 2 — Employee logs in and lands on their dashboard (Priority: P1)

An employee user enters their credentials and is routed to the employee portal.

**Why this priority**: Same criticality as admin login — both roles must work.

**Independent Test**: Enter `employee@expertpartner.com` / `emp123` — should land on `/employee/dashboard`.

**Acceptance Scenarios**:

1. **Given** valid employee credentials, **When** the form is submitted, **Then** redirect goes to `/employee/dashboard`.
2. **Given** an admin session, **When** they try to navigate to `/employee/dashboard`, **Then** they are redirected to `/admin/dashboard`.

---

### User Story 3 — Form validates before submission (Priority: P2)

Empty fields trigger visual feedback without making an auth attempt.

**Why this priority**: UX quality — prevents unnecessary API calls and gives immediate feedback.

**Independent Test**: Click LOG IN with empty fields — both inputs show red borders.

**Acceptance Scenarios**:

1. **Given** both fields are empty, **When** LOG IN is clicked, **Then** both inputs get a red border and no login attempt is made.
2. **Given** the email field is focused, **When** it gains focus, **Then** it shows the emerald border + glow focus state.

---

### Edge Cases

- What happens when localStorage is cleared mid-session? → Guards should redirect to `/login`.
- What if role stored in localStorage is tampered with? → `roleGuard` reads from `AuthService`, not directly from localStorage.

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST validate email + password against the mock users array in `auth.service.ts`.
- **FR-002**: System MUST store the authenticated user in both a `BehaviorSubject` and `localStorage`.
- **FR-003**: `authGuard` MUST redirect unauthenticated users to `/login` for any protected route.
- **FR-004**: `roleGuard` MUST redirect to the correct portal based on the user's role.
- **FR-005**: The login button MUST show a loading state (spinner) for the 200ms mock delay.
- **FR-006**: The form MUST show real-time validation (red borders) on empty field submission.
- **FR-007**: The root route `/` MUST redirect based on role (admin → `/admin/dashboard`, employee → `/employee/dashboard`).
- **FR-008**: All unknown routes (`**`) MUST redirect to `/login`.

### Key Entities

- **User**: `{ id, email, name, role: 'admin' | 'employee', avatarUrl? }`

---

## Success Criteria

- **SC-001**: Login to admin account completes in under 300ms (200ms mock delay + render).
- **SC-002**: Navigating to any protected route while unauthenticated always ends on `/login`.
- **SC-003**: Role mismatch (admin trying `/employee/*`) always redirects to the correct portal.
- **SC-004**: Login form is fully usable on mobile (375px viewport).

---

## Assumptions

- No real backend exists — all auth is mocked in-memory.
- "Forgot password?" link is present in the UI but non-functional.
- The mock delay of 200ms simulates a real API call for UX realism.
- `localStorage` is the persistence mechanism (no cookies, no sessions).
