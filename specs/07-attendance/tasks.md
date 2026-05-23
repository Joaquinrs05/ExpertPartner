# Tasks: Attendance Tracking

**Spec**: `specs/07-attendance/spec.md`
**Skill**: `skills/07-attendance.md`

---

## Phase 1 — Model + Service

- T001 Create `core/models/attendance.model.ts` — `AttendanceLog`, `SessionState` types (merge with existing if already created in skill 05)
- T002 Update `core/services/attendance.service.ts` — add `sessionState$: BehaviorSubject<SessionState>`, `startDay()`, `takeBreak()`, `resumeWork()`, `endDay()`, `getHistory(): Observable<AttendanceLog[]>`

**Checkpoint**: Service manages state transitions and exposes history.

---

## Phase 2 — Attendance Screen

- T003 Create `features/employee/attendance/activity-table/activity-table.component.ts` + `.css` — table with Date, In, Out, Break, Total columns; HH:MM formatting
- T004 Create `features/employee/attendance/attendance.component.ts` + `.css` — conditionally renders one or two CTA buttons based on `sessionState$`, includes `ActivityTableComponent`

**Checkpoint**: `/employee/attendance` switches between both variants and table renders.

---

## Dependencies

- T003 depends on T001
- T004 depends on T002, T003
