# 13. Inputs, Outputs, And Queries

Angular components communicate through inputs, outputs, and queries.

## Inputs

Classic input:

```ts
@Input() user!: User;
```

Modern signal input:

```ts
import {Component, input} from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `<h2>{{ user().name }}</h2>`,
})
export class UserCard {
  user = input.required<User>();
}
```

Input transforms:

```ts
disabled = input(false, {
  transform: (value: boolean | string) => value === '' || value === true,
});
```

## Outputs

Classic output:

```ts
@Output() saved = new EventEmitter<User>();
```

Modern output:

```ts
import {output} from '@angular/core';

saved = output<User>();

save() {
  this.saved.emit(this.user());
}
```

Template usage:

```html
<app-user-card [user]="user" (saved)="handleSaved($event)" />
```

## Model Inputs

Model inputs support two-way binding patterns for components.

```ts
value = model('');
```

Usage:

```html
<app-search [(value)]="query" />
```

## Queries

Classic:

```ts
@ViewChild(SearchInput) searchInput!: SearchInput;
@ContentChild(ItemTemplate) itemTemplate!: ItemTemplate;
```

Modern signal queries:

```ts
searchInput = viewChild(SearchInput);
items = viewChildren(ItemComponent);
projected = contentChild(ItemTemplate);
```

## View vs Content

View queries inspect elements inside the component's own template.

Content queries inspect projected content passed from the parent.

## Senior Best Practices

- inputs should represent component API
- outputs should describe events, not commands
- avoid mutating input objects
- prefer required inputs for required data
- keep two-way binding limited to form-like components
- use queries only when component composition requires it

## Interview Questions

### Input vs output?

Inputs pass data into a component. Outputs emit events out of a component.

### ViewChild vs ContentChild?

ViewChild reads from the component's view. ContentChild reads projected content.

### Why are signal inputs useful?

They integrate component inputs into Angular's signal reactivity model.

