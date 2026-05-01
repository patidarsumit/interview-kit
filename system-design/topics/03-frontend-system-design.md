# 03. Frontend System Design

Frontend system design is about designing the browser or mobile user experience at scale.

It includes UI architecture, routing, state management, API communication, performance, accessibility, security, caching, error handling, and deployment.

Many candidates only focus on backend system design. Senior frontend interviews often ask frontend system design separately.

## Basic Frontend Architecture

Simple frontend flow:

```text
user
  |
  v
browser
  |
  v
frontend app
  |
  v
backend API
```

Production frontend flow:

```text
user
  |
  v
CDN
  |
  v
static assets: HTML, CSS, JS, images
  |
  v
browser app
  |
  +--> backend APIs
  +--> auth service
  +--> analytics
  +--> feature flags
```

## Frontend Requirements

Clarify:

- who uses the app
- what pages are needed
- what data is shown
- what actions users take
- what should load first
- what must work on mobile
- accessibility requirements
- offline behavior if needed
- SEO requirements if public

Example:

For a dashboard:

```text
Users need to see metrics, filter by date, export reports, and drill into detail pages.
The first screen should load quickly.
Tables should support pagination and sorting.
Errors should be visible and recoverable.
```

## Routing And Page Structure

Frontend routes map URLs to screens.

Example admin app:

```text
/login
/dashboard
/users
/users/:id
/orders
/orders/:id
/settings
```

Good route design:

- URLs are meaningful
- detail pages have stable IDs
- filters can live in query params
- protected routes check auth
- lazy loading is used for large sections

Example:

```text
/orders?status=pending&page=2&sort=createdAt_desc
```

This URL can be bookmarked, shared, refreshed, and restored.

## Component Architecture

Split components by responsibility.

Common structure:

```text
pages/
  OrderListPage
  OrderDetailPage
components/
  OrderTable
  StatusBadge
  EmptyState
services/
  orderApi
  orderState
```

Page components:

- read route params
- call feature services
- connect data to UI

Reusable components:

- receive inputs
- emit events
- avoid business API calls
- remain easy to test

Example:

`OrderTable` should show rows and emit `rowSelected`.

It should not directly decide whether the logged-in user can refund an order unless that is passed as input.

## State Management

Frontend state can be divided into categories.

Server state:

- data from backend
- products
- users
- orders
- notifications

UI state:

- modal open/close
- selected tab
- table sort
- form draft
- sidebar collapsed

Auth state:

- current user
- roles
- permissions
- session status

Use simple state for simple apps.

Use stronger patterns when:

- many components share state
- state changes through many workflows
- debugging state transitions matters
- offline support is required
- updates are optimistic

For Angular:

- signals/services are good for feature state
- RxJS is good for streams and async flows
- NgRx is useful for complex shared state

For React:

- local state is enough for local UI
- context can share small global state
- Redux/Zustand/TanStack Query can help for larger apps

## API Communication

Frontend should treat APIs as contracts.

Good API handling includes:

- loading state
- error state
- empty state
- retry when appropriate
- cancellation for stale requests
- pagination
- validation error display
- auth error handling

Example search flow:

```text
user types query
frontend waits 300ms debounce
frontend cancels previous request
frontend calls /search?q=phone
frontend shows loading
frontend renders results
frontend shows empty state if no result
```

Do not fire an API request for every keystroke without debounce.

## Frontend Performance

Frontend performance affects user experience directly.

Important metrics:

- First Contentful Paint
- Largest Contentful Paint
- Interaction to Next Paint
- Cumulative Layout Shift
- Time to Interactive

Common optimizations:

- code splitting
- lazy loading routes
- image optimization
- CDN for static assets
- browser caching
- virtual scrolling for huge lists
- avoid unnecessary re-renders
- memoize expensive calculations
- compress assets
- prefetch critical routes carefully

Example:

For a dashboard with many charts, do not load every chart library on the login page.

Lazy load dashboard code only when user opens dashboard.

## Browser And CDN Caching

Static assets can be cached aggressively when filenames contain hashes.

Example:

```text
main.8f3a1.js
styles.92ab.css
```

These can be cached for a long time because a new build creates new filenames.

HTML should usually not be cached for too long because it points to the latest assets.

Common strategy:

```text
index.html -> short cache
hashed JS/CSS/assets -> long cache
API responses -> depends on data
```

## Accessibility

Frontend design must include accessibility.

Think about:

- semantic HTML
- keyboard navigation
- focus management
- screen reader labels
- color contrast
- form errors
- accessible modals
- accessible tables

Example:

A modal should:

- move focus into modal when opened
- trap focus while open
- close with Escape when appropriate
- return focus to trigger button after close
- have accessible title

Accessibility is not decoration. It is core product behavior.

## Frontend Security

Common frontend security concerns:

- XSS
- CSRF
- unsafe third-party scripts
- token storage
- clickjacking
- leaking secrets in JS bundles
- trusting client-side authorization

Important:

Never put secrets in frontend code.

Anything shipped to the browser can be inspected.

Frontend route guards improve UX, but backend APIs must enforce authorization.

## Error Handling

Good frontend systems handle failure gracefully.

Examples:

- API fails: show retry option
- user loses internet: show offline message
- form validation fails: show field-level errors
- remote feature fails: show fallback page
- session expires: redirect to login or refresh session

Bad UX:

```text
blank page
infinite spinner
generic "Something went wrong" everywhere
```

Better UX:

```text
We could not load orders. Retry.
```

## Frontend Observability

Frontend also needs monitoring.

Track:

- JavaScript errors
- API failures
- route load time
- web vitals
- slow interactions
- failed asset loads
- user journey drop-offs

Example:

If checkout conversion drops, frontend monitoring can show:

- payment page JS error
- slow API response
- broken button click
- validation issue on mobile

## Frontend Design Example: E-Commerce Product Page

Requirements:

- show product details
- show price and availability
- show images
- add to cart
- show reviews
- work well on mobile
- load fast for SEO

Architecture:

```text
CDN -> SSR/SSG product page -> browser app -> product API
                                       -> cart API
                                       -> reviews API
```

Design:

- product page can be server-rendered or statically generated for SEO
- product images should use responsive sizes
- cart action calls backend API
- reviews can lazy load below the fold
- product details can be cached at CDN if public
- user-specific cart data should not be cached publicly

Important UI states:

- loading product
- product not found
- out of stock
- add to cart loading
- add to cart success
- add to cart failure

Performance:

- optimize hero image
- lazy load review section
- avoid loading heavy recommendation code immediately
- cache static assets

Security:

- backend calculates price
- backend validates stock
- frontend does not trust hidden fields for price

## Frontend Interview Checklist

When designing frontend, always mention:

- routes/pages
- components
- state management
- API contracts
- loading/error/empty states
- performance
- accessibility
- security
- caching
- deployment/CDN
- monitoring
- tradeoffs
