# 14. Routing

Angular Router maps URLs to components.

## Basic Routes

```ts
import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: '**', component: NotFoundComponent},
];
```

Modern standalone setup:

```ts
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
```

## Router Outlet

```html
<router-outlet />
```

## Router Links

```html
<a routerLink="/users">Users</a>
```

Active links:

```html
<a routerLink="/users" routerLinkActive="active">Users</a>
```

## Route Parameters

```ts
{path: 'users/:id', component: UserDetailComponent}
```

Read params:

```ts
const route = inject(ActivatedRoute);
const id = route.snapshot.paramMap.get('id');
```

Reactive params:

```ts
route.paramMap.subscribe((params) => {
  console.log(params.get('id'));
});
```

## Query Parameters

URL:

```text
/users?page=2
```

Navigation:

```ts
router.navigate(['/users'], {
  queryParams: {page: 2},
});
```

## Nested Routes

```ts
{
  path: 'settings',
  component: SettingsShellComponent,
  children: [
    {path: 'profile', component: ProfileSettingsComponent},
    {path: 'billing', component: BillingSettingsComponent},
  ],
}
```

## Senior Best Practices

- lazy load route features
- keep route configs feature-owned
- use guards for access decisions
- use resolvers only when route should wait for data
- use URL as shareable state for filters and tabs
- handle not-found routes
- avoid huge route files

For production-level routing topics, see [Route Architecture And Production Routing](./42-route-architecture-and-production.md).

## Interview Questions

### What is Angular Router?

The Angular package that maps browser URLs to application views.

### Route params vs query params?

Route params identify route resources. Query params represent optional state such as filters, search, page, and sort.
