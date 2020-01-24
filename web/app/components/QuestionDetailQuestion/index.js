/**
*
* QuestionDetailQuestion
*
*/

import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CustomPopup from 'components/CustomPopup';
import WonderEditorView from 'components/WonderEditor/WonderEditorView';
import {
  createEmptyEditorState,
  isEditorStateEmpty,
  safelyParseEditorStateString,
  getEditorStateLength,
} from 'components/WonderEditor/utils/editor-state-utils';
import Immutable, { fromJS } from 'immutable';
import { browserHistory } from 'react-router';
import MediaQuery from 'react-responsive';

import AnswerWriteForm from 'components/AnswerWriteForm';
import ShareButton from 'components/ShareButton';
import CommentContainer from 'components/CommentContainer';
import * as Style from './index.style';
import QuestionActionSheet from './QuestionActionSheet';

export const QuestionShape = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  topics: PropTypes.array,
  created: PropTypes.string,
  follow_num: PropTypes.number,
  followed_by_user: PropTypes.bool,
  comment_num: PropTypes.number,
});

class QuestionDetailQuestion extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      answerEditorVisible: this.props.willWriteAnswer,
      editorState: createEmptyEditorState(),
      answerEditorState: createEmptyEditorState(),
      isDeleteModalOpened: false,
      topicOptions: [],
      commentVisible: false,
    };
    this.handleWriteAnswerClick = this.handleWriteAnswerClick.bind(this);
    this.handleMobileWriteAnswerClick = this.handleMobileWriteAnswerClick.bind(this);
    this.handleMobileModifyAnswerClick = this.handleMobileModifyAnswerClick.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
    this.closeQuestionDeleteModal = this.closeQuestionDeleteModal.bind(this);
    this.openQuestionDeleteModal = this.openQuestionDeleteModal.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.startModifyingQuestion = this.startModifyingQuestion.bind(this);
    this.startModifyingMobileQuestion = this.startModifyingMobileQuestion.bind(this);
    // this.handleModifySubmit = this.handleModifySubmit.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleCommentVisible = this.handleCommentVisible.bind(this);
    this.handleAnswerEditorStateChange = this.handleAnswerEditorStateChange.bind(this);
    this.handleAnswerWriteCancel = this.handleAnswerWriteCancel.bind(this);
    this.handleQuestionBookmark = this.handleQuestionBookmark.bind(this);
    this.handleFollower = this.handleFollower.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.question && nextProps.question !== this.props.question) {
      const editorState = safelyParseEditorStateString(nextProps.question.get('content'));

      let answerEditorState = this.state.answerEditorState;

      if (nextProps.question.get('is_answered')) {
        answerEditorState = safelyParseEditorStateString(nextProps.question.get('my_answer').get('content'));
      } else {
        answerEditorState = createEmptyEditorState();
      }

      this.setState({
        editorState,
        answerEditorState,
      });
    }
  }

  closeQuestionDeleteModal() {
    this.setState({
      isDeleteModalOpened: false,
    });
  }

  openQuestionDeleteModal() {
    this.setState({
      isDeleteModalOpened: true,
    });
  }

  deleteQuestion() {
    this.props.onDeleteQuestionRequest();
    this.closeQuestionDeleteModal();
  }

  deleteAnswer() {
    this.props.onDeleteQuestionRequest();
  }

  handleWriteAnswerClick() {
    if (this.props.loggedInUser) {
      if (!this.state.answerEditorVisible && this.props.loggedInUser.get('first_answerer')) {
        this.props.onOpenAnnounceModalRequest('firstAnswerer');
      }
      this.setState({
        answerEditorVisible: !this.state.answerEditorVisible,
      });
    } else {
      this.props.updateRedirectPage(browserHistory.getCurrentLocation().pathname);
      browserHistory.push('/intro');
    }
  }

  handleMobileModifyAnswerClick() {
    this.props.setInitialAnswerData(this.props.question.get('id'), this.props.question.get('title'), this.props.question.get('my_answer').get('content'));
    browserHistory.push(`/answer/${this.props.question.get('my_answer').get('id')}/edit`);
  }

  handleMobileWriteAnswerClick() {
    this.props.setInitialAnswerData(null, this.props.question.get('title'), null);
    browserHistory.push(`/question/${this.props.question.get('id')}/write_answer`);
    if (this.props.loggedInUser && this.props.loggedInUser.get('first_answerer')) {
      this.props.onOpenAnnounceModalRequest('firstAnswerer');
    }
  }

  isQuestionEmpty() {
    return isEditorStateEmpty(this.state.editorState);
  }

  handleAnswerSubmit(answerEditorState) {
    if (getEditorStateLength(answerEditorState) <= 50) {
      this.props.onOpenAnnounceModalRequest('over50Character');
    } else {
      if (this.props.question.get('is_answered')) {
        this.props.onModifyAnswerRequest(this.props.question.get('my_answer').get('id'), answerEditorState);
      } else {
        this.props.onWriteAnswerRequest(answerEditorState, this.props.question.get('id'));
      }

      this.setState({
        answerEditorVisible: false,
      });
    }
  }

  startModifyingQuestion() {
    const question = this.props.question;
    this.props.openQuestionEditFormModal(question.get('id'), question.get('title'), question.get('content'), question.get('topics').toJS());
  }

  startModifyingMobileQuestion() {
    const question = this.props.question;
    this.props.setInitialQuestionData(question.get('id'), question.get('title'), question.get('content'), question.get('topics').toJS());
    browserHistory.push(`/question/${question.get('id')}/edit`);
  }

  handleFollow() {
    const { question, onFollowQuestionRequest } = this.props;
    onFollowQuestionRequest(question.get('id'));
  }

  handleCommentVisible() {
    if (this.props.question.get('comments').size === 0) {
      this.props.onGetQuestionCommentsRequest(this.props.question.get('id'));
    }
    this.setState({
      commentVisible: !this.state.commentVisible,
    });
  }

  handleAnswerEditorStateChange(newAnswerEditorState) {
    this.setState({
      answerEditorState: newAnswerEditorState,
    });
  }

  handleAnswerWriteCancel() {
    this.setState({
      answerEditorVisible: false,
    });
  }

  handleQuestionBookmark() {
    const { question, onBookmarkQuestionRequest } = this.props;
    onBookmarkQuestionRequest(question.get('id'));
  }

  handleFollower() {
    const { openFollowerModal, onGetQuestionFollowersRequest, question } = this.props;
    openFollowerModal();
    onGetQuestionFollowersRequest(question.get('id'));
  }

  render() {
    const { answerEditorVisible, commentVisible } = this.state;

    return (this.props.isQuestionLoading ) ? (
      null
    ) :
      (
        (!this.props.question) ? (
          <Style.GreyCenteredDiv>
            <Style.StyledIcon className="fa fa-meh-o" />
            <div>질문이 존재하지 않습니다.</div>
          </Style.GreyCenteredDiv>
          ) : (
            <Style.MarginDiv>
              <Modal
                basic
                open={this.state.isDeleteModalOpened}
                closeOnDimmerClick={false}
              >
                <Modal.Header>정말 질문을 삭제하시겠습니까?</Modal.Header>
                <Modal.Content>이 작업은 되돌릴 수 없습니다.</Modal.Content>
                <Modal.Actions>
                  <Button inverted color="red" onClick={this.closeQuestionDeleteModal}>
                    아니요
                  </Button>
                  <Button inverted color="green" onClick={this.deleteQuestion} positive icon="checkmark" labelPosition="right" content="네" />
                </Modal.Actions>
              </Modal>
              <Style.CardMeta>
                {
                  this.props.question.get('topics').map((category) =>
                    <Style.TopicHeader key={category.get('id')} to={`/topic/${category.get('id')}`}>{category.get('title')}</Style.TopicHeader>
                  )
                }
              </Style.CardMeta>
              <Style.CardHeaderWrapper>
                {`Q.${this.props.question.get('title')}`}
              </Style.CardHeaderWrapper>
              <Style.CardDescription>
                {
                  (this.isQuestionEmpty()) ?
                    null :
                    <WonderEditorView
                      editorState={this.state.editorState}
                      readOnly
                    />
                }
              </Style.CardDescription>
              <MediaQuery minWidth={1008}>
                <Style.MobileStats>
                  {
                    this.props.question.get('followed_num') ? (
                      <span onClick={this.handleFollower}>
                        팔로우 {this.props.question.get('followed_num')}명
                      </span>
                    ) : (
                      null
                    )
                  }
                  {
                    this.props.question.get('followed_num') && this.props.question.get('comment_num') ? (
                      <span>
                        &middot;
                      </span>
                    ) : null
                  }
                  {
                    this.props.question.get('comment_num') ? (
                      <span onClick={this.handleCommentVisible}>
                        댓글 {this.props.question.get('comment_num')}개
                      </span>
                    ) : (
                      null
                    )
                  }
                </Style.MobileStats>
                <Style.CardContentExtra>
                  <Style.LeftButtons>
                    <Style.MarginRightButton onClick={this.handleWriteAnswerClick}>
                      <Icon name="write" />
                      <div className="underline">
                        {(this.props.question.get('is_answered')) ? '답변수정' : '답변하기'}
                      </div>
                    </Style.MarginRightButton>
                    <Style.MarginRightButton enable={this.props.question.get('is_followed')} onClick={this.handleFollow}>
                      <Icon name="idea" />
                      <div className="underline">
                        팔로우
                    </div>
                    </Style.MarginRightButton>
                    <Style.MarginRightButton onClick={this.handleCommentVisible}>
                      <Icon name="comment outline" />
                      <div className="underline">
                        댓글
                      </div>
                    </Style.MarginRightButton>
                    <Style.ShareButtonWrapper>
                      <ShareButton
                        question={this.props.question}
                        url={`${URL_ROOT}/question/${this.props.question.get('id')}`}
                      />
                    </Style.ShareButtonWrapper>
                  </Style.LeftButtons>
                  <Style.FlexDiv>
                    {
                      this.props.question.get('is_mine') ? (
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
                            <Style.BlockA onClick={this.startModifyingQuestion}><Icon name="pencil" />수정하기</Style.BlockA>
                            {
                              (this.props.question.get('answer_num') === 0) ? (
                                <Style.BlockA onClick={this.openQuestionDeleteModal}><Icon name="trash outline" />삭제하기</Style.BlockA>
                              ) : null
                            }
                            <Style.BlockA onClick={this.handleQuestionBookmark}>
                              <Icon name="bookmark" />
                              {
                                this.props.question.get('is_bookmark') ? (
                                  '북마크 취소'
                                ) : (
                                  '북마크'
                                )
                              }
                            </Style.BlockA>
                          </Style.PopupContent>
                        </CustomPopup>
                      ) : (
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
                                this.props.question.get('is_bookmark') ? (
                                  '북마크 취소'
                                ) : (
                                  '북마크'
                                )
                              }
                            </Style.BlockA>
                          </Style.PopupContent>
                        </CustomPopup>
                      )
                    }
                  </Style.FlexDiv>
                </Style.CardContentExtra>
              </MediaQuery>
              <MediaQuery maxWidth={1008}>
                <Style.MobileStats>
                  {
                    this.props.question.get('followed_num') ? (
                      <Style.PreventStyleLink to={`/question/${this.props.question.get('id')}/followers`}>
                        팔로우 {this.props.question.get('followed_num')}명
                      </Style.PreventStyleLink>
                    ) : (
                      null
                    )
                  }
                  {
                    this.props.question.get('followed_num') && this.props.question.get('comment_num') ? (
                      <span>
                        &middot;
                      </span>
                    ) : null
                  }
                  {
                    this.props.question.get('comment_num') ? (
                      <span onClick={this.handleCommentVisible}>
                        댓글 {this.props.question.get('comment_num')}개
                      </span>
                    ) : (
                      null
                    )
                  }
                </Style.MobileStats>
                <Style.CardContentExtra>
                  <Style.LeftButtons>
                    {
                      this.props.question.get('is_answered') ? (
                        <Style.MarginRightButton onClick={this.handleMobileModifyAnswerClick}>
                          <Icon name="write" />
                          <div className="underline">
                            답변수정
                          </div>
                        </Style.MarginRightButton>
                      ) : (
                        <Style.MarginRightButton onClick={this.handleMobileWriteAnswerClick}>
                          <Icon name="write" />
                          <div className="underline">
                            답변하기
                          </div>
                        </Style.MarginRightButton>
                      )
                    }
                    <Style.MarginRightButton enable={this.props.question.get('is_followed')} onClick={this.handleFollow}>
                      <Icon name="idea" />
                      <div className="underline">
                        팔로우
                    </div>
                    </Style.MarginRightButton>
                    <Style.MarginRightButton onClick={this.handleCommentVisible}>
                      <Icon name="comment outline" />
                      <div className="underline">
                        댓글
                    </div>
                    </Style.MarginRightButton>
                  </Style.LeftButtons>
                  <Style.FlexDiv>
                    <ShareButton
                      question={this.props.question}
                      url={`${URL_ROOT}/question/${this.props.question.get('id')}`}
                      icon
                    />
                    <QuestionActionSheet
                      question={this.props.question}
                      onModify={this.startModifyingMobileQuestion}
                      onDelete={this.openQuestionDeleteModal}
                      onBookmark={this.handleQuestionBookmark}
                    />
                  </Style.FlexDiv>
                </Style.CardContentExtra>
              </MediaQuery>
              {
                (commentVisible) ? (
                  <CommentContainer
                    comments={this.props.question.get('comments')}
                    commentSize={this.props.question.get('comment_num')}
                    loggedInUser={this.props.loggedInUser}
                    onGetCommentRequest={() => (this.props.onGetQuestionCommentsRequest(this.props.question.get('id')))}
                    onPostCommentRequest={(comment) => {
                      this.props.onPostQuestionCommentRequest(comment, this.props.question.get('id'));
                    }}
                    onPutCommentRequest={this.props.onPutQuestionCommentRequest}
                    onDeleteCommentRequest={(commentID) => {
                      this.props.onDeleteQuestionCommentRequest(commentID, this.props.question.get('id'));
                    }}
                    onLikeCommentRequest={this.props.onLikeQuestionCommentRequest}
                    isCommentsLoading={this.props.question.get('isCommentsLoading')}
                    updateRedirectPage={this.props.updateRedirectPage}
                  />
                ) : (
                    null
                  )
              }
              {
                (commentVisible && answerEditorVisible) ? (
                  <Style.EmptyDiv />
                ) : null
              }
              {
                answerEditorVisible ?
                  (
                    <AnswerWriteForm
                      editorState={this.state.answerEditorState}
                      onEditorStateChange={this.handleAnswerEditorStateChange}
                      isModifying={this.props.question.get('is_answered')}
                      onSubmit={this.handleAnswerSubmit}
                      answerWriter={this.props.loggedInUser}
                      onCancel={this.handleAnswerWriteCancel}
                    />
                  ) : null
              }
            </Style.MarginDiv>
        )
      )
  }
}

