import { take, call, put, takeEvery, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import request from 'utils/request';

import {
  updateUserInfoRequestAction,
  updateRedirectPageRequestAction,
  getFollowingTopicsRequestAction,
} from 'global/actions';

import {
  makeSelectRedirectPage,
} from 'global/selectors';

import {
  SIGN_UP_REQUEST,
  LOAD_TOPICS_REQUEST,
  ADD_TOPICS_TO_USER_REQUEST,
  SIGN_UP_SUCCESS_REDIRECT_REQUEST,
} from './constants';

import {
  signUpSuccessAction,
  signUpFailureAction,
  moveToTopicAction,
  loadTopicsSuccessAction,
  setTopicsEmptyAction,
} from './actions';

// sign up
export function* requestSignUp(email, password, name) {
  try {
    const { token } = yield call(request, `${API_ROOT}/user/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
    yield put(signUpSuccessAction());
    localStorage.setItem('token', token);
    yield put(updateUserInfoRequestAction());
    yield put(moveToTopicAction());

  } catch (err) {
    console.log(err);
    if (err.data && err.data.email && err.data.email.length) {
      yield put(signUpFailureAction(err.data.email[0]));
    } else {
      yield put(signUpFailureAction('알 수 없는 오류. 관리자에게 문의해주세요.'));
    }
  }
}

export function* watchSignUpRequestAction() {
  while (true) {
    const { email, password, name } = yield take(SIGN_UP_REQUEST);
    yield call(requestSignUp, email, password, name);
  }
}

export function* requestSignUpSuccessRedirect() {
  const url = yield select(makeSelectRedirectPage());

  yield put(updateUserInfoRequestAction());
  yield put(setTopicsEmptyAction());
  if (url) {
    yield put(updateRedirectPageRequestAction(''));
    browserHistory.push(url);
  } else {
    browserHistory.push('/');
  }
}

export function* watchSignUpSuccessRedirectRequestAction() {
  while (true) {
    yield take(SIGN_UP_SUCCESS_REDIRECT_REQUEST);
    yield call(requestSignUpSuccessRedirect);
  }
}

// topic form
export function* requestLoadTopics() {
  try {
    const topicList = yield call(request, `${API_ROOT}/topic/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    yield put(loadTopicsSuccessAction(topicList));
  } catch (err) {
    console.log(err);
  }
}

export function* watchLoadTopicsRequestAction() {
  yield takeEvery(LOAD_TOPICS_REQUEST, requestLoadTopics);
}

export function* requestAddTopicsToUser(selectedTopicItemList) {
  try {
    yield call(request, `${API_ROOT}/topic/add_topics_to_user/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedTopicItemList),
    });
    yield put(getFollowingTopicsRequestAction());
  } catch (err) {
    console.log(err);
  }
}

export function* watchAddTopicsToUserRequestAction() {
  while (true) {
    const { selectedTopicItemList } = yield take(ADD_TOPICS_TO_USER_REQUEST);
    yield call(requestAddTopicsToUser, selectedTopicItemList);
  }
}

export default [
  watchSignUpRequestAction,
  watchLoadTopicsRequestAction,
  watchAddTopicsToUserRequestAction,
  watchSignUpSuccessRedirectRequestAction,
];

