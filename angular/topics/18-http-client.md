# 18. HTTP Client

Angular `HttpClient` communicates with backend services.

## Setup

Modern provider:

```ts
import {provideHttpClient} from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
});
```

## GET Request

```ts
import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';

export class UsersService {
  private readonly http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>('/api/users');
  }
}
```

## POST Request

```ts
createUser(user: CreateUserRequest) {
  return this.http.post<User>('/api/users', user);
}
```

## Error Handling

```ts
return this.http.get<User[]>('/api/users').pipe(
  catchError((error) => {
    console.error(error);
    return throwError(() => new Error('Could not load users'));
  }),
);
```

## Interceptors

Functional interceptor:

```ts
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).token();

  const authRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authRequest);
};
```

Provider:

```ts
provideHttpClient(withInterceptors([authInterceptor]));
```

## `httpResource`

Angular also supports reactive HTTP data fetching with `httpResource`.

Use it when HTTP data depends on signals.

```ts
const userId = signal('u1');
const user = httpResource(() => `/api/users/${userId()}`);
```

## Senior Best Practices

- keep HTTP calls in services
- type request and response DTOs
- validate untrusted API data when needed
- use interceptors for auth headers and cross-cutting concerns
- centralize error handling strategy
- avoid subscribing in services unless managing a side effect
- prefer route resolvers or resources when route rendering depends on data

For retries, refresh tokens, upload progress, cancellation, and `HttpContext`, see [Advanced HTTP, Auth, And Production APIs](./39-advanced-http-auth-production.md).

## Interview Questions

### What does `HttpClient` return?

Observables.

### What are interceptors used for?

Auth headers, logging, error handling, request modification, response handling, and retry behavior.

### Why clone requests in interceptors?

HTTP request objects are immutable.
