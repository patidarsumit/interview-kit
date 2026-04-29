# 06. Control Flow And Deferred Loading

Modern Angular includes built-in template control flow.

Older Angular commonly used:

```html
<section *ngIf="user">...</section>
<li *ngFor="let item of items; trackBy: trackById">...</li>
```

Modern Angular uses:

```html
@if (user) {
  <p>{{ user.name }}</p>
}
```

## `@if`

```html
@if (isLoggedIn()) {
  <p>Welcome back</p>
} @else {
  <button type="button">Sign in</button>
}
```

Store expression result:

```html
@if (user(); as currentUser) {
  <h1>{{ currentUser.name }}</h1>
}
```

## `@for`

```html
@for (user of users(); track user.id) {
  <article>
    <h2>{{ user.name }}</h2>
  </article>
} @empty {
  <p>No users found.</p>
}
```

Tracking is required because Angular needs to map data items to DOM nodes efficiently.

Good tracking:

```html
@for (order of orders(); track order.id) {}
```

Avoid when possible:

```html
@for (order of orders(); track order) {}
```

## `@switch`

```html
@switch (status()) {
  @case ('loading') {
    <p>Loading...</p>
  }
  @case ('success') {
    <p>Loaded</p>
  }
  @case ('error') {
    <p>Failed</p>
  }
}
```

## `@defer`

`@defer` delays loading part of a template and its dependencies.

```html
@defer (on viewport) {
  <app-heavy-chart />
} @placeholder {
  <p>Chart placeholder</p>
} @loading {
  <p>Loading chart...</p>
} @error {
  <p>Could not load chart.</p>
}
```

Use it for:

- below-the-fold components
- heavy charts
- expensive widgets
- optional panels
- third-party libraries

## Senior Best Practices

- always use stable `track` expressions
- do not put expensive calculations inside `@for`
- use `@empty` for empty states
- use `@defer` to reduce initial bundle size
- provide accessible placeholders and loading states

## Interview Questions

### Why did Angular introduce built-in control flow?

To make template logic more readable, more efficient, and less dependent on structural directive microsyntax.

### Why is `track` important?

It helps Angular reuse DOM nodes and avoid unnecessary rendering work.

### When should you use `@defer`?

When a component is not needed for initial render or is expensive to load.

