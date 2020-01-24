/**
 * Created by heesu on 17. 11. 15.
 */
import { take, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { handleAnonymous } from 'utils/anonymous-user';
import {
  followUserSuccess,
  followUserFailure,
} from './actions';
import {
  FOLLOW_USER_REQUEST,
} from './constants';

export function* followUser(userId) {
  try {
    yield call(handleAnonymous);
    const payload = yield call(request, `${API_ROOT}/user/users/${userId}/follow/`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : undefined,
      },
    });
    yield put(followUserSuccess(payload, userId));
  } catch (err) {
    console.log(err);
    yield put(followUserFailure(userId));
  }
}

export function* watchFollowUserRequest() {
  while (true) {
    const { userId } = yield take(FOLLOW_USER_REQUEST);
    yield call(followUser, userId);
  }
}


// All sagas to be loaded
export default [
  watchFollowUserRequest,
];
