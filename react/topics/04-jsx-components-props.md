# 04. JSX, Components, And Props

JSX, components, and props are the base of React.

React applications are built by splitting UI into small components and passing data to them through props.

## What Is JSX?

JSX is a syntax that lets you write UI that looks like HTML inside JavaScript or TypeScript.

```tsx
const element = <h1>Hello React</h1>;
```

JSX is not exactly HTML.

Important differences:

- use `className` instead of `class`
- use `htmlFor` instead of `for`
- JavaScript expressions go inside `{}`
- attributes use camelCase, such as `onClick`
- every tag must be closed

Example:

```tsx
function WelcomeMessage() {
  const userName = 'Sumit';

  return <h1 className="title">Welcome, {userName}</h1>;
}
```

`{userName}` is a JavaScript expression.

## What Is A Component?

A component is a reusable function that returns UI.

```tsx
function UserCard() {
  return (
    <article>
      <h2>Sumit</h2>
      <p>Frontend Developer</p>
    </article>
  );
}
```

Components should start with a capital letter.

Good:

```tsx
<UserCard />
```

Wrong:

```tsx
<userCard />
```

Lowercase JSX tags are treated as HTML elements.

## Props

Props are inputs passed from parent to child.

```tsx
type UserCardProps = {
  name: string;
  role: string;
};

function UserCard({name, role}: UserCardProps) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  );
}

export function UsersPage() {
  return <UserCard name="Sumit" role="Frontend Developer" />;
}
```

Think of props like function parameters.

```tsx
UserCard({name: 'Sumit', role: 'Frontend Developer'});
```

## Props Are Readonly

A child component should not mutate props.

Wrong:

```tsx
function UserCard({user}: {user: User}) {
  user.name = 'New Name';
  return <h2>{user.name}</h2>;
}
```

Right:

```tsx
function UserCard({user}: {user: User}) {
  return <h2>{user.name}</h2>;
}
```

If data must change, the parent should own state and pass a callback.

```tsx
function UserCard({
  user,
  onRename,
}: {
  user: User;
  onRename: (name: string) => void;
}) {
  return (
    <article>
      <h2>{user.name}</h2>
      <button type="button" onClick={() => onRename('New Name')}>
        Rename
      </button>
    </article>
  );
}
```

## Children

`children` is a special prop for nested content.

```tsx
import type {ReactNode} from 'react';

function Panel({title, children}: {title: string; children: ReactNode}) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Page() {
  return (
    <Panel title="Profile">
      <p>User details go here.</p>
    </Panel>
  );
}
```

Use `children` when the parent should decide what content appears inside a reusable wrapper.

## Conditional JSX

You can use normal JavaScript logic.

```tsx
function StatusMessage({isLoggedIn}: {isLoggedIn: boolean}) {
  if (isLoggedIn) {
    return <p>Welcome back.</p>;
  }

  return <p>Please sign in.</p>;
}
```

Or inline:

```tsx
{isLoggedIn ? <Dashboard /> : <LoginPage />}
```

## Rendering Lists

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

The `key` helps React track item identity.

Use stable IDs, not array index, when items can reorder, insert, or delete.

## Component Composition

React prefers composition over inheritance.

Instead of making one component handle every possible option, compose smaller components.

```tsx
function Card({children}: {children: ReactNode}) {
  return <article className="card">{children}</article>;
}

function ProductCard({product}: {product: Product}) {
  return (
    <Card>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
    </Card>
  );
}
```

## Common Mistakes

- mutating props
- making one huge component
- passing too many unrelated props
- using array index as key for dynamic lists
- putting business logic directly inside JSX
- creating components inside another component unnecessarily

## Senior Best Practices

- keep components focused on one responsibility
- use TypeScript props for clear contracts
- prefer composition for layout and reusable UI
- keep JSX readable
- move complex calculations outside JSX
- use stable keys in lists
- pass callbacks for child-to-parent communication

## Interview Questions

### What is JSX?

JSX is a syntax extension that lets you describe React UI using JavaScript expressions.

### What is a component?

A reusable function that returns UI.

### Props vs state?

Props are passed from parent to child. State belongs to a component and changes over time.

### Why should props not be mutated?

Props belong to the parent. Mutating them breaks one-way data flow and can cause confusing UI bugs.

### What is `children` used for?

`children` lets a component receive nested content from its parent.

### Why are keys important in lists?

Keys help React preserve item identity across renders.

