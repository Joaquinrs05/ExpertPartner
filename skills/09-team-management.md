# Skill 09 — Team Management

## Goal
Build the consultant database table with filters, pagination, and availability/EOM status badges.

## Status: ⬜ Pending

## Design reference
- With Import Excel: `team_management_expert_partner_1/`
- Without Import Excel: `team_management_expert_partner_2/`

## Components

### `features/admin/team/team.component`
- Page header: "Consultant Database" + `+ New Consultant` (primary) + `📄 Import Excel` (secondary)
- Import Excel button: only shown if current user has `canImport: true` (mock role flag)
- Filter row: text search + Role dropdown + Status dropdown
- `ConsultantRowComponent` table
- Pagination footer

### `features/admin/team/consultant-row/consultant-row.component`
Table columns:

| Column | Content |
|---|---|
| **Consultant** | Avatar (photo or initials) with online dot (green=online), Full name, Employee ID |
| **Role & Level** | Role title + level label (e.g., "L5 - Enterprise") |
| **Availability** | Pill badge: `Available` (green), `Project Assigned` (blue), `On Leave` (grey) |
| **EOM Status** | `Approved ✓` (green), `Timesheets Pending` (amber), `Awaiting Review ⏳` (grey) |
| **Actions** | Edit icon + View icon (non-functional for now) |

Table rules: no vertical borders, 1px horizontal dividers, row hover `#F1F5F9`.

### Filters (client-side)
- Text search: filters by name, role, or employee ID
- Role dropdown: All Roles | Senior Consultant | Associate | Manager | Director
- Status dropdown: All | Available | Project Assigned | On Leave

### Pagination
- Show 10 rows per page
- "Showing X to Y of Z consultants" label
- Previous / page numbers / Next buttons

### `core/services/team.service.ts`
- `BehaviorSubject<Consultant[]>` for consultants
- `getConsultants()` returns observable of mock array
- `filterConsultants(query, role, status)` — filters client-side
- Mock data: 12–15 consultants

### `core/models/consultant.model.ts`
```typescript
interface Consultant {
  id: string;
  employeeId: string;       // CNS-XXX
  fullName: string;
  role: string;
  level: string;            // L1–L5
  avatarUrl: string | null;
  isOnline: boolean;
  availability: 'available' | 'project_assigned' | 'on_leave';
  eomStatus: 'approved' | 'timesheets_pending' | 'awaiting_review';
  currentProject: string | null;
}
```

### `shared/components/avatar/avatar.component`
Input: `name: string`, `avatarUrl: string | null`, `isOnline: boolean`
- Shows image if `avatarUrl` is set, otherwise initials (first + last initial)
- Green dot overlay in bottom-right corner if `isOnline`

## Output
- `/admin/team` renders table with 12+ consultants
- Search and dropdown filters work client-side
- Pagination works
- Import Excel button conditionally shown
