# 08. useEffect And Side Effects

`useEffect` is one of the most asked React interview topics.

The most important sentence:

> `useEffect` is for synchronizing a component with something outside React.

It is not a general-purpose place to put all logic.

## What Is A Side Effect?

A side effect is work that affects something outside the render output.

Examples:

- fetch data manually
- subscribe to websocket
- add DOM event listener
- start timer
- write to local storage
- send analytics event
- update document title

## Basic Syntax

```tsx
useEffect(() => {
  document.title = `User: ${userName}`;
}, [userName]);
```

This means:

- run the effect after render
- run it again when `userName` changes

## Dependency Array

The dependency array tells React which reactive values the effect depends on.

```tsx
useEffect(() => {
  console.log(searchTerm);
}, [searchTerm]);
```

Reactive values include:

- props
- state
- variables declared inside the component
- functions declared inside the component

If an effect uses a reactive value, it usually belongs in the dependency array.

## Empty Dependency Array

```tsx
useEffect(() => {
  console.log('Mounted');
}, []);
```

This runs after the first render.

In development, React Strict Mode may run mount logic more than once to reveal unsafe effects.

Senior point:

Do not write effects that break if mounted, cleaned up, and mounted again.

## Cleanup Function

Use cleanup for subscriptions, event listeners, timers, and in-flight async work.

```tsx
useEffect(() => {
  const id = window.setInterval(() => {
    console.log('tick');
  }, 1000);

  return () => window.clearInterval(id);
}, []);
```

React runs cleanup:

- before the effect runs again
- when the component unmounts

## Event Listener Example

```tsx
useEffect(() => {
  function handleResize() {
    console.log(window.innerWidth);
  }

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

Without cleanup, the listener remains after the component unmounts.

## Fetch With AbortController

```tsx
useEffect(() => {
  const controller = new AbortController();

  async function loadUsers() {
    try {
      const response = await fetch('/api/users', {
        signal: controller.signal,
      });
      const users = await response.json();
      setUsers(users);
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        setError('Could not load users');
      }
    }
  }

  loadUsers();

  return () => controller.abort();
}, []);
```

This prevents stale requests from updating state after the component is gone.

## Avoid Effect For Derived State

Wrong:

```tsx
const [fullName, setFullName] = useState('');

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

Right:

```tsx
const fullName = `${firstName} ${lastName}`;
```

Derived values should usually be calculated during render.

Use `useMemo` only if the calculation is expensive.

## Stale Closure Problem

An effect captures values from the render where it was created.

Problem:

```tsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);

  return () => clearInterval(id);
}, []);
```

`count` stays the value from the first render.

Better:

```tsx
useEffect(() => {
  const id = setInterval(() => {
    setCount((current) => current + 1);
  }, 1000);

  return () => clearInterval(id);
}, []);
```

Functional update reads the latest state safely.

## Effect Runs Too Often

This often happens because an object or function is recreated every render.

Problem:

```tsx
const options = {roomId};

useEffect(() => {
  connect(options);
}, [options]);
```

`options` is a new object every render.

Better:

```tsx
useEffect(() => {
  const options = {roomId};
  connect(options);
}, [roomId]);
```

Move objects/functions inside the effect when possible.

## When Not To Use useEffect

Do not use effect for:

- calculating derived values
- handling click logic that can run inside event handler
- transforming data for render
- resetting state that could be modeled with keys or controlled props

Example:

```tsx
function ProductList({products, query}: Props) {
  const visibleProducts = products.filter((product) =>
    product.name.includes(query),
  );

  return <List items={visibleProducts} />;
}
```

No effect needed.

## Common Interview Bugs

### Infinite Loop

```tsx
useEffect(() => {
  setUser({name: 'Sumit'});
}, [user]);
```

The effect updates `user`, which changes `user`, which reruns the effect.

### Missing Cleanup

```tsx
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);
```

This leaks listeners.

### Missing Dependency

```tsx
useEffect(() => {
  fetchUser(userId);
}, []);
```

If `userId` changes, the effect does not refetch.

## Senior Best Practices

- use effects only for external synchronization
- include correct dependencies
- clean up timers, listeners, subscriptions, and requests
- avoid derived state effects
- make effects safe under Strict Mode remounting
- use custom hooks to isolate complex effects
- prefer framework or query-library data loading for production server state

## Interview Questions

### What is `useEffect` used for?

Synchronizing a component with external systems such as browser APIs, subscriptions, timers, analytics, or manual data fetching.

### Why does an effect run again?

Because one of its dependencies changed.

### Why does an effect run twice in development?

React Strict Mode can intentionally mount, clean up, and remount components in development to reveal unsafe effects.

### What is cleanup used for?

Removing subscriptions, timers, event listeners, and cancelling async work.

### What is stale closure?

When an effect or callback uses old values captured from a previous render.

### Should you use `useEffect` to calculate derived state?

Usually no. Calculate derived values during render.

