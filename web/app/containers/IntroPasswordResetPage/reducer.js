/*
 *
 * IntroPasswordResetPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  VALIDATE_PASSWORD_RESET_KEY_REQUEST,
  VALIDATE_PASSWORD_RESET_KEY_SUCCESS,
  VALIDATE_PASSWORD_RESET_KEY_FAILURE,
} from './constants';

const initialState = fromJS({
  email: '',
  validate: null,
  validateLoading: true,
  passwordKey: '',
});

function passwordResetPageReducer(state = initialState, action) {
  switch (action.type) {
    case VALIDATE_PASSWORD_RESET_KEY_REQUEST:
      return state.set('validateLoading', true);
    case VALIDATE_PASSWORD_RESET_KEY_SUCCESS:
      return state.set('email', action.email).set('validate', true).set('validateLoading', false).set('passwordKey', action.key);
    case VALIDATE_PASSWORD_RESET_KEY_FAILURE:
      return state.set('validate', false).set('validateLoading', false);
    default:
      return state;
  }
}

export default passwordResetPageReducer;
