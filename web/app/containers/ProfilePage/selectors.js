import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import selectEntitiesDomain from 'global/entities/selectors';
import { activitiesSchema, userSchema } from 'global/entities/schemas';


const selectProfilePageDomain = () => (state) => state.get('profilePage');

const makeSelectQuestions = () => createSelector(
  selectProfilePageDomain(),
  selectEntitiesDomain(),
  (substate, entities) => denormalize(substate.get('questions'), activitiesSchema, entities),
);

const makeSelectTopics = () => createSelector(
  selectProfilePageDomain(),
  (substate) => substate.get('topics')
);

const makeSelectUsers = () => createSelector(
  selectProfilePageDomain(),
  selectEntitiesDomain(),
  (substate, entities) => denormalize(substate.get('users'), [userSchema], entities),
);

const makeSelectQuestionsCursor = () => createSelector(
  selectProfilePageDomain(),
  (substate) => substate.get('questionsCursor')
);

const makeSelectIsContentsLoading = () => createSelector(
  selectProfilePageDomain(),
  (substate) => substate.get('isContentsLoading')
);

const makeSelectActiveItem = () => createSelector(
  selectProfilePageDomain(),
  (substate) => substate.get('activeItem')
);

const makeSelectIsCredentialFormModalOpened = () => createSelector(
  selectProfilePageDomain(),
  (substate) => substate.get('isCredentialFormModalOpened'),
);

const makeSelectProfile = () => createSelector(
  selectProfilePageDomain(),
  (substate) => substate.get('profile')
);

const makeSelectIsProfilePageLoading = () => createSelector(
  selectProfilePageDomain(),
  (substate) => substate.get('isProfilePageLoading')
);

const makeSelectIsProfilePageError = () => createSelector(
  selectProfilePageDomain(),
  (substate) => substate.get('isProfilePageError')
);

export {
  selectProfilePageDomain,
  makeSelectIsContentsLoading,
  makeSelectActiveItem,
  makeSelectQuestions,
  makeSelectQuestionsCursor,
  makeSelectTopics,
  makeSelectUsers,
  makeSelectIsCredentialFormModalOpened,
  makeSelectProfile,
  makeSelectIsProfilePageLoading,
  makeSelectIsProfilePageError,
};
