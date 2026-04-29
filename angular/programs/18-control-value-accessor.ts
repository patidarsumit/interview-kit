import {Component, forwardRef, signal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-rating-input',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingInputComponent),
      multi: true,
    },
  ],
  template: `
    @for (star of stars; track star) {
      <button type="button" [disabled]="disabled()" (click)="select(star)">
        {{ star <= value() ? '★' : '☆' }}
      </button>
    }
  `,
})
export class RatingInputComponent implements ControlValueAccessor {
  stars = [1, 2, 3, 4, 5];
  value = signal(0);
  disabled = signal(false);

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number): void {
    this.value.set(value ?? 0);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  select(value: number) {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }
}

