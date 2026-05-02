# 06. HLD And LLD Interview Guide

System design interviews can be high-level design, low-level design, or a mix of both.

Many candidates fail because they answer the wrong level.

If the interviewer asks for HLD, they want architecture and tradeoffs.

If the interviewer asks for LLD, they want classes, modules, APIs, data structures, and detailed behavior.

## HLD In Simple Words

HLD means High-Level Design.

It answers:

```text
What are the major parts of the system, and how do they work together?
```

HLD focuses on:

- major components
- services
- databases
- cache
- queues
- load balancers
- CDN
- API gateway
- scaling
- reliability
- security
- monitoring

Example:

For an e-commerce system, HLD talks about:

```text
frontend -> API gateway -> product service
                       -> cart service
                       -> order service
                       -> payment service
                       -> notification worker
```

It also explains PostgreSQL for orders, Redis for cache/cart, object storage for images, queue for email, and CDN for product images.

## LLD In Simple Words

LLD means Low-Level Design.

It answers:

```text
How will each module, class, interface, method, and data structure be designed?
```

LLD focuses on:

- classes
- interfaces
- modules
- design patterns
- method responsibilities
- database schema details
- sequence diagrams
- state diagrams
- validation rules
- concurrency control
- error handling
- extensibility

Example:

For a parking lot system, LLD talks about:

```text
ParkingLot
Floor
ParkingSpot
Vehicle
Ticket
Payment
Gate
```

It explains how a vehicle gets assigned a spot, how ticket price is calculated, and how payment changes ticket status.

## HLD vs LLD

| Area | HLD | LLD |
| --- | --- | --- |
| Main focus | Architecture | Implementation design |
| Scope | Whole system | Modules/classes |
| Talks about | services, databases, queues | classes, methods, interfaces |
| Example question | Design WhatsApp | Design parking lot |
| Output | architecture diagram | class diagram/sequence flow |
| Main skill | scalability and tradeoffs | clean object-oriented design |

## How To Identify What Interviewer Wants

HLD keywords:

- scalable
- high availability
- millions of users
- distributed system
- database choice
- cache
- queue
- API gateway
- CDN
- microservices

LLD keywords:

- classes
- objects
- design pattern
- UML
- extensible
- maintainable
- parking lot
- elevator
- chess
- logger
- rate limiter implementation

If unclear, ask:

```text
Should I focus on high-level architecture first, or should I go deeper into class design?
```

That is a good interview habit.

## HLD Answer Template

Use this structure:

```text
1. Clarify requirements.
2. Define scale assumptions.
3. Draw high-level components.
4. Design APIs.
5. Design data model.
6. Choose database/cache/queue/storage.
7. Explain important request flows.
8. Discuss scalability.
9. Discuss reliability and failures.
10. Discuss security.
11. Discuss observability.
12. Explain tradeoffs.
```

Example prompt:

```text
Design YouTube.
```

Good HLD opening:

```text
I will support video upload, video playback, search, user accounts, likes/comments, and recommendations.
For scale, video playback traffic will be much higher than upload traffic.
So I will separate upload processing from playback delivery.
Uploaded videos go to object storage, encoding runs asynchronously, metadata goes to database, and playback uses CDN with adaptive streaming.
```

This answer already shows product thinking and architecture thinking.

## LLD Answer Template

Use this structure:

```text
1. Clarify scope and rules.
2. Identify main entities.
3. Define relationships.
4. Define classes/interfaces.
5. Define important methods.
6. Explain data structures.
7. Walk through main flow.
8. Handle edge cases.
9. Explain extensibility.
10. Discuss concurrency and thread safety if needed.
```

Example prompt:

```text
Design a parking lot.
```

Good LLD opening:

```text
I will design a parking lot with multiple floors, multiple spot types, entry and exit gates, tickets, and payment.
The design should support different vehicle types and should be extensible for new pricing strategies.
```

## HLD Example: URL Shortener

Requirements:

- create short URL
- redirect short URL
- optional expiry
- click analytics
- high read traffic

Architecture:

```text
client
  |
  v
load balancer
  |
  v
URL API service
  |
  +--> Redis cache
  +--> database
  +--> analytics queue
          |
          v
       analytics worker
```

Request flow for create:

```text
1. User submits long URL.
2. API validates URL.
3. API generates short code.
4. API stores mapping in database.
5. API returns short URL.
```

Request flow for redirect:

```text
1. User opens short URL.
2. API checks Redis.
3. If cache hit, redirect.
4. If cache miss, read database.
5. Store mapping in Redis.
6. Redirect to long URL.
7. Publish click event to analytics queue.
```

Tradeoff:

Click analytics should be asynchronous because redirect speed is more important than immediate analytics accuracy.

## LLD Example: Rate Limiter

Requirement:

Limit each user to 100 requests per minute.

Important classes:

```text
RateLimiter
RateLimitRule
RequestContext
TokenBucket
Clock
RateLimitStore
```

Interface:

```ts
interface RateLimiter {
  allow(request: RequestContext): boolean;
}

interface RateLimitStore {
  get(key: string): TokenBucketState | null;
  set(key: string, state: TokenBucketState, ttlSeconds: number): void;
}
```

Token bucket idea:

```text
bucket has capacity 100
tokens refill over time
each request consumes 1 token
if no token, reject request
```

Flow:

```text
1. Build key from user ID or IP.
2. Load bucket state from store.
3. Refill tokens based on elapsed time.
4. If token exists, consume one and allow.
5. If no token, reject.
6. Save updated state.
```

For one server, in-memory store may work.

For many servers, use Redis so all servers share the same counters.

## LLD Example: Login Sequence

Sequence:

```text
User -> LoginController -> AuthService -> UserRepository -> Database
```

Flow:

