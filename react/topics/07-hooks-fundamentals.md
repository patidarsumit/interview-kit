# 07. Hooks Fundamentals

Hooks let function components use React features such as state, effects, refs, context, reducers, transitions, and memoization.

Before hooks, React used class components for state and lifecycle behavior.

Modern React mostly uses function components with hooks.

## Why Hooks Exist

Hooks solve three problems:

- reuse stateful logic without higher-order components or render props
- avoid class lifecycle complexity
- keep related logic together inside a component or custom hook

Example:

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount((value) => value + 1)}>
      Count: {count}
    </button>
  );
}
```

## Rules Of Hooks

Hooks must be called:

- at the top level
- from React components or custom hooks

Do not call hooks:

- inside `if`
- inside loops
- inside nested functions
- after early returns

Wrong:

```tsx
function Profile({isLoggedIn}: {isLoggedIn: boolean}) {
  if (isLoggedIn) {
    const [name, setName] = useState('');
  }

  return null;
}
```

Right:

```tsx
function Profile({isLoggedIn}: {isLoggedIn: boolean}) {
  const [name, setName] = useState('');

  if (!isLoggedIn) {
    return null;
  }

  return <p>{name}</p>;
}
```

React depends on hook call order to match hook state between renders.

## `useState`

Use `useState` for simple component state.

```tsx
const [isOpen, setIsOpen] = useState(false);
```

When next state depends on previous state, use functional update.

```tsx
setCount((current) => current + 1);
```

Use it for:

- input values
- modal open/close
- selected tab
- simple counters
- toggles

Avoid storing derived values that can be calculated during render.

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

## `useReducer`

Use `useReducer` when state transitions are more complex.

```tsx
type State = {
  count: number;
};

type Action = {type: 'increment'} | {type: 'reset'};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'reset':
      return {count: 0};
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, {count: 0});

  return (
    <button type="button" onClick={() => dispatch({type: 'increment'})}>
      {state.count}
    </button>
  );
}
```

Use it for:

- multi-step forms
- cart state
- complex filters
- state machines
- related values that update together

## `useEffect`

Use `useEffect` to synchronize with external systems.

```tsx
useEffect(() => {
  document.title = title;
}, [title]);
```

Good effect use cases:

- event listeners
- timers
- subscriptions
- analytics
- browser APIs
- manual data fetching

Do not use effects for normal derived rendering values.

## `useRef`

Use `useRef` for mutable values that do not trigger re-render.

```tsx
const inputRef = useRef<HTMLInputElement>(null);

function focusInput() {
  inputRef.current?.focus();
}
```

Use it for:

- DOM access
- storing timeout IDs
- storing latest value for callbacks
- imperative escape hatches

Do not use refs as a replacement for state when UI should update.

## `useContext`

Use `useContext` to read a value from React Context.

```tsx
const ThemeContext = createContext('light');

function ThemeLabel() {
  const theme = useContext(ThemeContext);
  return <p>Theme: {theme}</p>;
}
```

Use context for:

- theme
- locale
- auth summary
- feature flags
- app-level dependencies

Avoid putting frequently changing huge objects in one global context.

## `useMemo`

Use `useMemo` to cache an expensive calculation.

```tsx
const filteredProducts = useMemo(() => {
  return products.filter((product) => product.name.includes(query));
}, [products, query]);
```

Use it when:

- calculation is expensive
- dependencies are stable
- re-render happens often enough to matter

Do not use it for side effects.

Wrong:

```tsx
useMemo(() => {
  localStorage.setItem('theme', theme);
}, [theme]);
```

Use `useEffect` for side effects.

## `useCallback`

Use `useCallback` to keep a function reference stable.

```tsx
const handleSave = useCallback(() => {
  saveUser(userId);
}, [userId]);
```

It is useful when:

- passing callbacks to memoized children
- callback is a dependency of another hook
- a library expects stable callback references

Do not wrap every function in `useCallback` blindly.

## `useTransition`

Use `useTransition` to mark non-urgent UI updates.

```tsx
const [isPending, startTransition] = useTransition();

function handleSearch(value: string) {
  setInput(value);

  startTransition(() => {
    setQuery(value);
  });
}
```

Use it when urgent updates, such as typing, should stay responsive while expensive UI updates happen in the background.

## React 19 Hooks

React 19 adds important async/action hooks.

### `useActionState`

Use `useActionState` to manage state for an async action, commonly a form action.

```tsx
const [state, formAction, isPending] = useActionState(saveUser, initialState);
```

It gives:

- current action state
- action function for form/action
- pending status

### `useOptimistic`

Use `useOptimistic` to show expected UI before the server confirms.

```tsx
const [optimisticLiked, setOptimisticLiked] = useOptimistic(liked);
```

Use it for:

- likes
- comments
- quick status changes
- optimistic delete with rollback

## Custom Hooks

Custom hooks extract reusable stateful logic.

```tsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);

  function toggle() {
    setValue((current) => !current);
  }

  return {value, toggle, setValue};
}
```

Usage:

```tsx
function MenuButton() {
  const menu = useToggle(false);

  return (
    <button type="button" onClick={menu.toggle}>
      {menu.value ? 'Close' : 'Open'}
    </button>
  );
}
```

Custom hooks should start with `use`.

## Choosing The Right Hook

- simple UI state: `useState`
- complex related state: `useReducer`
- external synchronization: `useEffect`
- DOM/mutable value: `useRef`
- app-wide value: `useContext`
- expensive derived calculation: `useMemo`
- stable callback reference: `useCallback`
- non-urgent update: `useTransition`
- reusable logic: custom hook

## Common Mistakes

- calling hooks conditionally
- using effects for derived state
- missing dependencies in effects
- overusing `useMemo` and `useCallback`
- storing everything in context
- using refs for render state
- forgetting cleanup in effects

## Senior Best Practices

- keep render logic pure
- use the simplest hook that solves the problem
- prefer local state before global state
- treat effects as synchronization, not data derivation
- extract custom hooks only when reuse or clarity improves
- measure before memoizing
- keep dependency arrays correct

## Interview Questions

### What are hooks?

Functions that let React function components use state and React features.

### Why must hooks be called in the same order?

React uses hook call order to associate hook state with each render.

### `useState` vs `useReducer`?

`useState` is good for simple state. `useReducer` is better for complex state transitions.

### `useMemo` vs `useCallback`?

`useMemo` caches a calculated value. `useCallback` caches a function reference.

### When should you create a custom hook?

When stateful logic is reused or when extracting it makes a component easier to understand.

