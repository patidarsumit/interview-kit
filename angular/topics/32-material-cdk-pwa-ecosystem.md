# 32. Angular Material, CDK, PWA, And Ecosystem

Angular has a large official and community ecosystem.

## Angular Material

Angular Material provides ready-made UI components following Material Design.

Use it for:

- forms
- dialogs
- tables
- navigation
- date pickers
- menus

Senior point:

Material is useful, but a product still needs accessibility review, design consistency, and performance discipline.

## Angular CDK

CDK provides lower-level primitives.

Common CDK features:

- overlay
- portal
- drag and drop
- virtual scrolling
- accessibility utilities
- layout utilities

Use CDK when you want behavior without Material styling.

## Drag And Drop

Angular CDK drag and drop helps build:

- sortable lists
- Kanban boards
- reorderable controls

## Service Workers And PWA

Angular can support installable/offline applications.

Common PWA features:

- service worker
- asset caching
- update handling
- offline fallback
- manifest

Use PWA when:

- offline support matters
- repeat visits should be faster
- installable app experience is useful

## Web Workers

Use web workers for CPU-heavy work that would block the main thread.

Examples:

- large data processing
- parsing
- expensive calculations

## Tailwind With Angular

Angular v21 docs include Tailwind guidance.

Senior view:

Tailwind is a styling approach. It does not replace component architecture, accessibility, or design-system discipline.

## Senior Best Practices

- choose Material for speed and consistency
- choose CDK for custom design systems
- use virtual scroll for large lists
- use service workers only when caching strategy is clear
- use web workers for real CPU bottlenecks

Practical examples are available in:

- [CDK virtual scroll](../programs/59-cdk-virtual-scroll.ts)
- [Material table sort and pagination](../programs/61-material-table-sort-pagination.ts)
- [CDK drag and drop](../programs/62-cdk-drag-drop-list.ts)
- [CDK overlay popover](../programs/67-cdk-overlay-popover.ts)
- [accessible listbox](../programs/68-accessible-listbox.ts)

## Interview Questions

### Material vs CDK?

Material provides styled components. CDK provides behavior primitives.

### When use a web worker?

When CPU-heavy work blocks UI responsiveness.

### When use PWA?

When offline support, caching, or installability improves the product.
