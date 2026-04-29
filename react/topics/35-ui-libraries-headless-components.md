# 35. UI Libraries And Headless Components

React apps often use UI libraries to move faster and keep design consistent.

Choosing a UI library is an architecture decision, not only a styling decision.

## Styled Component Libraries

Examples:

- Material UI
- Ant Design
- Chakra UI
- Mantine

They provide ready-made styled components.

Good for:

- admin dashboards
- internal tools
- fast delivery
- consistent common UI

Tradeoffs:

- design may look generic
- customization can be hard
- bundle size matters
- business logic can get tied to library APIs

## Headless Libraries

Examples:

- Radix UI
- Headless UI
- React Aria

They provide behavior and accessibility without fixed styling.

Good for:

- custom design systems
- branded products
- teams with design tokens
- accessible complex widgets

## Common Interview Widgets

Companies ask:

- modal
- dropdown
- menu
- tabs
- table
- toast
- virtual list
- drag/drop
- autocomplete

They check:

- keyboard behavior
- ARIA
- state ownership
- focus management
- controlled/uncontrolled API

## Wrapping Third-Party Components

For large apps, wrap library components behind local UI components.

```tsx
export function AppButton(props: ButtonProps) {
  return <MuiButton {...props} />;
}
```

This makes future migration easier.

## Common Mistakes

- choosing a library without accessibility review
- importing huge components casually
- putting business logic inside UI wrappers
- mixing many design systems
- customizing library components until they become harder than custom code

## Senior Best Practices

- choose based on product and design-system needs
- check accessibility
- understand bundle impact
- wrap third-party UI behind local APIs when useful
- keep business logic outside UI primitives
- prefer headless libraries for custom branded systems

## Interview Questions

### Styled vs headless library?

Styled libraries provide visual components. Headless libraries provide behavior/accessibility while you control styling.

### Why wrap UI library components?

To keep app code stable if the library changes or is replaced.

### What must a modal handle?

Focus management, keyboard escape, accessible title, backdrop behavior, and close result.

