# 34. Production Auth And Security Flows

Auth interviews test browser security and app architecture.

## Token Storage

Access token in memory:

- lower XSS impact
- lost on refresh

localStorage:

- easy persistence
- higher XSS impact

HttpOnly cookie:

- not readable by JavaScript
- requires CSRF strategy for cross-site cookies

## Route Protection

Client guards improve UX.

Server/API authorization is the real security boundary.

Example client guard:

```tsx
function ProtectedRoute({children}: {children: React.ReactNode}) {
  const user = useCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

This must be backed by API authorization.

## Session Expiry Flow

Typical flow:

```text
API returns 401
Try refresh once
Retry original request
If refresh fails, clear session and redirect to login
```

## Refresh Token Coordination

If five requests fail with `401` at the same time, do not fire five refresh requests.

Use one shared refresh promise.

```ts
let refreshPromise: Promise<string> | null = null;

function refreshOnce() {
  refreshPromise ??= refreshAccessToken().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}
```

Other failed requests wait for the same refresh result.

## Logout Cleanup

On logout:

- clear auth state
- clear sensitive cached data
- cancel active requests when possible
- invalidate refresh token on server
- redirect to login
- reset role-based UI state

## XSS And Token Storage

If access tokens are in localStorage, an XSS bug can expose them.

If tokens are in HttpOnly cookies, JavaScript cannot read them, but CSRF must be considered.

There is no perfect storage choice. Explain tradeoffs.

## Senior Best Practices

- avoid infinite refresh loops
- coordinate multiple 401 responses
- protect server routes and APIs
- clear sensitive state on logout
- handle expired sessions gracefully

## Interview Questions

### Is hiding a menu item enough security?

No. Authorization must be enforced on the server/API.

### How should multiple 401 responses be handled?

Coordinate one refresh request and retry failed requests after the new token arrives.

### Where should authorization be enforced?

On the server/API. Client route guards are only UX.
