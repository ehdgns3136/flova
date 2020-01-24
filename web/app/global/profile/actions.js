/**
 * Created by donghoon on 17. 9. 25.
 */

import {
  GET_TOPIC_SEARCH_REQUEST,
  GET_TOPIC_SEARCH_SUCCESS,
  GET_CONCENTRATION_SEARCH_REQUEST,
  GET_CONCENTRATION_SEARCH_SUCCESS,
  GET_ROLE_SEARCH_REQUEST,
  GET_ROLE_SEARCH_SUCCESS,
  ADD_TOPIC_REQUEST,
  ADD_TOPIC_SUCCESS,
  ADD_CONCENTRATION_REQUEST,
  ADD_CONCENTRATION_SUCCESS,
  ADD_ROLE_REQUEST,
  ADD_ROLE_SUCCESS,
  POST_CREDENTIAL_REQUEST,
  POST_CREDENTIAL_SUCCESS,
  DELETE_CREDENTIAL_REQUEST,
  DELETE_CREDENTIAL_SUCCESS,
  MODIFY_CREDENTIAL_REQUEST,
  MODIFY_CREDENTIAL_SUCCESS,
  GET_CREDENTIAL_LIST_REQUEST,
  GET_CREDENTIAL_LIST_SUCCESS,
  UPDATE_DESCRIPTION_REQUEST,
  UPDATE_DESCRIPTION_SUCCESS,
  UPDATE_PROFILE_IMAGE_FAILURE,
  UPDATE_PROFILE_IMAGE_REQUEST,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from './constants';

export function getTopicSearchRequestAction(searchText) {
  return {
    type: GET_TOPIC_SEARCH_REQUEST,
    searchText,
  };
}

export function getTopicSearchSuccessAction(topicList) {
  return {
    type: GET_TOPIC_SEARCH_SUCCESS,
    topicList,
  };
}

export function getConcentrationSearchRequestAction(searchText) {
  return {
    type: GET_CONCENTRATION_SEARCH_REQUEST,
    searchText,
  };
}

export function getConcentrationSearchSuccessAction(concentrationList) {
  return {
    type: GET_CONCENTRATION_SEARCH_SUCCESS,
    concentrationList,
  };
}

export function getRoleSearchRequestAction(searchText) {
  return {
    type: GET_ROLE_SEARCH_REQUEST,
    searchText,
  };
}

export function getRoleSearchSuccessAction(roleList) {
  return {
    type: GET_ROLE_SEARCH_SUCCESS,
    roleList,
  };
}

export function addTopicRequestAction(title) {
  return {
    type: ADD_TOPIC_REQUEST,
    title,
  };
}

export function addTopicSuccessAction(topic) {
  return {
    type: ADD_TOPIC_SUCCESS,
    topic,
  };
}

export function addConcentrationRequestAction(title) {
  return {
    type: ADD_CONCENTRATION_REQUEST,
    title,
  };
}

export function addConcentrationSuccessAction(concentration) {
  return {
    type: ADD_CONCENTRATION_SUCCESS,
    concentration,
  };
}

export function addRoleRequestAction(title) {
  return {
    type: ADD_ROLE_REQUEST,
    title,
  };
}

export function addRoleSuccessAction(role) {
  return {
    type: ADD_ROLE_SUCCESS,
    role,
  };
}

export function postCredentialRequestAction(credential, credentialType) {
  return {
    type: POST_CREDENTIAL_REQUEST,
    credential,
    credentialType,
  };
}

export function postCredentialSuccessAction(credential, credentialType) {
  return {
    type: POST_CREDENTIAL_SUCCESS,
    credential,
    credentialType,
  };
}

export function deleteCredentialRequestAction(id, credentialType) {
  return {
    type: DELETE_CREDENTIAL_REQUEST,
    id,
    credentialType,
  };
}

export function deleteCredentialSuccessAction(id, credentialType) {
  return {
    type: DELETE_CREDENTIAL_SUCCESS,
    id,
    credentialType,
  };
}

export function modifyCredentialRequestAction(id, credential) {
  return {
    type: MODIFY_CREDENTIAL_REQUEST,
    id,
    credential,
  };
}

export function modifyCredentialSuccessAction(id, credential, credentialType) {
  return {
    type: MODIFY_CREDENTIAL_SUCCESS,
    id,
    credential,
    credentialType,
  };
}

export function getCredentialListRequestAction() {
  return {
    type: GET_CREDENTIAL_LIST_REQUEST,
  };
}

export function getCredentialListSuccessAction(educationList, employmentList, textList) {
  return {
    type: GET_CREDENTIAL_LIST_SUCCESS,
    educationList,
    employmentList,
    textList,
  };
}

export function updateProfileImageRequestAction(blobSrc) {
  return {
    type: UPDATE_PROFILE_IMAGE_REQUEST,
    blobSrc,
  };
}

export function updateProfileImageSuccessAction(s3Src) {
  return {
    type: UPDATE_PROFILE_IMAGE_SUCCESS,
    s3Src,
  };
}

export function updateProfileImageFailureAction() {
  return {
    type: UPDATE_PROFILE_IMAGE_FAILURE,
  };
}

export function updateDescriptionRequestAction(credentialId) {
  return {
    type: UPDATE_DESCRIPTION_REQUEST,
    credentialId,
  };
}

export function updateDescriptionSuccessAction(description) {
  return {
    type: UPDATE_DESCRIPTION_SUCCESS,
    description,
  };
}

export function updateProfileRequestAction(data) {
  return {
    type: UPDATE_PROFILE_REQUEST,
    data,
  };
}

export function updateProfileSuccessAction(userInfo) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    userInfo,
  };
}
