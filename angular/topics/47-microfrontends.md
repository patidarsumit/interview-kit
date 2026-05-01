# 47. Angular Microfrontends

Microfrontend architecture splits one large frontend into smaller independently owned frontend applications.

In Angular, this usually means a main shell application loads one or more remote Angular applications at runtime.

Common examples:

- `shell` app owns layout, login, header, sidebar, and top-level routing
- `orders` remote owns order screens
- `billing` remote owns invoice and payment screens
- `users` remote owns user management screens
- `reports` remote owns reporting screens

## Why Microfrontends Exist

Microfrontends solve organizational and deployment problems more than technical problems.

Use them when:

- many teams work on one large product
- teams need independent releases
- features have clear domain boundaries
- one Angular app has become too large to build, test, and deploy comfortably
- different product areas need different release cycles

Do not use them only because the app has many components.

For many teams, a modular Angular monolith with lazy-loaded routes is simpler and better.

## Simple Mental Model

```text
browser
  |
  v
shell Angular app
  |
  +-- loads orders remote
  +-- loads billing remote
  +-- loads users remote
  +-- loads reports remote
```

The shell controls the outside frame.

Remote apps control their own feature area.

## Common Angular Microfrontend Approaches

### 1. Module Federation

Module Federation lets one JavaScript application load code from another deployed JavaScript application at runtime.

In Angular microfrontends, this is the most common approach.

```text
shell app loads remote route from orders app
orders app exposes Angular routes or components
```

### 2. Angular Custom Elements

Angular components can be packaged as custom elements.

```html
<order-summary order-id="123"></order-summary>
```

This is useful when Angular widgets must be embedded in non-Angular apps.

Tradeoff:

Custom elements are easy to embed, but routing, dependency sharing, and large application composition can become awkward.

### 3. iframe

An iframe isolates one frontend inside another.

Use it when strong isolation is needed.

Tradeoffs:

- harder styling
- harder routing
- harder shared auth
- harder communication
- worse user experience if overused

## Shell And Remote

Shell:

- hosts the main layout
- owns global navigation
- owns login bootstrap
- loads remote applications
- handles fallback/error states
- usually owns top-level routing

Remote:

- owns a business feature
- exposes routes or components
- owns feature-specific UI
- owns feature services/state
- can be built and deployed independently

Example:

```text
shell
  /orders -> orders remote
  /billing -> billing remote
  /users -> users remote
```

## Example Folder Structure

```text
workspace/
  projects/
    shell/
      src/app/app.routes.ts
      src/app/layout/
    orders/
      src/app/orders.routes.ts
      src/app/pages/
    billing/
      src/app/billing.routes.ts
      src/app/pages/
    shared-auth/
      src/public-api.ts
```

In many real projects, each remote is in its own repository.

In a monorepo, all apps can live together but still deploy separately.

## Basic Module Federation Idea

The remote exposes something.

The shell loads it.

```text
orders remote exposes ./Routes
shell loads orders/Routes
```

Conceptual remote config:

```js
// orders module federation config
module.exports = {
  name: 'orders',
  exposes: {
    './Routes': './src/app/orders.routes.ts'
  },
  shared: {
    '@angular/core': {singleton: true, strictVersion: true},
    '@angular/common': {singleton: true, strictVersion: true},
    '@angular/router': {singleton: true, strictVersion: true}
  }
};
```

Conceptual shell config:

```js
// shell module federation config
module.exports = {
  name: 'shell',
  remotes: {
    orders: 'orders@http://localhost:4201/remoteEntry.js',
    billing: 'billing@http://localhost:4202/remoteEntry.js'
  },
  shared: {
    '@angular/core': {singleton: true, strictVersion: true},
    '@angular/common': {singleton: true, strictVersion: true},
    '@angular/router': {singleton: true, strictVersion: true}
  }
};
```

Exact configuration depends on the Angular build setup and federation tooling, but the interview concept is the same:

- remote exposes code
- shell knows where remote entry is
- shared dependencies prevent duplicate Angular runtimes

## Remote Exposes Routes

Orders remote:

```ts
// orders/src/app/orders.routes.ts
import {Routes} from '@angular/router';

export const ORDERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/order-list.page').then((m) => m.OrderListPage),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/order-detail.page').then((m) => m.OrderDetailPage),
  },
];
```

Shell route config:

