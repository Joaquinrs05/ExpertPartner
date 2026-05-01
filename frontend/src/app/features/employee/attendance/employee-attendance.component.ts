import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-employee-attendance',
  standalone: true,
  imports: [],
  template: `<p>Employee Attendance — coming soon</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeAttendanceComponent {}
