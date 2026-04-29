# 31. NgRx State Management: Store, Effects, Entity, And Signal Store

NgRx is a state management ecosystem for Angular.

It is commonly asked in senior Angular interviews because it tests architecture, RxJS, immutability, side effects, selectors, and large-app state design.

## When To Use NgRx

Use NgRx when an app has:

- complex shared state
- many components reading/writing the same state
- complex async side effects
- audit/debug requirements
- predictable state transition needs
- strong team conventions
- benefit from Redux DevTools

Do not use NgRx just because the app is Angular.

For simple local or feature state, a service with signals may be enough.

## Classic NgRx Mental Model

Classic NgRx uses:

- actions
- reducers
- selectors
- effects
- store

Flow:

```text
Component dispatches action
Action reaches reducer
Reducer creates new state
Selector reads state
Component renders selected data
Effect handles async side effects and dispatches new actions
```

## Actions

Actions describe events.

```ts
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{users: User[]}>(),
    'Load Users Failure': props<{error: string}>(),
  },
});
```

Senior point:

Name actions as events, not commands.

Good:

```ts
loadUsersSuccess
```

Less ideal:

```ts
setUsers
```

## Reducer

Reducers are pure functions.

```ts
export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UsersActions.loadUsersSuccess, (state, {users}) => ({
    ...state,
    users,
    loading: false,
  })),
  on(UsersActions.loadUsersFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  })),
);
```

Reducers must not:

- mutate state
- call APIs
- read local storage
- navigate
- use random values
- perform side effects

## Selectors

Selectors read and derive state.

```ts
export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users,
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.loading,
);
```

Selectors are memoized.

Senior point:

Do derived calculations in selectors, not components.

## Effects

Effects handle side effects.

```ts
loadUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UsersActions.loadUsers),
    switchMap(() =>
      this.usersApi.getUsers().pipe(
        map((users) => UsersActions.loadUsersSuccess({users})),
        catchError(() =>
          of(UsersActions.loadUsersFailure({error: 'Could not load users'})),
        ),
      ),
    ),
  ),
);
```

Effects are used for:

- HTTP requests
- navigation
- local storage
- analytics
- notifications
- websocket coordination

## Component Usage

```ts
users = this.store.selectSignal(selectUsers);
loading = this.store.selectSignal(selectUsersLoading);

ngOnInit() {
  this.store.dispatch(UsersActions.loadUsers());
}
```

Older style:

```ts
users$ = this.store.select(selectUsers);
```

## NgRx Entity

NgRx Entity helps manage collections.

It stores data as:

```ts
{
  ids: ['u1', 'u2'],
  entities: {
    u1: {...},
    u2: {...}
  }
}
```

Benefits:

- normalized state
- fast lookup by ID
- built-in CRUD helpers
- generated selectors

## Classic NgRx Pros

- predictable unidirectional flow
- great debugging
- clear async side-effect layer
- scalable for large teams
- strong patterns for complex apps

## Classic NgRx Cons

- boilerplate
- more files
- harder for simple apps
- RxJS learning curve
- overkill for local state

## Modern NgRx Signal Store

NgRx Signal Store is a newer signal-based state management approach.

It fits modern Angular better when you want:

- signal-based state
- less boilerplate
- feature/local stores
- methods instead of action/reducer ceremony
- computed state with signals

Conceptual example:

```ts
export const UsersStore = signalStore(
  withState({
    users: [] as User[],
    loading: false,
    error: null as string | null,
  }),
  withComputed(({users}) => ({
    count: computed(() => users().length),
  })),
  withMethods((store, usersApi = inject(UsersApiService)) => ({
    async loadUsers() {
      patchState(store, {loading: true, error: null});

      try {
        const users = await firstValueFrom(usersApi.getUsers());
        patchState(store, {users, loading: false});
      } catch {
        patchState(store, {
          loading: false,
          error: 'Could not load users',
        });
      }
    },
  })),
);
```

## Signal Store vs Classic Store

Classic Store is good when:

- global event log matters
- Redux DevTools flow matters
- effects/actions/reducers are already team standard
- many features coordinate through events

Signal Store is good when:

- state is feature-local
- you want less boilerplate
- Angular signals are the main reactivity model
- methods are easier to reason about than actions

## Service With Signals vs Signal Store vs Classic NgRx

Use service with signals when:

- state is simple
- one feature owns it
- no complex side effects

Use Signal Store when:

- feature state is non-trivial
- you want store structure without classic NgRx ceremony
- derived state and methods should be organized

Use classic NgRx Store when:

- global state is complex
- many async workflows exist
- event history/debugging matters
- team already uses NgRx patterns

## Senior Best Practices

- do not put everything in global store
- keep state normalized when collections are large
- use selectors/computed state for derived data
- keep reducers pure
- keep effects focused
- avoid action storms
- use feature-level stores where possible
- choose Signal Store for modern feature state when appropriate
- document state ownership

## Common Interview Questions

### What is NgRx?

A state management ecosystem for Angular based on Redux-style patterns and RxJS, with newer signal-based APIs.

### What is a reducer?

A pure function that takes current state and an action and returns new state.

### What is an effect?

A class or function that reacts to actions and performs side effects such as HTTP calls.

### What is a selector?

A memoized function that reads and derives state from the store.

### Why use NgRx Entity?

To manage normalized collections with generated CRUD helpers and selectors.

### Classic Store vs Signal Store?

Classic Store is action/reducer/effect based. Signal Store is signal-first and usually has less boilerplate for feature state.

### When is NgRx overkill?

When state is local, simple, and does not require global coordination or event-driven side effects.

