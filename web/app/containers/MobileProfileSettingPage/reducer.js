/*
 *
 * MobileProfileSettingPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
} from './constants';

const initialState = fromJS({
  isMobileProfileSettingPageLoading: false,
  isMobileProfileSettingPageError: false,
  profile: null,
});

function mobileProfileSettingPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return state.set('isMobileProfileSettingPageLoading', true);
    case GET_PROFILE_SUCCESS:
      return state.set('isMobileProfileSettingPageLoading', false)
        .set('profile', fromJS(action.profile));
    case GET_PROFILE_FAILURE:
      return state.set('isMobileProfileSettingPageLoading', false)
        .set('isMobileProfileSettingPageError', true);
    default:
      return state;
  }
}

export default mobileProfileSettingPageReducer;
