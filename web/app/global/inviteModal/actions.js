import {
  OPEN_INVITE_MODAL,
  CLOSE_INVITE_MODAL,
  CREATE_INVITE_KEY_FAILURE,
  CREATE_INVITE_KEY_REQUEST,
  CREATE_INVITE_KEY_SUCCESS,
} from './constants';


export function openInviteModal() {
  return {
    type: OPEN_INVITE_MODAL,
  };
}

export function closeInviteModal() {
  return {
    type: CLOSE_INVITE_MODAL,
  };
}

export function createInviteKeyRequest(invitedName) {
  return {
    type: CREATE_INVITE_KEY_REQUEST,
    invitedName,
  };
}

export function createInviteKeySuccess(payload) {
  return {
    type: CREATE_INVITE_KEY_SUCCESS,
    payload,
  };
}

export function createInviteKeyFailure(error) {
  return {
    type: CREATE_INVITE_KEY_FAILURE,
    error,
  };
}
