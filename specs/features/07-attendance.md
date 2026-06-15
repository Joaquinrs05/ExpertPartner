# Skill 07 — Attendance Screen

## Goal
Build the full attendance page with KPI session cards and recent activity table. Handles two variants based on daily state.

## Status: ⬜ Pending

## Design reference
- Variant 1 (off duty, two buttons): `attendance_tracking_expert_partner_1/`
- Variant 2 (start of day, one CTA): `attendance_tracking_expert_partner_2/`

## Components

### `features/employee/attendance/attendance.component`
Top row: 3 KPI cards side by side.

**Card 1 — Current Session**
- Large time display: current time (live, updates every second)
- Status label: "Off Duty" / "On Duty" / "On Break"
- **Variant A** (has clocked in today before): two buttons — `Clock In` (primary) + `Clock Out` (secondary)
- **Variant B** (first clock-in of the day): single large CTA `⊙ Clock In Now`
- Logic: check if any log exists for today in `AttendanceService`

**Card 2 — Daily Summary**
- `Xh Xm / 8h targeted`
- `ProgressBarComponent` (empty at day start)
- Calculates total from today's logs

**Card 3 — Weekly Balance**
- `Xh Xm remaining`
- `ProgressBarComponent` (partial, based on mock data)
- "X.Xh worked this week" label

### `features/employee/attendance/activity-table/activity-table.component`
Title: "Recent Activity"
Table columns: Date | Clock In | Clock Out | Break | Total Hours

- No vertical borders, 1px horizontal dividers
- Row hover: `#F1F5F9`
- 4–6 mock rows in `AttendanceService`
- Formats times as `HH:MM AM/PM`

### `core/services/attendance.service.ts`
- `BehaviorSubject<AttendanceLog[]>` for logs
- `clockIn(employeeId)` — adds a new log entry with `clock_in` timestamp
- `clockOut(employeeId)` — updates last open log with `clock_out`
- `getTodayLogs(employeeId)` — filters logs by today's date
- `getWeeklyHours(employeeId)` — sums total hours for current week
- Mock data: 4–6 past attendance logs

### `core/models/attendance.model.ts`
```typescript
interface AttendanceLog {
  id: string;
  employeeId: string;
  date: string;         // YYYY-MM-DD
  clockIn: Date;
  clockOut: Date | null;
  breakMinutes: number;
  status: 'on_duty' | 'off_duty' | 'on_break';
}
```

## Output
- `/employee/attendance` renders both card variants based on daily state
- Clock In/Out persists in service (in-memory, resets on refresh)
