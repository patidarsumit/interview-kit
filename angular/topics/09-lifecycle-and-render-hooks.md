# 09. Lifecycle And Render Hooks

Angular components have lifecycle hooks that run at important moments.

## Common Lifecycle Hooks

```ts
ngOnInit()
ngOnChanges()
ngDoCheck()
ngAfterContentInit()
ngAfterContentChecked()
ngAfterViewInit()
ngAfterViewChecked()
ngOnDestroy()
```

## Common Usage

`ngOnInit`:

- initialize component data
- start subscriptions
- call services

`ngOnChanges`:

- react to input changes

`ngAfterViewInit`:

- access view children
- run DOM-dependent logic

`ngOnDestroy`:

- cleanup timers
- cleanup subscriptions
- remove external listeners

## Modern Cleanup

Use `DestroyRef` for cleanup.

```ts
import {DestroyRef, inject} from '@angular/core';

export class SearchComponent {
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    const timer = setInterval(() => console.log('tick'), 1000);

    this.destroyRef.onDestroy(() => {
      clearInterval(timer);
    });
  }
}
```

## Render Hooks

Modern Angular includes render hooks such as:

- `afterNextRender`
- `afterEveryRender`
- `afterRenderEffect`

Use them when code needs to run after Angular has rendered.

```ts
import {afterNextRender, Component, ElementRef, inject} from '@angular/core';

@Component({
  selector: 'app-measure',
  template: `<section>Measure me</section>`,
})
export class MeasureComponent {
  private readonly element = inject(ElementRef<HTMLElement>);

  constructor() {
    afterNextRender(() => {
      console.log(this.element.nativeElement.getBoundingClientRect());
    });
  }
}
```

## Senior Best Practices

- avoid heavy work in lifecycle hooks
- cleanup external resources
- do not access view children before view init
- prefer signals/computed values for state derivation
- use render hooks for post-render DOM measurement

## Interview Questions

### `ngOnInit` vs constructor?

Constructor is for dependency setup. `ngOnInit` is for initialization that depends on Angular-bound inputs or component setup.

### Why use `ngOnDestroy` or `DestroyRef`?

To prevent memory leaks from subscriptions, timers, and external listeners.

