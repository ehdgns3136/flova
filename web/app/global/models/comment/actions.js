/**
 * Created by heesu on 17. 11. 15.
 */
import { normalize } from 'normalizr';
import {
  GET_QUESTION_COMMENTS_REQUEST,
  GET_QUESTION_COMMENTS_SUCCESS,
  POST_QUESTION_COMMENT_REQUEST,
  POST_QUESTION_COMMENT_SUCCESS,
  PUT_QUESTION_COMMENT_REQUEST,
  PUT_QUESTION_COMMENT_SUCCESS,
  DELETE_QUESTION_COMMENT_REQUEST,
  DELETE_QUESTION_COMMENT_SUCCESS,
  LIKE_QUESTION_COMMENT_REQUEST,
  LIKE_QUESTION_COMMENT_FAILURE,
  GET_ANSWER_COMMENTS_REQUEST,
  GET_ANSWER_COMMENTS_SUCCESS,
  POST_ANSWER_COMMENT_REQUEST,
  POST_ANSWER_COMMENT_SUCCESS,
  PUT_ANSWER_COMMENT_REQUEST,
  PUT_ANSWER_COMMENT_SUCCESS,
  DELETE_ANSWER_COMMENT_REQUEST,
  DELETE_ANSWER_COMMENT_SUCCESS,
  LIKE_ANSWER_COMMENT_REQUEST,
  LIKE_ANSWER_COMMENT_FAILURE,
} from './constants';

import {
  questionCommentSchema,
  answerCommentSchema,
} from '../../entities/schemas';

export function getQuestionCommentsRequestAction(questionID) {
  return {
    type: GET_QUESTION_COMMENTS_REQUEST,
    questionID,
  };
}

export function getQuestionCommentsSuccessAction(questionID, comments, commentsNext, commentsPrevious) {
  return {
    type: GET_QUESTION_COMMENTS_SUCCESS,
    questionID,
    payload: normalize(comments, [questionCommentSchema]),
    commentsNext,
    commentsPrevious,
  };
}

export function postQuestionCommentRequestAction(content, questionID) {
  return {
    type: POST_QUESTION_COMMENT_REQUEST,
    content,
    questionID,
  };
}

export function postQuestionCommentSuccessAction(comment, questionID) {
  return {
    type: POST_QUESTION_COMMENT_SUCCESS,
    payload: normalize(comment, questionCommentSchema),
    questionID,
  };
}

export function putQuestionCommentRequestAction(content, commentID) {
  return {
    type: PUT_QUESTION_COMMENT_REQUEST,
    content,
    commentID,
  };
}

export function putQuestionCommentSuccessAction(comment) {
  return {
    type: PUT_QUESTION_COMMENT_SUCCESS,
    payload: normalize(comment, questionCommentSchema),
  };
}

export function deleteQuestionCommentRequestAction(commentID, questionID) {
  return {
    type: DELETE_QUESTION_COMMENT_REQUEST,
    commentID,
    questionID,
  };
}

export function deleteQuestionCommentSuccessAction(commentID, questionID) {
  return {
    type: DELETE_QUESTION_COMMENT_SUCCESS,
    commentID,
    questionID,
  };
}

export function likeQuestionCommentRequestAction(commentID) {
  return {
    type: LIKE_QUESTION_COMMENT_REQUEST,
    commentID,
  };
}

export function likeQuestionCommentFailureAction(commentID) {
  return {
    type: LIKE_QUESTION_COMMENT_FAILURE,
    commentID,
  };
}

export function getAnswerCommentsRequestAction(answerID) {
  return {
    type: GET_ANSWER_COMMENTS_REQUEST,
    answerID,
  };
}

export function getAnswerCommentsSuccessAction(answerID, comments, commentsNext, commentsPrevious) {
  return {
    type: GET_ANSWER_COMMENTS_SUCCESS,
    answerID,
    payload: normalize(comments, [answerCommentSchema]),
    commentsNext,
    commentsPrevious,
  };
}

export function postAnswerCommentRequestAction(content, answerID) {
  return {
    type: POST_ANSWER_COMMENT_REQUEST,
    content,
    answerID,
  };
}

export function postAnswerCommentSuccessAction(comment, answerID) {
  return {
    type: POST_ANSWER_COMMENT_SUCCESS,
    payload: normalize(comment, answerCommentSchema),
    answerID,
  };
}

export function putAnswerCommentRequestAction(content, commentID) {
  return {
    type: PUT_ANSWER_COMMENT_REQUEST,
    content,
    commentID,
  };
}

export function putAnswerCommentSuccessAction(comment) {
  return {
    type: PUT_ANSWER_COMMENT_SUCCESS,
    payload: normalize(comment, answerCommentSchema),
  };
}

export function deleteAnswerCommentRequestAction(commentID, answerID) {
  return {
    type: DELETE_ANSWER_COMMENT_REQUEST,
    commentID,
    answerID,
  };
}

export function deleteAnswerCommentSuccessAction(commentID, answerID) {
  return {
    type: DELETE_ANSWER_COMMENT_SUCCESS,
    commentID,
    answerID,
  };
}

export function likeAnswerCommentRequestAction(commentID) {
  return {
    type: LIKE_ANSWER_COMMENT_REQUEST,
    commentID,
  };
}

export function likeAnswerCommentFailureAction(commentID) {
  return {
    type: LIKE_ANSWER_COMMENT_FAILURE,
    commentID,
  };
}
