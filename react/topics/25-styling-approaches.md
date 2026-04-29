# 25. Styling Approaches

React does not force one styling method.

The right styling approach depends on team size, design system, performance, product type, and framework.

## Plain CSS

Simple CSS files are fine for small apps.

```css
.button {
  padding: 8px 12px;
}
```

Risk:

- global class conflicts
- hard to maintain in large apps

## CSS Modules

CSS Modules scope class names to a component file.

```tsx
import styles from './button.module.css';

export function Button() {
  return <button className={styles.button}>Save</button>;
}
```

Good for:

- scoped styles
- simple projects
- teams that prefer CSS files

## Tailwind CSS

Tailwind uses utility classes.

```tsx
<button className="rounded bg-blue-600 px-3 py-2 text-white">
  Save
</button>
```

Good for:

- fast UI building
- design constraints
- avoiding custom CSS sprawl

Risk:

- long class strings
- inconsistent UI if tokens are not controlled

## CSS-in-JS

CSS-in-JS can support dynamic styles and component-scoped styling.

Tradeoffs:

- runtime cost depending on library
- SSR setup considerations
- design-system integration

## Component Libraries

Libraries like Material UI or Chakra provide styled components.

Good for:

- dashboards
- admin panels
- fast delivery

Risk:

- customization complexity
- bundle size
- generic look

## Design Tokens

Large apps should use design tokens for:

- color
- spacing
- typography
- radius
- shadows

Tokens keep UI consistent across components and teams.

## Senior Best Practices

- choose one primary styling approach
- keep design tokens consistent
- avoid one-off styling everywhere
- check accessibility states like focus and contrast
- avoid mixing many UI systems
- consider SSR/runtime cost
- keep business logic out of styled primitives

## Interview Questions

### CSS Modules vs Tailwind?

CSS Modules provide locally scoped CSS. Tailwind provides utility classes based on design constraints.

### What are design tokens?

Named design values such as colors, spacing, typography, and radius used consistently across UI.

### What should you check when choosing CSS-in-JS?

Runtime cost, SSR support, developer experience, and design-system fit.

