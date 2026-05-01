# 04. Common Interview System Design Examples

This file contains common system design questions asked in interviews.

Each example explains requirements, high-level design, data model, APIs, scaling, and tradeoffs.

## 1. URL Shortener

Problem:

Design a system like Bitly where users can enter a long URL and get a short URL.

When someone visits the short URL, the system redirects to the original URL.

### Requirements

Functional:

- create short URL
- redirect short URL to long URL
- optional custom alias
- optional expiry date
- basic analytics such as click count

Non-functional:

- redirects should be very fast
- system is read-heavy
- short codes should be unique
- system should handle abuse/spam

### High-Level Design

```text
client
  |
  v
API server
  |
  +--> database
  +--> Redis cache
```

For redirect:

```text
browser opens /abc123
API checks Redis for abc123
if found, redirect to long URL
if not found, check database
store in Redis
redirect
```

### Data Model

```text
short_urls
  id
  short_code
  long_url
  user_id
  created_at
  expires_at
  click_count
```

### APIs

```text
POST /short-urls
GET /:shortCode
GET /short-urls/:id/analytics
```

### Short Code Generation

Options:

- random string
- base62 encoded database ID
- hash of URL with collision handling

Base62 is common because it creates compact strings using:

```text
a-z A-Z 0-9
```

### Scaling

This system is read-heavy because redirects happen more often than URL creation.

Use:

- Redis cache for short code lookup
- CDN or edge redirects for very high traffic
- database index on `short_code`
- rate limiting for creation API
- background job for analytics aggregation

### Tradeoffs

If click count is updated synchronously on every redirect, redirects become slower.

Better:

```text
redirect immediately
publish click event
analytics worker updates counters later
```

This gives faster redirects with eventually consistent analytics.

## 2. Chat Application

Problem:

Design a real-time chat app like WhatsApp or Slack basic messaging.

### Requirements

Functional:

- send message
- receive message in real time
- show chat history
- one-to-one chat
- group chat
- message delivery status

Non-functional:

- low latency
- messages should not be lost
- users may be online or offline
- system should scale to many active connections

### High-Level Design

```text
client
  |
  v
WebSocket gateway
  |
  +--> message service
  +--> database
  +--> Redis pub/sub
  +--> notification queue
```

### Flow

```text
1. User opens chat.
2. Client connects to WebSocket gateway.
3. User sends message.
4. Server validates sender and conversation.
5. Server stores message in database.
6. Server sends message to online recipients.
7. If recipient is offline, notification job is created.
```

### Data Model

```text
users
conversations
conversation_members
messages
message_status
```

### APIs

```text
GET /conversations
GET /conversations/:id/messages
POST /conversations/:id/messages
```

WebSocket events:

```text
message.send
message.received
message.read
user.typing
```

### Scaling

One WebSocket server is not enough for large traffic.

Use:

- multiple WebSocket servers
- load balancer
- Redis pub/sub to broadcast across servers
- database partitioning for huge message tables
- queue for push notifications

### Tradeoffs

WebSocket gives real-time experience but needs connection management.

HTTP polling is simpler but slower and more expensive at scale.

## 3. E-Commerce System

Problem:

Design an e-commerce system where users can browse products, add to cart, place orders, and pay.

### Requirements

Functional:

- browse products
- search products
- add to cart
- checkout
- payment
- order history
- admin product management

Non-functional:

- product browsing should be fast
- payment must be safe
- inventory must be accurate enough
- system should handle high sale traffic

### High-Level Design

```text
frontend
  |
  v
API gateway
  |
  +--> product service -> database/cache/search
  +--> cart service -> Redis/database
  +--> order service -> database
  +--> payment service -> payment provider
  +--> notification worker -> email/SMS
```

### Data Model

```text
users
products
inventory
carts
cart_items
orders
order_items
payments
shipments
```

### Important Flows

Product page:

```text
client requests product
API checks cache
API returns product details
reviews/recommendations can load separately
```

Checkout:

```text
validate cart
check inventory
calculate price on backend
create pending order
call payment provider with idempotency key
confirm order
publish order.confirmed event
send email asynchronously
```

### Scaling

Use:

- CDN for images and static frontend assets
- Redis cache for product details
- search engine for product search
- queue for emails and analytics
- database transactions for orders/payments
- rate limiting during flash sales

### Tradeoffs

Product pages can be cached aggressively.

Cart and checkout cannot be cached publicly because they are user-specific and sensitive.

Payment flow should prefer correctness over speed.

## 4. Notification System

Problem:

Design a system that sends email, SMS, and push notifications.

