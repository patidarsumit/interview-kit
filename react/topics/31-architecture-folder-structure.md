# 31. Architecture And Folder Structure

Large React apps should be organized by feature and ownership, not only by technical file type.

Good architecture makes code easier to change, test, and lazy load.

## Feature-First Structure

Prefer:

```text
src/
  features/
    orders/
      api/
      components/
      hooks/
      pages/
      order-types.ts
```

Over:

```text
src/
  components/
  hooks/
  services/
  types/
```

Technical folders become messy as the app grows.

## What Belongs In A Feature

A feature can own:

- page components
- feature components
- API functions
- hooks
- state
- types
- tests

Example:

```text
features/users/
  api/get-users.ts
  components/users-table.tsx
  hooks/use-users-filter.ts
  pages/users-page.tsx
  user-types.ts
```

## Shared Folder

Use shared for truly reusable code:

- UI primitives
- design-system components
- generic hooks
- utilities
- formatting helpers

Do not put feature-specific business logic in shared.

## API Layer

Keep API calls typed and isolated.

```tsx
export async function getUsers(): Promise<UserDto[]> {
  const response = await fetch('/api/users');
  return response.json();
}
```

This makes testing and refactoring easier.

## State Ownership

Ask:

- is this local UI state?
- is it route state?
- is it server state?
- is it shared app state?

Do not put all state in a global store.

## Route Boundaries

Routes are natural boundaries for:

- lazy loading
- data loading
- error boundaries
- layout
- permissions

Keep route-level code close to the feature when possible.

## Common Mistakes

- giant `components` folder
- global `types` folder with unrelated types
- shared folder becoming a junk drawer
- mixing API logic into UI components
- putting feature business logic into UI library components
- no clear state ownership

## Senior Best Practices

- organize by feature first
- keep shared code truly reusable
- isolate typed API functions
- separate UI state from server state
- define route boundaries clearly
- document major architecture decisions
- avoid premature abstraction

## Interview Questions

### How do you structure a large React app?

By feature boundaries, route ownership, shared UI primitives, typed APIs, and clear state ownership.

### What should go in shared?

Only reusable UI, hooks, utilities, and helpers that are not tied to one feature.

### Why avoid one big components folder?

It hides feature ownership and makes large apps harder to navigate and lazy load.

