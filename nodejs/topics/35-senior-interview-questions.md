# 35. Senior Interview Questions

This file collects high-value Node.js interview questions.

## Fundamentals

### What is Node.js?

A JavaScript runtime for running JavaScript outside the browser.

### Why is Node.js good for I/O-heavy apps?

It uses non-blocking I/O and the event loop to handle many concurrent operations efficiently.

### Node.js vs browser JavaScript?

Node.js has server APIs like `fs`, `http`, `process`, streams, and buffers. Browser JavaScript has DOM and browser APIs.

## Event Loop

### What is the event loop?

The mechanism that schedules async callbacks while JavaScript runs on the main thread.

### What blocks the event loop?

Long synchronous JavaScript, sync I/O, CPU-heavy loops, large JSON work, and blocking crypto.

### Promise vs setTimeout order?

Promise microtasks run before timer callbacks after synchronous code completes.

## Async

### Callback vs promise vs async/await?

Callbacks pass a function. Promises represent future completion. Async/await is syntax over promises.

### When use Promise.all?

When independent async tasks can run concurrently.

## Modules

### CommonJS vs ESM?

CommonJS uses `require/module.exports`. ESM uses `import/export`.

## Express

### What is middleware?

A function in the request pipeline that can inspect/modify request/response or pass to the next handler.

### Why central error handler?

To keep API error responses consistent and avoid duplicated logic.

## REST

### PUT vs PATCH?

PUT replaces a resource. PATCH partially updates it.

### 401 vs 403?

401 means unauthenticated. 403 means authenticated but not authorized.

## Security

### How prevent SQL injection?

Use parameterized queries or ORM binding.

### Why hash passwords?

To avoid storing plain passwords and reduce damage from database leaks.

### What is CSRF?

An attack where a browser is tricked into sending authenticated cookie-based requests.

## Streams

### What is backpressure?

When the writable side cannot consume data as fast as the readable side produces it.

### Why use streams for large files?

They process chunks instead of loading the whole file into memory.

## Database

### Why connection pooling?

To reuse connections and avoid overwhelming the database.

### When use transaction?

When multiple operations must succeed or fail together.

## Scaling

### Worker thread vs child process?

Worker threads are separate JS threads in the same process. Child processes are separate OS processes.

### How scale WebSockets?

Use sticky sessions and shared pub/sub such as Redis across instances.

## Production

### What is graceful shutdown?

Stop accepting new work, finish active work, close resources, and exit safely.

### What is correlation ID?

An ID used to connect logs/traces for one request across services.

## Scenarios

### API is slow. What do you check?

Database, external APIs, event loop lag, CPU, memory, logs, traces, and payload size.

### Memory keeps growing. What do you check?

Global references, caches, listeners, timers, queues, and heap snapshots.

### Database pool exhausted. What do you check?

Unreleased clients, slow queries, open transactions, and too much concurrency.

