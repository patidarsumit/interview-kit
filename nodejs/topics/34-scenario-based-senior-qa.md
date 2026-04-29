# 34. Scenario-Based Senior Node.js Q&A

Scenario questions test debugging and production judgment.

## API Is Slow

Check:

- database query time
- external API latency
- event loop lag
- CPU profile
- memory pressure
- logs and traces
- payload size

Do not guess. Measure.

## Memory Keeps Growing

Check:

- global arrays/maps
- caches without TTL
- event listeners
- timers
- unbounded queues
- retained request objects

Use heap snapshots.

## Event Loop Is Blocked

Check:

- sync file APIs
- CPU loops
- large JSON parsing
- synchronous crypto
- compression

Fix with streams, workers, queues, or async APIs.

## Database Pool Exhausted

Check:

- clients not released
- too many concurrent queries
- slow queries
- transaction not completed
- pool size too small

Always release clients in `finally`.

## Duplicate Jobs Run

Check:

- retry behavior
- multiple workers
- cron running on every instance
- missing idempotency key
- no distributed lock

## Random 401s

Check:

- clock skew
- token expiry
- refresh race
- wrong secret
- multiple app instances with different config

## Interview Questions

### Slow API. First step?

Measure database, external calls, event loop lag, CPU, memory, logs, and traces.

### Memory leak. What do you inspect?

Heap snapshots, listeners, timers, caches, global references, and queue growth.

### Job processed twice. What protects you?

Idempotency keys, dedupe, locks, and safe retry design.

