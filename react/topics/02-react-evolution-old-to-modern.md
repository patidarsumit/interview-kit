# 02. React Evolution: Older To Modern React

React has changed from class-heavy client-rendered apps to hook-based, framework-aware, server-capable applications.

This topic is important because many companies have older React codebases, but interviews expect modern React knowledge.

## Older React Style

Older React commonly used:

- class components
- lifecycle methods
- render props
- higher-order components
- manual performance methods
- Redux for most shared state
- client-side rendering by default

Example class component:

```tsx
class Counter extends React.Component<{}, {count: number}> {
  state = {
    count: 0,
  };

  render() {
    return (
      <button onClick={() => this.setState({count: this.state.count + 1})}>
        {this.state.count}
      </button>
    );
  }
}
```

This works, but classes add complexity:

- `this` binding
- lifecycle method splitting
- harder logic reuse
- verbose code

## Class Lifecycle Methods

Older class components used lifecycle methods.

```tsx
componentDidMount() {
  // after first render
}

componentDidUpdate() {
  // after update
}

componentWillUnmount() {
  // cleanup
}
```

These often split related logic across multiple methods.

For example, subscription setup and cleanup are in different places.

## Modern Function Components

Modern React uses function components and hooks.

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount((value) => value + 1)}>
      {count}
    </button>
  );
}
```

Benefits:

- less boilerplate
- no `this`
- reusable logic through custom hooks
- related setup/cleanup can stay together
- easier TypeScript props in many cases

## Lifecycle To useEffect

Some lifecycle logic maps to `useEffect`.

Class:

```tsx
componentDidMount() {
  window.addEventListener('resize', this.handleResize);
}

componentWillUnmount() {
  window.removeEventListener('resize', this.handleResize);
}
```

Function:

```tsx
useEffect(() => {
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

Senior point:

Do not think of `useEffect` as a direct replacement for every lifecycle method. Effects are for synchronizing with external systems.

## Render Props And HOCs

Before hooks, logic reuse often used render props or higher-order components.

Render prop:

```tsx
<MousePosition>
  {(position) => <p>{position.x}</p>}
</MousePosition>
```

Higher-order component:

```tsx
const UserPageWithAuth = withAuth(UserPage);
```

Hooks replaced many of these use cases.

```tsx
function UserPage() {
  const user = useCurrentUser();
  return <p>{user.name}</p>;
}
```

Render props and HOCs are still valid, but hooks are usually simpler for stateful logic reuse.

## State Management Evolution

Older React apps often used Redux for almost everything.

Modern React is more selective.

Use:

- local state for local UI
- Context for app-level values
- TanStack Query/SWR/framework loaders for server state
- Redux Toolkit for complex predictable app state
- Zustand for simpler shared client state

Senior point:

Do not put server cache, form input, modal state, and auth state all in one global store by default.

## Rendering Evolution

Older apps were often client-side rendered.

Modern React apps may use:

- CSR: render in browser
- SSR: render HTML on server
- SSG: prerender static pages
- React Server Components: render components on server without shipping their code to browser
- streaming and Suspense boundaries

Frameworks such as Next.js make these patterns practical.

## React 18 And Concurrent Features

React 18 introduced concurrent rendering foundations and APIs like:

- automatic batching
- transitions
- Suspense improvements
- streaming SSR support

Example transition:

```tsx
const [isPending, startTransition] = useTransition();

function handleChange(value: string) {
  setInput(value);

  startTransition(() => {
    setQuery(value);
  });
}
```

This helps keep urgent updates responsive.

## React 19 Era

React 19 includes modern async and server-aware APIs such as:

- Actions
- `useActionState`
- `useOptimistic`
- `use`
- improved ref behavior
- document metadata support
- Server Components support

Example:

```tsx
const [state, formAction, isPending] = useActionState(saveUser, initialState);
```

This helps model async form state more directly.

## React Compiler

React Compiler can automatically optimize supported components and values at build time.

This reduces the need for manual memoization in compiler-enabled projects.

Senior point:

You still need pure render logic. Compiler does not fix bad state ownership, unnecessary global updates, or expensive third-party code.

## Migration Advice

When working on an older app:

- write new components as function components
- convert class components gradually
- add tests before risky rewrites
- avoid big-bang migrations
- replace HOCs/render props only when it improves clarity
- move server state to a query/framework data layer where useful
- keep Redux if it is working and valuable

## Common Mistakes

- rewriting the whole app just to be modern
- converting lifecycle methods to effects mechanically
- putting every old Redux state into Context
- adding memoization everywhere without measurement
- ignoring Strict Mode effect behavior

## Interview Questions

### Why did React move from classes to hooks?

Hooks make stateful logic reusable and avoid class lifecycle and `this` complexity.

### Are class components still valid?

Yes. They still work, but modern React code usually uses function components and hooks.

### What replaced render props and HOCs?

Hooks replaced many stateful logic reuse cases, although render props and HOCs are still valid patterns.

### Should every old app be migrated immediately?

No. Migrate incrementally based on value, risk, and test coverage.

### Why is `useEffect` not just `componentDidMount`?

Because effects synchronize with external systems and rerun based on dependencies, not only lifecycle moments.

