import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import InfiniteScroll from 'components/InfiniteScroll';
import { Loader } from 'semantic-ui-react';

import * as Style from './index.style';
import ActivityCard from './ActivityCard';

class ActivityList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.hasMoreQuestions = this.hasMoreQuestions.bind(this);
  }

  hasMoreQuestions() {
    return this.props.nextCursor != null;
  }

  renderActivities() {
    const { activities } = this.props;

    return activities.map((activity) => {
      if (!activity.get('activity_data')) {
        const content = activity.get('content');
        return (
          <ActivityCard
            key={`${content.get('question').get('id')}_${content.get('answer') ? content.get('answer').get('id') : 'NONE'}`}
            activity={activity}
            onWriteAnswerRequest={this.props.onWriteAnswerRequest}
            onModifyAnswerRequest={this.props.onModifyAnswerRequest}
            onFollowQuestionRequest={this.props.onFollowQuestionRequest}
            loggedInUser={this.props.loggedInUser}
            updateRedirectPage={this.props.updateRedirectPage}
            onLikeAnswerRequest={this.props.onLikeAnswerRequest}
            onDownvoteAnswerRequest={this.props.onDownvoteAnswerRequest}
            onFollowUserRequest={this.props.onFollowUserRequest}
            setInitialData={this.props.setInitialData}
            onBookmarkQuestionRequest={this.props.onBookmarkQuestionRequest}
            onBookmarkAnswerRequest={this.props.onBookmarkAnswerRequest}
            openFollowerModal={this.props.openFollowerModal}
            onGetQuestionFollowersRequest={this.props.onGetQuestionFollowersRequest}
            openLikerModal={this.props.openLikerModal}
            onGetAnswerLikersRequest={this.props.onGetAnswerLikersRequest}
            onOpenAnnounceModalRequest={this.props.onOpenAnnounceModalRequest}
            onGetQuestionCommentsRequest={this.props.onGetQuestionCommentsRequest}
            onPostQuestionCommentRequest={this.props.onPostQuestionCommentRequest}
            onPutQuestionCommentRequest={this.props.onPutQuestionCommentRequest}
            onDeleteQuestionCommentRequest={this.props.onDeleteQuestionCommentRequest}
            onLikeQuestionCommentRequest={this.props.onLikeQuestionCommentRequest}
            onGetAnswerCommentsRequest={this.props.onGetAnswerCommentsRequest}
            onPostAnswerCommentRequest={this.props.onPostAnswerCommentRequest}
            onPutAnswerCommentRequest={this.props.onPutAnswerCommentRequest}
            onDeleteAnswerCommentRequest={this.props.onDeleteAnswerCommentRequest}
            onLikeAnswerCommentRequest={this.props.onLikeAnswerCommentRequest}
          />
        );
      }
      switch (activity.get('activity_data').get('content_class')) {
        case 'Answer':
        case 'Question':
          return (
            <ActivityCard
              key={activity.get('activity_data').get('id')}
              activity={activity}
              onWriteAnswerRequest={this.props.onWriteAnswerRequest}
              onModifyAnswerRequest={this.props.onModifyAnswerRequest}
              onFollowQuestionRequest={this.props.onFollowQuestionRequest}
              loggedInUser={this.props.loggedInUser}
              updateRedirectPage={this.props.updateRedirectPage}
              onLikeAnswerRequest={this.props.onLikeAnswerRequest}
              onDownvoteAnswerRequest={this.props.onDownvoteAnswerRequest}
              onFollowUserRequest={this.props.onFollowUserRequest}
              setInitialData={this.props.setInitialData}
              onBookmarkQuestionRequest={this.props.onBookmarkQuestionRequest}
              onBookmarkAnswerRequest={this.props.onBookmarkAnswerRequest}
              openFollowerModal={this.props.openFollowerModal}
              onGetQuestionFollowersRequest={this.props.onGetQuestionFollowersRequest}
              openLikerModal={this.props.openLikerModal}
              onGetAnswerLikersRequest={this.props.onGetAnswerLikersRequest}
              onOpenAnnounceModalRequest={this.props.onOpenAnnounceModalRequest}
              onGetQuestionCommentsRequest={this.props.onGetQuestionCommentsRequest}
              onPostQuestionCommentRequest={this.props.onPostQuestionCommentRequest}
              onPutQuestionCommentRequest={this.props.onPutQuestionCommentRequest}
              onDeleteQuestionCommentRequest={this.props.onDeleteQuestionCommentRequest}
              onLikeQuestionCommentRequest={this.props.onLikeQuestionCommentRequest}
              onGetAnswerCommentsRequest={this.props.onGetAnswerCommentsRequest}
              onPostAnswerCommentRequest={this.props.onPostAnswerCommentRequest}
              onPutAnswerCommentRequest={this.props.onPutAnswerCommentRequest}
              onDeleteAnswerCommentRequest={this.props.onDeleteAnswerCommentRequest}
              onLikeAnswerCommentRequest={this.props.onLikeAnswerCommentRequest}
            />
          );
        default:
          console.error('ActivityList; 처리되지 않은 content_class 입니다.');
          return null;
      }
    });
  }

  render() {
    const { activities, isLoading, isError, loadMore } = this.props;
    return (
      <div>
        {
          (isLoading && activities.count() === 0) ? (
            <Style.LoaderWrapper>
              <Loader active />
            </Style.LoaderWrapper>
          )
            : null
        }
        {
          isError ? <Style.GreyCenteredDiv>서버에 에러가 발생하였습니다. 관리자에게 문의해주세요.</Style.GreyCenteredDiv> : null
        }
        {
          (!isError && activities.count() !== 0) ?
            <div>
              {
                this.renderActivities()
              }
              {
                loadMore ?
                  <InfiniteScroll
                    loadMore={this.props.loadMore}
                    hasMore={this.hasMoreQuestions()}
                    isLoading={this.props.isLoading}
                  />
                  : null
              }
            </div>
            : null
        }
        {
          !isLoading && activities.count() === 0 ? (
            <Style.GreyCenteredDiv>
              아직 작성된 질문과 답변이 없습니다.
            </Style.GreyCenteredDiv>
          ) : null
        }
      </div>
    );
  }
}

