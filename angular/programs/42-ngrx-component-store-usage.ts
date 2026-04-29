import {Component, OnInit, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {UsersActions} from './37-ngrx-classic-actions';
import {
  selectSelectedUser,
  selectUsers,
  selectUsersLoading,
} from './39-ngrx-classic-selectors';

@Component({
  selector: 'app-users-page',
  standalone: true,
  template: `
    @if (loading()) {
      <p>Loading...</p>
    }

    @for (user of users(); track user.id) {
      <button type="button" (click)="selectUser(user.id)">
        {{ user.name }}
      </button>
    }

    @if (selectedUser(); as user) {
      <h2>{{ user.name }}</h2>
    }
  `,
})
export class UsersPageComponent implements OnInit {
  private readonly store = inject(Store);

  users = this.store.selectSignal(selectUsers);
  loading = this.store.selectSignal(selectUsersLoading);
  selectedUser = this.store.selectSignal(selectSelectedUser);

  ngOnInit() {
    this.store.dispatch(UsersActions.loadUsers());
  }

  selectUser(userId: string) {
    this.store.dispatch(UsersActions.selectUser({userId}));
  }
}

