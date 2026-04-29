# 38. Senior Interview Questions

This file collects high-value Angular interview questions.

## Fundamentals

### What is Angular?

Angular is a TypeScript-based full application framework for building web applications with components, templates, DI, routing, forms, HTTP, testing, and rendering tools.

### What is a component?

A component is a class plus metadata and template that controls part of the UI.

### What are standalone components?

Components that declare their dependencies directly in `imports` instead of being declared in an NgModule.

## Templates

### What is the difference between interpolation and property binding?

Interpolation writes text. Property binding sets DOM properties.

### Why use `attr.aria-*`?

ARIA values are attributes, so dynamic ARIA should use attribute binding.

### Why avoid complex template expressions?

They reduce readability and can run frequently during rendering.

## Components

### Input vs output?

Input passes data into a component. Output emits events to the parent.

### ViewChild vs ContentChild?

ViewChild queries the component's own template. ContentChild queries projected content.

### What is `@HostListener`?

A decorator for listening to events on a component or directive host element.

### What is `@HostBinding`?

A decorator for binding properties, attributes, classes, or styles on the host element.

### What are host directives?

A modern composition feature for applying directive behavior to a component or directive host.

## DI

### What is hierarchical dependency injection?

Angular resolves providers from the closest injector upward.

### `providedIn: 'root'` vs component provider?

Root creates an app singleton. Component providers create instances scoped to that component subtree.

## Signals

### What is a signal?

A reactive value container that Angular tracks precisely.

### What is computed?

A read-only signal derived from other signals, lazily evaluated and memoized.

### Signals vs Observables?

Signals represent current synchronous state. Observables represent streams over time.

## RxJS Subjects

### What is a Subject?

A Subject is both an observable and an observer. It multicasts values to multiple subscribers.

### Subject vs BehaviorSubject?

`Subject` has no current value and emits only new values. `BehaviorSubject` requires an initial value and emits the latest value to new subscribers.

### BehaviorSubject vs ReplaySubject?

`BehaviorSubject` stores one latest value. `ReplaySubject` replays a configured number of previous values.

### What is AsyncSubject?

It emits only the last value when completed.

### When would you use BehaviorSubject in Angular?

For RxJS-based shared state that needs a current value. In modern Angular, signals may be simpler for current UI state.

### Why expose `asObservable()` from a service?

To let consumers subscribe without allowing them to call `.next()`.

### `switchMap` vs `mergeMap`?

`switchMap` cancels previous inner streams. `mergeMap` runs inner streams concurrently.

### `concatMap` vs `exhaustMap`?

`concatMap` queues inner streams in order. `exhaustMap` ignores new emissions while the current inner stream is active.

## Routing

### Why lazy load?

To reduce initial bundle size and load feature code only when needed.

### Guard vs resolver?

Guard controls navigation. Resolver loads data before route activation.

### `canMatch` vs `canActivate`?

`canMatch` decides whether a route can match. `canActivate` decides whether an already matched route can activate.

### What is route data used for?

Static route metadata such as titles, breadcrumbs, layout flags, authorization flags, or analytics names.

## Forms

### Template-driven vs reactive forms?

Template-driven forms are template-first and simpler. Reactive forms are model-first, explicit, and better for complex forms.

### What is ControlValueAccessor?

An interface that lets custom components integrate with Angular forms.

### What are Signal Forms?

An experimental Angular v21 signal-based forms API.

### When do you use `FormArray`?

When users can dynamically add or remove repeated controls.

### Where should cross-field validation live?

On the parent `FormGroup`, because the rule compares sibling controls.

## HTTP

### Why use interceptors?

For cross-cutting HTTP behavior such as auth headers, logging, retries, and error handling.

### Why clone HTTP requests?

Angular HTTP request objects are immutable.

### Why use `HttpContext`?

To pass Angular-only request metadata to interceptors without sending that metadata as a header.

### How should refresh-token interceptors handle multiple `401` responses?

