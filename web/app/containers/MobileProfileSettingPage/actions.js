/*
 *
 * MobileProfileSettingPage actions
 *
 */

import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
} from './constants';

export function getProfileRequest(id) {
  return {
    type: GET_PROFILE_REQUEST,
    id,
  };
}

export function getProfileSuccess(profile) {
  return {
    type: GET_PROFILE_SUCCESS,
    profile,
  };
}

export function getProfileFailure() {
  return {
    type: GET_PROFILE_FAILURE,
  };
}
