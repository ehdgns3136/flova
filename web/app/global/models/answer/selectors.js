import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import selectEntitiesDomain from 'global/entities/selectors';
import { userSchema } from 'global/entities/schemas';

/**
 * Direct selector to the global state domain
 */

const selectAnswerDomain = () => (state) => state.get('answer');


/**
 * Other specific selectors
 */

const makeSelectIsAnswerUploading = () => createSelector(
  selectAnswerDomain(),
  (substate) => substate.get('isAnswerUploading'),
);

const makeSelectIsAnswerUploadError = () => createSelector(
  selectAnswerDomain(),
  (substate) => substate.get('isAnswerUploadError'),
);

const makeSelectQuestionID = () => createSelector(
  selectAnswerDomain(),
  (substate) => substate.get('questionID'),
);

const makeSelectInitialContent = () => createSelector(
  selectAnswerDomain(),
  (substate) => substate.get('initialContent'),
);

const makeSelectInitialTitle = () => createSelector(
  selectAnswerDomain(),
  (substate) => substate.get('initialTitle'),
);

const makeSelectIsLikerModalOpened = () => createSelector(
  selectAnswerDomain(),
  (substate) => substate.get('isLikerModalOpened'),
);

const makeSelectLikers = () => createSelector(
  selectAnswerDomain(),
  selectEntitiesDomain(),
  (substate, entities) => denormalize(substate.get('likers'), [userSchema], entities),
);

const makeSelectIsLikersLoading = () => createSelector(
  selectAnswerDomain(),
  (substate) => substate.get('isLikersLoading'),
);

export default selectAnswerDomain;
export {
  makeSelectIsAnswerUploading,
  makeSelectIsAnswerUploadError,
  makeSelectQuestionID,
  makeSelectInitialContent,
  makeSelectInitialTitle,
  makeSelectIsLikerModalOpened,
  makeSelectLikers,
  makeSelectIsLikersLoading,
};
