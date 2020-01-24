/**
 * Created by donghoon on 18. 1. 30.
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Answer from 'components/Answer';

import {
  makeSelectAnswer,
  makeSelectQuestion,
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
  loggedInUser: makeSelectLoggedInUser(),
  answer: makeSelectAnswer(),
  question: makeSelectQuestion(),
});

function mapDispatchToProps(dispatch) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
