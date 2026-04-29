# 21. PostgreSQL And SQL

PostgreSQL is a common production database for Node.js APIs.

Interviews often test SQL basics, transactions, indexes, and injection prevention.

## Parameterized Query

```js
await pool.query('SELECT * FROM users WHERE email = $1', [email]);
```

Never build SQL using untrusted string interpolation.

## Transactions

```js
const client = await pool.connect();

try {
  await client.query('BEGIN');
  await client.query('INSERT INTO orders(user_id) VALUES($1)', [userId]);
  await client.query('COMMIT');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  client.release();
}
```

Always release client.

## Indexes

Indexes improve reads but add write overhead.

Add indexes based on real query patterns.

Examples:

- `email`
- `created_at`
- foreign keys
- frequently filtered fields

## Joins

SQL is strong for relational data.

```sql
SELECT orders.id, users.email
FROM orders
JOIN users ON users.id = orders.user_id;
```

## Pooling

Use a pool.

Do not create a new connection per request.

## Common Mistakes

- SQL injection
- no indexes
- missing transaction rollback
- not releasing client
- selecting too many columns
- no pagination
- N+1 queries

## Senior Best Practices

- use parameterized queries
- use transactions for multi-step writes
- release clients in finally
- add indexes based on query plans
- paginate lists
- monitor slow queries
- use migrations for schema changes

## Interview Questions

### Why parameterized queries?

They separate SQL structure from user input and prevent injection.

### Why release DB client?

To return it to the pool. Not releasing causes pool exhaustion.

### Index tradeoff?

Indexes speed reads but add storage and write overhead.

