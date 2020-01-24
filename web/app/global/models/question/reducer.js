/*
 *
 * Global reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CLOSE_QUESTION_FORM_MODAL,
  OPEN_QUESTION_FORM_MODAL,
  POST_QUESTION_FAILURE,
  POST_QUESTION_REQUEST,
  POST_QUESTION_SUCCESS,
  SET_INITIAL_TITLE,
  CLOSE_QUESTION_EDIT_FORM_MODAL,
  OPEN_QUESTION_EDIT_FORM_MODAL,
  EDIT_QUESTION_REQUEST,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_FAILURE,
  SET_INITIAL_DATA,
  OPEN_FOLLOWER_MODAL,
  CLOSE_FOLLOWER_MODAL,
  GET_QUESTION_FOLLOWERS_REQUEST,
  GET_QUESTION_FOLLOWERS_SUCCESS,
  GET_QUESTION_FOLLOWERS_FAILURE,
} from './constants';


const initialState = fromJS({
  isQuestionFormModalOpened: false,
  isQuestionEditFormModalOpened: false,

  isQuestionUploading: false,
  isQuestionUploadError: false,

  questionID: null,
  initialTitle: null,
  initialContent: null,
  initialTopics: null,

  isFollowerModalOpened: false,
  isFollowersLoading: false,
  followers: null,
});


function questionReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_QUESTION_FORM_MODAL:
      return state.set('isQuestionFormModalOpened', true)
        .set('initialTitle', action.initialTitle);
    case CLOSE_QUESTION_FORM_MODAL:
      return state.set('isQuestionFormModalOpened', false)
        .set('initialTitle', '');
    case POST_QUESTION_REQUEST:
      return state.set('isQuestionUploading', true);
    case POST_QUESTION_SUCCESS:
      return state.set('isQuestionUploading', false);
    case POST_QUESTION_FAILURE:
      return state.set('isQuestionUploading', false)
        .set('isQuestionUploadError', true);
    case SET_INITIAL_TITLE:
      return state.set('initialTitle', action.initialTitle);
    case OPEN_QUESTION_EDIT_FORM_MODAL:
      return state.set('isQuestionEditFormModalOpened', true)
        .set('questionID', action.questionID)
        .set('initialTitle', action.initialTitle)
        .set('initialContent', action.initialContent)
        .set('initialTopics', action.initialTopics);
    case CLOSE_QUESTION_EDIT_FORM_MODAL:
      return state.set('isQuestionEditFormModalOpened', false)
        .set('questionID', null)
        .set('initialTitle', null)
        .set('initialContent', null)
        .set('initialTopics', null);
    case EDIT_QUESTION_REQUEST:
      return state.set('isQuestionUploading', true);
    case EDIT_QUESTION_SUCCESS:
      return state.set('isQuestionUploading', false);
    case EDIT_QUESTION_FAILURE:
      return state.set('isQuestionUploading', false)
        .set('isQuestionUploadError', true);
    case SET_INITIAL_DATA:
      return state.set('questionID', action.questionID)
        .set('initialTitle', action.initialTitle)
        .set('initialContent', action.initialContent)
        .set('initialTopics', action.initialTopics);
    case OPEN_FOLLOWER_MODAL:
      return state.set('isFollowerModalOpened', true);
    case CLOSE_FOLLOWER_MODAL:
      return state.set('isFollowerModalOpened', false);
    case GET_QUESTION_FOLLOWERS_REQUEST:
      return state.set('followers', null).set('isFollowersLoading', true);
    case GET_QUESTION_FOLLOWERS_SUCCESS:
      return state.set('followers', fromJS(action.payload.result)).set('isFollowersLoading', false);
    case GET_QUESTION_FOLLOWERS_FAILURE:
      return state.set('followers', null).set('isFollowersLoading', false);
    default:
      return state;
  }
}

export default questionReducer;
