# 28. Logging, Monitoring, And Observability

Production Node.js apps need observability.

Observability helps answer:

> What is happening in production?

## Structured Logging

Prefer JSON logs.

```js
logger.info({
  requestId,
  userId,
  path: request.path,
}, 'request completed');
```

Structured logs are easier to search.

## Correlation ID

A correlation ID connects logs for one request.

Flow:

```text
request arrives
assign requestId
attach to logs
return in response header
propagate to downstream services
```

## Metrics

Track:

- request count
- latency
- error rate
- memory usage
- CPU usage
- event loop lag
- queue depth
- database latency

## Tracing

Distributed tracing shows request flow across services.

Useful for microservices and external dependencies.

## Health Checks

Health endpoints help load balancers and orchestration.

Types:

- liveness: process is alive
- readiness: app can serve traffic

## Common Mistakes

- plain string logs only
- no request ID
- logging secrets
- no error stack/context
- health check always returns OK
- no alerts on error rate/latency

## Senior Best Practices

- use structured logs
- add correlation IDs
- avoid logging secrets
- monitor key metrics
- add tracing for distributed systems
- expose meaningful health checks
- alert on symptoms users feel

## Interview Questions

### Why structured logging?

It makes logs searchable and machine-readable.

### What is correlation ID?

An ID used to connect all logs and traces for one request.

### Liveness vs readiness?

Liveness checks if process is alive. Readiness checks if app can handle traffic.

