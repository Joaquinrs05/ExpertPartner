# Agent History — ExpertPartner

> Changelog of all actions taken by agents. Each entry records what was done, which agent did it, and the outcome.

---

## Format

```
### [YYYY-MM-DD] Agent: <agent-name> | Feature: <feature-id>
**Action:** What was done
**Files changed:** List of created/modified files
**Outcome:** Result or observations
```

---

## Log

### [2026-05-16] Agent: leader + implementer | Feature: skill-12
**Action:** Connected n8n workflow "Gestor de Correos Mama" (dM6OESoQfgw6baJM) to Supabase. Added 3 Supabase insert nodes (Guardar Factura/Consulta/Urgente) to the workflow. Updated Angular EmailService to read from Supabase `emails` table instead of mock data. Supabase `emails` table created manually by user via SQL Editor.
**Files changed:** `core/models/email.model.ts` (renamed FilteredEmail→Email, removed LEAD_GEN), `core/services/email.service.ts` (mock replaced by Supabase), `features/admin/emails/email-row/email-row.component.ts` (updated model import), `features/admin/emails/admin-emails.component.ts` (uses getEmails() observable). n8n workflow updated via MCP with 3 new Supabase nodes (credential: "Supabase account", auto-assigned).
**Outcome:** All 10 acceptance criteria met. Spam branch unchanged. UI identical to skill-08. No mock data in EmailService.

---

### [2026-05-02] Agent: leader (direct) + implementer | Feature: skill-08 + skill-09 (parallel)
**Action:** Built Filtered Emails (EmailService, EmailModel, EmailRowComponent, AdminEmailsComponent) and Team Management (TeamService, ConsultantModel, ConsultantRowComponent, AdminTeamComponent). Subagent implemented skill-09 fully; skill-08 implemented directly by Leader (subagent lacked Write permissions). AvatarComponent extended with `isOnline` dot overlay. BadgeComponent extended with 6 new types (availability + EOM). Amber tokens added to styles.css.
**Files changed:** `core/models/email.model.ts`, `core/services/email.service.ts`, `features/admin/emails/admin-emails.*`, `features/admin/emails/email-row/*`, `core/models/consultant.model.ts`, `core/services/team.service.ts`, `features/admin/team/admin-team.*`, `features/admin/team/consultant-row/*`, `shared/components/avatar/*` (extended), `shared/components/badge/*` (extended), `styles.css` (--color-amber, --color-amber-bg)
**Outcome:** All 8 criteria passed (skill-08) and all 9 criteria passed (skill-09). `ng build` compiles cleanly — 0 errors, 0 warnings.

---

### [2026-05-01] Agent: leader (direct) | Feature: skill-07
**Action:** Built AttendanceService (BehaviorSubject, clockIn/clockOut/getTodayLogs/getWeeklyHours), AttendanceLog model, ActivityTableComponent, and EmployeeAttendanceComponent (Variant A/B, 3 KPI cards). Subagent lacked Write permissions so Leader implemented directly.
**Files changed:** `core/models/attendance.model.ts`, `core/services/attendance.service.ts`, `features/employee/attendance/employee-attendance.*`, `features/employee/attendance/activity-table/*`
**Outcome:** All 8 acceptance criteria passed. `ng build` compiles cleanly (0 errors, 0 warnings).

---

