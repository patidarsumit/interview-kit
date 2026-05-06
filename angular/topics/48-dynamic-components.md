# 48. Dynamic Components

Dynamic components are components that Angular creates at runtime instead of writing their selector directly in a template.

This is useful when the component type is not known at compile-time from a fixed template.

## Common Use Cases

Companies ask dynamic component questions for:

- modals and dialogs
- dashboard widgets
- CMS-driven pages
- plugin-style UI
- dynamic forms
- tab content
- role-based panels
- notification/toast containers
- component registry patterns

Example:

```text
API says widget type is "chart"
Angular renders ChartWidgetComponent

API says widget type is "table"
Angular renders TableWidgetComponent
```

## Dynamic Component vs Normal Component

Normal component:

```html
<app-user-card />
```

The template directly references the component.

Dynamic component:

```html
<ng-container *ngComponentOutlet="selectedComponent" />
```

The component type is chosen from TypeScript state.

## Two Main Ways

Modern Angular supports two common approaches:

- `NgComponentOutlet` for declarative dynamic rendering in templates
- `ViewContainerRef.createComponent()` for programmatic rendering in TypeScript

Use `NgComponentOutlet` when the template can own the outlet.

Use `ViewContainerRef` when you need more control, such as dialogs, dynamic insertion, clearing, or manual lifecycle handling.

## Using `NgComponentOutlet`

`NgComponentOutlet` renders a component type from a value.

```ts
import {NgComponentOutlet} from '@angular/common';
import {Component, Type, computed, signal} from '@angular/core';

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  template: `<p>Chart widget</p>`,
})
export class ChartWidgetComponent {}

@Component({
  selector: 'app-table-widget',
  standalone: true,
  template: `<p>Table widget</p>`,
})
export class TableWidgetComponent {}

@Component({
  selector: 'app-dashboard-host',
  imports: [NgComponentOutlet],
  template: `
    <button type="button" (click)="selectedType.set('chart')">Chart</button>
    <button type="button" (click)="selectedType.set('table')">Table</button>

    <ng-container *ngComponentOutlet="selectedComponent()" />
  `,
})
export class DashboardHostComponent {
  readonly selectedType = signal<'chart' | 'table'>('chart');

  readonly selectedComponent = computed<Type<unknown>>(() => {
    return this.selectedType() === 'chart'
      ? ChartWidgetComponent
      : TableWidgetComponent;
  });
}
```

## Passing Inputs

Use `ngComponentOutletInputs`.

```ts
@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `<h2>{{ name() }}</h2>`,
})
export class UserCardComponent {
  readonly name = input.required<string>();
}
```

Host:

```html
<ng-container
  *ngComponentOutlet="
    userCardComponent;
    inputs: userCardInputs()
  "
/>
```

```ts
readonly userCardComponent = UserCardComponent;
readonly userCardInputs = signal({name: 'Sumit'});
```

When the inputs object changes, Angular updates the dynamic component.

## Accessing Component Instance

`NgComponentOutlet` can expose the created component instance.

```html
<ng-container
  [ngComponentOutlet]="counterComponent"
  #outlet="ngComponentOutlet"
/>

<button type="button" (click)="outlet.componentInstance?.increment()">
  Increment
</button>
```

Senior point:

Use instance access sparingly. Prefer inputs/outputs or services for normal communication.

## Using `ViewContainerRef.createComponent`

`ViewContainerRef` gives programmatic control.

```ts
import {Component, ViewContainerRef, inject} from '@angular/core';

@Component({
  selector: 'app-alert-box',
  standalone: true,
  template: `<p>Dynamic alert</p>`,
})
export class AlertBoxComponent {}

@Component({
  selector: 'app-alert-host',
  template: `
    <button type="button" (click)="showAlert()">Show alert</button>
  `,
})
export class AlertHostComponent {
  private readonly viewContainerRef = inject(ViewContainerRef);

  showAlert() {
    this.viewContainerRef.clear();
    this.viewContainerRef.createComponent(AlertBoxComponent);
  }
}
```

`clear()` removes previously rendered dynamic content from that container.

## Passing Inputs Programmatically

Use `ComponentRef.setInput()`.

```ts
const componentRef = this.viewContainerRef.createComponent(UserCardComponent);

componentRef.setInput('name', 'Sumit');
```

This works with modern signal inputs too.

## Listening To Outputs Programmatically

Dynamic components can expose outputs.

```ts
@Component({
  selector: 'app-confirm-box',
  standalone: true,
  template: `
    <button type="button" (click)="closed.emit(true)">Yes</button>
    <button type="button" (click)="closed.emit(false)">No</button>
  `,
})
export class ConfirmBoxComponent {
  readonly closed = output<boolean>();
}
```

Host:

```ts
const componentRef = this.viewContainerRef.createComponent(ConfirmBoxComponent);

const subscription = componentRef.instance.closed.subscribe((confirmed) => {
  console.log(confirmed);
  subscription.unsubscribe();
  componentRef.destroy();
});
```

Senior point:

Clean up subscriptions and destroy dynamic components when they are no longer needed.

## Dynamic Component Registry

For dashboard or CMS-style rendering, use a component registry.

```ts
const widgetRegistry = {
  chart: ChartWidgetComponent,
  table: TableWidgetComponent,
  stats: StatsWidgetComponent,
} satisfies Record<string, Type<unknown>>;
```

Then choose component by config:

```ts
getWidgetComponent(type: string) {
  return widgetRegistry[type] ?? UnknownWidgetComponent;
}
```

Do not dynamically render arbitrary component names from untrusted input.

Map allowed types explicitly.

## Dynamic Components vs Routing

Use routing when the URL should change and the screen is navigable.

Use dynamic components when part of the current screen changes without route navigation.

Example:

- `/users/:id` should be a route
- dashboard widget type can be a dynamic component
- modal body can be a dynamic component
- tab content can be dynamic if the URL does not need to represent it

## Dynamic Components vs `@defer`

Use `@defer` when the component is known in the template but should be lazy-loaded based on a trigger.

Use dynamic components when the component type itself is selected at runtime.

```html
@defer (on viewport) {
  <app-heavy-chart />
}
```

This is not the same as choosing between many unknown component types.

## Common Mistakes

- using dynamic components when normal template composition is enough
- not destroying programmatically created components
- not unsubscribing from dynamic outputs
- allowing backend strings to directly control component classes
- using dynamic components instead of router navigation
- putting too much business logic in the dynamic host
- forgetting accessibility for dynamic modals/dialogs

## Senior Best Practices

- prefer normal components when component type is known
- use `NgComponentOutlet` for simple declarative dynamic rendering
- use `ViewContainerRef` for programmatic insertion and cleanup
- use explicit component registries
- pass data through inputs
- communicate through outputs or services
- clean up dynamic component references
- consider routing or `@defer` when they better match the problem
- test dynamic host behavior

## Interview Questions

### What is a dynamic component?

A component created at runtime instead of being written directly in a template.

### `NgComponentOutlet` vs `ViewContainerRef.createComponent()`?

`NgComponentOutlet` is declarative and template-based. `ViewContainerRef.createComponent()` is programmatic and gives more control over creation, insertion, and cleanup.

### How do you pass inputs to a dynamic component?

With `ngComponentOutletInputs` for `NgComponentOutlet`, or `componentRef.setInput()` for programmatic creation.

### When should you use dynamic components?

When the component type is selected at runtime, such as dashboards, modals, plugins, CMS blocks, or dynamic tabs.

### Dynamic component vs `@defer`?

`@defer` lazy-loads a known template dependency. Dynamic components choose the component type at runtime.
