import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Email } from '@core/models/email.model';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { TruncatePipe } from '@shared/pipes/truncate.pipe';

type BadgeType = 'urgent' | 'finance' | 'update';

const CATEGORY_MAP: Record<Email['category'], BadgeType> = {
  URGENT: 'urgent',
  FINANCE: 'finance',
  UPDATE: 'update',
};

@Component({
  selector: 'app-email-row',
  standalone: true,
  imports: [BadgeComponent, TimeAgoPipe, TruncatePipe],
  templateUrl: './email-row.component.html',
  styleUrl: './email-row.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailRowComponent {
  email = input.required<Email>();

  starToggled = output<string>();
  rowClicked = output<Email>();
  checkboxChanged = output<string>();

  badgeType = computed<BadgeType>(() => CATEGORY_MAP[this.email().category]);
}
