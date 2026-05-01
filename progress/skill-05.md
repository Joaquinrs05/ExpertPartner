# skill-05 — Admin Dashboard

**Status:** Completed 2026-05-01  
**Agents:** Implementer + Reviewer (1 review cycle)  
**Verdict:** APPROVED

## What was built

- `shared/pipes/time-ago.pipe.ts` — converts Date to "just now", "X mins ago", "1 hour ago", "Yesterday", etc.
- `shared/pipes/truncate.pipe.ts` — truncates string to N chars with "…" suffix
- `shared/components/badge/badge.component.ts|html|css` — reusable badge with 8 types: urgent, lead, finance, update, clock-in, clock-out, live, total
- `shared/components/kpi-card/kpi-card.component.ts|html|css` — KPI card with title, value, and badge (live/total)
- `features/admin/dashboard/activity-monitor/activity-monitor.component.ts|html|css` — table with Employee, Action badge, Timestamp columns. 8–10 mock rows. "View All Activity →" link.
- `features/admin/dashboard/express-inbox/express-inbox.component.ts|html|css` — 5 mock emails with sender, category badge, subject, truncated preview, relative time. "Open Full Inbox ↗" link.
- `features/admin/dashboard/admin-dashboard.component.ts|html|css` — KPI row + Quick Actions (Add New Employee, Review Filtered Emails) + two-column layout (Activity Monitor 60% + Express Inbox 40%)

## Design tokens added to styles.css

- `--color-success`, `--color-success-bg` — green for Clock In badge
- `--color-update`, `--color-update-bg` — purple for UPDATE badge
- `--color-row-hover` — table row hover (`#f1f5f9`)
- `--color-navy-a04` — very subtle overlay

## Acceptance criteria

All 10 passed on first review. `ng build --configuration development` compiles cleanly.
