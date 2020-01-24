/**
*
* NotificationList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import { Loader } from 'semantic-ui-react';
import InfiniteScroll from 'components/InfiniteScroll';

import NotificationItem from './NotificationItem';
import * as Style from './index.style';


class NotificationList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (!this.props.isNotificationListPulledBefore) {
      this.props.requestGetNotifications();
    }

    if (this.props.notificationList.count() > 0) {
      this.props.requestUpdateLastNotificationCheck(this.props.notificationList.get(0).get('added_time'));
    }
  }

  render() {
    return (
      <Style.NotificationListContainer>
        <Style.Header>
          알림
        </Style.Header>
        {
          this.props.notificationList.map((notification) =>
            <NotificationItem key={notification.get('id')} notification={notification} requestReadNotification={this.props.requestReadNotification} />
          )
        }
        {
          (this.props.notificationList.count() === 0) ? (
            (this.props.isNotificationListLoading) ? (
              <Style.LoaderWrapper>
                <Loader active />
              </Style.LoaderWrapper>
            ) : (
              <Style.GreyCenteredDiv>
                아직 알림이 없습니다.
              </Style.GreyCenteredDiv>
            )
          ) : null
        }
        {
          (this.props.notificationListNextUrl) ?
            <InfiniteScroll
              loadMore={this.props.requestGetNotifications}
              hasMore={this.props.notificationListNextUrl != null}
              isLoading={this.props.isNotificationListLoading}
            />
            : null
        }
      </Style.NotificationListContainer>
    );
  }
}

NotificationList.propTypes = {
  isNotificationListPulledBefore: PropTypes.bool.isRequired,
  notificationList: PropTypes.instanceOf(Immutable.Iterable),
  isNotificationListLoading: PropTypes.bool.isRequired,
  notificationListNextUrl: PropTypes.string,
  requestGetNotifications: PropTypes.func.isRequired,
  requestUpdateLastNotificationCheck: PropTypes.func.isRequired,
  requestReadNotification: PropTypes.func.isRequired,
};

export default NotificationList;
