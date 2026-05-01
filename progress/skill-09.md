# skill-09 — Team Management
**Status:** Completed 2026-05-01
**Agents:** Implementer + Reviewer (1 review cycle)
**Verdict:** APPROVED

## What was built
- `core/models/consultant.model.ts` — Consultant interface with all required fields
- `core/services/team.service.ts` — BehaviorSubject-based service with 15 mock consultants (CNS-001 to CNS-015), `getConsultants()` and `filterConsultants()` methods
- `shared/components/avatar/avatar.component` — Extended with `isOnline = input<boolean>(false)` and `.online-dot` overlay (absolute positioned, green, bottom-right)
- `shared/components/badge/badge.component` — Extended with 6 new badge types: available, project-assigned, on-leave, approved, timesheets-pending, awaiting-review
- `features/admin/team/consultant-row/consultant-row.component` — Standalone table row component with avatar, name/ID, role/level, availability badge, EOM badge, and action buttons
- `features/admin/team/admin-team.component` — Full page with header, filter row (search + role + status selects), paginated table, and pagination footer using signals/computed
- `src/styles.css` — Added `--color-amber` and `--color-amber-bg` tokens for timesheets-pending badge

## Acceptance criteria
All 9 passed.
1. TeamService has 15 mock consultants (CNS-001 to CNS-015)
2. Text search filters by name, role, and employee ID (case-insensitive)
3. Role and status dropdowns filter client-side via reactive computed signals
4. AvatarComponent shows initials with green online dot overlay when isOnline is true
5. Availability badges: Available (green), Project Assigned (blue), On Leave (grey)
6. EOM badges: Approved (green), Timesheets Pending (amber), Awaiting Review (grey)
7. Pagination shows 10 rows per page with correct "Showing X to Y of Z consultants" label
8. Import Excel button only shown when canImport() is true (role === 'admin')
9. /admin/team renders without errors — AdminTeamComponent is a valid standalone OnPush component
