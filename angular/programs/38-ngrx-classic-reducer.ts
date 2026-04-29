import {createReducer, on} from '@ngrx/store';
import {User, UsersActions} from './37-ngrx-classic-actions';

export type UsersState = {
  users: User[];
  selectedUserId: string | null;
  loading: boolean;
  error: string | null;
};

export const initialUsersState: UsersState = {
  users: [],
  selectedUserId: null,
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UsersActions.loadUsersSuccess, (state, {users}) => ({
    ...state,
    users,
    loading: false,
  })),
  on(UsersActions.loadUsersFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UsersActions.selectUser, (state, {userId}) => ({
    ...state,
    selectedUserId: userId,
  })),
);

