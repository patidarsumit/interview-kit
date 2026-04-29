# 06. Event Loop, Timers, And Microtasks

The event loop is one of the most important Node.js interview topics.

It explains how Node.js handles async work without creating one thread per request.

## Basic Idea

Synchronous JavaScript runs first.

Async callbacks run later when their operation is ready and the event loop reaches the right phase.

```js
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');
```

Typical output:

```text
A
D
C
B
```

Synchronous code runs first. Promise microtasks run before timers.

## Event Loop Phases

Important phases:

- timers
- pending callbacks
- poll
- check
- close callbacks

Common APIs:

- `setTimeout`: timers phase
- `setImmediate`: check phase
- I/O callbacks: poll phase

## Microtasks

Microtasks run between event loop phases.

Examples:

- promise `.then`
- `queueMicrotask`
- `process.nextTick`

`process.nextTick` has special priority in Node.js.

Senior warning:

Too many `process.nextTick` callbacks can starve the event loop.

## setTimeout vs setImmediate

`setTimeout(fn, 0)` runs in timers phase.

`setImmediate(fn)` runs in check phase.

Ordering can depend on context.

Inside I/O callbacks, `setImmediate` often runs before `setTimeout(0)`.

## Event Loop Blocking

Bad:

```js
while (true) {}
```

This blocks every request.

CPU-heavy loops, sync file reads, and huge JSON parsing can block the event loop.

## Common Mistakes

- thinking async means multi-threaded JavaScript
- blocking the event loop with CPU work
- using sync APIs in request handlers
- abusing `process.nextTick`
- memorizing phases without understanding practical impact

## Senior Best Practices

- keep request handlers non-blocking
- measure event loop lag
- offload CPU-heavy tasks
- use streams for large data
- avoid sync APIs in server hot paths

## Interview Questions

### What is the event loop?

The mechanism that lets Node.js schedule and run async callbacks while JavaScript runs on the main thread.

### Promise vs setTimeout order?

Promise microtasks run before timer callbacks after synchronous code completes.

### What blocks the event loop?

Long synchronous JavaScript, CPU-heavy work, sync I/O, and large blocking operations.

