import {Directive, signal} from '@angular/core';

@Directive({
  selector: '[appPressed]',
  standalone: true,
  host: {
    '[class.is-pressed]': 'pressed()',
    '[attr.aria-pressed]': 'pressed()',
    '(click)': 'toggle()',
  },
})
export class PressedDirective {
  pressed = signal(false);

  toggle() {
    this.pressed.update((value) => !value);
  }
}

