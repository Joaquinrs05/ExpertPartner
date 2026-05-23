# Feature Specification: Team Management

**Feature Branch**: `09-team-management`
**Created**: 2026-05-23
**Status**: Ready
**Skill**: `skills/09-team-management.md`

---

## User Scenarios & Testing

### User Story 1 — Admin browses the consultant roster (Priority: P1)

The admin sees a paginated table of all consultants with key info at a glance.

**Independent Test**: Navigate to `/admin/team` — table renders 15–20 mock consultants with all columns.

**Acceptance Scenarios**:

1. **Given** mock consultant data, **When** the table loads, **Then** columns show: Avatar, Name, Role, Department, Status badge, EOM date, Actions.
2. **Given** 15+ rows, **When** pagination renders, **Then** only 10 rows are visible per page and pagination controls work.

---

### User Story 2 — Admin filters consultants by availability status (Priority: P2)

The admin can filter the table by availability: Available, Assigned, On Leave.

**Independent Test**: Click "Available" filter — only available consultants are shown. Count updates.

**Acceptance Scenarios**:

1. **Given** a status filter is selected, **When** applied, **Then** only consultants with that status are shown.
2. **Given** a search input, **When** the admin types a name, **Then** the list filters in real-time.

---

### Edge Cases

- What if no consultants match the filter? → Show "No results found" row.
- What if EOM date has passed? → Show it in red.

---

## Requirements

- **FR-001**: `TeamService` MUST return `Observable<Consultant[]>` with 15–20 mock items.
- **FR-002**: Table MUST support client-side pagination (10 per page).
- **FR-003**: Status filter buttons MUST be: All, Available, Assigned, On Leave.
- **FR-004**: Search input MUST filter by name in real-time (case-insensitive).
- **FR-005**: "Import Excel" button is visible only in `team_management_expert_partner_1` variant (admin only, non-functional).
- **FR-006**: EOM dates past today MUST render in `--color-urgent`.

### Key Entities

- **Consultant**: `{ id, name, role, department, status: 'available' | 'assigned' | 'on-leave', eomDate: Date, avatarUrl?: string }`

---

## Success Criteria

- **SC-001**: Table renders 15–20 rows without layout overflow.
- **SC-002**: Pagination switches pages without visual glitch.
- **SC-003**: Search and filter work independently and together.

---

## Assumptions

- No edit/delete actions are functional this phase (buttons present, non-functional).
- Import Excel is future scope — button present but does nothing.
