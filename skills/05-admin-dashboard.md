# Skill 05 — Admin Dashboard

## Goal
Build the main admin dashboard with KPI cards, activity monitor table, and express inbox.

## Status: ⬜ Pending

## Design reference
`stitch_consultancy_operations_hub/.../admin_dashboard_expert_partner/`

## Components

### `features/admin/dashboard/dashboard.component`
- Two-column layout: Activity Monitor (60%) + Express Inbox (40%)
- KPI row at top

### `shared/components/kpi-card/kpi-card.component`
Inputs: `title`, `value`, `badge`, `badgeType` ('total' | 'live')

Two cards:
- **Total Active Employees** — value: 128, badge: `TOTAL` (grey)
- **Currently Working** — value: "42 / 128 online", badge: `LIVE` (green, pulsing)

LIVE badge animation:
```css
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
```

**Quick Actions row:**
- `+ Add New Employee` (emerald primary button)
- `≡ Review Filtered Emails` (secondary button, navigates to /admin/emails)

### `features/admin/dashboard/activity-monitor/activity-monitor.component`
- Table: no vertical borders, 1px horizontal dividers
- Columns: Employee name, Action badge (Clock In green / Clock Out red), Timestamp
- Uses `TimeAgoPipe` for timestamps
- "View All Activity →" link at bottom
- Mock data: 8–10 rows

### `features/admin/dashboard/express-inbox/express-inbox.component`
- List of 4–5 mock emails
- Each row: sender name, category badge, subject, preview (truncated), relative time
- Uses `TruncatePipe` and `TimeAgoPipe`
- "Open Full Inbox ↗" link at bottom

### `shared/components/badge/badge.component`
Input: `type` ('urgent' | 'lead' | 'finance' | 'update' | 'clock-in' | 'clock-out' | 'live' | 'total')
Applies correct background and text color from tokens.

### `shared/pipes/time-ago.pipe.ts`
Converts a Date to "X mins ago", "1 hour ago", "Yesterday", etc.

### `shared/pipes/truncate.pipe.ts`
Truncates a string to N chars and appends "…".

## Output
- `/admin/dashboard` fully renders with mock data
