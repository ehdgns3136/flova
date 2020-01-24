import { take, call, put, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import request from 'utils/request';

import {
  updateUserInfoRequestAction,
  updateRedirectPageRequestAction,
  storeAccessTokenRequestAction,
  emptyAccessTokenRequestAction,
} from 'global/actions';

import {
  makeSelectRedirectPage,
} from 'global/selectors';

import {
  LOGIN_REQUEST,
  SOCIAL_USER_CONTINUE,
  CHECK_SOCIAL_USER_EXIST_REQUEST,
} from './constants';

import {
  loginSuccessAction,
  loginFailureAction,
  socialUserContinueRequestAction,
} from './actions';

import {
  moveToTopicAction,
  moveToTermsAction,
} from '../IntroSignUpPage/actions';


export function* requestLogin(email, password) {
  try {
    const { token } = yield call(request, `${API_ROOT}/user/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password,
      }),
    });

    localStorage.setItem('token', token);
    yield put(loginSuccessAction());
    yield put(updateUserInfoRequestAction());

    const url = yield select(makeSelectRedirectPage());
    if (url) {
      yield put(updateRedirectPageRequestAction(''));
      browserHistory.push(url);
    } else {
      browserHistory.push('/');
    }
  } catch (err) {
    console.log(err);
    yield put(loginFailureAction());
  }
}

export function* watchLoginRequestAction() {
  while (true) {
    const { email, password } = yield take(LOGIN_REQUEST);
    yield call(requestLogin, email, password);
  }
}

export function* requestSocialUserContinue(clientToken, tokenType) {
  try {
    const { token, new_user: newUser } = yield call(request, `${API_ROOT}/user/social/continue/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_token: clientToken,
        token_type: tokenType,
      }),
    });
    localStorage.setItem('token', token);
    yield put(loginSuccessAction());
    if (newUser === true) {
      // call at the sign up page's social login, so sign up page redux exist
      yield put(moveToTopicAction());
      yield put(emptyAccessTokenRequestAction());
    } else {
      yield put(updateUserInfoRequestAction());

      const url = yield select(makeSelectRedirectPage());
      if (url) {
        yield put(updateRedirectPageRequestAction(''));
        browserHistory.push(url);
      } else {
        browserHistory.push('/');
      }
    }
  } catch (err) {
    console.log(err);
    yield put(loginFailureAction());
  }
}

export function* watchSocialUserContinueRequestAction() {
  while (true) {
    const { token, tokenType } = yield take(SOCIAL_USER_CONTINUE);
    yield call(requestSocialUserContinue, token, tokenType);
  }
}

export function* requestCheckSocialUserExistRequestAction(token, tokenType) {
  try {
    const { exist } = yield call(request, `${API_ROOT}/user/check_social_user_exist/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        type: tokenType,
      }),
    });
    if (exist) {
      yield put(socialUserContinueRequestAction(token, tokenType));
    } else {
      yield put(storeAccessTokenRequestAction(token, tokenType));
      browserHistory.push('/signup');
      yield put(moveToTermsAction()); // prepare back to login page from sign up page's sign up form
    }
  } catch (err) {
    console.log(err);
  }
}

export function* watchCheckSocialUserExistRequestAction() {
  while (true) {
    const { token, tokenType } = yield take(CHECK_SOCIAL_USER_EXIST_REQUEST);
    yield call(requestCheckSocialUserExistRequestAction, token, tokenType);
  }
}

export default [
  watchLoginRequestAction,
  watchSocialUserContinueRequestAction,
  watchCheckSocialUserExistRequestAction,
];

