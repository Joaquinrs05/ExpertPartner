# skill-07 — Attendance Screen

**Status:** Completed 2026-05-01  
**Agents:** Leader (direct implementation — subagent lacked Write permissions)  
**Verdict:** APPROVED

## What was built

- `core/models/attendance.model.ts` — `AttendanceLog` interface
- `core/services/attendance.service.ts` — `BehaviorSubject`-based service with `clockIn()`, `clockOut()`, `getTodayLogs()`, `getWeeklyHours()`, `hasLoggedToday()`. 5 mock logs for EMP-001 (Mon–Fri past week).
- `features/employee/attendance/activity-table/activity-table.component.*` — table with Date, Clock In, Clock Out, Break, Total Hours columns. No vertical borders, 1px horizontal dividers, row hover.
- `features/employee/attendance/employee-attendance.component.*` — replaced placeholder. 3 KPI cards (Current Session, Daily Summary, Weekly Balance) + ActivityTable. Variant A (two buttons) when `hasTodayLog`, Variant B (single CTA) when not.

## Acceptance criteria

All 8 passed. `ng build --configuration development` compiles cleanly (0 errors, 0 warnings after cleanup).
