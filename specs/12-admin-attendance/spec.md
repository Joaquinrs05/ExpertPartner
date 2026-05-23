# Feature Specification: Admin Attendance View

**Feature Branch**: `12-admin-attendance`
**Created**: 2026-05-23
**Status**: Implemented
**Files**: `features/admin/attendance/admin-attendance.component.ts`, `attendance-table/attendance-table.component.ts`

---

## User Scenarios & Testing

### User Story 1 — Admin checks team attendance for a specific date (Priority: P1)

The admin selects a date and sees which employees are clocked in, completed, or not clocked.

**Independent Test**: Navigate to `/admin/attendance` — loads today's date by default. Changing the date input updates the table.

**Acceptance Scenarios**:

1. **Given** the page loads, **When** no date is changed, **Then** today's attendance data is shown.
2. **Given** the admin selects a past date, **When** the date input changes, **Then** `AttendanceService.getTeamAttendance(date)` is called and rows update.
3. **Given** rows are loaded, **When** the table renders, **Then** KPI counts (total, clocked-in, not-clocked, completed) are accurate.

---

### User Story 2 — Admin filters by attendance status (Priority: P2)

The admin narrows the table to a specific status: All, Clocked In, Not Clocked, Completed.

**Independent Test**: Select "Clocked In" from the status dropdown — only rows with `status === 'clocked-in'` are shown.

**Acceptance Scenarios**:

1. **Given** status filter is "all", **When** rendered, **Then** all rows are shown.
2. **Given** status filter is "clocked-in", **When** applied, **Then** only clocked-in rows are visible.

---

### User Story 3 — Admin expands a row for detail (Priority: P2)

Clicking a row expands it to show additional detail (e.g. clock-in time, breaks).

**Independent Test**: Click any row — it expands. Clicking again collapses it. Only one row can be expanded at a time.

**Acceptance Scenarios**:

1. **Given** a row is collapsed, **When** clicked, **Then** it expands and shows detail.
2. **Given** row A is expanded and row B is clicked, **When** B is clicked, **Then** A collapses and B expands.

---

## Requirements

- **FR-001**: `activeDate` signal defaults to today (`new Date().toISOString().slice(0, 10)`).
- **FR-002**: Date change MUST re-fetch via `AttendanceService.getTeamAttendance(date)` using `switchMap`.
- **FR-003**: Status filter MUST be: `all | clocked-in | not-clocked | completed`.
- **FR-004**: KPIs (total, clockedIn, notClocked, completed) MUST be computed from `allRows`.
- **FR-005**: `AttendanceTableComponent` MUST manage expand/collapse state internally via `expandedId` signal.
- **FR-006**: `BadgeComponent` MUST render status with types: `clocked-in`, `not-clocked`, `completed`.

### Key Entities

- **EmployeeAttendanceRow**: `{ id, name, status: 'clocked-in' | 'not-clocked' | 'completed', clockIn?: string, clockOut?: string, totalHours: number | null, avatarUrl?: string }`

---

## Success Criteria

- **SC-001**: Date change updates the table without page reload.
- **SC-002**: KPI numbers match the visible rows at all times.
- **SC-003**: Row expand/collapse works without layout shift.

---

## Assumptions

- `AttendanceService.getTeamAttendance(date)` returns `Observable<EmployeeAttendanceRow[]>`.
- Data is mocked — no real Supabase query for attendance yet.
