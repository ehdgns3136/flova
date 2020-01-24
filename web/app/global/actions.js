/*
 *
 * Global actions
 *
 */

import {
  AUTH_INVALID,
  GET_FOLLOWING_TOPICS_REQUEST,
  GET_FOLLOWING_TOPICS_SUCCESS,
  GET_MAIN_SEARCH_FAILURE,
  GET_MAIN_SEARCH_REQUEST,
  GET_MAIN_SEARCH_SUCCESS,
  S3_UPLOAD_FAILURE,
  S3_UPLOAD_SUCCESS,
  SEND_LOGIN_SIGNAL,
  SHOW_TOAST_REQUEST,
  SHOW_TOAST_SUCCESS,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_FAILURE,
  LOGOUT,
  UPDATE_REDIRECT_PAGE_REQUEST,
  UPDATE_LOGGED_IN_USER,
  OPEN_ANNOUNCE_MODAL_REQUEST,
  CLOSE_ANNOUNCE_MODAL_REQUEST,
  STORE_ACCESS_TOKEN_REQUEST,
  EMPTY_ACCESS_TOKEN_REQUEST,
} from './constants';

export function authInvalidAction() {
  return {
    type: AUTH_INVALID,
  };
}

export function updateUserInfoRequestAction(loggedInUser) {
  return {
    type: UPDATE_USER_INFO_REQUEST,
    loggedInUser,
  };
}

export function updateUserInfoSuccessAction(loggedInUser) {
  return {
    type: UPDATE_USER_INFO_SUCCESS,
    loggedInUser,
  };
}

export function updateUserInfoFailureAction() {
  return {
    type: UPDATE_USER_INFO_FAILURE,
  };
}

export function getFollowingTopicsRequestAction() {
  return {
    type: GET_FOLLOWING_TOPICS_REQUEST,
  };
}

export function getFollowingTopicsSuccessAction(topics) {
  return {
    type: GET_FOLLOWING_TOPICS_SUCCESS,
    topics,
  };
}

/**
 * Request to show toasts.
 * @param {string} toastType 'SUCCESS', 'ERROR'; implemented. 'INFO', 'WARNING' can be will be implemented later.
 * @param {string} title Toast title.
 * @param {string} content Toast content.
 */
export function showToastRequest(toastType, title, content) {
  return {
    type: SHOW_TOAST_REQUEST,
    toastType,
    title,
    content,
  };
}

export function sendLoginSignalAction() {
  return {
    type: SEND_LOGIN_SIGNAL,
  };
}

export function showToastSuccess() {
  return {
    type: SHOW_TOAST_SUCCESS,
  };
}

export function s3UploadSuccessAction() {
  return {
    type: S3_UPLOAD_SUCCESS,
  };
}

export function s3UploadFailureAction() {
  return {
    type: S3_UPLOAD_FAILURE,
  };
}

export function getMainSearchRequest(searchText) {
  return {
    type: GET_MAIN_SEARCH_REQUEST,
    searchText,
  };
}

export function getMainSearchSuccess(searchResults) {
  return {
    type: GET_MAIN_SEARCH_SUCCESS,
    searchResults,
  };
}

export function getMainSearchFailure() {
  return {
    type: GET_MAIN_SEARCH_FAILURE,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function updateRedirectPageRequestAction(url) {
  return {
    type: UPDATE_REDIRECT_PAGE_REQUEST,
    url,
  };
}

export function updateLoggedInUser(payload) {
  return {
    type: UPDATE_LOGGED_IN_USER,
    payload,
  };
}

export function openAnnounceModalRequestAction(announceType) {
  return {
    type: OPEN_ANNOUNCE_MODAL_REQUEST,
    announceType,
  };
}

export function closeAnnounceModalRequestAction() {
  return {
    type: CLOSE_ANNOUNCE_MODAL_REQUEST,
  };
}

export function storeAccessTokenRequestAction(token, tokenType) {
  return {
    type: STORE_ACCESS_TOKEN_REQUEST,
    token,
    tokenType,
  };
}

export function emptyAccessTokenRequestAction() {
  return {
    type: EMPTY_ACCESS_TOKEN_REQUEST,
  };
}
