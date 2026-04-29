# 05. Templates And Binding

Angular templates are HTML plus Angular syntax.

Templates connect component state to the DOM.

## Interpolation

```html
<h1>{{ title }}</h1>
```

Use interpolation for text.

## Property Binding

```html
<button [disabled]="isSaving">Save</button>
```

Use property binding for DOM properties.

## Attribute Binding

```html
<td [attr.colspan]="columnCount">Total</td>
```

Use attribute binding for attributes that do not map cleanly to DOM properties, such as ARIA attributes, SVG attributes, and `colspan`.

## Class Binding

```html
<button [class.active]="isActive">Filter</button>
```

Multiple classes:

```html
<section [class]="sectionClasses"></section>
```

## Style Binding

```html
<div [style.width.%]="progress"></div>
```

## Event Binding

```html
<button type="button" (click)="save()">Save</button>
```

Pass event:

```html
<input (input)="onSearch($event)">
```

## Two-Way Binding

Template-driven forms:

```html
<input [(ngModel)]="name">
```

Signal-style state often uses explicit update patterns instead.

## Template Reference Variables

```html
<input #searchBox>
<button (click)="search(searchBox.value)">Search</button>
```

## Pipes In Templates

```html
<p>{{ today | date }}</p>
<p>{{ amount | currency }}</p>
```

## Template Expressions

Template expressions should be simple.

Avoid:

```html
@for (item of calculateExpensiveList(); track item.id) {
  <p>{{ item.name }}</p>
}
```

Prefer:

```html
@for (item of filteredItems(); track item.id) {
  <p>{{ item.name }}</p>
}
```

If `filteredItems` is a computed signal, Angular can track it efficiently.

## Senior Best Practices

- keep templates readable
- avoid complex business logic in templates
- use binding syntax correctly
- use ARIA attribute binding for dynamic accessibility values
- avoid calling expensive functions repeatedly from templates
- use stable tracking in repeated lists

## Interview Questions

### What is interpolation?

Binding component values into text content.

### Property binding vs attribute binding?

Property binding sets DOM properties. Attribute binding sets HTML attributes.

### Why avoid complex expressions in templates?

They are harder to test, harder to read, and may run frequently during rendering.

