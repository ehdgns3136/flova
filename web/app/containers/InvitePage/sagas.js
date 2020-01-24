import { take, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import {
  VALIDATE_INVITE_KEY_REQUEST,
} from './constants';

import {
  validateInviteKeySuccess,
  validateInviteKeyFailure,
} from './actions';

export function* validateInviteKey(inviteKey) {
  try {
    const payload = yield call(request, `${API_ROOT}/user/invite_key/validate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        invite_key: inviteKey,
      }),
    });
    yield put(validateInviteKeySuccess(payload));
  } catch (err) {
    console.log(err);
    yield put(validateInviteKeyFailure(err));
  }
}

export function* watchValidateInviteKeyRequest() {
  while (true) {
    const { inviteKey } = yield take(VALIDATE_INVITE_KEY_REQUEST);
    yield call(validateInviteKey, inviteKey);
  }
}

export default [
  watchValidateInviteKeyRequest,
];

