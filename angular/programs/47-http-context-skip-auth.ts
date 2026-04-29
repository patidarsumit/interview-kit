import {
  HttpContext,
  HttpContextToken,
  HttpInterceptorFn,
} from '@angular/common/http';
import {inject} from '@angular/core';

class AuthTokenService {
  token() {
    return 'token-value';
  }
}

export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);

export const authWithSkipInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.context.get(SKIP_AUTH)) {
    return next(request);
  }

  const token = inject(AuthTokenService).token();

  if (!token) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};

export function publicRequestOptions() {
  return {
    context: new HttpContext().set(SKIP_AUTH, true),
  };
}

