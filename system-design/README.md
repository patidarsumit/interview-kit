# System Design Interview Kit

This folder explains system design in a simple, practical way for both freshers and experienced engineers.

System design is about designing software systems that can handle real users, real data, failures, growth, security, and long-term maintenance.

It is not only about drawing boxes. A good system design answer explains:

- what the product must do
- who will use it
- how much traffic it may receive
- where data is stored
- how services communicate
- how the system handles failures
- how it scales
- how frontend and backend work together
- what tradeoffs were made

## Suggested Reading Order

1. [Basic Principles Of System Design](./topics/01-basic-principles.md)
2. [Backend System Design](./topics/02-backend-system-design.md)
3. [Frontend System Design](./topics/03-frontend-system-design.md)
4. [Common Interview System Design Examples](./topics/04-common-interview-examples.md)
5. [Core System Design Concepts Deep Dive](./topics/05-core-system-design-concepts.md)

## How To Answer A System Design Interview

Use this order:

```text
1. Clarify requirements.
2. Define users and traffic scale.
3. Identify core entities and data model.
4. Design APIs and frontend/backend flow.
5. Choose storage, cache, queue, and services.
6. Discuss scaling and performance.
7. Discuss security, reliability, and monitoring.
8. Explain tradeoffs.
```

Example:

If the interviewer asks "Design an URL shortener", do not immediately say "use Redis and database".

Start with:

```text
We need users to submit a long URL and get a short URL.
When someone opens the short URL, the system should redirect to the original URL.
We should clarify expected traffic, custom aliases, expiry, analytics, and abuse prevention.
```

That sounds like an engineer designing a real system, not just naming tools.

## Fresher vs Experienced Expectations

Freshers should be able to explain:

- client-server architecture
- APIs
- databases
- caching basics
- load balancer basics
- authentication basics
- simple request flow
- basic scalability ideas

Experienced engineers should also explain:

- tradeoffs between SQL and NoSQL
- cache invalidation
- message queues
- rate limiting
- consistency vs availability
- observability
- deployment strategy
- failure handling
- frontend performance
- browser caching
- API contract design

## Golden Rule

System design is not about using the most tools.

Good design is choosing the simplest architecture that satisfies the requirements and can grow safely.

## External Reference

- AlgoMaster Top 30 System Design Concepts: https://algomaster.io/learn/system-design/top-30-system-design-concepts
