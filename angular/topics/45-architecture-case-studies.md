# 45. Architecture Case Studies

Senior Angular interviews often ask design questions.

A good answer explains tradeoffs, not only folder names.

## Admin Dashboard

Suggested structure:

```text
features/admin/
  admin.routes.ts
  layout/
  users/
  roles/
  audit-log/
  shared/
```

Use:

- lazy route boundary
- route-level providers
- guards with role metadata
- table state in URL query params
- reusable shared UI only after repetition is real

Senior answer:

Keep admin isolated so it does not increase the public app's initial bundle.

## Service With Signals vs NgRx

Use service with signals when:

- state is local or feature-scoped
- transitions are simple
- current value is enough
- team wants less boilerplate

Use NgRx when:

- many features coordinate through shared events
- effects are complex
- debugging history matters
- team needs strict conventions

## Migrating NgModule App To Standalone

Safe migration path:

```text
Generate standalone components for new work
Convert leaf components first
Move route modules to route arrays
Move providers to app config or route providers
Remove shared modules gradually
Keep tests passing between steps
```

Do not rewrite the whole app at once unless the product risk is low.

## Splitting A Large Angular App

Split by feature and route boundary.

Good feature boundaries:

- orders
- billing
- users
- reporting
- settings

Avoid splitting only by technical type:

```text
components/
services/
pipes/
```

That makes features harder to own and lazy load.

## Design System Integration

For large teams:

- use standalone UI components
- keep public inputs small
- document accessibility behavior
- avoid app-specific business logic inside shared UI
- use CDK for custom accessible behavior

## Interview Questions

### How would you structure an admin dashboard?

As a lazy feature with its own routes, layout, role guards, feature services, and reusable admin UI pieces.

### How do you choose service state or NgRx?

Choose the smallest pattern that handles sharing, complexity, debugging, and team conventions.

### How do you migrate from NgModules to standalone?

Incrementally, starting with leaves and route boundaries, while keeping tests green.

