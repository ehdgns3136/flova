import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  GET_FOLLOWING_TOPICS_REQUEST,
  GET_FOLLOWERS_REQUEST,
  GET_FOLLOWING_USERS_REQUEST,
  GET_QUESTIONS_REQUEST,
  CHANGE_ACTIVE_ITEM,
  GET_PROFILE_REQUEST,
  FOLLOW_TOPIC_REQUEST,
} from './constants';
import {
  getQuestionsSuccess,
  getQuestionsFailure,
  getFollowingTopicsFailure,
  getFollowingTopicsSuccess,
  getFollowingTopicsRequest,
  getFollowersRequest,
  getFollowersSuccess,
  getFollowersFailure,
  getFollowingUsersRequest,
  getFollowingUsersSuccess,
  getFollowingUsersFailure,
  getQuestionsRequest,
  getProfileFailure,
  getProfileSuccess,
  followTopicSuccess,
  followTopicFailure,
} from './actions';

import {
  makeSelectQuestionsCursor,
  makeSelectActiveItem,
  makeSelectProfile,
} from './selectors';


export function* getQuestions(action) {
  const { id } = action;
  try {
    let url = yield select(makeSelectQuestionsCursor());
    if (!url) {
      const activeItem = yield select(makeSelectActiveItem());
      switch (activeItem) {
        case 'writtenAnswers':
          url = `${API_ROOT}/user/users/${id}/written_answers/`;
          break;
        case 'writtenQuestions':
          url = `${API_ROOT}/user/users/${id}/written_questions/`;
          break;
        case 'followingQuestions':
          url = `${API_ROOT}/user/users/following_questions/`;
          break;
        case 'bookmarkContents':
          url = `${API_ROOT}/user/users/bookmark_contents/`;
          break;
        default:
          console.error('Not Implemented Error');
          break;
      }
    }
    const { next, results } = yield call(request, url, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : undefined,
      },
    });
    yield put(getQuestionsSuccess(results, next));
  } catch (err) {
    console.log(err);
    yield put(getQuestionsFailure());
  }
}
export function* watchGetQuestionsRequest() {
  yield takeLatest(GET_QUESTIONS_REQUEST, getQuestions);
}

export function* changeActiveItem(action) {
  const profile = yield select(makeSelectProfile());
  const activeItem = yield select(makeSelectActiveItem());
  const id = action.id || profile.get('id');
  switch (activeItem) {
    case 'writtenAnswers':
    case 'followingQuestions':
    case 'writtenQuestions':
    case 'bookmarkContents':
      yield put(getQuestionsRequest(id));
      break;
    case 'followingTopics':
      yield put(getFollowingTopicsRequest(id));
      break;
    case 'followers':
      yield put(getFollowersRequest(id));
      break;
    case 'followingUsers':
      yield put(getFollowingUsersRequest(id));
      break;
    default:
      console.error('Not Implemented Error');
      break;
  }
}

export function* watchChangeActiveItem() {
  yield takeLatest(CHANGE_ACTIVE_ITEM, changeActiveItem);
}

export function* getFollowingTopics(id) {
  try {
    const results = yield call(request, `${API_ROOT}/user/users/${id}/following_topics/`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : undefined,
      },
    });
    yield put(getFollowingTopicsSuccess(results));
  } catch (err) {
    console.log(err);
    yield put(getFollowingTopicsFailure());
  }
}
export function* watchGetFollowingTopicsRequest() {
  while (true) {
    const { id } = yield take(GET_FOLLOWING_TOPICS_REQUEST);
    yield call(getFollowingTopics, id);
  }
}

export function* getFollowers(id) {
  try {
    const results = yield call(request, `${API_ROOT}/user/users/${id}/followers/`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : undefined,
      },
    });
    yield put(getFollowersSuccess(results));
  } catch (err) {
    console.log(err);
    yield put(getFollowersFailure());
  }
}
export function* watchGetFollowersRequest() {
  while (true) {
    const { id } = yield take(GET_FOLLOWERS_REQUEST);
    yield call(getFollowers, id);
  }
}

export function* getFollowingUsers(id) {
  try {
    const results = yield call(request, `${API_ROOT}/user/users/${id}/following_users/`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : undefined,
      },
    });
    yield put(getFollowingUsersSuccess(results));
  } catch (err) {
    console.log(err);
    yield put(getFollowingUsersFailure());
  }
}
export function* watchGetFollowingUsersRequest() {
  while (true) {
    const { id } = yield take(GET_FOLLOWING_USERS_REQUEST);
    yield call(getFollowingUsers, id);
  }
}

export function* getProfile(id) {
  try {
    const payload = yield call(request, `${API_ROOT}/user/users/${id}/`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : undefined,
      },
    });
    yield put(getProfileSuccess(payload));
  } catch (err) {
    console.log(err);
    yield put(getProfileFailure());
  }
}

export function* watchGetProfileRequest() {
  while (true) {
    const { id } = yield take(GET_PROFILE_REQUEST);
    yield call(getProfile, id);
  }
}

export function* followTopic(id) {
  try {
    const topic = yield call(request, `${API_ROOT}/topic/topics/${id}/follow/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    yield put(followTopicSuccess(topic));
  } catch (err) {
    console.log(err);
    yield put(followTopicFailure());
  }
}

export function* watchFollowTopicRequest() {
  while (true) {
    const { id } = yield take(FOLLOW_TOPIC_REQUEST);
    yield call(followTopic, id);
  }
}

// All sagas to be loaded
export default [
  watchGetQuestionsRequest,
  watchGetFollowingTopicsRequest,
  watchChangeActiveItem,
  watchGetProfileRequest,
  watchFollowTopicRequest,
  watchGetFollowersRequest,
  watchGetFollowingUsersRequest,
];
