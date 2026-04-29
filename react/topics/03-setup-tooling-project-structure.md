# 03. Setup, Tooling, And Project Structure

React apps are commonly created with frameworks or build tools.

## Common Choices

- Next.js for full-stack React and routing
- Vite for fast client-side React apps
- Remix/React Router frameworks for routing and data loading
- Storybook for component development
- Vitest or Jest for tests

## Typical Feature Structure

```text
src/
  app/
  features/
    users/
      components/
      hooks/
      api/
      users-page.tsx
  shared/
    ui/
    hooks/
    utils/
```

Prefer feature ownership over dumping everything into generic folders.

## TypeScript

Use TypeScript for production React interviews.

It helps with:

- prop contracts
- API DTOs
- reducer actions
- custom hooks
- form values

## Senior Best Practices

- choose framework based on product needs
- keep routes/features lazy-loadable
- colocate feature code
- keep shared code truly reusable
- configure linting and formatting early
- use strict TypeScript where possible

## Interview Questions

### Vite vs Next.js?

Vite is a build tool for client apps. Next.js is a React framework with routing, SSR, RSC, and deployment conventions.

