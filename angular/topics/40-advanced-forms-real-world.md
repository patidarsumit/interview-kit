# 40. Advanced Forms In Real Applications

Real Angular forms often need typed controls, cross-field validation, dynamic rows, nested groups, reusable controls, and accessible error messages.

## Typed Reactive Forms

Typed forms make form values safer.

```ts
profileForm = new FormGroup({
  name: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  }),
  email: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  }),
});
```

`profileForm.value.email` is now typed as `string | undefined`.

`profileForm.getRawValue().email` is typed as `string`.

## Nested Form Groups

Use nested groups when data has natural structure.

```ts
checkoutForm = new FormGroup({
  customer: new FormGroup({
    name: new FormControl('', {nonNullable: true}),
    email: new FormControl('', {nonNullable: true}),
  }),
  address: new FormGroup({
    city: new FormControl('', {nonNullable: true}),
    pincode: new FormControl('', {nonNullable: true}),
  }),
});
```

## `FormArray`

Use `FormArray` when the number of controls changes at runtime.

Examples:

- multiple phone numbers
- invoice line items
- education history
- skills list
- passenger details

## Cross-Field Validation

Use group validators when one control depends on another.

Example:

```ts
function passwordMatch(group: AbstractControl) {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  return password === confirmPassword ? null : {passwordMismatch: true};
}
```

Attach it to the `FormGroup`, not to one individual field.

## Dynamic Validation

Sometimes validation depends on another value.

```ts
this.form.controls.subscribeToNewsletter.valueChanges.subscribe((enabled) => {
  const email = this.form.controls.email;

  if (enabled) {
    email.addValidators([Validators.required, Validators.email]);
  } else {
    email.removeValidators([Validators.required, Validators.email]);
  }

  email.updateValueAndValidity();
});
```

## Custom Form Controls

Use `ControlValueAccessor` for reusable controls such as:

- rating component
- custom select
- date picker
- file picker
- tag input

Senior point:

A custom form control should support disabled state, touched state, keyboard usage, labels, and validation display.

## Signal Forms

Signal Forms are useful to know for Angular v21, but they are experimental.

For production enterprise apps, reactive forms are still the safer default unless the team has decided to adopt Signal Forms intentionally.

## Senior Best Practices

- prefer typed reactive forms for complex forms
- use group validators for cross-field rules
- keep form creation readable with helper functions
- show accessible validation messages
- avoid putting all large form logic in one component
- do not trust client-side validation as a security boundary
- be careful with dynamic validators and memory leaks

Practical examples are available in:

- [cross-field password validator](../programs/51-cross-field-password-validator.ts)
- [dynamic form array](../programs/52-dynamic-form-array.ts)
- [typed nested reactive form](../programs/53-typed-nested-reactive-form.ts)
- [custom dropdown CVA](../programs/70-custom-dropdown-cva.ts)

## Interview Questions

### When do you use `FormArray`?

When the user can dynamically add or remove repeated controls.

### Where should password confirmation validation live?

On the parent `FormGroup`, because the rule compares two sibling controls.

### Why use typed forms?

They catch form shape and value mistakes earlier during development.
