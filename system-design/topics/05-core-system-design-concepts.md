# 05. Core System Design Concepts Deep Dive

This file explains important system design concepts that commonly appear in interviews.

The goal is not to memorize definitions. The goal is to understand where each concept fits in a real system.

Use this mental model:

```text
user -> network -> frontend -> API -> services -> database/cache/queue/storage
```

Every concept below helps one part of that flow become faster, safer, more scalable, or more reliable.

## 1. Client-Server Architecture

Client-server architecture means the client asks for something and the server responds.

Client can be:

- browser
- mobile app
- desktop app
- another backend service

Server can be:

- API server
- web server
- database server
- file server

Example:

```text
browser -> GET /products -> backend API -> database -> response
```

Why it matters:

The client should not directly access the database. The server protects business logic, validation, authorization, and data access.

Interview example:

For an e-commerce app, browser calls the backend API to create an order. The backend checks user, stock, price, payment, and then stores the order.

## 2. IP Address

An IP address identifies a machine on a network.

Example:

```text
142.250.193.14
```

Users do not normally type IP addresses. They type domain names like:

```text
google.com
```

Why it matters:

At system design level, IP addresses help you understand how traffic reaches servers, load balancers, and services.

Example:

```text
user browser -> DNS resolves domain -> load balancer IP -> app servers
```

## 3. DNS

DNS means Domain Name System.

It converts a domain name into an IP address.

Example:

```text
app.example.com -> 203.0.113.10
```

Flow:

```text
1. User enters app.example.com.
2. Browser asks DNS resolver for IP.
3. DNS returns IP address.
4. Browser connects to that IP.
```

Why it matters:

DNS is part of availability and performance.

If DNS is misconfigured, users cannot reach your system even if all servers are healthy.

Common production uses:

- point domain to load balancer
- route traffic to nearest region
- fail over to backup region
- configure CDN domain

## 4. TCP vs UDP

TCP is reliable and connection-oriented.

It makes sure data arrives in order.

Used by:

- HTTP
- HTTPS
- WebSockets
- database connections

UDP is faster but does not guarantee delivery or order.

Used by:

- video calls
- live streaming
- online games
- DNS

Example:

For bank transfer, use TCP-based HTTPS because correctness matters.

For live video call, UDP can be better because late packets are useless.

## 5. HTTP And HTTPS

HTTP is the protocol browsers use to talk to servers.

HTTPS is HTTP over TLS encryption.

Example request:

```text
GET /orders/123 HTTP/1.1
Host: api.example.com
Authorization: Bearer token
```

Example response:

```json
{
  "id": "123",
  "status": "confirmed"
}
```

Why HTTPS matters:

Without HTTPS, passwords, tokens, cookies, and personal data can be intercepted.

In interviews, always assume production systems use HTTPS.

## 6. REST APIs

REST APIs model data as resources.

Example:

```text
GET    /products
GET    /products/:id
POST   /products
PATCH  /products/:id
DELETE /products/:id
```

Good REST design:

- nouns in URLs
- HTTP methods for actions
- status codes for result
- pagination for lists
- validation errors with clear messages

Example:

```text
GET /orders?status=pending&page=2
```

REST is simple, widely understood, and good for most CRUD-style systems.

## 7. GraphQL

GraphQL lets clients ask for exactly the fields they need.

Example:

```graphql
query {
  user(id: "1") {
    id
    name
    orders {
      id
      total
    }
  }
}
```

Useful when:

- frontend needs flexible data shapes
- many clients need different fields
- REST would require many round trips

Risks:

- complex queries can overload backend
- caching can be harder than REST
- authorization must be handled carefully per field/resource

Interview answer:

Use GraphQL when clients need flexibility. Use REST when simple resource-based APIs are enough.

## 8. gRPC

gRPC is a high-performance RPC framework often used for service-to-service communication.

Instead of JSON over HTTP, it commonly uses Protocol Buffers.

Example:

```text
order-service -> gRPC -> payment-service
```

Use gRPC when:

- internal services need fast communication
- contracts should be strongly typed
- streaming is useful

REST is often easier for public APIs.

gRPC is often strong for internal microservice communication.

## 9. Load Balancer

A load balancer distributes traffic across multiple servers.

```text
users -> load balancer -> server 1
                       -> server 2
                       -> server 3
```

