# 29. Performance

Angular performance has two sides:

- loading performance
- runtime performance

## Loading Performance

Improve loading with:

- lazy-loaded routes
- `@defer`
- image optimization
- SSR
- SSG/prerendering
- hydration
- bundle analysis
- reducing third-party JavaScript

Example:

```ts
{
  path: 'reports',
  loadComponent: () => import('./reports/reports-page').then((m) => m.ReportsPage),
}
```

## Runtime Performance

Improve runtime with:

- signals
- OnPush/signal-friendly patterns
- zoneless change detection
- stable `@for track`
- avoiding expensive template calls
- virtual scrolling for large lists
- memoized derived state

## Template Performance

Avoid:

```html
@for (item of calculateItems(); track item.id) {
  <p>{{ item.name }}</p>
}
```

Prefer:

```ts
filteredItems = computed(() => expensiveFilter(this.items(), this.query()));
```

```html
@for (item of filteredItems(); track item.id) {
  <p>{{ item.name }}</p>
}
```

## Large Lists

Use:

- pagination
- virtual scroll
- stable tracking
- server filtering

## Images

Use Angular image optimization where appropriate.

Care about:

- LCP image priority
- lazy loading below the fold
- responsive dimensions
- layout shift

## Senior Best Practices

- measure before optimizing
- understand Core Web Vitals
- split routes
- defer heavy widgets
- avoid unnecessary subscriptions
- keep state derivations efficient
- test production builds
- use Angular DevTools and browser performance tools

For debugging scenarios, see [Performance Debugging Playbook](./44-performance-debugging-playbook.md).

## Interview Questions

### How do you improve Angular startup performance?

Lazy routes, `@defer`, SSR/SSG, hydration, image optimization, and reducing initial JavaScript.

### How do you improve runtime performance?

Signals, stable tracking, avoiding expensive templates, virtual scroll, and minimizing unnecessary change detection.
