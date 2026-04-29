# 28. React 19 Features

React 19 improves async interactions, form flows, optimistic UI, refs, metadata, and server-aware features.

Interviewers may not expect deep internals, but they expect you to know what problems these features solve.

## Actions

Actions represent async updates triggered by user interactions, commonly forms or mutations.

They help React understand pending state and async transitions.

Example idea:

```tsx
async function saveUser(formData: FormData) {
  const email = String(formData.get('email'));
  await api.saveUser({email});
}
```

In frameworks, actions may run on server or client depending on setup.

## useActionState

`useActionState` manages state for an action.

```tsx
type FormState = {
  message: string;
};

async function submitUser(
  previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = String(formData.get('email') ?? '');

  if (!email.includes('@')) {
    return {message: 'Enter a valid email'};
  }

  return {message: 'Saved'};
}

function UserForm() {
  const [state, formAction, isPending] = useActionState(submitUser, {
    message: '',
  });

  return (
    <form action={formAction}>
      <input name="email" />
      <button disabled={isPending}>Save</button>
      <p>{state.message}</p>
    </form>
  );
}
```

It gives:

- current state
- action function
- pending boolean

## useOptimistic

`useOptimistic` shows a temporary optimistic value while async work is pending.

Example:

```tsx
const [optimisticLiked, setOptimisticLiked] = useOptimistic(liked);

startTransition(async () => {
  setOptimisticLiked(true);
  const saved = await saveLike();
  setLiked(saved);
});
```

Use optimistic UI when:

- action usually succeeds
- rollback is clear
- instant feedback improves UX

Avoid it when rollback is complex or risky.

## use

`use` can read resources such as promises or context in supported patterns.

It is often seen with Server Components or Suspense-enabled data patterns.

Senior point:

Do not treat `use` as a replacement for all data fetching. Use framework guidance.

## Document Metadata

React 19 supports rendering document metadata such as:

- `title`
- `meta`
- `link`

Frameworks may provide their own metadata systems too.

## Ref Improvements

React 19 improves ref handling by allowing `ref` as a prop in many cases, reducing some need for `forwardRef`.

Senior point:

Know the pattern used by your project and React version.

## Server Components Support

React 19 stabilizes the React side of Server Components, but framework/bundler implementation details matter.

Use framework conventions such as Next.js App Router when building real apps with RSC.

## Common Mistakes

- using optimistic UI without rollback plan
- ignoring pending state
- mixing server/client action rules incorrectly
- assuming every app should immediately use React 19 APIs
- not following framework conventions

## Senior Best Practices

- use `useActionState` for action-driven form state
- use `useOptimistic` only with clear rollback
- keep mutation logic close to the feature
- handle pending/error/success states
- follow framework patterns for server actions and RSC
- migrate gradually

## Interview Questions

### What is `useActionState`?

A hook that manages state and pending status for an async action.

### What is optimistic UI?

Showing the expected result immediately before the server confirms it.

### When should optimistic UI be avoided?

When failure is common, rollback is unclear, or the action is financially/security critical.

### Does React 19 mean every app must rewrite forms?

No. Adopt new APIs where they simplify real flows and fit the framework.

