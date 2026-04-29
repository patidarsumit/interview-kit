# 34. Host Binding, Host Listener, And Host Directives

Host APIs control behavior on the element where a component or directive is attached.

These are commonly asked in Angular interviews because they test directive depth, DOM event handling, and reusable behavior design.

## Host Element

The host element is the element that matches a component or directive selector.

```html
<button appTrackClick>Save</button>
```

For `appTrackClick`, the host element is the `<button>`.

## `@HostListener`

`@HostListener` listens to host events.

```ts
import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appTrackClick]',
})
export class TrackClickDirective {
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    console.log('Clicked', event.target);
  }
}
```

Global listeners:

```ts
@HostListener('window:keydown.escape')
onEscape() {
  console.log('Escape');
}
```

Supported global targets commonly include:

- `window`
- `document`
- `body`

## `@HostBinding`

`@HostBinding` binds values to the host element.

```ts
import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appPressed]',
})
export class PressedDirective {
  @HostBinding('class.is-pressed')
  pressed = false;

  @HostBinding('attr.aria-pressed')
  get ariaPressed() {
    return String(this.pressed);
  }

  @HostListener('click')
  toggle() {
    this.pressed = !this.pressed;
  }
}
```

## `host` Metadata

Modern Angular often prefers `host` metadata for simple host bindings and listeners.

```ts
@Directive({
  selector: '[appPressed]',
  host: {
    '[class.is-pressed]': 'pressed',
    '[attr.aria-pressed]': 'pressed',
    '(click)': 'toggle()',
  },
})
export class PressedDirective {
  pressed = false;

  toggle() {
    this.pressed = !this.pressed;
  }
}
```

## Decorators vs `host`

Use `host` metadata when:

- bindings are simple
- you want host behavior visible in metadata
- you prefer modern Angular style

Use decorators when:

- event handling reads better near the method
- you need multiple method listeners
- you are maintaining older Angular code

Both approaches are valid.

## Host Directives

Host directives compose behavior.

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

Now `app-card` automatically gets the host behavior from `FocusableDirective`.

## Host Directive Inputs And Outputs

Host directive APIs can be exposed intentionally.

```ts
@Component({
  selector: 'app-menu-button',
  hostDirectives: [
    {
      directive: PressedDirective,
      inputs: ['pressed'],
    },
  ],
  template: `<ng-content />`,
})
export class MenuButtonComponent {}
```

## Senior Use Cases

Use host directives for:

- focus behavior
- disabled behavior
- analytics tracking
- keyboard interaction
- ARIA behavior
- shared design-system behavior
- reusable hover/pressed/expanded states

## Common Mistakes

- using direct DOM listeners instead of Angular host listeners
- adding global listeners without understanding scope
- using `@HostBinding` for complex derived state that belongs in a signal/computed
- mixing too many behaviors into one directive
- using inheritance instead of host directive composition

## Interview Questions

### What is `@HostListener`?

A decorator that registers an event listener on the directive or component host element.

### What is `@HostBinding`?

A decorator that binds a directive or component property to the host element.

### What is the modern alternative to simple host decorators?

The `host` metadata object in `@Directive` or `@Component`.

### What are host directives?

A composition mechanism that applies directive behavior to a component or directive host.

