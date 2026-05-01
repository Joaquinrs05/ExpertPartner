import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const requiredRole = route.data['role'] as 'admin' | 'employee';
  if (auth.role() === requiredRole) return true;
  const fallback = auth.role() === 'admin' ? '/admin/dashboard' : '/employee/dashboard';
  return router.createUrlTree([fallback]);
};
