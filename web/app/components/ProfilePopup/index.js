/**
*
* ProfilePopup
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react';
import { Link } from 'react-router';
import Immutable from 'immutable';
import { CustomPopup } from 'components/CustomPopup';
import UserFollowButton from 'components/UserFollowButton';
import * as Style from './index.style';
import defaultProfileImg from '../../assets/default-profile.png';


class ProfilePopup extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleFollowUserRequest = this.handleFollowUserRequest.bind(this);
  }

  handleFollowUserRequest() {
    this.props.onFollowUserRequest(this.props.user.get('id'));
  }

  render() {
    const { user } = this.props;

    return (
      <CustomPopup
        closeOnInsideClick={false}
        wrapElement={<span />}
        trigger={this.props.trigger}
        arrowPositionRight="145px"
        marginTop="20px"
        isHoverTrigger
      >
        <Style.ProfilePopupContainer paddingBottom={this.props.loggedInUser ? (user.get('id') === this.props.loggedInUser.get('id')) : false} >
          <Style.PopupFlex>
            <Link to={`/user/${user.get('id')}`}>
              {
                (user.get('profile_image')) ?
                  (<Style.PopupProfileImage src={user.get('profile_image')} />)
                  : (<Style.PopupProfileImage src={defaultProfileImg} />)
              }
            </Link>
            <Style.PopupUserInfo>
              <Style.PopupWriterName to={`/user/${user.get('id')}`}>
                {user.get('name')}
              </Style.PopupWriterName>
              <Style.PopupDescription>
                {user.get('description')}
              </Style.PopupDescription>
            </Style.PopupUserInfo>
          </Style.PopupFlex>
          {
            (user.get('string_credentials').count() > 0) ? (
              <div>
                <Divider />
                {
                  user.get('string_credentials').map((credential, index) => {
                    let Icon;
                    if (credential.get('type') === 'education') {
                      Icon = <Style.CredentialIcon name="student" />;
                    } else if (credential.get('type') === 'employment') {
                      Icon = <Style.CredentialIcon name="suitcase" />;
                    } else {
                      Icon = <Style.CredentialIcon name="user" />;
                    }
                    if (index < 3) {
                      return (
                        <Style.UserInfoElement key={credential.get('id')}>
                          {Icon}
                          {credential.get('to_string')}
                        </Style.UserInfoElement>
                      );
                    } else {
                      return null;
                    }
                  })
                }
              </div>
            ) : (
                null
              )
          }
          <Divider />
          <Style.PopupFlex>
            <Style.FollowerInfo>
              {user.get('follower_num')} 명의 사람이 팔로우 중
          </Style.FollowerInfo>
            {
              this.props.loggedInUser && user.get('id') !== this.props.loggedInUser.get('id') ? (
                (
                  <Style.UserFollowButtonContainer>
                    <UserFollowButton
                      isFollowing={user.get('is_following')}
                      handleFollowUserRequest={this.handleFollowUserRequest}
                    />
                  </Style.UserFollowButtonContainer>
                )
              ) : null
            }
          </Style.PopupFlex>
        </Style.ProfilePopupContainer>
      </CustomPopup>
    );
  }
}

ProfilePopup.propTypes = {
  trigger: PropTypes.node.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onFollowUserRequest: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Immutable.Map),
};

export default ProfilePopup;
