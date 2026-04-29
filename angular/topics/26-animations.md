# 26. Animations

Angular supports modern template-native enter and leave animations.

Older Angular used the animation DSL from `@angular/animations`.

Modern Angular increasingly favors CSS-based animation patterns integrated with templates.

## Enter Animation

```html
@if (visible()) {
  <section animate.enter="fade-in">
    Content
  </section>
}
```

```css
.fade-in {
  animation: fade-in 200ms ease both;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Leave Animation

```html
@if (visible()) {
  <section animate.leave="fade-out">
    Content
  </section>
}
```

## When To Animate

Good use cases:

- route/page transitions
- modal enter/leave
- menus
- toast messages
- list item changes

Avoid:

- distracting animation
- long blocking motion
- animation that hides important state

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Performance

Prefer animating:

- `transform`
- `opacity`

Avoid frequent animation of:

- `width`
- `height`
- `top`
- `left`
- `margin`

## Senior Best Practices

- keep animation purposeful
- respect reduced motion
- avoid layout-heavy animation
- test dynamic enter/leave states
- do not rely on animation alone to communicate meaning

## Interview Questions

### What should you animate for performance?

Usually `transform` and `opacity`.

### Why respect reduced motion?

Some users experience discomfort or accessibility issues with motion.

