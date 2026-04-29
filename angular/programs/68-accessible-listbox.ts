import {Component, computed, signal} from '@angular/core';

type Option = {
  id: string;
  label: string;
};

@Component({
  selector: 'app-accessible-listbox',
  standalone: true,
  template: `
    <button
      type="button"
      aria-haspopup="listbox"
      [attr.aria-expanded]="open()"
      aria-controls="role-listbox"
      (click)="open.update((value) => !value)"
    >
      {{ selectedLabel() }}
    </button>

    @if (open()) {
      <ul id="role-listbox" role="listbox" tabindex="0" (keydown)="onKeydown($event)">
        @for (option of options; track option.id) {
          <li
            role="option"
            [attr.aria-selected]="option.id === selectedId()"
            (click)="select(option.id)"
          >
            {{ option.label }}
          </li>
        }
      </ul>
    }
  `,
})
export class AccessibleListboxComponent {
  readonly options: Option[] = [
    {id: 'admin', label: 'Admin'},
    {id: 'manager', label: 'Manager'},
    {id: 'user', label: 'User'},
  ];

  readonly open = signal(false);
  readonly activeIndex = signal(2);
  readonly selectedId = signal('user');
  readonly selectedLabel = computed(
    () =>
      this.options.find((option) => option.id === this.selectedId())?.label ??
      'Select role',
  );

  select(id: string) {
    this.selectedId.set(id);
    this.open.set(false);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.open.set(false);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex.update((index) =>
        Math.min(index + 1, this.options.length - 1),
      );
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex.update((index) => Math.max(index - 1, 0));
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      this.select(this.options[this.activeIndex()].id);
    }
  }
}
