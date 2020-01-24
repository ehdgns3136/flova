import { take, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';

import {
  CHECK_EMAIL_EXIST_REQUEST,
} from './constants';

import {
  checkEmailExistSuccessAction,
  checkEmailExistFailureAction,
} from './actions';

export function* requestCheckEmailExistRequestAction(email) {
  try {
    yield call(request, `${API_ROOT}/user/check_email_exist/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });
    yield put(checkEmailExistSuccessAction());
  } catch (err) {
    console.log(err);
    yield put(checkEmailExistFailureAction());
  }
}

export function* watchCheckEmailExistRequestAction() {
  while (true) {
    const { email } = yield take(CHECK_EMAIL_EXIST_REQUEST);
    yield call(requestCheckEmailExistRequestAction, email);
  }
}

export default [
  watchCheckEmailExistRequestAction,
];

