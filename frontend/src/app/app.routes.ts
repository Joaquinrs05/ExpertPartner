import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { roleGuard } from '@core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./layout/admin-shell/admin-shell.component').then(
        (m) => m.AdminShellComponent
      ),
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.adminRoutes),
  },
  {
    path: 'employee',
    loadComponent: () =>
      import('./layout/employee-shell/employee-shell.component').then(
        (m) => m.EmployeeShellComponent
      ),
    canActivate: [authGuard, roleGuard],
    data: { role: 'employee' },
    loadChildren: () =>
      import('./features/employee/employee.routes').then((m) => m.employeeRoutes),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