ActivityList.propTypes = {
  activities: PropTypes.instanceOf(Immutable.List).isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  nextCursor: PropTypes.string,
  loadMore: PropTypes.func,
  onWriteAnswerRequest: PropTypes.func,
  onModifyAnswerRequest: PropTypes.func,
  onFollowQuestionRequest: PropTypes.func.isRequired,
  updateRedirectPage: PropTypes.func,
  onLikeAnswerRequest: PropTypes.func.isRequired,
  onDownvoteAnswerRequest: PropTypes.func.isRequired,
  onFollowUserRequest: PropTypes.func.isRequired,
  setInitialData: PropTypes.func.isRequired,
  onBookmarkQuestionRequest: PropTypes.func.isRequired,
  onBookmarkAnswerRequest: PropTypes.func.isRequired,
  openFollowerModal: PropTypes.func.isRequired,
  onGetQuestionFollowersRequest: PropTypes.func.isRequired,
  openLikerModal: PropTypes.func.isRequired,
  onGetAnswerLikersRequest: PropTypes.func.isRequired,
  onOpenAnnounceModalRequest: PropTypes.func.isRequired,
  onGetQuestionCommentsRequest: PropTypes.func.isRequired,
  onPostQuestionCommentRequest: PropTypes.func.isRequired,
  onPutQuestionCommentRequest: PropTypes.func.isRequired,
  onDeleteQuestionCommentRequest: PropTypes.func.isRequired,
  onLikeQuestionCommentRequest: PropTypes.func.isRequired,
  onGetAnswerCommentsRequest: PropTypes.func.isRequired,
  onPostAnswerCommentRequest: PropTypes.func.isRequired,
  onPutAnswerCommentRequest: PropTypes.func.isRequired,
  onDeleteAnswerCommentRequest: PropTypes.func.isRequired,
  onLikeAnswerCommentRequest: PropTypes.func.isRequired,
};

export default ActivityList;
