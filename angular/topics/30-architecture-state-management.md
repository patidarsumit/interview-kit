# 30. Architecture And State Management

Senior Angular interviews often focus on architecture.

## Feature-Based Architecture

Prefer:

```text
features/orders/
  orders.routes.ts
  orders-page.component.ts
  order-detail.component.ts
  orders.service.ts
```

Over:

```text
components/
services/
models/
```

## Core vs Shared

Core:

- singleton services
- auth
- interceptors
- app-level config

Shared:

- reusable UI components
- pipes
- directives
- utility models

## State Levels

Local component state:

- signal in component
- form state
- UI toggles

Feature state:

- feature service with signals
- route-level provider

App state:

- auth
- current tenant
- preferences

Server state:

- HTTP resource
- cached API data
- query libraries if used

## Service With Signals

```ts
@Injectable()
export class CartState {
  private readonly _items = signal<CartItem[]>([]);
  readonly items = this._items.asReadonly();
  readonly count = computed(() => this.items().length);

  add(item: CartItem) {
    this._items.update((items) => [...items, item]);
  }
}
```

Provide at route level for feature isolation.

## When To Use NgRx Or External State

Use external state management when:

- many unrelated features need shared state
- state transitions are complex
- time-travel/debug tooling matters
- effects and events need centralization
- team already has strong conventions

Do not add global state management for simple local state.

## Senior Best Practices

- choose the smallest state scope that works
- avoid global mutable service state for everything
- separate server state from UI state
- keep components thin but not empty
- use route-level providers for feature state
- document architecture decisions

For senior design discussion examples, see [Architecture Case Studies](./45-architecture-case-studies.md).

## Interview Questions

### Where should state live?

As close as possible to where it is used, unless sharing or persistence requires a wider scope.

### Service state vs NgRx?

Service state is simpler and good for many apps. NgRx helps when state transitions and cross-feature coordination become complex.
