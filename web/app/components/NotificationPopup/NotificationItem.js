import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import moment from 'moment';
import { browserHistory } from 'react-router';

import DEFAULT_IMAGE from 'assets/default-profile.png';
import { getUrl, getDescription, getProfileImage } from 'utils/notification';

import * as Style from './NotificationItem.style';


class NotificationItem extends React.Component {
  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(notificationID, url) {
    this.props.requestReadNotification(notificationID);
    browserHistory.push(url);
  }

  render() {
    const { notification } = this.props;

    const url = getUrl(notification);
    const description = getDescription(notification);
    const profileImage = getProfileImage(notification);

    return (
      <Style.NotificationContainer
        isRead={notification.get('read')}
        onClick={() => { this.onItemClick(notification.get('id'), url); }}
      >
        <Style.ProfileImage src={profileImage || DEFAULT_IMAGE} />
        <Style.RightContainer>
          <Style.NotificationText>{description}</Style.NotificationText>
          <Style.DateMeta>{moment(notification.get('added_time')).fromNow()}</Style.DateMeta>
        </Style.RightContainer>
      </Style.NotificationContainer>
    );
  }
}

NotificationItem.propTypes = {
  notification: PropTypes.instanceOf(Immutable.Map).isRequired,
  requestReadNotification: PropTypes.func.isRequired,
};

export default NotificationItem;
