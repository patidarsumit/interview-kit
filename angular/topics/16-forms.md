# 16. Forms

Angular has multiple form approaches.

- template-driven forms
- reactive forms
- experimental Signal Forms in Angular v21

## Template-Driven Forms

Good for simpler forms.

```html
<form #formRef="ngForm" (ngSubmit)="save(formRef.value)">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" ngModel required>

  <button type="submit" [disabled]="formRef.invalid">Save</button>
</form>
```

Requires `FormsModule`.

## Reactive Forms

Good for complex forms.

```ts
import {FormControl, FormGroup, Validators} from '@angular/forms';

profileForm = new FormGroup({
  email: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  }),
});
```

Template:

```html
<form [formGroup]="profileForm" (ngSubmit)="save()">
  <input type="email" formControlName="email">
  <button type="submit">Save</button>
</form>
```

Requires `ReactiveFormsModule`.

## FormArray

Use `FormArray` for dynamic repeated controls.

```ts
aliases = new FormArray([
  new FormControl('', {nonNullable: true}),
]);
```

## Custom Validators

```ts
function strongPassword(control: AbstractControl) {
  const value = control.value as string;
  return /\d/.test(value) ? null : {missingNumber: true};
}
```

## ControlValueAccessor

Use ControlValueAccessor when building a custom form control that integrates with Angular forms.

## Template-Driven vs Reactive

Template-driven:

- less code
- simpler
- template owns more form behavior

Reactive:

- more explicit
- easier to test
- better for dynamic validation
- better for complex forms

## Senior Best Practices

- use reactive forms for complex enterprise forms
- use typed forms
- show accessible validation messages
- do not rely only on client validation
- keep validation logic reusable
- avoid huge form components
- split complex forms into child components

For cross-field validation, dynamic form arrays, and nested typed forms, see [Advanced Forms In Real Applications](./40-advanced-forms-real-world.md).

## Interview Questions

### Template-driven vs reactive forms?

Template-driven forms are template-first. Reactive forms are model-first and more explicit.

### What is a validator?

A function that checks a control value and returns either `null` or an error object.

### What is ControlValueAccessor?

An interface that lets a custom component behave like an Angular form control.
