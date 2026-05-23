# Feature Specification: Employee Profile

**Feature Branch**: `11-employee-profile`
**Created**: 2026-05-23
**Status**: Implemented
**Files**: `features/employee/profile/employee-profile.component.ts`

---

## User Scenarios & Testing

### User Story 1 — Employee views their profile information (Priority: P1)

The employee sees their full name split into first and last name, their role, and their avatar.

**Independent Test**: Navigate to `/employee/profile` — shows avatar, first name, last name derived from `AuthService.currentUser`.

**Acceptance Scenarios**:

1. **Given** an authenticated employee with name "John Doe", **When** the profile page loads, **Then** firstName is "John" and lastName is "Doe".
2. **Given** a user with a single-word name, **When** rendered, **Then** lastName is empty string.

---

### User Story 2 — Employee uploads a profile photo (Priority: P2)

The employee can select a local image file to use as their avatar.

**Independent Test**: Click the photo upload area, select an image — the `AvatarComponent` updates to show the selected image.

**Acceptance Scenarios**:

1. **Given** the employee selects a valid image file, **When** `FileReader` loads it, **Then** `photoUrl` signal updates and the avatar displays the new image.
2. **Given** no file is selected (dialog cancelled), **When** `onPhotoChange` fires, **Then** `photoUrl` stays unchanged.

---

## Requirements

- **FR-001**: `firstName` and `lastName` MUST be computed signals derived from `AuthService.currentUser`.
- **FR-002**: Photo upload MUST use `FileReader.readAsDataURL` — no server upload this phase.
- **FR-003**: `AvatarComponent` MUST receive `photoUrl` and fall back to initials if empty.
- **FR-004**: Component MUST use `OnPush` and `TranslatePipe` for all visible labels.

---

## Success Criteria

- **SC-001**: Name splitting works for single name, two names, and three-part names.
- **SC-002**: Photo change is instant (no loading state needed — client-side only).

---

## Assumptions

- Photo is not persisted to Supabase this phase — it's in-memory only.
- No edit form for name/role — read-only display this phase.
