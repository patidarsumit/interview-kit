# 12. Linked Signal, Resources, And Effects

Angular's signal model includes more than `signal()` and `computed()`.

Modern Angular also includes APIs for dependent writable state, async reactive state, and side effects.

## `linkedSignal`

`linkedSignal` is useful when writable state depends on another reactive value.

Common use case:

- selected item depends on a list
- default choice depends on inputs
- writable value should reset when source data changes

Example idea:

```ts
const users = signal([
  {id: 'u1', name: 'Amit'},
  {id: 'u2', name: 'Sumit'},
]);

const selectedUserId = linkedSignal(() => users()[0]?.id ?? null);
```

If the source changes, the linked signal can update according to the relationship.

## `resource`

Resources model async state with signals.

Use resources when a signal-driven parameter should trigger async loading.

Conceptual example:

```ts
const userId = signal('u1');

const userResource = resource({
  params: () => ({id: userId()}),
  loader: async ({params}) => {
    const response = await fetch(`/api/users/${params.id}`);
    return response.json();
  },
});
```

Resource state commonly includes:

- value
- loading state
- error state
- reload behavior

## `httpResource`

Angular HTTP also has reactive data fetching support through `httpResource`.

Use it when HTTP data should be driven by reactive state.

```ts
const userId = signal('u1');

const user = httpResource(() => `/api/users/${userId()}`);
```

## Effects

Effects run side effects when signals they read change.

```ts
effect(() => {
  localStorage.setItem('theme', theme());
});
```

Good effect use cases:

- logging
- analytics
- syncing to local storage
- calling non-reactive browser APIs
- integrating third-party libraries

Avoid:

- using effects to derive state
- writing to signals in effects without understanding cycles
- hidden data flow

## `untracked`

Use `untracked` when a signal read should not become a dependency.

```ts
effect(() => {
  const currentUser = user();
  const currentCounter = untracked(counter);

  console.log(currentUser, currentCounter);
});
```

## Senior Best Practices

- use `computed` for derivation
- use `effect` for side effects
- use resources for async signal-driven loading
- keep async error states visible in UI
- avoid reactive loops
- avoid hiding important business flow inside effects

## Interview Questions

### When should you use `effect`?

When signal changes need to trigger a side effect outside normal state derivation.

### What is the danger of effects?

They can create hidden data flow, reactive loops, and hard-to-debug side effects if overused.

### Resource vs service method?

A service method performs an action. A resource models reactive async state connected to signals.

