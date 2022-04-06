import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {ContainerState} from './types';
import {FCMState} from './types';
export const initialState: ContainerState = {};

const authSlice = createSlice({
  name: 'fcm',
  initialState,
  reducers: {
    storeFCM(state, action: PayloadAction<ContainerState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeFCM(state: FCMState) {
      return {};
    },
  },
});

export const {actions, reducer, name: sliceKey} = authSlice;
