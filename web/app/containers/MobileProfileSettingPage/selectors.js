import { createSelector } from 'reselect';

/**
 * Direct selector to the mobileProfileSettingPage state domain
 */
const selectMobileProfileSettingPageDomain = () => (state) => state.get('mobileProfileSettingPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MobileProfileSettingPage
 */

const makeSelectMobileProfileSettingPage = () => createSelector(
  selectMobileProfileSettingPageDomain(),
  (substate) => substate.toJS()
);

const makeSelectProfile = () => createSelector(
  selectMobileProfileSettingPageDomain(),
  (substate) => substate.get('profile')
);

const makeSelectIsMobileProfileSettingPageLoading = () => createSelector(
  selectMobileProfileSettingPageDomain(),
  (substate) => substate.get('isMobileProfileSettingPageLoading')
);

export default makeSelectMobileProfileSettingPage;
export {
  selectMobileProfileSettingPageDomain,
  makeSelectProfile,
  makeSelectIsMobileProfileSettingPageLoading,
};
