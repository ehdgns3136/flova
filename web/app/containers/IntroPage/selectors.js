import { createSelector } from 'reselect';

/**
 * Direct selector to the introPage state domain
 */
const selectIntroPageDomain = () => (state) => state.get('introPage');

/**
 * Other specific selectors
 */

const makeSelectLoginError = () => createSelector(
  selectIntroPageDomain(),
  (substate) => substate.get('loginError'),
);

const makeSelectIsLoading = () => createSelector(
  selectIntroPageDomain(),
  (substate) => substate.get('isLoading'),
);

/**
 * Default selector used by IntroPage
 */

const makeSelectIntroPage = () => createSelector(
  selectIntroPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectIntroPage;
export {
  selectIntroPageDomain,
  makeSelectLoginError,
  makeSelectIsLoading,
};
