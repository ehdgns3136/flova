/*
 *
 * IntroPage actions
 *
 */

import {
  VALIDATE_INVITE_KEY_FAILURE,
  VALIDATE_INVITE_KEY_REQUEST,
  VALIDATE_INVITE_KEY_SUCCESS,
} from './constants';

export function validateInviteKeyRequest(inviteKey) {
  return {
    type: VALIDATE_INVITE_KEY_REQUEST,
    inviteKey,
  };
}

export function validateInviteKeySuccess(payload) {
  return {
    type: VALIDATE_INVITE_KEY_SUCCESS,
    payload,
  };
}

export function validateInviteKeyFailure(error) {
  return {
    type: VALIDATE_INVITE_KEY_FAILURE,
    error,
  };
}
