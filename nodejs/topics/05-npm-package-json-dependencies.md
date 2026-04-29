# 05. npm, package.json, And Dependency Management

Node.js projects depend heavily on packages.

Understanding package management is important for interviews and production safety.

## package.json

`package.json` defines:

- project metadata
- scripts
- dependencies
- devDependencies
- module type
- engines

Example:

```json
{
  "name": "api",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "test": "node --test"
  },
  "dependencies": {
    "express": "^5.0.0"
  }
}
```

## dependencies vs devDependencies

`dependencies` are needed at runtime.

Examples:

- express
- pg
- mongoose
- jsonwebtoken

`devDependencies` are needed for development/testing.

Examples:

- eslint
- prettier
- test runners
- TypeScript

## Lock Files

Lock files record exact dependency versions.

Examples:

- `package-lock.json`
- `pnpm-lock.yaml`
- `yarn.lock`

Commit lock files for apps.

They make installs reproducible.

## Semantic Versioning

```text
major.minor.patch
```

Example:

```text
2.4.1
```

`^2.4.1` allows compatible minor/patch updates.

`~2.4.1` allows patch updates.

Exact version pins one version.

## npm Scripts

Scripts standardize commands.

```json
{
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "node src/server.js",
    "test": "node --test"
  }
}
```

## Supply Chain Risk

Dependencies can introduce:

- vulnerabilities
- malicious packages
- large bundle/install size
- abandoned code
- transitive risk

Use:

- `npm audit` carefully
- dependency review
- lock files
- minimal dependencies
- trusted packages

## Senior Best Practices

- commit lock files
- separate runtime and dev dependencies
- avoid unnecessary packages
- keep dependencies updated
- review package popularity and maintenance
- use private registry policies in enterprise environments
- define supported Node version in `engines`

## Interview Questions

### Why commit package-lock.json?

To make dependency installation reproducible across machines and deployments.

### dependencies vs devDependencies?

Runtime packages go in dependencies. Development-only packages go in devDependencies.

### What is supply-chain risk?

Risk introduced by third-party packages and their dependencies.

