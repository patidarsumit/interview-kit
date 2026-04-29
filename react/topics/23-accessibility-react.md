# 23. Accessibility In React

React does not automatically make UI accessible.

Accessibility means people can use the app with keyboards, screen readers, zoom, voice control, and other assistive technologies.

## Use Semantic HTML First

Good:

```tsx
<button type="button" onClick={save}>
  Save
</button>
```

Avoid:

```tsx
<div onClick={save}>Save</div>
```

A real button already supports keyboard, focus, and screen reader behavior.

## Labels For Inputs

```tsx
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

Or:

```tsx
<label>
  Email
  <input type="email" />
</label>
```

Every input needs an accessible name.

## Buttons vs Links

Use button for actions.

```tsx
<button type="button">Delete</button>
```

Use link for navigation.

```tsx
<a href="/users">Users</a>
```

Do not use links as buttons or buttons as links unless there is a strong reason.

## Dynamic ARIA

ARIA helps when native HTML is not enough.

```tsx
<button
  type="button"
  aria-expanded={open}
  aria-controls="account-menu"
>
  Account
</button>
```

Use ARIA carefully. Bad ARIA can make accessibility worse.

## Form Errors

Connect errors to fields.

```tsx
<input
  id="email"
  aria-invalid={Boolean(error)}
  aria-describedby={error ? 'email-error' : undefined}
/>
{error && (
  <p id="email-error" role="alert">
    {error}
  </p>
)}
```

## Focus Management

Important cases:

- modals
- menus
- route changes
- validation errors
- dynamic content

When a modal opens, focus should move into it.

When it closes, focus should return to the trigger.

## Keyboard Support

Interactive custom components must support keyboard.

Examples:

- dropdown
- menu
- tabs
- dialog
- combobox

If building these from scratch, follow WAI-ARIA patterns or use a headless accessible library.

## Headless Libraries

Good choices:

- Radix UI
- React Aria
- Headless UI

They provide accessible behavior while you control styling.

## Testing Accessibility

Use:

- keyboard testing
- screen reader checks for critical flows
- Testing Library accessible queries
- automated checks such as axe

Testing Library example:

```tsx
screen.getByRole('button', {name: /save/i});
```

If your test cannot find a button by role/name, users may also struggle.

## Common Mistakes

- clickable `div`
- missing labels
- removing focus outline
- inaccessible custom dropdown
- modal without focus management
- using ARIA where semantic HTML would work
- color-only error indicators

## Senior Best Practices

- use native elements first
- keep focus visible
- connect labels and errors
- test keyboard navigation
- use headless libraries for complex widgets
- prefer accessible queries in tests
- review critical flows with assistive technology

## Interview Questions

### Does React guarantee accessibility?

No. Developers must build accessible markup and interactions.

### Why use semantic HTML?

Native elements already include keyboard, focus, and screen reader behavior.

### When should you use ARIA?

When semantic HTML cannot express the needed state or relationship.

### How do you make form errors accessible?

Use visible text, `aria-invalid`, and `aria-describedby`.

