import { call, put, take, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { browserHistory } from 'react-router';

import {
  connectNotificationWebSocketRequestAction,
  getUnreadNotificationCountRequestAction,
} from './notification/actions';
import {
  GET_FOLLOWING_TOPICS_REQUEST,
  GET_MAIN_SEARCH_REQUEST,
  SEND_LOGIN_SIGNAL,
  UPDATE_USER_INFO_REQUEST,
  LOGOUT,
  OPEN_ANNOUNCE_MODAL_REQUEST,
} from './constants';
import {
  authInvalidAction,
  getFollowingTopicsRequestAction,
  getFollowingTopicsSuccessAction,
  getMainSearchFailure,
  getMainSearchSuccess,
  sendLoginSignalAction,
  updateUserInfoSuccessAction,
} from './actions';
import {
  registerServiceWorker,
  unsubscribeClient,
} from '../utils/service-worker-notification';

export function* watchGetUserInfoRequest() {
  yield takeLatest(UPDATE_USER_INFO_REQUEST, checkAuth);
}
// Individual exports for testing

function gtag() { dataLayer.push(arguments); }

export function* checkAuth() {
  const token = localStorage.getItem('token');

  if (!token) {
    yield put(authInvalidAction());
  } else {
    try {
      const loggedInUser = yield call(request, `${API_ROOT}/user/info/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      gtag('set', { 'user_id': loggedInUser.id });
      yield put(updateUserInfoSuccessAction(loggedInUser));
      yield put(sendLoginSignalAction());
    } catch (err) {
      yield put(authInvalidAction());
      localStorage.removeItem('token');
    }
  }
}

export function* loginSignalCallback() {
  yield put(getUnreadNotificationCountRequestAction());
  yield put(connectNotificationWebSocketRequestAction());
  yield put(getFollowingTopicsRequestAction());
  if ('serviceWorker' in navigator) {
    yield call(registerServiceWorker);
  }
}

export function* watchSendLoginSignalAction() {
  yield takeLatest(SEND_LOGIN_SIGNAL, loginSignalCallback);
}

export function* getFollowingTopics() {
  try {
    const topics = yield call(request, `${API_ROOT}/topic/get_following_topics/`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

    yield put(getFollowingTopicsSuccessAction(topics));
  } catch (err) {
    console.log(err);
  }
}

export function* watchGetFollowingTopicsRequestAction() {
  while (true) {
    yield take(GET_FOLLOWING_TOPICS_REQUEST);
    yield call(getFollowingTopics);
  }
}

export function* getMainSearch({ searchText }) {
  try {
    const results = yield call(request, `${API_ROOT}/search/main/?q=${searchText}`, {
      method: 'GET',
    });
    yield put(getMainSearchSuccess(results));
  } catch (err) {
    yield put(getMainSearchFailure());
  }
}

export function* watchGetMainSearchRequestAction() {
  yield takeLatest(GET_MAIN_SEARCH_REQUEST, getMainSearch);
}

export function* logout() {
  if ('serviceWorker' in navigator) {
    unsubscribeClient();
  }
  browserHistory.push('/intro');
}

export function* watchLogout() {
  while (true) {
    yield take(LOGOUT);
    yield call(logout);
  }
}

export function* requestS3Upload(element) {
  try {
    const blob = yield call(xhrHelper, element);
    const base64 = yield call(blobToBase64, blob);

    const { uploaded_url } = yield call(request, `${API_ROOT}/s3/upload/image/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        src: base64,
      }),
    });
    return uploaded_url;
  } catch (err) {
    console.log(err);
  }
}

function xhrHelper(element) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', element, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      if (this.status === 200) {
        const blob = this.response;
        resolve(blob);
      }
    };
    xhr.send();
  });
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      resolve(reader.result);
    };
  });
}

export function* requestOpenAnnounceModal() {
  try {
    yield call(request, `${API_ROOT}/user/set_first_answerer_false/`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export function* watchOpenAnnounceModalRequestAction() {
  while (true) {
    yield take(OPEN_ANNOUNCE_MODAL_REQUEST);
    yield call(requestOpenAnnounceModal);
  }
}

// All sagas to be loaded
export default [
  checkAuth,
  watchSendLoginSignalAction,
  watchGetFollowingTopicsRequestAction,
  watchGetMainSearchRequestAction,
  watchGetUserInfoRequest,
  watchLogout,
  watchOpenAnnounceModalRequestAction,
];
