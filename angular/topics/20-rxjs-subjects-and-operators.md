# 20. RxJS Subjects And Operators

RxJS is still very important in Angular interviews.

Even with signals, Angular developers must understand observables, subjects, subscriptions, operators, and common stream patterns.

## Observable

An observable is a stream of values over time.

```ts
const users$ = this.http.get<User[]>('/api/users');
```

Observables are lazy by default. They usually do not run until subscribed.

## Observer

An observer receives values from an observable.

```ts
users$.subscribe({
  next: (users) => console.log(users),
  error: (error) => console.error(error),
  complete: () => console.log('done'),
});
```

## Subject

A `Subject` is both an observable and an observer.

It can multicast values to multiple subscribers.

```ts
import {Subject} from 'rxjs';

const refresh$ = new Subject<void>();

refresh$.subscribe(() => console.log('Subscriber A'));
refresh$.subscribe(() => console.log('Subscriber B'));

refresh$.next();
```

Use `Subject` for events:

- refresh click
- modal close
- manual trigger
- destroy notifier in older patterns

Senior warning:

Do not use `Subject` as a default state store. If state has a current value, `BehaviorSubject` or signals may be a better fit.

## BehaviorSubject

`BehaviorSubject` stores the latest value and immediately emits it to new subscribers.

```ts
import {BehaviorSubject} from 'rxjs';

const selectedUserId$ = new BehaviorSubject<string | null>(null);

selectedUserId$.next('u1');

selectedUserId$.subscribe((id) => {
  console.log(id); // immediately receives latest value
});
```

Use `BehaviorSubject` for state that needs a current value.

Common Angular service pattern:

```ts
@Injectable({providedIn: 'root'})
export class AuthState {
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  readonly user$ = this.userSubject.asObservable();

  setUser(user: User | null) {
    this.userSubject.next(user);
  }
}
```

Why expose `asObservable()`?

To prevent outside code from calling `.next()`.

## ReplaySubject

`ReplaySubject` replays previous emissions to new subscribers.

```ts
import {ReplaySubject} from 'rxjs';

const messages$ = new ReplaySubject<string>(2);

messages$.next('one');
messages$.next('two');
messages$.next('three');

messages$.subscribe((value) => console.log(value));
// two
// three
```

Use it when late subscribers need previous values.

Senior warning:

Unbounded `ReplaySubject` can create memory issues.

Prefer a buffer size:

```ts
new ReplaySubject<Event>(1);
```

## AsyncSubject

`AsyncSubject` emits only the last value when completed.

```ts
import {AsyncSubject} from 'rxjs';

const result$ = new AsyncSubject<number>();

result$.subscribe((value) => console.log(value));

result$.next(1);
result$.next(2);
result$.complete();

// logs 2
```

It is less common in Angular apps.

Use it when only the final completed value matters.

## Subject vs BehaviorSubject vs ReplaySubject vs AsyncSubject

| Type | Has current value? | Replays old values? | Emits before complete? | Common use |
| --- | --- | --- | --- | --- |
| `Subject` | No | No | Yes | Events/triggers |
| `BehaviorSubject` | Yes | Latest value | Yes | Current state |
| `ReplaySubject` | No required initial value | Configurable buffer | Yes | Late subscribers need history |
| `AsyncSubject` | Final value only | Last value on complete | No | Final async result |

## Signals vs BehaviorSubject

Modern Angular often uses signals for local or service state.

BehaviorSubject:

- works with RxJS operators
- good for stream composition
- good for existing RxJS-heavy code

Signal:

- simpler current state
- template-friendly
- no manual subscription for reads
- better fine-grained Angular tracking

Modern service state with signal:

```ts
@Injectable({providedIn: 'root'})
export class AuthState {
  private readonly _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  setUser(user: User | null) {
    this._user.set(user);
  }
}
```

## Common RxJS Operators

### `map`

Transforms values.

```ts
users$.pipe(
  map((users) => users.length),
);
```

### `filter`

Filters emissions.

```ts
events$.pipe(
  filter((event) => event.type === 'click'),
);
```

### `tap`

Runs side effects without changing the value.

```ts
request$.pipe(
  tap(() => console.log('request completed')),
);
```

### `debounceTime`

Waits until emissions pause.

```ts
searchInput$.pipe(
  debounceTime(300),
);
```

### `distinctUntilChanged`

Skips repeated values.

```ts
query$.pipe(
  distinctUntilChanged(),
);
```

### `switchMap`

Cancels previous inner observable.

Best for search.

```ts
query$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((query) => this.api.search(query)),
);
```

### `mergeMap`

Runs inner observables concurrently.

Good when all requests should run.

### `concatMap`

Queues inner observables in order.

Good when order matters.

### `exhaustMap`

Ignores new emissions while current inner observable is active.

Good for preventing duplicate submit clicks.

```ts
submitClick$.pipe(
  exhaustMap(() => this.api.save()),
);
```

### `catchError`

Handles errors.

```ts
request$.pipe(
  catchError(() => of([])),
);
```

### `shareReplay`

Shares and replays a source.

```ts
users$ = this.http.get<User[]>('/api/users').pipe(
  shareReplay({bufferSize: 1, refCount: true}),
);
```

Senior warning:

Incorrect `shareReplay` usage can keep subscriptions alive longer than expected.

## Unsubscription

Prefer:

- `async` pipe in templates
- `takeUntilDestroyed`
- signals interop

Modern cleanup:

```ts
const destroyRef = inject(DestroyRef);

stream$.pipe(
  takeUntilDestroyed(destroyRef),
).subscribe();
```

Older pattern:

```ts
private readonly destroy$ = new Subject<void>();

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

## Common Angular Patterns

Search:

```ts
results$ = this.query$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((query) => this.searchService.search(query)),
);
```

Prevent double submit:

```ts
save$ = this.saveClick$.pipe(
  exhaustMap(() => this.ordersService.save()),
);
```

Sequential writes:

```ts
updates$ = this.updateQueue$.pipe(
  concatMap((update) => this.api.update(update)),
);
```

Concurrent loads:

```ts
loads$ = ids$.pipe(
  mergeMap((id) => this.api.load(id), 4),
);
```

## Senior Best Practices

- use `Subject` for events, not default state
- use `BehaviorSubject` only when current RxJS state is needed
- expose readonly observable APIs with `asObservable()`
- avoid nested subscriptions
- know flattening operators deeply
- use `async` pipe or `takeUntilDestroyed`
- prefer signals for simple current UI state in modern Angular
- avoid unbounded `ReplaySubject`
- document stream ownership

## Interview Questions

### Subject vs BehaviorSubject?

`Subject` has no initial/current value and only emits new values. `BehaviorSubject` requires an initial value and emits the latest value to new subscribers.

### BehaviorSubject vs ReplaySubject?

`BehaviorSubject` stores one latest value and requires an initial value. `ReplaySubject` can replay multiple previous values and does not require an initial value.

### What is AsyncSubject?

It emits only the last value when the subject completes.

### Which subject should be used for state?

Historically `BehaviorSubject`; in modern Angular, signals are often better for simple current state.

### Why avoid nested subscriptions?

They make cancellation, error handling, and composition harder.

### `switchMap` vs `mergeMap`?

`switchMap` cancels previous inner streams. `mergeMap` runs inner streams concurrently.

### `concatMap` vs `exhaustMap`?

`concatMap` queues work in order. `exhaustMap` ignores new work while one operation is active.

