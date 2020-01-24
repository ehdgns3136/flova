/*
 *
 * IntroPage actions
 *
 */

import {
  CHECK_EMAIL_EXIST_REQUEST,
  CHECK_EMAIL_EXIST_SUCCESS,
  CHECK_EMAIL_EXIST_FAILURE,
} from './constants';

export function checkEmailExistRequestAction(email) {
  return {
    type: CHECK_EMAIL_EXIST_REQUEST,
    email,
  };
}

export function checkEmailExistSuccessAction() {
  return {
    type: CHECK_EMAIL_EXIST_SUCCESS,
  };
}

export function checkEmailExistFailureAction() {
  return {
    type: CHECK_EMAIL_EXIST_FAILURE,
  };
}
