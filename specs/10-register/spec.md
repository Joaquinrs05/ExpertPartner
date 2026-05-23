# Feature Specification: Register — New Employee Account

**Feature Branch**: `10-register`
**Created**: 2026-05-23
**Status**: Implemented
**Files**: `features/auth/register/register.component.ts`

---

## User Scenarios & Testing

### User Story 1 — New employee creates their account (Priority: P1)

A new employee fills in name, email, password, and confirmation, and is redirected to their dashboard on success.

**Independent Test**: Navigate to `/register`, fill in all fields correctly, submit — should land on `/employee/dashboard`.

**Acceptance Scenarios**:

1. **Given** all fields are valid, **When** the form is submitted, **Then** `AuthService.register()` is called and the user is redirected to `/employee/dashboard`.
2. **Given** the email is already in use, **When** submit completes, **Then** an error message is shown: "No se pudo crear la cuenta. El email puede que ya esté en uso."
3. **Given** the form is submitted with empty fields, **Then** the relevant fields show error state and no auth call is made.
4. **Given** password is fewer than 6 characters, **Then** `passwordError` is set and submit is blocked.
5. **Given** password and confirmPassword don't match, **Then** `confirmError` is set and submit is blocked.

---

## Requirements

- **FR-001**: Form MUST validate: name (non-empty), email (non-empty), password (min 6 chars), confirmPassword (matches password).
- **FR-002**: Validation MUST run client-side before any auth call.
- **FR-003**: Submit button MUST show loading state while `AuthService.register()` resolves.
- **FR-004**: On success, redirect to `/employee/dashboard`.
- **FR-005**: On failure, show inline error message without clearing form fields.
- **FR-006**: Form MUST use `FormsModule` with signal-based state (`signal()`), `OnPush`.

---

## Success Criteria

- **SC-001**: All 5 validation cases (empty name, empty email, short password, password mismatch, duplicate email) are handled visibly.
- **SC-002**: Form is fully usable on mobile (375px).

---

## Assumptions

- Registration creates an employee-role account only (no admin self-registration).
- Backend is Supabase — `AuthService.register()` delegates to Supabase Auth.
- No email verification step in this phase.
