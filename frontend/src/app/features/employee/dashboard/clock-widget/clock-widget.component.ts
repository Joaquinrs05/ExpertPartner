import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { AttendanceService } from '@core/services/attendance.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-clock-widget',
  standalone: true,
  imports: [DatePipe, TranslatePipe],
  templateUrl: './clock-widget.component.html',
  styleUrl: './clock-widget.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockWidgetComponent {
  private readonly attendanceService = inject(AttendanceService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly employeeId = this.authService.currentUser()?.employeeId ?? 'EMP-001';

  currentTime = signal(new Date());
  isOnDuty = toSignal(this.attendanceService.hasOpenSession$(this.employeeId), { initialValue: false });

  constructor() {
    const id = setInterval(() => this.currentTime.set(new Date()), 1000);
    this.destroyRef.onDestroy(() => clearInterval(id));
  }

  toggleClock(): void {
    if (this.isOnDuty()) {
      this.attendanceService.clockOut(this.employeeId);
    } else {
      this.attendanceService.clockIn(this.employeeId);
    }
  }
}
