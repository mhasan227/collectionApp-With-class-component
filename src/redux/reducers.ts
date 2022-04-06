import {combineReducers} from 'redux';
import {reducer as authReducer} from './auth/slice';
import {reducer as httpReducer} from './httpClient/slice';
import {reducer as fcmReducer} from './fcm/slice';

export default combineReducers({
  authReducer,
  httpReducer,
  fcmReducer,
});
