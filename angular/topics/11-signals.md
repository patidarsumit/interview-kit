# 11. Signals

Signals are Angular's fine-grained reactivity model.

A signal wraps a value and notifies Angular when that value changes.

## Writable Signal

```ts
import {signal} from '@angular/core';

const count = signal(0);

console.log(count());

count.set(3);
count.update((value) => value + 1);
```

Signals are read by calling them as functions.

## Computed Signal

```ts
import {computed, signal} from '@angular/core';

const count = signal(2);
const double = computed(() => count() * 2);

console.log(double());
```

Computed signals are:

- read-only
- lazy
- memoized
- dependency-tracked

## Dynamic Dependencies

```ts
const show = signal(false);
const count = signal(0);

const message = computed(() => {
  if (!show()) {
    return 'Hidden';
  }

  return `Count: ${count()}`;
});
```

When `show` is false, `count` is not tracked.

## Readonly Signals

```ts
private readonly _count = signal(0);
readonly count = this._count.asReadonly();
```

Use this pattern in services to expose state without allowing external mutation.

## Effects

```ts
import {effect, signal} from '@angular/core';

const userId = signal('u1');

effect(() => {
  console.log('User changed', userId());
});
```

Use effects for side effects, not for deriving state.

## Signals vs RxJS

Signals are good for:

- local state
- derived state
- template state
- synchronous reactive values

RxJS is good for:

- streams
- events over time
- cancellation
- websocket streams
- complex async composition

## Senior Best Practices

- use `computed` for derived state
- expose readonly signals from services
- avoid deep mutation inside signal values
- avoid effects for state propagation
- use RxJS interop when dealing with streams
- prefer immutable updates

## Interview Questions

### What is a signal?

A reactive value container that Angular can track precisely.

### Why are computed signals useful?

They derive state lazily and memoize the result until dependencies change.

### Signal vs observable?

Signals hold current synchronous state. Observables model streams over time.

