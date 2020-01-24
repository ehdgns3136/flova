import { take, call, put } from 'redux-saga/effects';
import request from 'utils/request';

import {
  ANSWER_GET_REQUEST,
  QUESTION_GET_REQUEST,
} from './constants';

import {
  answerGetSuccessAction,
  answerGetFailureAction,
  questionGetSuccessAction,
  questionGetFailureAction,
} from './actions';

// Individual exports for testing
export function* requestGetAnswer(answerID) {
  try {
    const result = yield call(request, `${API_ROOT}/contents/answers/${answerID}/`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : undefined,
        'Content-Type': 'application/json',
      },
    });

    yield put(answerGetSuccessAction(result));
  } catch (err) {
    console.log(err);
    yield put(answerGetFailureAction());
  }
}

export function* watchAnswerGetRequestAction() {
  while (true) {
    const { answerID } = yield take(ANSWER_GET_REQUEST);
    yield call(requestGetAnswer, answerID);
  }
}


export function* requestGetQuestion(answerID) {
  try {
    const result = yield call(request, `${API_ROOT}/contents/answers/${answerID}/question/`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : undefined,
        'Content-Type': 'application/json',
      },
    });

    yield put(questionGetSuccessAction(result));
  } catch (err) {
    console.log(err);
    yield put(questionGetFailureAction());
  }
}

export function* watchQuestionGetRequestAction() {
  while (true) {
    const { answerID } = yield take(QUESTION_GET_REQUEST);
    yield call(requestGetQuestion, answerID);
  }
}

// All sagas to be loaded
export default [
  watchAnswerGetRequestAction,
  watchQuestionGetRequestAction,
];
