# 17. Security In Node.js

Security is a senior Node.js responsibility.

Node.js apps often sit directly behind APIs, databases, queues, and external services, so mistakes are costly.

## Input Validation

Never trust:

- body
- query
- params
- headers
- cookies

Validate all external input.

## Injection

SQL injection:

```js
// bad
const sql = `SELECT * FROM users WHERE email = '${email}'`;
```

Use parameterized queries.

```js
await pool.query('SELECT * FROM users WHERE email = $1', [email]);
```

## XSS

APIs can still contribute to XSS if they store or return unsafe HTML.

Sanitize where needed and encode in UI.

## CORS

CORS controls which browser origins can read responses.

Do not use:

```js
origin: '*'
```

with credentials.

## Rate Limiting

Use rate limiting for:

- login
- OTP
- password reset
- public APIs
- expensive endpoints

## Helmet

Helmet sets useful HTTP security headers.

```js
app.use(helmet());
```

## Secrets

Never commit:

- API keys
- JWT secrets
- database passwords
- private keys

Use environment/secret managers.

## SSRF

Server-side request forgery happens when attackers make your server request internal/private URLs.

Validate outbound URLs if users can influence them.

## Dependency Security

Risk comes from npm dependencies too.

Use:

- lock files
- dependency review
- updates
- minimal packages
- vulnerability scanning

## Common Mistakes

- no validation
- raw SQL strings
- open CORS
- no rate limiting
- secrets in git
- unsafe file uploads
- exposing stack traces
- trusting JWT payload without verification

## Senior Best Practices

- validate input
- parameterize queries
- use Helmet/security headers
- configure CORS strictly
- rate limit sensitive endpoints
- protect secrets
- sanitize file uploads
- audit dependencies
- log security events safely

## Interview Questions

### How do you prevent SQL injection?

Use parameterized queries or ORM parameter binding, never raw string interpolation.

### What is SSRF?

An attack where the server is tricked into making requests to internal or protected resources.

### Why is open CORS dangerous with credentials?

It can allow untrusted origins to read authenticated responses.

