import {Component, signal} from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';

type User = {
  id: string;
  name: string;
};

@Component({
  selector: 'app-user-virtual-list',
  standalone: true,
  imports: [ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport itemSize="48" class="viewport">
      <article *cdkVirtualFor="let user of users(); trackBy: trackById">
        {{ user.name }}
      </article>
    </cdk-virtual-scroll-viewport>
  `,
  styles: [
    `
      .viewport {
        height: 480px;
      }
    `,
  ],
})
export class UserVirtualListComponent {
  readonly users = signal<User[]>(
    Array.from({length: 10000}, (_, index) => ({
      id: `u${index}`,
      name: `User ${index}`,
    })),
  );

  trackById(index: number, user: User) {
    return user.id;
  }
}

