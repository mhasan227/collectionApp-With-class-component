import get from 'lodash.get';
import {createSelector} from '@reduxjs/toolkit';

import {initialState} from './slice';

const selectState = (state: any = {}) => state.authReducer || initialState;

export const selectAuth = createSelector(
  [selectState],
  (authState) => authState,
);

export const selectIsUserAuthenticate = createSelector(
  [selectAuth],
  (authState) => !!get(authState, 'authResponse.id_token', false),
);
