# 19. Databases With Node.js

Most Node.js backend interviews include database questions.

Interviewers check whether you understand connection management, queries, transactions, and security.

## SQL vs NoSQL

SQL databases:

- PostgreSQL
- MySQL
- SQL Server

Good for:

- relational data
- transactions
- joins
- strong consistency

NoSQL databases:

- MongoDB
- DynamoDB
- Redis

Good for:

- document data
- flexible schema
- key-value access
- high-scale specific patterns

## Connection Pooling

Do not open a new database connection for every request.

Use a pool.

```js
const pool = new Pool({connectionString: process.env.DATABASE_URL});
```

Pools reuse connections and protect the database.

## Parameterized Queries

Use parameterized queries to avoid injection.

```js
await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
```

## Transactions

Use transactions when multiple database operations must succeed or fail together.

```text
BEGIN
insert order
insert order items
update inventory
COMMIT
```

If something fails, rollback.

## Repository Pattern

Repository hides database details.

```text
controller -> service -> repository -> database
```

This improves testability.

## Common Mistakes

- no connection pool
- raw query string interpolation
- missing indexes
- no transactions for multi-step writes
- leaking DB errors to clients
- loading too much data
- N+1 queries

## Senior Best Practices

- use connection pools
- parameterize queries
- use transactions where needed
- add indexes based on query patterns
- paginate large reads
- keep DB logic out of controllers
- monitor slow queries

## Interview Questions

### Why use connection pooling?

To reuse database connections and avoid overwhelming the database.

### What is SQL injection?

An attack where untrusted input changes the meaning of a SQL query.

### When use transactions?

When multiple writes must succeed or fail as one unit.

