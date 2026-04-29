# 32. Company-Style React Coding Tasks

Companies often ask practical tasks instead of only theory.

They want to see if you can build real UI with correct state, async behavior, accessibility, and performance.

## Debounced Search

Expected behavior:

- user types query
- wait before API call
- cancel stale request
- show loading
- show error
- show empty state

Use:

- `useState`
- `useEffect`
- debounce hook
- `AbortController`

Related program:

- [Debounced search](../programs/13-debounced-search-loading-error-empty.tsx)

## Reusable Table

Expected behavior:

- filter
- sort
- paginate
- stable row keys
- empty state

Senior point:

For server data, table state often belongs in URL search params and backend API calls.

Related program:

- [Reusable table](../programs/14-reusable-table-sort-filter-pagination.tsx)

## Cart State

Expected behavior:

- add item
- remove item
- update quantity
- compute total
- avoid mutation

Use:

- `useReducer`
- Context if many components need cart

Related program:

- [Cart context reducer](../programs/15-cart-context-reducer.tsx)

## Modal/Dialog

Expected behavior:

- open/close
- pass data
- return result
- keyboard access
- focus management

Related programs:

- [Modal communication](../programs/16-modal-dialog-communication.tsx)
- [Accessible modal focus](../programs/40-accessible-modal-focus.tsx)

## Infinite Scroll Or Virtual List

Expected behavior:

- load more when near bottom
- avoid duplicate loading
- handle loading/error
- avoid huge DOM

Use virtualization for very large lists.

Related programs:

- [Infinite scroll](../programs/17-infinite-scroll-intersection-observer.tsx)
- [Virtual list](../programs/18-virtual-list-simple.tsx)

## Role-Based Menu

Expected behavior:

- show menu based on role
- protect routes separately
- do not rely only on UI hiding

Related program:

- [Role-based menu](../programs/19-role-based-menu.tsx)

## Custom Dropdown

Expected behavior:

- selected value
- open/close
- keyboard support
- ARIA state
- outside click handling in production

Related program:

- [Accessible dropdown](../programs/20-custom-dropdown-accessible.tsx)

## What Interviewers Check

- state ownership
- immutable updates
- effect cleanup
- loading/error/empty states
- accessibility
- stable keys
- performance for large lists
- testability
- edge cases

## Senior Checklist

For every task, explain:

- where state lives
- who updates it
- what triggers data fetching
- how stale requests are cancelled
- how errors display
- how keyboard users interact
- how it scales
- how you would test it

