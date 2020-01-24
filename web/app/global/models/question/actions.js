/**
 * Created by heesu on 17. 8. 23.
 */
import { normalize } from 'normalizr';
import {
  CLOSE_QUESTION_FORM_MODAL,
  OPEN_QUESTION_FORM_MODAL,
  POST_QUESTION_FAILURE,
  POST_QUESTION_REQUEST,
  POST_QUESTION_SUCCESS,
  SET_INITIAL_TITLE,
  CLOSE_QUESTION_EDIT_FORM_MODAL,
  OPEN_QUESTION_EDIT_FORM_MODAL,
  EDIT_QUESTION_FAILURE,
  EDIT_QUESTION_REQUEST,
  EDIT_QUESTION_SUCCESS,
  SET_INITIAL_DATA,
  FOLLOW_QUESTION_REQUEST,
  FOLLOW_QUESTION_SUCCESS,
  FOLLOW_QUESTION_FAILURE,
  BOOKMARK_QUESTION_REQUEST,
  BOOKMARK_QUESTION_SUCCESS,
  BOOKMARK_QUESTION_FAILURE,
  OPEN_FOLLOWER_MODAL,
  CLOSE_FOLLOWER_MODAL,
  GET_QUESTION_FOLLOWERS_REQUEST,
  GET_QUESTION_FOLLOWERS_SUCCESS,
  GET_QUESTION_FOLLOWERS_FAILURE,
} from './constants';
import { userSchema, questionSchema } from '../../entities/schemas';

export function openQuestionFormModal(initialTitle) {
  return {
    type: OPEN_QUESTION_FORM_MODAL,
    initialTitle,
  };
}

export function closeQuestionFormModal() {
  return {
    type: CLOSE_QUESTION_FORM_MODAL,
  };
}

export function postQuestionRequest(title, editorState, anonymous, topics) {
  return {
    type: POST_QUESTION_REQUEST,
    title,
    editorState,
    anonymous,
    topics,
  };
}

export function postQuestionSuccess() {
  return {
    type: POST_QUESTION_SUCCESS,
  };
}

export function postQuestionFailure() {
  return {
    type: POST_QUESTION_FAILURE,
  };
}

export function setInitialTitle(initialTitle) {
  return {
    type: SET_INITIAL_TITLE,
    initialTitle,
  };
}

export function openQuestionEditFormModal(questionID, initialTitle, initialContent, initialTopics) {
  return {
    type: OPEN_QUESTION_EDIT_FORM_MODAL,
    questionID,
    initialTitle,
    initialContent,
    initialTopics,
  };
}

export function closeQuestionEditFormModal() {
  return {
    type: CLOSE_QUESTION_EDIT_FORM_MODAL,
  };
}

export function editQuestionRequest(questionID, title, editorState, topics) {
  return {
    type: EDIT_QUESTION_REQUEST,
    questionID,
    title,
    editorState,
    topics,
  };
}

export function editQuestionSuccess(question) {
  return {
    type: EDIT_QUESTION_SUCCESS,
    payload: normalize(question, questionSchema),
  };
}

export function editQuestionFailure() {
  return {
    type: EDIT_QUESTION_FAILURE,
  };
}

export function setInitialData(questionID, initialTitle, initialContent, initialTopics) {
  return {
    type: SET_INITIAL_DATA,
    questionID,
    initialTitle,
    initialContent,
    initialTopics,
  };
}

export function followQuestionRequest(questionID) {
  return {
    type: FOLLOW_QUESTION_REQUEST,
    questionID,
  };
}

export function followQuestionSuccess(questionID) {
  return {
    type: FOLLOW_QUESTION_SUCCESS,
    questionID,
  };
}

export function followQuestionFailure(questionID) {
  return {
    type: FOLLOW_QUESTION_FAILURE,
    questionID,
  };
}

export function bookmarkQuestionRequest(questionID) {
  return {
    type: BOOKMARK_QUESTION_REQUEST,
    questionID,
  };
}

export function bookmarkQuestionSuccess(questionID) {
  return {
    type: BOOKMARK_QUESTION_SUCCESS,
    questionID,
  };
}

export function bookmarkQuestionFailure(questionID) {
  return {
    type: BOOKMARK_QUESTION_FAILURE,
    questionID,
  };
}

export function openFollowerModal() {
  return {
    type: OPEN_FOLLOWER_MODAL,
  };
}

export function closeFollowerModal() {
  return {
    type: CLOSE_FOLLOWER_MODAL,
  };
}

export function getQuestionFollowersRequest(id) {
  return {
    type: GET_QUESTION_FOLLOWERS_REQUEST,
    id,
  };
}

export function getQuestionFollowersSuccess(followers) {
  return {
    type: GET_QUESTION_FOLLOWERS_SUCCESS,
    payload: normalize(followers, [userSchema]),
  };
}

export function getQuestionFollowersFailure() {
  return {
    type: GET_QUESTION_FOLLOWERS_FAILURE,
  };
}
