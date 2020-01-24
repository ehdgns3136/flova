import { fromJS } from 'immutable';
import {
  GET_TOPIC_DETAIL_FAILURE,
  GET_TOPIC_DETAIL_REQUEST,
  GET_TOPIC_DETAIL_SUCCESS,
  CHANGE_ACTIVE_ITEM,
  GET_CONTENTS_FAILURE,
  GET_CONTENTS_REQUEST,
  GET_CONTENTS_SUCCESS,
  FOLLOW_TOPIC_FAILURE,
  FOLLOW_TOPIC_REQUEST,
  FOLLOW_TOPIC_SUCCESS,
  UPDATE_TOPIC_IMAGE_SUCCESS,
} from './constants';

const initialState = fromJS({
  isTopicDetailLoading: true,
  topic: null,

  isContentsLoading: true,
  contents: [],
  activeItem: 'popularQuestions',
});

function topicDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TOPIC_DETAIL_REQUEST:
      return state.set('isTopicDetailLoading', true);
    case GET_TOPIC_DETAIL_SUCCESS:
      return state.set('isTopicDetailLoading', false)
        .set('topic', fromJS(action.topic));
    case GET_TOPIC_DETAIL_FAILURE:
      return state.set('isTopicDetailLoading', false);

    case CHANGE_ACTIVE_ITEM:
      return state.set('activeItem', action.name)
        .set('contents', fromJS([]));

    case GET_CONTENTS_REQUEST:
      return state.set('isContentsLoading', true);
    case GET_CONTENTS_SUCCESS:
      return state.set('contents', fromJS(action.payload.result))
        .set('isContentsLoading', false);
    case GET_CONTENTS_FAILURE:
      return state.set('isContentsLoading', false);
    case FOLLOW_TOPIC_REQUEST: {
      let topic = state.get('topic');
      topic = topic.set('is_following', !topic.get('is_following'));
      return state.set('topic', topic);
    }
    case FOLLOW_TOPIC_SUCCESS: {
      return state.set('topic', fromJS(action.topic));
    }
    case FOLLOW_TOPIC_FAILURE: {
      let topic = state.get('topic');
      topic = topic.set('is_following', !topic.get('is_following'));
      return state.set('topic', topic);
    }
    case UPDATE_TOPIC_IMAGE_SUCCESS:
      return state.set('topic', state.get('topic').set('topic_image', action.s3Src));
    default:
      return state;
  }
}

export default topicDetailPageReducer;
