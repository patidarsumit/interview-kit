# 20. MongoDB And Mongoose

MongoDB is a document database commonly used with Node.js.

Mongoose is an ODM that adds schemas, models, validation, and query helpers.

## Document Model

MongoDB stores documents.

```json
{
  "_id": "u1",
  "name": "Sumit",
  "roles": ["admin"]
}
```

Use embedded documents when data is usually read together.

Use references when data is large or shared independently.

## Schema

```js
const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
});
```

Mongoose schema validation is not a replacement for API validation.

## Indexes

Indexes speed up queries.

```js
userSchema.index({email: 1}, {unique: true});
```

Missing indexes cause slow production queries.

## lean

Use `.lean()` for read-only queries when you do not need Mongoose document methods.

```js
const users = await User.find().lean();
```

It is faster and uses less memory.

## Pagination

Avoid huge unbounded queries.

For large collections, cursor-based pagination is often better than large `skip`.

## Common Mistakes

- no indexes
- unbounded `find()`
- using `skip` with huge offsets
- overusing `populate`
- relying only on Mongoose validation
- storing unstructured documents without planning query patterns

## Senior Best Practices

- design schema around access patterns
- create indexes intentionally
- use `.lean()` for read-only lists
- paginate large collections
- avoid excessive `populate`
- validate API input before DB layer

## Interview Questions

### MongoDB embed vs reference?

Embed data read together. Reference data that is large, shared, or independently updated.

### Why use indexes?

To make queries faster based on fields used for filtering/sorting.

### What does `.lean()` do?

Returns plain objects instead of full Mongoose documents.

