# Node.js Interview Kit

This folder is a topic-wise Node.js interview preparation kit.

It is designed for both freshers and experienced developers. A fresher should understand what Node.js is, how modules and async code work, and how to build basic APIs. An experienced developer should be able to explain the event loop, streams, clustering, worker threads, production security, performance, testing, observability, databases, caching, and deployment tradeoffs.

As of April 2026, Node.js 24 is LTS and Node.js 25 is Current. For production, prefer Active LTS or Maintenance LTS releases.

Topic explanations are in [topics](./topics).

Coding examples are in [programs](./programs).

## Node.js In Simple Words

Node.js lets JavaScript run outside the browser.

It is commonly used for:

- REST APIs
- GraphQL APIs
- real-time apps
- command-line tools
- background jobs
- microservices
- server-side rendering
- build tools

Node.js is built on:

- V8 JavaScript engine
- libuv for async I/O
- event loop
- non-blocking APIs
- module system
- standard library

## Core Mental Model

Node.js is good at I/O-heavy work.

Examples:

- reading files
- calling databases
- handling HTTP requests
- waiting for network responses

Node.js should not block the event loop with long CPU-heavy work.

If the event loop is blocked, all requests suffer.

## Suggested Reading Order

### 1. Foundation

1. [Node.js Overview](./topics/01-nodejs-overview.md)  
   Explains what Node.js is, where it is used, strengths, limitations, and interview expectations.

2. [Node.js Runtime And Architecture](./topics/02-runtime-architecture.md)  
   Explains V8, libuv, call stack, event loop, thread pool, and non-blocking I/O.

3. [Setup, Tooling, And Project Structure](./topics/03-setup-tooling-project-structure.md)  
   Explains project setup, package managers, scripts, environment files, TypeScript, and folder structure.

4. [Modules: CommonJS And ES Modules](./topics/04-modules-commonjs-esm.md)  
   Explains `require`, `module.exports`, `import`, `export`, `type: module`, and migration tradeoffs.

5. [npm, package.json, And Dependency Management](./topics/05-npm-package-json-dependencies.md)  
   Explains dependencies, devDependencies, scripts, lock files, semantic versioning, and supply-chain risk.

### 2. Async And Core APIs

6. [Event Loop, Timers, And Microtasks](./topics/06-event-loop-timers-microtasks.md)  
   Explains event loop phases, `setTimeout`, `setImmediate`, `process.nextTick`, promises, and common interview ordering questions.

7. [Async JavaScript: Callbacks, Promises, Async Await](./topics/07-async-callbacks-promises-async-await.md)  
   Explains callback style, promise chains, async/await, error handling, and concurrency.

8. [Error Handling](./topics/08-error-handling.md)  
   Explains operational vs programmer errors, try/catch, async errors, Express error middleware, and process-level handlers.

9. [File System, Path, And Buffers](./topics/09-file-system-path-buffer.md)  
   Explains `fs`, `path`, `Buffer`, sync vs async file APIs, binary data, and safe path handling.

10. [Streams And Backpressure](./topics/10-streams-backpressure.md)  
    Explains readable/writable/transform streams, `pipeline`, backpressure, file uploads, and large file processing.

11. [Events And EventEmitter](./topics/11-events-eventemitter.md)  
    Explains event-driven programming, custom events, listener cleanup, and memory leak warnings.

### 3. Web APIs And Backend Development

12. [HTTP Module And Web APIs](./topics/12-http-module-web-apis.md)  
    Explains native HTTP server, request/response lifecycle, headers, status codes, and built-in `fetch`.

13. [Express.js Fundamentals](./topics/13-express-fundamentals.md)  
    Explains routing, middleware, controllers, error handlers, and app structure.

14. [REST API Design](./topics/14-rest-api-design.md)  
    Explains resources, methods, status codes, pagination, filtering, validation, and versioning.

