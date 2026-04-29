# 23. Queues, Background Jobs, And Cron

Not every task should run inside the HTTP request.

Use background jobs for slow, retryable, or scheduled work.

## When To Use Queue

Use queues for:

- sending emails
- image processing
- report generation
- payment webhooks
- notifications
- video processing
- retryable external API calls

HTTP request should enqueue job and respond quickly.

## Job Queue Flow

```text
API receives request
API creates job
worker processes job
job succeeds or retries
```

Common tools:

- BullMQ
- RabbitMQ
- SQS
- Kafka for event streaming

## Retries

Jobs should retry transient failures.

Use:

- max attempts
- exponential backoff
- dead-letter queue

## Idempotency

Jobs may run more than once.

Design jobs so duplicate execution is safe.

Example:

Use an idempotency key for payment processing.

## Cron

Cron runs scheduled work.

Common examples:

- daily reports
- cleanup expired sessions
- sync external data

In distributed systems, ensure only one instance runs a job or use a distributed lock.

## Common Mistakes

- doing slow work in request handler
- no retry limit
- no idempotency
- no dead-letter handling
- cron running on every instance
- no job observability

## Senior Best Practices

- move slow work to queues
- make jobs idempotent
- use retries with backoff
- monitor job failures
- use dead-letter queues
- avoid duplicate cron execution
- store job status when users need progress

## Interview Questions

### Why use a queue?

To process slow or retryable work outside the request-response path.

### What is idempotency?

Running the same operation multiple times has the same final effect.

### What is a dead-letter queue?

A place for jobs that failed too many times and need investigation.

