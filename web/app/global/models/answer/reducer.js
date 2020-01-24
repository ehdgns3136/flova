/*
 *
 * Global reducer
 *
 */

import { fromJS } from 'immutable';
import {
  POST_ANSWER_REQUEST,
  POST_ANSWER_SUCCESS,
  POST_ANSWER_FAILURE,
  EDIT_ANSWER_REQUEST,
  EDIT_ANSWER_SUCCESS,
  EDIT_ANSWER_FAILURE,
  SET_INITIAL_DATA,
  OPEN_LIKER_MODAL,
  CLOSE_LIKER_MODAL,
  GET_ANSWER_LIKERS_REQUEST,
  GET_ANSWER_LIKERS_SUCCESS,
  GET_ANSWER_LIKERS_FAILURE,
} from './constants';

const initialState = fromJS({
  isAnswerUploading: false,
  isAnswerUploadError: false,

  questionID: null,
  initialContent: null,
  initialTitle: null,

  isLikerModalOpened: false,
  isLikersLoading: false,
  likers: null,
});


function answerReducer(state = initialState, action) {
  switch (action.type) {
    case POST_ANSWER_REQUEST:
      return state.set('isAnswerUploading', true);
    case POST_ANSWER_SUCCESS:
      return state.set('isAnswerUploading', false);
    case POST_ANSWER_FAILURE:
      return state.set('isAnswerUploading', false)
        .set('isAnswerUploadError', true);
    case EDIT_ANSWER_REQUEST:
      return state.set('isAnswerUploading', true);
    case EDIT_ANSWER_SUCCESS:
      return state.set('isAnswerUploading', false);
    case EDIT_ANSWER_FAILURE:
      return state.set('isAnswerUploading', false)
        .set('isAnswerUploadError', true);
    case SET_INITIAL_DATA:
      return state.set('questionID', action.questionID)
        .set('initialTitle', action.initialTitle)
        .set('initialContent', action.initialContent);
    case OPEN_LIKER_MODAL:
      return state.set('isLikerModalOpened', true);
    case CLOSE_LIKER_MODAL:
      return state.set('isLikerModalOpened', false);
    case GET_ANSWER_LIKERS_REQUEST:
      return state.set('likers', null).set('isLikersLoading', true);
    case GET_ANSWER_LIKERS_SUCCESS:
      return state.set('likers', fromJS(action.payload.result)).set('isLikersLoading', false);
    case GET_ANSWER_LIKERS_FAILURE:
      return state.set('likers', null).set('isLikersLoading', false);
    default:
      return state;
  }
}

export default answerReducer;
