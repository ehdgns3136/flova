import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import selectEntitiesDomain from 'global/entities/selectors';
import { userSchema } from 'global/entities/schemas';

/**
 * Direct selector to the global state domain
 */

const selectQuestionDomain = () => (state) => state.get('question');


/**
 * Other specific selectors
 */

const makeSelectIsQuestionFormModalOpened = () => createSelector(
  selectQuestionDomain(),
  (substate) => substate.get('isQuestionFormModalOpened'),
);

const makeSelectIsQuestionEditFormModalOpened = () => createSelector(
  selectQuestionDomain(),
  (substate) => substate.get('isQuestionEditFormModalOpened'),
);

const makeSelectIsQuestionUploading = () => createSelector(
  selectQuestionDomain(),
  (substate) => substate.get('isQuestionUploading'),
);

const makeSelectIsQuestionUploadError = () => createSelector(
  selectQuestionDomain(),
  (substate) => substate.get('isQuestionUploadError'),
);

const makeSelectInitialTitle = () => createSelector(
  selectQuestionDomain(),
  (substate) => substate.get('initialTitle'),
);

const makeSelectQuestionID = () => createSelector(
  selectQuestionDomain(),
  (substate) => substate.get('questionID'),
);

const makeSelectInitialContent = () => createSelector(
  selectQuestionDomain(),
  (substate) => substate.get('initialContent'),
);

const makeSelectInitialTopics = () => createSelector(
  selectQuestionDomain(),
  (substate) => substate.get('initialTopics'),
);

const makeSelectIsFollowerModalOpened = () => createSelector(
  selectQuestionDomain(),
  (substate) => substate.get('isFollowerModalOpened'),
);

const makeSelectFollowers = () => createSelector(
  selectQuestionDomain(),
  selectEntitiesDomain(),
  (substate, entities) => denormalize(substate.get('followers'), [userSchema], entities),
);

const makeSelectIsFollowersLoading = () => createSelector(
  selectQuestionDomain(),
  (substate) => substate.get('isFollowersLoading'),
);

export default selectQuestionDomain;
export {
  makeSelectIsQuestionFormModalOpened,
  makeSelectIsQuestionEditFormModalOpened,
  makeSelectIsQuestionUploading,
  makeSelectIsQuestionUploadError,
  makeSelectQuestionID,
  makeSelectInitialTitle,
  makeSelectInitialContent,
  makeSelectInitialTopics,
  makeSelectIsFollowerModalOpened,
  makeSelectFollowers,
  makeSelectIsFollowersLoading,
};
