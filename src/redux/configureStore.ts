/**
 * Create the store with dynamic reducers
 */

import {compose, applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import {persistReducer, persistStore} from 'redux-persist';
import sagas from './sagas';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['httpReducer'],
};
const persistedReducer = persistReducer(persistConfig, reducer);
export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(sagas);
  const persistor = persistStore(store);
  return {store, persistor};
}
