/**
 * Created by heesu on 17. 8. 22.
 */
import { take, takeLatest, call, put, select, fork, all } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import request from 'utils/request';
// import { requestS3Upload } from 'global/sagas';
// import {
//   showToastRequest,
// } from '../actions';
import { handleAnonymous } from 'utils/anonymous-user';
import {
  closeQuestionFormModal,
  postQuestionSuccess,
  postQuestionFailure,
  closeQuestionEditFormModal,
  editQuestionSuccess,
  editQuestionFailure,
  followQuestionSuccess,
  followQuestionFailure,
  bookmarkQuestionSuccess,
  bookmarkQuestionFailure,
  getQuestionFollowersSuccess,
  getQuestionFollowersFailure,
} from './actions';
import {
  POST_QUESTION_REQUEST,
  EDIT_QUESTION_REQUEST,
  FOLLOW_QUESTION_REQUEST,
  BOOKMARK_QUESTION_REQUEST,
  GET_QUESTION_FOLLOWERS_REQUEST,
} from './constants';

export function* postQuestion(title, editorState, anonymous, topics) {
  try {
    yield call(handleAnonymous);
    // yield all(content.blocks
    //   .filter((element) => {
    //     return element.data.type === 'image';
    //   }).map((element) => call(requestS3Upload, element)));
    const stringContent = JSON.stringify(editorState.toJS());

    const processedTopics = yield all(topics.map((topic) => call(processTopic, topic)));

    const { id } = yield call(request, `${API_ROOT}/contents/questions/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content: stringContent,
        anonymous,
        topics: processedTopics,
      }),
    });
    yield put(postQuestionSuccess());
    // yield put(showToastRequest('SUCCESS', '질문 작성', '질문을 성공적으로 작성했습니다.'));
    yield put(closeQuestionFormModal());
    browserHistory.push(`/question/${id}`);
  } catch (err) {
    console.log(err);
    yield put(postQuestionFailure());
  }
}

export function* watchPostQuestionRequestAction() {
  while (true) {
    const { title, editorState, anonymous, topics } = yield take(POST_QUESTION_REQUEST);
    yield call(postQuestion, title, editorState, anonymous, topics);
  }
}

// add topic to server if new
export function* processTopic(topic) {
  yield call(handleAnonymous);
  if (topic.new) {
    const addedTopic = yield call(request, `${API_ROOT}/topic/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: topic.label,
      }),
    });

    return addedTopic.id;
  } else {
    return topic.value;
  }
}

export function* editQuestion(questionID, title, editorState, topics) {
  try {
    // yield all(content.blocks
    //   .filter((element) => {
    //     return element.data.type === 'image';
    //   }).map((element) => call(requestS3Upload, element)));
    yield call(handleAnonymous);
    const stringContent = JSON.stringify(editorState.toJS());

    const processedTopics = yield all(topics.map((topic) => call(processTopic, topic)));

    const question = yield call(request, `${API_ROOT}/contents/questions/${questionID}/`, {
      method: 'PATCH',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content: stringContent,
        topics: processedTopics,
      }),
    });

    yield put(editQuestionSuccess(question));
    yield put(closeQuestionEditFormModal());
  } catch (err) {
    console.log(err);
    yield put(editQuestionFailure());
  }
}

export function* watchEditQuestionRequestAction() {
  while (true) {
    const { questionID, title, editorState, topics } = yield take(EDIT_QUESTION_REQUEST);
    yield call(editQuestion, questionID, title, editorState, topics);
  }
}

export function* followQuestion(questionID) {
  try {
    yield call(handleAnonymous);
    yield call(request, `${API_ROOT}/contents/questions/${questionID}/follow/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    yield put(followQuestionSuccess(questionID));
  } catch (err) {
    // console.log(err);
    yield put(followQuestionFailure(questionID));
  }
}
export function* watchFollowQuestionRequestAction() {
  while (true) {
    const { questionID } = yield take(FOLLOW_QUESTION_REQUEST);
    yield call(followQuestion, questionID);
  }
}

export function* bookmarkQuestion(questionID) {
  try {
    yield call(handleAnonymous);
    yield call(request, `${API_ROOT}/contents/questions/${questionID}/bookmark/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    yield put(bookmarkQuestionSuccess(questionID));
  } catch (err) {
    yield put(bookmarkQuestionFailure(questionID));
  }
}

export function* watchBookmarkQuestionRequestAction() {
  while (true) {
    const { questionID } = yield take(BOOKMARK_QUESTION_REQUEST);
    yield call(bookmarkQuestion, questionID);
  }
}

export function* requestGetQuestionFollowers(id) {
  try {
    let followers;
    if (localStorage.getItem('token')) {
      followers = yield call(request, `${API_ROOT}/contents/questions/${id}/followers/`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
    } else {
      followers = yield call(request, `${API_ROOT}/contents/questions/${id}/followers/`, {
        method: 'GET',
      });
    }
    yield put(getQuestionFollowersSuccess(followers));
  } catch (err) {
    console.log(err);
    yield put(getQuestionFollowersFailure());
  }
}

export function* watchGetQuestionFollowersRequestAction() {
  while (true) {
    const { id } = yield take(GET_QUESTION_FOLLOWERS_REQUEST);
    yield call(requestGetQuestionFollowers, id);
  }
}

// All sagas to be loaded
export default [
  watchPostQuestionRequestAction,
  watchEditQuestionRequestAction,
  watchFollowQuestionRequestAction,
  watchBookmarkQuestionRequestAction,
  watchGetQuestionFollowersRequestAction,
];
