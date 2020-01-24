/*
 *
 * Global reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_UNREAD_NOTIFICATION_COUNT_SUCCESS,
  READ_NOTIFICATION_REQUEST,
  UPDATE_LAST_NOTIFICATION_CHECK_REQUEST,
  UPDATE_NEW_NOTIFICATION
} from './constants';


const initialState = fromJS({
  unreadNotificationCount: null,
  notificationList: [],
  isNotificationListPulledBefore: false, // 이미 한 번 데이터를 받아왔었는지에 대한 정보. 이것을 이용해 처음에 알림창을 열었을 때만 request를 날리게 한다.
  isNotificationListLoading: false,
  notificationListNextUrl: null,
});


function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_UNREAD_NOTIFICATION_COUNT_SUCCESS:
      return state.set('unreadNotificationCount', action.unreadNotificationCount);
    case GET_NOTIFICATIONS_REQUEST: {
      // reset unreadNotificationCount when first pulled
      const newState = (state.get('isNotificationListPulledBefore')) ? state : state.set('unreadNotificationCount', 0);

      return newState.set('isNotificationListPulledBefore', true)
        .set('isNotificationListLoading', true);
    }
    case GET_NOTIFICATIONS_SUCCESS:
      return state.set('isNotificationListLoading', false)
        .set('notificationListNextUrl', action.notificationListNextUrl)
        .set('notificationList', state.get('notificationList').concat(fromJS(action.notificationList)));
    case GET_NOTIFICATIONS_FAILURE:
      return state.set('isNotificationListLoading', false);
    case UPDATE_NEW_NOTIFICATION: {
      let notificationList = state.get('notificationList');

      // delete older notification
      notificationList = notificationList.filter((notificationItem) =>
        (notificationItem.get('id') !== action.newNotification.id)
      );

      return state.set('notificationList', notificationList.unshift(fromJS(action.newNotification)));
    }
    case UPDATE_LAST_NOTIFICATION_CHECK_REQUEST:
      return state.set('unreadNotificationCount', 0);
    case READ_NOTIFICATION_REQUEST: {
      let notificationList = state.get('notificationList');

      notificationList = notificationList.update(
        notificationList.findIndex((notification) => (notification.get('id') === action.notificationID)),
        (notification) => notification.set('read', true)
      );

      return state.set('notificationList', notificationList);
    }
    default:
      return state;
  }
}

export default notificationReducer;
