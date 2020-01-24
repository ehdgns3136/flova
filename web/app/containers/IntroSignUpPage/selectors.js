import { createSelector } from 'reselect';

/**
 * Direct selector to the introPage state domain
 */
const selectIntroSignUpPageDomain = () => (state) => state.get('introSignUpPage');

/**
 * Other specific selectors
 */

const makeSelectSignUpErrorMessage = () => createSelector(
  selectIntroSignUpPageDomain(),
  (substate) => substate.get('signUpErrorMessage'),
);

const makeSelectSignUpStep = () => createSelector(
  selectIntroSignUpPageDomain(),
  (substate) => substate.get('signUpStep'),
);

const makeSelectTopicList = () => createSelector(
  selectIntroSignUpPageDomain(),
  (substate) => substate.get('topicList'),
);

const makeSelectIsLoading = () => createSelector(
  selectIntroSignUpPageDomain(),
  (substate) => substate.get('isLoading'),
);

/**
 * Default selector used by IntroPage
 */

const makeSelectIntroSignUpPage = () => createSelector(
  selectIntroSignUpPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectIntroSignUpPage;
export {
  selectIntroSignUpPageDomain,
  makeSelectSignUpErrorMessage,
  makeSelectSignUpStep,
  makeSelectTopicList,
  makeSelectIsLoading,
};
