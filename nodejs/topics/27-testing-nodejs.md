# 27. Testing Node.js

Node.js tests should cover pure logic, APIs, integrations, and critical flows.

## Test Types

Unit tests:

- pure functions
- validators
- services
- utilities

Integration tests:

- API route with database/test container
- repository with real DB
- queue processing

E2E tests:

- full user/business flow

## node:test

Node.js includes a built-in test runner.

```js
import test from 'node:test';
import assert from 'node:assert/strict';

test('adds numbers', () => {
  assert.equal(2 + 3, 5);
});
```

## API Tests

Supertest is common for Express APIs.

```js
await request(app)
  .get('/health')
  .expect(200)
  .expect({status: 'ok'});
```

## What To Test

- validation errors
- auth/authorization
- status codes
- response shape
- service logic
- database transaction behavior
- queue retry behavior
- error handling

## Test Database

Use:

- test containers
- separate test database
- transactions per test
- clean fixtures

Avoid testing everything against mocks only.

## Common Mistakes

- no error case tests
- only testing happy path
- real external API calls in tests
- shared test data pollution
- app starts server during import
- no auth tests

## Senior Best Practices

- separate app creation from server listen
- mock external services at boundaries
- use real DB for important repository tests
- test error responses
- run tests in CI
- keep fixtures readable

## Interview Questions

### Why separate app and server?

So API tests can import the app without opening a real port.

### What should API tests check?

Status codes, response body, validation, auth, and error behavior.

### Why not mock database always?

Mocks can miss real query, transaction, and migration issues.

