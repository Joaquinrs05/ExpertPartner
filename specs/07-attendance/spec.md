# Feature Specification: Attendance Tracking

**Feature Branch**: `07-attendance`
**Created**: 2026-05-23
**Status**: Ready
**Skill**: `skills/07-attendance.md`

---

## User Scenarios & Testing

### User Story 1 — Employee clocks in to start their workday (Priority: P1)

The employee sees a single prominent "Start Day" CTA when they have not yet clocked in.

**Independent Test**: Navigate to `/employee/attendance` while not clocked in — shows the "Variant 2" layout with one CTA button.

**Acceptance Scenarios**:

1. **Given** no active session, **When** the page loads, **Then** shows "Start Day" CTA (emerald, full-width).
2. **Given** the employee clicks "Start Day", **When** the action completes, **Then** the page switches to the "on duty" variant.

---

### User Story 2 — Employee manages their active session (Priority: P1)

While clocked in, the employee sees two buttons: "Take a Break" and "End Day".

**Independent Test**: After clocking in, page shows "Variant 1" layout with two buttons. Break/End Day buttons are functional.

**Acceptance Scenarios**:

1. **Given** an active session, **When** the page loads, **Then** shows "Take a Break" (secondary) and "End Day" (primary) buttons.
2. **Given** the employee clicks "Take a Break", **When** the action completes, **Then** break start is recorded and "Resume" button appears.

---

### User Story 3 — Employee reviews their attendance history (Priority: P2)

A table shows recent attendance logs with date, clock-in time, clock-out time, break duration, and total hours.

**Independent Test**: Recent Activity table renders 5–7 mock rows with all columns populated.

**Acceptance Scenarios**:

1. **Given** mock attendance logs, **When** the table renders, **Then** columns show: Date, In, Out, Break, Total.
2. **Given** an incomplete session (no clock-out), **When** rendered, **Then** "—" is shown for Out and Total.

---

## Requirements

- **FR-001**: `AttendanceService` MUST track current session state: `idle | working | on-break`.
- **FR-002**: Page layout MUST switch between "one CTA" and "two CTAs" variants based on session state.
- **FR-003**: `ActivityTableComponent` MUST display mock history with 5–7 rows.
- **FR-004**: All time values in the table MUST be formatted as `HH:MM`.

### Key Entities

- **AttendanceLog**: `{ id, date: Date, clockIn: Date, clockOut?: Date, breakMinutes: number }`
- **SessionState**: `'idle' | 'working' | 'on-break'`

---

## Success Criteria

- **SC-001**: State transitions (idle → working → on-break → working → idle) work correctly.
- **SC-002**: Table renders correctly at all breakpoints.

---

## Assumptions

- State is in-memory only (not persisted to localStorage this phase).
- Break duration is not calculated in real-time — stored as a simple number.
