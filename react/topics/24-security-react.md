# 24. Security In React

React helps with some security problems, but it does not make the whole application secure automatically.

Security must be handled in UI, API, backend, headers, deployment, and authentication design.

## XSS Protection

React escapes values rendered in JSX by default.

Safe:

```tsx
function Comment({text}: {text: string}) {
  return <p>{text}</p>;
}
```

If `text` contains:

```html
<script>alert('xss')</script>
```

React renders it as text, not executable script.

## dangerouslySetInnerHTML

This bypasses React's normal escaping.

Dangerous:

```tsx
<div dangerouslySetInnerHTML={{__html: userInput}} />
```

Use it only for trusted or sanitized HTML.

Better:

```tsx
import DOMPurify from 'dompurify';

<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(html)}} />;
```

Senior point:

The name is intentionally scary because it can introduce XSS.

## Token Storage

Access token in memory:

- lower XSS exposure
- lost on refresh
- often paired with refresh cookie

localStorage:

- persists across refresh
- easy to implement
- higher XSS impact if attacker runs JavaScript

HttpOnly cookie:

- not readable by JavaScript
- can be sent automatically
- needs CSRF strategy when cross-site cookies are used

## CSRF vs XSS

XSS:

- attacker runs JavaScript in your app
- can read localStorage
- can act as user

CSRF:

- attacker tricks browser into sending authenticated request
- mainly relevant with cookie-based auth

## Route Protection

Client-side route guards are not security.

They improve UX.

Real authorization must happen on:

- backend APIs
- server-rendered routes
- database/resource access layer

Hiding a button is not enough.

## Secrets In Client Bundle

Never put secrets in React client code.

Anything in a client bundle can be inspected.

Bad:

```ts
const secretKey = 'prod-secret';
```

Use backend/server environment variables for secrets.

## Logout And Session Expiry

On logout:

- clear client auth state
- clear sensitive cached data
- invalidate server session/refresh token
- redirect to login

On `401`:

- try refresh once if supported
- retry original request
- if refresh fails, clear session and redirect

Avoid infinite refresh loops.

## Common Mistakes

- storing sensitive tokens in localStorage without understanding XSS risk
- trusting client route guards
- rendering unsanitized HTML
- leaking secrets to client bundle
- not clearing cached sensitive data on logout
- no CSRF strategy with cookie auth

## Senior Best Practices

- let React escape values by default
- sanitize any trusted HTML boundary
- protect APIs on server
- understand token storage tradeoffs
- use CSP when possible
- clear sensitive state on logout
- validate all data on server
- review third-party scripts

## Interview Questions

### How does React help prevent XSS?

React escapes rendered values in JSX by default.

### Why is `dangerouslySetInnerHTML` risky?

It bypasses React escaping and can execute malicious HTML/JavaScript if input is untrusted.

### Is hiding a route or button enough authorization?

No. Authorization must be enforced on the server/API.

### localStorage vs HttpOnly cookie?

localStorage is easy but exposed to XSS. HttpOnly cookies are not readable by JavaScript but need CSRF planning.

