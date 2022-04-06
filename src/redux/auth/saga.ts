import {takeEvery, put, race, take} from 'redux-saga/effects';
import {actions} from './slice';
import {actions as httpAction} from '../httpClient/slice';
import {logout} from '../httpClient/api';
import {AnyAction} from '@reduxjs/toolkit';

function* removeAuthWatcher(action: AnyAction) {
  try {
    yield put(httpAction.reset(null));
    yield put(actions.removeAuth(null));
    // yield put(logout());
    // while (true) {
    //   const composeAction = yield race({
    //     success: take(httpAction.onPerformHttpCall),
    //     error: take(httpAction.errorPerformHttpCall),
    //   });
    //   if (
    //     (composeAction.error &&
    //       composeAction.error.payload.correlationId === 'unAuthenticateUser') ||
    //     (composeAction.success &&
    //       composeAction.success.payload.correlationId === 'unAuthenticateUser')
    //   ) {
    //     yield put(httpAction.reset(null));
    //     yield put(actions.removeAuth(null));
    //     break;
    //   }
    // }
  } catch (e) {
    console.log('Unexpected error');
  }
}
const watchers = [takeEvery(actions.initiateRemoveAuth, removeAuthWatcher)];
export {watchers};
