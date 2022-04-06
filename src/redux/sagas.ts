import {all, takeEvery, call} from 'redux-saga/effects';
import {AnyAction} from 'redux';
import {watchers as authWatchers} from './auth/saga';
import {watchers as httpWatchers} from './httpClient/saga';
function* watcherDebug(action: AnyAction) {
  yield call(console.log, `watcherDebug: ${action.type}`);
}
export default function* watchers() {
  yield all([
    ...[takeEvery('*', watcherDebug)],
    ...authWatchers,
    ...httpWatchers,
  ]);
}
