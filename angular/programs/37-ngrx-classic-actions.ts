import {createActionGroup, emptyProps, props} from '@ngrx/store';

export type User = {
  id: string;
  name: string;
  email: string;
};

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{users: User[]}>(),
    'Load Users Failure': props<{error: string}>(),
    'Select User': props<{userId: string}>(),
  },
});

