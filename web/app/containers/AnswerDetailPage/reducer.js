/*
 *
 * AnswerDetailPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ANSWER_GET_REQUEST,
  ANSWER_GET_SUCCESS,
  ANSWER_GET_FAILURE,
  QUESTION_GET_REQUEST,
  QUESTION_GET_SUCCESS,
  QUESTION_GET_FAILURE,
  INITIALIZE_REDUCER,
} from './constants';

export const initialState = fromJS({
  answer: null,
  question: null,
  isAnswerLoading: false,
  isQuestionLoading: false,
});

function answerDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case ANSWER_GET_REQUEST:
      return state.set('isAnswerLoading', true);
    case ANSWER_GET_SUCCESS:
      return state.set('answer', fromJS(action.payload.result))
        .set('isAnswerLoading', false);
    case ANSWER_GET_FAILURE:
      return state.set('isAnswerLoading', false);
    case QUESTION_GET_REQUEST:
      return state.set('isQuestionLoading', true);
    case QUESTION_GET_SUCCESS:
      return state.set('question', fromJS(action.payload.result))
        .set('isQuestionLoading', false);
    case QUESTION_GET_FAILURE:
      return state.set('isQuestionLoading', false);
    case INITIALIZE_REDUCER:
      return initialState;
    default:
      return state;
  }
}

export default answerDetailPageReducer;
