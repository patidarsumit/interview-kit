import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {User, UsersActions} from './37-ngrx-classic-actions';

export interface UsersEntityState extends EntityState<User> {
  loading: boolean;
  error: string | null;
}

export const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const initialState: UsersEntityState = usersAdapter.getInitialState({
  loading: false,
  error: null,
});

export const usersEntityReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(UsersActions.loadUsersSuccess, (state, {users}) =>
    usersAdapter.setAll(users, {
      ...state,
      loading: false,
      error: null,
    }),
  ),
);

export const {
  selectAll: selectAllUsers,
  selectEntities: selectUserEntities,
  selectIds: selectUserIds,
  selectTotal: selectUsersTotal,
} = usersAdapter.getSelectors();

