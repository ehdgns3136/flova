import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  MOVE_TO_TOPIC,
  MOVE_TO_SIGN_UP,
  MOVE_TO_TERMS,
  LOAD_TOPICS_REQUEST,
  LOAD_TOPICS_SUCCESS,
  SELECT_TOPIC_ITEM,
  ADD_TOPICS_TO_USER_REQUEST,
  SIGN_UP_SUCCESS_REDIRECT_REQUEST,
  SET_TOPICS_EMPTY,
} from './constants';

export function signUpRequestAction(email, password, name) {
  return {
    type: SIGN_UP_REQUEST,
    email,
    password,
    name,
  };
}

export function signUpSuccessAction() {
  return {
    type: SIGN_UP_SUCCESS,
  };
}

export function signUpFailureAction(errorMessage) {
  return {
    type: SIGN_UP_FAILURE,
    errorMessage,
  };
}

export function moveToTopicAction() {
  return {
    type: MOVE_TO_TOPIC,
  };
}

export function moveToSignUpAction() {
  return {
    type: MOVE_TO_SIGN_UP,
  };
}

export function moveToTermsAction() {
  return {
    type: MOVE_TO_TERMS,
  };
}

export function loadTopicsRequestAction() {
  return {
    type: LOAD_TOPICS_REQUEST,
  };
}

export function loadTopicsSuccessAction(topicList) {
  return {
    type: LOAD_TOPICS_SUCCESS,
    topicList,
  };
}

export function selectTopicItemAction(topicID) {
  return {
    type: SELECT_TOPIC_ITEM,
    topicID,
  };
}

export function addTopicsToUserRequestAction(selectedTopicItemList) {
  return {
    type: ADD_TOPICS_TO_USER_REQUEST,
    selectedTopicItemList,
  };
}


export function signUpSuccessRedirectRequestAction() {
  return {
    type: SIGN_UP_SUCCESS_REDIRECT_REQUEST,
  };
}

export function setTopicsEmptyAction() {
  return {
    type: SET_TOPICS_EMPTY,
  };
}
