# skill-03 — Layout: Sidebar + Topbar + Shells

**Status:** Completed 2026-05-01  
**Agents:** Implementer + Reviewer (2 review cycles)  
**Verdict:** APPROVED

## What was built
- `SidebarComponent` — standalone, OnPush, signal inputs (`role`, `isOpen`). Admin nav: Dashboard, Emails, Team, Attendance, Settings. Employee nav: Dashboard, Attendance. Employee variant shows user card at bottom. Inline SVG icons.
- `TopbarComponent` — standalone, OnPush, `sidebarToggle = output<void>()`, `userName = input<string>()`, `initials` computed signal. Search input + notifications bell + avatar.
- `AdminShellComponent` — grid layout (sidebar 260px + main flex-grow), topbar 64px, router-outlet.
- `EmployeeShellComponent` — same structure with employee role.
- Placeholder feature components for all admin/employee routes (enables `ng build` to pass).
- `app.routes.ts` updated: shells as parents, feature routes as lazy-loaded children.

## Responsive behavior
- Mobile `< 768px`: sidebar fixed off-screen (`left: -260px`), toggled via `.sidebar--open`
- Tablet `768–1279px`: icon-only at 64px, nav labels hidden
- Desktop `≥ 1280px`: full `var(--sidebar-width)` = 260px

## Review notes
First review **rejected**: hardcoded `#ffffff` and `rgba()` values in sidebar and topbar CSS.  
Fix: added 7 alpha tokens to `styles.css` (`--color-white`, `--color-white-a08/a65/a06/a50`, `--color-emerald-a12/a10`).  
Second review **approved**.

## Acceptance criteria
All 11 passed on second review. `ng build --configuration development` compiles cleanly.
