# 22. Caching And Redis

Caching stores frequently used data closer to the app.

Redis is commonly used with Node.js for caching, sessions, rate limiting, and pub/sub.

## Cache-Aside Pattern

```text
read cache
if hit -> return
if miss -> read database
store in cache with TTL
return data
```

## TTL

TTL means time to live.

It prevents stale cache from living forever.

```js
await redis.set(`user:${id}`, JSON.stringify(user), {EX: 60});
```

## Cache Invalidation

Hardest part of caching.

Options:

- short TTL
- delete cache on write
- update cache on write
- versioned cache keys

## What To Cache

Good:

- expensive read queries
- public config
- product lists
- permissions
- computed reports

Avoid:

- highly sensitive data without care
- frequently changing data with strict consistency
- data that is cheap to fetch

## Redis For Rate Limiting

Redis can count requests across multiple app instances.

In-memory rate limits fail when you run many servers.

## Common Mistakes

- no TTL
- stale cache after writes
- caching errors
- caching user-specific data under shared key
- no cache key strategy
- treating cache as source of truth

## Senior Best Practices

- define cache key convention
- use TTL
- invalidate on writes
- monitor hit rate
- avoid caching sensitive data carelessly
- design for cache miss
- use Redis for distributed rate limiting

## Interview Questions

### What is cache-aside?

The app checks cache first, loads from database on miss, then stores result in cache.

### What is TTL?

Expiration time for cached data.

### Why is cache invalidation hard?

Because data can change in the database while stale data remains in cache.

