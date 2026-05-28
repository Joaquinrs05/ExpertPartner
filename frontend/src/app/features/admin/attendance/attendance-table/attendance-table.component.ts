import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { EmployeeAttendanceRow } from '@core/models/attendance.model';
import { BadgeComponent, BadgeType } from '@shared/components/badge/badge.component';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';

@Component({
  selector: 'app-attendance-table',
  standalone: true,
  imports: [BadgeComponent, AvatarComponent],
  templateUrl: './attendance-table.component.html',
  styleUrl: './attendance-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceTableComponent {
  rows = input<EmployeeAttendanceRow[]>([]);

  private readonly expandedId = signal<string | null>(null);

  isExpanded(id: string): boolean {
    return this.expandedId() === id;
  }

  toggleRow(id: string): void {
    this.expandedId.update(current => (current === id ? null : id));
  }

  badgeType(status: EmployeeAttendanceRow['status']): BadgeType {
    const map: Record<EmployeeAttendanceRow['status'], BadgeType> = {
      'clocked-in': 'clocked-in',
      'not-clocked': 'not-clocked',
      'completed': 'completed',
    };
    return map[status];
  }

  formatHours(h: number | null): string {
    return h !== null ? `${h}h` : '—';
  }

  formatTime(iso: string | null): string {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(iso: string | null): string {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
}
