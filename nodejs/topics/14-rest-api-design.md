# 14. REST API Design

REST API design is a common Node.js interview area.

Good APIs are predictable, validated, documented, and consistent.

## Resources

Use nouns for resources.

Good:

```text
GET /users
POST /users
GET /users/:id
PATCH /users/:id
DELETE /users/:id
```

Less ideal:

```text
POST /createUser
GET /getUsers
```

## HTTP Methods

- `GET`: read
- `POST`: create
- `PUT`: replace
- `PATCH`: partial update
- `DELETE`: delete

## Status Codes

- `200`: success
- `201`: created
- `204`: success with no body
- `400`: validation error
- `401`: unauthenticated
- `403`: unauthorized
- `404`: not found
- `409`: conflict
- `422`: semantic validation error
- `500`: server error

## Pagination

For lists, avoid returning everything.

```text
GET /users?page=1&pageSize=20
```

Or cursor-based:

```text
GET /users?cursor=abc&limit=20
```

Cursor pagination is better for large changing datasets.

## Filtering And Sorting

```text
GET /users?role=admin&sort=createdAt:desc
```

Validate allowed fields.

Do not pass raw sort fields directly to SQL.

## Validation

Validate:

- params
- query
- body
- headers when needed

Return useful but safe error messages.

## Idempotency

Idempotent means repeating the same request has the same effect.

`GET`, `PUT`, and `DELETE` should generally be idempotent.

For payment/order creation, use idempotency keys.

## Common Mistakes

- wrong status codes
- no pagination
- no validation
- inconsistent response shape
- exposing database errors
- using verbs in route names
- no idempotency for critical creates

## Senior Best Practices

- use resource-based routes
- validate all inputs
- paginate lists
- use consistent error format
- document API behavior
- protect sensitive fields
- design idempotency for critical operations

## Interview Questions

### PUT vs PATCH?

PUT replaces a resource. PATCH partially updates a resource.

### 401 vs 403?

401 means not authenticated. 403 means authenticated but not allowed.

### Why paginate APIs?

To avoid huge responses, slow queries, and memory pressure.

