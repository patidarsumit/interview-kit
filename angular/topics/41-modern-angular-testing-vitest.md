# 41. Modern Angular Testing With Vitest

Angular v21 uses Vitest as the default unit test runner for new CLI projects.

Karma is still supported, but Vitest is now the modern default.

## Running Tests

```bash
ng test
```

For coverage:

```bash
ng test --coverage
```

Angular CLI manages most Vitest configuration through the Angular test builder.

## Why Vitest

Vitest is popular because it is:

- fast
- modern
- TypeScript-friendly
- watch-mode friendly
- easier to run in a Node-based DOM environment

By default, Angular tests run in Node with DOM emulation such as `jsdom`.

## TestBed Still Matters

Vitest changes the runner, not Angular's component testing model.

You still use:

- `TestBed`
- component fixtures
- dependency injection
- HTTP testing utilities
- router testing utilities

```ts
import {TestBed} from '@angular/core/testing';
import {describe, expect, it} from 'vitest';

describe('ExampleService', () => {
  it('creates the service', () => {
    const service = TestBed.inject(ExampleService);
    expect(service).toBeTruthy();
  });
});
```

## Migrating From Karma

Common migration work:

- replace Jasmine globals/imports where needed
- migrate spies to Vitest mocks
- replace `fakeAsync` patterns when unsupported
- use native `async` / `await`
- check tests that depend on real browser behavior

## Testing Signals

Signals are synchronous, so many tests are simple.

```ts
const count = signal(1);
const doubled = computed(() => count() * 2);

expect(doubled()).toBe(2);
count.set(3);
expect(doubled()).toBe(6);
```

## What To Test

Good Angular tests focus on:

- service behavior
- validators
- guards
- interceptors
- component inputs and outputs
- user-visible DOM behavior
- important routing flows

Avoid tests that only check implementation details.

## Senior Best Practices

- test behavior, not private methods
- mock network, browser storage, dates, and timers carefully
- keep component tests focused
- use e2e tests for critical journeys
- do not assert fragile generated DOM structure
- run tests in CI with coverage expectations
- use browser mode only when Node DOM emulation is not enough

## Interview Questions

### Is TestBed replaced by Vitest?

No. Vitest is the runner. TestBed is still Angular's main testing utility.

### Is Karma removed?

No. Karma is still supported, but Vitest is the default for new Angular CLI projects.

### Why are signal tests often simple?

Signals update synchronously, so derived state can often be asserted immediately.

