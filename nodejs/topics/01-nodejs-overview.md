# 01. Node.js Overview

Node.js is a JavaScript runtime that lets JavaScript run outside the browser.

It is commonly used to build backend APIs, CLI tools, background jobs, real-time servers, and microservices.

## Why Node.js Exists

Before Node.js, JavaScript mostly ran in browsers.

Node.js made JavaScript useful on servers by providing:

- file system access
- networking APIs
- HTTP server APIs
- process APIs
- streams
- modules
- package ecosystem through npm

## What Node.js Is Good At

Node.js is good at I/O-heavy applications.

Examples:

- REST APIs
- chat apps
- streaming files
- calling databases
- proxy servers
- real-time notifications
- background workers waiting on network calls

Node.js can handle many concurrent requests because it does not block a thread for every I/O operation.

## What Node.js Is Not Best At

Node.js is not ideal for long CPU-heavy work on the main thread.

Examples:

- video encoding
- large image processing
- heavy cryptographic loops
- huge synchronous calculations

These can block the event loop.

For CPU-heavy work, use:

- worker threads
- child processes
- queues
- external services

## Node.js vs Browser JavaScript

Browser JavaScript has:

- DOM
- `window`
- browser events
- localStorage
- fetch

Node.js has:

- `process`
- `fs`
- `path`
- `http`
- `Buffer`
- streams
- worker threads

Modern Node.js also has many Web APIs such as `fetch`, but there is still no DOM by default.

## Runtime Pieces

Node.js includes:

- V8: runs JavaScript
- libuv: handles event loop and async I/O
- C++ bindings: connect JS to system APIs
- standard library: `fs`, `http`, `crypto`, `stream`, etc.
- npm ecosystem

## Common Interview Areas

Companies ask:

- event loop
- async/await
- streams
- middleware
- Express
- REST APIs
- authentication
- security
- databases
- performance
- scaling
- testing
- deployment

## Common Mistakes

- blocking the event loop
- using sync APIs in request handlers
- not handling async errors
- no validation
- no centralized error handling
- leaking secrets
- no graceful shutdown
- no database connection pooling
- no logging/correlation ID

## Senior Best Practices

- keep request handlers non-blocking
- validate input at boundaries
- centralize error handling
- use streams for large data
- use worker threads for CPU-heavy work
- use connection pools
- log structured data
- handle shutdown gracefully
- keep secrets out of source code

## Interview Questions

### What is Node.js?

Node.js is a JavaScript runtime for running JavaScript outside the browser, commonly on servers.

### Why is Node.js good for APIs?

It handles many concurrent I/O operations efficiently using non-blocking APIs and the event loop.

### Is Node.js single-threaded?

JavaScript execution runs on the main thread, but Node.js also uses libuv thread pool, OS async APIs, worker threads, and child processes.

### When should you avoid Node.js?

Avoid using the main Node.js thread for long CPU-heavy tasks.

