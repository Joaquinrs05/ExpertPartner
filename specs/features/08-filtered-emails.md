# Skill 08 — Filtered Emails

## Goal
Build the admin email inbox with category badges, star toggle, and multi-select toolbar.

## Status: ⬜ Pending

## Design reference
`stitch_consultancy_operations_hub/.../filtered_emails_expert_partner/`

## Components

### `features/admin/emails/emails.component`
- Toolbar: select-all checkbox + "45 Processed" counter
- Flat list of email rows (no sidebar/panels)
- Uses `EmailService` for mock data

### `features/admin/emails/email-row/email-row.component`
Each row contains:
- Checkbox (individual select)
- Star icon (☆/★) — toggleable, calls `EmailService.toggleStar(id)`
- Sender name (bold if unread)
- Category badge (`BadgeComponent` with type: 'urgent' | 'lead' | 'finance' | 'update')
- Subject line
- Preview text (truncated with `TruncatePipe`)
- Relative timestamp (`TimeAgoPipe`)
- Row hover: `#F1F5F9` background
- Unread rows: slightly bolder sender name + white background; read rows: slightly dimmed

### `core/services/email.service.ts`
- `BehaviorSubject<FilteredEmail[]>` for emails
- `toggleStar(id)` — flips `isStarred`
- `markAsRead(id)` — flips `isRead`
- Mock data: 8–10 emails across all categories (URGENT, LEAD_GEN, FINANCE, UPDATE)

### `core/models/email.model.ts`
```typescript
interface FilteredEmail {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  preview: string;
  category: 'URGENT' | 'LEAD_GEN' | 'FINANCE' | 'UPDATE';
  isStarred: boolean;
  isRead: boolean;
  receivedAt: Date;
}
```

## Mock data examples
| Sender | Category | Subject |
|---|---|---|
| Sarah Jenkins, Acme Corp | LEAD_GEN | Q3 Consulting Inquiry - Strategic Planning |
| David Chen | URGENT | Contract Revisions Needed ASAP |
| Billing Dept | FINANCE | Invoice #88492 - Paid |
| Internal HR | UPDATE | Team offsite confirmed for June |

## Output
- `/admin/emails` renders full email list with correct badges and star toggles
