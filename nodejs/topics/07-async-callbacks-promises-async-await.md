# 07. Async JavaScript: Callbacks, Promises, Async Await

Node.js is built around asynchronous programming.

You must know callbacks, promises, and async/await because older and newer Node.js codebases use all three.

## Callback Style

Older Node.js APIs commonly use error-first callbacks.

```js
fs.readFile('users.json', 'utf8', (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
});
```

First argument is error. Second is result.

## Callback Problem

Nested callbacks can become hard to read.

```js
getUser(id, (error, user) => {
  getOrders(user.id, (error, orders) => {
    getPayment(orders[0].id, (error, payment) => {
      console.log(payment);
    });
  });
});
```

This is often called callback nesting or callback hell.

## Promises

Promises represent future values.

```js
readFile('users.json', 'utf8')
  .then((data) => JSON.parse(data))
  .catch((error) => console.error(error));
```

## async/await

`async/await` makes promise code look synchronous.

```js
async function loadUsers() {
  try {
    const data = await readFile('users.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

## Sequential vs Parallel

Sequential:

```js
const user = await getUser(id);
const orders = await getOrders(user.id);
```

Use when second depends on first.

Parallel:

```js
const [users, products] = await Promise.all([
  getUsers(),
  getProducts(),
]);
```

Use when tasks are independent.

## Promise.all

`Promise.all` fails fast if one promise rejects.

Use `Promise.allSettled` when you need all results even if some fail.

## Common Mistakes

- forgetting `await`
- using `await` in a loop when parallel is possible
- not handling promise rejection
- catching errors and swallowing them
- mixing callbacks and promises badly
- using `forEach` with async incorrectly

Bad:

```js
items.forEach(async (item) => {
  await save(item);
});
```

Better:

```js
await Promise.all(items.map((item) => save(item)));
```

## Senior Best Practices

- use async/await for readability
- use `Promise.all` for independent tasks
- use `Promise.allSettled` for partial failures
- handle errors at proper boundary
- avoid unbounded concurrency for huge lists
- use concurrency limits for large batches

## Interview Questions

### Callback vs promise?

Callbacks pass a function to run later. Promises represent future completion and compose better.

### When use Promise.all?

When async tasks are independent and can run concurrently.

### Why is async forEach a problem?

`forEach` does not await async callbacks, so errors and completion timing are easy to mishandle.

