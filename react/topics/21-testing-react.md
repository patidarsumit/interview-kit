# 21. Testing React

React tests should verify behavior, not implementation details.

Good tests answer:

> Can the user do what they need to do?

## Common Tools

- React Testing Library for component tests
- Vitest or Jest as test runner
- MSW for API mocking
- Playwright or Cypress for e2e tests
- Testing Library user-event for realistic interactions

## Component Test

```tsx
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('submits email', async () => {
  const user = userEvent.setup();

  render(<LoginForm />);

  await user.type(screen.getByLabelText(/email/i), 'sumit@example.com');
  await user.click(screen.getByRole('button', {name: /sign in/i}));

  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});
```

This tests what the user sees and does.

## Prefer Accessible Queries

Good:

```tsx
screen.getByRole('button', {name: /save/i});
screen.getByLabelText(/email/i);
screen.getByText(/profile/i);
```

Less ideal:

```tsx
container.querySelector('.save-button');
```

Accessible queries make tests closer to real user behavior.

## Testing Async UI

Use `findBy...` for async appearance.

```tsx
expect(await screen.findByText('Users loaded')).toBeInTheDocument();
```

Test:

- loading state
- success state
- empty state
- error state

## Mock APIs With MSW

MSW mocks network at the request boundary.

```tsx
http.get('/api/users', () => {
  return HttpResponse.json([{id: 'u1', name: 'Sumit'}]);
});
```

This is better than mocking every fetch call deep inside components.

## Testing Hooks

Custom hooks can be tested with `renderHook`.

```tsx
const {result} = renderHook(() => useToggle(false));

act(() => {
  result.current.toggle();
});

expect(result.current.value).toBe(true);
```

## Testing Reducers

Reducers are pure functions and easy to test.

```tsx
expect(reducer({count: 0}, {type: 'increment'})).toEqual({count: 1});
```

## What To Test

Test:

- user interactions
- form validation
- loading/error/empty states
- route behavior
- custom hooks
- reducers
- accessibility-critical behavior
- auth redirects

Do not over-test:

- private implementation details
- internal state variable names
- exact component structure unless required

## E2E Tests

Use Playwright/Cypress for critical flows:

- login
- checkout
- signup
- create/edit/delete
- permissions

Do not use e2e tests for every tiny component state.

## Common Mistakes

- testing implementation details
- relying on CSS class selectors
- not testing error states
- mocking too deeply
- ignoring accessibility queries
- writing brittle snapshots
- testing everything only through e2e

## Senior Best Practices

- test behavior
- use accessible queries
- mock network with MSW
- test async states
- keep unit/component/e2e balanced
- test critical business flows
- make tests readable

## Interview Questions

### Why React Testing Library?

It encourages testing user-visible behavior instead of implementation details.

### What should you test in React?

Interactions, rendering states, forms, custom hooks, reducers, and critical user journeys.

### Why use MSW?

It mocks network requests at the boundary, making tests closer to real behavior.

### Unit vs e2e?

Unit/component tests cover focused behavior. E2E tests cover critical full user journeys.

