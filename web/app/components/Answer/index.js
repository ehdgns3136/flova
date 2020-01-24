/**
 * Created by donghoon on 17. 7. 6.
 */

import React from 'react';
import { Label, Button, Modal, Icon } from 'semantic-ui-react';
import Immutable, { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import WonderEditorView from 'components/WonderEditor/WonderEditorView';
import { safelyParseEditorStateString, getEditorStateLength } from 'components/WonderEditor/utils/editor-state-utils';
import AnswerWriteForm from 'components/AnswerWriteForm';
import AnswerWriterInfo from 'components/AnswerWriterInfo';
import CustomPopup from 'components/CustomPopup';
import CommentContainer from 'components/CommentContainer';
import { browserHistory } from 'react-router';
import MediaQuery from 'react-responsive';
import ShareButton from 'components/ShareButton';

import * as Style from './index.style';
import AnswerActionSheet from './AnswerActionSheet';

class Answer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const editorState = safelyParseEditorStateString(this.props.answer.get('content'));

    this.state = {
      editorState,
      isModifying: false,
      modifyingEditorState: null,
      isDeleteModalOpened: false,
      commentVisible: false,
      commentClicked: false,
    };
    this.handleModifyButtonClick = this.handleModifyButtonClick.bind(this);
    this.handleModifyMobileButtonClick = this.handleModifyMobileButtonClick.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAnswerEditorStateChange = this.handleAnswerEditorStateChange.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleCommentVisible = this.handleCommentVisible.bind(this);
    this.handleAnswerBookmark = this.handleAnswerBookmark.bind(this);
    this.handleLiker = this.handleLiker.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.answer && nextProps.answer.get('content') !== this.props.answer.get('content')) {
      const newEditorState = safelyParseEditorStateString(nextProps.answer.get('content'));
      this.setState({
        editorState: newEditorState,
      });
    }
  }

  handleAnswerEditorStateChange(newAnswerEditorState) {
    this.setState({
      modifyingEditorState: newAnswerEditorState,
    });
  }

  handleAnswerSubmit(answerEditorState) {
    if (getEditorStateLength(answerEditorState) <= 50) {
      this.props.onOpenAnnounceModalRequest('over50Character');
    } else {
      this.props.onModifyAnswerRequest(this.props.answer.get('id'), answerEditorState);

      this.setState({
        isModifying: false,
      });
    }
  }

  handleCancel() {
    this.setState({
      isModifying: false,
    });
  }

  openDeleteModal() {
    this.setState({
      isDeleteModalOpened: true,
    });
  }

  closeDeleteModal() {
    this.setState({
      isDeleteModalOpened: false,
    });
  }

  handleModifyButtonClick() {
    this.setState({
      isModifying: true,
      modifyingEditorState: this.state.editorState,
    });
  }

  handleModifyMobileButtonClick() {
    this.props.setInitialData(this.props.answer.get('content'));
    browserHistory.push(`/answer/${this.props.answer.get('id')}/edit`);
  }

  deleteAnswer() {
    this.props.onDeleteAnswerRequest(this.props.answer.get('id'));
    this.closeDeleteModal();
  }

  handleLike() {
    const { answer, onLikeAnswerRequest } = this.props;
    onLikeAnswerRequest(answer.get('id'), answer.get('is_downvoted'));
  }

  handleDownvote() {
    const { answer, onDownvoteAnswerRequest } = this.props;
    onDownvoteAnswerRequest(answer.get('id'), answer.get('is_liked'));
  }

  handleCommentVisible() {
    if (this.props.answer.get('comments').size === 0 && !this.state.commentClicked) {
      this.props.onGetAnswerCommentsRequest(this.props.answer.get('id'));
    }
    this.setState({
      commentVisible: !this.state.commentVisible,
      commentClicked: true,
    });
  }

  handleAnswerBookmark() {
    this.props.onBookmarkAnswerRequest(this.props.answer.get('id'));
  }

  handleLiker() {
    const { openLikerModal, onGetAnswerLikersRequest, answer } = this.props;
    openLikerModal();
    onGetAnswerLikersRequest(answer.get('id'));
  }

  render() {
    const { commentVisible } = this.state;
    const { answer, question } = this.props;

    return (
      <Style.AnswerWrapper>
        <Modal
          basic
          open={this.state.isDeleteModalOpened}
          closeOnDimmerClick={false}
        >
          <Modal.Header>정말 답변을 삭제하시겠습니까?</Modal.Header>
          <Modal.Content>이 작업은 되돌릴 수 없습니다.</Modal.Content>
          <Modal.Actions>
            <Button inverted color="red" onClick={this.closeDeleteModal}>
              아니요
            </Button>
            <Button inverted color="green" onClick={this.deleteAnswer} positive icon="checkmark" labelPosition="right" content="네" />
          </Modal.Actions>
        </Modal>
        {
          (this.state.isModifying) ? (
            <AnswerWriteForm
              editorState={this.state.modifyingEditorState}
              onEditorStateChange={this.handleAnswerEditorStateChange}
              isModifying
              onSubmit={this.handleAnswerSubmit}
              answerWriter={this.props.loggedInUser}
              onCancel={this.handleCancel}
            />
          ) : (
              <Style.AnswerExceptComment>
                <AnswerWriterInfo
                  answerWriter={answer.get('writer')}
                  created={answer.get('created')}
                  loggedInUser={this.props.loggedInUser}
                  onFollowUserRequest={this.props.onFollowUserRequest}
                />
                <Style.AnswerContent>
                  <WonderEditorView
                    editorState={this.state.editorState}
                    readOnly
                  />
                </Style.AnswerContent>
                <Style.MobileStats>
                  {
                    answer.get('liked_num') ? (
                      <div>
                        <MediaQuery minWidth={1008}>
                          <span onClick={this.handleLiker}>
                            좋아요 {answer.get('liked_num')}명
                          </span>
                        </MediaQuery>
                        <MediaQuery maxWidth={1008}>
                          <Style.PreventStyleLink to={`/answer/${answer.get('id')}/likers`}>
                            좋아요 {answer.get('liked_num')}명
                          </Style.PreventStyleLink>
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
                      <span onClick={this.handleCommentVisible}>
                        댓글 {answer.get('comment_num')}개
                      </span>
                    ) : (
                      null
                    )
                  }
                </Style.MobileStats>
                <Style.CardContentExtra>
                  <Style.LeftButtons>
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
                    <Style.MarginRightButton onClick={this.handleCommentVisible}>
                      <Icon name="comment outline" />
                      <div className="underline">
                        댓글
                      </div>
                    </Style.MarginRightButton>
                    <MediaQuery minWidth={1008}>
                      <Style.MarginRightButton>
                        <ShareButton
                          question={question}
                          answer={answer}
                          url={`${URL_ROOT}/answer/${answer.get('id')}`}
                        />
                      </Style.MarginRightButton>
                    </MediaQuery>
                  </Style.LeftButtons>
                  <Style.FlexDiv>
                    {
                      answer.get('is_mine') ? (
                        <div>
                          <MediaQuery maxDeviceWidth={1008}>
                            <Style.FlexDiv>
                              <ShareButton
                                question={question}
                                answer={answer}
                                url={`${URL_ROOT}/answer/${answer.get('id')}`}
                                icon
                              />
                              <AnswerActionSheet
                                answer={answer}
                                onModify={this.handleModifyMobileButtonClick}
                                onDelete={this.openDeleteModal}
                                onBookmark={this.handleAnswerBookmark}
                              />
                            </Style.FlexDiv>
                          </MediaQuery>
                          <MediaQuery minDeviceWidth={1008}>
                            <CustomPopup
                              closeOnInsideClick
                              wrapElement={<span />}
                              trigger={
                                <Style.RightIconButton>
                                  <i className="fa fa-ellipsis-h" />
                                </Style.RightIconButton>
                              }
                              arrowPositionRight="15px"
                              marginTop="4px"
                            >
                              <Style.PopupContent>
                                <Style.BlockA onClick={this.handleModifyButtonClick}><Icon name="pencil" />수정하기</Style.BlockA>
                                <Style.BlockA onClick={this.openDeleteModal}><Icon name="trash outline" />삭제하기</Style.BlockA>
                                <Style.BlockA onClick={this.handleAnswerBookmark}>
                                  <Icon name="bookmark" />
                                  {
                                    answer.get('is_bookmark') ? (
                                      '북마크 취소'
                                    ) : (
                                      '북마크'
                                    )
                                  }
                                </Style.BlockA>
                              </Style.PopupContent>
                            </CustomPopup>
                          </MediaQuery>
                        </div>
                      ) : (
                        <div>
                          <MediaQuery maxDeviceWidth={1008}>
                            <Style.FlexDiv>
                              <ShareButton
                                question={question}
                                answer={answer}
                                url={`${URL_ROOT}/answer/${answer.get('id')}`}
                                icon
                              />
                              <AnswerActionSheet
                                answer={answer}
                                onModify={this.handleModifyMobileButtonClick}
                                onDelete={this.openDeleteModal}
                                onBookmark={this.handleAnswerBookmark}
                              />
                            </Style.FlexDiv>
                          </MediaQuery>
                          <MediaQuery minDeviceWidth={1008}>
                            <CustomPopup
                              closeOnInsideClick
                              wrapElement={<span />}
                              trigger={
                                <Style.RightIconButton>
                                  <i className="fa fa-ellipsis-h" />
                                </Style.RightIconButton>
                              }
                              arrowPositionRight="15px"
                              marginTop="4px"
                            >
                              <Style.PopupContent>
                                <Style.BlockA onClick={this.handleAnswerBookmark}>
                                  <Icon name="bookmark" />
                                  {
                                    answer.get('is_bookmark') ? (
                                      '북마크 취소'
                                    ) : (
                                      '북마크'
                                    )
                                  }
                                </Style.BlockA>
                              </Style.PopupContent>
                            </CustomPopup>
                          </MediaQuery>
                        </div>
                      )
                    }
                  </Style.FlexDiv>
                </Style.CardContentExtra>
              </Style.AnswerExceptComment>
            )
        }
        {
          (commentVisible) ? (
            <CommentContainer
              comments={answer.get('comments')}
              commentSize={answer.get('comment_num')}
              loggedInUser={this.props.loggedInUser}
              onGetCommentRequest={() => (this.props.onGetAnswerCommentsRequest(answer.get('id')))}
              onPostCommentRequest={(comment) => {
                this.props.onPostAnswerCommentRequest(comment, answer.get('id'));
              }}
              onPutCommentRequest={this.props.onPutAnswerCommentRequest}
              onDeleteCommentRequest={(commentID) => {
                this.props.onDeleteAnswerCommentRequest(commentID, answer.get('id'));
              }}
              onLikeCommentRequest={this.props.onLikeAnswerCommentRequest}
              isCommentsLoading={answer.get('isCommentsLoading')}
              updateRedirectPage={this.props.updateRedirectPage}
            />
          ) : (
            null
          )
        }
      </Style.AnswerWrapper>
    );
  }
}

Answer.propTypes = {
  answer: PropTypes.instanceOf(Immutable.Map),
  question: PropTypes.instanceOf(Immutable.Map),
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onModifyAnswerRequest: PropTypes.func.isRequired,
  onDeleteAnswerRequest: PropTypes.func.isRequired,
  onLikeAnswerRequest: PropTypes.func.isRequired,
  onDownvoteAnswerRequest: PropTypes.func.isRequired,
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

export default Answer;
