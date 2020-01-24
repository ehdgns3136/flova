/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import globalReducer from 'global/reducer';
import notificationReducer from 'global/notification/reducer';
import profileReducer from 'global/profile/reducer';
import inviteModalReducer from 'global/inviteModal/reducer';
import entitiesReducer from 'global/entities/reducer';
import questionReducer from 'global/models/question/reducer';
import answerReducer from 'global/models/answer/reducer';
import commentReducer from 'global/models/comment/reducer';
import userReducer from 'global/models/user/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    global: globalReducer,
    notification: notificationReducer,
    profile: profileReducer,
    inviteModal: inviteModalReducer,
    entities: entitiesReducer,
    question: questionReducer,
    answer: answerReducer,
    comment: commentReducer,
    user: userReducer,
    ...asyncReducers,
  });
}
