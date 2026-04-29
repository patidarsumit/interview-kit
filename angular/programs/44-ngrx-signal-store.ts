import {computed, inject} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {UsersApiService} from './10-http-service-crud';
import {User} from './37-ngrx-classic-actions';

type UsersSignalState = {
  users: User[];
  selectedUserId: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: UsersSignalState = {
  users: [],
  selectedUserId: null,
  loading: false,
  error: null,
};

export const UsersSignalStore = signalStore(
  withState(initialState),
  withComputed(({users, selectedUserId}) => ({
    count: computed(() => users().length),
    selectedUser: computed(
      () => users().find((user) => user.id === selectedUserId()) ?? null,
    ),
  })),
  withMethods((store, usersApi = inject(UsersApiService)) => ({
    selectUser(userId: string) {
      patchState(store, {selectedUserId: userId});
    },

    async loadUsers() {
      patchState(store, {loading: true, error: null});

      try {
        const users = await firstValueFrom(usersApi.getUsers());
        patchState(store, {users, loading: false});
      } catch {
        patchState(store, {
          loading: false,
          error: 'Could not load users',
        });
      }
    },
  })),
);

