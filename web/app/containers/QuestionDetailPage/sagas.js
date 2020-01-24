import { take, put, call, all, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { browserHistory } from 'react-router';
import {
  showToastRequest,
} from 'global/actions';

import {
  ANSWERS_GET_REQUEST,
  QUESTION_GET_REQUEST,
  QUESTION_DELETE_REQUEST,
} from './constants';
import {
  answersGetSuccessAction,
  answersGetFailureAction,
  questionGetSuccessAction,
  questionGetFailureAction,
  questionDeleteSuccessAction,
  questionDeleteFailureAction,
} from './actions';

import {
  makeSelectQuestion,
} from './selectors';

export function* requestGetAnswers(questionID) {
  try {
    const results = yield call(request, `${API_ROOT}/contents/questions/${questionID}/answers/`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : undefined,
        'Content-Type': 'application/json',
      },
    });

    yield put(answersGetSuccessAction(results));
  } catch (err) {
    console.log(err);
    yield put(answersGetFailureAction());
  }
}

export function* watchAnswersGetRequestAction() {
  while (true) {
    const { questionID } = yield take(ANSWERS_GET_REQUEST);
    yield call(requestGetAnswers, questionID);
  }
}

export function* requestGetQuestion(questionID) {
  try {
    const question = yield call(request, `${API_ROOT}/contents/questions/${questionID}/`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : undefined,
        'Content-Type': 'application/json',
      },
    });
    yield put(questionGetSuccessAction(question));
  } catch (err) {
    console.log(err);
    yield put(questionGetFailureAction());
  }
}

export function* watchQuestionGetRequestAction() {
  while (true) {
    const { questionID } = yield take(QUESTION_GET_REQUEST);
    yield call(requestGetQuestion, questionID);
  }
}

export function* requestDeleteQuestion() {
  try {
    const question = yield select(makeSelectQuestion());
    const id = question.get('id');
    yield call(request, `${API_ROOT}/contents/questions/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    yield put(questionDeleteSuccessAction());
    yield put(showToastRequest('SUCCESS', '질문 삭제', '질문이 성공적으로 삭제되었습니다.'));
    browserHistory.push({
      pathname: '/',
      state: {
        isQuestionDeleted: true,
      },
    });
  } catch (err) {
    console.log(err);
    yield put(showToastRequest('ERROR', '질문 삭제', '질문을 삭제할 수 없습니다.'));
    yield put(questionDeleteFailureAction());
  }
}

export function* watchQuestionDeleteRequestAction() {
  while (true) {
    yield take(QUESTION_DELETE_REQUEST);
    yield call(requestDeleteQuestion);
  }
}


// All sagas to be loaded
export default [
  watchQuestionGetRequestAction,
  watchAnswersGetRequestAction,
  watchQuestionDeleteRequestAction,
];
