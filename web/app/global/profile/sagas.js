/**
 * Created by donghoon on 17. 8. 22.
 */
import { take, takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';

import {
  GET_TOPIC_SEARCH_REQUEST,
  GET_CONCENTRATION_SEARCH_REQUEST,
  GET_ROLE_SEARCH_REQUEST,
  ADD_TOPIC_REQUEST,
  ADD_CONCENTRATION_REQUEST,
  ADD_ROLE_REQUEST,
  POST_CREDENTIAL_REQUEST,
  DELETE_CREDENTIAL_REQUEST,
  MODIFY_CREDENTIAL_REQUEST,
  GET_CREDENTIAL_LIST_REQUEST,
  UPDATE_DESCRIPTION_REQUEST,
  UPDATE_PROFILE_IMAGE_REQUEST,
  UPDATE_PROFILE_REQUEST,
} from './constants';

import {
  getTopicSearchSuccessAction,
  getConcentrationSearchSuccessAction,
  getRoleSearchSuccessAction,
  addTopicSuccessAction,
  addConcentrationSuccessAction,
  addRoleSuccessAction,
  postCredentialSuccessAction,
  deleteCredentialSuccessAction,
  modifyCredentialSuccessAction,
  getCredentialListSuccessAction,
  updateDescriptionSuccessAction,
  updateProfileImageFailureAction,
  updateProfileImageSuccessAction,
  updateProfileSuccessAction,
} from './actions';

import {
  requestS3Upload,
} from '../sagas';

export function* requestGetTopicSearchRequestAciton({ searchText }) {
  try {
    const topicList = yield call(request, `${API_ROOT}/search/topic?q=${searchText}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    yield put(getTopicSearchSuccessAction(topicList));
  } catch (err) {
    console.log(err);
  }
}

export function* watchGetTopicSearchRequestAction() {
  yield takeLatest(GET_TOPIC_SEARCH_REQUEST, requestGetTopicSearchRequestAciton);
}

export function* requestGetConcentrationSearchRequestAciton({ searchText }) {
  try {
    const concentrationList = yield call(request, `${API_ROOT}/search/concentration?q=${searchText}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    yield put(getConcentrationSearchSuccessAction(concentrationList));
  } catch (err) {
    console.log(err);
  }
}

export function* watchGetConcentrationSearchRequestAction() {
  yield takeLatest(GET_CONCENTRATION_SEARCH_REQUEST, requestGetConcentrationSearchRequestAciton);
}

export function* requestGetRoleSearchRequestAciton({ searchText }) {
  try {
    const roleList = yield call(request, `${API_ROOT}/search/role?q=${searchText}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    yield put(getRoleSearchSuccessAction(roleList));
  } catch (err) {
    console.log(err);
  }
}

export function* watchGetRoleSearchRequestAction() {
  yield takeLatest(GET_ROLE_SEARCH_REQUEST, requestGetRoleSearchRequestAciton);
}

export function* requestAddTopicRequestAction(title) {
  try {
    const topic = yield call(request, `${API_ROOT}/topic/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        sample_image: '',
      }),
    });
    yield put(addTopicSuccessAction(topic));
  } catch (err) {
    console.log(err);
  }
}

export function* watchAddTopicRequestAction() {
  while (true) {
    const { title } = yield take(ADD_TOPIC_REQUEST);
    yield call(requestAddTopicRequestAction, title);
  }
}

export function* requestAddConcentrationRequestAction(title) {
  try {
    const concentration = yield call(request, `${API_ROOT}/credential/concentration/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
      }),
    });
    yield put(addConcentrationSuccessAction(concentration));
  } catch (err) {
    console.log(err);
  }
}

export function* watchAddConcentrationRequestAction() {
  while (true) {
    const { title } = yield take(ADD_CONCENTRATION_REQUEST);
    yield call(requestAddConcentrationRequestAction, title);
  }
}

export function* requestAddRoleRequestAction(title) {
  try {
    const role = yield call(request, `${API_ROOT}/credential/role/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
      }),
    });
    yield put(addRoleSuccessAction(role));
  } catch (err) {
    console.log(err);
  }
}

export function* watchAddRoleRequestAction() {
  while (true) {
    const { title } = yield take(ADD_ROLE_REQUEST);
    yield call(requestAddRoleRequestAction, title);
  }
}

