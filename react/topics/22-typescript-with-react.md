# 22. TypeScript With React

TypeScript makes React code safer by making props, events, API data, and state transitions explicit.

In interviews, TypeScript shows whether you can design clear component contracts.

## Typing Props

```tsx
type ButtonProps = {
  variant: 'primary' | 'secondary';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function Button({variant, disabled, onClick, children}: ButtonProps) {
  return (
    <button className={variant} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
```

Use optional props only when they are truly optional.

## Event Types

Input change:

```tsx
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value);
}
```

Form submit:

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
}
```

Button click:

```tsx
function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
  console.log(event.currentTarget.name);
}
```

## useState Types

TypeScript can infer simple state:

```tsx
const [count, setCount] = useState(0);
```

For nullable state, be explicit:

```tsx
const [user, setUser] = useState<User | null>(null);
```

## Discriminated Unions

Use discriminated unions for async UI states.

```tsx
type UsersState =
  | {status: 'loading'}
  | {status: 'error'; message: string}
  | {status: 'success'; users: User[]};
```

Rendering becomes safer:

```tsx
if (state.status === 'success') {
  return <UserList users={state.users} />;
}
```

TypeScript knows `users` exists only in success state.

## Typing API Data

```tsx
type UserDto = {
  id: string;
  name: string;
  role: 'admin' | 'user';
};

async function getUsers(): Promise<UserDto[]> {
  const response = await fetch('/api/users');
  return response.json();
}
```

Senior point:

TypeScript types do not validate runtime API data. Use schema validation when data is untrusted or critical.

## React.FC

`React.FC` is optional.

Many teams prefer plain typed props:

```tsx
function UserCard({user}: {user: User}) {
  return <h2>{user.name}</h2>;
}
```

This avoids confusion around implicit children and generics.

## Common Mistakes

- using `any`
- typing everything as `string`
- not typing API responses
- using optional props when required would be clearer
- ignoring null states
- using type assertions to hide real problems

## Senior Best Practices

- type props explicitly
- model async states with unions
- type events correctly
- type API boundaries
- avoid `any`
- use runtime validation when API data cannot be trusted
- keep shared types near feature or API boundary

## Interview Questions

### Why use TypeScript with React?

It catches prop, state, event, and API shape mistakes earlier.

### Why use discriminated unions?

They model UI states safely, such as loading, error, and success.

### Does TypeScript validate API data at runtime?

No. TypeScript is compile-time only. Use runtime validation for untrusted data.

### Do you need `React.FC`?

No. It is optional, and many teams prefer plain typed props.

