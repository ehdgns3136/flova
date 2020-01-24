/**
 * Created by donghoon on 17. 11. 23.
 */
import { call, put, take } from 'redux-saga/effects';
import request from 'utils/request';
import { handleAnonymous } from 'utils/anonymous-user';
import {
  POST_ANSWER_REQUEST,
  EDIT_ANSWER_REQUEST,
  DELETE_ANSWER_REQUEST,
  LIKE_ANSWER_REQUEST,
  DOWNVOTE_ANSWER_REQUEST,
  BOOKMARK_ANSWER_REQUEST,
  GET_ANSWER_LIKERS_REQUEST,
} from './constants';
import {
  postAnswerSuccess,
  postAnswerFailure,
  editAnswerSuccess,
  editAnswerFailure,
  deleteAnswerSuccess,
  deleteAnswerFailure,
  likeAnswerSuccess,
  likeAnswerFailure,
  downvoteAnswerSuccess,
  downvoteAnswerFailure,
  bookmarkAnswerSuccess,
  bookmarkAnswerFailure,
  getAnswerLikersSuccess,
  getAnswerLikersFailure,
} from './actions';

export function* requestPostAnswer(editorState, questionID) {
  try {
    yield call(handleAnonymous);
    const stringContent = JSON.stringify(editorState.toJS());

    const answer = yield call(request, `${API_ROOT}/contents/questions/${questionID}/answers/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: stringContent,
      }),
    });

    yield put(postAnswerSuccess(answer, questionID));
    // yield put(showToastRequest('SUCCESS', '답변 작성', '답변이 성공적으로 작성되었습니다.'));
  } catch (err) {
    console.log(err);
    yield put(postAnswerFailure());
  }
}

export function* watchPostAnswerRequestAction() {
  while (true) {
    const { editorState, questionID } = yield take(POST_ANSWER_REQUEST);
    yield call(requestPostAnswer, editorState, questionID);
  }
}

export function* requestEditAnswer(answerID, editorState) {
  try {
    yield call(handleAnonymous);
    const stringContent = JSON.stringify(editorState.toJS());

    const answer = yield call(request, `${API_ROOT}/contents/answers/${answerID}/`, {
      method: 'PATCH',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: stringContent,
      }),
    });

    yield put(editAnswerSuccess(answer));
    // yield put(showToastRequest('SUCCESS', '답변 수정', '답변을 성공적으로 수정했습니다.'));
  } catch (err) {
    console.log(err);
    yield put(editAnswerFailure());
  }
}

export function* watchEditAnswerRequestAction() {
  while (true) {
    const { answerID, editorState } = yield take(EDIT_ANSWER_REQUEST);
    yield call(requestEditAnswer, answerID, editorState);
  }
}

export function* requestDeleteAnswer(answerID, questionID) {
  try {
    yield call(handleAnonymous);
    yield call(request, `${API_ROOT}/contents/answers/${answerID}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    yield put(deleteAnswerSuccess(answerID, questionID));
    // yield put(showToastRequest('SUCCESS', '답변 삭제', '답변이 성공적으로 삭제되었습니다.'));
  } catch (err) {
    console.log(err);
    yield put(deleteAnswerFailure());
  }
}

export function* watchDeleteAnswerRequestAction() {
  while (true) {
    const { answerID, questionID } = yield take(DELETE_ANSWER_REQUEST);
    yield call(requestDeleteAnswer, answerID, questionID);
  }
}

export function* likeAnswer(answerID, isDownvoted) {
  try {
    yield call(handleAnonymous);
    yield call(request, `${API_ROOT}/contents/answers/${answerID}/like/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    yield put(likeAnswerSuccess(answerID, isDownvoted));
  } catch (err) {
    // console.log(err);
    yield put(likeAnswerFailure(answerID, isDownvoted));
  }
}

export function* watchLikeAnswerRequestAction() {
  while (true) {
    const { answerID, isDownvoted } = yield take(LIKE_ANSWER_REQUEST);
    yield call(likeAnswer, answerID, isDownvoted);
  }
}

export function* downvoteAnswer(answerID, isLiked) {
  try {
    yield call(handleAnonymous);
    yield call(request, `${API_ROOT}/contents/answers/${answerID}/downvote/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    yield put(downvoteAnswerSuccess(answerID, isLiked));
  } catch (err) {
    // console.log(err);
    yield put(downvoteAnswerFailure(answerID, isLiked));
  }
}

export function* watchDownvoteAnswerRequestAction() {
  while (true) {
    const { answerID, isLiked } = yield take(DOWNVOTE_ANSWER_REQUEST);
    yield call(downvoteAnswer, answerID, isLiked);
  }
}

export function* bookmarkAnswer(answerID) {
  try {
    yield call(handleAnonymous);
    yield call(request, `${API_ROOT}/contents/answers/${answerID}/bookmark/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    yield put(bookmarkAnswerSuccess(answerID));
  } catch (err) {
    yield put(bookmarkAnswerFailure(answerID));
  }
}

export function* watchBookmarkAnswerRequestAction() {
  while (true) {
    const { answerID } = yield take(BOOKMARK_ANSWER_REQUEST);
    yield call(bookmarkAnswer, answerID);
  }
}

export function* requestGetAnswerLikers(id) {
  try {
    let likers;
    if (localStorage.getItem('token')) {
      likers = yield call(request, `${API_ROOT}/contents/answers/${id}/likers/`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
    } else {
      likers = yield call(request, `${API_ROOT}/contents/answers/${id}/likers/`, {
        method: 'GET',
      });
    }
    yield put(getAnswerLikersSuccess(likers));
    // yield put(showToastRequest('SUCCESS', '답변 삭제', '답변이 성공적으로 삭제되었습니다.'));
  } catch (err) {
    console.log(err);
    yield put(getAnswerLikersFailure());
  }
}

export function* watchGetAnswerLikersRequestAction() {
  while (true) {
    const { id } = yield take(GET_ANSWER_LIKERS_REQUEST);
    yield call(requestGetAnswerLikers, id);
  }
}

export default [
  watchPostAnswerRequestAction,
  watchEditAnswerRequestAction,
  watchDeleteAnswerRequestAction,
  watchLikeAnswerRequestAction,
  watchDownvoteAnswerRequestAction,
  watchBookmarkAnswerRequestAction,
  watchGetAnswerLikersRequestAction,
];
