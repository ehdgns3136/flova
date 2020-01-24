/**
 * Created by donghoon on 17. 12. 5.
 */
/**
 *
 * User
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import UserFollowButton from 'components/UserFollowButton';
import defaultProfileImage from '../../assets/default-profile.png';
import * as Style from './User.style';

class User extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user, underline, onFollowUserRequest, loggedInUser, onCloseModalRequest } = this.props;
    return (
      <div>
        {
          user ? (
            <Style.SpaceBetweenContainer underline={underline}>
              <Style.Container>
                <Style.To to={`/user/${user.get('id')}`} onClick={onCloseModalRequest}>
                  <Style.ProfileImage src={user.get('profile_image') ? user.get('profile_image') : defaultProfileImage} />
                </Style.To>
                <Style.InfoContainer>
                  <Style.To to={`/user/${user.get('id')}`} onClick={onCloseModalRequest}>
                    <Style.Name>
                      {user.get('name')}
                    </Style.Name>
                  </Style.To>
                  <Style.Description>
                    {user.get('description')}
                  </Style.Description>
                </Style.InfoContainer>
              </Style.Container>
              {
                (loggedInUser && loggedInUser.get('id') !== user.get('id')) ? (
                  <Style.UserFolloweButtonWrapper>
                    <UserFollowButton
                      isFollowing={user.get('is_following')}
                      handleFollowUserRequest={() => onFollowUserRequest(user.get('id'))}
                    />
                  </Style.UserFolloweButtonWrapper>
                ) : (
                  null
                )
              }
            </Style.SpaceBetweenContainer>
          ) : (
            null
          )
        }
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.instanceOf(Immutable.Map),
  underline: PropTypes.bool,
  onFollowUserRequest: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onCloseModalRequest: PropTypes.func,
};

export default User;
