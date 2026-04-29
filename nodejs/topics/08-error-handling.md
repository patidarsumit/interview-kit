# 08. Error Handling

Error handling is critical in Node.js because async errors can crash processes or create broken responses.

## Types Of Errors

Operational errors:

- database unavailable
- invalid user input
- network timeout
- file not found

Programmer errors:

- undefined variable
- wrong function call
- null access
- broken invariant

Operational errors should be handled gracefully.

Programmer errors often indicate bugs that should be fixed.

## try/catch With async/await

```js
async function getUser(id) {
  try {
    return await usersRepository.findById(id);
  } catch (error) {
    logger.error({error}, 'Could not load user');
    throw error;
  }
}
```

## Express Error Middleware

```js
app.use((error, request, response, next) => {
  response.status(500).json({
    message: 'Internal server error',
  });
});
```

Error middleware has four parameters.

## Async Express Errors

In modern Express versions, rejected promises can flow to error handling. In older code, wrappers are often used.

```js
const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};
```

## Process-Level Handlers

```js
process.on('uncaughtException', (error) => {
  logger.fatal({error}, 'Uncaught exception');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.fatal({reason}, 'Unhandled rejection');
  process.exit(1);
});
```

Senior point:

Do not treat process-level handlers as normal error recovery. Log, shut down gracefully, and let orchestration restart.

## Custom Error Classes

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

Use custom errors for consistent API responses.

## Common Mistakes

- swallowing errors
- sending stack traces to users
- no centralized error middleware
- continuing after uncaught exception
- not logging enough context
- returning 500 for validation errors

## Senior Best Practices

- classify operational vs programmer errors
- centralize HTTP error handling
- log with context
- return safe error messages
- validate input early
- shut down gracefully on fatal errors
- monitor unhandled errors

## Interview Questions

### What is an operational error?

An expected runtime failure such as invalid input, timeout, or database unavailable.

### Should you continue after uncaughtException?

Usually no. The process may be in an unknown state. Log, gracefully shut down, and restart.

### Why centralize error handling?

To keep responses consistent and avoid duplicated error logic.

