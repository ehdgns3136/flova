/*
 *
 * IntroPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SOCIAL_USER_CONTINUE,
} from './constants';

const initialState = fromJS({
  loginError: false,
  isLoading: false,
});


function introPageReducer(state = initialState, action) {
  switch (action.type) {
    case SOCIAL_USER_CONTINUE:
      return state.set('isLoading', true);
    case LOGIN_SUCCESS:
      return state.set('loginError', false)
        .set('isLoading', false);
    case LOGIN_FAILURE:
      return state.set('loginError', true)
        .set('isLoading', false);
    default:
      return state;
  }
}

export default introPageReducer;
