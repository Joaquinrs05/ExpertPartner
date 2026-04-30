# Screen 04 & 05 — Attendance

**Route:** `/employee/attendance`  
**Design ref:** `attendance_tracking_expert_partner_1/` + `attendance_tracking_expert_partner_2/`  
**Skill:** `skills/07-attendance.md`

## Variant A — Off Duty (has clocked in before today)
Current Session card shows two buttons: `Clock In` + `Clock Out` side by side.

## Variant B — Start of Day (no log for today yet)
Current Session card shows one large CTA: `⊙ Clock In Now`.

## KPI Cards (row of 3)
1. **Current Session** — live time, status, clock in/out buttons
2. **Daily Summary** — Xh Xm / 8h targeted, progress bar
3. **Weekly Balance** — Xh Xm remaining, progress bar, "X.Xh worked this week"

## Recent Activity Table
Columns: Date | Clock In | Clock Out | Break | Total Hours
4–6 rows, no vertical borders, row hover.