### [2026-05-01] Agent: implementer + reviewer | Feature: skill-05 + skill-06 (parallel)
**Action:** Built Admin Dashboard (KpiCard, ActivityMonitor, ExpressInbox, Badge, TimeAgoPipe, TruncatePipe) and Employee Dashboard (ClockWidget, WeeklyHours, ProfileCard, Avatar, ProgressBar) in parallel. Both sets of components replace skill-03 placeholders.
**Files changed:** `shared/pipes/time-ago.pipe.ts`, `shared/pipes/truncate.pipe.ts`, `shared/components/badge/*`, `shared/components/kpi-card/*`, `shared/components/avatar/*`, `shared/components/progress-bar/*`, `features/admin/dashboard/admin-dashboard.*`, `features/admin/dashboard/activity-monitor/*`, `features/admin/dashboard/express-inbox/*`, `features/employee/dashboard/employee-dashboard.*`, `features/employee/dashboard/clock-widget/*`, `features/employee/dashboard/weekly-hours/*`, `features/employee/dashboard/profile-card/*`, `styles.css` (6 new tokens: --color-success, --color-success-bg, --color-update, --color-update-bg, --color-row-hover, --color-navy-a04)
**Outcome:** All 10 criteria passed (skill-05) and all 8 criteria passed (skill-06). Both reviewers approved on first pass. `ng build` compiles cleanly.

---

### [2026-05-01] Agent: implementer + reviewer | Feature: skill-04
**Action:** Built AuthService (signals, no BehaviorSubject), authGuard, roleGuard, LoginComponent, RegisterComponent (scope extended from original — register was not in feature_list but requested by user). All criteria passed on first review.
**Files changed:** `core/models/user.model.ts`, `core/services/auth.service.ts`, `core/guards/auth.guard.ts`, `core/guards/role.guard.ts`, `features/auth/login/*` (updated), `features/auth/register/*` (new), `features/auth/auth.routes.ts`, `app.routes.ts`
**Outcome:** All 11 acceptance criteria passed. Reviewer approved first pass. `ng build` compiles cleanly.
**Outcome:** `ng build --configuration development` passes with 0 errors. All guard logic, session persistence, and form validation implemented.

---

### [2026-05-01] Agent: implementer + reviewer | Feature: skill-03
**Action:** Built SidebarComponent, TopbarComponent, AdminShellComponent, EmployeeShellComponent with responsive layout. Reviewer rejected first pass (hardcoded `#ffffff` and `rgba()` color values). Fixed by adding 7 alpha tokens to `styles.css` and replacing all hardcoded values. Second review approved.
**Files changed:** `layout/sidebar/*`, `layout/topbar/*`, `layout/admin-shell/*`, `layout/employee-shell/*`, `features/admin/*/` (placeholders), `features/employee/*/` (placeholders), `app.routes.ts`, `admin.routes.ts`, `employee.routes.ts`, `styles.css` (7 new alpha tokens: `--color-white`, `--color-white-a08/a65/a06/a50`, `--color-emerald-a12/a10`)
**Outcome:** All 11 acceptance criteria passed on second review. `ng build` compiles cleanly.

---

### [2026-05-01] Agent: implementer + reviewer | Feature: skill-02
**Action:** Expanded `styles.css` with full typography scale, border-radius tokens, shadow token, font-family token, badge variants, `.input-focus`, `.badge-live` with pulse animation, and completed utility class implementations.
**Files changed:** `frontend/src/styles.css`
**Outcome:** All 11 acceptance criteria passed. Reviewer approved. `ng build` compiles cleanly.

---

### [2026-05-01] Agent: implementer + reviewer | Feature: skill-01
**Action:** Initialized Angular 17+ project inside `frontend/`. Configured tsconfig strict mode and path aliases, wired up CSS design tokens, loaded Inter font, set up lazy-loaded routing.
**Files changed:** `frontend/` (ng new), `tsconfig.json`, `src/styles.css`, `src/index.html`, `app.routes.ts`, `app.config.ts`, `app.ts`, `app.html`, feature route files, login placeholder component, full folder structure under `src/app/`
**Outcome:** All 7 acceptance criteria passed. Reviewer approved. `ng build` compiles cleanly.

---

### [2026-04-30] Agent: human | Feature: setup
**Action:** Created project scaffolding — CLAUDE.md, structure.md, skills/ (9 files), docs/, feature_list.json, history.md, current.md, progress/, .agents/
**Files changed:** All project meta files
**Outcome:** Project fully scaffolded and ready to begin skill-01
