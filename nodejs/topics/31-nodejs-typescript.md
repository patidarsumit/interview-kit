# 31. Node.js With TypeScript

TypeScript is common in production Node.js.

It helps with API contracts, service boundaries, DTOs, and safer refactoring.

## Basic Setup

Common tools:

- `typescript`
- `tsx` for development
- `ts-node` in some projects
- `tsc` for build

## Types For DTOs

```ts
type CreateUserRequest = {
  email: string;
  name: string;
};
```

Use DTOs at API boundaries.

## Runtime Validation Still Needed

TypeScript does not validate runtime request bodies.

Bad assumption:

```ts
const body = request.body as CreateUserRequest;
```

Better:

Validate with Zod/Joi/class-validator/etc.

## Path Aliases

Path aliases can improve imports, but must be configured for build/runtime/test tools.

## Build Output

Production usually runs compiled JavaScript.

```bash
tsc
node dist/server.js
```

## Common Mistakes

- trusting TypeScript for runtime input validation
- using `any` everywhere
- path aliases not working in production
- mixing ESM/CJS incorrectly
- no source maps for production debugging policy

## Senior Best Practices

- use strict TypeScript
- validate runtime input
- type service/repository contracts
- keep DTOs explicit
- compile before production
- align module system across tooling

## Interview Questions

### Does TypeScript validate request body at runtime?

No. Use runtime validation for external data.

### Why use DTOs?

To define clear API input/output contracts.

