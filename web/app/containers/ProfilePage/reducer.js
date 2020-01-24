import { fromJS } from 'immutable';
import {
  GET_QUESTIONS_FAILURE,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  CHANGE_ACTIVE_ITEM,
  GET_FOLLOWING_TOPICS_FAILURE,
  GET_FOLLOWING_TOPICS_REQUEST,
  GET_FOLLOWING_TOPICS_SUCCESS,
  GET_FOLLOWERS_REQUEST,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_FAILURE,
  GET_FOLLOWING_USERS_REQUEST,
  GET_FOLLOWING_USERS_SUCCESS,
  GET_FOLLOWING_USERS_FAILURE,
  OPEN_CREDENTIAL_FORM_MODAL,
  CLOSE_CREDENTIAL_FORM_MODAL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  FOLLOW_TOPIC_REQUEST,
  FOLLOW_TOPIC_FAILURE,
  FOLLOW_TOPIC_SUCCESS,
  INITIALIZE_STATE,
} from './constants';

import {
  POST_CREDENTIAL_SUCCESS,
  DELETE_CREDENTIAL_SUCCESS,
  MODIFY_CREDENTIAL_SUCCESS,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_DESCRIPTION_SUCCESS,
} from '../../global/profile/constants';

import {
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_FAILURE,
} from '../../global/models/user/constants';

export const initialState = fromJS({
  isContentsLoading: true,
  questions: [],
  topics: [],
  users: [],
  questionsCursor: null,
  activeItem: 'writtenAnswers',

  isCredentialFormModalOpened: false,

  isProfilePageLoading: true,
  isProfilePageError: false,
  profile: null,
});

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS_REQUEST:
      return state.set('isContentsLoading', true);
    case GET_QUESTIONS_SUCCESS:
      return state.set('questions', state.get('questions').concat(fromJS(action.payload.result)))
        .set('questionsCursor', action.cursor)
        .set('isContentsLoading', false);
    case GET_QUESTIONS_FAILURE:
      return state.set('isContentsLoading', false);
    case GET_FOLLOWING_TOPICS_REQUEST:
      return state.set('isContentsLoading', true);
    case GET_FOLLOWING_TOPICS_SUCCESS:
      return state.set('topics', fromJS(action.topics))
        .set('isContentsLoading', false);
    case GET_FOLLOWING_TOPICS_FAILURE:
      return state.set('isContentsLoading', false);
    case GET_FOLLOWERS_REQUEST:
      return state.set('isContentsLoading', true);
    case GET_FOLLOWERS_SUCCESS:
      return state.set('users', fromJS(action.payload.result))
        .set('isContentsLoading', false);
    case GET_FOLLOWERS_FAILURE:
      return state.set('isContentsLoading', false);
    case GET_FOLLOWING_USERS_REQUEST:
      return state.set('isContentsLoading', true);
    case GET_FOLLOWING_USERS_SUCCESS: {
      return state.set('users', fromJS(action.payload.result))
        .set('isContentsLoading', false);
    }
    case GET_FOLLOWING_USERS_FAILURE:
      return state.set('isContentsLoading', false);
    case CHANGE_ACTIVE_ITEM:
      return state.set('activeItem', action.name)
        .set('questions', fromJS([]))
        .set('topics', fromJS([]))
        .set('users', fromJS([]))
        .set('questionsCursor', null);
    case OPEN_CREDENTIAL_FORM_MODAL:
      return state.set('isCredentialFormModalOpened', true);
    case CLOSE_CREDENTIAL_FORM_MODAL:
      return state.set('isCredentialFormModalOpened', false);
    case GET_PROFILE_REQUEST:
      return state.set('isProfilePageLoading', true);
    case GET_PROFILE_SUCCESS:
      return state.set('isProfilePageLoading', false)
        .set('profile', fromJS(action.profile));
    case GET_PROFILE_FAILURE:
      return state.set('isProfilePageLoading', false)
        .set('isProfilePageError', true);
    case POST_CREDENTIAL_SUCCESS: {
      let credentialList = state.get('profile').get('string_credentials');
      if (credentialList.size < 5) {
        credentialList = credentialList.push(fromJS({
          id: action.credential.id,
          to_string: action.credential.to_string,
          type: action.credential.type,
        }));
      }
      if (state.get('profile').get('description') === '') {
        return state.set('profile', state.get('profile').set('string_credentials', credentialList).set('description', action.credential.to_string));
      }
      return state.set('profile', state.get('profile').set('string_credentials', credentialList));
    }
    case DELETE_CREDENTIAL_SUCCESS: {
      let credentialList = state.get('profile').get('string_credentials');
      const index = credentialList.findIndex((item) => (item.get('id') === action.id));
      if (state.get('profile').get('description') === credentialList.get(index).get('to_string')) {
        credentialList = credentialList.delete(index);
        return state.set('profile', state.get('profile').set('string_credentials', credentialList).set('description', ''));
      }
      credentialList = credentialList.delete(index);
      return state.set('profile', state.get('profile').set('string_credentials', credentialList));
    }
    case MODIFY_CREDENTIAL_SUCCESS: {
      let credentialList = state.get('profile').get('string_credentials');
      credentialList = credentialList.set(credentialList.findIndex((item) => (item.get('id') === action.id)),
        fromJS({
          id: action.credential.id,
          to_string: action.credential.to_string,
          type: action.credential.type,
        })
      );
      if (state.get('profile').get('description') === '') {
        return state.set('profile', state.get('profile').set('string_credentials', credentialList).set('description', action.credential.to_string));
      }
      return state.set('profile', state.get('profile').set('string_credentials', credentialList));
    }
    case UPDATE_PROFILE_IMAGE_SUCCESS:
      return state.set('profile', state.get('profile').set('profile_image', action.s3Src));
    case UPDATE_DESCRIPTION_SUCCESS:
      return state.set('profile', state.get('profile').set('description', action.description));
    case UPDATE_PROFILE_SUCCESS:
      return state.set('profile', state.get('profile').set('description', action.userInfo.description).set('name', action.userInfo.name));
    case FOLLOW_USER_REQUEST: {
      if (action.userId === state.get('profile').get('id')) {
        return state.set('profile', state.get('profile').set('is_following', !state.get('profile').get('is_following')));
      }
      return state;
    }
    case FOLLOW_USER_FAILURE: {
      if (action.userId === state.get('profile').get('id')) {
        return state.set('profile', state.get('profile').set('is_following', !state.get('profile').get('is_following')));
      }
      return state;
    }
    case FOLLOW_TOPIC_REQUEST: {
      const topics = state.get('topics').map((topic) => {
        if (topic.get('id') === action.id) {
          return topic.set('isFollowLoading', true)
            .set('is_following', !topic.get('is_following'))
            .set('followed_num', topic.get('is_following') ? topic.get('followed_num') - 1 : topic.get('followed_num') + 1);
        }
        return topic;
      });
      return state.set('topics', topics);
    }
    case FOLLOW_TOPIC_SUCCESS: {
      const topics = state.get('topics').map((topic) => {
        if (topic.get('id') === action.topic.id) {
          return topic.set('isFollowLoading', false);
        }
        return topic;
      });
      return state.set('topics', topics);
    }
    case FOLLOW_TOPIC_FAILURE: {
      const topics = state.get('topics').map((topic) => {
        if (topic.get('id') === action.id) {
          return topic.set('isFollowLoading', false);
        }
        return topic;
      });
      return state.set('topics', topics);
    }

    case INITIALIZE_STATE: {
      return initialState;
    }

    default:
      return state;
  }
}

export default profilePageReducer;
