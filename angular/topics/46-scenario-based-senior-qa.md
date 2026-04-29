# 46. Scenario-Based Senior Angular Q&A

Scenario questions test debugging and judgment.

## Page Is Slow

### What do you do?

Measure first.

Check network waterfall, bundle size, lazy chunks, Core Web Vitals, Angular DevTools, template hot spots, and heavy third-party code.

Then optimize the biggest measured bottleneck.

## API Called Twice

### What do you check?

Check duplicate subscriptions, `ngOnInit` plus resolver loading, effects firing twice, shared observable without caching, and repeated route navigation.

Fix with clearer ownership of data loading, `switchMap`, `shareReplay`, or route-level state.

## OnPush Component Not Updating

### What do you check?

Check object mutation, missing signal updates, manual subscriptions, and whether the component receives a new input reference.

Prefer immutable updates and signals/computed values.

## Memory Leak After Route Change

### What do you check?

Check subscriptions, timers, DOM listeners, websockets, overlays, and long-lived subjects.

Use `takeUntilDestroyed()`, `DestroyRef`, and service cleanup where appropriate.

## Resolver Fails

### What should happen?

The app should handle the error intentionally.

Options:

- redirect to a safe route
- show a route-level error page
- return fallback data
- let the component render an error state

Do not leave the user on a blank route.

## Login Expires During API Call

### What should happen?

The interceptor should try refresh once, retry the original request if refresh succeeds, and log out or redirect if refresh fails.

Avoid infinite retry loops.

## Large List Freezes Browser

### What do you do?

Use pagination, server filtering, virtual scroll, stable tracking, and avoid expensive work in row templates.

## Form Validation Is Inconsistent

### What do you check?

Check typed form shape, async validator cancellation, dynamic validators, touched/dirty state, and whether server validation errors are displayed.

## Hydration Warning Appears

### What do you check?

Check server/client HTML mismatch, browser-only code during SSR, random values in templates, dates/time zones, and data that changes before hydration completes.

