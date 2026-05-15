import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { AttendanceService } from '@core/services/attendance.service';
import { EmployeeAttendanceRow } from '@core/models/attendance.model';
import { AttendanceTableComponent } from './attendance-table/attendance-table.component';

type StatusFilter = 'all' | 'clocked-in' | 'not-clocked' | 'completed';

@Component({
  selector: 'app-admin-attendance',
  standalone: true,
  imports: [AttendanceTableComponent],
  templateUrl: './admin-attendance.component.html',
  styleUrl: './admin-attendance.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAttendanceComponent {
  private readonly attendanceService = inject(AttendanceService);

  readonly today = new Date().toISOString().slice(0, 10);
  readonly activeDate = signal<string>(this.today);
  readonly activeStatus = signal<StatusFilter>('all');

  private readonly allRows = toSignal(
    toObservable(this.activeDate).pipe(
      switchMap(date => this.attendanceService.getTeamAttendance(date))
    ),
    { initialValue: [] as EmployeeAttendanceRow[] }
  );

  readonly filteredRows = computed<EmployeeAttendanceRow[]>(() => {
    const status = this.activeStatus();
    const rows = this.allRows();
    return status === 'all' ? rows : rows.filter(r => r.status === status);
  });

  readonly kpis = computed(() => {
    const rows = this.allRows();
    return {
      total: rows.length,
      clockedIn: rows.filter(r => r.status === 'clocked-in').length,
      notClocked: rows.filter(r => r.status === 'not-clocked').length,
      completed: rows.filter(r => r.status === 'completed').length,
    };
  });

  onDateChange(event: Event): void {
    this.activeDate.set((event.target as HTMLInputElement).value);
  }

  onStatusChange(event: Event): void {
    this.activeStatus.set((event.target as HTMLSelectElement).value as StatusFilter);
  }
}
