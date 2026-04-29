import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UsersState} from './38-ngrx-classic-reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users,
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.loading,
);

export const selectSelectedUserId = createSelector(
  selectUsersState,
  (state) => state.selectedUserId,
);

export const selectSelectedUser = createSelector(
  selectUsers,
  selectSelectedUserId,
  (users, selectedUserId) =>
    users.find((user) => user.id === selectedUserId) ?? null,
);

