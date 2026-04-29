import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';
import {UsersEffects} from './40-ngrx-classic-effects';
import {usersReducer} from './38-ngrx-classic-reducer';

export const usersFeatureProviders = [
  provideState('users', usersReducer),
  provideEffects(UsersEffects),
];

