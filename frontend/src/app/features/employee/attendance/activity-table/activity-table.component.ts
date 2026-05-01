import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AttendanceLog } from '@core/models/attendance.model';

@Component({
  selector: 'app-activity-table',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './activity-table.component.html',
  styleUrl: './activity-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityTableComponent {
  logs = input<AttendanceLog[]>([]);

  totalHours(log: AttendanceLog): string {
    if (!log.clockOut) return '—';
    const ms = log.clockOut.getTime() - log.clockIn.getTime();
    const totalMin = Math.floor(ms / 60000) - log.breakMinutes;
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
}
