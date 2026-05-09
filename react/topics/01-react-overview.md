# 01. React Overview

React is a JavaScript library for building user interfaces.

It helps you build UI by breaking the screen into small reusable pieces called components.

## Why React Exists

Without React, large UI can become hard to manage because the developer must manually update the DOM when data changes.

Example without React:

```ts
const button = document.querySelector('button');
const countText = document.querySelector('#count');
let count = 0;

button?.addEventListener('click', () => {
  count += 1;
  countText!.textContent = String(count);
});
```

This is fine for small pages, but in large apps you must remember every place where UI depends on data.

React makes this easier:

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount((value) => value + 1)}>
      Count: {count}
    </button>
  );
}
```

You describe what UI should look like for a state. React updates the DOM when state changes.

## Core Mental Model

React's mental model is:

```text
UI = function of state
```

If the state is `0`, UI shows `Count: 0`.

If the state becomes `1`, React renders again and UI shows `Count: 1`.

You do not manually update text in the DOM. You update state.

## Main Building Blocks

React applications are built using:

- components
- props
- state
- events
- hooks
- context
- effects
- composition

## Components

A component is a reusable UI function.

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

Components can be combined:

```tsx
function UsersPage() {
  return (
    <main>
      <UserCard />
      <UserCard />
    </main>
  );
}
```

## Props

Props pass data from parent to child.

```tsx
function UserCard({name}: {name: string}) {
  return <h2>{name}</h2>;
}

function UsersPage() {
  return <UserCard name="Sumit" />;
}
```

Props are readonly from the child component's point of view.

## State

State is data that changes over time and affects UI.

```tsx
function Toggle() {
  const [open, setOpen] = useState(false);

  return (
    <button type="button" onClick={() => setOpen((value) => !value)}>
      {open ? 'Close' : 'Open'}
    </button>
  );
}
```

When `open` changes, React renders the component again.

## One-Way Data Flow

React data usually flows down:

```text
Parent state -> child props -> UI
```

Child components communicate upward by calling callbacks.

```tsx
function Child({onSave}: {onSave: () => void}) {
  return <button onClick={onSave}>Save</button>;
}
```

This makes data flow predictable.

## React Is Not A Full Framework

React handles UI.

It does not include everything by default.

Common additions:

- routing: React Router or Next.js
- data fetching: framework loaders, TanStack Query, SWR
- forms: React Hook Form
- styling: CSS Modules, Tailwind, CSS-in-JS
- server rendering: Next.js, Remix/React Router frameworks
- state management: Redux Toolkit, Zustand, Context

## React vs Frameworks

React:

- component rendering library
- hooks
- UI composition

Next.js or similar framework:

- routing
- layouts
- SSR/SSG
- React Server Components
- data loading
- deployment conventions

Senior interview point:

If the product needs SEO, SSR, file-based routing, and server/client boundaries, a framework is often a better production choice than plain React with Vite.

## What Companies Expect

Freshers should know:

- components
- JSX
- props
- state
- events
- lists and keys
- basic hooks
- forms

Experienced developers should also know:

- effect correctness
- state ownership
- performance
- testing
- accessibility
- security
- SSR/hydration
- architecture
- tradeoffs between libraries

## Common Mistakes

- mutating state directly
- using effects for derived state
- putting all state in global stores
- using array index keys for dynamic lists
- ignoring loading/error/empty UI states
- overusing `useMemo` and `useCallback`
- not cleaning up effects
- making components too large

## Senior Best Practices

- keep state close to where it is used
- write pure render logic
- keep effects focused on external synchronization
- prefer composition over inheritance
- test user-visible behavior
- measure before optimizing
- build accessible UI from the start

## Interview Questions

### What is React?

React is a JavaScript library for building component-based user interfaces.

### What problem does React solve?

It helps developers build state-driven UI without manually updating the DOM everywhere.

### Why is React efficient?

React is efficient because it lets developers describe UI from state, then React calculates what needs to change and updates the real DOM in a controlled way.

Interview answer:

```text
React is efficient because it uses declarative rendering, reconciliation, batched updates, and targeted DOM commits. When state changes, React calculates the next UI, compares it with the previous UI, and updates only the necessary parts of the DOM.
```

Important senior point:

```text
React is not fast only because of the Virtual DOM. Real performance also depends on state ownership, component boundaries, stable keys, avoiding unnecessary re-renders, bundle size, memoization where needed, and measuring bottlenecks.
```

### How does React work internally?

High-level flow:

```text
State or props change
  -> React calls component functions
  -> React creates a new React element tree
  -> React compares old tree and new tree
  -> React decides what changed
  -> React commits required DOM updates
  -> browser paints the UI
```

Important terms:

| Term | Meaning |
| --- | --- |
| React element | Plain object that describes UI |
| Render phase | React calls components and calculates next UI |
| Reconciliation | React compares previous and next UI tree |
| Fiber | React's internal data structure for organizing and scheduling work |
| Commit phase | React applies actual changes to the DOM |
| Batching | React groups multiple state updates to reduce extra renders |

Interview answer:

```text
Internally, when state or props change, React renders the component tree again to create a new element tree. Then reconciliation compares it with the previous tree. React's Fiber architecture helps organize and schedule this work. In the commit phase, React applies the required DOM changes and runs effects. A render does not always mean the DOM changed; React commits only necessary updates.
```

### What does "UI is a function of state" mean?

The rendered UI should be determined by current props and state.

### Is React a framework?

No. React is a UI library. Frameworks such as Next.js add routing, server rendering, data loading, and deployment conventions.

### Why is one-way data flow useful?

It makes state changes easier to trace because data flows from parent to child and child components communicate through callbacks.
