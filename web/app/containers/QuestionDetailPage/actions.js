/*
 *
 * QuestionDetailPage actions
 *
 */
import { normalize } from 'normalizr';
import {
  S3_UPLOAD_SUCCESS,
  S3_UPLOAD_FAILURE,
  ANSWERS_GET_REQUEST,
  ANSWERS_GET_SUCCESS,
  ANSWERS_GET_FAILURE,
  QUESTION_GET_REQUEST,
  QUESTION_GET_SUCCESS,
  QUESTION_GET_FAILURE,
  QUESTION_DELETE_FAILURE,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  INITIALIZE_REDUCER,
} from './constants';

import { answersSchema } from './schemas';
import { questionSchema } from '../../global/entities/schemas';

// export function s3UploadRequestAction(blobSrc) {
//   return {
//     type: S3_UPLOAD_REQUEST,
//     blobSrc,
//   };
// }

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

export function answersGetRequestAction(questionID) {
  return {
    type: ANSWERS_GET_REQUEST,
    questionID,
  };
}

export function answersGetSuccessAction(answers) {
  return {
    type: ANSWERS_GET_SUCCESS,
    payload: normalize(answers, answersSchema),
  };
}

export function answersGetFailureAction() {
  return {
    type: ANSWERS_GET_FAILURE,
  };
}

export function questionGetRequestAction(questionID) {
  return {
    type: QUESTION_GET_REQUEST,
    questionID,
  };
}

export function questionGetSuccessAction(question) {
  return {
    type: QUESTION_GET_SUCCESS,
    payload: normalize(question, questionSchema),
  };
}

export function questionGetFailureAction() {
  return {
    type: QUESTION_GET_FAILURE,
  };
}

export function questionDeleteRequestAction() {
  return {
    type: QUESTION_DELETE_REQUEST,
  };
}

export function questionDeleteSuccessAction() {
  return {
    type: QUESTION_DELETE_SUCCESS,
  };
}

export function questionDeleteFailureAction() {
  return {
    type: QUESTION_DELETE_FAILURE,
  };
}

export function initializeReducer() {
  return {
    type: INITIALIZE_REDUCER,
  };
}
