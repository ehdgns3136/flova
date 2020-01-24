import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import selectEntitiesDomain from 'global/entities/selectors';
import {
  activitiesSchema,
} from 'global/entities/schemas';


const selectTopicDetailPageDomain = () => (state) => state.get('topicDetailPage');

/**
 * Other specific selectors
 */
const makeSelectIsTopicDetailLoading = () => createSelector(
  selectTopicDetailPageDomain(),
  (substate) => substate.get('isTopicDetailLoading'),
);

const makeSelectTopic = () => createSelector(
  selectTopicDetailPageDomain(),
  (substate) => substate.get('topic'),
);

const makeSelectIsContentsLoading = () => createSelector(
  selectTopicDetailPageDomain(),
  (substate) => substate.get('isContentsLoading'),
);

const makeSelectContents = () => createSelector(
  selectTopicDetailPageDomain(),
  selectEntitiesDomain(),
  (substate, entities) => denormalize(substate.get('contents'), activitiesSchema, entities),
);

const makeSelectActiveItem = () => createSelector(
  selectTopicDetailPageDomain(),
  (substate) => substate.get('activeItem'),
);

/**
 * Default selector used by TopicDetailPage
 */

const makeSelectTopicDetailPage = () => createSelector(
  selectTopicDetailPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectTopicDetailPage;
export {
  selectTopicDetailPageDomain,
  makeSelectIsTopicDetailLoading,
  makeSelectTopic,
  makeSelectIsContentsLoading,
  makeSelectActiveItem,
  makeSelectContents,
};
