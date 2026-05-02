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

## 8. Video Streaming System

Problem:

Design a platform like YouTube or Netflix where users can upload, watch, search, and stream videos.

### Requirements

Functional:

- user can upload video
- user can watch video
- support different video qualities
- search videos
- like/comment videos
- show recommendations

Non-functional:

- playback should start quickly
- buffering should be low
- system should support very high read traffic
- uploaded videos must be processed asynchronously
- videos should be available globally

### High-Level Design

```text
client
  |
  v
API service
  |
  +--> metadata database
  +--> object storage
  +--> encoding queue
          |
          v
       transcoding workers
          |
          v
       processed video storage
          |
          v
         CDN
```

### Upload Flow

```text
1. User requests upload.
2. Backend creates signed upload URL.
3. Client uploads raw video to object storage.
4. Backend stores video metadata with status PROCESSING.
5. Encoding job is pushed to queue.
6. Worker transcodes video into multiple resolutions.
7. Worker stores processed files.
8. Video status becomes READY.
```

### Playback Flow

```text
1. User opens video page.
2. Client fetches video metadata.
3. Client receives playback manifest.
4. Video chunks are served from CDN.
5. Player adapts quality based on network speed.
```

### Important Concepts

Use object storage for raw and processed videos.

Use CDN because video traffic is huge and global.

Use adaptive bitrate streaming, such as HLS or DASH, so the player can switch quality depending on network speed.

Use queue workers because encoding is CPU-heavy and should not block upload request.

### Tradeoffs

Uploading video can be fast, but video availability may be delayed while processing finishes.

That is acceptable because encoding takes time.

## 9. Web Crawler

Problem:

Design a web crawler that visits web pages, extracts links/content, and builds data for search indexing.

### Requirements

Functional:

- crawl web pages
- extract links
- avoid duplicate URLs
- respect robots.txt
- store page content or metadata
- retry failed pages

Non-functional:

- scalable crawling
- polite crawling so websites are not overloaded
- duplicate detection
- fault tolerance

### High-Level Design

```text
URL frontier queue
  |
  v
crawler workers
  |
  +--> DNS/HTTP fetcher
  +--> robots.txt checker
  +--> HTML parser
  +--> deduplication service
  +--> content storage
  +--> indexer queue
```

### Flow

```text
1. Seed URLs are added to frontier.
2. Worker picks a URL.
3. Worker checks robots.txt and crawl delay.
4. Worker fetches page content.
5. Parser extracts links and metadata.
6. Deduplication filters already-seen URLs.
7. New URLs go back to frontier.
8. Content goes to indexing pipeline.
```

### Important Concepts

URL frontier is the queue of URLs waiting to be crawled.

Deduplication can use hashing or Bloom filters.

Crawler must be polite:

- limit requests per domain
- respect robots.txt
- retry with backoff
- avoid infinite crawling traps

### Tradeoffs

More crawler workers increase speed but can overload websites if rate limits are not enforced.

Good crawler design balances coverage, freshness, and politeness.

## 10. Music Streaming System

Problem:

Design a music streaming system like Spotify.

### Requirements

Functional:

- user can search songs
- user can play songs
- user can create playlists
- user can like songs
- system recommends music
- offline download may be supported

Non-functional:

- playback should start quickly
- audio should stream smoothly
- system should scale globally
- recommendations can update asynchronously

### High-Level Design

```text
client app
  |
  v
API gateway
  |
  +--> user service
  +--> catalog service
  +--> playlist service
  +--> recommendation service
  +--> streaming service
  +--> CDN/object storage
```

### Playback Flow

```text
1. User selects song.
2. Client requests playback metadata.
3. Backend checks subscription/rights.
4. Backend returns streaming URL or manifest.
5. Client streams audio chunks from CDN.
6. Playback events are sent for analytics/recommendations.
```

### Data Model

```text
users
songs
albums
artists
playlists
playlist_songs
listening_history
likes
```

### Important Concepts

Audio files should be stored in object storage and served through CDN.

Search may use Elasticsearch/OpenSearch.

Recommendations can be computed asynchronously from listening history.

Playback authorization matters because licensing/subscription rules decide whether a user can play a song.

### Tradeoffs

Recommendations do not need strong consistency.

