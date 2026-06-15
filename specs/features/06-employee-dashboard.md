# Skill 06 — Employee Dashboard

## Goal
Build the employee portal home screen with real-time clock, weekly hours, and profile card.

## Status: ⬜ Pending

## Design reference
`stitch_consultancy_operations_hub/.../employee_dashboard_expert_partner/`

## Components

### `features/employee/dashboard/dashboard.component`
- Two-column layout: Time & Attendance card (60%) + Profile card (40%)
- Weekly Hours card below the Time & Attendance card

### `features/employee/dashboard/clock-widget/clock-widget.component`
- Displays current date and live time (updates every second via `setInterval`)
- Status dot: grey = "Currently Clocked Out", green = "Currently On Duty"
- Button: "→ Clock In" (black, full-width) when off duty
- Button changes to "Clock Out" (secondary/outline) when on duty
- On Clock In: updates `AttendanceService`, changes dot to green, button to "Clock Out"
- On Clock Out: inverse

### `features/employee/dashboard/weekly-hours/weekly-hours.component`
- Large number: current hours (e.g., **32.0**) / 40h Target
- `ProgressBarComponent` (black fill, animated)
- "80% of weekly goal reached · 8h remaining" label
- Mock data: 32h worked

### `shared/components/progress-bar/progress-bar.component`
Inputs: `value` (0–100), `color` (default: `--color-navy`)
Animated width transition on mount.

### `features/employee/dashboard/profile-card/profile-card.component`
- Avatar (initials fallback) with "✏ Edit" button overlay
- Name, role, Employee ID (CNS-XXX), Joined Date, Base Office
- "View Full Profile →" ghost button (non-functional for now)

## Output
- `/employee/dashboard` renders with live clock and mock profile data
- Clock In/Out toggles state correctly
