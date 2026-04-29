# 23. Testing

Angular testing covers units, components, services, pipes, directives, routes, and integration behavior.

## Testing Pyramid

Use:

- unit tests for pure logic and services
- component tests for UI behavior
- integration tests for feature flows
- e2e tests for critical user journeys

## TestBed

```ts
import {TestBed} from '@angular/core/testing';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [UserCardComponent],
  });
});
```

## Component Test

```ts
it('renders user name', () => {
  const fixture = TestBed.createComponent(UserCardComponent);
  fixture.componentRef.setInput('user', {id: 'u1', name: 'Sumit'});
  fixture.detectChanges();

  expect(fixture.nativeElement.textContent).toContain('Sumit');
});
```

## Service Test

```ts
it('loads users', () => {
  const service = TestBed.inject(UsersService);
  expect(service).toBeTruthy();
});
```

## HTTP Testing

Use Angular HTTP testing utilities to mock requests.

Test:

- URL
- method
- body
- headers
- success response
- error response

## Router Testing

Test:

- route configuration
- guards
- navigation behavior
- routed component rendering

## Signal Testing

Signals are synchronous, so many signal tests are straightforward.

```ts
const count = signal(1);
const double = computed(() => count() * 2);

expect(double()).toBe(2);
count.set(3);
expect(double()).toBe(6);
```

## Senior Best Practices

- test behavior, not implementation details
- avoid brittle DOM selectors
- use accessible queries when possible
- mock external boundaries
- test guards and interceptors
- test forms with validation states
- include e2e tests for business-critical flows

For the modern Angular v21 Vitest runner, see [Modern Angular Testing With Vitest](./41-modern-angular-testing-vitest.md).

## Interview Questions

### What is TestBed?

Angular's testing utility for configuring a test module/environment.

### What should you unit test in Angular?

Services, pure functions, pipes, guards, validators, and focused component behavior.

### What should e2e tests cover?

Critical user journeys, not every small UI detail.
