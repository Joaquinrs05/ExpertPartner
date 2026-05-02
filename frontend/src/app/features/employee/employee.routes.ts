import { Routes } from '@angular/router';

export const employeeRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/employee-dashboard.component').then(
        (m) => m.EmployeeDashboardComponent
      ),
  },
  {
    path: 'attendance',
    loadComponent: () =>
      import('./attendance/employee-attendance.component').then(
        (m) => m.EmployeeAttendanceComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/employee-profile.component').then(
        (m) => m.EmployeeProfileComponent
      ),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
