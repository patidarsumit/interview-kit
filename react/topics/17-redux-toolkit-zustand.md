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

