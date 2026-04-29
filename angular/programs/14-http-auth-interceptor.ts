import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';

class AuthTokenService {
  token() {
    return 'token-value';
  }
}

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthTokenService).token();

  if (!token) {
    return next(request);
  }

  const authRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authRequest);
};

