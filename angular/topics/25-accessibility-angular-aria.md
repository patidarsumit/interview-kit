# 25. Accessibility And Angular Aria

Accessibility is a senior Angular responsibility.

Angular does not automatically make custom UI accessible.

## Core Accessibility Rules

Use:

- semantic HTML
- real buttons for actions
- real links for navigation
- labels for inputs
- visible focus states
- keyboard support
- ARIA only when needed

## Dynamic ARIA Binding

```html
<button
  type="button"
  [attr.aria-expanded]="isOpen()"
  aria-controls="account-menu"
>
  Account
</button>
```

Use `attr.` for ARIA attributes.

## Focus Management

Common cases:

- route changes
- modals
- menus
- validation errors
- dynamic content

After a failed form submit, focus the first invalid field or error summary.

## Angular Aria In v21

Angular Aria is new in Angular v21.

It provides headless accessible directives for common WAI-ARIA patterns.

It helps with:

- keyboard interaction
- ARIA attributes
- focus management
- screen reader support

Patterns include:

- autocomplete
- listbox
- select
- multiselect
- combobox
- menu
- menubar
- toolbar
- content organization patterns

## Why Headless Matters

Headless means Angular Aria handles behavior and accessibility, while your app controls HTML structure, styling, and business logic.

This is useful for design systems because teams can keep brand-specific UI while reusing accessible interaction behavior.

## Senior Best Practices

- use native HTML first
- use Angular Aria/CDK for complex widgets
- test with keyboard
- test screen reader announcements for critical flows
- keep focus visible
- do not hide labels visually unless there is a screen-reader alternative
- bind `aria-invalid`, `aria-describedby`, and `aria-expanded` correctly

## Interview Questions

### Does Angular guarantee accessibility?

No. Angular gives tools, but developers must use semantic HTML and accessible patterns.

### What is Angular Aria?

A v21 package of headless accessible directives for common ARIA patterns.

### Why use `attr.aria-*`?

ARIA values are attributes, not normal DOM properties.