export function* requestPostCredentialRequestAction(credential, credentialType) {
  try {
    let url = '';
    let body = {};
    if (credentialType === 'education') {
      url = `${API_ROOT}/credential/education/`;
      body = {
        school: credential.school.value,
        major: (credential.major) ? (credential.major.value) : (null),
        minor: (credential.minor) ? (credential.minor.value) : (null),
        degree: credential.degree,
        attending: credential.attending,
        graduation_year: (credential.graduation_year) ? (credential.graduation_year.value) : (0),
      };
    } else if (credentialType === 'employment') {
      url = `${API_ROOT}/credential/employment/`;
      body = {
        company: credential.company.value,
        role: (credential.role) ? (credential.role.value) : (null),
        working: credential.working,
      };
    } else {
      url = `${API_ROOT}/credential/text/`;
      body = {
        title: credential.title,
      };
    }

    const postedCredential = yield call(request, url, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    yield put(postCredentialSuccessAction(postedCredential, credentialType));
  } catch (err) {
    console.log(err);
  }
}

export function* watchPostCredentialRequestAction() {
  while (true) {
    const { credential, credentialType } = yield take(POST_CREDENTIAL_REQUEST);
    yield call(requestPostCredentialRequestAction, credential, credentialType);
  }
}

export function* requestDeleteCredentialRequestAction(id, credentialType) {
  try {
    let url = '';
    if (credentialType === 'education') {
      url = `${API_ROOT}/credential/education/${id}/`;
    } else if (credentialType === 'employment') {
      url = `${API_ROOT}/credential/employment/${id}/`;
    } else {
      url = `${API_ROOT}/credential/text/${id}/`;
    }
    yield call(request, url, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    yield put(deleteCredentialSuccessAction(id, credentialType));
  } catch (err) {
    console.log(err);
  }
}

export function* watchDeleteCredentialRequestAction() {
  while (true) {
    const { id, credentialType } = yield take(DELETE_CREDENTIAL_REQUEST);
    yield call(requestDeleteCredentialRequestAction, id, credentialType);
  }
}

export function* requestModifyCredentialRequestAction(id, credential) {
  try {
    let url = '';
    let body = {};
    if (credential.type === 'education') {
      url = `${API_ROOT}/credential/education/${id}/`;
      body = {
        school: credential.school.value,
        major: (credential.major) ? (credential.major.value) : (null),
        minor: (credential.minor) ? (credential.minor.value) : (null),
        degree: credential.degree,
        attending: credential.attending,
        graduation_year: (credential.graduation_year) ? (credential.graduation_year.value) : (0),
      };
    } else if (credential.type === 'employment') {
      url = `${API_ROOT}/credential/employment/${id}/`;
      body = {
        company: credential.company.value,
        role: (credential.role) ? (credential.role.value) : (null),
        working: credential.working,
      };
    } else {
      url = `${API_ROOT}/credential/text/${id}/`;
      body = {
        title: credential.title,
      };
    }
    const postedCredential = yield call(request, url, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    yield put(modifyCredentialSuccessAction(id, postedCredential, credential.type));
  } catch (err) {
    console.log(err);
  }
}

export function* watchModifyCredentialRequestAction() {
  while (true) {
    const { id, credential } = yield take(MODIFY_CREDENTIAL_REQUEST);
    yield call(requestModifyCredentialRequestAction, id, credential);
  }
}

export function* requestGetCredentialList() {
  try {
    const { education, employment, text } = yield call(request, `${API_ROOT}/user/credentials/`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    yield put(getCredentialListSuccessAction(education, employment, text));
  } catch (err) {
    console.log(err);
  }
}

export function* watchGetCredentialListRequestAction() {
  while (true) {
    yield take(GET_CREDENTIAL_LIST_REQUEST);
    yield call(requestGetCredentialList);
  }
}

export function* requestUpdateProfileImage(blobSrc) {
  try {
    const s3Src = yield call(requestS3Upload, blobSrc);
    yield call(request, `${API_ROOT}/user/update/profile_image/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile_image: s3Src,
      }),
    });
    yield put(updateProfileImageSuccessAction(s3Src));
  } catch (err) {
    console.log(err);
    yield put(updateProfileImageFailureAction());
  }
}

export function* watchUpdateProfileImageRequestAction() {
  while (true) {
    const { blobSrc } = yield take(UPDATE_PROFILE_IMAGE_REQUEST);
    yield call(requestUpdateProfileImage, blobSrc);
  }
}

export function* requestUpdateDescription(credentialId) {
  try {
    const description = yield call(request, `${API_ROOT}/user/update/description/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: credentialId,
      }),
    });
    yield put(updateDescriptionSuccessAction(description));
  } catch (err) {
    console.log(err);
  }
}

export function* watchUpdateDescriptionRequestAction() {
  while (true) {
    const { credentialId } = yield take(UPDATE_DESCRIPTION_REQUEST);
    yield call(requestUpdateDescription, credentialId);
  }
}

export function* requestUpdateProfile(payload) {
  const { data } = payload;
  try {
    const userInfo = yield call(request, `${API_ROOT}/user/update/profile/`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        data,
      ),
    });
    yield put(updateProfileSuccessAction(userInfo));
  } catch (err) {
    console.log(err);
  }
}

export function* watchUpdateProfileRequestAction() {
  yield takeEvery(UPDATE_PROFILE_REQUEST, requestUpdateProfile);
}
// All sagas to be loaded
export default [
  watchGetTopicSearchRequestAction,
  watchGetConcentrationSearchRequestAction,
  watchGetRoleSearchRequestAction,
  watchAddTopicRequestAction,
  watchAddConcentrationRequestAction,
  watchAddRoleRequestAction,
  watchPostCredentialRequestAction,
  watchDeleteCredentialRequestAction,
  watchModifyCredentialRequestAction,
  watchGetCredentialListRequestAction,
  watchUpdateProfileImageRequestAction,
  watchUpdateDescriptionRequestAction,
  watchUpdateProfileRequestAction,
];
