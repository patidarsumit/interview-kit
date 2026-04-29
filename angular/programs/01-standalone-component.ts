import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <section>
      <h1>Counter</h1>
      <p>Value: {{ count() }}</p>
      <button type="button" (click)="increment()">Increment</button>
    </section>
  `,
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update((value) => value + 1);
  }
}

