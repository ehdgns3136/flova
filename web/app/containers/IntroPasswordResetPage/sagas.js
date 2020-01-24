import { take, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { browserHistory } from 'react-router';
import {
  showToastRequest,
} from 'global/actions';

import {
  VALIDATE_PASSWORD_RESET_KEY_REQUEST,
  PASSWORD_RESET_REQUEST,
} from './constants';

import {
  validatePasswordResetKeySuccessAction,
  validatePasswordResetKeyFailureAction,
  passwordResetSuccessAction,
  passwordResetFailureAction,
} from './actions';

export function* requestValidatePasswordResetRequestAction(key) {
  try {
    const { email } = yield call(request, `${API_ROOT}/user/validate_password_reset_key/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
      }),
    });
    yield put(validatePasswordResetKeySuccessAction(email, key));
  } catch (err) {
    console.log(err);
    yield put(validatePasswordResetKeyFailureAction());
  }
}

export function* watchValidatePasswordResetRequestAction() {
  while (true) {
    const { key } = yield take(VALIDATE_PASSWORD_RESET_KEY_REQUEST);
    yield call(requestValidatePasswordResetRequestAction, key);
  }
}

export function* requestPasswordResetRequestAction(password, key) {
  try {
    yield call(request, `${API_ROOT}/user/reset_password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        key,
      }),
    });
    yield put(passwordResetSuccessAction());
    browserHistory.push('/intro');
    yield put(showToastRequest('SUCCESS', '비밀번호 변경 성공', '비밀번호가 성공적으로 변경되었습니다.'));
  } catch (err) {
    console.log(err);
    if (err.data) {
      yield put(showToastRequest('ERROR', '비밀번호 변경 실패', err.data));
    } else {
      yield put(showToastRequest('ERROR', '비밀번호 변경 실패', '알 수 없는 오류. 관리자에게 문의해주세요.'));
    }
    yield put(passwordResetFailureAction());
  }
}

export function* watchPasswordResetRequestAction() {
  while (true) {
    const { password, key } = yield take(PASSWORD_RESET_REQUEST);
    yield call(requestPasswordResetRequestAction, password, key);
  }
}

// All sagas to be loaded
export default [
  watchValidatePasswordResetRequestAction,
  watchPasswordResetRequestAction,
];
