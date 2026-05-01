import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: 'emails',
    loadComponent: () =>
      import('./emails/admin-emails.component').then(
        (m) => m.AdminEmailsComponent
      ),
  },
  {
    path: 'team',
    loadComponent: () =>
      import('./team/admin-team.component').then(
        (m) => m.AdminTeamComponent
      ),
  },
  {
    path: 'attendance',
    loadComponent: () =>
      import('./attendance/admin-attendance.component').then(
        (m) => m.AdminAttendanceComponent
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/admin-settings.component').then(
        (m) => m.AdminSettingsComponent
      ),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
