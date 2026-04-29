# 10. Context API

Context lets you pass values deeply through the component tree without manually passing props at every level.

This solves prop drilling.

## Prop Drilling Problem

Without Context:

```tsx
function App() {
  const theme = 'dark';
  return <Layout theme={theme} />;
}

function Layout({theme}: {theme: string}) {
  return <Sidebar theme={theme} />;
}

function Sidebar({theme}: {theme: string}) {
  return <ThemeLabel theme={theme} />;
}
```

`Layout` and `Sidebar` may not need `theme`, but they pass it down anyway.

## Basic Context

```tsx
import {createContext, useContext} from 'react';

const ThemeContext = createContext<'light' | 'dark'>('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}

function Page() {
  const theme = useContext(ThemeContext);
  return <p>Theme: {theme}</p>;
}
```

Any child under `ThemeContext.Provider` can read the value.

## Custom Context Hook

In production, create a custom hook so missing providers fail clearly.

```tsx
type AuthUser = {
  id: string;
  name: string;
};

const AuthContext = createContext<AuthUser | null>(null);

export function useAuthUser() {
  const user = useContext(AuthContext);

  if (!user) {
    throw new Error('useAuthUser must be used inside AuthProvider');
  }

  return user;
}
```

## When To Use Context

Good uses:

- theme
- locale
- authenticated user summary
- feature flags
- permissions
- dependency injection-style values
- design system settings

Context is best for values many components need.

## When Not To Use Context

Avoid using Context for every state value.

Poor uses:

- every input value in a form
- rapidly changing mouse position
- huge object with unrelated fields
- server cache data that needs refetching and deduping
- complex global state with many transitions

Context updates can re-render all consumers of that context.

## Stable Provider Values

Problem:

```tsx
<ThemeContext.Provider value={{theme, toggleTheme}}>
  {children}
</ThemeContext.Provider>
```

This creates a new object every render.

Better:

```tsx
const value = useMemo(() => ({theme, toggleTheme}), [theme, toggleTheme]);

return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
```

## Split Contexts

For performance and clarity, split read and write contexts.

```tsx
const CountValueContext = createContext(0);
const CountActionsContext = createContext<(() => void) | null>(null);
```

Components that only dispatch actions do not need to re-render when the value changes.

## Context vs Props

Use props when:

- parent-child relationship is simple
- value is used by one or two levels
- component should be reusable and explicit

Use Context when:

- many levels need the same value
- prop drilling is making code noisy
- value is truly app-level or feature-level

## Context vs Redux

Context only passes values.

Redux manages:

- state transitions
- actions
- reducers
- middleware
- devtools
- predictable global updates

Context can replace simple global props, but it is not automatically a full state management solution.

## Common Mistakes

- putting all app state in one context
- passing unstable objects/functions as provider values
- using context for local component state
- using context for server cache instead of a data library
- not creating custom hooks for required contexts

## Senior Best Practices

- use Context for app-level values
- keep context values small and focused
- split contexts when update frequency differs
- memoize provider values when needed
- use custom hooks to read context
- choose Redux/Zustand/query libraries when state complexity requires them

## Interview Questions

### What problem does Context solve?

It avoids prop drilling by letting deeply nested components read shared values directly.

### Does Context replace Redux?

Not always. Context passes values. Redux manages structured global state transitions and tooling.

### Can Context cause performance issues?

Yes. When a context value changes, consumers re-render. Large or frequently changing context values can hurt performance.

### What values are good for Context?

Theme, locale, auth user summary, permissions, and feature flags.

