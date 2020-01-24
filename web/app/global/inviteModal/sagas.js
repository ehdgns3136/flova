import { take, call, put } from 'redux-saga/effects';
import request from 'utils/request';

import {
  createInviteKeySuccess,
  createInviteKeyFailure,
} from './actions';
import {
  CREATE_INVITE_KEY_REQUEST,
} from './constants';


export function* createInviteKey(invitedName) {
  try {
    const payload = yield call(request, `${API_ROOT}/user/invite_key/`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : undefined,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        invited_name: invitedName,
      }),
    });
    yield put(createInviteKeySuccess(payload));
  } catch (err) {
    console.log(err);
    yield put(createInviteKeyFailure(err));
  }
}

export function* watchCreateInviteKeyRequest() {
  while (true) {
    const { invitedName } = yield take(CREATE_INVITE_KEY_REQUEST);
    yield call(createInviteKey, invitedName);
  }
}

// All sagas to be loaded
export default [
  watchCreateInviteKeyRequest,
];
