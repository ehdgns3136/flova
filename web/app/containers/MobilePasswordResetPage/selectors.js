import { createSelector } from 'reselect';

/**
 * Direct selector to the mobilePasswordResetPage state domain
 */
const selectMobilePasswordResetPageDomain = () => (state) => state.get('mobilePasswordResetPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MobilePasswordResetPage
 */

const makeSelectMobilePasswordResetPage = () => createSelector(
  selectMobilePasswordResetPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMobilePasswordResetPage;
export {
  selectMobilePasswordResetPageDomain,
};
