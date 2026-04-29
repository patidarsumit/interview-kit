# 16. Authentication And Authorization

Authentication asks:

> Who are you?

Authorization asks:

> What are you allowed to do?

## Password Hashing

Never store plain passwords.

Use:

- bcrypt
- argon2

```js
const hash = await bcrypt.hash(password, 12);
const valid = await bcrypt.compare(password, hash);
```

## Sessions

Session auth stores session data on the server or in a session store.

Client receives a session cookie.

Good for:

- traditional web apps
- server-rendered apps
- centralized logout

## JWT

JWT stores claims in a signed token.

Good for:

- stateless API auth
- microservice verification
- short-lived access tokens

Senior warning:

JWT is not automatically more secure. Token storage, expiry, revocation, and refresh flow matter.

## Access Token And Refresh Token

Typical flow:

```text
login -> access token + refresh token
API uses access token
access token expires
refresh token gets new access token
refresh fails -> logout
```

Access tokens should be short-lived.

Refresh tokens should be protected and rotated.

## Authorization

Common models:

- RBAC: role-based access control
- ABAC: attribute-based access control
- ownership checks

Example:

```js
if (request.user.role !== 'admin') {
  return response.status(403).json({message: 'Forbidden'});
}
```

## 401 vs 403

`401`: not authenticated.

`403`: authenticated but not authorized.

## Common Mistakes

- storing plain passwords
- long-lived access tokens
- no refresh token rotation
- only hiding UI buttons
- no ownership checks
- putting secrets in source code
- returning too much user data in JWT

## Senior Best Practices

- hash passwords with bcrypt/argon2
- use short-lived access tokens
- rotate refresh tokens
- enforce authorization on server
- check resource ownership
- store secrets securely
- log auth failures carefully

## Interview Questions

### Authentication vs authorization?

Authentication verifies identity. Authorization checks permissions.

### Why hash passwords?

So a database leak does not expose plain passwords.

### JWT vs session?

JWT is token-based and often stateless. Sessions keep state server-side and use cookies.

