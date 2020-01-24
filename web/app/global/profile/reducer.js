/*
 *
 * Global reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_PROFILE_SUCCESS as PROFILE_PAGE_GET_PROFILE_SUCCESS,
} from 'containers/ProfilePage/constants';

import {
  GET_PROFILE_SUCCESS as CREDENTIAL_PAGE_GET_PROFILE_SUCCESS
} from 'containers/MobileCredentialPage/constants';

import {
  GET_TOPIC_SEARCH_SUCCESS,
  GET_CONCENTRATION_SEARCH_SUCCESS,
  GET_ROLE_SEARCH_SUCCESS,
  ADD_TOPIC_SUCCESS,
  ADD_CONCENTRATION_SUCCESS,
  ADD_ROLE_SUCCESS,
  POST_CREDENTIAL_SUCCESS,
  DELETE_CREDENTIAL_SUCCESS,
  MODIFY_CREDENTIAL_SUCCESS,
  GET_CREDENTIAL_LIST_SUCCESS,
} from './constants';


const initialState = fromJS({
  educationCredentialList: [],
  employmentCredentialList: [],
  textCredentialList: [],
  topicList: [],
  concentrationList: [],
  roleList: [],
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TOPIC_SEARCH_SUCCESS:
      return state.set('topicList', fromJS(action.topicList));
    case GET_CONCENTRATION_SEARCH_SUCCESS:
      return state.set('concentrationList', fromJS(action.concentrationList));
    case GET_ROLE_SEARCH_SUCCESS:
      return state.set('roleList', fromJS(action.roleList));
    case ADD_TOPIC_SUCCESS: {
      const topicList = state.get('topicList');
      return state.set('topicList', topicList.unshift(fromJS(action.topic)));
    }
    case ADD_CONCENTRATION_SUCCESS: {
      const concentrationList = state.get('concentrationList');
      return state.set('concentrationList', concentrationList.unshift(fromJS(action.concentration)));
    }
    case ADD_ROLE_SUCCESS: {
      const roleList = state.get('roleList');
      return state.set('roleList', roleList.unshift(fromJS(action.role)));
    }
    case POST_CREDENTIAL_SUCCESS: {
      if (action.credentialType === 'education') {
        return state.set('educationCredentialList', state.get('educationCredentialList').push(fromJS(action.credential)));
      } else if (action.credentialType === 'employment') {
        return state.set('employmentCredentialList', state.get('employmentCredentialList').push(fromJS(action.credential)));
      } else {
        return state.set('textCredentialList', state.get('textCredentialList').push(fromJS(action.credential)));
      }
    }
    case DELETE_CREDENTIAL_SUCCESS: {
      if (action.credentialType === 'education') {
        const credentialList = state.get('educationCredentialList');
        const index = credentialList.findIndex((item) => (item.get('id') === action.id));
        return state.set('educationCredentialList', credentialList.delete(index));
      } else if (action.credentialType === 'employment') {
        const credentialList = state.get('employmentCredentialList');
        const index = credentialList.findIndex((item) => (item.get('id') === action.id));
        return state.set('employmentCredentialList', credentialList.delete(index));
      } else {
        const credentialList = state.get('textCredentialList');
        const index = credentialList.findIndex((item) => (item.get('id') === action.id));
        return state.set('textCredentialList', credentialList.delete(index));
      }
    }
    case MODIFY_CREDENTIAL_SUCCESS: {
      if (action.credentialType === 'education') {
        const credentialList = state.get('educationCredentialList');
        const index = credentialList.findIndex((item) => (item.get('id') === action.id));
        return state.set('educationCredentialList', credentialList.set(index, fromJS(action.credential)));
      } else if (action.credentialType === 'employment') {
        const credentialList = state.get('employmentCredentialList');
        const index = credentialList.findIndex((item) => (item.get('id') === action.id));
        return state.set('employmentCredentialList', credentialList.set(index, fromJS(action.credential)));
      } else {
        const credentialList = state.get('textCredentialList');
        const index = credentialList.findIndex((item) => (item.get('id') === action.id));
        return state.set('textCredentialList', credentialList.set(index, fromJS(action.credential)));
      }
    }
    case GET_CREDENTIAL_LIST_SUCCESS:
      return state.set('educationCredentialList', fromJS(action.educationList))
        .set('employmentCredentialList', fromJS(action.employmentList))
        .set('textCredentialList', fromJS(action.textList));
    case PROFILE_PAGE_GET_PROFILE_SUCCESS: {
      return state.set('educationCredentialList', fromJS(action.profile.education))
        .set('employmentCredentialList', fromJS(action.profile.employment))
        .set('textCredentialList', fromJS(action.profile.text));
    }
    case CREDENTIAL_PAGE_GET_PROFILE_SUCCESS: {
      return state.set('educationCredentialList', fromJS(action.profile.education))
        .set('employmentCredentialList', fromJS(action.profile.employment))
        .set('textCredentialList', fromJS(action.profile.text));
    }
    default:
      return state;
  }
}

export default profileReducer;
