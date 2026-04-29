import {Component} from '@angular/core';

type User = {
  id: string;
  name: string;
};

@Component({
  selector: 'app-old-ngfor',
  template: `
    <article *ngFor="let user of users; trackBy: trackByUserId">
      {{ user.name }}
    </article>
  `,
})
export class OldNgForComponent {
  users: User[] = [
    {id: 'u1', name: 'Amit'},
    {id: 'u2', name: 'Sumit'},
  ];

  trackByUserId(index: number, user: User) {
    return user.id;
  }
}

