# 29. Advanced Forms And Validation

Real production forms need more than `useState`.

They need validation, dynamic fields, async checks, server errors, accessibility, and pending states.

## Common Real Requirements

- required fields
- cross-field validation
- dynamic arrays
- async username/email checks
- server validation mapping
- disabled and pending states
- dirty/touched tracking
- accessible error messages

## Schema Validation

For complex forms, use schema validation.

Common libraries:

- Zod
- Yup
- Valibot

Example idea:

```tsx
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

Schema validation helps keep form rules consistent.

## Cross-Field Validation

Used when one field depends on another.

Examples:

- password and confirm password
- start date and end date
- min and max amount

```tsx
const mismatch = password !== confirmPassword;
```

Render error near the related field or as a form-level error.

## Dynamic Arrays

Examples:

- skills
- phone numbers
- invoice items
- passengers

Use stable IDs for rows.

Do not use array index as key when rows can be removed or reordered.

## Async Validation

Example:

- "username already taken"
- "email already exists"
- "coupon invalid"

Best practices:

- debounce requests
- cancel stale requests
- show pending state
- handle server errors

## Server Validation

Client validation improves UX, but server validation is required.

Server may return:

```json
{
  "fieldErrors": {
    "email": "Email already exists"
  }
}
```

Map server errors back to fields.

## React Hook Form

React Hook Form is popular because:

- fewer re-renders
- good validation support
- works well with uncontrolled inputs
- handles touched/dirty/errors
- supports schema resolvers

Use it for complex enterprise forms.

## Accessible Errors

Use:

- visible error text
- `aria-invalid`
- `aria-describedby`
- focus first invalid field or error summary

## Common Mistakes

- only client-side validation
- inaccessible errors
- no pending state
- losing user input after server error
- index keys in dynamic fields
- async validation race conditions
- giant form component with all logic inside

## Senior Best Practices

- validate on client and server
- use schema validation for complex forms
- show field-level and form-level errors
- keep errors accessible
- preserve user input after failed submit
- debounce async validation
- split large forms into sections/components
- model submit status explicitly

## Interview Questions

### Why use a form library?

To manage validation, touched state, errors, performance, dynamic fields, and complex submit behavior consistently.

### How do you handle server validation errors?

Map server field errors back to form fields and show accessible messages.

### Why are index keys bad in dynamic forms?

Removing/reordering rows can attach input state to the wrong row.

### How do you handle async validation?

Debounce, cancel stale requests, show pending state, and handle errors.

