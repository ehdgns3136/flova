import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  CHECK_ACTIVE_CATEGORY,
  GET_ACTIVITIES_REQUEST,
} from './constants';
import {
  changeActiveCategory,
  getActivitiesSuccess,
  getActivitiesFailure,
  getActivitiesRequest,
} from './actions';
import { makeSelectNextCursor, makeSelectActiveCategory, makeSelectActivities } from './selectors';

export function* getActivities({ params }) {
  try {
    const { subpath, topicID } = params;
    const nextCursor = yield select(makeSelectNextCursor());
    let apiUrl;
    if (nextCursor) {
      apiUrl = nextCursor;
    } else if (!subpath && !topicID) {
      apiUrl = `${API_ROOT}/feed/main/`;
    } else if (subpath === 'topic') {
      apiUrl = `${API_ROOT}/feed/topic/${topicID}/`;
    } else if (subpath === 'following_questions') {
      apiUrl = `${API_ROOT}/user/users/following_questions/`;
    } else if (subpath === 'bookmark_contents') {
      apiUrl = `${API_ROOT}/user/users/bookmark_contents/`;
    } else {
      console.error('GetActivities Saga Error: 처리되지 않은 url입니다.');
      return;
    }

    const { results, next, previous } = yield call(request, apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

    yield put(getActivitiesSuccess(results, next, previous));
  } catch (err) {
    console.log(err);
    yield put(getActivitiesFailure());
  }
}

export function* watchGetActivitiesRequest() {
  yield takeLatest(GET_ACTIVITIES_REQUEST, getActivities);
}

export function* checkActiveCategory(params) {
  const { subpath, topicID } = params;
  const activeCategory = yield select(makeSelectActiveCategory());
  if (!subpath && !topicID) {
    if (activeCategory !== 'home') {
      yield put(changeActiveCategory('home'));
    }
  } else if (subpath === 'topic') {
    if (activeCategory !== `topic/${topicID}`) {
      yield put(changeActiveCategory(`topic/${topicID}`));
    }
  } else if (subpath === 'following_questions') {
    if (activeCategory !== 'following_questions') {
      yield put(changeActiveCategory('following_questions'));
    }
  } else if (subpath === 'bookmark_contents') {
    if (activeCategory !== 'bookmark_contents') {
      yield put(changeActiveCategory('bookmark_contents'));
    }
  } else {
    console.error('checkActiveCategory Saga; 처리되지 않은 active category 입니다.');
    return;
  }
  const activities = yield select(makeSelectActivities());
  if (!activities || activities.count() === 0) {
    yield put(getActivitiesRequest(params));
  }
}

export function* watchCheckActiveCategory() {
  while (true) {
    const { params } = yield take(CHECK_ACTIVE_CATEGORY);
    yield call(checkActiveCategory, params);
  }
}
export default [
  watchCheckActiveCategory,
  watchGetActivitiesRequest,
];