Playback authorization and subscription checks should be correct.

## 11. File Sharing And Sync System

Problem:

Design a file sharing and sync system like Dropbox or Google Drive.

### Requirements

Functional:

- upload file
- download file
- share file/folder
- sync changes across devices
- support file versions
- search files by metadata/name

Non-functional:

- files must be durable
- large files should upload reliably
- private files must be secure
- sync should be efficient

### High-Level Design

```text
client
  |
  v
metadata API
  |
  +--> metadata database
  +--> object storage
  +--> sync notification service
  +--> processing queue
```

### Upload Flow

```text
1. Client asks backend for upload permission.
2. Backend creates file metadata record.
3. Backend returns signed upload URL.
4. Client uploads file directly to object storage.
5. Storage event notifies backend.
6. Backend marks file as uploaded.
7. Sync notification is sent to other devices.
```

### Sync Flow

```text
1. Device starts with last sync token.
2. Backend returns changes since that token.
3. Device downloads missing file metadata/content.
4. Device sends local changes to backend.
5. Conflicts are resolved using versioning rules.
```

### Important Concepts

Store file metadata in database.

Store file content in object storage.

Use chunked upload for large files.

Use versioning to recover old file versions.

Use WebSockets, push notifications, or polling for sync notifications.

### Tradeoffs

Real-time sync is convenient but harder to implement than manual refresh.

Conflict resolution is difficult when two devices edit the same file offline.

## 12. Food Delivery System

Problem:

Design a food delivery system like Swiggy, Zomato, DoorDash, or Uber Eats.

### Requirements

Functional:

- user can browse restaurants
- user can place order
- restaurant can accept/reject order
- delivery partner can be assigned
- user can track order
- payment and refunds

Non-functional:

- restaurant listing should be fast
- order status must be reliable
- live tracking should be near real time
- payment must be safe

### High-Level Design

```text
customer app
restaurant app
delivery app
  |
  v
API gateway
  |
  +--> restaurant service
  +--> menu service
  +--> order service
  +--> payment service
  +--> delivery assignment service
  +--> location service
  +--> notification service
```

### Order Flow

```text
1. User selects restaurant and items.
2. Backend validates menu items and price.
3. Payment is authorized or collected.
4. Order is created with PLACED status.
5. Restaurant accepts order.
6. Delivery partner is assigned.
7. User receives live status and location updates.
8. Order is delivered.
```

### Important Concepts

Use cache for restaurant/menu reads.

Use database transactions for order/payment state.

Use queue for notifications.

Use Redis/geospatial index for nearby delivery partners.

Use WebSocket or push notifications for live status updates.

### Tradeoffs

Menu browsing can be eventually consistent.

Payment/order state must be strongly controlled.

Live location can be stored temporarily in Redis, while completed delivery history belongs in durable database.

## 13. Movie Ticket Booking System

Problem:

Design a system like BookMyShow where users can search shows and book seats.

### Requirements

Functional:

- search movies/events
- view theaters and showtimes
- view seat layout
- select seats
- pay for booking
- receive ticket

Non-functional:

- no double booking
- seat hold should expire
- payment should be reliable
- system should handle high traffic for popular shows

### High-Level Design

```text
client
  |
  v
API gateway
  |
  +--> catalog service
  +--> show service
  +--> seat inventory service
  +--> booking service
  +--> payment service
  +--> notification service
```

### Seat Booking Flow

```text
1. User opens show seat map.
2. User selects seats.
3. Backend places temporary hold for selected seats.
4. Hold expires after a short time, such as 5 minutes.
5. User completes payment.
6. Booking is confirmed.
7. Ticket is generated.
8. Confirmation notification is sent.
```

### Data Model

```text
movies
theaters
screens
shows
seats
show_seats
bookings
payments
```

### Preventing Double Booking

Use:

- database transaction
- unique constraint on `show_id + seat_id`
- temporary seat hold with expiry
- optimistic or pessimistic locking

Example:

```text
unique(show_id, seat_id, confirmed_booking)
```

or maintain `show_seats` with status:

```text
AVAILABLE
HELD
BOOKED
```

### Tradeoffs

Holding seats improves UX but temporarily reduces availability.

Short hold time reduces blocked inventory but pressures users to finish checkout quickly.

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
