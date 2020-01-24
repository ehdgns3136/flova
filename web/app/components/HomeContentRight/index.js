import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router';
import InviteBox from 'components/InviteBox';

import * as Style from './index.style';
import defaultProfileImg from '../../assets/default-profile.png';


class HomeContentRight extends React.Component {
  getStatusIcon(status) {
    switch (status) {
      case 'DOING':
        return 'ellipsis horizontal';
      case 'DONE':
        return 'checkmark';
      default:
        return null;
    }
  }

  render() {
    const { loggedInUser, onOpenInviteModal } = this.props;

    return (
      <Style.MediaDiv>
        {
          loggedInUser ? (
            <Style.ProfileContainer>
              <Style.Profile>
                <Link to={`/user/${loggedInUser.get('id')}`}>
                  {
                    (loggedInUser.get('profile_image')) ? (
                      <Style.ProfileImage src={loggedInUser.get('profile_image')} />
                    ) : (
                        <Style.ProfileImage src={defaultProfileImg} />
                      )
                  }
                </Link>
                <Style.NameContainer>
                  <Style.Name to={`/user/${loggedInUser.get('id')}`}>
                    {loggedInUser.get('name')}
                  </Style.Name>
                  <Style.Description>
                    {loggedInUser.get('description')}
                  </Style.Description>
                </Style.NameContainer>
              </Style.Profile>
              <Style.Summary>
                <Style.SummaryElement>
                  <Icon name="users" />
                  &nbsp;&nbsp;
                  팔로워
                  &nbsp;&nbsp;
                  {loggedInUser.get('follower_num')}
                </Style.SummaryElement>
                <Style.SummaryElement>
                  <Icon name="thumbs outline up" />
                  &nbsp;&nbsp;
                  좋아요
                  &nbsp;&nbsp;
                  {loggedInUser.get('answer_likes')}
                </Style.SummaryElement>
                <Style.SummaryElement>
                  <Icon name="pencil" />
                  &nbsp;&nbsp;
                  답변
                  &nbsp;&nbsp;
                  {loggedInUser.get('answer_num')}
                </Style.SummaryElement>
              </Style.Summary>
            </Style.ProfileContainer>
          ) : (
              null
            )
        }
      </Style.MediaDiv>
    );
  }
}

HomeContentRight.propTypes = {
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onOpenInviteModal: PropTypes.func.isRequired,
};

export default HomeContentRight;
