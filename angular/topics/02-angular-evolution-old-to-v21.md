# 02. Angular Evolution: Older To Angular 21

Senior engineers are often asked how Angular changed over time.

The best answer is not to memorize every release. Understand the direction of the framework.

## AngularJS vs Angular

AngularJS was the original 1.x framework.

Modern Angular is a rewrite built around:

- TypeScript
- components
- dependency injection
- templates
- RxJS
- build tooling

AngularJS used scopes and controllers. Modern Angular uses components and services.

## Older Angular Patterns

Older Angular applications commonly used:

- NgModules everywhere
- `AppModule`
- `bootstrapModule`
- `*ngIf`, `*ngFor`, `*ngSwitch`
- constructor injection only
- class-based guards
- ZoneJS-based change detection
- RxJS-heavy state
- NgModule-based lazy loading

Example older bootstrap:

```ts
platformBrowserDynamic().bootstrapModule(AppModule);
```

## Modern Angular Patterns

Modern Angular favors:

- standalone components
- `bootstrapApplication`
- functional providers
- `inject()`
- signals
- `@if`, `@for`, `@switch`
- `@defer`
- functional guards and interceptors
- route-level lazy loading
- SSR and hydration
- zoneless change detection

Example modern bootstrap:

```ts
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';

bootstrapApplication(AppComponent);
```

## Angular 17 To 21 Direction

Important modern changes:

- standalone became the main architecture
- signals became the primary reactivity model
- built-in control flow replaced many structural directive use cases
- deferred loading became template-native
- SSR and hydration became first-class
- Signal Forms arrived as experimental in v21
- Angular Aria arrived in v21 for accessible headless directives
- new applications in v21 are zoneless by default
- AI tooling and MCP support became part of the official developer story

## How To Explain In Interviews

> Angular moved from module-heavy, ZoneJS-centered applications toward standalone, signal-driven, more granular, more lazy-loadable, and more server-aware applications.

## Migration Mindset

Do not rewrite everything just because Angular added a new API.

Senior migration strategy:

- use standalone for new features
- migrate NgModules gradually
- introduce signals where they simplify state
- keep RxJS for streams and events
- move route features to lazy loading
- enable stricter template checks
- adopt SSR/hydration based on product needs
- treat experimental APIs carefully

