/*
 *
 * Global reducer
 *
 */

import { fromJS } from 'immutable';
import {
  OPEN_QUESTION_FORM_MODAL,
} from './models/question/constants';
import {
  AUTH_INVALID,
  UPDATE_USER_INFO_SUCCESS,
  GET_FOLLOWING_TOPICS_SUCCESS,
  SHOW_TOAST_REQUEST,
  SHOW_TOAST_SUCCESS,
  GET_MAIN_SEARCH_REQUEST,
  GET_MAIN_SEARCH_SUCCESS,
  GET_MAIN_SEARCH_FAILURE,
  LOGOUT,
  SEND_LOGIN_SIGNAL,
  UPDATE_REDIRECT_PAGE_REQUEST,
  UPDATE_LOGGED_IN_USER,
  OPEN_ANNOUNCE_MODAL_REQUEST,
  CLOSE_ANNOUNCE_MODAL_REQUEST,
  STORE_ACCESS_TOKEN_REQUEST,
  EMPTY_ACCESS_TOKEN_REQUEST,
} from './constants';

import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  UPDATE_DESCRIPTION_SUCCESS,
} from './profile/constants';

const initialState = fromJS({
  isLoggedIn: null,
  checkingAuth: true,
  loggedInUser: null,
  followingTopics: [], // 피드에 띄워주는 토픽 (최대 5개)

  nextToastTitle: null,
  nextToastContent: null,
  nextToastType: null,

  searchText: '',
  mainSearchResults: [],
  isSearchLoading: false,

  redirectPage: '',

  isAnnounceModalOpened: false,
  announceType: '',

  accessToken: null,
  accessTokenType: null,
});


function globalReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT:
      return state.set('isLoggedIn', false).set('checkingAuth', false)
        .set('loggedInUser', null).set('followingTopics', fromJS([]));
    case AUTH_INVALID:
      return state.set('isLoggedIn', false).set('checkingAuth', false);
    case SEND_LOGIN_SIGNAL:
      return state.set('isLoggedIn', true);
    case UPDATE_USER_INFO_SUCCESS: {
      return state.set('checkingAuth', false)
        .set('loggedInUser', fromJS(action.loggedInUser));
    }
    case GET_FOLLOWING_TOPICS_SUCCESS:
      return state.set('followingTopics', fromJS(action.topics));
    case SHOW_TOAST_REQUEST:
      return state.set('nextToastTitle', action.title).set('nextToastContent', action.content).set('nextToastType', action.toastType);
    case SHOW_TOAST_SUCCESS:
      return state.set('nextToastTitle', null).set('nextToastContent', null).set('nextToastType', null);
    case GET_MAIN_SEARCH_REQUEST:
      return state.set('isSearchLoading', true)
        .set('searchText', action.searchText); // update searchText too
    case GET_MAIN_SEARCH_SUCCESS:
      return state.set('mainSearchResults', fromJS(action.searchResults))
        .set('isSearchLoading', false);
    case GET_MAIN_SEARCH_FAILURE:
      return state.set('isSearchLoading', false);
    case OPEN_QUESTION_FORM_MODAL:
      return state.set('searchText', '');
    case UPDATE_PROFILE_IMAGE_SUCCESS:
      return state.set('loggedInUser', state.get('loggedInUser').set('profile_image', action.s3Src));
    case UPDATE_DESCRIPTION_SUCCESS:
      return state.set('loggedInUser', state.get('loggedInUser').set('description', action.description));
    case UPDATE_PROFILE_SUCCESS:
      return state.set('loggedInUser', fromJS(action.userInfo));
    case UPDATE_LOGGED_IN_USER: {
      const loggedInUser = state.get('loggedInUser');
      return state.set('loggedInUser', loggedInUser.merge(fromJS(action.payload)));
    }
    case UPDATE_REDIRECT_PAGE_REQUEST:
      return state.set('redirectPage', action.url);
    case OPEN_ANNOUNCE_MODAL_REQUEST:
      return state.set('isAnnounceModalOpened', true)
        .set('loggedInUser', state.get('loggedInUser').set('first_answerer', false))
        .set('announceType', action.announceType);
    case CLOSE_ANNOUNCE_MODAL_REQUEST:
      return state.set('isAnnounceModalOpened', false);
    case STORE_ACCESS_TOKEN_REQUEST:
      return state.set('accessToken', action.token)
        .set('accessTokenType', action.tokenType);
    case EMPTY_ACCESS_TOKEN_REQUEST:
      return state.set('accessToken', null)
        .set('accessTokenType', null);
    default:
      return state;
  }
}

export default globalReducer;
