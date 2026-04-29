# 08. Pipes

Pipes transform values for display in templates.

```html
<p>{{ price | currency }}</p>
<p>{{ today | date }}</p>
```

## Built-In Pipes

Common pipes:

- `date`
- `currency`
- `decimal`
- `percent`
- `json`
- `async`
- `uppercase`
- `lowercase`
- `titlecase`

## Custom Pipe

```ts
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  }
}
```

Usage:

```html
<p>{{ 'sumit patel' | initials }}</p>
```

## Pure vs Impure Pipes

Pure pipes run when Angular detects a pure input change.

Impure pipes can run much more often.

```ts
@Pipe({
  name: 'filterUsers',
  pure: false,
})
export class FilterUsersPipe {}
```

Avoid impure pipes unless there is a very clear reason.

## `async` Pipe

Older Angular used `async` pipe heavily with RxJS:

```html
@if (user$ | async; as user) {
  <p>{{ user.name }}</p>
}
```

Modern Angular may use signals:

```html
@if (user(); as user) {
  <p>{{ user.name }}</p>
}
```

## Senior Best Practices

- use pipes for display formatting
- keep pipes pure when possible
- avoid business logic inside pipes
- avoid heavy filtering/sorting pipes in large lists
- prefer computed signals for state derivation

## Interview Questions

### What is a pipe?

A template feature that transforms a value for display.

### Pure vs impure pipe?

Pure pipes run only when input references change. Impure pipes can run on every change detection cycle.

