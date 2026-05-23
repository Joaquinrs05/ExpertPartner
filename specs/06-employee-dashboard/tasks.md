# Tasks: Employee Dashboard

**Spec**: `specs/06-employee-dashboard/spec.md`
**Skill**: `skills/06-employee-dashboard.md`

---

## Phase 1 — Shared Components

- T001 Create `shared/components/progress-bar/progress-bar.component.ts` + `.css` — input: `value` (0–100), fills bar proportionally
- T002 Create `shared/components/avatar/avatar.component.ts` + `.css` — shows initials if no `avatarUrl`

**Checkpoint**: Shared components ready.

---

## Phase 2 — Employee Dashboard Components

- T003 [P] Create `features/employee/dashboard/clock-widget/clock-widget.component.ts` + `.css` — live clock, clock in/out button, `OnDestroy` cleanup
- T004 [P] Create `features/employee/dashboard/weekly-hours/weekly-hours.component.ts` + `.css` — uses `ProgressBarComponent`, mock hours data
- T005 [P] Create `features/employee/dashboard/profile-card/profile-card.component.ts` + `.css` — reads from `AuthService.currentUser$`, uses `AvatarComponent`
- T006 Create `features/employee/dashboard/dashboard.component.ts` + `.css` — assembles T003, T004, T005

**Checkpoint**: `/employee/dashboard` fully renders with live clock and mock data.

---

## Dependencies

- T003 depends on `AttendanceService` (from skill 07 or mocked inline)
- T004 depends on T001
- T005 depends on T002 + `AuthService`
- T006 depends on T003, T004, T005
