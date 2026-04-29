# 18. Performance Optimization

React performance has two sides:

- loading performance
- runtime performance

Senior rule:

> Measure before optimizing.

Do not start with `useMemo` everywhere.

## Loading Performance

Loading performance is about how fast the app becomes usable.

Check:

- bundle size
- route-level code splitting
- heavy third-party libraries
- images and fonts
- unused code
- SSR/SSG/RSC fit
- network waterfall

Common fixes:

- lazy load route screens
- split heavy widgets
- reduce third-party scripts
- optimize images
- use SSR/SSG where useful
- use Server Components to reduce client JavaScript where framework supports it

## Runtime Performance

Runtime performance is about how fast UI responds after load.

Check:

- unnecessary re-renders
- expensive render calculations
- huge lists
- context updates
- unstable props
- slow event handlers
- too much state lifted high

## Stable Keys

Bad keys can cause extra work and state bugs.

```tsx
{items.map((item) => (
  <Row key={item.id} item={item} />
))}
```

Use stable IDs.

## Virtualization

For huge lists, reduce DOM nodes.

Use:

- pagination
- server filtering
- `react-window`
- `react-virtual`
- custom virtual list

Do not render 10,000 rows and then try to fix it only with `memo`.

## Memoization

Use memoization when measured work is expensive.

### `useMemo`

Caches a calculated value.

```tsx
const visibleProducts = useMemo(() => {
  return products.filter((product) => product.name.includes(query));
}, [products, query]);
```

### `useCallback`

Caches a function reference.

```tsx
const handleSave = useCallback(() => {
  saveUser(userId);
}, [userId]);
```

### `memo`

Skips child re-render when props are unchanged.

```tsx
const Row = memo(function Row({item}: {item: Item}) {
  return <li>{item.name}</li>;
});
```

## Context Performance

When context value changes, consumers re-render.

Fixes:

- split context
- memoize provider value
- move state lower
- use external store for frequent updates

## React DevTools Profiler

Use profiler to find:

- which components rendered
- why they rendered
- expensive render time
- repeated renders

Senior answer should mention tools, not guesses.

## React Compiler

React Compiler can reduce manual memoization in supported apps.

But it still expects pure render logic and good state ownership.

## Common Mistakes

- adding `useMemo` everywhere
- optimizing before measuring
- ignoring large DOM size
- passing new objects/functions to memoized children
- using one huge context
- lifting state too high
- not checking production build

## Senior Best Practices

- measure first
- optimize the biggest bottleneck
- reduce DOM work for large lists
- keep state local
- split expensive components
- use memoization intentionally
- test production builds
- use React DevTools Profiler and browser Performance tools

## Interview Questions

### How do you improve a slow React screen?

Measure network, bundle, render, and CPU cost. Fix the biggest measured bottleneck.

### `useMemo` vs `memo`?

`useMemo` caches a value. `memo` memoizes a component render based on props.

### Why can Context hurt performance?

When the provider value changes, all consuming components can re-render.

### How do you render huge lists?

Use pagination, server filtering, infinite scroll, or virtualization.

