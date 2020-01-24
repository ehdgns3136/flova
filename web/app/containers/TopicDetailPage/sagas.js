import { take, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import { handleAnonymous } from 'utils/anonymous-user';
import {
  getTopicDetailSuccess,
  getTopicDetailFailure,
  getContentsSuccess,
  getContentsFailure,
  followTopicFailure,
  followTopicSuccess,
  updateTopicImageSuccessAction,
  updateTopicImageFailureAction,
} from './actions';
import {
  GET_TOPIC_DETAIL_REQUEST,
  GET_CONTENTS_REQUEST,
  FOLLOW_TOPIC_REQUEST,
  UPDATE_TOPIC_IMAGE_REQUEST,
} from './constants';
import {
  makeSelectActiveItem,
  makeSelectTopic,
} from './selectors';
import {
  requestS3Upload,
} from '../../global/sagas';

export function* getContents() {
  const activeItem = yield select(makeSelectActiveItem());
  const topic = yield select(makeSelectTopic());
  try {
    let url = '';
    const id = topic.get('id');
    switch (activeItem) {
      case 'popularQuestions':
        url = `${API_ROOT}/topic/topics/${id}/popular_questions/`;
        break;
      case 'popularAnswerers':
        url = `${API_ROOT}/topic/topics/${id}/popular_answerers/`;
        break;
      case 'questionsToAnswer':
        url = `${API_ROOT}/topic/topics/${id}/questions_to_answer/`;
        break;
      default:
        console.error('Unimplemented active item error!');
        break;
    }

    const contents = yield call(request, url, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : undefined,
      },
    });
    yield put(getContentsSuccess(contents));
  } catch (err) {
    console.log(err);
    yield put(getContentsFailure());
  }
}

export function* watchGetContentsRequest() {
  yield takeLatest(GET_CONTENTS_REQUEST, getContents);
}

export function* getTopicDetail(id) {
  try {
    const topic = yield call(request, `${API_ROOT}/topic/topics/${id}/`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : undefined,
      },
    });
    yield put(getTopicDetailSuccess(topic));
  } catch (err) {
    console.log(err);
    yield put(getTopicDetailFailure());
  }
}
export function* watchGetTopicDetailRequest() {
  while (true) {
    const { id } = yield take(GET_TOPIC_DETAIL_REQUEST);
    yield call(getTopicDetail, id);
  }
}

export function* followTopic() {
  try {
    yield call(handleAnonymous);
    const topicBefore = yield select(makeSelectTopic());
    const topicAfter = yield call(request, `${API_ROOT}/topic/topics/${topicBefore.get('id')}/follow/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    yield put(followTopicSuccess(topicAfter));
  } catch (err) {
    console.log(err);
    yield put(followTopicFailure());
  }
}

export function* watchFollowTopicRequest() {
  yield takeEvery(FOLLOW_TOPIC_REQUEST, followTopic);
}

export function* requestUpdateTopicImage(blobSrc, id) {
  try {
    const s3Src = yield call(requestS3Upload, blobSrc);
    yield call(request, `${API_ROOT}/topic/topics/${id}/update/topic_image/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic_image: s3Src,
      }),
    });
    yield put(updateTopicImageSuccessAction(s3Src));
  } catch (err) {
    console.log(err);
    yield put(updateTopicImageFailureAction());
  }
}

export function* watchUpdateTopicImageRequestAction() {
  while (true) {
    const { blobSrc, id } = yield take(UPDATE_TOPIC_IMAGE_REQUEST);
    yield call(requestUpdateTopicImage, blobSrc, id);
  }
}

export default [
  watchGetTopicDetailRequest,
  watchGetContentsRequest,
  watchFollowTopicRequest,
  watchUpdateTopicImageRequestAction,
];
