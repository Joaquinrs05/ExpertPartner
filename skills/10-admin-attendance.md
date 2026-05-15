# Skill 10 — Admin Attendance Control

## Goal
Build the `/admin/attendance` screen so admins can monitor every employee's clock-in status for any given day.

## Design Reference
No direct stitch reference. Follow the visual language of `team_management_expert_partner_1` (table style) combined with the KPI cards from `admin_dashboard_expert_partner`.

---

## Route
`/admin/attendance` — protected by `authGuard` + `roleGuard` (admin only). Already declared in `admin.routes.ts` if present; add if missing.

---

## Components to build

### `AdminAttendanceComponent` (page shell)
- Path: `features/admin/attendance/admin-attendance.component.ts/.html/.css`
- Renders KPI cards row + filter bar + attendance table
- Holds filter state: selected date (default today) and selected status

### `AttendanceKpiRowComponent`
- Path: `features/admin/attendance/attendance-kpi-row/`
- Receives a summary object and renders 4 KPI cards:
  - Total empleados
  - Fichados hoy (green accent)
  - Sin fichar (gray accent)
  - Completados (blue accent)
- Reuse `KpiCardComponent` from shared if it accepts a color input; otherwise style inline

### `AttendanceTableComponent`
- Path: `features/admin/attendance/attendance-table/`
- Input: `rows: EmployeeAttendanceRow[]`
- Columns: Avatar + Nombre, ID Empleado, Estado, Hora entrada, Hora salida, Total horas
- Row click toggles an inline expanded section showing the employee's full week (Mon–Sun) as a mini table
- No vertical borders; `--color-row-hover` on hover; sticky `<thead>`

### Status badge
- Reuse `BadgeComponent`. Add three new types if not present:
  - `clocked-in` → green (`--color-emerald` / `--color-success-bg`)
  - `not-clocked` → gray (`--color-muted` / `--color-finance-bg`)
  - `completed` → blue (`--color-lead` / `--color-lead-bg`)

---

## Service changes

### Extend `AttendanceService`
Add method:
```typescript
getTeamAttendance(date: string): Observable<EmployeeAttendanceRow[]>
```
Returns mock array of `EmployeeAttendanceRow` for the given date (ISO string `YYYY-MM-DD`).

### New interface `EmployeeAttendanceRow`
Path: `core/models/attendance.model.ts` (extend existing file)
```typescript
export interface EmployeeAttendanceRow {
  employeeId: string;
  name: string;
  avatarInitials: string;
  status: 'clocked-in' | 'not-clocked' | 'completed';
  clockIn: string | null;    // e.g. '09:02'
  clockOut: string | null;   // e.g. '17:45' or null if still in
  totalHours: number | null; // calculated, null if not clocked
  weekHistory: DayAttendance[];
}

export interface DayAttendance {
  date: string;       // 'YYYY-MM-DD'
  clockIn: string | null;
  clockOut: string | null;
  totalHours: number | null;
}
```

### Mock data — minimum 8 employees, varied states
- 3 clocked-in (have clock-in, no clock-out)
- 2 completed (have both clock-in and clock-out)
- 3 not-clocked (null clock-in, null clock-out)
- Each must have `weekHistory` with 5 days of data

---

## Filter bar
- Date input (`<input type="date">`) — default today
- Status dropdown: All / Fichado / Sin fichar / Completado
- Filtering is client-side inside the component

---

## Sidebar link
Add "Control Horario" entry to the admin nav items in `SidebarComponent` pointing to `/admin/attendance`.

---

## Acceptance Criteria (same as feature_list.json)
1. KPI cards show total, clocked-in, not-clocked, completed counts
2. Table shows avatar, name, employee ID, status badge, clock-in, clock-out, total hours
3. Status badge: Fichado (green), Sin fichar (gray), Completado (blue)
4. Filter by status works client-side
5. Filter by date works (mock returns same data for any date — real filtering comes with backend)
6. Row click expands inline week history
7. Mock data: ≥ 8 employees, varied states
8. `AttendanceService.getTeamAttendance()` method added
9. Table: no vertical borders, row hover, sticky header
10. `/admin/attendance` renders without errors
