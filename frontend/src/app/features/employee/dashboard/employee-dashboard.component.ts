import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ClockWidgetComponent } from './clock-widget/clock-widget.component';
import { WeeklyHoursComponent } from './weekly-hours/weekly-hours.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [ClockWidgetComponent, WeeklyHoursComponent, ProfileCardComponent, TranslatePipe],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDashboardComponent {}
