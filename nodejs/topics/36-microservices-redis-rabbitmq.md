# 36. Microservices, Redis, And RabbitMQ

Node.js is commonly used for microservices because it is lightweight, fast for I/O-heavy APIs, and easy to deploy as small services.

Redis and RabbitMQ are common supporting tools:

- Redis is usually used for cache, sessions, locks, rate limiting, and pub/sub.
- RabbitMQ is usually used for reliable message queues and asynchronous service communication.

## Microservices In Simple Words

A microservice is a small backend service responsible for one business capability.

Examples:

- user service
- order service
- payment service
- notification service
- inventory service

Each service should own its logic and usually its own database tables or database.

## Monolith vs Microservices

Monolith:

- one deployable application
- easier to develop at the beginning
- easier transactions
- simpler debugging
- can become hard to scale when the team or domain grows

Microservices:

- many small deployable services
- each service can scale independently
- teams can own services independently
- harder debugging because calls go over the network
- harder data consistency because transactions are distributed

Senior rule:

Start with a modular monolith unless there is a real scaling, ownership, deployment, or domain-boundary reason for microservices.

## Common Microservice Communication

Services usually talk to each other in two ways:

- synchronous communication: one service calls another and waits for a response
- asynchronous communication: one service sends a message and another service processes it later

In real systems, both are used.

Example:

```text
frontend -> api-gateway -> order-service
order-service -> HTTP -> user-service
order-service -> HTTP -> payment-service
order-service -> RabbitMQ -> notification-service
order-service -> RabbitMQ -> inventory-service
```

### Synchronous HTTP

Service A directly calls Service B.

```text
order-service -> HTTP -> payment-service
```

Good for:

- immediate request-response needs
- queries
- simple internal APIs

Risks:

- service B is down
- network timeout
- cascading failures
- high latency

Use:

- timeouts
- retries with limits
- circuit breakers
- correlation IDs
- clear error responses

## How Services Talk Using HTTP

One service exposes an internal API. Another service calls it with `fetch`, `axios`, `undici`, or another HTTP client.

Example service URLs:

```text
USER_SERVICE_URL=http://user-service:3001
PAYMENT_SERVICE_URL=http://payment-service:3002
```

In Docker Compose or Kubernetes, `user-service` can be a service name resolved by internal DNS.

Order service calling user service:

```js
async function getUser(userId, correlationId) {
  const response = await fetch(`${process.env.USER_SERVICE_URL}/internal/users/${userId}`, {
    method: 'GET',
    headers: {
      'x-correlation-id': correlationId,
      'x-internal-token': process.env.INTERNAL_SERVICE_TOKEN
    },
    signal: AbortSignal.timeout(2000)
  });

  if (!response.ok) {
    throw new Error(`User service failed with ${response.status}`);
  }

  return response.json();
}
```

Order service route:

```js
app.post('/orders', async (req, res, next) => {
  try {
    const correlationId = req.headers['x-correlation-id'] || crypto.randomUUID();

    const user = await getUser(req.body.userId, correlationId);

    const order = await orderService.createOrder({
      userId: user.id,
      items: req.body.items
    });

    res.status(201).json({order});
  } catch (error) {
    next(error);
  }
});
```

User service internal endpoint:

```js
app.get('/internal/users/:id', requireInternalToken, async (req, res) => {
  const user = await userRepository.findById(req.params.id);

  if (!user) {
    return res.status(404).json({message: 'User not found'});
  }

  res.json({
    id: user.id,
    email: user.email,
    status: user.status
  });
});
```

Internal token middleware:

```js
function requireInternalToken(req, res, next) {
  if (req.headers['x-internal-token'] !== process.env.INTERNAL_SERVICE_TOKEN) {
    return res.status(401).json({message: 'Unauthorized service call'});
  }

  next();
}
```

Important:

- Never call another service without a timeout.
- Do not retry every failure blindly.
- Pass correlation ID across every service call.
- Keep internal APIs small and stable.
- Protect internal APIs with network rules, mTLS, signed tokens, or service tokens.

