# 26. React Server Components And SSR

Modern React can render UI in more than one place.

Older React apps usually rendered everything in the browser. Modern React apps often use frameworks to render some UI on the server.

## CSR

Client-side rendering means the browser downloads JavaScript and renders the page.

Pros:

- simple mental model
- good for authenticated dashboards
- browser APIs are available

Cons:

- slower first content for large apps
- weaker SEO for content-heavy pages
- more work on user device

## SSR

Server-side rendering creates HTML on the server for each request.

Pros:

- faster first paint
- better SEO
- useful for content pages

Cons:

- server complexity
- hydration required
- browser-only code must be guarded

## Hydration

Hydration is when React attaches event handlers and client behavior to server-rendered HTML.

Server renders:

```html
<button>Like</button>
```

Client hydrates it so clicking works.

## Hydration Mismatch

A hydration mismatch happens when server HTML and client render output differ.

Common causes:

- `new Date()` during render
- `Math.random()` during render
- reading `window` during server render
- user-specific client state
- different locale/time zone
- data changing before hydration

Bad:

```tsx
function CreatedAt() {
  return <p>{new Date().toISOString()}</p>;
}
```

Better:

```tsx
function CreatedAt({value}: {value: string}) {
  return <p>{value}</p>;
}
```

## React Server Components

Server Components render on the server or at build time.

They do not ship their component JavaScript to the browser.

Good for:

- reading server data
- accessing databases through framework boundaries
- keeping secrets on server
- reducing client JavaScript
- rendering non-interactive UI

Example:

```tsx
export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductList products={products} />;
}
```

## Client Components

Client Components run in the browser.

They are needed for:

- `useState`
- `useEffect`
- browser APIs
- event handlers
- interactive widgets

In frameworks like Next.js, client files use:

```tsx
'use client';
```

## Server vs Client Boundary

Use Server Components by default for non-interactive data rendering.

Use Client Components only where interactivity is needed.

Example:

```tsx
// Server Component
export default async function ProductPage() {
  const product = await getProduct();

  return (
    <>
      <h1>{product.name}</h1>
      <AddToCartButton productId={product.id} />
    </>
  );
}
```

`AddToCartButton` is client because it has click state.

## Browser API Guard

Server render has no `window`, `document`, or `localStorage`.

Wrong:

```tsx
const theme = localStorage.getItem('theme');
```

Better:

```tsx
useEffect(() => {
  const theme = localStorage.getItem('theme');
  setTheme(theme);
}, []);
```

Browser-only code should run on the client.

## Senior Best Practices

- understand CSR, SSR, SSG, and RSC differences
- avoid browser APIs during server rendering
- avoid random/time-based render output before hydration
- keep Client Components small
- fetch data on server when framework supports it
- do not pass secrets to client components
- test hydration warnings

## Interview Questions

### What is hydration?

React attaching client behavior and event handlers to server-rendered HTML.

### Server Component vs Client Component?

Server Components render on the server and cannot use client hooks. Client Components run in the browser and can use state, effects, and events.

### What causes hydration mismatch?

Different server and client output, often from random values, dates, browser APIs, or data differences.

### Why use Server Components?

To reduce client JavaScript, fetch server data close to UI, and keep server-only logic out of the browser.

