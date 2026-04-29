# 12. HTTP Module And Web APIs

Node.js can create HTTP servers without Express.

Understanding the native HTTP module helps you understand frameworks better.

## Basic HTTP Server

```js
import http from 'node:http';

const server = http.createServer((request, response) => {
  response.writeHead(200, {'content-type': 'application/json'});
  response.end(JSON.stringify({message: 'Hello'}));
});

server.listen(3000);
```

## Request And Response

`request` contains:

- method
- URL
- headers
- body stream

`response` controls:

- status code
- headers
- response body

## Request Body

The request body is a stream.

Frameworks parse it for you, but native Node requires manual reading.

```js
let body = '';

request.on('data', (chunk) => {
  body += chunk;
});

request.on('end', () => {
  console.log(JSON.parse(body));
});
```

Use body size limits in production.

## Headers And Status Codes

```js
response.statusCode = 201;
response.setHeader('content-type', 'application/json');
```

Common status codes:

- `200` OK
- `201` Created
- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `409` Conflict
- `500` Internal Server Error

## Built-in fetch

Modern Node.js includes `fetch`.

```js
const response = await fetch('https://api.example.com/users');
const users = await response.json();
```

Use `AbortController` for timeouts/cancellation.

## Common Mistakes

- not setting content type
- not limiting request body size
- using wrong status codes
- not handling request stream errors
- forgetting timeouts for outbound fetch

## Senior Best Practices

- understand native HTTP lifecycle
- use frameworks for real APIs
- validate request bodies
- set timeouts for outbound calls
- use correct status codes and headers
- avoid exposing stack traces

## Interview Questions

### What does Express add over native HTTP?

Routing, middleware, body parsing, error handling patterns, and developer ergonomics.

### What is request body in native HTTP?

A readable stream.

### Does Node.js have fetch?

Modern Node.js includes a built-in `fetch` API.

