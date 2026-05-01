import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type BadgeType =
  | 'urgent'
  | 'lead'
  | 'finance'
  | 'update'
  | 'clock-in'
  | 'clock-out'
  | 'live'
  | 'total'
  | 'available'
  | 'project-assigned'
  | 'on-leave'
  | 'approved'
  | 'timesheets-pending'
  | 'awaiting-review';

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
      available: 'Available',
      'project-assigned': 'Project Assigned',
      'on-leave': 'On Leave',
      approved: 'Approved ✓',
      'timesheets-pending': 'Timesheets Pending',
      'awaiting-review': 'Awaiting Review ⏳',
    };
    return labels[this.type()];
  });
}
