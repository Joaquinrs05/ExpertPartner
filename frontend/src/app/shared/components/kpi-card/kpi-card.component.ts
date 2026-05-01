import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiCardComponent {
  title = input<string>('');
  value = input<string>('');
  badgeType = input<'live' | 'total'>('total');
}
