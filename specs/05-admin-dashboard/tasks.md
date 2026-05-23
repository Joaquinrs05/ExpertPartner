# Tasks: Admin Dashboard

**Spec**: `specs/05-admin-dashboard/spec.md`
**Plan**: `specs/05-admin-dashboard/plan.md`
**Skill**: `skills/05-admin-dashboard.md`

---

## Phase 1 — Shared Foundations (parallel, blocks dashboard)

- T001 [P] Create `core/models/attendance.model.ts` — `AttendanceEvent` interface
- T002 [P] Create `core/models/email.model.ts` — `EmailPreview` interface + `BadgeType`
- T003 [P] Create `shared/pipes/time-ago.pipe.ts` — `Date → relative string`
- T004 [P] Create `shared/pipes/truncate.pipe.ts` — `string → truncated + "…"`
- T005 [P] Create `shared/components/badge/badge.component.ts` + `.css` — all badge types
- T006 [P] Create `shared/components/kpi-card/kpi-card.component.ts` + `.css` — LIVE pulse animation

**Checkpoint**: All shared building blocks ready. Dashboard components can now be built.

---

## Phase 2 — Services (parallel, blocks dashboard data)

- T007 [P] Create `core/services/attendance.service.ts` — `getRecentActivity(): Observable<AttendanceEvent[]>` with 8–10 mock rows
- T008 [P] Create `core/services/email.service.ts` — `getEmailPreviews(): Observable<EmailPreview[]>` with 4–5 mock emails

**Checkpoint**: Services provide mock data via observables. Components can subscribe.

---

## Phase 3 — Dashboard Components (US1 + US2 + US3)

- T009 [P] Create `features/admin/dashboard/activity-monitor/activity-monitor.component.ts` + `.css` — table, injects `AttendanceService`, uses `AsyncPipe`, `BadgeComponent`, `TimeAgoPipe`
- T010 [P] Create `features/admin/dashboard/express-inbox/express-inbox.component.ts` + `.css` — list, injects `EmailService`, uses `AsyncPipe`, `BadgeComponent`, `TruncatePipe`, `TimeAgoPipe`
- T011 Create `features/admin/dashboard/dashboard.component.ts` + `.css` — two-column layout, KPI row, quick actions, imports T009 + T010

**Checkpoint**: `/admin/dashboard` fully renders all sections with mock data.

---

## Dependencies

- T009, T010 depend on T001–T008
- T011 depends on T009, T010
- T005, T006 are self-contained (no service dependency)
- T003, T004 are self-contained pure pipes
