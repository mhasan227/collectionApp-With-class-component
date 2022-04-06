import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {ContainerState} from './types';
import {AuthState} from './types';
export const initialState: ContainerState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeAuth(state, action: PayloadAction<ContainerState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeAuth(state: AuthState, action: PayloadAction<null>) {
      return {};
    },
    initiateRemoveAuth(state, action: PayloadAction<null>) {
      return {...state};
    },
  },
});

export const {actions, reducer, name: sliceKey} = authSlice;
