# Tasks: Filtered Emails Inbox

**Spec**: `specs/08-filtered-emails/spec.md`
**Skill**: `skills/08-filtered-emails.md`

---

## Phase 1 — Model + Service

- T001 Update `core/models/email.model.ts` — `FilteredEmail` interface with `starred`, `read` fields (merge if exists)
- T002 Update `core/services/email.service.ts` — `getEmails(): Observable<FilteredEmail[]>` with 10–15 mock rows, `toggleStar(id): void`

---

## Phase 2 — Email Screen

- T003 Create `features/admin/emails/email-row/email-row.component.ts` + `.css` — single row: star, sender, badge, subject, preview, time; emits `(starToggle)` event
- T004 Create `features/admin/emails/emails.component.ts` + `.css` — category filter buttons, list of `EmailRowComponent`, client-side filter logic

**Checkpoint**: `/admin/emails` shows full list, filters work, star toggle works.

---

## Dependencies

- T003 depends on T001
- T004 depends on T002, T003
