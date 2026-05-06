# 04. Angular Scenario Answers

Use these for final-round practical questions.

## Scenario: Page Is Slow

Answer:

```text
First I would measure instead of guessing. I would check network waterfall, bundle size, Angular DevTools, browser performance profile, API latency, and whether a large list or heavy component is blocking rendering.

Possible fixes include route-level lazy loading, @defer for heavy widgets, virtual scrolling for large lists, stable track expressions, avoiding functions in templates, optimizing images, reducing third-party libraries, and checking production build budgets.
```

## Scenario: API Called Twice

Check:

- component and resolver both loading
- duplicate subscription
- effect triggering twice
- button double click
- shared observable without caching
- route navigation repeated

Answer:

```text
I would identify who owns data loading. If multiple components need same data, I would move it to route resolver, shared service, signal store, or cache the observable carefully.
```

## Scenario: User Not Redirected After Login

Check:

- auth state update
- token saved
- guard reads latest state
- router navigation
- return URL
- interceptor adding token

Answer:

```text
I would debug auth flow from login response to token storage, auth service state, guard decision, and router navigation. I would also check if token expiry/format is valid and whether the interceptor attaches it correctly.
```

## Scenario: 401 From API

Answer:

```text
Interceptor should handle 401. If refresh token exists, refresh access token once and retry original request. If refresh fails, clear session and redirect to login. Important thing is to avoid infinite retry loops and coordinate multiple simultaneous 401s.
```

## Scenario: Reactive Form Validation Not Working

Check:

- validators attached
- updateValueAndValidity
- async validator returning observable/promise
- control touched/dirty
- group-level validator for cross-field
- template error condition

Answer:

```text
For cross-field validation like password confirmation, I attach validator to FormGroup, not individual control. For dynamic validators, after adding/removing validators I call updateValueAndValidity.
```

## Scenario: Component Not Updating With OnPush

Possible reasons:

- input object mutated
- same reference passed
- observable not emitted
- signal not updated
- manual subscription not writing to state

Answer:

```text
With OnPush, I avoid mutating inputs. I pass new object/array references, use async pipe or signals, and keep state updates explicit.
```

## Scenario: Memory Leak After Route Change

Check:

- manual subscriptions
- DOM listeners
- timers
- websockets
- dynamic component refs
- overlays/dialogs

Answer:

```text
I use async pipe where possible. For manual subscriptions, I use takeUntilDestroyed or DestroyRef. I also clean timers, listeners, and dynamic component references.
```

## Scenario: Need Reusable Component

Answer:

```text
I first identify stable inputs, outputs, content projection needs, accessibility requirements, and styling API. I keep business logic outside reusable UI components. If the component must work with forms, I implement ControlValueAccessor.
```

## Scenario: Need Dashboard Widgets From API

Answer:

```text
I would use a component registry mapping allowed widget types to Angular components. For simple template-driven rendering, NgComponentOutlet works well. For more programmatic insertion and cleanup, ViewContainerRef.createComponent is better.
```

## Scenario: Need To Improve Bundle Size

Answer:

```text
I would inspect bundle output, lazy load feature routes, defer heavy components, remove unused dependencies, check third-party libraries, and use Angular budgets. I would also ensure production build optimization is enabled.
```

