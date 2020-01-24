/*
 *
 * IntroPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHECK_EMAIL_EXIST_REQUEST,
  CHECK_EMAIL_EXIST_SUCCESS,
  CHECK_EMAIL_EXIST_FAILURE,
} from './constants';

const initialState = fromJS({
  emailExist: null,
  isLoading: false,
});

function introEmailCheckPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_EMAIL_EXIST_REQUEST:
      return state.set('emailExist', null)
        .set('isLoading', true);
    case CHECK_EMAIL_EXIST_SUCCESS:
      return state.set('emailExist', true)
        .set('isLoading', false);
    case CHECK_EMAIL_EXIST_FAILURE:
      return state.set('emailExist', false)
        .set('isLoading', false);
    default:
      return state;
  }
}

export default introEmailCheckPageReducer;