## Service Discovery

Service discovery means how one service finds another service.

Local development:

```text
http://localhost:3001
http://localhost:3002
```

Docker Compose:

```text
http://user-service:3001
http://payment-service:3002
```

Kubernetes:

```text
http://user-service.default.svc.cluster.local
```

Cloud platforms may provide service discovery through load balancers, DNS, or a service mesh.

In Node.js code, keep service URLs in environment variables.

```js
const userServiceUrl = process.env.USER_SERVICE_URL;
```

Do not hardcode production service URLs in source code.

## API Gateway Pattern

An API gateway is the public entry point.

```text
client -> api-gateway -> user-service
                    -> order-service
                    -> payment-service
```

Gateway responsibilities:

- routing requests to services
- authentication
- rate limiting
- request logging
- response shaping
- sometimes aggregation

Avoid putting all business logic in the gateway. Business rules should live in domain services.

### Asynchronous Messaging

Service A publishes a message. Service B processes it later.

```text
order-service -> queue -> notification-service
```

Good for:

- emails
- notifications
- invoice generation
- retries
- payment webhooks
- long-running tasks

Benefits:

- faster API responses
- services are less tightly coupled
- retry handling is easier
- traffic spikes can be buffered

## How Services Talk Using RabbitMQ

RabbitMQ is used when the caller does not need an immediate response from the receiver.

Example:

```text
order-service publishes order.created
inventory-service consumes order.created
notification-service consumes order.created
analytics-service consumes order.created
```

Order service publishes a message:

```js
import amqplib from 'amqplib';

const connection = await amqplib.connect(process.env.RABBITMQ_URL);
const channel = await connection.createChannel();

const exchangeName = 'orders';
const routingKey = 'order.created';

await channel.assertExchange(exchangeName, 'topic', {durable: true});

function publishOrderCreated(order, correlationId) {
  const event = {
    eventId: crypto.randomUUID(),
    eventType: 'order.created',
    occurredAt: new Date().toISOString(),
    data: {
      orderId: order.id,
      userId: order.userId,
      totalAmount: order.totalAmount
    }
  };

  channel.publish(
    exchangeName,
    routingKey,
    Buffer.from(JSON.stringify(event)),
    {
      persistent: true,
      contentType: 'application/json',
      correlationId
    }
  );
}
```

Notification service consumes the message:

```js
import amqplib from 'amqplib';

const connection = await amqplib.connect(process.env.RABBITMQ_URL);
const channel = await connection.createChannel();

const exchangeName = 'orders';
const queueName = 'notification-service.order-created';
const routingKey = 'order.created';

await channel.assertExchange(exchangeName, 'topic', {durable: true});
await channel.assertQueue(queueName, {durable: true});
await channel.bindQueue(queueName, exchangeName, routingKey);
await channel.prefetch(10);

channel.consume(queueName, async (message) => {
  if (!message) {
    return;
  }

  try {
    const event = JSON.parse(message.content.toString());

    await notificationService.sendOrderCreatedEmail(event.data);

    channel.ack(message);
  } catch (error) {
    console.error('Failed to process message', error);

    channel.nack(message, false, false);
  }
});
```

Key points:

- `assertExchange` creates or verifies an exchange.
- `assertQueue` creates or verifies a queue.
- `bindQueue` connects queue to exchange using routing key.
- `persistent: true` asks RabbitMQ to persist the message.
- `ack` confirms successful processing.
- `nack` rejects failed processing.
- `prefetch` limits how many unacknowledged messages one worker receives.

## Request-Response vs Event-Driven Flow

Use HTTP when the user is waiting for the result.

Example:

```text
checkout request
order-service calls payment-service
payment must succeed or fail now
return response to user
```

Use events when work can happen later.

Example:

```text
order created
publish order.created
send email later
reduce inventory later
update analytics later
```

Interview answer:

Use synchronous HTTP for immediate decisions. Use RabbitMQ events for follow-up work, retries, and decoupling.

