# 13. Data Fetching And Async UI

React does not force one data-fetching method.

In interviews, the important part is not only calling an API. You must handle loading, error, empty state, cancellation, caching, and duplicate requests.

## Types Of State

Separate UI state from server state.

UI state:

- modal open
- selected tab
- form input
- local filter text

Server state:

- users from API
- product list
- paginated results
- cached profile data

Server state usually needs caching, refetching, retries, deduping, and invalidation.

## Manual Fetch With useEffect

```tsx
function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        setLoading(true);
        const response = await fetch('/api/users', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Could not load users');
        }

        setUsers(await response.json());
      } catch (requestError) {
        if ((requestError as Error).name !== 'AbortError') {
          setError('Could not load users');
        }
      } finally {
        setLoading(false);
      }
    }

    loadUsers();

    return () => controller.abort();
  }, []);
}
```

This is fine for simple cases.

## Abort Stale Requests

If a component unmounts or query changes, old requests should not update state.

Use `AbortController`.

```tsx
const controller = new AbortController();

fetch(url, {signal: controller.signal});

return () => controller.abort();
```

This is very important for search boxes and route changes.

## Debounced Search

For search:

- wait before calling API
- cancel stale request
- ignore empty query
- show loading/error/empty states

```tsx
useEffect(() => {
  if (!query) {
    setState({status: 'idle'});
    return;
  }

  const controller = new AbortController();

  fetch(`/api/users?q=${query}`, {signal: controller.signal});

  return () => controller.abort();
}, [query]);
```

## Async UI States

Good UI models:

- idle
- loading
- success
- empty
- error

Example:

```tsx
type UsersState =
  | {status: 'idle'}
  | {status: 'loading'}
  | {status: 'success'; users: User[]}
  | {status: 'empty'}
  | {status: 'error'; message: string};
```

This avoids unclear combinations like:

```tsx
loading = false
error = null
users = []
```

Is that empty, idle, or not loaded yet?

## TanStack Query

TanStack Query is commonly used for server state.

It handles:

- caching
- request deduping
- retries
- loading state
- error state
- refetching
- invalidation

Example:

```tsx
const usersQuery = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});
```

Use it when API data is reused or needs production caching behavior.

## Framework Data Loading

Frameworks like Next.js and React Router can load data at route/server boundaries.

Use framework loading when:

- data belongs to a route
- SSR/RSC is involved
- SEO matters
- waterfall should be reduced
- server secrets are needed

## Avoid Duplicate Fetching

Common causes:

- fetch in parent and child
- effect runs because dependencies are unstable
- route loader and component both fetch same data
- Strict Mode development remount reveals unsafe effects
- missing cache/query layer

Senior answer:

Define one owner for data loading.

## Common Mistakes

- no loading state
- no error state
- setting state after unmount
- duplicate requests
- fetching same data in many components
- using global state for server cache manually
- not encoding query params
- ignoring race conditions

## Senior Best Practices

- separate server state from UI state
- use `AbortController` for manual fetch cancellation
- model async states explicitly
- use TanStack Query/SWR/framework loaders for production server state
- avoid duplicate data ownership
- keep API DTOs typed
- handle retries intentionally

## Interview Questions

### Why is server state different from UI state?

Server state is remote, shared, async, cacheable, and can become stale.

### Why use TanStack Query?

It manages server-state caching, deduping, retries, refetching, loading states, and invalidation.

### How do you prevent stale search requests?

Debounce the query and cancel old requests with `AbortController`.

### What async states should a component handle?

Idle, loading, success, empty, and error.

