import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

interface ActivityEntry {
  employee: string;
  action: 'clock-in' | 'clock-out';
  timestamp: Date;
}

const MOCK_ACTIVITY: ActivityEntry[] = [
  { employee: 'Sarah Chen', action: 'clock-in', timestamp: new Date(Date.now() - 3 * 60000) },
  { employee: 'Marcus Reed', action: 'clock-in', timestamp: new Date(Date.now() - 8 * 60000) },
  { employee: 'Priya Nair', action: 'clock-out', timestamp: new Date(Date.now() - 22 * 60000) },
  { employee: 'Tom Vasquez', action: 'clock-in', timestamp: new Date(Date.now() - 45 * 60000) },
  { employee: 'Lena Hoffmann', action: 'clock-out', timestamp: new Date(Date.now() - 75 * 60000) },
  { employee: 'James Okafor', action: 'clock-in', timestamp: new Date(Date.now() - 2 * 3600000) },
  { employee: 'Aiko Suzuki', action: 'clock-out', timestamp: new Date(Date.now() - 4 * 3600000) },
  { employee: 'Diego Morales', action: 'clock-in', timestamp: new Date(Date.now() - 6 * 3600000) },
  { employee: 'Nina Petrov', action: 'clock-out', timestamp: new Date(Date.now() - 26 * 3600000) },
];

@Component({
  selector: 'app-activity-monitor',
  standalone: true,
  imports: [BadgeComponent, TimeAgoPipe, TranslatePipe],
  templateUrl: './activity-monitor.component.html',
  styleUrl: './activity-monitor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityMonitorComponent {
  readonly activity = MOCK_ACTIVITY;
}
