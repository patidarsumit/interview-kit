# 01. Angular Overview

Angular is a TypeScript-based application framework for building client-side, server-rendered, and hybrid web applications.

It provides:

- components
- templates
- dependency injection
- routing
- forms
- HTTP client
- signals and reactivity
- build tooling through Angular CLI
- testing utilities
- SSR, prerendering, hydration, and hybrid rendering

## What Problem Angular Solves

Angular gives teams a complete framework instead of only a view layer.

It is useful when an application needs:

- many screens
- complex forms
- routing
- shared services
- predictable architecture
- long-term maintainability
- strong TypeScript support
- enterprise-scale tooling

## Angular Application Mental Model

An Angular app is a tree of components.

Each component has:

- a TypeScript class for state and behavior
- an HTML template for rendering
- styles for presentation
- metadata through `@Component`

```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <article>
      <h2>{{ name }}</h2>
    </article>
  `,
})
export class UserCard {
  name = 'Sumit';
}
```

## Angular Today

Modern Angular uses:

- standalone components by default
- `bootstrapApplication`
- signals for fine-grained reactivity
- built-in control flow: `@if`, `@for`, `@switch`
- deferred loading with `@defer`
- functional route guards and interceptors
- route-level lazy loading
- hybrid rendering
- zoneless change detection in new Angular v21 applications

## Senior Interview Line

> Angular is a full application framework. Senior Angular work is about component design, dependency boundaries, template performance, routing architecture, forms, reactivity, SSR/hydration, security, accessibility, and maintainability.

## Common Mistakes

- treating Angular like only a component library
- putting all logic in components
- overusing services as global state
- ignoring template performance
- not understanding change detection
- not using lazy loading
- not validating forms and HTTP boundaries
- relying on outdated NgModule-only patterns for new code

