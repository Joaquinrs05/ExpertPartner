# Feature Specification: Admin Settings

**Feature Branch**: `15-settings`
**Created**: 2026-05-23
**Status**: Stub — pending implementation
**Files**: `features/admin/settings/admin-settings.component.ts`

---

## Current State

The component exists as a placeholder: `<p>Admin Settings — coming soon</p>`. No functionality is implemented.

---

## User Scenarios & Testing _(to be defined when prioritised)_

### User Story 1 — Admin configures app preferences (Priority: TBD)

The admin accesses a settings panel to configure application-level options.

**Candidate settings** (to confirm before implementation):
- Language selector (delegates to `LanguageService`)
- Theme toggle (light/dark — future)
- Notification preferences (future)
- Account details (name, email)

---

## Requirements _(draft)_

- **FR-001**: Settings page MUST at minimum expose the language toggle (ES / EN) via `LanguageService`.
- **FR-002**: Any setting that persists MUST use `localStorage` or Supabase, not component state.

---

## Success Criteria _(draft)_

- **SC-001**: Language change from settings persists on reload.

---

## Assumptions

- This feature is explicitly deferred — the component is a stub route placeholder.
- Scope will be defined when the feature is prioritised.
