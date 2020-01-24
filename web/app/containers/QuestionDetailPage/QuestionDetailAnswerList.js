import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import QuestionDetailAnswerList from 'components/QuestionDetailAnswerList';
import {
  answersGetRequestAction,
} from './actions';
import {
  makeSelectAnswers,
  makeSelectQuestion,
  makeSelectIsAnswersLoading,
} from './selectors';

import {
  makeSelectLoggedInUser,
} from '../../global/selectors';

import {
  updateRedirectPageRequestAction,
  openAnnounceModalRequestAction,
} from '../../global/actions';

import {
  getAnswerCommentsRequestAction,
  postAnswerCommentRequestAction,
  putAnswerCommentRequestAction,
  deleteAnswerCommentRequestAction,
  likeAnswerCommentRequestAction,
} from '../../global/models/comment/actions';

import {
  editAnswerRequest,
  deleteAnswerRequest,
  likeAnswerRequest,
  downvoteAnswerRequest,
  setInitialData,
  bookmarkAnswerRequest,
  openLikerModal,
  getAnswerLikersRequest,
} from '../../global/models/answer/actions';

import {
  followUserRequest,
} from '../../global/models/user/actions';

const mapStateToProps = createStructuredSelector({
  answers: makeSelectAnswers(),
  question: makeSelectQuestion(),
  isAnswersLoading: makeSelectIsAnswersLoading(),
  loggedInUser: makeSelectLoggedInUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetAnswersRequest: (questionID) => {
      dispatch(answersGetRequestAction(questionID));
    },
    onModifyAnswerRequest: (content, answerID) => {
      dispatch(editAnswerRequest(content, answerID));
    },
    onDeleteAnswerRequest: (answerID, questionID) => {
      dispatch(deleteAnswerRequest(answerID, questionID));
    },
    onLikeAnswerRequest: (answerID, isDownVoted) => {
      dispatch(likeAnswerRequest(answerID, isDownVoted));
    },
    onDownvoteAnswerRequest: (answerID, isLiked) => {
      dispatch(downvoteAnswerRequest(answerID, isLiked));
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
    onFollowUserRequest: (id) => {
      dispatch(followUserRequest(id));
    },
    setInitialData: (questionID, initialTitle, initialContent) => {
      dispatch(setInitialData(questionID, initialTitle, initialContent));
    },
    onBookmarkAnswerRequest: (answerID) => {
      dispatch(bookmarkAnswerRequest(answerID));
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailAnswerList);
