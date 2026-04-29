# 30. Deployment, Docker, And Production Readiness

Production Node.js requires more than `node server.js`.

You need process management, health checks, graceful shutdown, logs, and safe config.

## Docker

Typical Dockerfile:

```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
CMD ["node", "src/server.js"]
```

Use LTS Node images for production.

## Graceful Shutdown

When app receives `SIGTERM`:

- stop accepting new requests
- finish current requests
- close database connections
- close queue workers
- exit

## Health Checks

Expose endpoints:

- `/healthz`
- `/readyz`

Readiness should fail if critical dependencies are unavailable.

## Reverse Proxy

Often Node.js sits behind:

- Nginx
- load balancer
- API gateway
- Kubernetes ingress

Handle forwarded headers carefully.

## Process Managers

Options:

- systemd
- PM2
- Docker/Kubernetes
- cloud platform process manager

In containers, usually let orchestrator restart processes.

## Common Mistakes

- no graceful shutdown
- no health checks
- running as root in container
- installing dev dependencies in production
- no resource limits
- secrets in image
- no logs to stdout/stderr

## Senior Best Practices

- use LTS Node
- use `npm ci`
- omit dev dependencies
- validate config at startup
- handle SIGTERM
- expose health/readiness
- run with least privilege
- log to stdout/stderr
- monitor deployments

## Interview Questions

### What is graceful shutdown?

Stopping new work, finishing current work, closing resources, and exiting safely.

### Why use health checks?

So load balancers/orchestrators know whether the app is alive and ready.

### Why use `npm ci` in Docker?

It installs exactly from lock file and is reproducible for CI/deployments.

