# 17. Redux Toolkit And Zustand

Redux Toolkit and Zustand are common React state libraries.

## Redux Toolkit

Good for:

- predictable app state
- complex transitions
- devtools
- middleware
- team conventions

Use slices:

```tsx
const counterSlice = createSlice({
  name: 'counter',
  initialState: {value: 0},
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});
```

Redux Toolkit uses Immer, so "mutating" draft state is safe inside reducers.

## How Redux Works

Redux is a predictable state container.

Flow:

```text
UI dispatches action
  -> reducer receives action
  -> reducer calculates next state
  -> store saves next state
  -> components using selectors re-render
```

Important terms:

| Term | Meaning |
| --- | --- |
| Store | Central place where Redux state lives |
| Action | Object describing what happened |
| Reducer | Function that returns next state |
| Dispatch | Function used to send an action |
| Selector | Function used to read state |
| Middleware | Extra layer for async work, logging, etc. |

## Redux Toolkit From Installation To Usage

Install:

```bash
npm install @reduxjs/toolkit react-redux
```

Create slice:

```ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type CartItem = {
  id: string;
  name: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const {addItem, removeItem} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
```

Configure store:

```ts
import {configureStore} from '@reduxjs/toolkit';
import {cartReducer} from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

Provide store:

```tsx
import {Provider} from 'react-redux';
import {store} from './store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

Use in component:

```tsx
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from './store';
import {addItem} from './cartSlice';

function CartButton() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.cart.items.length);

  return (
    <button
      type="button"
      onClick={() => dispatch(addItem({id: '1', name: 'Book', quantity: 1}))}>
      Add item ({count})
    </button>
  );
}
```

Interview answer:

```text
Redux stores global client state in a central store. Components dispatch actions, reducers update state predictably, and components read state using selectors. Redux Toolkit simplifies Redux with configureStore, createSlice, good defaults, and Immer support.
```

## Redux Toolkit Or TanStack Query?

Use Redux Toolkit for client/application state:

- cart
- wizard state
- selected filters
- complex UI workflow state
- predictable state transitions

Use TanStack Query for server state:

- API data
- caching
- refetching
- loading/error state
- stale data
- request deduplication

Interview answer:

```text
Redux Toolkit and TanStack Query solve different problems. Redux Toolkit is good for predictable client state. TanStack Query is better for server state because it handles caching, refetching, stale data, loading, errors, and request deduplication.
```

## Zustand

Good for:

- small stores
- simple API
- less boilerplate
- feature-level shared state

## Senior Best Practices

- use Redux when predictability and tooling matter
- use Zustand for simpler shared client state
- do not use either for all server cache needs
- keep store APIs narrow
- avoid storing derived data unnecessarily

## Interview Questions

### Redux Toolkit vs Zustand?

Redux Toolkit is more structured and tooling-heavy. Zustand is smaller and simpler.

### How does Redux work?

UI dispatches an action, reducer calculates next state, store updates, and subscribed components re-render through selectors.

### Have you used Redux Toolkit or TanStack Query?

Best answer:

```text
I understand both. Redux Toolkit is useful for structured client state and predictable transitions. TanStack Query is useful for API/server state because it handles cache, loading, errors, refetching, and deduplication. I would avoid putting all API data into Redux if a query library can manage it better.
```
