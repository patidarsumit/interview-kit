# 15. Middleware, Validation, And Request Lifecycle

Middleware is central to Express-style Node.js APIs.

It lets you build a request pipeline.

## Request Lifecycle

Typical flow:

```text
request
  -> request ID middleware
  -> logger
  -> body parser
  -> auth
  -> validation
  -> route handler
  -> error handler
response
```

Order matters.

## Middleware Signature

```js
function middleware(request, response, next) {
  next();
}
```

If middleware does not call `next()` or send a response, the request hangs.

## Auth Middleware

```js
function requireAuth(request, response, next) {
  if (!request.user) {
    response.status(401).json({message: 'Unauthorized'});
    return;
  }

  next();
}
```

## Validation Middleware

```js
function validateBody(schema) {
  return (request, response, next) => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      response.status(400).json({message: 'Invalid request'});
      return;
    }

    request.body = result.data;
    next();
  };
}
```

## Error Middleware

Error middleware has four arguments.

```js
function errorHandler(error, request, response, next) {
  response.status(500).json({message: 'Internal server error'});
}
```

## Common Mistakes

- wrong middleware order
- forgetting `next()`
- calling `next()` after sending response
- validating after service logic
- trusting request body
- not centralizing errors

## Senior Best Practices

- order middleware intentionally
- validate at boundaries
- attach request context carefully
- keep middleware focused
- avoid hidden business logic in middleware
- test middleware separately when complex

## Interview Questions

### Why does middleware order matter?

Because each middleware runs in registration order and later handlers depend on earlier work like parsing, auth, and validation.

### What happens if middleware does not call next?

The request stops unless the middleware sends a response.

