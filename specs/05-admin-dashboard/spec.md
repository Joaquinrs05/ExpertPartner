# Feature Specification: Admin Dashboard

**Feature Branch**: `05-admin-dashboard`
**Created**: 2026-05-23
**Status**: Ready
**Skill**: `skills/05-admin-dashboard.md`

---

## User Scenarios & Testing

### User Story 1 — Admin sees workforce snapshot at a glance (Priority: P1)

An admin opens the dashboard and immediately sees how many employees are active and how many are currently working.

**Why this priority**: The KPI row is the primary value of the dashboard — it's the first thing the admin looks at.

**Independent Test**: Navigate to `/admin/dashboard` — two KPI cards render with mock values (128 total, 42/128 online). LIVE badge pulses.

**Acceptance Scenarios**:

1. **Given** the admin is on the dashboard, **When** the page loads, **Then** two KPI cards render: "Total Active Employees" (128) and "Currently Working" (42/128 online).
2. **Given** the LIVE badge is rendered, **When** the page is visible, **Then** the badge animates with a pulse effect.

---

### User Story 2 — Admin monitors recent clock-in/out activity (Priority: P1)

The admin sees a live table of the last 8–10 clock events with relative timestamps.

**Why this priority**: The Activity Monitor is the core real-time feature of the dashboard.

**Independent Test**: The Activity Monitor table renders 8–10 rows with employee names, action badges (Clock In / Clock Out), and relative times like "12 mins ago".

**Acceptance Scenarios**:

1. **Given** mock attendance data, **When** the Activity Monitor renders, **Then** it shows 8–10 rows with name, action badge, and relative timestamp.
2. **Given** a "Clock In" event, **When** the badge renders, **Then** it shows green. Clock Out shows red.
3. **Given** a timestamp, **When** `TimeAgoPipe` transforms it, **Then** output is human-readable ("12 mins ago", "1 hour ago").

---

### User Story 3 — Admin previews priority emails without leaving the dashboard (Priority: P2)

The Express Inbox panel shows the 4–5 most important emails with category badges.

**Why this priority**: Secondary value — quick awareness before going to full inbox.

**Independent Test**: Express Inbox renders 4–5 mock emails, each with sender, category badge, truncated subject, and relative time. "Open Full Inbox" link navigates to `/admin/emails`.

**Acceptance Scenarios**:

1. **Given** mock email data, **When** Express Inbox renders, **Then** 4–5 rows show with badge, sender, truncated subject, and time.
2. **Given** a long subject line, **When** `TruncatePipe` applies, **Then** text is cut at ~60 chars with "…".
3. **Given** the "Open Full Inbox ↗" link, **When** clicked, **Then** navigates to `/admin/emails`.

---

### Edge Cases

- What if mock data array is empty? → Show "No recent activity" placeholder text.
- What if subject is shorter than truncation limit? → Show full subject, no ellipsis.

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST render two KPI cards using the shared `KpiCardComponent`.
- **FR-002**: LIVE badge MUST use CSS `@keyframes pulse` animation.
- **FR-003**: Activity Monitor MUST display 8–10 mock rows via `ActivityMonitorComponent`.
- **FR-004**: `TimeAgoPipe` MUST convert `Date` objects to relative strings.
- **FR-005**: Express Inbox MUST display 4–5 mock emails via `ExpressInboxComponent`.
- **FR-006**: `TruncatePipe` MUST truncate strings at N chars and append "…".
- **FR-007**: "Review Filtered Emails" quick action button MUST navigate to `/admin/emails`.
- **FR-008**: "+ Add New Employee" button is present (non-functional for this phase).
- **FR-009**: `BadgeComponent` MUST support types: `urgent`, `lead`, `finance`, `clock-in`, `clock-out`, `live`, `total`.

### Key Entities

- **AttendanceEvent**: `{ id, employeeName, action: 'clock-in' | 'clock-out', timestamp: Date }`
- **EmailPreview**: `{ id, sender, category: BadgeType, subject, preview, timestamp: Date }`

---

## Success Criteria

- **SC-001**: Dashboard renders all sections within 200ms of navigation.
- **SC-002**: LIVE badge pulsing is visible and smooth (no jank).
- **SC-003**: All time strings are human-readable and correctly relative to now.
- **SC-004**: Layout holds correctly at 375px (mobile), 768px (tablet), and 1280px+ (desktop).

---

## Assumptions

- All data is mocked. No HTTP calls.
- "+ Add New Employee" is a future feature — the button exists but does nothing.
- The Activity Monitor does not auto-refresh (no polling, no WebSockets this phase).
