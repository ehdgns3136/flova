import { normalize } from 'normalizr';
import {
  activitiesSchema,
} from 'global/entities/schemas';
import {
  CLEAR_FEED,
  CHANGE_ACTIVE_CATEGORY,
  CHECK_ACTIVE_CATEGORY,
  GET_ACTIVITIES_REQUEST,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_FAILURE,
} from './constants';


export function clearFeed() {
  return {
    type: CLEAR_FEED,
  };
}

export function getActivitiesRequest(params) {
  return {
    type: GET_ACTIVITIES_REQUEST,
    params,
  };
}

export function getActivitiesSuccess(activities, nextCursor, previousCursor) {
  return {
    type: GET_ACTIVITIES_SUCCESS,
    payload: normalize(activities, activitiesSchema),
    nextCursor,
    previousCursor,
  };
}

export function getActivitiesFailure() {
  return {
    type: GET_ACTIVITIES_FAILURE,
  };
}

export function changeActiveCategory(category) {
  return {
    type: CHANGE_ACTIVE_CATEGORY,
    category,
  };
}

export function checkActiveCategory(params) {
  return {
    type: CHECK_ACTIVE_CATEGORY,
    params,
  };
}
