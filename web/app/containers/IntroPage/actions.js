/*
 *
 * IntroPage actions
 *
 */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SOCIAL_USER_CONTINUE,
  CHECK_SOCIAL_USER_EXIST_REQUEST,
  STORE_TOKEN_REQUEST,
  EMPTY_TOKEN_REQUEST,
} from './constants';

export function loginRequestAction(email, password) {
  return {
    type: LOGIN_REQUEST,
    email,
    password,
  };
}

export function loginSuccessAction() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginFailureAction() {
  return {
    type: LOGIN_FAILURE,
  };
}

export function socialUserContinueRequestAction(token, tokenType) {
  return {
    type: SOCIAL_USER_CONTINUE,
    token,
    tokenType,
  };
}

export function checkSocialUserExistRequestAction(token, tokenType) {
  return {
    type: CHECK_SOCIAL_USER_EXIST_REQUEST,
    token,
    tokenType,
  };
}

export function storeTokenRequestAction(token, tokenType) {
  return {
    type: STORE_TOKEN_REQUEST,
    token,
    tokenType,
  };
}

export function emptyTokenRequestAction() {
  return {
    type: EMPTY_TOKEN_REQUEST,
  };
}
