/**
*
* LikerModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ActionUserList from 'components/ActionUserList';
import Immutable from 'immutable';

import * as Style from './index.style';


class LikerModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { isLikerModalOpened, onCloseLikerModalRequest, likers, onFollowUserRequest, loggedInUser, isLikersLoading } = this.props;
    return (
      <Style.CustomModal open={isLikerModalOpened} onClose={() => onCloseLikerModalRequest()}>
        <Style.CloseIcon name="close" onClick={onCloseLikerModalRequest} ></Style.CloseIcon>
        <Style.CustomHeader>이 답변을 좋아요한 유저</Style.CustomHeader>
        <Style.Content>
          <ActionUserList
            users={likers}
            onFollowUserRequest={onFollowUserRequest}
            loggedInUser={loggedInUser}
            onCloseModalRequest={onCloseLikerModalRequest}
            isUsersLoading={isLikersLoading}
          />
        </Style.Content>
      </Style.CustomModal>
    );
  }
}

LikerModal.propTypes = {
  isLikerModalOpened: PropTypes.bool.isRequired,
  onCloseLikerModalRequest: PropTypes.func.isRequired,
  likers: PropTypes.instanceOf(Immutable.List),
  onFollowUserRequest: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  isLikersLoading: PropTypes.bool.isRequired,
};

export default LikerModal;
