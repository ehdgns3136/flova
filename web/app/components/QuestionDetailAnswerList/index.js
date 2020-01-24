/**
 *
 * QuestionDetailAnswerList
 *
 */

import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import Answer from 'components/Answer';

import * as Style from './index.style';


class QuestionDetailAnswerList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { isAnswersLoading, answers, question } = this.props;

    return (
      <div>
        {
          (isAnswersLoading) ? (
            null
          ) : (
            <div>
              {
                ( question ) ? (
                  (answers.size === 0) ?
                    <Style.GreyCenteredDiv>
                      <Style.StyledIcon name="write" size="huge" />
                      <div>아직 답변이 없습니다. <br />첫 번째 답변을 작성해보시는 게 어떠세요?</div>
                    </Style.GreyCenteredDiv> :
                    <Style.AnswerNum>
                      {answers.size}개의 답변이 있습니다.
                      <Style.AnswerNumDivider />
                    </Style.AnswerNum>
                ) : (
                  null
                )
              }
              {answers.map((answer) => {
                return (
                  <div key={answer.get('id')}>
                    <Answer
                      answer={answer}
                      question={question}
                      onModifyAnswerRequest={this.props.onModifyAnswerRequest}
                      onDeleteAnswerRequest={(answerID) => this.props.onDeleteAnswerRequest(answerID, question.get('id'))}
                      onLikeAnswerRequest={this.props.onLikeAnswerRequest}
                      onDownvoteAnswerRequest={this.props.onDownvoteAnswerRequest}
                      onGetAnswerCommentsRequest={this.props.onGetAnswerCommentsRequest}
                      onPostAnswerCommentRequest={this.props.onPostAnswerCommentRequest}
                      onPutAnswerCommentRequest={this.props.onPutAnswerCommentRequest}
                      onDeleteAnswerCommentRequest={this.props.onDeleteAnswerCommentRequest}
                      onLikeAnswerCommentRequest={this.props.onLikeAnswerCommentRequest}
                      loggedInUser={this.props.loggedInUser}
                      updateRedirectPage={this.props.updateRedirectPage}
                      onFollowUserRequest={this.props.onFollowUserRequest}
                      setInitialData={(initialContent) => this.props.setInitialData(question.get('id'), question.get('title'), initialContent)}
                      onBookmarkAnswerRequest={this.props.onBookmarkAnswerRequest}
                      openLikerModal={this.props.openLikerModal}
                      onGetAnswerLikersRequest={this.props.onGetAnswerLikersRequest}
                      onOpenAnnounceModalRequest={this.props.onOpenAnnounceModalRequest}
                    />
                    <Style.AnswerDivider />
                  </div>
                );
              })}
            </div>
          )}
      </div >
    );
  }
}

QuestionDetailAnswerList.propTypes = {
  answers: PropTypes.object,
  question: PropTypes.object,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onModifyAnswerRequest: PropTypes.func.isRequired,
  onDeleteAnswerRequest: PropTypes.func.isRequired,
  onLikeAnswerRequest: PropTypes.func.isRequired,
  onDownvoteAnswerRequest: PropTypes.func.isRequired,
  isAnswersLoading: PropTypes.bool.isRequired,
  onGetAnswerCommentsRequest: PropTypes.func.isRequired,
  onPostAnswerCommentRequest: PropTypes.func.isRequired,
  onPutAnswerCommentRequest: PropTypes.func.isRequired,
  onDeleteAnswerCommentRequest: PropTypes.func.isRequired,
  onLikeAnswerCommentRequest: PropTypes.func.isRequired,
  updateRedirectPage: PropTypes.func.isRequired,
  onFollowUserRequest: PropTypes.func.isRequired,
  setInitialData: PropTypes.func.isRequired,
  onBookmarkAnswerRequest: PropTypes.func.isRequired,
  openLikerModal: PropTypes.func.isRequired,
  onGetAnswerLikersRequest: PropTypes.func.isRequired,
  onOpenAnnounceModalRequest: PropTypes.func.isRequired,
};

export default QuestionDetailAnswerList;
