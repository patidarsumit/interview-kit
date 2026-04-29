# 27. Next.js And React Frameworks

React is a UI library. Frameworks add the missing production pieces around React.

Common React frameworks include:

- Next.js
- Remix
- React Router framework mode
- Gatsby for static/content use cases

## Why Frameworks Exist

React does not provide by default:

- routing
- layouts
- SSR/SSG
- server data loading
- bundling conventions
- deployment conventions
- image/font optimization
- API/server action patterns

Frameworks provide these decisions.

## Next.js

Next.js commonly provides:

- file-based routing
- nested layouts
- Server Components
- Client Components
- SSR/SSG
- streaming
- metadata
- image/font optimization
- API routes or server actions
- caching conventions

## App Router Mental Model

In modern Next.js:

- components are Server Components by default
- add `'use client'` only when browser interactivity is needed
- route folders define pages and layouts
- loading and error files define route states

Example:

```text
app/
  users/
    page.tsx
    loading.tsx
    error.tsx
```

## When To Use A Framework

Use a framework when you need:

- SEO
- SSR/SSG
- route-level data loading
- server/client boundaries
- full-stack integration
- production deployment conventions
- optimized images/fonts

Use Vite/plain React when:

- app is mostly client-side
- dashboard is behind login
- SSR is unnecessary
- team wants simple SPA architecture

## Server vs Client Components

Do not make everything a Client Component.

Server Components are good for:

- data fetching
- non-interactive UI
- keeping secrets on server
- reducing client JS

Client Components are needed for:

- state
- effects
- event handlers
- browser APIs

## Caching

Framework caching can be powerful and confusing.

Senior candidates should explain:

- when data is cached
- when data revalidates
- how mutation invalidates data
- what should be dynamic

## Common Mistakes

- adding `'use client'` too high in the tree
- fetching secrets in client components
- not understanding cache behavior
- no loading/error route states
- using framework features without knowing deployment impact

## Senior Best Practices

- choose framework based on product needs
- keep Client Components small
- follow route conventions
- handle loading/error/not-found states
- understand caching and revalidation
- keep server-only code off the client

## Interview Questions

### Why use Next.js instead of plain React?

For routing, rendering, data loading, server features, optimization, and production conventions.

### When is Vite enough?

When you are building a mostly client-side app that does not need SSR/SSG or framework data loading.

### Why avoid making everything a Client Component?

It ships more JavaScript and loses benefits of server rendering and server-only data access.

