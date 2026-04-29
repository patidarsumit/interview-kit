import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

class AuthService {
  isLoggedIn() {
    return true;
  }
}

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.parseUrl('/login');
};

