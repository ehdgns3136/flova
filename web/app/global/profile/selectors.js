import { createSelector } from 'reselect';

/**
 * Direct selector to the global state domain
 */

const selectProfileDomain = () => (state) => state.get('profile');

const makeSelectTopicList = () => createSelector(
  selectProfileDomain(),
  (substate) => substate.get('topicList'),
);

const makeSelectConcentrationList = () => createSelector(
  selectProfileDomain(),
  (substate) => substate.get('concentrationList'),
);

const makeSelectRoleList = () => createSelector(
  selectProfileDomain(),
  (substate) => substate.get('roleList'),
);

const makeSelectEducationCredentialList = () => createSelector(
  selectProfileDomain(),
  (substate) => substate.get('educationCredentialList'),
);

const makeSelectEmploymentCredentialList = () => createSelector(
  selectProfileDomain(),
  (substate) => substate.get('employmentCredentialList'),
);

const makeSelectTextCredentialList = () => createSelector(
  selectProfileDomain(),
  (substate) => substate.get('textCredentialList'),
);

/**
 * Other specific selectors
 */

export default selectProfileDomain;
export {
  makeSelectEducationCredentialList,
  makeSelectEmploymentCredentialList,
  makeSelectTopicList,
  makeSelectConcentrationList,
  makeSelectRoleList,
  makeSelectTextCredentialList,
};
