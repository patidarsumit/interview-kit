# 26. Performance And Memory

Node.js performance is mostly about keeping the event loop healthy, database calls efficient, and memory under control.

## Common Bottlenecks

- blocking event loop
- slow database queries
- missing indexes
- too many external API calls
- large JSON parsing
- loading huge files into memory
- memory leaks
- excessive logging

## Event Loop Lag

Event loop lag means callbacks are delayed because the main thread is busy.

Causes:

- CPU loops
- sync file APIs
- huge JSON work
- synchronous crypto

Fix:

- worker threads
- streaming
- async APIs
- batching
- pagination

## Memory Leaks

Common causes:

- global arrays/maps growing forever
- unremoved event listeners
- timers not cleared
- caches without TTL
- retaining request objects
- unbounded queues

## Profiling

Use:

- `node --inspect`
- Chrome DevTools
- heap snapshots
- CPU profiles
- clinic.js
- APM tools

## Load Testing

Use:

- autocannon
- k6
- Artillery

Test realistic payloads and database behavior.

## Common Mistakes

- benchmarking dev mode only
- ignoring database performance
- no pagination
- using sync APIs in hot paths
- unbounded in-memory cache
- not monitoring memory over time

## Senior Best Practices

- monitor event loop lag
- profile before optimizing
- use streams for large data
- use pagination
- add database indexes
- use worker threads for CPU
- set memory and timeout limits
- load test before major releases

## Interview Questions

### How do you debug slow Node.js API?

Check event loop lag, database queries, external calls, CPU profile, memory, logs, and load test results.

### What causes memory leaks?

Retained references such as growing maps, unremoved listeners, timers, and caches without limits.

### How do you avoid blocking event loop?

Use async APIs, streams, workers, queues, and avoid long synchronous CPU work.

