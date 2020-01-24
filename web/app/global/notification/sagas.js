/**
 * Created by donghoon on 17. 8. 22.
 */
import { take, takeLatest, call, put, select, fork } from 'redux-saga/effects';
import request from 'utils/request';
import { eventChannel, END, buffers } from 'redux-saga';

import {
  makeSelectIsNotificationListPulledBefore,
  makeSelectNotificationListNextUrl,
} from './selectors';
import {
  CONNECT_NOTIFICATION_WEB_SOCKET_REQUEST,
  GET_NOTIFICATIONS_REQUEST,
  GET_UNREAD_NOTIFICATION_COUNT_REQUEST,
  READ_NOTIFICATION_REQUEST,
  UPDATE_LAST_NOTIFICATION_CHECK_REQUEST,
} from './constants';
import {
  getNotificationsFailureAction,
  getNotificationsSuccessAction,
  getUnreadNotificationCountFailureAction,
  getUnreadNotificationCountSuccessAction,
  updateNewNotification
} from './actions';


function createWebSocketConnection(url) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(url);

    socket.onopen = function() {
      resolve(socket);
    };

    socket.onerror = function() {
      reject(new Error('WebSocket rejected'));
    };

    // Call onopen directly if socket is already open
    if (socket.readyState === WebSocket.OPEN) {
      socket.onopen();
    }
  });
}

function createWebSocketChannel(socket, buffer) {
  return eventChannel(emitter => {
    socket.onmessage = function (event) {
      const message = JSON.parse(event.data);
      emitter(message);
    };

    socket.onclose = function (event) {
      emitter(END);
    };

    return () => {
      socket.close();
    };
  }, buffer);
}

export function* connectNotificationWebSocket() {
  try {
    const socket = yield call(createWebSocketConnection, `${WEBSOCKET_ROOT}/notification/?token=${localStorage.getItem('token')}`);
    const socketChannel = yield call(createWebSocketChannel, socket, buffers.expanding(5));

    try {
      while (true) {
        const { unread_count, notification } = yield take(socketChannel);

        yield put(getUnreadNotificationCountSuccessAction(unread_count));

        const isNotificationListPulledBefore = yield select(makeSelectIsNotificationListPulledBefore());

        if (isNotificationListPulledBefore) {
          yield put(updateNewNotification(notification));
        }
      }
    } finally {
      // TODO : websocket connection close되었을 때 새로고침해달라고 에러 메시지 띄우기
      // TODO : reconnect하는 로직도 있으면 좋을듯 .근데 notification data에 문제가 없어야 함.
      console.log('socketChannel closed');
    }
  } catch (err) {
    console.log(err);
  }
}

export function* watchConnectNotificationWebSocketRequestAction() {
  yield takeLatest(CONNECT_NOTIFICATION_WEB_SOCKET_REQUEST, connectNotificationWebSocket);
}

export function* requestGetUnreadNotificationCount() {
  try {
    const { unread_count } = yield call(request, `${API_ROOT}/notification/unread_count/`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    yield put(getUnreadNotificationCountSuccessAction(unread_count));
  } catch (err) {
    console.log(err);
    yield put(getUnreadNotificationCountFailureAction());
  }
}

export function* watchGetUnreadNotificationCountRequestAction() {
  while (true) {
    yield take(GET_UNREAD_NOTIFICATION_COUNT_REQUEST);
    yield call(requestGetUnreadNotificationCount);
  }
}

export function* requestGetNotifications() {
  try {
    const notificationListNextUrl = yield select(makeSelectNotificationListNextUrl());

    const apiUrl = notificationListNextUrl || `${API_ROOT}/notification/notifications/`;

    const { next, results } = yield call(request, apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    yield put(getNotificationsSuccessAction(next, results));
  } catch (err) {
    console.log(err);
    yield put(getNotificationsFailureAction());
  }
}

export function* watchGetNotificationsRequestAction() {
  while (true) {
    yield take(GET_NOTIFICATIONS_REQUEST);
    yield call(requestGetNotifications);
  }
}

export function* requestUpdateLastNotificationCheck(lastNotificationAddedTime) {
  try {
    yield call(request, `${API_ROOT}/notification/update_last_check/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        time: lastNotificationAddedTime,
      }),
    });
  } catch (err) {
    console.log(err)
  }
}

export function* watchUpdateLastNotificationCheckRequestAction() {
  while (true) {
    const { lastNotificationAddedTime } = yield take(UPDATE_LAST_NOTIFICATION_CHECK_REQUEST);
    yield call(requestUpdateLastNotificationCheck, lastNotificationAddedTime)
  }
}

export function* requestReadNotification(notificationID) {
  try {
    yield call(request, `${API_ROOT}/notification/read/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notification_id: notificationID,
      }),
    });
  } catch (err) {
    console.log(err);
  }
}

export function* watchReadNotificationRequestAction() {
  while (true) {
    const { notificationID } = yield take(READ_NOTIFICATION_REQUEST);
    yield call(requestReadNotification, notificationID);
  }
}

// All sagas to be loaded
export default [
  watchConnectNotificationWebSocketRequestAction,
  watchGetUnreadNotificationCountRequestAction,
  watchGetNotificationsRequestAction,
  watchUpdateLastNotificationCheckRequestAction,
  watchReadNotificationRequestAction,
];
