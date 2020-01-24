import { fromJS } from 'immutable';
import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  MOVE_TO_TOPIC,
  MOVE_TO_SIGN_UP,
  MOVE_TO_TERMS,
  SELECT_TOPIC_ITEM,
  LOAD_TOPICS_SUCCESS,
  SET_TOPICS_EMPTY,
} from './constants';

import {
  SOCIAL_USER_CONTINUE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../IntroPage/constants';


const initialState = fromJS({
  signUpErrorMessage: null,
  signUpStep: 'TermsForm', // signUpStep: TermsForm -> SignUpForm -> TopicForm
  topicList: [],

  isLoading: false,
});


function introSignUpPageReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return state.set('signUpErrorMessage', null)
        .set('isLoading', false);
    case SIGN_UP_FAILURE:
      return state.set('signUpErrorMessage', action.errorMessage)
        .set('isLoading', false);
    case MOVE_TO_TOPIC:
      return state.set('signUpStep', 'TopicForm');
    case MOVE_TO_SIGN_UP:
      return state.set('signUpStep', 'SignUpForm');
    case MOVE_TO_TERMS:
      return state.set('signUpStep', 'TermsForm');
    case LOAD_TOPICS_SUCCESS:
      return state.set('topicList', state.get('topicList').concat(fromJS(action.topicList)));
    case SELECT_TOPIC_ITEM: {
      const topicList = state.get('topicList');
      return state.set('topicList', topicList.update(
        topicList.findIndex((topicItem) => (topicItem.get('id') === action.topicID))
        , (topicItem) => topicItem.set('selected', !topicItem.get('selected')))
      );
    }
    case SOCIAL_USER_CONTINUE:
      return state.set('isLoading', true);
    case SET_TOPICS_EMPTY:
      return state.set('topicList', fromJS([]));
    case LOGIN_SUCCESS:
      return state.set('isLoading', false);
    case LOGIN_FAILURE:
      return state.set('isLoading', false);
    default:
      return state;
  }
}

export default introSignUpPageReducer;
