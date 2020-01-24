import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import NotificationList from 'components/NotificationList';

import {
  makeSelectIsNotificationListPulledBefore,
  makeSelectNotificationList,
  makeSelectIsNotificationListLoading,
  makeSelectNotificationListNextUrl,
} from 'global/notification/selectors';
import {
  getNotificationsRequestAction,
  updateLastNotificationCheckRequestAction,
  readNotificationRequestAction,
} from 'global/notification/actions';


const mapStateToProps = createStructuredSelector({
  isNotificationListPulledBefore: makeSelectIsNotificationListPulledBefore(),
  notificationList: makeSelectNotificationList(),
  isNotificationListLoading: makeSelectIsNotificationListLoading(),
  notificationListNextUrl: makeSelectNotificationListNextUrl(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestGetNotifications: () => {
      dispatch(getNotificationsRequestAction());
    },
    requestUpdateLastNotificationCheck: (lastNotificationAddedTime) => {
      dispatch(updateLastNotificationCheckRequestAction(lastNotificationAddedTime));
    },
    requestReadNotification: (notificationID) => {
      dispatch(readNotificationRequestAction(notificationID));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);