15. [Middleware, Validation, And Request Lifecycle](./topics/15-middleware-validation-request-lifecycle.md)  
    Explains middleware order, auth middleware, validation middleware, and request context.

16. [Authentication And Authorization](./topics/16-authentication-authorization.md)  
    Explains sessions, JWT, refresh tokens, cookies, RBAC, guards, password hashing, and auth mistakes.

17. [Security In Node.js](./topics/17-security-nodejs.md)  
    Explains XSS, CSRF, CORS, rate limiting, Helmet, secrets, injection, SSRF, dependency security, and safe defaults.

18. [CORS, Cookies, Sessions, And CSRF](./topics/18-cors-cookies-sessions-csrf.md)  
    Explains browser security boundaries and common production auth configuration issues.

### 4. Data, Jobs, And Real-Time

19. [Databases With Node.js](./topics/19-databases-nodejs.md)  
    Explains SQL/NoSQL, connection pooling, transactions, query parameterization, migrations, and repositories.

20. [MongoDB And Mongoose](./topics/20-mongodb-mongoose.md)  
    Explains schema modeling, indexes, validation, lean queries, pagination, and common mistakes.

21. [PostgreSQL And SQL](./topics/21-postgresql-sql.md)  
    Explains parameterized queries, transactions, indexes, joins, and pooling.

22. [Caching And Redis](./topics/22-caching-redis.md)  
    Explains cache-aside, TTL, invalidation, distributed locks, rate limiting, and session storage.

23. [Queues, Background Jobs, And Cron](./topics/23-queues-background-jobs-cron.md)  
    Explains job queues, retries, idempotency, delayed jobs, workers, and cron pitfalls.

24. [WebSockets And Real-Time Node.js](./topics/24-websockets-realtime.md)  
    Explains websocket lifecycle, rooms, heartbeats, scaling, sticky sessions, and pub/sub.

### 5. Performance, Scaling, Testing, And Production

25. [Worker Threads, Cluster, And Child Processes](./topics/25-workers-cluster-child-processes.md)  
    Explains CPU work, parallelism, process isolation, cluster mode, and when to use each.

26. [Performance And Memory](./topics/26-performance-memory.md)  
    Explains event loop blocking, memory leaks, heap snapshots, profiling, streams, and load testing.

27. [Testing Node.js](./topics/27-testing-nodejs.md)  
    Explains `node:test`, Jest/Vitest, Supertest, integration tests, mocks, fixtures, and test strategy.

28. [Logging, Monitoring, And Observability](./topics/28-logging-monitoring-observability.md)  
    Explains structured logging, correlation IDs, metrics, tracing, health checks, and production debugging.

29. [Configuration And Environment Variables](./topics/29-configuration-env.md)  
    Explains env config, secrets, validation, config layering, and twelve-factor style practices.

30. [Deployment, Docker, And Production Readiness](./topics/30-deployment-docker-production.md)  
    Explains Docker, process managers, graceful shutdown, health checks, reverse proxies, and zero-downtime deployment.

31. [Node.js With TypeScript](./topics/31-nodejs-typescript.md)  
    Explains TypeScript setup, DTOs, path aliases, runtime validation, tsx/ts-node, and build output.

32. [Company-Style Node.js Coding Tasks](./topics/32-company-style-coding-tasks.md)  
    Lists common practical tasks and what interviewers check.

33. [Architecture Case Studies](./topics/33-architecture-case-studies.md)  
    Explains API architecture, layered structure, microservices tradeoffs, background jobs, and scaling.

34. [Scenario-Based Senior Node.js Q&A](./topics/34-scenario-based-senior-qa.md)  
    Covers debugging questions like slow API, memory leak, duplicate jobs, database timeouts, and event loop blocking.

35. [Senior Interview Questions](./topics/35-senior-interview-questions.md)  
    Quick revision file for high-value Node.js interview questions.

## Common Coding Programs

### Foundation And Core APIs

