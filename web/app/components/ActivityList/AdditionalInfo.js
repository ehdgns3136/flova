import React from 'react';
import ProfilePopup from 'components/ProfilePopup';
import { Link } from 'react-router';
import defaultProfileImage from 'assets/default-profile.png';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import * as Style from './AdditionalInfo.style';


class AdditionalInfo extends React.Component {
  renderFirstTopic(topics) {
    if (!topics || topics.count() === 0) {
      return null;
    }
    const topic = topics.get('0');
    return <Style.Topic to={`/topic/${topic.get('id')}`}>{topic.get('title')}</Style.Topic>;
  }

  renderTopics(topics) {
    return topics.map((topic, index) => {
      if (index === topics.count() - 1) {
        return <Style.Topic to={`/topic/${topic.get('id')}`} key={topic.get('id')}>{topic.get('title')}</Style.Topic>;
      }
      return (
        <span key={topic.get('id')}>
          <Style.Topic to={`/topic/${topic.get('id')}`}>{topic.get('title')}</Style.Topic>
          <Style.MarginMiddot>&middot;</Style.MarginMiddot>
        </span>
      );
    });
  }

  renderFollowingTopicsActivity(followingTopics, description) {
    const { activity } = this.props;

    return (
      <Style.AdditionalInfo>
        <Style.Activity>
          {
            followingTopics.map((topic, index) => {
              if (index === followingTopics.count() - 1) {
                return (
                  <Style.ActivityDescription to={`/topic/${topic.get('id')}`} key={topic.get('id')}>
                    {topic.get('title')}
                  </Style.ActivityDescription>
                );
              }
              return (
                <span key={topic.get('id')}>
                  <Style.ActivityDescription to={`/topic/${topic.get('id')}`}>
                    {topic.get('title')}
                  </Style.ActivityDescription>
                  ,&nbsp;
              </span>
              );
            })
          }
          {description}
        </Style.Activity>
      </Style.AdditionalInfo>
    );
  }

  renderFollowingUsersActivity(followingUsers, description) {
    const { activity, loggedInUser, onFollowQuestionRequest, onFollowUserRequest } = this.props;
    const question = activity.get('content').get('question');
    if (!followingUsers || followingUsers.count() === 0) {
      return null;
    }
    const firstFollowingUser = followingUsers.get('0');
    return (
      <Style.AdditionalInfo>
        <Style.Activity>
          <ProfilePopup
            trigger={
              <Link to={`/user/${firstFollowingUser.get('id')}`}>
                <Style.ActivityProfile src={firstFollowingUser.get('profile_image') === '' ? defaultProfileImage : firstFollowingUser.get('profile_image')} />
              </Link>
            }
            loggedInUser={loggedInUser}
            onFollowQuestionRequest={onFollowQuestionRequest}
            user={firstFollowingUser}
            onFollowUserRequest={onFollowUserRequest}
          />
          {this.renderFollowingUsersName(followingUsers)}
          {description}
        </Style.Activity>
        <Style.Topics>
          {
            question.get('topics') ?
              this.renderFirstTopic(question.get('topics'))
              : null
          }
        </Style.Topics>
      </Style.AdditionalInfo>
    );
  }

  renderFollowingUsersName(followingUsers) {
    const { loggedInUser, onFollowQuestionRequest, onFollowUserRequest } = this.props;
    const firstUser = followingUsers.get('0');
    if (followingUsers.count() === 1) {
      return (
        <span>
          <ProfilePopup
            trigger={
              <Style.ActivityDescription to={`/user/${firstUser.get('id')}`}>{firstUser.get('name')}</Style.ActivityDescription>
            }
            loggedInUser={loggedInUser}
            onFollowQuestionRequest={onFollowQuestionRequest}
            user={firstUser}
            key={firstUser.get('id')}
            onFollowUserRequest={onFollowUserRequest}
          />
          님
        </span>
      );
    }

    return (
      <span>
        <ProfilePopup
          trigger={
            <Style.ActivityDescription>{firstUser.get('name')}</Style.ActivityDescription>
          }
          loggedInUser={loggedInUser}
          onFollowQuestionRequest={onFollowQuestionRequest}
          onFollowUserRequest={onFollowUserRequest}
          user={firstUser}
          key={firstUser.get('id')}
        />
        님 외 {followingUsers.count() - 1}명
      </span>
    );
  }

  render() {
    const { activity } = this.props;
    const activityData = activity.get('activity_data');
    const question = activity.get('content').get('question');

    if (!activityData) {
      if (question.get('topics') && question.get('topics').count() === 0) {
        return null;
      }
      return (
        <Style.AdditionalInfo>
          <Style.Topics>
            {
              question.get('topics') ?
                this.renderTopics(question.get('topics'))
                : null
            }
          </Style.Topics>
        </Style.AdditionalInfo>
      );
    }

    switch (activityData.get('type')) {
      case 'answer_wrote_by_following_user': {
        return this.renderFollowingUsersActivity(activityData.get('following_users'), '이 답변을 남겼습니다.');
      }
      case 'question_wrote_by_following_user': {
        return this.renderFollowingUsersActivity(activityData.get('following_users'), '이 질문을 남겼습니다.');
      }
      case 'answer_liked_by_following_user': {
        return this.renderFollowingUsersActivity(activityData.get('following_users'), '이 답변을 좋아합니다.');
      }
      case 'question_followed_by_following_user': {
        return this.renderFollowingUsersActivity(activityData.get('following_users'), '이 질문을 팔로우했습니다.');
      }
      case 'answer_chosen_by_editors_by_topic':
      case 'answer_chosen_by_editors': {
        return (
          <Style.AdditionalInfo>
            <Style.Activity>
              추천 답변
            </Style.Activity>
            <Style.Topics>
              {
                question.get('topics') ?
                  this.renderFirstTopic(question.get('topics'))
                  : null
              }
            </Style.Topics>
          </Style.AdditionalInfo>
        );
      }
      case 'question_wrote_on_following_topic':
        return this.renderFollowingTopicsActivity(activityData.get('following_topics'), '에 달린 질문');
      case 'answer_wrote_on_following_topic':
        return this.renderFollowingTopicsActivity(activityData.get('following_topics'), '에 달린 답변');
      default:
        console.error('QuestionCard; 처리되지 않은 activity_type입니다.');
        return null;
    }
  }
}

AdditionalInfo.propTypes = {
  activity: PropTypes.instanceOf(Immutable.Map),
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onFollowQuestionRequest: PropTypes.func.isRequired,
  onFollowUserRequest: PropTypes.func.isRequired,
};

export default AdditionalInfo;
