# 17. Signal Forms In Angular 21

Signal Forms are experimental in Angular v21.

They manage form state using Angular signals.

Important:

> Signal Forms are experimental. Avoid production use unless your team accepts API-change risk.

## Why Signal Forms?

Traditional forms often require managing:

- values
- validation
- touched/dirty state
- error display
- synchronization with UI

Signal Forms aim to make form state reactive, type-safe, and signal-driven.

## Basic Model

```ts
import {Component, signal} from '@angular/core';
import {form} from '@angular/forms/signals';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
})
export class LoginComponent {
  loginModel = signal<LoginData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  loginForm = form(this.loginModel);
}
```

## Template Binding

Conceptual template:

```html
<form>
  <label for="email">Email</label>
  <input id="email" type="email" [formField]="loginForm.email">

  <label for="password">Password</label>
  <input id="password" type="password" [formField]="loginForm.password">
</form>
```

## Validation

Signal Forms include schema-style validation APIs.

Common validators include:

- `required`
- custom validation with `validate`
- standard schema validation

Conceptual example:

```ts
loginForm = form(this.loginModel, (path) => {
  required(path.email);
});
```

## Why Senior Engineers Should Care

Signal Forms represent Angular's direction:

- signal-first state
- type-safe access
- less boilerplate
- better reactivity integration

But because they are experimental, senior engineers should be cautious.

## Migration Strategy

Use:

- reactive forms for stable production apps
- Signal Forms for learning, prototypes, or carefully accepted experimental work

Do not migrate all forms blindly.

## Interview Questions

### What are Signal Forms?

An experimental Angular v21 forms API that uses signals as the source of truth for form state.

### Should you use Signal Forms in production?

Only if the team understands the experimental status and accepts API-change risk.

### How do Signal Forms differ from reactive forms?

Reactive forms use `AbstractControl` models. Signal Forms use signal-backed model state and field trees.