## Full Example: Order Creation Flow

Step-by-step:

```text
1. Client calls POST /orders.
2. API gateway forwards request to order-service.
3. Order service validates input.
4. Order service calls user-service over HTTP to confirm user exists.
5. Order service creates order in its database.
6. Order service publishes order.created to RabbitMQ.
7. Inventory service consumes order.created and reserves stock.
8. Notification service consumes order.created and sends email.
9. Analytics service consumes order.created and updates reporting.
```

Important design:

- Order creation should not wait for email.
- Email failure should not rollback the order.
- Inventory reservation should be idempotent.
- Every log should contain the same correlation ID.

## Correlation ID Across Services

A correlation ID connects logs across services.

```text
api-gateway log: request started correlationId=abc123
order-service log: order created correlationId=abc123
RabbitMQ message: correlationId=abc123
notification-service log: email sent correlationId=abc123
```

Express middleware:

```js
function correlationIdMiddleware(req, res, next) {
  req.correlationId = req.headers['x-correlation-id'] || crypto.randomUUID();
  res.setHeader('x-correlation-id', req.correlationId);
  next();
}
```

When calling another service:

```js
await fetch(url, {
  headers: {
    'x-correlation-id': req.correlationId
  }
});
```

When publishing RabbitMQ event:

```js
channel.publish(exchangeName, routingKey, messageBuffer, {
  correlationId: req.correlationId,
  persistent: true
});
```

## Handling Failure Between Services

Microservice calls fail more often than local function calls.

Common failures:

- service is down
- request timeout
- bad deployment
- network issue
- queue is full
- consumer is failing
- duplicate event is delivered

Basic protections:

- timeout every HTTP call
- retry only safe operations
- use exponential backoff
- use circuit breaker for repeated failures
- use dead-letter queues for poison messages
- make consumers idempotent
- add alerts for queue depth and failure rate

Example timeout:

```js
const response = await fetch(url, {
  signal: AbortSignal.timeout(2000)
});
```

Simple retry wrapper:

```js
async function retry(operation, maxAttempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, attempt * 200));
    }
  }

  throw lastError;
}
```

Use retries carefully:

- Good: retry temporary network errors.
- Bad: retry payment charge request without idempotency key.

## Redis In Microservices

Redis is an in-memory data store.

Common uses:

- cache frequently read data
- store sessions
- distributed rate limiting
- distributed locks
- pub/sub messages
- temporary tokens
- job queue backend for tools like BullMQ

## Redis Cache Example

Cache-aside flow:

```text
request user
check Redis
if found, return cached user
if not found, read database
store result in Redis with TTL
return user
```

Node.js example:

```js
async function getUserById(id) {
  const cacheKey = `user:${id}`;

  const cachedUser = await redis.get(cacheKey);

  if (cachedUser) {
    return JSON.parse(cachedUser);
  }

  const user = await userRepository.findById(id);

  if (!user) {
    return null;
  }

  await redis.set(cacheKey, JSON.stringify(user), {EX: 60});

  return user;
}
```

Important Redis points:

- Always use TTL for cached data.
- Do not cache user-specific data under a shared key.
- Delete or update cache when database data changes.
- Treat Redis as a performance layer, not the main source of truth, unless the system is designed that way.

## Redis Pub/Sub

Redis pub/sub lets services publish and receive messages.

```text
service A publishes "user.updated"
service B receives "user.updated"
```

Use Redis pub/sub for simple real-time notifications or internal events.

Avoid Redis pub/sub when messages must be durable. If a subscriber is offline, it can miss messages.

For durable messaging, use RabbitMQ, SQS, or Kafka.

## RabbitMQ In Simple Words

RabbitMQ is a message broker.

It accepts messages from producers and delivers them to consumers.

```text
producer -> exchange -> queue -> consumer
```

Producer:

- sends messages

Exchange:

- receives messages from producers
- routes messages to queues

Queue:

- stores messages until a consumer processes them

