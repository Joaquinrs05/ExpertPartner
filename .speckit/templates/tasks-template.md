# Tasks: [FEATURE NAME]

**Spec**: `specs/[##-feature-name]/spec.md`
**Plan**: `specs/[##-feature-name]/plan.md`
**Skill**: `skills/[##-feature-name].md`

---

## Format: `[ID] [P?] Description`

- **[P]** = can run in parallel (different files, no dependency on sibling tasks in same phase)
- Always include exact file paths in task descriptions
- One task = one file created or one meaningful unit of work

---

## Phase 1 — [Phase Name] (Foundational / Setup)

**Purpose**: [What this phase enables.]

- T001 [P] [Description with file path]
- T002 [Description with file path]

**Checkpoint**: [What should be true when this phase is done.]

---

## Phase 2 — [Phase Name] (User Story N)

**Goal**: [What this phase delivers to the user.]

**Independent Test**: [How to verify this phase works on its own.]

- T003 [P] [Description with file path]
- T004 [Description with file path] (depends on T003)

**Checkpoint**: [Specific observable outcome.]

---

## Phase N — Polish & Cross-Cutting

- TXXX [P] Run linting and fix any TypeScript errors
- TXXX Verify mobile layout at 375px
- TXXX Check OnPush is applied to all new components

---

## Dependencies

- T00X depends on T00Y — [reason]
- T00X, T00Y are parallel — [reason they don't conflict]
