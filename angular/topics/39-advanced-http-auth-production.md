# 39. Advanced HTTP, Auth, And Production APIs

Angular `HttpClient` is simple for CRUD, but interviews often test production behavior around auth, retries, cancellation, and error boundaries.

## Interceptor Ordering

Interceptors run in the order they are provided for outgoing requests.

Responses return through the chain in reverse order.

```ts
provideHttpClient(
  withInterceptors([
    authInterceptor,
    retryInterceptor,
    errorInterceptor,
  ]),
);
```

Senior point:

Put authentication before interceptors that depend on headers. Put final user-facing error handling near the end of the chain.

## `HttpContext`

Use `HttpContext` when a request needs metadata that should not become an HTTP header.

Example use cases:

- skip auth for a public endpoint
- disable global error toast
- enable retry for only some calls
- mark a request as background refresh

```ts
export const SKIP_AUTH = new HttpContextToken(() => false);

this.http.get('/api/public', {
  context: new HttpContext().set(SKIP_AUTH, true),
});
```

## Retry Strategy

Retry is useful for temporary failures, not validation errors.

Usually retry:

- network failures
- `408`
- `429`
- selected `5xx` errors

Usually do not retry:

- `400`
- `401`
- `403`
- `404`
- business validation errors

## Cancellation

Angular HTTP requests are cancellable because they return observables.

```ts
this.search.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((term) => this.http.get('/api/users', {params: {q: term}})),
);
```

`switchMap` cancels the previous request when a new search term arrives.

## Auth Storage Tradeoffs

Access token in memory:

- lower XSS exposure
- lost on refresh
- often paired with refresh token cookie

Access token in local storage:

- survives refresh
- easier to implement
- higher XSS risk

HttpOnly refresh cookie:

- not readable from JavaScript
- needs CSRF strategy if used cross-site
- common in production auth flows

## Refresh Token Flow

Typical flow:

```text
API returns 401
Interceptor pauses failed request
Refresh endpoint gets a new access token
Original request is retried once
If refresh fails, user is logged out
```

Senior point:

Only one refresh request should run at a time. Other failed requests should wait for the same refresh result.

## File Upload Progress

Use `reportProgress` and `observe: 'events'` for upload progress.

```ts
this.http.post('/api/files', formData, {
  reportProgress: true,
  observe: 'events',
});
```

## Senior Best Practices

- keep auth logic out of components
- use `HttpContext` for per-request behavior
- avoid infinite refresh loops
- retry only safe temporary failures
- centralize token refresh coordination
- validate untrusted API data at boundaries when needed
- separate user-facing errors from logging/monitoring errors

Practical examples are available in:

- [HTTP context skip auth](../programs/47-http-context-skip-auth.ts)
- [retry interceptor](../programs/48-http-retry-interceptor.ts)
- [refresh token interceptor](../programs/49-refresh-token-interceptor.ts)
- [session expiry logout flow](../programs/69-session-expiry-logout-flow.ts)

## Interview Questions

### Why use `HttpContext`?

To pass Angular-only request metadata to interceptors without sending it to the server.

### Why should refresh token logic be coordinated?

Multiple simultaneous `401` responses can trigger duplicate refresh calls unless the interceptor shares one refresh operation.

### Should every failed request be retried?

No. Retry only temporary failures. Retrying bad input or unauthorized requests can make the app slower and noisier.
