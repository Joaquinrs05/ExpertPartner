# Screen 06 — Team Management

**Route:** `/admin/team`  
**Design ref:** `team_management_expert_partner_1/` + `team_management_expert_partner_2/`  
**Skill:** `skills/09-team-management.md`

## Layout
Full-width page with header, filter row, table, and pagination.

## Header
"Consultant Database" + `+ New Consultant` (primary) + `📄 Import Excel` (secondary, conditional)

## Filters
- Search input (name / role / ID)
- Role dropdown
- Status dropdown

## Table Columns
Avatar+Name+ID | Role & Level | Availability | EOM Status | Actions

## Availability Badges
- Available → green pill
- Project Assigned → blue pill
- On Leave → grey pill

## EOM Status
- Approved ✓ → green text
- Timesheets Pending → amber text
- Awaiting Review ⏳ → grey text

## Pagination
"Showing 1 to 10 of 128 consultants" + page buttons
