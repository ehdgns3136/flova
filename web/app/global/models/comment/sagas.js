/**
 * Created by heesu on 17. 11. 15.
 */
import { take, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { handleAnonymous } from 'utils/anonymous-user';
import {
  getQuestionCommentsSuccessAction,
  postQuestionCommentSuccessAction,
  putQuestionCommentSuccessAction,
  deleteQuestionCommentSuccessAction,
  likeQuestionCommentFailureAction,
  getAnswerCommentsSuccessAction,
  postAnswerCommentSuccessAction,
  putAnswerCommentSuccessAction,
  deleteAnswerCommentSuccessAction,
  likeAnswerCommentFailureAction,
} from './actions';
import {
  GET_QUESTION_COMMENTS_REQUEST,
  POST_QUESTION_COMMENT_REQUEST,
  PUT_QUESTION_COMMENT_REQUEST,
  DELETE_QUESTION_COMMENT_REQUEST,
  LIKE_QUESTION_COMMENT_REQUEST,
  GET_ANSWER_COMMENTS_REQUEST,
  POST_ANSWER_COMMENT_REQUEST,
  PUT_ANSWER_COMMENT_REQUEST,
  DELETE_ANSWER_COMMENT_REQUEST,
  LIKE_ANSWER_COMMENT_REQUEST,
} from './constants';

import {
  makeSelectQuestionsCommentsCursor,
  makeSelectAnswerCommentsCursor,
} from './selectors';

export function* requestGetQuestionCommentsRequestAction(questionID) {
  try {
    const questionsCursor = yield select(makeSelectQuestionsCommentsCursor());
    const cursor = questionsCursor.get(questionsCursor.findIndex((element) => element.get('id') === questionID));

    const apiUrl = (cursor) ? (
      cursor.get('next') || `${API_ROOT}/contents/questions/${questionID}/comments/`
    ) : (
      `${API_ROOT}/contents/questions/${questionID}/comments/`
    )

    const { results, next, previous } = yield call(request, apiUrl, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : undefined,
        'Content-Type': 'application/json',
      },
    });
    yield put(getQuestionCommentsSuccessAction(questionID, results, next, previous));
  } catch (err) {
    console.log(err);
  }
}

export function* watchGetQuestionCommentsRequestAction() {
  while (true) {
    const { questionID } = yield take(GET_QUESTION_COMMENTS_REQUEST);
    yield call(requestGetQuestionCommentsRequestAction, questionID);
  }
}


export function* requestPostQuestionCommentRequestAction(content, questionID) {
  try {
    yield call(handleAnonymous);
    const comment = yield call(request, `${API_ROOT}/contents/questions/${questionID}/comments/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
      }),
    });
    yield put(postQuestionCommentSuccessAction(comment, questionID));
  } catch (err) {
    console.log(err);
  }
}

export function* watchPostQuestionCommentRequestAction() {
  while (true) {
    const { content, questionID } = yield take(POST_QUESTION_COMMENT_REQUEST);
    yield call(requestPostQuestionCommentRequestAction, content, questionID);
  }
}

export function* requestPutQuestionCommentRequestAction(content, commentID) {
  try {
    yield call(handleAnonymous);
    const comment = yield call(request, `${API_ROOT}/contents/questions/comments/${commentID}/`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
      }),
    });
    yield put(putQuestionCommentSuccessAction(comment));
  } catch (err) {
    console.log(err);
  }
}

export function* watchPutQuestionCommentRequestAction() {
  while (true) {
    const { content, commentID } = yield take(PUT_QUESTION_COMMENT_REQUEST);
    yield call(requestPutQuestionCommentRequestAction, content, commentID);
  }
}

export function* requestDeleteQuestionCommentRequestAction(commentID, questionID) {
  try {
    yield call(handleAnonymous);
    yield call(request, `${API_ROOT}/contents/questions/comments/${commentID}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    yield put(deleteQuestionCommentSuccessAction(commentID, questionID));
  } catch (err) {
    console.log(err);
  }
}

export function* watchDeleteQuestionCommentRequestAction() {
  while (true) {
    const { commentID, questionID } = yield take(DELETE_QUESTION_COMMENT_REQUEST);
    yield call(requestDeleteQuestionCommentRequestAction, commentID, questionID);
  }
}

export function* likeQuestionComment(commentID) {
  try {
    yield call(handleAnonymous);
    yield call(request, `${API_ROOT}/contents/questions/comments/${commentID}/like/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
  } catch (err) {
    console.log(err);
    yield put(likeQuestionCommentFailureAction(commentID));
  }
}

export function* watchLikeQuestionCommentRequestAction() {
  while (true) {
    const { commentID } = yield take(LIKE_QUESTION_COMMENT_REQUEST);
    yield call(likeQuestionComment, commentID);
  }
}

export function* requestGetAnswerCommentsRequestAction(answerID) {
  try {
    const answersCursor = yield select(makeSelectAnswerCommentsCursor());
    const cursor = answersCursor.get(answersCursor.findIndex((element) => element.get('id') === answerID));

    const apiUrl = (cursor) ? (
      cursor.get('next') || `${API_ROOT}/contents/answers/${answerID}/comments/`
    ) : (
      `${API_ROOT}/contents/answers/${answerID}/comments/`
    );
    const { results, next, previous } = yield call(request, apiUrl, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : undefined,
        'Content-Type': 'application/json',
      },
    });
    yield put(getAnswerCommentsSuccessAction(answerID, results, next, previous));
  } catch (err) {
    console.log(err);
  }
}

export function* watchGetAnswerCommentsRequestAction() {
  while (true) {
    const { answerID } = yield take(GET_ANSWER_COMMENTS_REQUEST);
    yield call(requestGetAnswerCommentsRequestAction, answerID);
  }
}

export function* requestPostAnswerCommentRequestAction(content, answerID) {
  try {
    yield call(handleAnonymous);
    const comment = yield call(request, `${API_ROOT}/contents/answers/${answerID}/comments/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
      }),
    });
    yield put(postAnswerCommentSuccessAction(comment, answerID));
  } catch (err) {
    console.log(err);
  }
}

