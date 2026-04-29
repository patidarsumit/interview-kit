# 06. Conditional Rendering And Lists

Most real React screens show different UI depending on data state.

A production component should not only show success UI. It should also handle loading, error, and empty states.

## Conditional Rendering

React uses normal JavaScript conditions.

```tsx
function Greeting({isLoggedIn}: {isLoggedIn: boolean}) {
  if (isLoggedIn) {
    return <p>Welcome back.</p>;
  }

  return <p>Please sign in.</p>;
}
```

This is often the clearest style when branches are large.

## Ternary Rendering

Use ternary for small inline choices.

```tsx
{isLoggedIn ? <Dashboard /> : <LoginPage />}
```

Avoid deeply nested ternaries because they become hard to read.

## Logical AND Rendering

Use `&&` for optional UI.

```tsx
{error && <p role="alert">{error}</p>}
```

Be careful with numbers.

```tsx
{items.length && <p>Items found</p>}
```

If `items.length` is `0`, React may render `0`.

Better:

```tsx
{items.length > 0 && <p>Items found</p>}
```

## Loading, Error, Empty, Success

Good async UI usually models all states.

```tsx
type UsersState =
  | {status: 'loading'}
  | {status: 'error'; message: string}
  | {status: 'success'; users: User[]};
```

Rendering:

```tsx
function UsersPanel({state}: {state: UsersState}) {
  if (state.status === 'loading') {
    return <p>Loading users...</p>;
  }

  if (state.status === 'error') {
    return <p role="alert">{state.message}</p>;
  }

  if (state.users.length === 0) {
    return <p>No users found.</p>;
  }

  return <UserList users={state.users} />;
}
```

This is much better than showing a blank screen.

## Rendering Lists

Use `map` to render lists.

```tsx
function UserList({users}: {users: User[]}) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

Each item needs a `key`.

## Why Keys Matter

Keys help React match old and new items between renders.

Imagine this list:

```text
u1 Sumit
u2 Priya
u3 Rahul
```

If Priya is removed, React uses keys to know which item disappeared.

Without stable keys, React can reuse DOM and component state incorrectly.

## Bad Key: Array Index

Avoid:

```tsx
{users.map((user, index) => (
  <li key={index}>{user.name}</li>
))}
```

This can break when:

- sorting
- filtering
- inserting
- deleting
- list item has local state
- list item has input fields

Use stable IDs:

```tsx
{users.map((user) => (
  <li key={user.id}>{user.name}</li>
))}
```

## When Index Key Is Acceptable

Index key is acceptable only when the list is static.

Example:

```tsx
const steps = ['Account', 'Profile', 'Confirm'];

{steps.map((step, index) => (
  <li key={index}>{step}</li>
))}
```

The list never reorders, inserts, or deletes.

## Filtering Lists

```tsx
const visibleUsers = users.filter((user) =>
  user.name.toLowerCase().includes(query.toLowerCase()),
);
```

Then render:

```tsx
{visibleUsers.map((user) => (
  <UserCard key={user.id} user={user} />
))}
```

For expensive filtering, use `useMemo`.

## Large Lists

Rendering thousands of DOM nodes can be slow.

Use:

- pagination
- server-side filtering
- infinite scroll
- virtualization

Senior point:

Do not solve huge list performance only with `memo`. Reduce DOM work first.

## Common Mistakes

- using index keys for dynamic lists
- forgetting empty states
- deeply nested ternaries
- rendering `0` accidentally with `&&`
- doing expensive calculations inside `map`
- rendering huge lists without pagination or virtualization

## Senior Best Practices

- model loading/error/empty/success states explicitly
- use stable IDs as keys
- keep conditional rendering readable
- extract large branches into components
- avoid expensive work inside render loops
- use virtualization for large lists

## Interview Questions

### Why are keys important?

Keys help React preserve item identity across renders.

### Why is index as key risky?

When list order changes, index keys can cause React to reuse the wrong DOM or component state.

### How do you handle async UI states?

Render loading, error, empty, and success states intentionally.

### How do you render huge lists?

Use pagination, server filtering, infinite scroll, or virtualization.

