# 29. Configuration And Environment Variables

Configuration controls how an app runs in different environments.

Examples:

- port
- database URL
- Redis URL
- JWT secret
- log level
- feature flags

## Environment Variables

```js
const port = process.env.PORT ?? '3000';
```

Do not hardcode production secrets.

## Validate Config

Validate config at startup.

```js
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}
```

Fail fast if required config is missing.

## .env Files

Use `.env` for local development.

Do not commit real secrets.

Use secret managers in production.

## Config Object

Centralize config.

```js
export const config = {
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: required('DATABASE_URL'),
};
```

## Common Mistakes

- missing env validation
- committing secrets
- reading env everywhere
- treating all env values as strings accidentally
- different config behavior across environments
- exposing server secrets to frontend

## Senior Best Practices

- validate config at startup
- centralize config access
- keep secrets out of git
- use secret manager in production
- parse types correctly
- document required variables

## Interview Questions

### Why validate environment variables?

To fail fast at startup instead of failing later during a request.

### Why centralize config?

To keep parsing, defaults, and validation consistent.

