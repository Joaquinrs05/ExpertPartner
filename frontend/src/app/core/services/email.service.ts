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
      body: row['body'] as string | undefined,
    };
  }
}