```text
1. User submits email and password.
2. LoginController validates basic input.
3. AuthService loads user by email.
4. AuthService compares password hash.
5. AuthService checks account status and MFA requirement.
6. AuthService creates session/token.
7. Controller returns login response.
```

Important details:

- never store plain passwords
- use bcrypt or Argon2
- rate limit login attempts
- audit failed login attempts
- return generic error message for bad credentials
- support MFA for sensitive systems

## LLD Example: Order State Machine

State machines are useful when an entity has controlled state transitions.

Order states:

```text
CREATED
PAYMENT_PENDING
PAID
PACKED
SHIPPED
DELIVERED
CANCELLED
REFUNDED
```

Allowed transitions:

```text
CREATED -> PAYMENT_PENDING
PAYMENT_PENDING -> PAID
PAYMENT_PENDING -> CANCELLED
PAID -> PACKED
PACKED -> SHIPPED
SHIPPED -> DELIVERED
PAID -> REFUNDED
```

Bad transition:

```text
DELIVERED -> PAYMENT_PENDING
```

Why state machine helps:

- prevents invalid transitions
- makes business rules explicit
- helps testing
- helps audit/debugging

## Important HLD Topics

### Monolith vs Microservices

Start with monolith when:

- team is small
- product is early
- deployment independence is not required
- domain boundaries are unclear

Use microservices when:

- teams own separate domains
- independent scaling is required
- independent deployment is valuable
- system complexity justifies distributed architecture

Tradeoff:

Microservices add network failure, tracing complexity, data consistency problems, and deployment overhead.

### SQL vs NoSQL

Use SQL when:

- transactions matter
- relationships matter
- data integrity matters
- queries need joins

Use NoSQL when:

- schema changes frequently
- access is mostly key-based
- horizontal scale is more important
- eventual consistency is acceptable

Example:

Orders and payments usually fit SQL.

User activity feed may fit NoSQL or a specialized feed store.

### High Availability

High availability means system keeps serving users even when some parts fail.

Techniques:

- multiple app servers
- load balancer
- health checks
- database replica/failover
- multi-zone deployment
- backups
- disaster recovery plan

Example:

If one API server crashes, load balancer should stop sending traffic to it.

### Fault Tolerance

Fault tolerance means the system continues in a degraded but usable state.

Example:

If recommendation service fails, e-commerce site can still show product page without recommendations.

This is better than failing the whole page.

### Disaster Recovery

Disaster recovery answers:

```text
What happens if a region, database, or storage system is lost?
```

Important terms:

- RPO: how much data loss is acceptable
- RTO: how much downtime is acceptable

Example:

Banking system may need very low RPO and RTO.

Internal analytics dashboard can tolerate more delay.

### Event-Driven Architecture

Event-driven architecture uses events to decouple services.

```text
order-service publishes order.created
inventory-service consumes it
notification-service consumes it
analytics-service consumes it
```

Benefits:

- decoupled services
- async processing
- easier retries
- better scalability

Risks:

- eventual consistency
- duplicate messages
- harder debugging
- need idempotent consumers

## Important LLD Topics

### UML Diagrams

Common UML diagrams:

- class diagram
- sequence diagram
- activity diagram
- state diagram
- use case diagram

In interviews, sequence diagrams and class diagrams are most common.

### Object-Oriented Design

Good LLD uses:

- encapsulation
- abstraction
- inheritance only when useful
- composition over inheritance
- interface-based design
- single responsibility
- open/closed principle

Example:

Payment system should depend on a `PaymentProvider` interface.

```ts
interface PaymentProvider {
  charge(request: ChargeRequest): Promise<ChargeResult>;
}
```

Then Stripe, Razorpay, or PayPal can be different implementations.

### Schema Design

Good schema design includes:

- primary keys
- foreign keys
- unique constraints
- indexes
- correct data types
- audit columns
- soft delete if required

Example:

For booking seats:

```text
booking_id
show_id
seat_id
user_id
status
created_at
```

Add unique constraint:

```text
unique(show_id, seat_id)
```

This prevents double booking.

### Concurrency Control

Concurrency problems happen when multiple users modify the same data.

Example:

Two users try to book the same seat.

Solutions:

- database transaction
- row lock
- optimistic locking
- unique constraint
- short seat hold with expiry

Interview point:

Concurrency must be solved at the backend/database level, not only in frontend UI.

### Versioning And Backward Compatibility

Systems evolve.

Good practices:

- version APIs
- add fields before removing old fields
- avoid breaking old clients suddenly
- use database migrations carefully
- use feature flags
- support rollback

Example:

Instead of deleting `fullName` immediately, add `firstName` and `lastName`, migrate clients, then remove old field later.

## Common HLD Interview Questions

- Design URL shortener
- Design WhatsApp/chat system
- Design Instagram feed
- Design YouTube/Netflix
- Design Uber/ride booking
- Design web crawler
- Design Amazon/e-commerce
- Design food delivery
- Design Spotify/music streaming
- Design Dropbox/file sharing
- Design notification system
- Design rate limiter
- Design search autocomplete
- Design BookMyShow/ticket booking

## Common LLD Interview Questions

- Design parking lot
- Design elevator system
- Design library management system
- Design chess game
- Design snake and ladder
- Design splitwise
- Design logging framework
- Design rate limiter
- Design vending machine
- Design ATM
- Design hotel booking
- Design movie ticket booking
- Design notification service
- Design cache
- Design file system

## Final Interview Advice

For HLD:

```text
Think components, data flow, scaling, reliability, tradeoffs.
```

For LLD:

```text
Think classes, interfaces, methods, state, concurrency, extensibility.
```

Strong candidates can move between both levels.

They first explain the big picture, then zoom into the most important component when asked.
