# 04. Components

Components are the main building block of Angular applications.

Every component has:

- a selector
- a template
- a class
- optional styles
- metadata

## Basic Component

```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <article>
      <h2>{{ name }}</h2>
    </article>
  `,
  styles: `
    article {
      border: 1px solid #ddd;
      padding: 1rem;
    }
  `,
})
export class UserCardComponent {
  name = 'Sumit';
}
```

## Standalone Components

Modern Angular components are standalone by default.

```ts
@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  template: `<app-user-card />`,
})
export class UserListComponent {}
```

In older Angular, components belonged to an NgModule. In modern Angular, dependencies are declared directly in the component `imports`.

## Component Metadata

Common metadata:

- `selector`
- `template`
- `templateUrl`
- `styles`
- `styleUrl`
- `imports`
- `providers`
- `changeDetection`
- `host`

## Component Tree

Angular applications are component trees.

Parent components pass data down.

Child components emit events up.

Services handle shared logic and cross-component coordination.

## Smart vs Presentational Components

Smart component:

- fetches data
- coordinates services
- owns route-level state

Presentational component:

- receives inputs
- emits outputs
- focuses on UI
- easy to test

## Senior Best Practices

- keep components focused
- avoid huge templates
- use services for reusable business logic
- use signals or observables intentionally
- make presentational components reusable
- avoid mutating inputs directly
- choose `OnPush` or signal-friendly patterns
- keep accessibility in component markup

## Common Interview Questions

### What is a component?

A component is a TypeScript class plus metadata and a template that controls a piece of UI.

### What is the host element?

The DOM element that matches the component selector.

### What are standalone components?

Components that declare their own dependencies through `imports` instead of being declared in an NgModule.

