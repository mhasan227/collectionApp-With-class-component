import get from 'lodash.get';
import {createSelector} from '@reduxjs/toolkit';

import {initialState} from './slice';

const selectState = (state: any = {}) => state.fcmReducer || initialState;

export const selectFCM = createSelector([selectState], (fcmState) => fcmState);

export const selectFCMToken = createSelector([selectFCM], (fcmState) =>
  get(fcmState, 'fcm_token', null),
);
