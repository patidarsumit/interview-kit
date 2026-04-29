# 15. Guards, Resolvers, And Lazy Loading

These topics are common in senior Angular interviews.

## Lazy Loading Components

```ts
export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./features/users/users-page.component').then((m) => m.UsersPageComponent),
  },
];
```

## Lazy Loading Route Files

```ts
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes),
}
```

## Functional Guard

```ts
import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn() || router.parseUrl('/login');
};
```

## Common Guards

- `canActivate`
- `canActivateChild`
- `canDeactivate`
- `canMatch`

Use `canMatch` when you want to prevent route matching or lazy loading based on a condition.

## Resolver

Resolvers fetch data before route activation.

```ts
export const userResolver: ResolveFn<User> = (route) => {
  const users = inject(UsersService);
  return users.getUser(route.paramMap.get('id')!);
};
```

Route:

```ts
{
  path: 'users/:id',
  component: UserDetailComponent,
  resolve: {user: userResolver},
}
```

## Guards vs Resolvers

Guards answer:

> Can the user enter or leave this route?

Resolvers answer:

> What data must be ready before this route renders?

## Senior Best Practices

- use lazy loading for feature routes
- use guards for authorization and unsaved changes
- do not put complex business workflows in guards
- avoid blocking navigation unnecessarily
- handle resolver errors
- prefer route-level providers for feature services

## Interview Questions

### Why lazy load?

To reduce initial bundle size and load feature code only when needed.

### Guard vs interceptor?

A guard controls navigation. An interceptor transforms or observes HTTP requests and responses.

### `canActivate` vs `canMatch`?

`canActivate` runs after matching. `canMatch` can prevent a route from matching and can avoid loading that route.

