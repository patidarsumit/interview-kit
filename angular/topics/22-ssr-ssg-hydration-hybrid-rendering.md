# 22. SSR, SSG, Hydration, And Hybrid Rendering

Angular supports client-side rendering, server-side rendering, prerendering, hydration, and hybrid rendering.

## CSR

Client-side rendering renders in the browser.

Pros:

- simple deployment
- works well for authenticated apps
- browser-only code is easier

Cons:

- slower first content
- weaker SEO for some pages
- more work on user device

## SSR

Server-side rendering renders HTML on the server for each request.

```bash
ng add @angular/ssr
```

Pros:

- faster first paint
- better SEO
- useful for content-heavy pages

Cons:

- server cost
- browser APIs must be guarded
- more deployment complexity

## SSG / Prerendering

Prerendering generates static HTML at build time.

Best for:

- marketing pages
- docs
- blogs
- static product pages

Not good for:

- user-specific pages
- highly dynamic request-time data

## Hybrid Rendering

Hybrid rendering chooses rendering mode per route.

Example route modes:

- CSR for dashboard
- SSR for profile
- SSG for about page

```ts
import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {path: '', renderMode: RenderMode.Client},
  {path: 'about', renderMode: RenderMode.Prerender},
  {path: 'profile', renderMode: RenderMode.Server},
];
```

## Hydration

Hydration attaches Angular behavior to server-rendered HTML.

Without hydration, server HTML may be discarded and recreated.

Hydration improves:

- startup performance
- visual stability
- Core Web Vitals

## Incremental Hydration

Incremental hydration delays hydrating parts of the app until needed.

This is useful for:

- below-the-fold components
- heavy widgets
- rarely used interactive sections

## Senior Best Practices

- choose render mode based on route needs
- guard browser-only APIs with platform checks
- avoid direct `window` usage during server rendering
- keep server-rendered data consistent with client hydration
- test hydration warnings
- combine SSR with `@defer` for better loading

Practical examples are available in:

- [browser-only platform guard](../programs/63-browser-only-platform-guard.ts)
- [hydration mismatch warning](../programs/64-hydration-mismatch-warning.ts)
- [server route render modes](../programs/65-server-route-render-modes.ts)
- [transfer state server data](../programs/66-transfer-state-server-data.ts)

## Interview Questions

### CSR vs SSR vs SSG?

CSR renders in browser. SSR renders per request on server. SSG renders static HTML at build time.

### What is hydration?

The process of attaching Angular interactivity to server-rendered HTML.

### Why use hybrid rendering?

Different routes have different SEO, personalization, and performance needs.
