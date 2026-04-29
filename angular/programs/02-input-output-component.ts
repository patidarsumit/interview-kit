import {Component, input, output} from '@angular/core';

type User = {
  id: string;
  name: string;
};

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `
    <article>
      <h2>{{ user().name }}</h2>
      <button type="button" (click)="selected.emit(user())">Select</button>
    </article>
  `,
})
export class UserCardComponent {
  user = input.required<User>();
  selected = output<User>();
}

