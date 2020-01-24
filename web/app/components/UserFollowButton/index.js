/**
*
* UserFollowButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './index.style';


class UserFollowButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        {
          this.props.isFollowing ? (
              <Style.UnfollowButton onClick={this.props.handleFollowUserRequest} size={this.props.size}>
                <span>팔로우 중</span>
              </Style.UnfollowButton>
            )
            : (
              <Style.FollowButton onClick={this.props.handleFollowUserRequest} size={this.props.size}>
                팔로우
              </Style.FollowButton>
          )
        }
      </div>
    );
  }
}

UserFollowButton.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  handleFollowUserRequest: PropTypes.func.isRequired,
  size: PropTypes.string,
};

export default UserFollowButton;
