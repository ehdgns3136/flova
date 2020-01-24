import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import DEFAULT_TOPIC_IMAGE from '../../assets/topic_image.png';
import DEFAULT_PROFILE_IMAGE from '../../assets/default-profile.png';
import * as Style from './Card.style';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handleFollowRequest = this.handleFollowRequest.bind(this);
  }

  handleFollowRequest() {
    this.props.onFollowRequest();
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  renderIcon() {
    const { type, topic, user } = this.props;

    if (type === 'topic') {
      if (topic.get('is_following')) {
        return <i style={{ fontSize: '13px', marginRight: '5px' }} className="fa fa-check" aria-hidden="true" />;
      }
      return <i style={{ fontSize: '13px', marginRight: '7px' }} className="fa fa-plus" aria-hidden="true" />;
    } else {
      if (user.get('is_following')) {
        return <i style={{ fontSize: '13px', marginRight: '5px' }} className="fa fa-check" aria-hidden="true" />;
      }
      return <i style={{ fontSize: '13px', marginRight: '7px' }} className="fa fa-plus" aria-hidden="true" />;
    }
  }

  render() {
    const { type, topic, user } = this.props;
    return (
      type === 'topic' ? (
        <Style.Wrapper>
          <Style.ImageWrapper to={`/topic/${topic.get('id')}`}>
            <Style.Image type={type} src={topic.get('topic_image') ? topic.get('topic_image') : DEFAULT_TOPIC_IMAGE} />
          </Style.ImageWrapper>
          <Style.Description>
            <Style.Name to={`/topic/${topic.get('id')}`}>{topic.get('title')}</Style.Name>
            <Style.FollowButton disabled={!this.isLoggedIn() || topic.get('isFollowLoading')} isFollowing={topic.get('is_following')} onClick={this.handleFollowRequest}>
              {this.renderIcon()}
              {
                topic.get('is_following') ?
                  <div>
                    팔로잉
                </div>
                  : <div>
                    팔로우
                  </div>
              }
              <span>|</span> {topic.get('followed_num')}명
            </Style.FollowButton>
          </Style.Description>
        </Style.Wrapper>
      ) : (
        <Style.Wrapper>
          <Style.ImageWrapper to={`/user/${user.get('id')}`}>
            <Style.Image src={user.get('profile_image') ? user.get('profile_image') : DEFAULT_PROFILE_IMAGE} />
          </Style.ImageWrapper>
          <Style.Description>
            <Style.Name to={`/user/${user.get('id')}`}>{user.get('name')}</Style.Name>
            <Style.FollowButton disabled={!this.isLoggedIn() || user.get('id') === this.props.loggedInUser.get('id')} isFollowing={user.get('is_following')} onClick={this.handleFollowRequest}>
              {this.renderIcon()}
              {
                user.get('is_following') ?
                  <div>
                    팔로잉
                  </div>
                  : <div>
                  팔로우
                </div>
              }
              <span>|</span> {user.get('follower_num')}명
            </Style.FollowButton>
          </Style.Description>
        </Style.Wrapper>
      )
    );
  }
}

Card.propTypes = {
  type: PropTypes.string.isRequired,
  topic: PropTypes.instanceOf(Immutable.Map),
  user: PropTypes.instanceOf(Immutable.Map),
  onFollowRequest: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
};

export default Card;
