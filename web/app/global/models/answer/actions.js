import { normalize } from 'normalizr';
import {
  answerSchema,
  userSchema,
} from '../../entities/schemas';
import {
  POST_ANSWER_FAILURE,
  POST_ANSWER_REQUEST,
  POST_ANSWER_SUCCESS,
  EDIT_ANSWER_FAILURE,
  EDIT_ANSWER_REQUEST,
  EDIT_ANSWER_SUCCESS,
  DELETE_ANSWER_REQUEST,
  DELETE_ANSWER_SUCCESS,
  DELETE_ANSWER_FAILURE,
  LIKE_ANSWER_REQUEST,
  LIKE_ANSWER_SUCCESS,
  LIKE_ANSWER_FAILURE,
  DOWNVOTE_ANSWER_REQUEST,
  DOWNVOTE_ANSWER_SUCCESS,
  DOWNVOTE_ANSWER_FAILURE,
  SET_INITIAL_DATA,
  BOOKMARK_ANSWER_REQUEST,
  BOOKMARK_ANSWER_SUCCESS,
  BOOKMARK_ANSWER_FAILURE,
  OPEN_LIKER_MODAL,
  CLOSE_LIKER_MODAL,
  GET_ANSWER_LIKERS_REQUEST,
  GET_ANSWER_LIKERS_SUCCESS,
  GET_ANSWER_LIKERS_FAILURE,
} from './constants';

export function postAnswerRequest(editorState, questionID) {
  return {
    type: POST_ANSWER_REQUEST,
    editorState,
    questionID,
  };
}

export function postAnswerSuccess(answer, questionID) {
  return {
    type: POST_ANSWER_SUCCESS,
    payload: normalize(answer, answerSchema),
    questionID,
  };
}

export function postAnswerFailure() {
  return {
    type: POST_ANSWER_FAILURE,
  };
}

export function editAnswerRequest(answerID, editorState) {
  return {
    type: EDIT_ANSWER_REQUEST,
    answerID,
    editorState,
  };
}

export function editAnswerSuccess(answer) {
  return {
    type: EDIT_ANSWER_SUCCESS,
    payload: normalize(answer, answerSchema),
  };
}

export function editAnswerFailure() {
  return {
    type: EDIT_ANSWER_FAILURE,
  };
}

export function deleteAnswerRequest(answerID, questionID) {
  return {
    type: DELETE_ANSWER_REQUEST,
    answerID,
    questionID,
  };
}

export function deleteAnswerSuccess(answerID, questionID) {
  return {
    type: DELETE_ANSWER_SUCCESS,
    answerID,
    questionID,
  };
}

export function deleteAnswerFailure() {
  return {
    type: DELETE_ANSWER_FAILURE,
  };
}

export function likeAnswerRequest(answerID, isDownVoted) {
  return {
    type: LIKE_ANSWER_REQUEST,
    answerID,
    isDownVoted,
  };
}

export function likeAnswerSuccess(answerID, isDownVoted) {
  return {
    type: LIKE_ANSWER_SUCCESS,
    answerID,
    isDownVoted,
  };
}

export function likeAnswerFailure(answerID, isDownVoted) {
  return {
    type: LIKE_ANSWER_FAILURE,
    answerID,
    isDownVoted,
  };
}

export function downvoteAnswerRequest(answerID, isLiked) {
  return {
    type: DOWNVOTE_ANSWER_REQUEST,
    answerID,
    isLiked,
  };
}

export function downvoteAnswerSuccess(answerID, isLiked) {
  return {
    type: DOWNVOTE_ANSWER_SUCCESS,
    answerID,
    isLiked,
  };
}

export function downvoteAnswerFailure(answerID, isLiked) {
  return {
    type: DOWNVOTE_ANSWER_FAILURE,
    answerID,
    isLiked,
  };
}

export function setInitialData(questionID, initialTitle, initialContent) {
  return {
    type: SET_INITIAL_DATA,
    questionID,
    initialTitle,
    initialContent,
  };
}

export function bookmarkAnswerRequest(answerID) {
  return {
    type: BOOKMARK_ANSWER_REQUEST,
    answerID,
  };
}

export function bookmarkAnswerSuccess(answerID) {
  return {
    type: BOOKMARK_ANSWER_SUCCESS,
    answerID,
  };
}

export function bookmarkAnswerFailure(answerID) {
  return {
    type: BOOKMARK_ANSWER_FAILURE,
    answerID,
  };
}

export function openLikerModal() {
  return {
    type: OPEN_LIKER_MODAL,
  };
}

export function closeLikerModal() {
  return {
    type: CLOSE_LIKER_MODAL,
  };
}

export function getAnswerLikersRequest(id) {
  return {
    type: GET_ANSWER_LIKERS_REQUEST,
    id,
  };
}

export function getAnswerLikersSuccess(likers) {
  return {
    type: GET_ANSWER_LIKERS_SUCCESS,
    payload: normalize(likers, [userSchema]),
  };
}

export function getAnswerLikersFailure() {
  return {
    type: GET_ANSWER_LIKERS_FAILURE,
  };
}
