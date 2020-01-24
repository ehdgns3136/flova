import { fromJS } from 'immutable';
import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
} from './constants';

const initialState = fromJS({
  isMobileCredentialPageLoading: true,
  isMobileCredentialPageError: false,
  profile: null,
});

function mobileCredentialPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return state.set('isMobileCredentialPageLoading', true);
    case GET_PROFILE_SUCCESS:
      return state.set('isMobileCredentialPageLoading', false)
        .set('profile', fromJS(action.profile));
    case GET_PROFILE_FAILURE:
      return state.set('isMobileCredentialPageLoading', false)
        .set('isMobileCredentialPageError', true);
    default:
      return state;
  }
}

export default mobileCredentialPageReducer;
