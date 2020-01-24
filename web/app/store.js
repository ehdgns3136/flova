/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import globalSagas from 'global/sagas';
import notificationSagas from 'global/notification/sagas';
import profileSagas from 'global/profile/sagas';
import inviteModalSagas from 'global/inviteModal/sagas';
import entitiesSagas from 'global/entities/sagas';
import questionSagas from 'global/models/question/sagas';
import answerSagas from 'global/models/answer/sagas';
import commentSagas from 'global/models/comment/sagas';
import userSagas from 'global/models/user/sagas';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  globalSagas.map(sagaMiddleware.run);
  notificationSagas.map(sagaMiddleware.run);
  profileSagas.map(sagaMiddleware.run);
  inviteModalSagas.map(sagaMiddleware.run);
  entitiesSagas.map(sagaMiddleware.run);
  questionSagas.map(sagaMiddleware.run);
  answerSagas.map(sagaMiddleware.run);
  commentSagas.map(sagaMiddleware.run);
  userSagas.map(sagaMiddleware.run);

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry
  store.asyncSagas = new Map(); // Async saga registry to avoid multiple executions of the same saga

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