Benefits:

- handles more traffic
- removes unhealthy servers
- supports rolling deployments
- reduces single-server overload

Example:

If one Node.js API server can handle 1,000 requests per second and you need 5,000 requests per second, you can run multiple API servers behind a load balancer.

Important:

App servers should be stateless so any server can handle any request.

## 10. Reverse Proxy

A reverse proxy sits in front of backend servers.

```text
client -> reverse proxy -> backend service
```

Common jobs:

- route requests
- terminate SSL/TLS
- compress responses
- cache responses
- hide internal servers
- rate limit traffic

Examples:

- Nginx
- HAProxy
- Envoy

Difference:

A forward proxy represents the client. A reverse proxy represents the server side.

## 11. API Gateway

An API gateway is an entry point for many backend services.

```text
client -> API gateway -> user service
                    -> order service
                    -> payment service
```

Responsibilities:

- routing
- authentication
- rate limiting
- request logging
- response aggregation
- API versioning

Example:

Frontend calls:

```text
GET /api/orders/123
```

Gateway forwards to:

```text
order-service/internal/orders/123
```

Warning:

Do not put all business logic in the gateway. Domain services should own business rules.

## 12. CDN

CDN means Content Delivery Network.

It stores static content close to users.

Static content:

- images
- videos
- CSS
- JavaScript
- downloadable files

Flow:

```text
user in India -> nearest CDN edge -> image served quickly
```

Without CDN:

```text
user in India -> origin server in US -> slower response
```

CDN helps:

- reduce latency
- reduce load on origin server
- improve global performance
- absorb traffic spikes

Frontend system design point:

Use CDN for static assets and public cacheable content. Do not publicly cache private user data.

## 13. Caching

Caching stores frequently used data in a faster place.

Cache layers:

- browser cache
- CDN cache
- application memory
- Redis/Memcached
- database cache

Cache-aside pattern:

```text
1. API checks cache.
2. If data exists, return it.
3. If not, read database.
4. Store result in cache with TTL.
5. Return data.
```

Example:

```text
product:p100 -> Redis -> product details
```

Caching improves speed, but stale data is the main risk.

Good cache candidates:

- product details
- public configuration
- search suggestions
- category lists

Bad cache candidates:

- bank balance
- payment status without care
- rapidly changing inventory without a clear strategy

## 14. Database Index

An index helps the database find rows faster.

Without index:

```text
database scans entire table
```

With index:

```text
database jumps directly to matching rows
```

Example:

If this query is common:

```sql
SELECT * FROM orders WHERE user_id = 123 ORDER BY created_at DESC;
```

Useful index:

```sql
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at);
```

Tradeoff:

Indexes speed up reads but slow down writes because the database must update the index whenever data changes.

## 15. Database Replication

Replication copies data from one database server to another.

Common setup:

```text
primary database -> replica 1
                 -> replica 2
```

Primary handles writes.

Replicas can handle reads.

Benefits:

- improves read scalability
- improves availability
- provides backup/failover options

Risk:

Replicas may lag behind the primary.

Example:

User updates profile picture. Immediately reading from a replica may show the old picture for a few seconds.

## 16. Sharding / Partitioning

Sharding splits data across multiple databases or nodes.

Example:

```text
users with id 1-1000000 -> shard 1
users with id 1000001-2000000 -> shard 2
```

Better common strategy:

```text
hash(user_id) % number_of_shards
```

Why shard:

- single database is too large
- write traffic is too high
- storage limit is reached
- one machine cannot handle all data

Hard parts:

- choosing shard key
- rebalancing data
- cross-shard queries
- transactions across shards

Interview point:

Do not shard too early. First use indexes, query optimization, caching, read replicas, and archiving.

## 17. SQL vs NoSQL

SQL databases are relational.

Examples:

- PostgreSQL
- MySQL

Good for:

- transactions
- joins
- structured data
- strong consistency
- financial/order systems

NoSQL databases include document, key-value, column, and graph databases.

Examples:

- MongoDB
- DynamoDB
- Cassandra
- Redis

Good for:

- flexible schema
- high-scale key-value access
- document-style data
- distributed writes

Example:

Use PostgreSQL for orders and payments.

Use Redis for cache.

Use Elasticsearch/OpenSearch for search.

