/*
 *
 * QuestionDetailPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ANSWERS_GET_REQUEST,
  ANSWERS_GET_SUCCESS,
  ANSWERS_GET_FAILURE,
  QUESTION_GET_REQUEST,
  QUESTION_GET_SUCCESS,
  QUESTION_GET_FAILURE,
  INITIALIZE_REDUCER,
} from './constants';

import {
  POST_ANSWER_SUCCESS,
  DELETE_ANSWER_SUCCESS,
} from '../../global/models/answer/constants';

export const initialState = fromJS({
  answers: [],
  question: null,
  isAnswersLoading: false,
  isQuestionLoading: false,
});

function questionDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case ANSWERS_GET_REQUEST:
      return state.set('isAnswersLoading', true);
    case ANSWERS_GET_SUCCESS: {
      return state.set('answers', fromJS(action.payload.result))
        .set('isAnswersLoading', false);
    }
    case ANSWERS_GET_FAILURE:
      return state.set('isAnswersLoading', false);

    case QUESTION_GET_REQUEST:
      return state.set('isQuestionLoading', true);
    case QUESTION_GET_SUCCESS:
      return state.set('question', fromJS(action.payload.result))
        .set('isQuestionLoading', false);
    case QUESTION_GET_FAILURE:
      return state.set('isQuestionLoading', false);
    case POST_ANSWER_SUCCESS:
      return state.set('answers', state.get('answers').unshift(fromJS(action.payload.result)));
    case DELETE_ANSWER_SUCCESS:
      return state.set('answers', state.get('answers').delete(state.get('answers').findIndex((answer) => answer === action.answerID)));

    case INITIALIZE_REDUCER:
      return initialState;
    default:
      return state;
  }
}

export default questionDetailPageReducer;