Coordinate one refresh request and let other failed requests wait for the same refreshed token.

## Change Detection

### What is OnPush?

A strategy that reduces change detection to explicit triggers such as input reference changes, events, async emissions, and signal updates.

### What is zoneless Angular?

Angular without ZoneJS dependency, relying on signals and explicit notifications for updates.

## SSR

### CSR vs SSR vs SSG?

CSR renders in browser. SSR renders on server per request. SSG prerenders static HTML at build time.

### What is hydration?

Attaching Angular behavior to server-rendered HTML.

## Security

### How does Angular protect against XSS?

Angular escapes interpolation and sanitizes values in risky DOM contexts.

### Why is `bypassSecurityTrust...` dangerous?

It tells Angular to trust a value and bypass normal protection.

## Performance

### How do you improve Angular performance?

Lazy loading, `@defer`, signals, stable `@for track`, SSR/hydration, avoiding expensive templates, and reducing bundle size.

### What is the best way to render huge lists?

Pagination, server filtering, or virtual scrolling.

### What does `@defer` prefetch do?

It lets Angular load a deferred block's dependencies before the block is displayed, improving perceived speed.

## Architecture

### How should state be scoped?

Keep state as close as possible to where it is used. Promote it only when sharing, persistence, or coordination requires it.

### How do you structure a large Angular app?

Feature-first folders, route-level lazy loading, shared UI components, core singleton services, clear provider scopes, and consistent state patterns.

## NgRx

### What is NgRx?

A state management ecosystem for Angular that includes classic Store, Actions, Reducers, Selectors, Effects, Entity, and newer signal-based state APIs.

### What is an action?

An event object that describes something that happened in the application.

### What is a reducer?

A pure function that takes current state and an action, then returns new state.

### What is an effect?

An NgRx mechanism for handling side effects such as HTTP requests and dispatching follow-up actions.

### What is a selector?

A memoized function for reading or deriving data from store state.

### Why use NgRx Entity?

It normalizes collections and provides adapter helpers and selectors for common CRUD-style state updates.

### Classic NgRx Store vs NgRx Signal Store?

Classic Store uses actions, reducers, selectors, and effects. Signal Store is signal-first and often has less boilerplate for feature-level state.

### When should you not use NgRx?

When state is simple, local, and does not need global coordination, event history, or complex side effects.

## Angular 21

### What should you know about Angular v21?

Angular v21 emphasizes zoneless-by-default new apps, updated signals, Signal Forms as experimental, Angular Aria, updated routing/forms/animations, hybrid rendering, and official AI tooling guidance.

### What is the default unit test runner for new Angular CLI projects?

Vitest.

### Should all old apps move immediately to v21 patterns?

No. Senior migration is incremental, tested, and based on product value and risk.

## Scenario Questions

### Page is slow. How do you debug?

Reproduce, measure with Angular DevTools and browser tools, inspect network and bundles, find runtime hot spots, apply one fix, and measure again.

### API is called twice. What do you check?

Duplicate subscriptions, resolver plus component loading, repeated effects, missing shared observable caching, and route navigation lifecycle.

### Component is not updating with OnPush. Why?

Usually object mutation, missing input reference change, stale derived state, or state changing outside Angular's tracked update path.

### Memory leak after route change. How do you find it?

Check manual subscriptions, timers, DOM listeners, websockets, overlays, and long-lived subjects. Use `takeUntilDestroyed()` where appropriate.

### Resolver fails. What should happen?

Redirect, show a route-level error, return fallback data, or let the component render an error state. Do not leave a blank page.

## CLI And Build

### What are Angular schematics?

Code generators and transformations used by Angular CLI.

### What are builders?

Task executors used by the CLI for build, serve, test, and other operations.

### What is AOT?

Ahead-of-Time compilation, where Angular compiles templates during build instead of at runtime.

### What is strict template checking?

Angular's compile-time type checking for template expressions.
