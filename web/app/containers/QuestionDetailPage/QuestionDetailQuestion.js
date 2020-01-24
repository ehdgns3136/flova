import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import QuestionDetailQuestion from 'components/QuestionDetailQuestion';
import {
  answersGetRequestAction,
  questionGetRequestAction,
  questionDeleteRequestAction,
} from './actions';

import {
  makeSelectQuestion,
  makeSelectIsQuestionLoading,
} from './selectors';

import {
  makeSelectLoggedInUser,
} from '../../global/selectors';

import {
  updateRedirectPageRequestAction,
  openAnnounceModalRequestAction,
} from '../../global/actions';

import {
  openQuestionEditFormModal,
  setInitialData as setInitialQuestionData,
  followQuestionRequest,
  bookmarkQuestionRequest,
  openFollowerModal,
  getQuestionFollowersRequest,
} from '../../global/models/question/actions';

import {
  getQuestionCommentsRequestAction,
  postQuestionCommentRequestAction,
  putQuestionCommentRequestAction,
  deleteQuestionCommentRequestAction,
  likeQuestionCommentRequestAction,
} from '../../global/models/comment/actions';

import {
  postAnswerRequest,
  editAnswerRequest,
  setInitialData as setInitialAnswerData,
} from '../../global/models/answer/actions';

const mapStateToProps = createStructuredSelector({
  question: makeSelectQuestion(),
  isQuestionLoading: makeSelectIsQuestionLoading(),
  loggedInUser: makeSelectLoggedInUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onWriteAnswerRequest: (editorState, questionID) => {
      dispatch(postAnswerRequest(editorState, questionID));
    },
    onModifyAnswerRequest: (answerID, editorState) => {
      dispatch(editAnswerRequest(answerID, editorState));
    },
    onGetAnswersRequest: (questionID) => {
      dispatch(answersGetRequestAction(questionID));
    },
    onGetQuestionRequest: (questionID) => {
      dispatch(questionGetRequestAction(questionID));
    },
    openQuestionEditFormModal: (questionID, initialTitle, initialContent, initialTopics) => {
      dispatch(openQuestionEditFormModal(questionID, initialTitle, initialContent, initialTopics));
    },
    onDeleteQuestionRequest: () => {
      dispatch(questionDeleteRequestAction());
    },
    onFollowQuestionRequest: (questionID) => {
      dispatch(followQuestionRequest(questionID));
    },
    onGetQuestionCommentsRequest: (questionID) => {
      dispatch(getQuestionCommentsRequestAction(questionID));
    },
    onPostQuestionCommentRequest: (content, questionID) => {
      dispatch(postQuestionCommentRequestAction(content, questionID));
    },
    onPutQuestionCommentRequest: (content, commentID) => {
      dispatch(putQuestionCommentRequestAction(content, commentID));
    },
    onDeleteQuestionCommentRequest: (commentID, questionID) => {
      dispatch(deleteQuestionCommentRequestAction(commentID, questionID));
    },
    onLikeQuestionCommentRequest: (commentID) => {
      dispatch(likeQuestionCommentRequestAction(commentID));
    },
    updateRedirectPage: (url) => {
      dispatch(updateRedirectPageRequestAction(url));
    },
    setInitialQuestionData: (questionID, initialTitle, initialContent, initialTopics) => {
      dispatch(setInitialQuestionData(questionID, initialTitle, initialContent, initialTopics));
    },
    setInitialAnswerData: (questionID, initialTitle, initialContent) => {
      dispatch(setInitialAnswerData(questionID, initialTitle, initialContent));
    },
    onBookmarkQuestionRequest: (questionID) => {
      dispatch(bookmarkQuestionRequest(questionID));
    },
    openFollowerModal: () => {
      dispatch(openFollowerModal());
    },
    onGetQuestionFollowersRequest: (id) => {
      dispatch(getQuestionFollowersRequest(id));
    },
    onOpenAnnounceModalRequest: (announceType) => {
      dispatch(openAnnounceModalRequestAction(announceType));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailQuestion);
