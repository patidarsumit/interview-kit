# 19. React Compiler And Memoization

Memoization is a performance optimization.

It should not be the first answer to every React performance problem.

React Compiler can reduce the need for manual memoization in supported projects, but you still need good component design.

## Why Components Re-render

A component can re-render when:

- its state changes
- its parent renders
- context it reads changes
- external store value changes

Re-rendering is not automatically bad.

It is only a problem when rendering is expensive or causes visible slowness.

## `memo`

`memo` memoizes a component.

```tsx
const UserRow = memo(function UserRow({user}: {user: User}) {
  return <li>{user.name}</li>;
});
```

If props are the same, React can skip re-rendering that component.

Important:

- `memo` is not a guarantee
- state changes still re-render the component
- context changes still re-render consumers
- new object/function props can break memoization

## `useMemo`

`useMemo` caches a calculated value.

```tsx
const visibleUsers = useMemo(() => {
  return users.filter((user) => user.name.includes(query));
}, [users, query]);
```

Use it when:

- calculation is expensive
- dependencies are stable
- component renders often

Do not use `useMemo` for side effects.

Wrong:

```tsx
useMemo(() => {
  localStorage.setItem('theme', theme);
}, [theme]);
```

Use `useEffect` for side effects.

## `useCallback`

`useCallback` caches a function reference.

```tsx
const handleSave = useCallback(() => {
  saveUser(userId);
}, [userId]);
```

Use it when:

- passing callback to a memoized child
- callback is a dependency of another hook
- library expects stable function references

Do not wrap every function automatically.

## React Compiler

React Compiler analyzes components at build time and can apply memoization automatically.

This can reduce manual use of:

- `memo`
- `useMemo`
- `useCallback`

But it does not replace:

- pure render logic
- good state ownership
- correct effects
- stable list keys
- sensible component boundaries

## Compiler Directives

React Compiler supports directives in compiler-enabled apps.

`"use memo"` can opt a function into compilation in annotation mode.

```tsx
function ProductList() {
  "use memo";

  return <section>...</section>;
}
```

`"use no memo"` can opt out temporarily.

```tsx
function LegacyWidget() {
  "use no memo";

  return <section>...</section>;
}
```

Use opt-out sparingly and document why.

## Common Mistakes

- memoizing before measuring
- using `useMemo` for side effects
- passing new objects to memoized children
- assuming `memo` stops all renders
- ignoring context re-renders
- thinking React Compiler fixes bad architecture

## Senior Best Practices

- measure with React DevTools Profiler
- keep render logic pure
- keep state local where possible
- use memoization for measured expensive work
- avoid unnecessary object/function prop creation for memoized children
- follow compiler rules when enabled

## Interview Questions

### Do you always need `React.memo`?

No. Use it when measured re-renders are expensive. React Compiler may reduce manual memoization in supported apps.

### `useMemo` vs `useCallback`?

`useMemo` caches a calculated value. `useCallback` caches a function reference.

### Does `memo` prevent state updates?

No. A memoized component still re-renders when its own state or consumed context changes.

### What does React Compiler do?

It can automatically optimize components and values at build time in supported setups.

