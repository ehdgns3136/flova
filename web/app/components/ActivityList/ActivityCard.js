import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import { browserHistory } from 'react-router';
import Immutable from 'immutable';
import AnswerWriterInfo from 'components/AnswerWriterInfo';
import { createEmptyEditorState, trimEditorState, safelyParseEditorStateString, getEditorStateLength } from 'components/WonderEditor/utils/editor-state-utils';
import WonderEditorView from 'components/WonderEditor/WonderEditorView';
import AnswerWriteForm from 'components/AnswerWriteForm';
import ShareButton from 'components/ShareButton';
import CustomPopup from 'components/CustomPopup';
import CommentContainer from 'components/CommentContainer';

// Relative Imports
import * as Style from './ActivityCard.style';
import ActivityCardActionSheet from './ActivityCardActionSheet';
import AdditionalInfo from './AdditionalInfo';

const MAX_CONTENT_LENGTH = 150;
const MAX_BLOCK_NUM = 3;


export class ActivityCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const content = this.props.activity.get('content');

    const answerEditorState = (content.get('answer')) ? safelyParseEditorStateString(content.get('answer').get('content')) : createEmptyEditorState();
    const answerWriteEditorState = (content.get('question').get('is_answered')) ? (
      safelyParseEditorStateString(content.get('question').get('my_answer').get('content'))
    ) : (createEmptyEditorState());
    const [trimmedAnswerEditorState, isCollapsed, firstImageUrl] = trimEditorState(answerEditorState, MAX_CONTENT_LENGTH, MAX_BLOCK_NUM);

    this.state = {
      isCollapsed,
      answerEditorState,
      answerWriteEditorState,
      trimmedAnswerEditorState,
      firstImageUrl,
      isAnswerFormOpened: false,
      commentVisible: false,
      commentClicked: false,
    };
    this.goToQuestionDetail = this.goToQuestionDetail.bind(this);
    this.goToWriteAnswer = this.goToWriteAnswer.bind(this);
    this.showMore = this.showMore.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    this.toggleAnswerForm = this.toggleAnswerForm.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleAnswerWriteEditorStateChange = this.handleAnswerWriteEditorStateChange.bind(this);
    this.handleAnswerWriteCancel = this.handleAnswerWriteCancel.bind(this);
    this.handleQuestionBookmark = this.handleQuestionBookmark.bind(this);
    this.handleAnswerBookmark = this.handleAnswerBookmark.bind(this);
    this.handleFollower = this.handleFollower.bind(this);
    this.handleLiker = this.handleLiker.bind(this);

    // Comment
    this.handleCommentVisible = this.handleCommentVisible.bind(this);
    this.handleGetComment = this.handleGetComment.bind(this);
    this.handlePostComment = this.handlePostComment.bind(this);
    this.handlePutComment = this.handlePutComment.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.handleLikeComment = this.handleLikeComment.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activity) {
      let answerWriteEditorState = this.state.answerEditorState;

      if (nextProps.activity.get('content').get('question').get('is_answered')) {
        answerWriteEditorState = safelyParseEditorStateString(nextProps.activity.get('content').get('question').get('my_answer').get('content'));
      } else {
        answerWriteEditorState = createEmptyEditorState();
      }

      this.setState({
        answerWriteEditorState,
      });
    }
  }

  handleAnswerSubmit(editorState) {
    const question = this.props.activity.get('content').get('question');
    if (getEditorStateLength(editorState) <= 50) {
      this.props.onOpenAnnounceModalRequest('over50Character');
    } else {
      if (question.get('is_answered')) {
        this.props.onModifyAnswerRequest(question.get('my_answer').get('id'), editorState);
      } else {
        this.props.onWriteAnswerRequest(editorState, question.get('id'));
      }
      this.setState({
        isAnswerFormOpened: false,
      });
    }
  }

  goToQuestionDetail() {
    const content = this.props.activity.get('content');
    const id = content.get('question').get('id');
    browserHistory.push({
      pathname: `/question/${id}`,
    });
  }

  goToWriteAnswer() {
    const content = this.props.activity.get('content');
    const id = content.get('question').get('id');
    browserHistory.push({
      pathname: `/question/${id}`,
      state: {
        willWriteAnswer: true,
      },
    });
  }

  showMore() {
    this.setState({
      isCollapsed: false,
    });
  }

  toggleAnswerForm() {
    if (this.props.loggedInUser) {
      if (!this.state.isAnswerFormOpened && this.props.loggedInUser.get('first_answerer')) {
        this.props.onOpenAnnounceModalRequest('firstAnswerer');
      }
      this.setState({
        isAnswerFormOpened: !this.state.isAnswerFormOpened,
      });
    } else {
      this.props.updateRedirectPage(browserHistory.getCurrentLocation().pathname);
      browserHistory.push('/intro');
    }
  }

  handleFollow() {
    const content = this.props.activity.get('content');
    this.props.onFollowQuestionRequest(content.get('question').get('id'));
  }

  handleLike() {
    const content = this.props.activity.get('content');
    this.props.onLikeAnswerRequest(content.get('answer').get('id'), content.get('answer').get('is_downvoted'));
  }

  handleDownvote() {
    const content = this.props.activity.get('content');
    this.props.onDownvoteAnswerRequest(content.get('answer').get('id'), content.get('answer').get('is_liked'));
  }

  handleQuestionBookmark() {
    const content = this.props.activity.get('content');

    this.props.onBookmarkQuestionRequest(content.get('question').get('id'));
  }

  handleAnswerBookmark() {
    const content = this.props.activity.get('content');
    this.props.onBookmarkAnswerRequest(content.get('answer').get('id'));
  }

  handleAnswerWriteEditorStateChange(newAnswerWriteEditorState) {
    this.setState({
      answerWriteEditorState: newAnswerWriteEditorState,
    });
  }

  handleAnswerWriteCancel() {
    this.setState({
      isAnswerFormOpened: false,
    });
  }

  renderTopics(topics) {
    return topics.map((topic, index) => {
      if (index === topics.count() - 1) {
        return <Style.Topic to={`/topic/${topic.get('id')}`} key={topic.get('id')}>{topic.get('title')}</Style.Topic>;
      }
      return (
        <span key={topic.get('id')}>
          <Style.Topic to={`/topic/${topic.get('id')}`}>{topic.get('title')}</Style.Topic>
          &middot;
        </span>
      );
    });
  }

  handleFollower() {
    const { openFollowerModal, onGetQuestionFollowersRequest, activity } = this.props;
    openFollowerModal();
    onGetQuestionFollowersRequest(activity.get('content').get('question').get('id'));
  }

  handleLiker() {
    const { openLikerModal, onGetAnswerLikersRequest, activity } = this.props;
    openLikerModal();
    onGetAnswerLikersRequest(activity.get('content').get('answer').get('id'));
  }

  handleCommentVisible() {
    const question = this.props.activity.get('content').get('question');
    const answer = this.props.activity.get('content').get('answer');

    if (answer) {
      if (answer.get('comments').size === 0 && !this.state.commentClicked) {
        this.props.onGetAnswerCommentsRequest(answer.get('id'));
      }
    } else {
      if (question.get('comments').size === 0 && !this.state.commentClicked) {
        this.props.onGetQuestionCommentsRequest(question.get('id'));
      }
    }
    this.setState({
      commentVisible: !this.state.commentVisible,
      commentClicked: true,
    });
  }

  handleGetComment() {
    const question = this.props.activity.get('content').get('question');
    const answer = this.props.activity.get('content').get('answer');
    if (answer) {
      this.props.onGetAnswerCommentsRequest(answer.get('id'));
    } else {
      this.props.onGetQuestionCommentsRequest(question.get('id'));
    }
  }

  handlePostComment(comment) {
    const question = this.props.activity.get('content').get('question');
    const answer = this.props.activity.get('content').get('answer');
    if (answer) {
      this.props.onPostAnswerCommentRequest(comment, answer.get('id'));
    } else {
      this.props.onPostQuestionCommentRequest(comment, question.get('id'));
    }
  }

  handlePutComment(comment, commentID) {
    const answer = this.props.activity.get('content').get('answer');
    if (answer) {
      this.props.onPutAnswerCommentRequest(comment, commentID);
    } else {
      this.props.onPutQuestionCommentRequest(comment, commentID);
    }
  }

  handleDeleteComment(commentID) {
    const question = this.props.activity.get('content').get('question');
    const answer = this.props.activity.get('content').get('answer');
    if (answer) {
      this.props.onDeleteAnswerCommentRequest(commentID, answer.get('id'));
    } else {
      this.props.onDeleteQuestionCommentRequest(commentID, question.get('id'));
    }
  }

  handleLikeComment(commentID) {
    const answer = this.props.activity.get('content').get('answer');
    if (answer) {
      this.props.onLikeAnswerCommentRequest(commentID);
    } else {
      this.props.onLikeQuestionCommentRequest(commentID);
    }
  }

  render() {
    const { activity, loggedInUser, onFollowQuestionRequest, onFollowUserRequest } = this.props;
    const { commentVisible } = this.state;

    const question = activity.get('content').get('question');
    const answer = activity.get('content').get('answer');
    return (
      <Style.CardContainer>
        <AdditionalInfo
          activity={activity}
          loggedInUser={loggedInUser}
          onFollowQuestionRequest={onFollowQuestionRequest}
          onFollowUserRequest={onFollowUserRequest}
        />
        <Style.TitleContainer answerExist={answer}>
          <Style.MarginCardHeader to={`/question/${question.get('id')}`}>
            Q. {question.get('title')}
          </Style.MarginCardHeader>
        </Style.TitleContainer>
        {
          answer ? (
            <Style.AnswerContainer>
              <AnswerWriterInfo
                answerWriter={answer.get('writer')}
                created={answer.get('created')}
                loggedInUser={this.props.loggedInUser}
                onFollowUserRequest={this.props.onFollowUserRequest}
              />
              <Style.StyledCardDescription>
                <WonderEditorView
                  editorState={(this.state.isCollapsed) ? this.state.trimmedAnswerEditorState : this.state.answerEditorState}
                  readOnly
                  onShowMore={this.showMore}
                />
                {
                  (this.state.isCollapsed && this.state.firstImageUrl) ? (
                    <Style.CardImage src={this.state.firstImageUrl} />
                  ) : null
                }
              </Style.StyledCardDescription>
            </Style.AnswerContainer>
          ) : null
        }
        {
          answer ? (
            <div>
              <Style.CardStats>
                {
                  answer.get('liked_num') ? (
                    <div>
                      <MediaQuery minWidth={1008}>
                        <Style.CardStatElement onClick={this.handleLiker}>
                          좋아요 {answer.get('liked_num')}명
                        </Style.CardStatElement>
                      </MediaQuery>
                      <MediaQuery maxWidth={1008}>
                        <Style.CardStatElement to={`/answer/${answer.get('id')}/likers`}>
                          좋아요 {answer.get('liked_num')}명
                        </Style.CardStatElement>
                      </MediaQuery>
                    </div>
                  ) : (
                    null
                  )
                }
                {
                  answer.get('liked_num') && answer.get('comment_num') ? (
                    <span>
                      &middot;
                    </span>
                  ) : (
                    null
                  )
                }
                {
                  answer.get('comment_num') ? (
                    <Style.CardStatElement onClick={this.handleCommentVisible}>
                      댓글 {answer.get('comment_num')}개
                    </Style.CardStatElement>
                  ) : (
                    null
                  )
                }
              </Style.CardStats>
              <Style.FlexCardContent>
                <Style.FlexItem>
                  <Style.MarginRightButton enable={answer.get('is_liked')} onClick={this.handleLike}>
                    <Icon name="thumbs outline up" />
                    <div className="underline">
                      좋아요
                    </div>
                  </Style.MarginRightButton>
                  <Style.MarginRightButton onClick={this.handleDownvote} enable={answer.get('is_downvoted')}>
                    <Icon name="thumbs outline down" />
                    <div className="underline">
                      별로에요
                    </div>
                  </Style.MarginRightButton>
                  <ShareButton
                    question={question}
                    url={`${URL_ROOT}/answer/${answer.get('id')}`}
                  />
                </Style.FlexItem>
                <MediaQuery maxWidth={1008}>
                  <ActivityCardActionSheet
                    onBookmarkRequest={() => this.props.onBookmarkAnswerRequest(answer.get('id'))}
                    isBookmark={answer.get('is_bookmark')}
                    type="answer"
                  />
                </MediaQuery>
                <MediaQuery minWidth={1008}>
                  <CustomPopup
                    closeOnInsideClick
                    wrapElement={<span />}
                    trigger={
                      <Style.IconButton>
                        <i className="fa fa-ellipsis-h" />
                      </Style.IconButton>
                    }
                    arrowPositionRight="20px"
                    marginTop="4px"
                  >
                    <Style.PopupContent>
                      <Style.BlockA onClick={this.handleAnswerBookmark}>
                        <Icon name="bookmark" />
                        {
                          (answer.get('is_bookmark')) ? (
                            '북마크 취소'
                          ) : (
                            '북마크'
                          )
                        }
                      </Style.BlockA>
                    </Style.PopupContent>
                  </CustomPopup>
                </MediaQuery>
              </Style.FlexCardContent>
            </div >
          ) : (
            <div>
              <Style.CardStats>
                {
                  question.get('followed_num') ? (
                    <div>
                      <MediaQuery minWidth={1008}>
                        <Style.CardStatElement onClick={this.handleFollower}>
                          팔로우 {question.get('followed_num')}명
                        </Style.CardStatElement>
                      </MediaQuery>
                      <MediaQuery maxWidth={1008}>
                        <Style.CardStatElement to={`/question/${question.get('id')}/followers`}>
                          팔로우 {question.get('followed_num')}명
                        </Style.CardStatElement>
                      </MediaQuery>
                    </div>
                  ) : (
                    null
                  )
                }
                {
                  ((question.get('followed_num') && question.get('answer_num')) || (question.get('followed_num') && question.get('comment_num'))) ? (
                    <span>
                      &middot;
                    </span>
                  ) : (
                    null
                  )
                }
                {
                  question.get('answer_num') ? (
                    <Style.CardStatElement to={`/question/${question.get('id')}`}>
                      답변 {question.get('answer_num')}개
                    </Style.CardStatElement>
                  ) : (
                    null
                  )
                }
                {
                  question.get('answer_num') && question.get('comment_num') ? (
                    <span>
                    &middot;
                  </span>
                  ) : (
                    null
                  )
                }
                {
                  question.get('comment_num') ? (
                    <Style.CardStatElement onClick={this.handleCommentVisible}>
                      댓글 {question.get('comment_num')}개
                    </Style.CardStatElement>
                  ) : (
                    null
                  )
                }
              </Style.CardStats>
              <Style.FlexCardContent>
                <Style.FlexItem>
                  <Style.MarginRightButton enable={question.get('is_followed')} onClick={this.handleFollow}>
                    <Icon name="idea" />
                    <div className="underline">
                      팔로우
                    </div>
                  </Style.MarginRightButton>
                  <MediaQuery minWidth={1008}>
                    <Style.MarginRightButton onClick={this.toggleAnswerForm}>
                      <Icon name="write" />
                      <div className="underline">
                        {
                          question.get('is_answered') ? (
                            '답변수정'
                          ) : (
                            '답변하기'
                          )
                        }
                      </div>
                    </Style.MarginRightButton>
                  </MediaQuery>
                  <MediaQuery maxWidth={1008}>
                    {
                      question.get('is_answered') ? (
                        <Style.MarginRightButton onClick={() => {
                          this.props.setInitialData(question.get('id'), question.get('title'), question.get('my_answer').get('content'));
                          browserHistory.push(`/answer/${question.get('my_answer').get('id')}/edit`);
                        }}>
                          <Icon name="write" />
                          <div className="underline">
                            답변수정
                          </div>
                        </Style.MarginRightButton>
                      ) : (
                        <Style.MarginRightButton onClick={() => {
                          this.props.setInitialData(null, question.get('title'), null);
                          browserHistory.push(`/question/${question.get('id')}/write_answer`);
                          if (this.props.loggedInUser && this.props.loggedInUser.get('first_answerer')) {
                            this.props.onOpenAnnounceModalRequest('firstAnswerer');
                          }
                        }}>
                          <Icon name="write" />
                          <div className="underline">
                            답변하기
                          </div>
                        </Style.MarginRightButton>
                      )
                    }
                  </MediaQuery>
                  <ShareButton
                    question={question}
                    url={`${URL_ROOT}/question/${question.get('id')}`}
                  />
                </Style.FlexItem>
                <MediaQuery maxWidth={1008}>
                  <ActivityCardActionSheet
                    onBookmarkRequest={() => this.props.onBookmarkQuestionRequest(question.get('id'))}
                    isBookmark={question.get('is_bookmark')}
                    type="question"
                  />
                </MediaQuery>
                <MediaQuery minWidth={1008}>
                  <CustomPopup
                    closeOnInsideClick
                    wrapElement={<span />}
                    trigger={
                      <Style.IconButton>
                        <i className="fa fa-ellipsis-h" />
                      </Style.IconButton>
                    }
                    arrowPositionRight="20px"
                    marginTop="4px"
                  >
                    <Style.PopupContent>
                      <Style.BlockA onClick={this.handleQuestionBookmark}>
                        <Icon name="bookmark" />
                        {
                          (question.get('is_bookmark')) ? (
                            '북마크 취소'
                          ) : (
                            '북마크'
                          )
                        }
                      </Style.BlockA>
                    </Style.PopupContent>
                  </CustomPopup>
                </MediaQuery>
              </Style.FlexCardContent>
            </div>
          )
        }
        {
          this.state.isAnswerFormOpened ?
            <Style.AnswerWriteFormContainer>
              <AnswerWriteForm
                editorState={this.state.answerWriteEditorState}
                onEditorStateChange={this.handleAnswerWriteEditorStateChange}
                onSubmit={this.handleAnswerSubmit}
                onCancel={this.handleAnswerWriteCancel}
                answerWriter={loggedInUser}
                isModifying={question.get('is_answered')}
              />
            </Style.AnswerWriteFormContainer>
            : null
        }
        {
          (commentVisible) ? (
            <Style.CommentContainerWrapper>
              <CommentContainer
                comments={answer ? answer.get('comments') : question.get('comments')}
                commentSize={answer ? answer.get('comment_num') : question.get('comment_num')}
                loggedInUser={this.props.loggedInUser}
                onGetCommentRequest={this.handleGetComment}
                onPostCommentRequest={this.handlePostComment}
                onPutCommentRequest={this.handlePutComment}
                onDeleteCommentRequest={this.handleDeleteComment}
                onLikeCommentRequest={this.handleLikeComment}
                isCommentsLoading={answer ? answer.get('isCommentsLoading') : question.get('isCommentsLoading')}
                updateRedirectPage={this.props.updateRedirectPage}
              />
            </Style.CommentContainerWrapper>
          ) : (
            null
          )
        }
      </Style.CardContainer>
    );
  }
}

ActivityCard.propTypes = {
  activity: PropTypes.instanceOf(Immutable.Map),
  onWriteAnswerRequest: PropTypes.func,
  onModifyAnswerRequest: PropTypes.func.isRequired,
  onFollowQuestionRequest: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onLikeAnswerRequest: PropTypes.func.isRequired,
  onDownvoteAnswerRequest: PropTypes.func.isRequired,
  updateRedirectPage: PropTypes.func,
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
export default ActivityCard;
