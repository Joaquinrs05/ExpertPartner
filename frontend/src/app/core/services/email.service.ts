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
      map(({ data }) => (data ?? []).map(row => this.mapRow(row)))
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
      sender: this.parseSender(row['from_address']),
      subject: row['subject'] as string,
      preview: row['preview'] as string,
      category: row['category'] as Email['category'],
      receivedAt: new Date(row['received_at'] as string),
      isRead: row['is_read'] as boolean,
      isStarred: row['is_starred'] as boolean,
      body: row['body'] as string | undefined,
    };
  }

  private parseSender(raw: unknown): string {
    if (typeof raw !== 'string') return String(raw ?? '');
    try {
      const parsed = JSON.parse(raw);
      const first = parsed?.value?.[0];
      return first?.name || first?.address || raw;
    } catch {
      return raw;
    }
  }
}
