# 33. Architecture Case Studies

Senior Node.js interviews often ask system and code organization questions.

## REST API Architecture

Recommended flow:

```text
route -> validation -> controller -> service -> repository -> database
```

Controller:

- HTTP request/response

Service:

- business logic

Repository:

- database access

## Admin Dashboard Backend

Needs:

- auth
- RBAC
- audit logs
- pagination
- filtering
- export jobs
- rate limiting
- observability

Large exports should run as background jobs, not inside request.

## Monolith vs Microservices

Start with modular monolith for many teams.

Use microservices when:

- independent scaling is needed
- team boundaries require it
- deployment independence matters
- domain boundaries are clear

Microservices add:

- network failures
- distributed tracing
- data consistency challenges
- deployment complexity

## Background Job System

Design:

- API creates job
- worker processes job
- retries with backoff
- dead-letter queue
- status stored in database
- idempotency key prevents duplicates

## Interview Questions

### How would you structure a Node.js API?

Use routes/controllers/services/repositories with validation and centralized error handling.

### Monolith vs microservices?

Prefer modular monolith until scaling/team/domain needs justify microservices.

### How handle long-running export?

Create a background job and return job ID, then let client poll or subscribe for status.

