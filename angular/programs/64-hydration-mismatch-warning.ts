import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-hydration-mismatch',
  standalone: true,
  template: `
    <p>Created at: {{ createdAt() }}</p>
  `,
})
export class HydrationMismatchComponent {
  readonly createdAt = signal(new Date().toISOString());
}

@Component({
  selector: 'app-hydration-safe',
  standalone: true,
  template: `
    <p>Created at: {{ createdAt }}</p>
  `,
})
export class HydrationSafeComponent {
  readonly createdAt = 'Provided by resolver or server response';
}

