import {Component, OnInit, inject} from '@angular/core';
import {UsersSignalStore} from './44-ngrx-signal-store';

@Component({
  selector: 'app-users-signal-page',
  standalone: true,
  providers: [UsersSignalStore],
  template: `
    @if (store.loading()) {
      <p>Loading...</p>
    }

    @for (user of store.users(); track user.id) {
      <button type="button" (click)="store.selectUser(user.id)">
        {{ user.name }}
      </button>
    }

    @if (store.selectedUser(); as user) {
      <h2>{{ user.name }}</h2>
    }
  `,
})
export class UsersSignalPageComponent implements OnInit {
  readonly store = inject(UsersSignalStore);

  ngOnInit() {
    void this.store.loadUsers();
  }
}

