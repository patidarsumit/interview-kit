# 03. Setup, Tooling, And Project Structure

A Node.js project should be easy to run, test, configure, and deploy.

## Basic Project

```bash
npm init -y
```

Common files:

```text
package.json
package-lock.json
src/
tests/
.env
.gitignore
```

## package.json

`package.json` stores metadata, scripts, and dependencies.

```json
{
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "node src/server.js",
    "test": "node --test"
  }
}
```

## Project Structure

For APIs:

```text
src/
  app.js
  server.js
  config/
  routes/
  controllers/
  services/
  repositories/
  middleware/
  utils/
```

Keep HTTP concerns separate from business logic.

## Feature-Based Structure

For larger apps:

```text
src/
  features/
    users/
      users.routes.js
      users.controller.js
      users.service.js
      users.repository.js
```

This keeps related code together.

## Environment Files

Use `.env` for local development, but do not commit secrets.

Validate required config at startup.

## TypeScript

Many production Node.js apps use TypeScript for:

- DTOs
- service contracts
- repository contracts
- request validation types
- safer refactoring

## Common Tools

- npm/pnpm/yarn
- nodemon or `node --watch`
- ESLint
- Prettier
- TypeScript
- node:test, Jest, or Vitest
- Docker

## Senior Best Practices

- keep startup config explicit
- separate app from server listener for tests
- keep dependencies updated
- commit lock files
- use scripts consistently
- validate environment variables
- design folder structure around features for large apps

## Interview Questions

### Why separate `app.js` and `server.js`?

So tests can import the app without opening a network port.

### What should not be committed?

Secrets, `.env` files with real credentials, private keys, and generated local artifacts.