Use object storage for images/videos.

## 18. ACID

ACID describes safe database transactions.

Atomicity:

- all operations succeed or all fail

Consistency:

- database remains valid after transaction

Isolation:

- concurrent transactions do not corrupt each other

Durability:

- committed data survives crashes

Example:

Bank transfer:

```text
deduct from account A
add to account B
```

Both must happen, or neither should happen.

ACID is important for payments, orders, inventory, and financial systems.

## 19. BASE

BASE is common in highly available distributed systems.

Basically Available:

- system responds even during some failures

Soft state:

- data may change over time due to async replication

Eventual consistency:

- replicas become consistent later

Example:

Social media like count may not be exactly same everywhere immediately.

That is acceptable because availability and speed matter more than perfect immediate consistency.

## 20. CAP Theorem

CAP says a distributed system cannot perfectly guarantee all three at the same time:

- Consistency
- Availability
- Partition tolerance

Network partitions can happen, so distributed systems often choose between consistency and availability during failure.

CP system:

- prefers correct/latest data
- may reject or delay requests during network problems

AP system:

- keeps responding
- may return stale data temporarily

Example:

Payment system should prefer consistency.

Social feed can prefer availability and eventual consistency.

Interview point:

CAP matters when data is replicated across nodes and network failure is possible.

## 21. Consistency Models

Consistency model defines what users see after data changes.

Strong consistency:

- every read gets latest write

Eventual consistency:

- data becomes consistent after delay

Read-your-writes consistency:

- user sees their own update immediately

Example:

After changing profile name, user should see new name immediately. Other users may see it after a short delay.

Use consistency based on product needs.

Not every feature needs strong consistency.

## 22. Object / Blob Storage

Object storage stores large unstructured files.

Examples:

- images
- videos
- PDFs
- backups
- logs

Cloud examples:

- Amazon S3
- Google Cloud Storage
- Azure Blob Storage

Why not store large files directly in database?

- database becomes huge
- backups become slower
- file streaming is inefficient
- object storage is cheaper and more scalable

Common design:

```text
database stores file metadata
object storage stores actual file
```

Example metadata:

```text
file_id
owner_id
storage_key
content_type
size
created_at
```

## 23. WebSockets

WebSockets allow two-way real-time communication between client and server.

Normal HTTP:

```text
client asks -> server responds
```

WebSocket:

```text
client and server keep connection open
server can push data anytime
```

Use cases:

- chat
- live notifications
- stock prices
- multiplayer games
- live dashboards

Scaling issue:

WebSockets keep long-lived connections, so servers need connection management.

For multiple WebSocket servers, use Redis pub/sub or a message broker to broadcast messages across servers.

## 24. Long Polling And Server-Sent Events

Long polling:

```text
client asks server for updates
server waits until update exists or timeout
client immediately asks again
```

Server-Sent Events:

```text
server keeps one-way stream open to browser
server pushes updates to client
```

Use WebSockets for two-way real-time communication.

Use SSE for one-way server updates like notifications or live status.

Use long polling when WebSocket/SSE is not available or system is simple.

## 25. Webhooks

Webhook means one server calls another server when an event happens.

Example:

```text
Stripe payment succeeds
Stripe sends POST /webhooks/stripe to your backend
your backend updates payment status
```

Important webhook design:

- verify signature
- respond quickly
- process heavy work asynchronously
- store event ID to avoid duplicate processing
- retry safely

Example:

Payment provider may send same webhook multiple times.

Your system must be idempotent:

```text
if payment_event_id already processed, ignore duplicate
```

## 26. Message Queue

Message queues allow asynchronous communication.

```text
producer -> queue -> consumer
```

Examples:

- RabbitMQ
- Kafka
- AWS SQS
- BullMQ

Use for:

- sending emails
- video processing
- image resizing
- notifications
- payment webhook processing
- analytics events

Example:

Order API should not wait for email sending.

```text
create order
publish order.created
email worker sends email later
```

Benefits:

- decouples services
- supports retries
- handles traffic spikes
- improves response time

## 27. Rate Limiting

Rate limiting controls how many requests a user/IP/client can make.

Example:

```text
100 requests per minute per user
5 login attempts per minute per IP
```

Why:

- prevent abuse
- protect expensive APIs
- reduce brute-force attacks
- keep system stable

