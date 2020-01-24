import { fromJS } from 'immutable';
import {
  CLEAR_FEED,
  CHANGE_ACTIVE_CATEGORY,
  GET_ACTIVITIES_FAILURE,
  GET_ACTIVITIES_REQUEST,
  GET_ACTIVITIES_SUCCESS,
} from './constants';

import { POST_ANSWER_SUCCESS } from '../../global/models/answer/constants';


export const initialState = fromJS({
  isLoading: false,
  isError: false,
  activities: [],
  nextCursor: null,
  previousCursor: null,

  activeCategory: 'home', // docs: https://flovacompany.atlassian.net/wiki/spaces/development/pages/6258689/Front+-+app+containers+HomePage+ActiveCategory+params
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_FEED:
      return state.set('activities', fromJS([])).set('nextCursor', null).set('previousCursor', null);
    case GET_ACTIVITIES_REQUEST:
      return state.set('isLoading', true);
    case GET_ACTIVITIES_SUCCESS:
      return state.set('isLoading', false)
        .set('activities', state.get('activities').concat(fromJS(action.payload.result)))
        .set('nextCursor', action.nextCursor)
        .set('previousCursor', action.previousCursor);
    case GET_ACTIVITIES_FAILURE:
      return state.set('isLoading', false)
        .set('isError', true);
    case CHANGE_ACTIVE_CATEGORY:
      return state.set('activities', fromJS([]))
        .set('activeCategory', action.category)
        .set('isLoading', false)
        .set('isError', false)
        .set('nextCursor', null)
        .set('previousCursor', null);
    default:
      return state;
  }
}

export default homePageReducer;