Consumer:

- reads messages and performs work

## RabbitMQ vs Redis

Use Redis when you need:

- cache
- fast key-value storage
- session storage
- rate limiting
- simple pub/sub
- distributed locks

Use RabbitMQ when you need:

- durable queues
- reliable message delivery
- acknowledgements
- retries
- dead-letter queues
- routing by exchange and routing key

Simple rule:

Redis is mainly a fast data store. RabbitMQ is mainly a reliable message broker.

## RabbitMQ Message Flow

Example order flow:

```text
order-service creates order
order-service publishes order.created
payment-service consumes order.created
notification-service consumes order.created
inventory-service consumes order.created
```

The API does not need to wait for all downstream work.

## Acknowledgement

RabbitMQ consumers should acknowledge a message only after successful processing.

```text
receive message
process message
if success -> ack
if failed -> retry or reject
```

If a worker crashes before acknowledgement, RabbitMQ can redeliver the message.

## Retry And Dead-Letter Queue

Failures happen.

Use:

- retry count
- retry delay
- exponential backoff
- dead-letter queue

Dead-letter queue means failed messages are moved to a separate queue after too many failures.

This helps teams inspect bad messages without blocking the main queue forever.

## Idempotency In Consumers

Queue messages may be delivered more than once.

Consumers must be idempotent.

Example:

If `payment.completed` is received twice, do not mark the same order paid twice or send two invoices.

Common techniques:

- store processed message IDs
- use idempotency keys
- use unique database constraints
- check current state before updating

## Microservices Data Consistency

In a monolith, one database transaction can update many tables.

In microservices, each service may own its own database.

This means distributed transactions are hard.

Common patterns:

- eventual consistency
- outbox pattern
- saga pattern
- compensating actions

Example:

```text
order created
payment requested
payment failed
order cancelled
inventory released
```

The system becomes consistent through events and follow-up actions.

## Outbox Pattern

Problem:

The service saves data to the database but fails before publishing the event.

Outbox solution:

```text
save business data and event in same database transaction
background worker reads outbox table
worker publishes event to RabbitMQ
worker marks event as published
```

This prevents missing events after database writes.

## Observability In Microservices

Microservices need strong observability.

Use:

- structured logs
- correlation IDs
- distributed tracing
- metrics
- health checks
- queue depth alerts
- retry and dead-letter alerts

Without observability, microservices become hard to debug.

## Common Mistakes

- creating microservices too early
- sharing one database across many services without ownership
- no timeout on service-to-service HTTP calls
- retrying without limits
- no idempotency in message consumers
- using Redis pub/sub for durable business events
- no dead-letter queue
- no correlation ID across services
- no plan for eventual consistency
- putting too much business logic in message handlers without tests

## Senior Best Practices

- keep service boundaries aligned with business domains
- prefer async messaging for slow or retryable workflows
- use Redis for cache, locks, sessions, and rate limits
- use RabbitMQ for reliable queues and business events
- make consumers idempotent
- add retries, backoff, and dead-letter queues
- use correlation IDs across every service call and message
- document event names and payload schemas
- monitor queue depth, error rate, latency, and dead-letter messages

## Interview Questions

### What is a microservice?

A small independently deployable service focused on one business capability.

### When should you use microservices?

When independent scaling, deployment, ownership, or clear domain boundaries justify the added complexity.

### What is Redis used for in Node.js?

Caching, sessions, rate limiting, locks, pub/sub, and temporary fast key-value storage.

### What is RabbitMQ used for?

Reliable asynchronous messaging between services and workers.

### Redis pub/sub vs RabbitMQ?

Redis pub/sub is simple but not durable for offline consumers. RabbitMQ supports durable queues, acknowledgements, retries, and dead-letter queues.

### Why is idempotency important in queues?

Messages can be retried or delivered more than once, so processing the same message twice must not corrupt data.

### What is the outbox pattern?

A pattern where a service saves business data and an event record in the same database transaction, then a worker publishes the event later.