### Requirements

Functional:

- send notification
- support email, SMS, push
- retry failed notifications
- allow templates
- track delivery status

Non-functional:

- should not block main user request
- should handle provider failures
- should avoid duplicate notifications

### High-Level Design

```text
main service
  |
  v
notification queue
  |
  v
notification worker
  |
  +--> email provider
  +--> SMS provider
  +--> push provider
  |
  v
notification database
```

### Flow

```text
1. Order service publishes order.confirmed event.
2. Notification service creates notification job.
3. Worker picks job.
4. Worker renders template.
5. Worker sends through provider.
6. Worker stores delivery status.
7. Failed jobs retry with backoff.
8. Too many failures go to dead-letter queue.
```

### Data Model

```text
notification_templates
notifications
notification_attempts
user_notification_preferences
```

### Scaling

Use:

- queue workers
- retry with exponential backoff
- provider fallback
- rate limits per provider
- idempotency key to prevent duplicates

### Tradeoffs

Sending notifications synchronously is simple but slows down the main request.

Queue-based notification is better for reliability and user experience.

## 5. File Upload System

Problem:

Design a system where users upload files such as profile images, documents, or videos.

### Requirements

Functional:

- upload file
- download/view file
- validate file type and size
- show upload progress
- generate thumbnail for images/videos

Non-functional:

- large files should not overload API server
- storage should be durable
- private files should require authorization

### High-Level Design

```text
client
  |
  v
backend asks object storage for signed upload URL
  |
  v
client uploads directly to object storage
  |
  v
object storage event creates processing job
  |
  v
worker scans file and creates thumbnail
```

### Why Direct Upload Is Better

Bad for large files:

```text
client -> API server -> storage
```

API server becomes a bottleneck.

Better:

```text
client -> object storage
```

Backend only creates a signed URL and stores metadata.

### Data Model

```text
files
  id
  owner_id
  storage_key
  content_type
  size
  status
  created_at
```

### Security

Check:

- file size
- file type
- virus scan if needed
- authorization before download
- signed URLs with expiry
- private bucket for private files

### Tradeoffs

Direct upload is more scalable but more complex than simple API upload.

For small internal apps, API upload may be acceptable.

For public large-file systems, direct-to-object-storage is better.

## 6. News Feed

Problem:

Design a feed like social media home feed.

### Requirements

Functional:

- user can create post
- user can follow others
- user can see feed
- like/comment posts

Non-functional:

- feed should load fast
- system should support many reads
- celebrity users may have millions of followers

### High-Level Design

```text
post service
follow service
feed service
cache
queue workers
database
```

### Feed Generation Approaches

Pull model:

```text
when user opens feed
query posts from followed users
rank and return
```

Good:

- simpler writes
- good for users following few people

Bad:

- slow if user follows many people

Push model:

```text
when user creates post
push post into followers' feed cache
```

Good:

- feed reads are fast

Bad:

- expensive for celebrity users

Hybrid model:

```text
push normal users' posts
pull celebrity users' posts at read time
```

This is often the best interview answer.

### Tradeoffs

Feed systems are read-heavy.

Caching and precomputation help, but freshness and storage cost become tradeoffs.

## 7. Ride Booking System

Problem:

Design a basic Uber-like ride booking system.

### Requirements

Functional:

- rider requests ride
- find nearby drivers
- driver accepts ride
- track ride status
- show driver location
- payment after ride

Non-functional:

- location updates should be near real time
- matching should be fast
- payment must be reliable

### High-Level Design

```text
rider app
driver app
API gateway
location service
matching service
ride service
payment service
notification service
```

### Flow

```text
1. Drivers send location updates.
2. Location service stores recent driver locations.
3. Rider requests ride.
4. Matching service finds nearby available drivers.
5. Driver receives request.
6. Driver accepts.
7. Ride status changes to accepted.
8. Apps receive live updates.
9. Payment happens after ride completion.
```

### Data Model

```text
users
drivers
driver_locations
rides
ride_status_history
payments
```

### Scaling

Use:

- geospatial indexing for nearby drivers
- WebSocket or mobile push for live updates
- Redis for latest driver locations
- database for durable ride history
- queue for notifications

### Tradeoffs

Latest driver location can live in Redis because it changes frequently.

Ride history should live in durable database because it is business-critical.

## How To Practice

For every example, practice saying:

```text
Requirements
Scale assumptions
High-level architecture
Data model
APIs
Read/write flow
Cache strategy
Queue strategy
Failure handling
Security
Tradeoffs
```

Do not memorize diagrams only. Practice explaining why each component exists.
