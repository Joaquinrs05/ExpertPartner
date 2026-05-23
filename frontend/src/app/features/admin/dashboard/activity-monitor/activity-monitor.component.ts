import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { TranslatePipe } from '@ngx-translate/core';
import { AttendanceService } from '@core/services/attendance.service';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

interface ActivityEntry {
  employee: string;
  action: 'clock-in' | 'clock-out';
  timestamp: Date;
}

@Component({
  selector: 'app-activity-monitor',
  standalone: true,
  imports: [AsyncPipe, BadgeComponent, TimeAgoPipe, TranslatePipe],
  templateUrl: './activity-monitor.component.html',
  styleUrl: './activity-monitor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityMonitorComponent {
  private readonly attendanceService = inject(AttendanceService);

  readonly activity$ = this.attendanceService.logs$.pipe(
    map(logs => {
      const entries: ActivityEntry[] = [];
      for (const log of logs) {
        entries.push({ employee: log.employeeId, action: 'clock-in', timestamp: log.clockIn });
        if (log.clockOut) {
          entries.push({ employee: log.employeeId, action: 'clock-out', timestamp: log.clockOut });
        }
      }
      return entries.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 9);
    })
  );
}
