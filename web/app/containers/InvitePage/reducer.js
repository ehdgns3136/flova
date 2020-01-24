/*
 *
 * InvitePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  VALIDATE_INVITE_KEY_REQUEST,
  VALIDATE_INVITE_KEY_SUCCESS,
  VALIDATE_INVITE_KEY_FAILURE,
} from './constants';


const initialState = fromJS({
  inviteKey: null,
  invitedName: null,
  validateError: null,
  isValidating: false,
});


function invitePageReducer(state = initialState, action) {
  switch (action.type) {
    case VALIDATE_INVITE_KEY_REQUEST:
      return state.set('isValidating', true)
        .set('inviteKey', action.inviteKey);
    case VALIDATE_INVITE_KEY_SUCCESS:
      return state.set('isValidating', false)
        .set('invitedName', action.payload.invited_name)
        .set('validateError', null);
    case VALIDATE_INVITE_KEY_FAILURE:
      return state.set('isValidating', false)
        .set('validateError', fromJS(action.error))
        .set('invitedName', null);

    default:
      return state;
  }
}

export default invitePageReducer;
