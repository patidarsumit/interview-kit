import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  switchMap,
  take,
  throwError,
} from 'rxjs';

class AuthSessionService {
  accessToken() {
    return 'access-token';
  }

  refreshAccessToken() {
    return new BehaviorSubject('new-access-token').asObservable();
  }

  logout() {}
}

let refreshing = false;
const refreshedToken$ = new BehaviorSubject<string | null>(null);

export const refreshTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthSessionService);
  const token = auth.accessToken();

  const authRequest = token
    ? request.clone({setHeaders: {Authorization: `Bearer ${token}`}})
    : request;

  return next(authRequest).pipe(
    catchError((error) => {
      if (!(error instanceof HttpErrorResponse) || error.status !== 401) {
        return throwError(() => error);
      }

      if (refreshing) {
        return refreshedToken$.pipe(
          filter((value): value is string => value !== null),
          take(1),
          switchMap((newToken) =>
            next(
              request.clone({
                setHeaders: {Authorization: `Bearer ${newToken}`},
              }),
            ),
          ),
        );
      }

      refreshing = true;
      refreshedToken$.next(null);

      return auth.refreshAccessToken().pipe(
        take(1),
        switchMap((newToken) => {
          refreshedToken$.next(newToken);
          return next(
            request.clone({
              setHeaders: {Authorization: `Bearer ${newToken}`},
            }),
          );
        }),
        catchError((refreshError) => {
          auth.logout();
          return throwError(() => refreshError);
        }),
        finalize(() => {
          refreshing = false;
        }),
      );
    }),
  );
};
