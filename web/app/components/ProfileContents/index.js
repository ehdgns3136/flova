import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import * as Style from './index.style';
import Contents from './Contents';
import Cards from './Cards';


class ProfileContents extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderContents(activeItem) {
    const { onGetQuestionsRequest, isContentsLoading, topics, updateRedirectPage, onFollowTopicRequest,
      loggedInUser, userId, questions, users, onFollowUserRequest } = this.props;

    switch (activeItem) {
      case 'writtenAnswers':
      case 'writtenQuestions':
      case 'followingQuestions':
      case 'bookmarkContents':
        return <Contents loadMore={() => onGetQuestionsRequest(userId)} updateRedirectPage={updateRedirectPage} loggedInUser={loggedInUser} questions={questions} />;
      case 'followingTopics':
        return <Cards type="topic" isLoading={isContentsLoading} topics={topics} onFollowRequest={onFollowTopicRequest} />;
      case 'followingUsers':
        return <Cards type="followingUsers" loggedInUser={loggedInUser} isLoading={isContentsLoading} users={users} onFollowRequest={onFollowUserRequest} />;
      case 'followers':
        return <Cards type="followers" loggedInUser={loggedInUser} isLoading={isContentsLoading} users={users} onFollowRequest={onFollowUserRequest} />;
      default:
        return null;
    }
  }

  render() {
    const { activeItem } = this.props;

    return (
      <Style.Container>
        <Style.Contents>
          {
            this.renderContents(activeItem)
          }
        </Style.Contents>
      </Style.Container>
    );
  }
}

ProfileContents.propTypes = {
  isContentsLoading: PropTypes.bool,
  activeItem: PropTypes.string,
  onGetQuestionsRequest: PropTypes.func.isRequired,
  topics: PropTypes.instanceOf(Immutable.List),
  updateRedirectPage: PropTypes.func.isRequired,
  onFollowTopicRequest: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  userId: PropTypes.string,
  questions: PropTypes.instanceOf(Immutable.List),
  users: PropTypes.instanceOf(Immutable.List),
  onFollowUserRequest: PropTypes.func.isRequired,
};

export default ProfileContents;
