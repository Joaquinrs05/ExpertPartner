import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { AttendanceService } from '@core/services/attendance.service';
import { AuthService } from '@core/services/auth.service';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar.component';
import { ActivityTableComponent } from './activity-table/activity-table.component';

@Component({
  selector: 'app-employee-attendance',
  standalone: true,
  imports: [DatePipe, ProgressBarComponent, ActivityTableComponent, TranslatePipe],
  templateUrl: './employee-attendance.component.html',
  styleUrl: './employee-attendance.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeAttendanceComponent {
  private readonly attendanceService = inject(AttendanceService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly employeeId = this.authService.currentUser()?.employeeId ?? 'EMP-001';

  currentTime = signal(new Date());

  allLogs = toSignal(this.attendanceService.logs$, { initialValue: [] });
  hasTodayLog = toSignal(this.attendanceService.hasTodayLog$(this.employeeId), { initialValue: false });
  weeklyWorked = toSignal(this.attendanceService.getWeeklyHours(this.employeeId), { initialValue: 0 });

  hasOpenSession = computed(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    return this.allLogs().some(l => l.date === todayStr && l.clockOut === null);
  });

  todayHoursLabel = computed(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayLogs = this.allLogs().filter(l => l.date === todayStr && l.clockOut !== null);
    const totalMin = todayLogs.reduce((sum, l) => {
      const ms = l.clockOut!.getTime() - l.clockIn.getTime();
      return sum + Math.floor(ms / 60000) - l.breakMinutes;
    }, 0);
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  });

  todayProgressPct = computed(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayLogs = this.allLogs().filter(l => l.date === todayStr && l.clockOut !== null);
    const totalMin = todayLogs.reduce((sum, l) => {
      const ms = l.clockOut!.getTime() - l.clockIn.getTime();
      return sum + Math.floor(ms / 60000) - l.breakMinutes;
    }, 0);
    return Math.min(100, Math.round((totalMin / 480) * 100));
  });

  weeklyRemaining = computed(() => Math.max(0, Math.round((40 - this.weeklyWorked()) * 10) / 10));

  weeklyProgressPct = computed(() => Math.min(100, Math.round((this.weeklyWorked() / 40) * 100)));

  constructor() {
    const id = setInterval(() => this.currentTime.set(new Date()), 1000);
    this.destroyRef.onDestroy(() => clearInterval(id));
  }

  onClockIn(): void {
    this.attendanceService.clockIn(this.employeeId);
  }

  onClockOut(): void {
    this.attendanceService.clockOut(this.employeeId);
  }
}
