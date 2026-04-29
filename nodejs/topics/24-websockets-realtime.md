# 24. WebSockets And Real-Time Node.js

WebSockets allow full-duplex communication between client and server.

They are used for real-time features.

## Use Cases

- chat
- notifications
- live dashboards
- multiplayer features
- collaborative editing
- order status updates

## HTTP vs WebSocket

HTTP:

- request-response
- client asks, server responds

WebSocket:

- long-lived connection
- both sides can send messages anytime

## Connection Lifecycle

```text
client connects
server authenticates
client joins room
server sends events
heartbeat checks connection
client disconnects
cleanup
```

## Rooms

Rooms group clients.

Examples:

- user-specific room
- tenant room
- order room
- chat room

## Scaling WebSockets

One server only knows its own connected clients.

For multiple instances, use:

- Redis pub/sub
- message broker
- sticky sessions/load balancer support

## Heartbeats

Use ping/pong or heartbeat messages to detect dead connections.

## Common Mistakes

- no authentication
- no heartbeat
- memory leaks on disconnect
- assuming one server instance is enough
- no backpressure handling
- sending sensitive data to wrong room

## Senior Best Practices

- authenticate connections
- authorize room joins
- clean up on disconnect
- use heartbeat
- plan horizontal scaling
- use pub/sub for multi-instance broadcast
- rate limit noisy clients

## Interview Questions

### WebSocket vs HTTP?

HTTP is request-response. WebSocket is a persistent two-way connection.

### How do you scale WebSockets?

Use sticky sessions and a shared pub/sub or message broker across instances.

### Why heartbeat?

To detect dead connections and clean up resources.

