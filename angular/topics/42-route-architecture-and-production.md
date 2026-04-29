# 42. Route Architecture And Production Routing

Angular routing is more than `path` and `component`.

Senior interviews often test route design, lazy loading boundaries, guards, resolvers, route data, and navigation UX.

## Route Data

Use `data` for static route metadata.

```ts
{
  path: 'admin',
  loadComponent: () => import('./admin.page').then((m) => m.AdminPage),
  data: {
    title: 'Admin',
    requiresAdmin: true,
  },
}
```

Use it for:

- titles
- breadcrumbs
- layout flags
- authorization metadata
- analytics names

## Route Titles

Angular routes can define titles.

```ts
{
  path: 'users',
  title: 'Users',
  loadComponent: () => import('./users.page').then((m) => m.UsersPage),
}
```

For dynamic titles, use a resolver or custom title strategy.

## Nested Routes

Use nested routes when a feature has its own layout.

```ts
{
  path: 'settings',
  loadComponent: () => import('./settings-shell').then((m) => m.SettingsShell),
  children: [
    {path: 'profile', loadComponent: () => import('./profile').then((m) => m.ProfilePage)},
    {path: 'security', loadComponent: () => import('./security').then((m) => m.SecurityPage)},
  ],
}
```

The parent component must include `RouterOutlet`.

## `canMatch` vs `canActivate`

`canMatch` decides whether a route can be matched.

`canActivate` decides whether a matched route can activate.

Use `canMatch` when the user should not even match or load a route branch.

Use `canActivate` when the route is matched but access must be checked before activation.

## Resolvers

Resolvers load data before route activation.

Use them when the page should not render until data is available.

Do not overuse resolvers for every request. Many pages can render a loading state instead.

## Functional Redirects

Route redirects can be static or calculated.

Use redirects for:

- default child route
- old URL migration
- auth entry routing
- locale-aware entry points

## Custom Reuse Strategy

`RouteReuseStrategy` controls whether Angular stores and reuses route component instances.

It is useful for special cases such as preserving heavy search pages.

Senior warning:

Reuse strategies can create stale data and memory issues if used casually.

## Senior Best Practices

- lazy load route-level features
- keep guards small and testable
- use `canMatch` for route branch access
- avoid putting API calls directly in route config
- handle resolver errors
- update document title consistently
- preserve navigation state intentionally
- prefer clear URL design over clever routing tricks

## Interview Questions

### What is route data used for?

Static metadata such as titles, breadcrumbs, layout flags, authorization flags, or analytics names.

### When would you use `canMatch`?

When a route branch should not match or load unless a condition is true.

### Should all page data be loaded with resolvers?

No. Use resolvers only when route activation should wait for the data.

