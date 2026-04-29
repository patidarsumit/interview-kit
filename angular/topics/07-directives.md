# 07. Directives

Directives add behavior to DOM elements or templates.

There are three common categories:

- components
- attribute directives
- structural directives

Components are directives with templates.

## Attribute Directive

Attribute directives change behavior or appearance of an existing element.

```ts
import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective {
  private readonly element = inject(ElementRef<HTMLInputElement>);

  ngAfterViewInit() {
    this.element.nativeElement.focus();
  }
}
```

Usage:

```html
<input appAutofocus>
```

## Structural Directive

Structural directives change DOM structure.

Older examples:

```html
<p *ngIf="visible">Visible</p>
<li *ngFor="let item of items">{{ item.name }}</li>
```

Modern Angular often uses built-in control flow instead:

```html
@if (visible) {
  <p>Visible</p>
}
```

## Built-In Directives

Common older directives:

- `NgIf`
- `NgFor`
- `NgSwitch`
- `NgClass`
- `NgStyle`
- `NgModel`

Modern replacements for common structural use:

- `@if`
- `@for`
- `@switch`

## Host Bindings

Modern Angular often uses the `host` metadata property.

```ts
@Directive({
  selector: '[appPressed]',
  host: {
    '[attr.aria-pressed]': 'pressed',
    '[class.is-pressed]': 'pressed',
  },
})
export class PressedDirective {
  pressed = false;
}
```

## `@HostListener`

`@HostListener` listens to events on the directive or component host element.

```ts
import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appClickTracker]',
})
export class ClickTrackerDirective {
  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent) {
    console.log('Host clicked', event);
  }
}
```

Global events are also possible:

```ts
@HostListener('window:keydown.escape')
handleEscape() {
  console.log('Escape pressed');
}
```

Senior warning:

Use global listeners carefully. They can create unexpected behavior and should be cleaned up automatically by Angular only when declared through Angular APIs.

## `@HostBinding`

`@HostBinding` binds a property, attribute, class, or style on the host element.

```ts
import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appHoverState]',
})
export class HoverStateDirective {
  @HostBinding('class.is-hovered')
  isHovered = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }
}
```

## `host` Metadata vs Decorators

Modern Angular often prefers `host` metadata for simple host bindings.

```ts
@Directive({
  selector: '[appToggle]',
  host: {
    '[class.is-active]': 'active',
    '[attr.aria-pressed]': 'active',
    '(click)': 'toggle()',
  },
})
export class ToggleDirective {
  active = false;

  toggle() {
    this.active = !this.active;
  }
}
```

Use decorators when:

- the listener logic is clearer as a method decorator
- you need event arguments
- you are working in older code style

Use `host` metadata when:

- bindings are simple
- you want host behavior visible in directive metadata
- you prefer modern Angular style

## Host Directives

Host directives let a component or directive apply another directive to its host element.

This helps reuse behavior without inheritance.

```ts
@Directive({
  selector: '[appFocusable]',
  host: {
    tabindex: '0',
    '[class.is-focusable]': 'true',
  },
})
export class FocusableDirective {}

@Component({
  selector: 'app-card',
  hostDirectives: [FocusableDirective],
  template: `<ng-content />`,
})
export class CardComponent {}
```

Senior use case:

Host directives are useful for design systems where multiple components need the same accessibility behavior, focus behavior, tracking behavior, or interaction behavior.

## Senior Best Practices

- use directives for reusable DOM behavior
- avoid direct DOM manipulation unless needed
- prefer Renderer2 or safe platform APIs when portability matters
- keep directives focused
- use native HTML behavior when possible
- prefer `host` metadata for simple host bindings in modern Angular
- use host directives to compose reusable behavior

## Interview Questions

### Component vs directive?

A component is a directive with a template. Attribute directives modify existing elements. Structural directives add or remove DOM.

### Are structural directives obsolete?

No. Built-in control flow covers many cases, but custom structural directives may still be useful for domain-specific rendering behavior.

### What is `@HostListener`?

A decorator that listens to events on the host element or supported global targets such as `window`.

### What is `@HostBinding`?

A decorator that binds host element properties, attributes, classes, or styles.

### What are host directives?

A composition feature that lets a directive's behavior be applied to a component or directive host.
