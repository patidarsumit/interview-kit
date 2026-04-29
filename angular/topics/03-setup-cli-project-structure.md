# 03. Setup, CLI, And Project Structure

Angular CLI is the standard tool for creating, building, testing, and maintaining Angular applications.

## Create A Project

```bash
ng new my-app
```

With SSR:

```bash
ng new my-app --ssr
```

Run locally:

```bash
ng serve
```

Build:

```bash
ng build
```

Test:

```bash
ng test
```

## Common CLI Commands

```bash
ng generate component user-card
ng generate service users
ng generate pipe title-case
ng generate directive autofocus
ng generate guard auth
```

Short form:

```bash
ng g c user-card
ng g s users
```

## Modern Project Structure

Typical feature-first structure:

```text
src/app/
  app.component.ts
  app.config.ts
  app.routes.ts
  core/
  shared/
  features/
    users/
      users.routes.ts
      users-list.component.ts
      user-detail.component.ts
      users.service.ts
```

## Important Files

`main.ts` starts the application.

```ts
bootstrapApplication(AppComponent, appConfig);
```

`app.config.ts` defines application providers.

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
  ],
};
```

`app.routes.ts` defines routes.

```ts
export const routes: Routes = [
  {path: '', loadComponent: () => import('./home').then((m) => m.Home)},
];
```

## Senior Guidance

Prefer feature-based organization over technical folders.

Good:

```text
features/orders/order-list.component.ts
features/orders/order-detail.component.ts
features/orders/orders.service.ts
```

Less scalable:

```text
components/
services/
models/
```

## Interview Questions

### What is Angular CLI used for?

Project creation, development server, builds, tests, code generation, migrations, and workspace configuration.

### What is `app.config.ts`?

The modern place for application-level providers when using standalone bootstrap.

### What is a good Angular folder structure?

Feature-first, with shared reusable UI separated from core singleton services.

