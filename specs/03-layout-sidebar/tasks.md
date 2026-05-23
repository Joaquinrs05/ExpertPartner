# Tasks: Layout — Sidebar + Topbar

**Skill**: `skills/03-layout-sidebar.md`

---

## Phase 1 — Layout Shell

- T001 Create `layout/sidebar/sidebar.component.ts` + `.css` — navy background, nav links, active state (4px emerald bar), role-aware nav items
- T002 Create `layout/topbar/topbar.component.ts` + `.css` — search input, notification icon, user avatar
- T003 Create `layout/admin-shell/admin-shell.component.ts` + `.css` — `<app-sidebar>` + `<app-topbar>` + `<router-outlet>`
- T004 Create `layout/employee-shell/employee-shell.component.ts` + `.css` — same structure, employee nav items
- T005 Wire `app.routes.ts` — admin routes render inside `AdminShellComponent`, employee routes inside `EmployeeShellComponent`

**Checkpoint**: Navigating to `/admin/dashboard` shows the sidebar + topbar shell. Same for `/employee/dashboard`.
