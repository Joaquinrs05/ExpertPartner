# Feature Specification: Filtered Emails Inbox

**Feature Branch**: `08-filtered-emails`
**Created**: 2026-05-23
**Status**: Ready
**Skill**: `skills/08-filtered-emails.md`

---

## User Scenarios & Testing

### User Story 1 — Admin scans the inbox by category (Priority: P1)

The admin sees a list of emails grouped or filterable by category badge (URGENT, LEAD GEN, FINANCE, UPDATE).

**Independent Test**: Navigate to `/admin/emails` — list renders 10–15 mock emails with category badges. Filter buttons at top work.

**Acceptance Scenarios**:

1. **Given** the inbox page loads, **When** no filter is active, **Then** all emails are shown.
2. **Given** the admin clicks "URGENT", **When** filter applies, **Then** only urgent emails are shown.
3. **Given** the admin clicks the active filter again, **When** toggled off, **Then** all emails are shown again.

---

### User Story 2 — Admin stars important emails (Priority: P2)

The admin can toggle a star on any email to mark it for follow-up.

**Independent Test**: Click the star icon on any email row — it toggles between filled and unfilled states.

**Acceptance Scenarios**:

1. **Given** an unstarred email, **When** the star is clicked, **Then** the star becomes filled (golden).
2. **Given** a starred email, **When** the star is clicked again, **Then** the star returns to unfilled.

---

### Edge Cases

- What if the filtered category has zero emails? → Show "No emails in this category" placeholder.

---

## Requirements

- **FR-001**: `EmailService` MUST return `Observable<FilteredEmail[]>` with 10–15 mock items.
- **FR-002**: Category filter buttons MUST filter the displayed list without reloading data.
- **FR-003**: Star toggle MUST update state in `EmailService` (in-memory).
- **FR-004**: Each email row MUST show: star, sender, `BadgeComponent`, subject, preview (truncated), relative time.
- **FR-005**: `TruncatePipe` and `TimeAgoPipe` MUST be used for preview and timestamp.

### Key Entities

- **FilteredEmail**: `{ id, sender, senderEmail, category: BadgeType, subject, preview, timestamp: Date, starred: boolean, read: boolean }`

---

## Success Criteria

- **SC-001**: Filtering is instant (no delay, client-side only).
- **SC-002**: Star toggle is visually immediate (no flicker).
- **SC-003**: Layout is scannable and readable on mobile.

---

## Assumptions

- No email detail view this phase — clicking an email row does nothing.
- Starred state is not persisted to localStorage.
- "Read" state tracking is out of scope this phase.
