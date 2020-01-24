import { createSelector } from 'reselect';

/**
 * Direct selector to the introPage state domain
 */
const selectIntroEmailCheckPageDomain = () => (state) => state.get('introEmailCheckPage');

/**
 * Other specific selectors
 */

const makeSelectEmailExist = () => createSelector(
  selectIntroEmailCheckPageDomain(),
  (substate) => substate.get('emailExist'),
);

const makeSelectIsLoading = () => createSelector(
  selectIntroEmailCheckPageDomain(),
  (substate) => substate.get('isLoading'),
);

/**
 * Default selector used by IntroEmailCheckPage
 */

const makeSelectIntroEmailCheckPage = () => createSelector(
  selectIntroEmailCheckPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectIntroEmailCheckPage;
export {
  selectIntroEmailCheckPageDomain,
  makeSelectEmailExist,
  makeSelectIsLoading,
};
