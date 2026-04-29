# 18. CORS, Cookies, Sessions, And CSRF

Browser security topics are common in Node.js API interviews.

## CORS

CORS controls whether browser JavaScript from one origin can read responses from another origin.

Example:

```js
app.use(cors({
  origin: 'https://app.example.com',
  credentials: true,
}));
```

Do not use wildcard origin with credentials.

## Cookies

Important cookie flags:

- `httpOnly`: JavaScript cannot read cookie
- `secure`: sent only over HTTPS
- `sameSite`: controls cross-site sending
- `maxAge`/`expires`: lifetime

Example:

```js
response.cookie('session', value, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
});
```

## Sessions

Session flow:

```text
login
server creates session
browser stores session cookie
request sends cookie
server reads session
```

Use Redis or database for shared session storage in multi-instance deployments.

## CSRF

CSRF tricks a browser into sending authenticated cookie-based requests.

Defenses:

- SameSite cookies
- CSRF tokens
- checking origin/referer for sensitive requests
- not using cookies for cross-site APIs unless needed

## JWT In Cookies

JWT can be stored in cookies, but cookie security still matters.

HttpOnly protects from JavaScript token theft but does not automatically solve CSRF.

## Common Mistakes

- `origin: '*'` with credentials
- missing `httpOnly`
- missing `secure` in production
- no CSRF strategy with cookie auth
- storing sessions in memory in multi-instance production
- confusing CORS with authentication

## Senior Best Practices

- configure CORS narrowly
- use secure cookie flags
- choose SameSite intentionally
- use shared session store
- add CSRF protection for cookie-auth mutations
- test auth flows from real frontend origin

## Interview Questions

### What is CORS?

A browser mechanism that controls cross-origin response access by frontend JavaScript.

### What is CSRF?

An attack where a browser is tricked into sending authenticated requests using cookies.

### Does HttpOnly cookie prevent CSRF?

No. It prevents JavaScript reading the cookie, but CSRF still needs protection.

