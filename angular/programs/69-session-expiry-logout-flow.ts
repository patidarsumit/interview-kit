import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';

class AuthSessionService {
  clearSession() {
    localStorage.removeItem('access_token');
  }
}

export const sessionExpiryInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthSessionService);
  const router = inject(Router);

  return next(request).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        auth.clearSession();
        router.navigate(['/login'], {
          queryParams: {expired: true},
        });
      }

      return throwError(() => error);
    }),
  );
};

