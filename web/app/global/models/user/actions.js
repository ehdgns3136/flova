/**
 * Created by heesu on 17. 11. 15.
 */
import {
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
} from './constants';

export function followUserRequest(userId) {
  return {
    type: FOLLOW_USER_REQUEST,
    userId,
  };
}

export function followUserSuccess(profile, userId) {
  return {
    type: FOLLOW_USER_SUCCESS,
    profile,
    userId,
  };
}

export function followUserFailure(userId) {
  return {
    type: FOLLOW_USER_FAILURE,
    userId,
  };
}
