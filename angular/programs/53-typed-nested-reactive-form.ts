import {FormControl, FormGroup, Validators} from '@angular/forms';

type AddressForm = FormGroup<{
  city: FormControl<string>;
  pincode: FormControl<string>;
}>;

type CheckoutForm = FormGroup<{
  customerName: FormControl<string>;
  email: FormControl<string>;
  address: AddressForm;
}>;

export const checkoutForm: CheckoutForm = new FormGroup({
  customerName: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  }),
  email: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  }),
  address: new FormGroup({
    city: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    pincode: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  }),
});

export function submitCheckout() {
  const value = checkoutForm.getRawValue();
  console.log(value.address.city);
}

