# 02. Node.js Runtime And Architecture

Node.js is more than JavaScript.

It combines V8, libuv, native bindings, and a standard library to run server-side JavaScript.

## Main Parts

```text
JavaScript code
  -> Node.js APIs
  -> V8 + native bindings
  -> libuv / operating system
```

## V8

V8 is the JavaScript engine.

It:

- parses JavaScript
- compiles JavaScript
- executes JavaScript
- manages memory and garbage collection

V8 is also used by Chrome.

## libuv

libuv provides:

- event loop
- async file system operations
- TCP/UDP networking support
- timers
- thread pool

libuv is a major reason Node.js can do non-blocking I/O.

## Call Stack

The call stack runs synchronous JavaScript.

```js
function a() {
  b();
}

function b() {
  console.log('hello');
}

a();
```

If synchronous code runs for too long, the event loop cannot process other work.

## Event Loop

The event loop coordinates async callbacks.

It lets Node.js start an operation, continue doing other work, and run a callback when the operation is ready.

## Thread Pool

Some operations use libuv's thread pool.

Examples:

- file system operations
- some crypto operations
- DNS lookup in some cases
- compression

Default thread pool size is limited.

Senior point:

Too many expensive thread-pool tasks can starve other operations.

## Non-Blocking I/O

Non-blocking I/O means Node.js does not wait synchronously for I/O to complete.

```js
fs.readFile('users.json', (error, data) => {
  console.log(data);
});

console.log('runs before file is loaded');
```

The file operation starts, and Node.js continues.

## Blocking Code

Blocking code stops the event loop.

Bad in request handler:

```js
const data = fs.readFileSync('large-file.txt');
```

Better:

```js
const data = await fs.promises.readFile('large-file.txt');
```

## Common Mistakes

- thinking Node.js has no threads at all
- blocking event loop with sync code
- doing CPU-heavy loops in request handlers
- ignoring thread pool saturation
- misunderstanding async as parallel JavaScript execution

## Senior Best Practices

- keep main thread free
- use async APIs in servers
- offload CPU-heavy work
- monitor event loop lag
- understand thread pool usage
- load test production-like workloads

## Interview Questions

### What is V8?

The JavaScript engine that executes JavaScript code in Node.js.

### What is libuv?

A library that provides Node.js event loop, async I/O, timers, and thread pool support.

### Does async mean parallel JavaScript execution?

No. Async means work can continue while waiting. JavaScript callbacks still run on the main thread unless worker threads/processes are used.

