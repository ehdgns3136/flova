import { normalize } from 'normalizr';
import { activitiesSchema, userSchema } from 'global/entities/schemas';
import {
  GET_QUESTIONS_FAILURE,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  CHANGE_ACTIVE_ITEM,
  GET_FOLLOWING_TOPICS_REQUEST,
  GET_FOLLOWING_TOPICS_FAILURE,
  GET_FOLLOWING_TOPICS_SUCCESS,
  GET_FOLLOWERS_REQUEST,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_FAILURE,
  GET_FOLLOWING_USERS_REQUEST,
  GET_FOLLOWING_USERS_SUCCESS,
  GET_FOLLOWING_USERS_FAILURE,
  OPEN_CREDENTIAL_FORM_MODAL,
  CLOSE_CREDENTIAL_FORM_MODAL,
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  FOLLOW_TOPIC_REQUEST,
  FOLLOW_TOPIC_FAILURE,
  FOLLOW_TOPIC_SUCCESS,
  INITIALIZE_STATE,
  // OPEN_INVITE_MODAL,
  // CLOSE_INVITE_MODAL,
  // CREATE_INVITE_KEY_FAILURE,
  // CREATE_INVITE_KEY_REQUEST,
  // CREATE_INVITE_KEY_SUCCESS,
} from './constants';



export function getQuestionsRequest(id) {
  return {
    type: GET_QUESTIONS_REQUEST,
    id,
  };
}

export function getQuestionsSuccess(contents, cursor) {
  return {
    type: GET_QUESTIONS_SUCCESS,
    payload: normalize(contents, activitiesSchema),
    cursor,
  };
}

export function getQuestionsFailure() {
  return {
    type: GET_QUESTIONS_FAILURE,
  };
}

export function getFollowingTopicsRequest(id) {
  return {
    type: GET_FOLLOWING_TOPICS_REQUEST,
    id,
  };
}

export function getFollowingTopicsSuccess(topics) {
  return {
    type: GET_FOLLOWING_TOPICS_SUCCESS,
    topics,
  };
}

export function getFollowingTopicsFailure() {
  return {
    type: GET_FOLLOWING_TOPICS_FAILURE,
  };
}

export function getFollowersRequest(id) {
  return {
    type: GET_FOLLOWERS_REQUEST,
    id,
  };
}

export function getFollowersSuccess(users) {
  return {
    type: GET_FOLLOWERS_SUCCESS,
    payload: normalize(users, [userSchema]),
  };
}

export function getFollowersFailure() {
  return {
    type: GET_FOLLOWERS_FAILURE,
  };
}

export function getFollowingUsersRequest(id) {
  return {
    type: GET_FOLLOWING_USERS_REQUEST,
    id,
  };
}

export function getFollowingUsersSuccess(users) {
  return {
    type: GET_FOLLOWING_USERS_SUCCESS,
    payload: normalize(users, [userSchema]),
  };
}

export function getFollowingUsersFailure() {
  return {
    type: GET_FOLLOWING_USERS_FAILURE,
  };
}

export function changeActiveItem(name, id = null) {
  return {
    type: CHANGE_ACTIVE_ITEM,
    name,
    id,
  };
}

export function openCredentialFormModal() {
  return {
    type: OPEN_CREDENTIAL_FORM_MODAL,
  };
}

export function closeCredentialFormModal() {
  return {
    type: CLOSE_CREDENTIAL_FORM_MODAL,
  };
}

export function getProfileRequest(id) {
  return {
    type: GET_PROFILE_REQUEST,
    id,
  };
}

export function getProfileSuccess(profile) {
  return {
    type: GET_PROFILE_SUCCESS,
    profile,
    payload: normalize(profile, userSchema),
  };
}

export function getProfileFailure() {
  return {
    type: GET_PROFILE_FAILURE,
  };
}

export function followTopicRequest(id) {
  return {
    type: FOLLOW_TOPIC_REQUEST,
    id,
  };
}

export function followTopicSuccess(topic) {
  return {
    type: FOLLOW_TOPIC_SUCCESS,
    topic,
  };
}

export function followTopicFailure() {
  return {
    type: FOLLOW_TOPIC_FAILURE,
  };
}

export function initializeState() {
  return {
    type: INITIALIZE_STATE,
  };
}
