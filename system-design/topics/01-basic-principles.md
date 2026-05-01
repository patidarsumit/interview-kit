# 01. Basic Principles Of System Design

System design is the process of planning how different parts of an application work together.

A real system usually has:

- users
- frontend application
- backend APIs
- database
- cache
- file storage
- background jobs
- monitoring
- deployment infrastructure

The goal is to design a system that is correct, fast enough, secure, reliable, maintainable, and scalable.

## 1. Requirements First

Before designing anything, clarify what the system must do.

There are two types of requirements.

Functional requirements:

- what users can do
- what features exist
- what data is created or read
- what workflows are supported

Non-functional requirements:

- performance
- scalability
- security
- availability
- reliability
- latency
- maintainability
- cost

Example:

For a chat app, functional requirements may be:

- user can send a message
- user can receive messages in real time
- user can see chat history
- user can upload images

Non-functional requirements may be:

- messages should appear within 1 second
- system should support 1 million daily users
- messages should not be lost
- private chats must be secure

Senior interview point:

If you skip requirements, your design may solve the wrong problem.

## 2. Estimation And Scale

Scale changes design.

A system for 1,000 users can be simple. A system for 100 million users needs more careful design.

Common questions:

- How many daily active users?
- How many requests per second?
- How much data is stored per day?
- Is traffic read-heavy or write-heavy?
- Is real-time behavior required?
- What latency is acceptable?

Example:

An e-commerce product page is usually read-heavy.

```text
many users view products
fewer users update products
```

That means caching product details can help a lot.

A payment system is write-sensitive.

```text
each payment must be correct
duplicate payment is dangerous
```

That means consistency, idempotency, audit logs, and transactions are more important than aggressive caching.

## 3. Client-Server Architecture

Most web systems follow this model:

```text
browser/mobile app -> backend API -> database
```

Frontend responsibilities:

- show UI
- collect input
- validate basic input
- call APIs
- show loading/error/success states
- manage client-side state

Backend responsibilities:

- validate requests
- enforce business rules
- authenticate and authorize users
- read/write database
- call other services
- protect data
- log and monitor behavior

Important:

Frontend validation improves user experience, but backend validation protects the system.

## 4. API Design

APIs are contracts between frontend and backend.

Example REST API for orders:

```text
GET    /orders
GET    /orders/:id
POST   /orders
PATCH  /orders/:id/cancel
GET    /orders/:id/items
```

Good API design includes:

- clear resource names
- correct HTTP methods
- predictable response format
- useful status codes
- pagination for lists
- filtering and sorting
- validation errors
- authentication and authorization

Example response:

```json
{
  "id": "ord_123",
  "status": "placed",
  "total": 1200,
  "items": [
    {"productId": "p1", "quantity": 2}
  ]
}
```

Bad API design:

```text
POST /doEverything
```

This is hard to understand, test, secure, and maintain.

## 5. Database Design

Database design decides how data is stored and related.

Example entities for e-commerce:

```text
User
Product
Cart
Order
Payment
Shipment
```

Example relationships:

```text
one user has many orders
one order has many order items
one order has one payment
one product can appear in many order items
```

SQL is good when:

- relationships matter
- transactions matter
- data structure is stable
- reporting requires joins

NoSQL is good when:

- data is document-like
- flexible schema is useful
- very high scale key-based access is needed
- denormalized reads are preferred

Interview point:

Do not say "NoSQL is always faster". The better answer is: choose storage based on access patterns, consistency needs, and data relationships.

## 6. Caching

Caching stores frequently accessed data closer to the user or application.

Common cache locations:

- browser cache
- CDN cache
- application memory
- Redis
- database query cache

Example:

For product details:

```text
request product
check Redis cache
if found, return cached product
if not found, read database
store product in Redis for 5 minutes
return product
```

Caching helps when:

- data is read often
- data does not change every second
- database query is expensive
- low latency matters

Caching is risky when:

- data changes frequently
- stale data is dangerous
- cache invalidation is unclear

Example:

Caching product description is usually fine.

Caching bank account balance carelessly is dangerous.

## 7. Load Balancing

A load balancer distributes traffic across multiple servers.

```text
users -> load balancer -> app server 1
                       -> app server 2
                       -> app server 3
```

Benefits:

- handles more traffic
- improves availability
- allows rolling deployments
- removes unhealthy servers from traffic

Important:

If the app stores session data only in memory, users may have problems when requests go to different servers.

Better options:

- store sessions in Redis
- use stateless JWT carefully
- use sticky sessions only when needed

## 8. Horizontal And Vertical Scaling

Vertical scaling:

```text
make one server bigger
more CPU, more RAM
```

Horizontal scaling:

```text
add more servers
```

Vertical scaling is simple but has limits.

Horizontal scaling is more flexible but requires stateless servers, shared storage, load balancing, and better monitoring.

## 9. Message Queues

Queues allow slow or retryable work to run outside the user request.

```text
API receives request
API stores data
API publishes job
worker processes job later
```

Use queues for:

- sending emails
- image processing
- video processing
- notifications
- report generation
- payment webhook retries

Example:

When user places an order:

```text
create order now
return success response
send confirmation email in background
update analytics in background
```

The user should not wait for email sending.

## 10. Consistency

Consistency means users see correct and expected data.

Strong consistency:

- once data is written, everyone sees the latest value immediately
- useful for payments, inventory, account balance

Eventual consistency:

- data becomes consistent after some time
- useful for analytics, feeds, notifications, search indexes

Example:

When payment succeeds, order status should be strongly consistent.

When analytics dashboard updates after a few seconds, eventual consistency is acceptable.

## 11. Availability And Reliability

Availability means the system is reachable.

Reliability means the system behaves correctly over time.

Techniques:

- multiple app servers
- database replication
- backups
- health checks
- graceful shutdown
- retries with limits
- circuit breakers
- monitoring and alerts

Important:

Retries must be careful. Retrying payment charge without idempotency can charge the user twice.

## 12. Security

Security is part of system design, not an afterthought.

Think about:

- authentication
- authorization
- input validation
- rate limiting
- encryption in transit
- encryption at rest
- secure cookies
- CSRF protection
- XSS protection
- SQL injection prevention
- secrets management
- audit logs

Example:

Frontend can hide the "Delete user" button, but backend must still check whether the user has permission to delete.

## 13. Observability

Observability means understanding what the system is doing in production.

Use:

- logs
- metrics
- traces
- alerts
- dashboards
- health checks

Example:

For a slow checkout issue, you should know:

- API latency
- database latency
- payment service latency
- error rate
- request ID or correlation ID
- which deployment version is running

Without observability, production debugging becomes guessing.

## 14. Tradeoffs

Every design has tradeoffs.

Examples:

- SQL gives strong relationships but may need scaling work later.
- NoSQL gives flexible scale but may duplicate data.
- Cache improves speed but can return stale data.
- Microservices help team independence but add network and deployment complexity.
- CDN improves static asset speed but needs cache invalidation.

Senior answer:

Do not present one option as perfect. Explain why you chose it and what risk it creates.

## Basic System Design Template

Use this structure in interviews:

```text
1. Requirements
2. Scale assumptions
3. High-level architecture
4. Data model
5. API design
6. Request flow
7. Database choice
8. Cache strategy
9. Async jobs/queue
10. Security
11. Scaling
12. Monitoring
13. Tradeoffs
```
