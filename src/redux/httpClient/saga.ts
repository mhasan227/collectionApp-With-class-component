import {select, call, put, takeEvery} from 'redux-saga/effects';
import {actions as httpAction} from './slice';
import {actions as authAction} from '../auth/slice';
import get from 'lodash.get';
import {AnyAction} from '@reduxjs/toolkit';
import client from './client';

export function* performHttpCallWatcher(action: AnyAction) {
  try {
    const token = yield select((state) =>
      get(state, 'authReducer.authResponse.id_token', ''),
    );
    const response = yield call(client, action.payload, token);
    if (
      response &&
      (!response?.result.hasOwnProperty('code') ||
        Number(response?.result?.code) === 200 ||
        Number(response?.result?.code) === 201)
    ) {
      yield put(
        httpAction.onPerformHttpCall({
          ...action.payload,
          response,
        }),
      );
    } else {
      yield put(
        httpAction.errorPerformHttpCall({
          ...action.payload,
          error: response,
        }),
      );
    }
  } catch (e) {
    console.log('e', e.status);
    if (e.status === 401) {
      yield put(httpAction.reset(null));
      yield put(authAction.removeAuth(null));
    }
    yield put(
      httpAction.errorPerformHttpCall({
        ...action.payload,
        error: e,
      }),
    );
  }
}

const watchers = [
  takeEvery(httpAction.performHttpCall, performHttpCallWatcher),
];
export {watchers};
