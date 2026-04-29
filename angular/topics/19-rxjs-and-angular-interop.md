# 19. RxJS And Angular Interop

Angular historically used RxJS heavily.

Modern Angular adds signals, but RxJS still matters.

## When To Use RxJS

Use RxJS for:

- HTTP streams
- websockets
- user events over time
- cancellation
- retry
- debounce
- combining async streams

## Common Operators

```ts
map
filter
switchMap
mergeMap
concatMap
exhaustMap
debounceTime
distinctUntilChanged
catchError
takeUntil
shareReplay
```

For a deeper explanation of `Subject`, `BehaviorSubject`, `ReplaySubject`, `AsyncSubject`, and common flattening operators, read:

- [RxJS Subjects And Operators](./20-rxjs-subjects-and-operators.md)

## `switchMap`

Good for search because it cancels old requests.

```ts
searchTerm$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((term) => this.api.search(term)),
);
```

## `mergeMap`, `concatMap`, `exhaustMap`

`mergeMap` runs inner streams concurrently.

`concatMap` queues them in order.

`exhaustMap` ignores new emissions while one is active.

## Async Pipe

```html
@if (user$ | async; as user) {
  <p>{{ user.name }}</p>
}
```

`async` pipe subscribes and unsubscribes automatically.

## Signal Interop

Angular provides interop between signals and RxJS.

Common ideas:

- convert observable to signal
- convert signal to observable
- use RxJS for streams and signals for current UI state

Conceptual example:

```ts
user = toSignal(this.usersService.user$);
```

## Senior Best Practices

- do not replace all RxJS with signals
- use RxJS where cancellation and streams matter
- use signals for current UI state
- avoid nested subscriptions
- use `async` pipe or signal interop for template state
- understand operator semantics

## Interview Questions

### Observable vs signal?

Observable represents a stream over time. Signal represents current reactive state.

### Where are `Subject` and `BehaviorSubject` covered?

See [RxJS Subjects And Operators](./20-rxjs-subjects-and-operators.md).

### Why is `switchMap` common in search?

It cancels stale requests when a newer search term arrives.

### What is the nested subscribe problem?

Nested subscriptions are harder to cancel, compose, test, and error-handle.
