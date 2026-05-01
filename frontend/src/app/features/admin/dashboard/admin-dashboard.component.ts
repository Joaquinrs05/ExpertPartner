import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KpiCardComponent } from '@shared/components/kpi-card/kpi-card.component';
import { ActivityMonitorComponent } from './activity-monitor/activity-monitor.component';
import { ExpressInboxComponent } from './express-inbox/express-inbox.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, KpiCardComponent, ActivityMonitorComponent, ExpressInboxComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {}
