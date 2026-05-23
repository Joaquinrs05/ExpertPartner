# Feature Specification: Employee Dashboard

**Feature Branch**: `06-employee-dashboard`
**Created**: 2026-05-23
**Status**: Ready
**Skill**: `skills/06-employee-dashboard.md`

---

## User Scenarios & Testing

### User Story 1 — Employee sees the current time and can clock in/out (Priority: P1)

The employee opens their dashboard and sees a live clock with a prominent clock-in or clock-out button.

**Why this priority**: The clock widget is the employee's primary daily action.

**Independent Test**: Navigate to `/employee/dashboard` — clock shows current time updating every second. Button reads "Clock In" if not clocked in, "Clock Out" if clocked in.

**Acceptance Scenarios**:

1. **Given** the employee is not clocked in, **When** the page loads, **Then** the button reads "Clock In" in emerald.
2. **Given** the employee clicks "Clock In", **When** the action completes, **Then** the button switches to "Clock Out" and records a start timestamp.
3. **Given** the clock widget, **When** time passes, **Then** the displayed time updates every second.

---

### User Story 2 — Employee tracks their weekly hours (Priority: P2)

A progress bar and hours count show how far along the employee is toward their 40-hour week.

**Why this priority**: Secondary motivational metric — important but not blocking.

**Independent Test**: Weekly Hours card shows hours logged (e.g. "28.5 / 40 hrs") and a filled progress bar at ~71%.

**Acceptance Scenarios**:

1. **Given** mock weekly hours data, **When** the card renders, **Then** the progress bar width matches the percentage of 40h.
2. **Given** hours exceed 40, **When** rendered, **Then** bar is full (100%) and value is shown in emerald.

---

### User Story 3 — Employee sees their own profile at a glance (Priority: P3)

A profile card shows the employee's name, role, department, and avatar.

**Independent Test**: Profile card renders with name, role, department, and initials avatar.

**Acceptance Scenarios**:

1. **Given** the authenticated employee, **When** the profile card renders, **Then** it shows their name, role, and department from the auth service.

---

## Requirements

- **FR-001**: Clock widget MUST display current time, updating every second using `setInterval`.
- **FR-002**: Clock in/out state MUST be persisted via `AttendanceService`.
- **FR-003**: `ClockWidgetComponent` MUST unsubscribe/clear interval `OnDestroy`.
- **FR-004**: Weekly hours MUST use the shared `ProgressBarComponent`.
- **FR-005**: Profile card MUST read user data from `AuthService.currentUser$`.

### Key Entities

- **WeeklyHours**: `{ logged: number, target: number }` (target defaults to 40)

---

## Success Criteria

- **SC-001**: Clock time is accurate and updates without memory leaks.
- **SC-002**: Clock in/out state persists on page refresh (stored in service).
- **SC-003**: Progress bar accurately reflects hours percentage.

---

## Assumptions

- Weekly hours data is mocked (not calculated from real attendance logs this phase).
- Clock in/out state is kept in `AttendanceService` memory (not localStorage this phase).
