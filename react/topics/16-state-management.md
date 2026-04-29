# 16. State Management

State management is deciding where state should live and how it should change.

The senior rule:

> Keep state as close as possible to where it is used. Promote it only when sharing or coordination requires it.

## Types Of State

### Local UI State

Belongs inside one component.

Examples:

- input text
- modal open
- selected tab
- dropdown open
- hover/focus UI

Use:

- `useState`
- `useReducer`

### Shared Client State

Used by multiple components or features.

Examples:

- authenticated user summary
- theme
- current tenant
- cart
- permissions

Use:

- Context
- Zustand
- Redux Toolkit
- route-level providers

### Server State

Lives on the server and is copied into UI.

Examples:

- users from API
- product list
- order details
- paginated reports

Use:

- TanStack Query
- SWR
- framework loaders
- Server Components
- Redux Toolkit Query

## useState

Use for simple component state.

```tsx
const [open, setOpen] = useState(false);
```

## useReducer

Use when transitions are complex.

```tsx
function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add':
      return {...state, items: [...state.items, action.item]};
    case 'clear':
      return {...state, items: []};
  }
}
```

Good for:

- cart
- multi-step forms
- complex filters
- state machines

## Context

Context passes shared values through the tree.

Good for:

- theme
- locale
- auth summary
- feature flags

Context is not automatically a full state manager.

## Redux Toolkit

Use Redux Toolkit when:

- many features coordinate
- transitions are complex
- debug history matters
- middleware is useful
- team wants strict conventions

Do not use Redux just because the app uses React.

## Zustand

Use Zustand when:

- shared client state is needed
- Redux feels too heavy
- simple store API is enough
- feature-level stores are useful

## TanStack Query

Use TanStack Query for server state.

It handles:

- caching
- loading/error
- retries
- refetching
- invalidation
- deduping

Do not manually rebuild server cache behavior in Context unless the app is very simple.

## State Ownership Questions

Ask:

- Who reads this state?
- Who changes it?
- Should it survive route changes?
- Should it be shareable in URL?
- Is it server data?
- Does it need caching?
- Does it need debugging history?

## Common Mistakes

- putting all state in Redux
- putting all state in Context
- storing server data as client state manually
- lifting state too high
- duplicating state in multiple places
- storing derived values unnecessarily
- mixing form state with global app state

## Senior Best Practices

- keep state local by default
- separate UI state from server state
- use URL for shareable route state
- use reducers for complex transitions
- use query libraries for server cache
- use global stores only when sharing/complexity justifies them
- keep store APIs narrow and feature-focused

## Interview Questions

### When use `useReducer`?

When state transitions are complex or related fields update together.

### Context vs Redux?

Context passes values. Redux manages structured global state transitions with tooling and middleware.

### Zustand vs Redux Toolkit?

Zustand is simpler and lighter. Redux Toolkit is more structured and better when conventions, devtools, and middleware matter.

### Where should server state live?

Usually in a query/framework data layer, not manually in global client state.

