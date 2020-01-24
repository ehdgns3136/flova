import { normalize } from 'normalizr';
import { activitiesSchema } from 'global/entities/schemas';
import {
  GET_TOPIC_DETAIL_FAILURE,
  GET_TOPIC_DETAIL_REQUEST,
  GET_TOPIC_DETAIL_SUCCESS,
  CHANGE_ACTIVE_ITEM,
  GET_CONTENTS_FAILURE,
  GET_CONTENTS_REQUEST,
  GET_CONTENTS_SUCCESS,
  FOLLOW_TOPIC_REQUEST,
  FOLLOW_TOPIC_FAILURE,
  FOLLOW_TOPIC_SUCCESS,
  UPDATE_TOPIC_IMAGE_REQUEST,
  UPDATE_TOPIC_IMAGE_SUCCESS,
  UPDATE_TOPIC_IMAGE_FAILURE,
} from './constants';

export function getTopicDetailRequest(id) {
  return {
    type: GET_TOPIC_DETAIL_REQUEST,
    id,
  };
}

export function getTopicDetailSuccess(topic) {
  return {
    type: GET_TOPIC_DETAIL_SUCCESS,
    topic,
  };
}

export function getTopicDetailFailure() {
  return {
    type: GET_TOPIC_DETAIL_FAILURE,
  };
}

export function changeActiveItem(name) {
  return {
    type: CHANGE_ACTIVE_ITEM,
    name,
  };
}

export function getContentsRequest() {
  return {
    type: GET_CONTENTS_REQUEST,
  };
}

export function getContentsSuccess(contents) {
  return {
    type: GET_CONTENTS_SUCCESS,
    payload: normalize(contents, activitiesSchema),
  };
}

export function getContentsFailure() {
  return {
    type: GET_CONTENTS_FAILURE,
  };
}

export function followTopicRequest() {
  return {
    type: FOLLOW_TOPIC_REQUEST,
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


export function updateTopicImageRequestAction(blobSrc, id) {
  return {
    type: UPDATE_TOPIC_IMAGE_REQUEST,
    blobSrc,
    id,
  };
}

export function updateTopicImageSuccessAction(s3Src) {
  return {
    type: UPDATE_TOPIC_IMAGE_SUCCESS,
    s3Src,
  };
}

export function updateTopicImageFailureAction() {
  return {
    type: UPDATE_TOPIC_IMAGE_FAILURE,
  };
}
