import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ActivityList from 'components/ActivityList';

import {
  makeSelectLoggedInUser,
} from '../../global/selectors';

import {
  openAnnounceModalRequestAction,
  updateRedirectPageRequestAction,
} from '../../global/actions';

import {
  makeSelectQuestions,
  makeSelectQuestionsCursor,
  makeSelectIsContentsLoading,
} from './selectors';

import {
  postAnswerRequest,
  likeAnswerRequest,
  downvoteAnswerRequest,
  editAnswerRequest,
  setInitialData,
  bookmarkAnswerRequest,
  openLikerModal,
  getAnswerLikersRequest,
} from '../../global/models/answer/actions';

import {
  followQuestionRequest,
  bookmarkQuestionRequest,
  openFollowerModal,
  getQuestionFollowersRequest,
} from '../../global/models/question/actions';

import {
  followUserRequest,
} from '../../global/models/user/actions';

import {
  getQuestionCommentsRequestAction,
  postQuestionCommentRequestAction,
  putQuestionCommentRequestAction,
  deleteQuestionCommentRequestAction,
  likeQuestionCommentRequestAction,
  getAnswerCommentsRequestAction,
  postAnswerCommentRequestAction,
  putAnswerCommentRequestAction,
  deleteAnswerCommentRequestAction,
  likeAnswerCommentRequestAction,
} from '../../global/models/comment/actions';

const mapStateToProps = createStructuredSelector({
  activities: makeSelectQuestions(),
  nextCursor: makeSelectQuestionsCursor(),
  isLoading: makeSelectIsContentsLoading(),
  loggedInUser: makeSelectLoggedInUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onWriteAnswerRequest: (editorState, questionID) => {
      dispatch(postAnswerRequest(editorState, questionID));
    },
    onFollowQuestionRequest: (questionID) => {
      dispatch(followQuestionRequest(questionID));
    },
    onLikeAnswerRequest: (answerID, isDownVoted) => {
      dispatch(likeAnswerRequest(answerID, isDownVoted));
    },
    onDownvoteAnswerRequest: (answerID, isLiked) => {
      dispatch(downvoteAnswerRequest(answerID, isLiked));
    },
    onFollowUserRequest: (id) => {
      dispatch(followUserRequest(id));
    },
    onModifyAnswerRequest: (answerID, editorState) => {
      dispatch(editAnswerRequest(answerID, editorState));
    },
    setInitialData: (questionID, initialTitle, initialContent) => {
      dispatch(setInitialData(questionID, initialTitle, initialContent));
    },
    onBookmarkQuestionRequest: (questionID) => {
      dispatch(bookmarkQuestionRequest(questionID));
    },
    onBookmarkAnswerRequest: (answerID) => {
      dispatch(bookmarkAnswerRequest(answerID));
    },
    openFollowerModal: () => {
      dispatch(openFollowerModal());
    },
    onGetQuestionFollowersRequest: (id) => {
      dispatch(getQuestionFollowersRequest(id));
    },
    openLikerModal: () => {
      dispatch(openLikerModal());
    },
    onGetAnswerLikersRequest: (id) => {
      dispatch(getAnswerLikersRequest(id));
    },
    onOpenAnnounceModalRequest: (announceType) => {
      dispatch(openAnnounceModalRequestAction(announceType));
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
    onGetAnswerCommentsRequest: (answerID) => {
      dispatch(getAnswerCommentsRequestAction(answerID));
    },
    onPostAnswerCommentRequest: (content, answerID) => {
      dispatch(postAnswerCommentRequestAction(content, answerID));
    },
    onPutAnswerCommentRequest: (content, commentID) => {
      dispatch(putAnswerCommentRequestAction(content, commentID));
    },
    onDeleteAnswerCommentRequest: (commentID, answerID) => {
      dispatch(deleteAnswerCommentRequestAction(commentID, answerID));
    },
    onLikeAnswerCommentRequest: (commentID) => {
      dispatch(likeAnswerCommentRequestAction(commentID));
    },
    updateRedirectPage: (url) => {
      dispatch(updateRedirectPageRequestAction(url));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
