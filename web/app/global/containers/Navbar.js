import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Navbar from 'components/Navbar';
import {
  readNotificationRequestAction,
  getNotificationsRequestAction,
  updateLastNotificationCheckRequestAction,
} from '../notification/actions';
import {
  makeSelectUnreadNotificationCount,
  makeSelectIsNotificationListPulledBefore,
  makeSelectNotificationList,
  makeSelectIsNotificationListLoading,
  makeSelectNotificationListNextUrl,
} from '../notification/selectors';
import {
  logout,
  updateRedirectPageRequestAction,
  closeAnnounceModalRequestAction,
} from '../actions';
import {
  makeSelectLoggedInUser,
  makeSelectIsAnnounceModalOpened,
  makeSelectAnnounceType,
} from '../selectors';
import {
  openQuestionFormModal,
} from '../models/question/actions';
import {
  makeSelectIsQuestionEditFormModalOpened,
  makeSelectIsQuestionFormModalOpened,
} from '../models/question/selectors';


const mapStateToProps = createStructuredSelector({
  unreadNotificationCount: makeSelectUnreadNotificationCount(),
  isNotificationListPulledBefore: makeSelectIsNotificationListPulledBefore(),
  notificationList: makeSelectNotificationList(),
  isNotificationListLoading: makeSelectIsNotificationListLoading(),
  notificationListNextUrl: makeSelectNotificationListNextUrl(),
  loggedInUser: makeSelectLoggedInUser(),
  isQuestionEditFormModalOpened: makeSelectIsQuestionEditFormModalOpened(),
  isQuestionFormModalOpened: makeSelectIsQuestionFormModalOpened(),
  isAnnounceModalOpened: makeSelectIsAnnounceModalOpened(),
  announceType: makeSelectAnnounceType(),
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
    openQuestionFormModal: (initialTitle) => {
      dispatch(openQuestionFormModal(initialTitle));
    },
    onLogout: () => {
      dispatch(logout());
    },
    updateRedirectPage: (url) => {
      dispatch(updateRedirectPageRequestAction(url));
    },
    onCloseAnnounceModalRequest: () => {
      dispatch(closeAnnounceModalRequestAction());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
