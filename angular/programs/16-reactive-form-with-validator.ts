import {Component} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

function strongPassword(control: AbstractControl<string>): ValidationErrors | null {
  const value = control.value;

  if (!/\d/.test(value)) {
    return {missingNumber: true};
  }

  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <label for="email">Email</label>
      <input id="email" type="email" formControlName="email">

      <label for="password">Password</label>
      <input id="password" type="password" formControlName="password">

      <button type="submit" [disabled]="form.invalid">Register</button>
    </form>
  `,
})
export class RegisterComponent {
  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8), strongPassword],
    }),
  });

  submit() {
    console.log(this.form.getRawValue());
  }
}

