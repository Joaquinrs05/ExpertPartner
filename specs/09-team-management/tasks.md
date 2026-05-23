# Tasks: Team Management

**Spec**: `specs/09-team-management/spec.md`
**Skill**: `skills/09-team-management.md`

---

## Phase 1 — Model + Service

- T001 Create `core/models/consultant.model.ts` — `Consultant` interface
- T002 Create `core/services/team.service.ts` — `getConsultants(): Observable<Consultant[]>` with 15–20 mock rows

---

## Phase 2 — Team Screen

- T003 Create `features/admin/team/consultant-row/consultant-row.component.ts` + `.css` — single table row: avatar, name, role, department, status badge, EOM (red if past), actions
- T004 Create `features/admin/team/team.component.ts` + `.css` — search input, status filter buttons, paginated table (10/page) using `ConsultantRowComponent`

**Checkpoint**: `/admin/team` shows paginated table, search and filters work.

---

## Dependencies

- T003 depends on T001
- T004 depends on T002, T003
