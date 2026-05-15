import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Email } from '@core/models/email.model';
import { BadgeComponent, BadgeType } from '@shared/components/badge/badge.component';

const CATEGORY_MAP: Record<Email['category'], BadgeType> = {
  URGENT: 'urgent',
  FINANCE: 'finance',
  UPDATE: 'update',
};

@Component({
  selector: 'app-email-detail-panel',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './email-detail-panel.component.html',
  styleUrl: './email-detail-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailDetailPanelComponent {
  readonly #sanitizer = inject(DomSanitizer);

  email = input<Email | null>(null);
  closed = output<void>();

  badgeType = computed<BadgeType>(() => {
    const e = this.email();
    return e ? CATEGORY_MAP[e.category] : 'update';
  });

  formattedDate = computed<string>(() => {
    const e = this.email();
    if (!e) return '';
    return e.receivedAt.toLocaleString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  });

  safeBody = computed<SafeHtml>(() => {
    const e = this.email();
    const content = e?.body ?? e?.preview ?? '';
    return this.#sanitizer.bypassSecurityTrustHtml(content);
  });

  close(): void {
    this.closed.emit();
  }
}
