import { take, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import {
  GET_PROFILE_REQUEST,
} from './constants';
import {
  getProfileFailure,
  getProfileSuccess,
} from './actions';

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


// All sagas to be loaded
export default [
  watchGetProfileRequest,
];
