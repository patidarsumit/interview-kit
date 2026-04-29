# 14. Suspense, Lazy, And Code Splitting

`Suspense` lets React show fallback UI while some child content is not ready.

It is commonly used with lazy-loaded components, framework data loading, and server rendering features.

## Code Splitting Problem

If every page and widget is included in the initial bundle, the app loads slowly.

Code splitting loads some code only when needed.

Good candidates:

- route pages
- heavy charts
- rich text editors
- admin-only screens
- rarely used modals

## lazy

`lazy` loads a component with dynamic import.

```tsx
import {lazy, Suspense} from 'react';

const ReportsPage = lazy(() => import('./ReportsPage'));

function App() {
  return (
    <Suspense fallback={<p>Loading reports...</p>}>
      <ReportsPage />
    </Suspense>
  );
}
```

The `ReportsPage` code is loaded when it is rendered.

## Suspense Fallback

`fallback` is shown while content loads.

```tsx
<Suspense fallback={<Spinner />}>
  <HeavyChart />
</Suspense>
```

Fallback should be useful and accessible.

Avoid layout jumps when possible.

## Route-Level Splitting

Route screens are a natural split point.

```tsx
const SettingsPage = lazy(() => import('./SettingsPage'));
```

This keeps initial JavaScript smaller.

## Nested Suspense

Nested Suspense lets parts of a page reveal gradually.

```tsx
<Suspense fallback={<PageSkeleton />}>
  <ProfileHeader />

  <Suspense fallback={<ChartSkeleton />}>
    <HeavyChart />
  </Suspense>
</Suspense>
```

Use this when independent sections can load separately.

## Suspense And Data

Plain `useEffect` fetching does not automatically use Suspense.

Suspense data loading usually comes from:

- frameworks
- Server Components
- Suspense-enabled libraries
- resource patterns

Senior point:

Do not claim Suspense magically handles all API calls in a normal client component.

## Common Mistakes

- wrapping every tiny component in `lazy`
- using a bad fallback that causes layout shift
- lazy loading above-the-fold critical UI
- assuming `useEffect` fetch works with Suspense automatically
- creating too many network chunks

## Senior Best Practices

- split at route and heavy widget boundaries
- provide meaningful fallbacks
- avoid too many tiny chunks
- use nested boundaries for progressive reveal
- test slow network behavior
- combine with framework data loading where appropriate

## Interview Questions

### What is Suspense?

A React component that shows fallback UI while child content is not ready.

### What is `lazy` used for?

Loading a component's code only when it is needed.

### Where should you code split?

Routes, heavy widgets, and rarely used UI are good split points.

### Does Suspense automatically work with every fetch in `useEffect`?

No. Suspense data fetching requires framework or Suspense-enabled patterns.

