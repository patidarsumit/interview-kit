# 12. Custom Hooks

Custom hooks let you extract reusable stateful logic from components.

A custom hook is just a function that uses React hooks and starts with `use`.

## Why Custom Hooks Exist

Without custom hooks, components can become full of repeated logic:

- local storage logic
- window resize listeners
- debounced values
- API loading state
- form helpers
- subscriptions

Custom hooks keep components focused on UI.

## Basic Custom Hook

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

## Local Storage Hook

```tsx
function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) ?? initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
```

This hook hides browser storage logic from the component.

## Debounce Hook

```tsx
function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);

  return debouncedValue;
}
```

Use it for search inputs to avoid calling API on every key press.

## What Belongs In A Custom Hook

Good candidates:

- reusable state logic
- effect setup/cleanup
- browser APIs
- subscriptions
- reusable form behavior
- data loading wrappers
- feature-specific state operations

Avoid extracting too early.

If logic is used once and extraction makes code harder to understand, keep it in the component.

## Return Shape

Return an object when names matter:

```tsx
return {user, loading, error, reload};
```

Return a tuple when the pattern is familiar:

```tsx
return [value, setValue] as const;
```

Be consistent.

## Testing Custom Hooks

Complex hooks should be tested.

```tsx
const {result} = renderHook(() => useToggle(false));

act(() => {
  result.current.toggle();
});

expect(result.current.value).toBe(true);
```

## Common Mistakes

- naming hook without `use`
- calling hooks conditionally inside custom hook
- hiding too many side effects
- returning unstable functions when consumers need stability
- making a hook too generic too early
- mixing unrelated responsibilities

## Senior Best Practices

- extract hooks for reuse or clarity
- keep hooks focused
- document external side effects
- expose a simple return API
- test hooks with complex behavior
- keep feature-specific hooks near the feature

## Interview Questions

### What is a custom hook?

A function starting with `use` that uses React hooks to reuse stateful logic.

### Why create a custom hook?

To reuse logic and keep components focused on rendering UI.

### Can custom hooks share state between components?

Not by themselves. Each hook call gets its own state unless it uses shared external state or context.

### What should a custom hook return?

Whatever makes the API clear: often an object for named values or a tuple for state-like patterns.