- [Hello HTTP server](./programs/01-http-server.js)
- [CommonJS module export/import](./programs/02-commonjs-module.cjs)
- [ES module export/import](./programs/03-es-module.mjs)
- [Event loop order](./programs/04-event-loop-order.js)
- [Async await error handling](./programs/05-async-await-error-handling.js)
- [Read file async](./programs/06-read-file-async.js)
- [Buffer example](./programs/07-buffer-example.js)

### Streams, Events, And Files

- [Stream file copy with pipeline](./programs/08-stream-pipeline-copy.js)
- [Transform stream uppercase](./programs/09-transform-stream-uppercase.js)
- [EventEmitter example](./programs/10-event-emitter.js)
- [Safe path join](./programs/11-safe-path-join.js)

### Express And APIs

- [Basic Express server](./programs/12-express-basic-server.js)
- [Express middleware order](./programs/13-express-middleware-order.js)
- [Express error handler](./programs/14-express-error-handler.js)
- [REST CRUD users](./programs/15-rest-crud-users.js)
- [Request validation middleware](./programs/16-validation-middleware.js)
- [Pagination filtering sorting](./programs/17-pagination-filter-sort.js)

### Auth And Security

- [JWT auth middleware](./programs/18-jwt-auth-middleware.js)
- [Role-based authorization](./programs/19-role-based-authorization.js)
- [Password hashing with bcrypt](./programs/20-password-hashing-bcrypt.js)
- [Refresh token rotation sketch](./programs/21-refresh-token-rotation.js)
- [Rate limiter middleware](./programs/22-rate-limiter.js)
- [CORS configuration](./programs/23-cors-config.js)

### Database, Cache, Jobs, Realtime

- [Postgres parameterized query](./programs/24-postgres-parameterized-query.js)
- [Postgres transaction](./programs/25-postgres-transaction.js)
- [MongoDB repository example](./programs/26-mongodb-repository.js)
- [Redis cache-aside](./programs/27-redis-cache-aside.js)
- [Queue worker with retry](./programs/28-queue-worker-retry.js)
- [Cron job idempotency](./programs/29-cron-idempotency.js)
- [WebSocket server](./programs/30-websocket-server.js)

### Production, Testing, And Performance

- [Worker thread CPU task](./programs/31-worker-thread-cpu-task.js)
- [Child process execFile](./programs/32-child-process-execfile.js)
- [Graceful shutdown](./programs/33-graceful-shutdown.js)
- [Structured logger](./programs/34-structured-logger.js)
- [Correlation ID middleware](./programs/35-correlation-id-middleware.js)
- [Health check endpoint](./programs/36-health-check.js)
- [node:test unit test](./programs/37-node-test-unit.test.js)
- [Supertest API test](./programs/38-supertest-api.test.js)
- [Environment config validation](./programs/39-env-config-validation.js)
- [Memory leak example and fix](./programs/40-memory-leak-example.js)

## What Companies Commonly Ask

For freshers:

- What is Node.js?
- Node.js vs browser JavaScript?
- What is the event loop?
- Callback vs promise vs async/await?
- CommonJS vs ES Modules?
- What is middleware?
- How do you create a basic API?
- How do you handle errors?

For experienced developers:

- Event loop phases and microtasks
- Streams and backpressure
- How to avoid blocking the event loop
- Worker threads vs cluster vs child process
- JWT vs session auth
- CORS and CSRF
- SQL injection prevention
- Connection pooling and transactions
- Redis caching and invalidation
- Queue retries and idempotency
- Graceful shutdown
- Logging, tracing, and correlation IDs
- Debugging memory leaks and slow APIs

## Senior Preparation Rule

For every topic, practice explaining:

- what problem it solves
- how Node.js handles it internally
- common mistakes
- production impact
- testing impact
- security impact
- what you would choose in a real backend

## Sources Checked

- Node.js releases and LTS status: https://nodejs.org/en/about/previous-releases
- Node.js release blog: https://nodejs.org/en/blog/release

