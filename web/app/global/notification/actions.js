/**
 * Created by donghoon on 17. 8. 22.
 */
import {
  CONNECT_NOTIFICATION_WEB_SOCKET_REQUEST,
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_UNREAD_NOTIFICATION_COUNT_FAILURE,
  GET_UNREAD_NOTIFICATION_COUNT_REQUEST,
  GET_UNREAD_NOTIFICATION_COUNT_SUCCESS,
  READ_NOTIFICATION_REQUEST,
  UPDATE_LAST_NOTIFICATION_CHECK_REQUEST,
  UPDATE_NEW_NOTIFICATION,
} from './constants';

export function connectNotificationWebSocketRequestAction() {
  return {
    type: CONNECT_NOTIFICATION_WEB_SOCKET_REQUEST,
  };
}

export function getUnreadNotificationCountRequestAction() {
  return {
    type: GET_UNREAD_NOTIFICATION_COUNT_REQUEST,
  };
}

export function getUnreadNotificationCountSuccessAction(unreadNotificationCount) {
  return {
    type: GET_UNREAD_NOTIFICATION_COUNT_SUCCESS,
    unreadNotificationCount,
  };
}

export function getUnreadNotificationCountFailureAction() {
  return {
    type: GET_UNREAD_NOTIFICATION_COUNT_FAILURE,
  };
}

export function getNotificationsRequestAction() {
  return {
    type: GET_NOTIFICATIONS_REQUEST,
  };
}

export function getNotificationsSuccessAction(notificationListNextUrl, notificationList) {
  return {
    type: GET_NOTIFICATIONS_SUCCESS,
    notificationListNextUrl,
    notificationList,
  };
}

export function getNotificationsFailureAction() {
  return {
    type: GET_NOTIFICATIONS_FAILURE,
  };
}

export function updateNewNotification(newNotification) {
  return {
    type: UPDATE_NEW_NOTIFICATION,
    newNotification,
  };
}

export function updateLastNotificationCheckRequestAction(lastNotificationAddedTime) {
  return {
    type: UPDATE_LAST_NOTIFICATION_CHECK_REQUEST,
    lastNotificationAddedTime,
  };
}

export function readNotificationRequestAction(notificationID) {
  return {
    type: READ_NOTIFICATION_REQUEST,
    notificationID,
  };
}
