# 20. Error Boundaries

Error boundaries catch rendering errors in their child component tree and show fallback UI instead of crashing the whole app.

They are important for production reliability.

## What Error Boundaries Catch

They catch errors during:

- rendering
- lifecycle methods
- constructors in class components below them

They do not catch:

- event handler errors
- async callback errors
- server-side errors by default
- errors thrown inside the boundary itself

## Basic Error Boundary

Error boundaries are traditionally class components.

```tsx
class ErrorBoundary extends React.Component<
  {children: React.ReactNode},
  {hasError: boolean}
> {
  state = {hasError: false};

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <p role="alert">Something went wrong.</p>;
    }

    return this.props.children;
  }
}
```

## Where To Place Error Boundaries

Useful boundaries:

- around routes
- around dashboards
- around third-party widgets
- around charts
- around lazy-loaded sections
- around risky feature areas

Do not put only one boundary around the whole app if a smaller fallback would be better.

## Event Handler Errors

Error boundaries do not catch event handler errors.

```tsx
function SaveButton() {
  function handleClick() {
    throw new Error('Failed');
  }

  return <button onClick={handleClick}>Save</button>;
}
```

Handle event errors with try/catch or async error state.

## Async Errors

Async errors usually need local error state or data library error handling.

```tsx
try {
  await saveUser();
} catch {
  setError('Could not save user');
}
```

## Framework Error Boundaries

Frameworks often provide route-level error handling.

Examples:

- Next.js `error.tsx`
- React Router error elements
- Remix error boundaries

Use framework conventions when available.

## Logging

In production, log errors to monitoring.

Examples:

- Sentry
- Datadog
- New Relic
- custom logging API

Do not silently swallow errors.

## Common Mistakes

- no fallback UI
- only one app-wide boundary
- assuming event errors are caught
- not logging production errors
- showing technical error messages to users
- no retry path

## Senior Best Practices

- place boundaries around route and feature areas
- show useful fallback UI
- log errors to monitoring
- allow retry when possible
- handle async/event errors separately
- use framework route error boundaries

## Interview Questions

### What does an error boundary catch?

Rendering, lifecycle, and constructor errors in child components.

### What does it not catch?

Event handler errors, async callback errors, and errors inside the boundary itself.

### Where should error boundaries be placed?

Around routes, risky widgets, and feature areas where fallback UI can isolate failure.

