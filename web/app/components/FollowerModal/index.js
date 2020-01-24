/**
*
* FollowerModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ActionUserList from 'components/ActionUserList';
import Immutable from 'immutable';
import * as Style from './index.style';


class FollowerModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { isFollowerModalOpened, onCloseFollowerModalRequest, followers, onFollowUserRequest, loggedInUser, isFollowersLoading } = this.props;
    return (
      <Style.CustomModal open={isFollowerModalOpened} onClose={() => onCloseFollowerModalRequest()}>
        <Style.CloseIcon name="close" onClick={onCloseFollowerModalRequest} ></Style.CloseIcon>
        <Style.CustomHeader>이 질문을 팔로우한 유저</Style.CustomHeader>
        <Style.Content>
          <ActionUserList
            users={followers}
            onFollowUserRequest={onFollowUserRequest}
            loggedInUser={loggedInUser}
            onCloseModalRequest={onCloseFollowerModalRequest}
            isUsersLoading={isFollowersLoading}
          />
        </Style.Content>
      </Style.CustomModal>
    );
  }
}

FollowerModal.propTypes = {
  isFollowerModalOpened: PropTypes.bool.isRequired,
  onCloseFollowerModalRequest: PropTypes.func.isRequired,
  followers: PropTypes.instanceOf(Immutable.List),
  onFollowUserRequest: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  isFollowersLoading: PropTypes.bool.isRequired,
};

export default FollowerModal;