Common algorithms:

- fixed window
- sliding window
- token bucket
- leaky bucket

Example:

Login endpoint should have stricter rate limits than product listing endpoint.

Distributed rate limiting commonly uses Redis because many API servers need shared counters.

## 28. Consistent Hashing

Consistent hashing distributes keys across servers in a way that minimizes movement when servers are added or removed.

Without consistent hashing:

```text
hash(key) % number_of_servers
```

If number of servers changes, many keys move.

With consistent hashing:

Only some keys move.

Use cases:

- distributed cache
- sharded databases
- storage systems

Example:

If Redis cache has 4 nodes and you add a 5th node, consistent hashing avoids remapping almost every cache key.

## 29. Circuit Breaker, Timeout, Retry, And Idempotency

Distributed calls fail.

Example:

```text
order-service -> payment-service
```

If payment service is slow, order service should not wait forever.

Timeout:

- stop waiting after a limit

Retry:

- try again for temporary failure

Circuit breaker:

- stop calling a failing service for some time

Idempotency:

- same operation can be safely repeated

Payment example:

Retrying a charge request without idempotency can charge customer twice.

Better:

```text
POST /payments
Idempotency-Key: order_123_payment
```

If request is retried, payment provider returns same result instead of creating duplicate charge.

## 30. Observability

Observability means you can understand what your system is doing in production.

Three pillars:

- logs
- metrics
- traces

Logs:

```text
user 123 created order 456
```

Metrics:

```text
requests per second
error rate
latency p95
CPU usage
queue depth
```

Traces:

```text
frontend -> API gateway -> order service -> payment service -> database
```

Why it matters:

When production is slow, you need to know where.

Example:

Checkout is slow. Observability should show whether the delay is from:

- frontend bundle loading
- API server
- database query
- payment provider
- queue worker

## Bonus: Leader Election And Consensus

Some distributed systems need one node to act as leader.

Example:

Only one scheduler should run monthly billing.

If every server runs it, customers may be billed multiple times.

Leader election chooses one active leader.

Consensus means multiple nodes agree on a value even when failures happen.

Common algorithms:

- Raft
- Paxos

Most application developers do not implement these algorithms directly, but they should understand why systems like etcd, ZooKeeper, and Consul exist.

## Bonus: Bloom Filter

A Bloom filter is a memory-efficient way to check whether something might exist.

It can say:

- definitely not present
- maybe present

It cannot say with 100% certainty that something exists.

Example:

Before checking database for a username, use Bloom filter to quickly reject usernames that definitely do not exist.

Useful for:

- cache protection
- duplicate detection
- large-scale membership checks

Tradeoff:

Bloom filters can have false positives but not false negatives.

## How To Use These Concepts In Interviews

Do not randomly list concepts.

Connect each concept to the problem.

Example for URL shortener:

```text
This is read-heavy, so I will use cache for shortCode -> longUrl lookup.
I will add database index on short_code.
Redirect analytics can be asynchronous through a queue.
Rate limiting protects URL creation from abuse.
CDN or edge redirects can help if redirect traffic becomes global.
```

Example for chat app:

```text
I will use WebSockets for real-time messaging.
Messages are stored in durable database.
Redis pub/sub or a message broker can broadcast messages across WebSocket servers.
Offline notifications go through a queue.
Read receipts can be eventually consistent.
```

Example for file upload:

```text
Large files should go to object storage, not through the API server.
Backend creates signed upload URL.
Client uploads directly to storage.
Worker processes thumbnails and virus scan asynchronously.
Metadata is stored in database.
CDN serves public files.
```

## Quick Revision Table

| Concept | Main Use |
| --- | --- |
| DNS | Convert domain to IP |
| Load balancer | Distribute traffic |
| CDN | Serve static content near users |
| Cache | Speed up repeated reads |
| Index | Speed up database lookup |
| Replication | Improve read scale and availability |
| Sharding | Split large data across nodes |
| Queue | Async processing and retries |
| Rate limiting | Protect APIs from abuse |
| WebSocket | Real-time two-way communication |
| Webhook | Server-to-server event notification |
| CAP | Tradeoff during distributed failure |
| Consistent hashing | Stable key distribution |
| Circuit breaker | Stop calling unhealthy service |
| Observability | Debug production behavior |
