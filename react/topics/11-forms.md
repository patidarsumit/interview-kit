# 11. Forms In React

Forms are common in interviews because they test state, events, validation, accessibility, and async submit behavior.

React forms are usually controlled or uncontrolled.

## Controlled Inputs

A controlled input gets its value from React state.

```tsx
function EmailField() {
  const [email, setEmail] = useState('');

  return (
    <label>
      Email
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
    </label>
  );
}
```

React state is the source of truth.

Use controlled inputs when:

- value affects UI immediately
- validation depends on value
- submit button depends on form state
- you need to transform input
- fields depend on each other

## Uncontrolled Inputs

An uncontrolled input stores its value in the DOM.

```tsx
function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);

  function submit() {
    console.log(emailRef.current?.value);
  }

  return <input ref={emailRef} type="email" />;
}
```

Use uncontrolled inputs when:

- you do not need every keystroke in React state
- form library handles refs
- performance matters in very large forms

React Hook Form uses uncontrolled inputs by default.

## Form Submit

```tsx
function LoginForm() {
  const [email, setEmail] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(event) => setEmail(event.target.value)} />
      <button type="submit">Sign in</button>
    </form>
  );
}
```

Use `event.preventDefault()` to stop normal browser page reload.

## Validation

Client-side validation improves UX.

```tsx
const emailError = email.includes('@') ? null : 'Enter a valid email';
```

Render accessible error:

```tsx
<input
  value={email}
  aria-invalid={Boolean(emailError)}
  aria-describedby={emailError ? 'email-error' : undefined}
/>
{emailError && (
  <p id="email-error" role="alert">
    {emailError}
  </p>
)}
```

Server-side validation is still required.

## Cross-Field Validation

Some validation depends on multiple fields.

```tsx
const passwordMismatch =
  confirmPassword.length > 0 && password !== confirmPassword;
```

Use this for:

- password confirmation
- date ranges
- min/max values
- conditional required fields

## Dynamic Fields

Dynamic fields are common in interviews.

Examples:

- skills list
- phone numbers
- invoice rows
- education history

Use stable IDs for dynamic fields.

```tsx
const [skills, setSkills] = useState([{id: crypto.randomUUID(), name: ''}]);
```

Do not use array index as key when users can add/remove/reorder fields.

## Submit States

Model submit state clearly:

- idle
- submitting
- success
- error

```tsx
const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
```

Disable submit while submitting.

```tsx
<button disabled={status === 'submitting'}>Save</button>
```

## Form Libraries

Common choices:

- React Hook Form
- Formik
- Zod/Yup for schemas

React Hook Form is popular because:

- fewer re-renders
- good TypeScript support
- works with uncontrolled inputs
- supports validation libraries
- handles touched/errors/submit state

## React 19 Form APIs

React 19 includes APIs useful for forms:

- Actions
- `useActionState`
- `useOptimistic`

Example:

```tsx
const [state, formAction, isPending] = useActionState(saveUser, initialState);
```

Use this when working with action-based form flows, especially in framework environments.

## Common Mistakes

- forgetting `preventDefault`
- mixing controlled and uncontrolled input
- not showing server validation errors
- inaccessible error messages
- losing input because keys change
- using array index as key in dynamic forms
- not disabling submit during pending state

## Senior Best Practices

- choose controlled inputs for simple forms
- use form libraries for complex forms
- validate on client and server
- keep errors accessible
- preserve user input after failed submit
- split large forms into smaller components
- model submit status explicitly
- use stable IDs for dynamic fields

## Interview Questions

### Controlled vs uncontrolled input?

Controlled input uses React state as source of truth. Uncontrolled input stores value in the DOM.

### Why use React Hook Form?

It manages validation, errors, touched state, submit state, and can reduce re-renders in large forms.

### How do you show accessible validation errors?

Use visible error text, `aria-invalid`, and connect the input to the error using `aria-describedby`.

### Should client validation be trusted?

No. Client validation is for UX. Server validation is required for security and correctness.

