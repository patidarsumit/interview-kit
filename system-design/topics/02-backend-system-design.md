# 02. Backend System Design

Backend system design focuses on APIs, services, databases, caching, queues, security, scaling, and reliability.

The backend is responsible for protecting data and enforcing business rules.

## Basic Backend Architecture

A simple backend system:

```text
frontend
  |
  v
backend API
  |
  v
database
```

A more production-like backend:

```text
browser/mobile
  |
  v
CDN
  |
  v
load balancer
  |
  v
API servers
  |
  +--> database
  +--> Redis cache
  +--> message queue
  +--> object storage
  +--> external services
```

## API Layer

The API layer receives client requests.

Responsibilities:

- parse request
- authenticate user
- authorize action
- validate input
- call business service
- return response
- log request details

Example request:

```text
POST /orders
Authorization: Bearer token
Content-Type: application/json
```

Example body:

```json
{
  "items": [
    {"productId": "p1", "quantity": 2}
  ],
  "addressId": "addr_123"
}
```

Backend should validate:

- user is logged in
- product exists
- quantity is valid
- address belongs to user
- stock is available
- price is calculated on server, not trusted from frontend

## Service Layer

The service layer contains business logic.

Example:

```text
controller receives HTTP request
order service validates business rules
repository stores data
payment service charges user
queue publishes order event
```

Good structure:

```text
routes -> controller -> service -> repository -> database
```

Why this helps:

- controllers stay small
- business logic is testable
- database access is isolated
- code is easier to maintain

## Database Layer

The database stores durable data.

Common choices:

- PostgreSQL or MySQL for relational data
- MongoDB for document data
- Redis for cache and temporary data
- Elasticsearch/OpenSearch for search
- S3/object storage for files

Example e-commerce tables:

```text
users
products
orders
order_items
payments
shipments
```

Use transactions when multiple writes must succeed together.

Example:

```text
create order
create order items
reduce stock
create payment record
```

If one step fails, the transaction can rollback.

## Caching In Backend Design

Cache improves read performance.

Common backend cache pattern:

```text
1. request comes to API
2. API checks Redis
3. if cache hit, return data
4. if cache miss, query database
5. store result in Redis with TTL
6. return data
```

Example:

```text
GET /products/p100
Redis key: product:p100
TTL: 5 minutes
```

Cache invalidation:

When product is updated:

```text
update database
delete product:p100 from Redis
next request rebuilds cache
```

Do not cache everything. Cache data that is read often and safe to serve slightly stale.

## Message Queue And Background Workers

Some work should not happen inside the HTTP request.

Example order flow:

```text
user places order
API creates order
API publishes order.created event
worker sends email
worker updates analytics
worker notifies warehouse
```

Why queue helps:

- API responds faster
- failed jobs can retry
- traffic spikes are buffered
- slow external services do not block user request

Tools:

- RabbitMQ
- Kafka
- AWS SQS
- BullMQ with Redis

Important:

Jobs must be idempotent because they may run more than once.

## Authentication And Authorization

Authentication answers:

```text
Who are you?
```

Authorization answers:

```text
What are you allowed to do?
```

Example:

User is authenticated, but only admins can delete another user.

Backend checks:

```text
is logged in?
has admin role?
is account active?
```

Never rely only on frontend role checks.

## Rate Limiting

Rate limiting protects APIs from abuse.

Example:

```text
maximum 100 login attempts per IP per hour
maximum 1000 API requests per user per minute
```

Use Redis for distributed rate limiting when many API servers are running.

Without Redis, each server only knows its own request count.

## Backend Scaling

Start simple:

```text
one API server
one database
```

Scale gradually:

```text
load balancer
multiple API servers
Redis cache
database read replicas
queue workers
database sharding if truly needed
```

Important:

API servers should be stateless. If server 1 dies, server 2 should handle the next request.

Store sessions in Redis or use secure token/cookie strategy.

## Database Scaling

Common techniques:

- indexes
- query optimization
- connection pooling
- read replicas
- partitioning
- archiving old data
- sharding

Example:

If `GET /orders?userId=123` is slow, first check:

- is there an index on `user_id`?
- is pagination used?
- is the query returning too much data?
- are joins expensive?

Do not jump to sharding too early.

## Reliability And Failure Handling

Backends fail in many ways:

- database is slow
- cache is down
- queue is delayed
- external payment API fails
- one API server crashes

Design for failure:

- timeouts
- retries with limits
- circuit breakers
- graceful shutdown
- health checks
- fallback behavior
- dead-letter queues
- alerts

Example:

If email service fails after order creation, do not fail the order. Put email in retry queue.

If payment service fails during payment, return a clear error and do not create a confirmed order.

## Backend Observability

Add observability from the beginning.

Track:

- request count
- error rate
- latency
- database query time
- cache hit rate
- queue depth
- worker failures
- memory and CPU

Use correlation IDs:

```text
request id abc123 enters API
same id appears in service logs
same id appears in worker logs
```

This helps debug one user request across many services.

## Backend Design Example: Order System

Requirements:

- user can create order
- user can view order
- admin can update order status
- confirmation email should be sent
- payment must be safe

Architecture:

```text
frontend
  |
  v
order API
  |
  +--> PostgreSQL
  +--> Redis
  +--> payment provider
  +--> queue
          |
          v
       email worker
```

Flow:

```text
1. User submits order.
2. API validates user, cart, stock, and address.
3. API calculates price on server.
4. API creates pending order.
5. API calls payment provider with idempotency key.
6. If payment succeeds, order becomes confirmed.
7. API publishes order.confirmed event.
8. Email worker sends confirmation email.
9. User can view order status.
```

Important decisions:

- PostgreSQL is good because orders and payments need transactions.
- Redis can cache product data and rate limits.
- Queue is good for email and analytics.
- Payment call needs idempotency to avoid duplicate charges.
- Backend must enforce authorization for viewing orders.

## Backend Interview Checklist

When designing backend, always mention:

- API endpoints
- data model
- database choice
- cache strategy
- queue/background jobs
- auth and authorization
- rate limiting
- scaling approach
- failure handling
- observability
- tradeoffs
