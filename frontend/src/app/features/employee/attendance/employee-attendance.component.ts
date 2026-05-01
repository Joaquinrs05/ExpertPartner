import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AttendanceService } from '@core/services/attendance.service';
import { AuthService } from '@core/services/auth.service';
import { AttendanceLog } from '@core/models/attendance.model';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar.component';
import { ActivityTableComponent } from './activity-table/activity-table.component';

@Component({
  selector: 'app-employee-attendance',
  standalone: true,
  imports: [DatePipe, ProgressBarComponent, ActivityTableComponent],
  templateUrl: './employee-attendance.component.html',
  styleUrl: './employee-attendance.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeAttendanceComponent implements OnInit {
  private readonly attendanceService = inject(AttendanceService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  private get employeeId(): string {
    return this.authService.currentUser()?.employeeId ?? 'EMP-001';
  }

  currentTime = signal(new Date());
  hasTodayLog = signal(false);
  allLogs = signal<AttendanceLog[]>([]);
  weeklyWorked = signal(0);

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

  weeklyRemaining = computed(() => {
    const r = 40 - this.weeklyWorked();
    return Math.max(0, Math.round(r * 10) / 10);
  });

  weeklyProgressPct = computed(() => {
    return Math.min(100, Math.round((this.weeklyWorked() / 40) * 100));
  });

  ngOnInit(): void {
    this.refreshState();

    const id = setInterval(() => this.currentTime.set(new Date()), 1000);
    this.destroyRef.onDestroy(() => clearInterval(id));

    this.attendanceService.logs$.subscribe(logs => {
      this.allLogs.set(logs);
      this.hasTodayLog.set(this.attendanceService.hasLoggedToday(this.employeeId));
    });

    this.attendanceService.getWeeklyHours(this.employeeId).subscribe(h => {
      this.weeklyWorked.set(h);
    });
  }

  onClockIn(): void {
    this.attendanceService.clockIn(this.employeeId);
    this.hasTodayLog.set(true);
    this.refreshWeekly();
  }

  onClockOut(): void {
    this.attendanceService.clockOut(this.employeeId);
    this.refreshWeekly();
  }

  private refreshState(): void {
    this.allLogs.set(this.attendanceService.getLogsSnapshot());
    this.hasTodayLog.set(this.attendanceService.hasLoggedToday(this.employeeId));
  }

  private refreshWeekly(): void {
    this.attendanceService.getWeeklyHours(this.employeeId).subscribe(h => {
      this.weeklyWorked.set(h);
    });
  }
}
