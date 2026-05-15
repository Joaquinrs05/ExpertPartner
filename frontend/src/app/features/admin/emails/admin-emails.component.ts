import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { EmailService } from '@core/services/email.service';
import { Email } from '@core/models/email.model';
import { EmailRowComponent } from './email-row/email-row.component';
import { EmailDetailPanelComponent } from './email-detail-panel/email-detail-panel.component';

@Component({
  selector: 'app-admin-emails',
  standalone: true,
  imports: [EmailRowComponent, TranslatePipe, EmailDetailPanelComponent],
  templateUrl: './admin-emails.component.html',
  styleUrl: './admin-emails.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminEmailsComponent {
  private readonly emailService = inject(EmailService);

  emails = toSignal(this.emailService.getEmails(), { initialValue: [] as Email[] });
  selectedIds = signal<Set<string>>(new Set());
  selectedEmail = signal<Email | null>(null);

  allSelected = computed(() =>
    this.emails().length > 0 && this.selectedIds().size === this.emails().length
  );

  processedCount = computed(() => this.emails().filter(e => e.isRead).length);

  toggleSelectAll(): void {
    if (this.allSelected()) {
      this.selectedIds.set(new Set());
    } else {
      this.selectedIds.set(new Set(this.emails().map(e => e.id)));
    }
  }

  toggleSelect(id: string): void {
    const next = new Set(this.selectedIds());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.selectedIds.set(next);
  }

  onStarToggle(id: string): void {
    const email = this.emails().find(e => e.id === id);
    if (email) {
      this.emailService.toggleStar(id, email.isStarred).subscribe();
    }
  }

  onRowClick(email: Email): void {
    this.selectedEmail.set(email);
    this.emailService.markAsRead(email.id).subscribe();
  }

  closePanel(): void {
    this.selectedEmail.set(null);
  }
}
