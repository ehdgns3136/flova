/*
 *
 * AnswerDetailPage actions
 *
 */
import { normalize } from 'normalizr';
import {
  ANSWER_GET_REQUEST,
  ANSWER_GET_SUCCESS,
  ANSWER_GET_FAILURE,
  QUESTION_GET_REQUEST,
  QUESTION_GET_SUCCESS,
  QUESTION_GET_FAILURE,
  INITIALIZE_REDUCER,
} from './constants';

import { answerSchema, questionSchema } from '../../global/entities/schemas';

export function answerGetRequestAction(answerID) {
  return {
    type: ANSWER_GET_REQUEST,
    answerID,
  };
}

export function answerGetSuccessAction(answer) {
  return {
    type: ANSWER_GET_SUCCESS,
    payload: normalize(answer, answerSchema),
  };
}

export function answerGetFailureAction() {
  return {
    type: ANSWER_GET_FAILURE,
  };
}

export function questionGetRequestAction(answerID) {
  return {
    type: QUESTION_GET_REQUEST,
    answerID,
  };
}

export function questionGetSuccessAction(question) {
  return {
    type: QUESTION_GET_SUCCESS,
    payload: normalize(question, questionSchema),
  };
}

export function questionGetFailureAction() {
  return {
    type: QUESTION_GET_FAILURE,
  };
}

export function initializeReducer() {
  return {
    type: INITIALIZE_REDUCER,
  };
}
