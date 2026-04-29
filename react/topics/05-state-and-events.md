# 05. State And Events

State and events make React UI interactive.

State stores values that affect what the component renders.

Events are user or browser actions that update state.

## What Is State?

State is data that changes over time.

Examples:

- input text
- selected tab
- modal open/close
- loading status
- cart items
- current page number

If changing a value should update the UI, that value should usually be state.

## useState

`useState` creates component state.

```tsx
import {useState} from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

`count` is the current state.

`setCount` updates the state and tells React to render again.

## Functional Updates

When next state depends on previous state, use functional update.

Better:

```tsx
setCount((current) => current + 1);
```

This is safer than:

```tsx
setCount(count + 1);
```

Functional updates avoid stale state when multiple updates happen close together.

## Events

React event handlers are passed as functions.

```tsx
function SearchBox() {
  const [query, setQuery] = useState('');

  return (
    <input
      type="search"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
    />
  );
}
```

Common events:

- `onClick`
- `onChange`
- `onSubmit`
- `onBlur`
- `onFocus`
- `onKeyDown`

## Controlled Input

A controlled input gets its value from React state.

```tsx
function EmailInput() {
  const [email, setEmail] = useState('');

  return (
    <input
      type="email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
  );
}
```

React state is the source of truth.

Use controlled inputs when:

- validation depends on value
- button disabled state depends on value
- value must be submitted or transformed
- form state must be predictable

## Immutable Updates

Do not mutate state directly.

Wrong:

```tsx
items.push(newItem);
setItems(items);
```

Right:

```tsx
setItems((items) => [...items, newItem]);
```

Wrong:

```tsx
user.name = 'New Name';
setUser(user);
```

Right:

```tsx
setUser((user) => ({...user, name: 'New Name'}));
```

React relies on new references to detect changes.

## Derived State

Do not store values that can be calculated from existing state.

Wrong:

```tsx
const [total, setTotal] = useState(0);

useEffect(() => {
  setTotal(items.reduce((sum, item) => sum + item.price, 0));
}, [items]);
```

Right:

```tsx
const total = items.reduce((sum, item) => sum + item.price, 0);
```

Derived state creates extra synchronization bugs.

## Lifting State Up

If two sibling components need the same state, move the state to their nearest common parent.

```tsx
function Parent() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <>
      <UserList onSelect={setSelectedUserId} />
      <UserDetails userId={selectedUserId} />
    </>
  );
}
```

Do not lift state higher than necessary.

## Batching

React can batch multiple state updates into one render.

```tsx
function handleClick() {
  setFirstName('Sumit');
  setLastName('Patel');
}
```

React usually renders once after both updates.

## Common Mistakes

- mutating arrays or objects in state
- storing duplicate derived values
- lifting state too high
- using state for values that do not render
- forgetting functional updates
- mixing controlled and uncontrolled input behavior

## Senior Best Practices

- keep state as close as possible
- use functional updates when depending on previous state
- update arrays/objects immutably
- calculate derived values during render
- use `useReducer` for complex related transitions
- separate UI state from server state

## Interview Questions

### What is state in React?

State is data owned by a component that can change over time and affects rendering.

### Why not mutate state directly?

React needs new references to detect changes and schedule rendering predictably.

### What is a controlled component?

A form element whose value is controlled by React state.

### What is lifting state up?

Moving shared state to the closest common parent of components that need it.

### What is derived state?

Data that can be calculated from existing props or state. It usually should not be stored separately.

