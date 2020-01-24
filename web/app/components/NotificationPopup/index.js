import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import { Loader } from 'semantic-ui-react';
import InfiniteScroll from 'components/InfiniteScroll';

import NotificationItem from './NotificationItem';
import * as Style from './index.style';


class NotificationPopup extends React.Component {
  render() {
    return (
      <Style.NotificationPopupContainer>
        <Style.NotificationPopupHeader>
          알림
        </Style.NotificationPopupHeader>
        <Style.NotificationListContainer>
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
                isInScrollableArea
              />
              : null
          }
        </Style.NotificationListContainer>
        <Style.NotificationPopupFooter>
          <Style.StyledLink to="/notification">모두 보기</Style.StyledLink>
        </Style.NotificationPopupFooter>
      </Style.NotificationPopupContainer>
    );
  }
}

NotificationPopup.propTypes = {
  notificationList: PropTypes.instanceOf(Immutable.Iterable),
  isNotificationListLoading: PropTypes.bool.isRequired,
  notificationListNextUrl: PropTypes.string,
  requestReadNotification: PropTypes.func.isRequired,
  requestGetNotifications: PropTypes.func.isRequired,
};

export default NotificationPopup;
