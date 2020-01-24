/*
 *
 * IntroPasswordResetPage actions
 *
 */

import {
  VALIDATE_PASSWORD_RESET_KEY_REQUEST,
  VALIDATE_PASSWORD_RESET_KEY_SUCCESS,
  VALIDATE_PASSWORD_RESET_KEY_FAILURE,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILURE,
} from './constants';

export function validatePasswordResetKeyRequestAction(key) {
  return {
    type: VALIDATE_PASSWORD_RESET_KEY_REQUEST,
    key,
  };
}

export function validatePasswordResetKeySuccessAction(email, key) {
  return {
    type: VALIDATE_PASSWORD_RESET_KEY_SUCCESS,
    email,
    key,
  };
}

export function validatePasswordResetKeyFailureAction() {
  return {
    type: VALIDATE_PASSWORD_RESET_KEY_FAILURE,
  };
}

export function passwordResetRequestAction(password, key) {
  return {
    type: PASSWORD_RESET_REQUEST,
    password,
    key,
  };
}

export function passwordResetSuccessAction() {
  return {
    type: PASSWORD_RESET_SUCCESS,
  };
}

export function passwordResetFailureAction() {
  return {
    type: PASSWORD_RESET_FAILURE,
  };
}
