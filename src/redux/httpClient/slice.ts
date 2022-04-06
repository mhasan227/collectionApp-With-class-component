import get from 'lodash.get';
import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {HttpState} from './types';

interface AnyObj {
  [key: string]: any;
}
export interface Payload {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  params?: AnyObj;
  body?: AnyObj;
  headers?: AnyObj;
  extra?: {
    absolutePath?: boolean;
    dontResetDefault?: boolean;
  };
}

interface HttpAction {
  correlationId: string;
  response?: any;
  error?: any;
  payload?: Payload;
}
export const initialState: HttpState = {};

const httpSlice = createSlice({
  name: 'http',
  initialState,
  reducers: {
    performHttpCall(state, action: PayloadAction<HttpAction>) {
      return {
        ...state,
        [action.payload.correlationId]: {
          loading: true,
          payload: action.payload.payload,
          response: null,
          error: null,
          ...(action.payload.payload?.extra?.dontResetDefault
            ? {
                response: get(
                  state,
                  `${action.payload.correlationId}.response`,
                  null,
                ),
                error: get(
                  state,
                  `${action.payload.correlationId}.error`,
                  null,
                ),
              }
            : {
                response: null,
                error: null,
              }),
        },
      };
    },
    onPerformHttpCall(state, action: PayloadAction<HttpAction>) {
      return {
        ...state,
        [action.payload.correlationId]: {
          ...state[action.payload.correlationId],
          loading: false,
          error: null,
          response: action.payload.response,
        },
      };
    },
    errorPerformHttpCall(state, action: PayloadAction<HttpAction>) {
      return {
        ...state,
        [action.payload.correlationId]: {
          ...state[action.payload.correlationId],
          loading: false,
          error: action.payload.error,
          response: null,
        },
      };
    },
    reset(state, action: PayloadAction<null>) {
      return {};
    },
    performDataCleanUp(state, action: PayloadAction<HttpAction>) {
      return {
        ...state,
        [action.payload.correlationId]: {
          ...state[action.payload.correlationId],
          loading: false,
          error: null,
          response: null,
        },
      };
    },
  },
});

export const {actions, reducer, name: sliceKey} = httpSlice;
