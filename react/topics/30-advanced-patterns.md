# 30. Advanced Patterns

React patterns help compose UI and behavior cleanly.

Use patterns to reduce complexity, not to look clever.

## Composition

React favors composition over inheritance.

```tsx
function Layout({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {header}
      <main>{children}</main>
    </>
  );
}
```

Composition lets parent components decide what goes inside.

## Controlled Component Pattern

Parent owns state and child receives value plus change handler.

```tsx
function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}
```

Use it when parent needs control.

## Uncontrolled Component Pattern

Component owns its own state.

```tsx
function Toggle() {
  const [open, setOpen] = useState(false);
  return <button onClick={() => setOpen((value) => !value)}>{String(open)}</button>;
}
```

Use it for self-contained UI.

## Compound Components

Compound components work together under a shared parent.

Example:

```tsx
<Tabs>
  <Tab id="profile">Profile</Tab>
  <TabPanel id="profile">Profile content</TabPanel>
</Tabs>
```

Useful for:

- tabs
- accordion
- menu
- modal
- select

They often use Context internally.

## Render Props

Render props pass a function as children.

```tsx
<MousePosition>
  {(position) => <p>{position.x}</p>}
</MousePosition>
```

This was common before hooks.

## Higher-Order Components

HOC wraps a component and returns a new component.

```tsx
const ProtectedPage = withAuth(Page);
```

Hooks replaced many HOC use cases, but HOCs still appear in older code and libraries.

## Custom Hooks vs Patterns

Prefer custom hooks for reusable stateful logic.

Prefer components/composition for reusable UI structure.

## Common Mistakes

- over-engineering simple components
- making components too configurable
- hiding data flow with too many wrappers
- using Context inside compound components without clear boundaries
- using legacy patterns where a hook is simpler

## Senior Best Practices

- prefer composition
- use controlled components when parent needs control
- use compound components for related UI groups
- use custom hooks for reusable behavior
- keep APIs small and predictable
- avoid abstractions before repetition is real

## Interview Questions

### Composition vs inheritance?

React favors composition because UI can be assembled from smaller components.

### What is a controlled component?

A component whose value is owned by its parent and changed through callbacks.

### What are compound components?

Related components that coordinate through a shared parent, often using Context internally.

