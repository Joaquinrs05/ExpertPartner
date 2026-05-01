import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type BadgeType =
  | 'urgent'
  | 'lead'
  | 'finance'
  | 'update'
  | 'clock-in'
  | 'clock-out'
  | 'live'
  | 'total';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  type = input<BadgeType>('total');

  label = computed<string>(() => {
    const labels: Record<BadgeType, string> = {
      urgent: 'URGENT',
      lead: 'LEAD GEN',
      finance: 'FINANCE',
      update: 'UPDATE',
      'clock-in': 'Clock In',
      'clock-out': 'Clock Out',
      live: 'LIVE',
      total: 'TOTAL',
    };
    return labels[this.type()];
  });
}
