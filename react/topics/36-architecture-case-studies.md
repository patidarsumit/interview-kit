# 36. Architecture Case Studies

Senior interviews ask design questions.

## Admin Dashboard

Use:

- protected route group
- feature folders
- server-side authorization where possible
- table state in URL
- lazy loaded heavy reports
- typed API clients

## Service State vs Redux/Zustand

Use local hooks/context when state is simple.

Use Zustand for simple shared client state.

Use Redux Toolkit when events, transitions, tooling, and conventions matter.

Use TanStack Query for server state.

## Migrating Class App To Hooks

Safe path:

- write new components with hooks
- convert leaf components first
- replace lifecycle logic carefully
- add tests around behavior
- avoid rewriting everything at once

## Splitting A Large App

Split by:

- route
- feature
- ownership
- bundle boundaries

Avoid only splitting by technical type.

## Interview Questions

### How would you structure an admin dashboard?

As protected lazy feature areas with typed APIs, URL-driven table state, role checks, and reusable UI primitives.