```ts
// shell/src/app/app.routes.ts
import {Routes} from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full',
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('orders/Routes').then((m) => m.ORDERS_ROUTES),
  },
  {
    path: 'billing',
    loadChildren: () =>
      import('billing/Routes').then((m) => m.BILLING_ROUTES),
  },
];
```

This means `/orders` is handled by the shell router, but the route implementation comes from the orders remote.

## Dynamic Remote URLs

Hardcoding remote URLs is not ideal for production.

Better:

```text
dev -> http://localhost:4201/remoteEntry.js
qa -> https://qa-orders.example.com/remoteEntry.js
prod -> https://orders.example.com/remoteEntry.js
```

Many projects load remote URLs from config:

```json
{
  "orders": "https://orders.example.com/remoteEntry.js",
  "billing": "https://billing.example.com/remoteEntry.js"
}
```

This lets the same shell build point to different remote deployments.

## How Microfrontends Communicate

Microfrontends should communicate through stable contracts, not by reaching into each other's internals.

Common communication methods:

- URL route params and query params
- shared auth/session service
- browser custom events
- shared event bus library
- backend APIs
- local storage or session storage for simple non-sensitive state
- shell-provided services

Avoid:

- importing private files from another remote
- direct component instance access
- shared mutable global objects
- using local storage for sensitive auth data

## Communication Through URL

URL is the cleanest communication method for navigation state.

Example:

```text
/orders?status=pending&page=2
/users/42
/billing/invoices?customerId=42
```

Angular route reading:

```ts
import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  standalone: true,
  template: `
    <h1>Orders</h1>
    <p>Status: {{ status }}</p>
  `,
})
export class OrderListPage {
  private readonly route = inject(ActivatedRoute);

  readonly status = this.route.snapshot.queryParamMap.get('status') ?? 'all';
}
```

## Communication Through Custom Events

Custom events work across independently loaded frontend code.

Remote dispatches event:

```ts
window.dispatchEvent(
  new CustomEvent('cart:item-added', {
    detail: {
      productId: 'p100',
      quantity: 1,
    },
  }),
);
```

Shell listens:

```ts
import {DestroyRef, Injectable, inject} from '@angular/core';

@Injectable({providedIn: 'root'})
export class CartEventService {
  private readonly destroyRef = inject(DestroyRef);

  listen() {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{productId: string; quantity: number}>;
      console.log(customEvent.detail.productId);
    };

    window.addEventListener('cart:item-added', handler);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('cart:item-added', handler);
    });
  }
}
```

Use custom events for simple cross-app notifications.

For complex shared state, prefer backend state or a carefully designed shared library.

## Shared Authentication

Usually the shell owns login.

Flow:

```text
user opens shell
shell checks session
shell loads user profile
shell renders navigation
user opens orders remote
orders remote calls backend API with same auth cookie/token
```

Best practice:

- prefer secure HTTP-only cookies for browser auth when possible
- keep token handling centralized
- avoid each remote implementing its own login flow
- expose current user through a stable shared auth contract

Example shared auth interface:

```ts
export interface CurrentUser {
  id: string;
  email: string;
  roles: string[];
}

export abstract class AuthFacade {
  abstract currentUser(): CurrentUser | null;
  abstract hasRole(role: string): boolean;
}
```

The shell can provide the implementation, and remotes depend on the interface.

## Shared UI And Design System

A microfrontend system still needs consistent UI.

Use shared libraries for:

- buttons
- form fields
- dialogs
- tables
- date formatting
- validation messages
- design tokens

Do not put business logic in shared UI libraries.

Good:

```text
@company/ui/button
@company/ui/table
@company/auth-contract
```

Risky:

```text
@company/shared-everything
```

A giant shared library can recreate monolith coupling.

## Shared Dependencies

Angular packages should usually be shared as singletons.

Important shared dependencies:

- `@angular/core`
- `@angular/common`
- `@angular/router`
- `rxjs`
- design system library
- auth contract library

Why:

If shell and remote load different Angular runtimes, dependency injection, routing, and change detection can break or bloat the app.

Senior point:

Version alignment is one of the hardest parts of Angular microfrontends.

## State Management

Keep state ownership local to each remote when possible.

Good:

- orders remote owns order filters and order screens
- billing remote owns invoice screens
- shell owns global user and navigation

Avoid putting all state in one global store shared by all remotes.

That creates tight coupling and makes independent deployment harder.

Use backend APIs as the source of truth for cross-domain data.

## Deployment Model

Each app can be deployed separately.

