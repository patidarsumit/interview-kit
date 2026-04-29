import {Component, forwardRef, input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

type DropdownOption = {
  value: string;
  label: string;
};

@Component({
  selector: 'app-dropdown-control',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownControlComponent),
      multi: true,
    },
  ],
  template: `
    <select
      [disabled]="disabled"
      [value]="value"
      (change)="selectValue($any($event.target).value)"
      (blur)="onTouched()"
    >
      @for (option of options(); track option.value) {
        <option [value]="option.value">{{ option.label }}</option>
      }
    </select>
  `,
})
export class DropdownControlComponent implements ControlValueAccessor {
  readonly options = input.required<DropdownOption[]>();

  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  selectValue(value: string) {
    this.value = value;
    this.onChange(value);
  }
}
