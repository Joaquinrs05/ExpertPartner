import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FilteredEmail } from '@core/models/email.model';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { TruncatePipe } from '@shared/pipes/truncate.pipe';

type BadgeType = 'urgent' | 'lead' | 'finance' | 'update';

const CATEGORY_MAP: Record<FilteredEmail['category'], BadgeType> = {
  URGENT: 'urgent',
  LEAD_GEN: 'lead',
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
  email = input.required<FilteredEmail>();

  starToggled = output<string>();
  rowClicked = output<string>();
  checkboxChanged = output<string>();

  badgeType = computed<BadgeType>(() => CATEGORY_MAP[this.email().category]);
}
