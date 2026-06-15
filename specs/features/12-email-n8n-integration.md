# Skill 12 — Email Integration: n8n → Supabase → Web

## Goal
Connect the n8n workflow "Gestor de Correos Mama" (`dM6OESoQfgw6baJM`) to the Angular email inbox.
n8n classifies emails with AI and saves the relevant ones (factura, consulta, urgente) to Supabase.
The Angular app reads from Supabase — the existing UI (skill-08) stays unchanged.

---

## Part 1 — Supabase: Create the `emails` table

Run this SQL in Supabase SQL Editor:

```sql
create table emails (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  from_address text not null,
  preview text,
  category text not null check (category in ('URGENT', 'FINANCE', 'UPDATE')),
  received_at timestamptz not null default now(),
  is_read boolean not null default false,
  is_starred boolean not null default false,
  draft_id text,
  thread_id text,
  gmail_id text unique
);

alter table emails enable row level security;
create policy "Admins can read emails" on emails for select using (true);
create policy "Service role can insert" on emails for insert with check (true);
create policy "Admins can update emails" on emails for update using (true);
```

Category mapping from n8n classification:
- `urgente` → `URGENT`
- `factura` → `FINANCE`
- `consulta` → `UPDATE`

---

## Part 2 — n8n: Modify the workflow

**Workflow ID:** `dM6OESoQfgw6baJM`

Add a Supabase node after each relevant branch (Factura, Consulta, Urgente). The Spam branch is NOT touched.

### Node to add: "Supabase - Guardar Correo" (one per branch, or one shared node)

**Node type:** `n8n-nodes-base.supabase`  
**Operation:** Insert  
**Table:** `emails`

**Fields to insert (from Gmail trigger data):**
```
subject      → {{ $("Gmail - Recibir Correo").item.json.subject }}
from_address → {{ $("Gmail - Recibir Correo").item.json.from }}
preview      → {{ $("Gmail - Recibir Correo").item.json.text.substring(0, 200) }}
category     → URGENT | FINANCE | UPDATE  (hardcoded per branch)
gmail_id     → {{ $("Gmail - Recibir Correo").item.json.id }}
thread_id    → {{ $("Gmail - Recibir Correo").item.json.threadId }}
received_at  → {{ $("Gmail - Recibir Correo").item.json.date }}
```

For the **Consulta** branch, add the Supabase insert AFTER `Gmail - Crear Borrador` and include:
```
draft_id → {{ $json.id }}   (draft ID returned by Gmail node)
```

**Connection order per branch:**
- Factura: `Switch → Gmail - Archivar Factura → Supabase - Guardar Factura`
- Consulta: `Switch → IA - Redactar Respuesta → Gmail - Crear Borrador → Supabase - Guardar Consulta`
- Urgente: `Switch → Gmail - Reenviar Urgente → Supabase - Guardar Urgente`
- Spam: unchanged

---

## Part 3 — Angular: Update EmailService

**File:** `frontend/src/app/core/services/email.service.ts`

Replace mock data with Supabase reads. Keep the same public API so `EmailRowComponent` and `AdminEmailsComponent` need zero changes.

```typescript
import { Injectable, inject } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { Email } from '@core/models/email.model';

@Injectable({ providedIn: 'root' })
export class EmailService {
  private readonly supabase = inject(SupabaseService).client;

  getEmails(): Observable<Email[]> {
    return from(
      this.supabase
        .from('emails')
        .select('*')
        .order('received_at', { ascending: false })
    ).pipe(
      map(({ data }) => (data ?? []).map(this.mapRow))
    );
  }

  toggleStar(id: string, current: boolean): Observable<void> {
    return from(
      this.supabase.from('emails').update({ is_starred: !current }).eq('id', id)
    ).pipe(map(() => void 0));
  }

  markAsRead(id: string): Observable<void> {
    return from(
      this.supabase.from('emails').update({ is_read: true }).eq('id', id)
    ).pipe(map(() => void 0));
  }

  private mapRow(row: Record<string, unknown>): Email {
    return {
      id: row['id'] as string,
      sender: row['from_address'] as string,
      subject: row['subject'] as string,
      preview: row['preview'] as string,
      category: row['category'] as Email['category'],
      receivedAt: new Date(row['received_at'] as string),
      isRead: row['is_read'] as boolean,
      isStarred: row['is_starred'] as boolean,
    };
  }
}
```

### Update `Email` model if needed
Ensure `core/models/email.model.ts` has `receivedAt: Date` (not string) and `category` typed as `'URGENT' | 'FINANCE' | 'UPDATE'`.

---

## Part 4 — Verify UI compatibility

The existing `AdminEmailsComponent` and `EmailRowComponent` must work without changes.
Check that:
- `BadgeComponent` handles `URGENT`, `FINANCE`, `UPDATE` (already does per skill-08)
- `TimeAgoPipe` accepts `Date` objects (verify)
- `TruncatePipe` is used for preview text

If `TimeAgoPipe` receives strings instead of Dates, update it to accept both.

---

## Acceptance Criteria (same as feature_list.json)
1. Supabase `emails` table exists with correct schema
2. n8n Factura branch saves to Supabase with category='FINANCE'
3. n8n Consulta branch saves to Supabase with category='UPDATE' after draft creation
4. n8n Urgente branch saves to Supabase with category='URGENT' after forwarding
5. Spam branch unchanged
6. `EmailService.getEmails()` reads from Supabase
7. `toggleStar()` and `markAsRead()` update Supabase
8. Email UI renders identically to skill-08
9. No mock data in EmailService
10. `/admin/emails` shows real emails processed by the automation
