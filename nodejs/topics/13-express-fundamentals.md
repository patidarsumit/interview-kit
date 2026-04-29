# 13. Express.js Fundamentals

Express is a minimal Node.js web framework.

It is commonly asked in interviews because many companies use it or similar middleware-based frameworks.

## Basic Server

```js
import express from 'express';

const app = express();

app.use(express.json());

app.get('/health', (request, response) => {
  response.json({status: 'ok'});
});

app.listen(3000);
```

## Routing

```js
app.get('/users', listUsers);
app.post('/users', createUser);
app.get('/users/:id', getUserById);
app.patch('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
```

## Middleware

Middleware runs between request and response.

```js
app.use((request, response, next) => {
  console.log(request.method, request.url);
  next();
});
```

Middleware can:

- log requests
- parse body
- authenticate user
- validate input
- rate limit
- handle errors

## Controller-Service Pattern

Controller handles HTTP.

Service handles business logic.

Repository handles database.

```text
route -> controller -> service -> repository
```

This keeps code testable.

## Error Handler

```js
app.use((error, request, response, next) => {
  response.status(error.statusCode ?? 500).json({
    message: error.message ?? 'Internal server error',
  });
});
```

Error middleware must be registered after routes.

## Common Mistakes

- no centralized error handling
- business logic inside route file
- middleware order wrong
- no validation
- no async error handling
- exposing internal errors to users

## Senior Best Practices

- separate routes/controllers/services/repositories
- register middleware in correct order
- validate input before service logic
- centralize error responses
- keep controllers thin
- use async error handling consistently

## Interview Questions

### What is middleware?

A function that runs during request processing and can modify request/response or pass control to the next handler.

### Why separate controller and service?

To keep HTTP concerns separate from business logic and improve testability.

