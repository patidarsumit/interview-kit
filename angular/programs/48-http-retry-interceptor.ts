import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {timer, throwError} from 'rxjs';
import {retry} from 'rxjs/operators';

function shouldRetry(error: unknown) {
  if (!(error instanceof HttpErrorResponse)) {
    return false;
  }

  return (
    error.status === 0 ||
    error.status === 408 ||
    error.status === 429 ||
    error.status >= 500
  );
}

export const retryTemporaryErrorsInterceptor: HttpInterceptorFn = (request, next) => {
  return next(request).pipe(
    retry({
      count: 2,
      delay: (error, retryCount) => {
        if (!shouldRetry(error)) {
          return throwError(() => error);
        }

        return timer(retryCount * 500);
      },
    }),
  );
};
