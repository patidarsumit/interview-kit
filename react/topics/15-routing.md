# 15. Routing

React itself does not include routing.

Routing is handled by a framework or library such as React Router, Next.js, Remix, or the React Router framework mode.

## What Routing Does

Routing maps URL paths to screens.

```text
/login          -> LoginPage
/users          -> UsersPage
/users/u1       -> UserDetailsPage
/settings       -> SettingsPage
```

In a React app, routes usually decide:

- which page component renders
- which layout wraps it
- what data loads
- what error boundary handles failures
- whether the user can access the page
- whether the route is lazy-loaded

## React Router Example

```tsx
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/users/:userId',
    element: <UserDetailsPage />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
```

## Route Params

Route params identify a resource.

```tsx
const {userId} = useParams();
```

Use route params for:

- user ID
- product ID
- order ID
- slug

Example:

```text
/products/p100
```

`p100` identifies the product.

## Search Params

Search params represent optional page state.

```tsx
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('q') ?? '';
```

Use search params for:

- search query
- filters
- sort
- page
- selected tab

Example:

```text
/users?q=sumit&page=2&role=admin
```

This URL is shareable and reload-safe.

## Protected Routes

Client-side route protection improves UX but is not enough security.

```tsx
function ProtectedRoute({children}: {children: React.ReactNode}) {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

Senior point:

Backend/API authorization is the real security boundary.

## Lazy Route Screens

Large pages should be code-split.

```tsx
const ReportsPage = lazy(() => import('./ReportsPage'));

function ReportsRoute() {
  return (
    <Suspense fallback={<p>Loading reports...</p>}>
      <ReportsPage />
    </Suspense>
  );
}
```

This reduces initial bundle size.

## Route-Level Data Loading

Modern React apps often load data at route boundaries.

Options:

- React Router loaders
- Next.js Server Components
- framework data APIs
- TanStack Query inside route components

Avoid loading the same data in both route loader and component unless intentional.

## Not Found And Error Routes

Production apps should handle:

- unknown routes
- route loader errors
- permission errors
- missing resources

Do not leave users with a blank screen.

## Common Mistakes

- storing shareable filters only in component state
- protecting routes only by hiding menu items
- loading route data in multiple places
- no not-found page
- no error boundary for route failures
- putting all routes in one huge file

## Senior Best Practices

- use URL params for resource identity
- use search params for shareable page state
- lazy load large route screens
- define one owner for route data
- handle not-found and route errors
- enforce auth on server/API
- colocate feature routes with feature code

## Interview Questions

### Why keep filters in URL?

So the page is shareable, reload-safe, and back-button friendly.

### Route params vs search params?

Route params identify resources. Search params represent optional page state like filters, sort, and page.

### Is client-side protected route enough security?

No. It improves UX, but server/API authorization must enforce access.

### Why lazy load route screens?

To reduce initial JavaScript and load feature code only when needed.

