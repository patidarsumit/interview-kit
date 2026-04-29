# 10. Dependency Injection

Dependency Injection lets classes receive dependencies instead of creating them directly.

Angular DI improves:

- testability
- configurability
- separation of concerns
- reuse

## Injectable Service

```ts
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  getUsers() {
    return [];
  }
}
```

## Constructor Injection

Older and still valid:

```ts
constructor(private readonly usersService: UsersService) {}
```

## `inject()`

Modern Angular often uses `inject()`.

```ts
import {Component, inject} from '@angular/core';

@Component({
  selector: 'app-users',
  template: `...`,
})
export class UsersComponent {
  private readonly usersService = inject(UsersService);
}
```

## Provider Scopes

Root provider:

```ts
@Injectable({providedIn: 'root'})
export class AuthService {}
```

Component provider:

```ts
@Component({
  providers: [LocalStateService],
})
export class FeatureComponent {}
```

Component providers create a new instance for that component subtree.

## Injection Tokens

Use injection tokens for non-class dependencies.

```ts
import {InjectionToken} from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');
```

Provide:

```ts
{provide: API_URL, useValue: 'https://api.example.com'}
```

Inject:

```ts
const apiUrl = inject(API_URL);
```

## Provider Types

```ts
{provide: Logger, useClass: ConsoleLogger}
{provide: API_URL, useValue: '/api'}
{provide: Logger, useExisting: ExistingLogger}
{provide: Config, useFactory: configFactory}
```

## Hierarchical Injection

Angular injectors are hierarchical.

This means the nearest provider wins.

Senior example:

- root `AuthService` for app-wide auth
- route/component `FeatureState` for isolated feature state
- test provider override for unit tests

## Senior Best Practices

- use `providedIn: 'root'` for app singletons
- use component providers for local state
- use tokens for configuration
- avoid global services becoming dumping grounds
- keep side effects out of constructors
- design services around business capabilities

## Interview Questions

### What is DI?

A pattern where dependencies are provided externally rather than constructed by the class.

### What is hierarchical DI?

Angular resolves dependencies from the closest injector upward.

### Constructor injection vs `inject()`?

Both work. `inject()` is flexible in functions, field initializers, providers, guards, and modern Angular APIs.