QuestionDetailQuestion.propTypes = {
  question: QuestionShape,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  openQuestionEditFormModal: PropTypes.func.isRequired,
  onWriteAnswerRequest: PropTypes.func.isRequired,
  onModifyAnswerRequest: PropTypes.func.isRequired,
  onDeleteQuestionRequest: PropTypes.func.isRequired,
  willWriteAnswer: PropTypes.bool,
  isQuestionLoading: PropTypes.bool,
  onFollowQuestionRequest: PropTypes.func.isRequired,
  onGetQuestionCommentsRequest: PropTypes.func.isRequired,
  onPostQuestionCommentRequest: PropTypes.func.isRequired,
  onPutQuestionCommentRequest: PropTypes.func.isRequired,
  onDeleteQuestionCommentRequest: PropTypes.func.isRequired,
  onLikeQuestionCommentRequest: PropTypes.func.isRequired,
  updateRedirectPage: PropTypes.func.isRequired,
  setInitialQuestionData: PropTypes.func.isRequired,
  setInitialAnswerData: PropTypes.func.isRequired,
  onBookmarkQuestionRequest: PropTypes.func.isRequired,
  openFollowerModal: PropTypes.func.isRequired,
  onGetQuestionFollowersRequest: PropTypes.func.isRequired,
  onOpenAnnounceModalRequest: PropTypes.func.isRequired,
};

export default QuestionDetailQuestion;