```text
shell -> https://app.example.com
orders -> https://orders.example.com/remoteEntry.js
billing -> https://billing.example.com/remoteEntry.js
users -> https://users.example.com/remoteEntry.js
```

Important deployment concerns:

- remote entry caching
- version compatibility
- rollback strategy
- remote unavailable fallback
- monitoring remote load failures
- contract testing between shell and remotes

## Handling Remote Load Failure

A remote can fail to load because:

- deployment is broken
- CDN cache has stale files
- network request fails
- remote URL is wrong
- version mismatch exists

Shell should show a graceful fallback.

Example idea:

```ts
{
  path: 'orders',
  loadChildren: () =>
    import('orders/Routes')
      .then((m) => m.ORDERS_ROUTES)
      .catch(() => import('./fallback/unavailable.routes').then((m) => m.UNAVAILABLE_ROUTES)),
}
```

Do not let one broken remote make the whole shell blank.

## Testing Strategy

Test levels:

- unit tests inside each remote
- route tests for remote route config
- shell tests for navigation and fallback
- contract tests for shared events and shared interfaces
- end-to-end tests for important journeys across remotes

Example journey:

```text
login in shell
open orders remote
create order
open billing remote
verify invoice is visible
```

## Performance Considerations

Microfrontends can improve or hurt performance.

Benefits:

- route-level loading
- smaller team-owned deployment units
- less initial code if remotes are lazy loaded

Risks:

- duplicate dependencies
- too many remote requests
- slow remote entry loading
- inconsistent caching
- large shared libraries

Best practices:

- lazy load remotes by route
- share Angular dependencies as singletons
- keep remotes focused
- use performance budgets
- monitor real user metrics
- prefetch important remotes only when useful

## Security Considerations

Loading remote frontend code is a trust decision.

Consider:

- only load remotes from trusted domains
- use HTTPS
- protect remote deployment pipeline
- keep auth centralized
- avoid exposing secrets in frontend config
- validate authorization on backend APIs, not only in frontend routes
- use Content Security Policy where possible

Frontend guards improve UX but are not security boundaries.

Backend APIs must enforce authorization.

## Common Mistakes

- choosing microfrontends too early
- splitting by technical layers instead of business domains
- sharing too much code
- no version compatibility plan
- every remote building its own login flow
- no fallback for failed remote loading
- duplicate Angular versions in production
- global state shared across all remotes
- no contract tests
- inconsistent UI because there is no design system

## When Not To Use Microfrontends

Avoid microfrontends when:

- one small team owns the whole app
- deployment independence is not needed
- lazy-loaded Angular routes solve the problem
- business boundaries are unclear
- the team is not ready for deployment and versioning complexity

Senior answer:

Microfrontends trade codebase complexity for organizational independence. If the organization does not need that independence, the trade is usually not worth it.

## Interview Answer

If asked "How would you design Angular microfrontends?", answer like this:

```text
I would start by checking whether a modular monolith with lazy-loaded routes is enough.
If independent team ownership and deployment are required, I would use a shell app with route-based remotes.
The shell would own layout, auth bootstrap, top-level routing, and error fallback.
Each remote would own a business domain such as orders or billing.
Communication would happen through URLs, backend APIs, and stable shared contracts.
Angular, router, RxJS, and design system dependencies would be shared carefully.
I would add correlation in logs, remote load monitoring, version compatibility checks, and E2E tests for cross-remote journeys.
```

## Interview Questions

### What is a microfrontend?

A frontend architecture where a large application is split into independently owned and often independently deployed frontend applications.

### What is the shell app?

The host application that owns global layout, top-level routing, auth bootstrap, and loading remote apps.

### What is a remote app?

A separately built frontend app that exposes routes or components to the shell.

### How does Angular load a remote microfrontend?

Commonly through Module Federation, where the remote exposes routes or components and the shell imports them at runtime.

### How do microfrontends communicate?

Through URL state, backend APIs, shared contracts, custom events, shell-provided services, or carefully designed shared libraries.

### What should be shared between Angular microfrontends?

Angular core packages, router, RxJS, design system components, and stable auth/contracts. Avoid sharing too much feature implementation.

### What is the biggest risk?

Operational and dependency complexity: version mismatch, deployment coordination, remote load failures, duplicate dependencies, and unclear ownership.

### Microfrontend vs lazy-loaded module?

Lazy loading splits one Angular app at build time. Microfrontends split ownership and deployment across multiple independently built apps.
