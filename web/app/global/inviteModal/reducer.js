import { fromJS } from 'immutable';
import {
  OPEN_INVITE_MODAL,
  CLOSE_INVITE_MODAL,
  CREATE_INVITE_KEY_FAILURE,
  CREATE_INVITE_KEY_REQUEST,
  CREATE_INVITE_KEY_SUCCESS,
} from './constants';

const initialState = fromJS({
  isOpened: false,
  isCreating: false,
  inviteKey: null,
  error: null,
});


function editQuestionReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_INVITE_MODAL:
      return state.set('isOpened', true);
    case CLOSE_INVITE_MODAL:
      return state.set('isOpened', false);


    case CREATE_INVITE_KEY_REQUEST:
      return state.set('isCreating', true);
    case CREATE_INVITE_KEY_SUCCESS:
      return state.set('isCreating', false).set('inviteKey', action.payload.invite_key);
    case CREATE_INVITE_KEY_FAILURE:
      return state.set('isCreating', false)
        .set('inviteKey', null)
        .set('error', fromJS(action.error));
    default:
      return state;
  }
}

export default editQuestionReducer;