export function* watchPostAnswerCommentRequestAction() {
  while (true) {
    const { content, answerID } = yield take(POST_ANSWER_COMMENT_REQUEST);
    yield call(requestPostAnswerCommentRequestAction, content, answerID);
  }
}

export function* requestPutAnswerCommentRequestAction(content, commentID) {
  try {
    yield call(handleAnonymous);
    const comment = yield call(request, `${API_ROOT}/contents/answers/comments/${commentID}/`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
      }),
    });
    yield put(putAnswerCommentSuccessAction(comment));
  } catch (err) {
    console.log(err);
  }
}

export function* watchPutAnswerCommentRequestAction() {
  while (true) {
    const { content, commentID } = yield take(PUT_ANSWER_COMMENT_REQUEST);
    yield call(requestPutAnswerCommentRequestAction, content, commentID);
  }
}

export function* requestDeleteAnswerCommentRequestAction(commentID, answerID) {
  try {
    yield call(handleAnonymous);
    yield call(request, `${API_ROOT}/contents/answers/comments/${commentID}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    yield put(deleteAnswerCommentSuccessAction(commentID, answerID));
  } catch (err) {
    console.log(err);
  }
}

export function* watchDeleteAnswerCommentRequestAction() {
  while (true) {
    const { commentID, answerID } = yield take(DELETE_ANSWER_COMMENT_REQUEST);
    yield call(requestDeleteAnswerCommentRequestAction, commentID, answerID);
  }
}

export function* likeAnswerComment(commentID) {
  try {
    yield call(handleAnonymous);
    yield call(request, `${API_ROOT}/contents/answers/comments/${commentID}/like/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
  } catch (err) {
    console.log(err);
    yield put(likeAnswerCommentFailureAction(commentID));
  }
}

export function* watchLikeAnswerCommentRequestAction() {
  while (true) {
    const { commentID } = yield take(LIKE_ANSWER_COMMENT_REQUEST);
    yield call(likeAnswerComment, commentID);
  }
}


// All sagas to be loaded
export default [
  watchGetQuestionCommentsRequestAction,
  watchPostQuestionCommentRequestAction,
  watchPutQuestionCommentRequestAction,
  watchDeleteQuestionCommentRequestAction,
  watchLikeQuestionCommentRequestAction,
  watchGetAnswerCommentsRequestAction,
  watchPostAnswerCommentRequestAction,
  watchPutAnswerCommentRequestAction,
  watchDeleteAnswerCommentRequestAction,
  watchLikeAnswerCommentRequestAction,
];
