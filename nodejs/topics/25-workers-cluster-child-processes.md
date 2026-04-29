# 25. Worker Threads, Cluster, And Child Processes

Node.js should not run heavy CPU work on the main event loop.

Use worker threads, child processes, or separate services for CPU-heavy tasks.

## Worker Threads

Worker threads run JavaScript in separate threads.

Good for:

- CPU-heavy calculations
- image processing
- parsing large data
- compression work

They share memory only when explicitly using shared buffers.

## Child Processes

Child processes run separate OS processes.

Good for:

- running shell commands safely
- isolating work
- calling external binaries
- separate memory/process boundaries

Prefer `execFile` over `exec` when running known binaries with arguments.

## Cluster

Cluster runs multiple Node.js processes to use multiple CPU cores.

Each worker has its own event loop and memory.

In modern production, containers/orchestrators often manage multiple processes instead.

## When To Use What

Worker thread:

- CPU-heavy JS work
- lower overhead than process

Child process:

- external command
- stronger isolation

Cluster/process manager:

- handle more concurrent traffic across CPU cores

Queue:

- long-running background work
- retries and scheduling

## Common Mistakes

- doing CPU work in request handler
- using `exec` with user input
- forgetting worker error handling
- no timeout for child process
- assuming cluster shares memory

## Senior Best Practices

- keep event loop free
- use workers for CPU-heavy JS
- use child processes for external binaries
- use queues for long jobs
- set timeouts
- handle worker/process errors
- monitor event loop lag

## Interview Questions

### Worker thread vs child process?

Worker threads run JS in separate threads in the same process. Child processes are separate OS processes.

### Why not do CPU-heavy work in request handler?

It blocks the event loop and slows all requests.

### Does cluster share memory?

No. Each worker process has its own memory.

