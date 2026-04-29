# 37. Angular Libraries And Custom Elements

Senior Angular engineers often build shared libraries and design systems.

## Angular Libraries

Create a library:

```bash
ng generate library ui
```

Libraries are useful for:

- design systems
- shared utilities
- shared feature SDKs
- enterprise component libraries
- cross-application code reuse

## Public API

Libraries should expose stable APIs.

```ts
// public-api.ts
export * from './lib/button/button.component';
export * from './lib/dialog/dialog.service';
```

Avoid exporting internal implementation details.

## Library Design Best Practices

- keep public API small
- use semantic versioning
- document breaking changes
- avoid app-specific assumptions
- provide accessible defaults
- support tree shaking
- test public behavior
- avoid global styles unless intentional

## Secondary Entry Points

Large libraries may use secondary entry points.

Example:

```text
@company/ui/button
@company/ui/dialog
@company/ui/table
```

This can improve organization and tree shaking.

## Angular Elements / Custom Elements

Angular can package components as custom elements.

Use cases:

- embedding Angular widgets in non-Angular apps
- micro frontend integration
- legacy platform integration

Concept:

```ts
const element = createCustomElement(UserCardComponent, {injector});
customElements.define('user-card', element);
```

Usage:

```html
<user-card></user-card>
```

## Tradeoffs

Custom elements can help framework interoperability, but consider:

- bundle size
- styling boundaries
- events and attributes
- dependency duplication
- SSR limitations
- accessibility ownership

## Senior Best Practices

- design libraries around stable contracts
- prefer standalone components for modern libraries
- document inputs, outputs, and accessibility behavior
- keep dependencies minimal
- version carefully
- use custom elements only when integration needs justify them

## Interview Questions

### Why create an Angular library?

To share reusable components, services, and utilities across apps.

### What is `public-api.ts`?

The entry point that defines what the library exposes to consumers.

### When use Angular custom elements?

When Angular components need to be embedded in non-Angular environments.

