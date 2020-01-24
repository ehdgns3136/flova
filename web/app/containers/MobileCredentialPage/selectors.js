import { createSelector } from 'reselect';

const selectMobileCredentialPageDomain = () => (state) => state.get('mobileCredentialPage');

const makeSelectProfile = () => createSelector(
  selectMobileCredentialPageDomain(),
  (substate) => substate.get('profile')
);

const makeSelectIsMobileCredentialPageLoading = () => createSelector(
  selectMobileCredentialPageDomain(),
  (substate) => substate.get('isMobileCredentialPageLoading')
);

export {
  selectMobileCredentialPageDomain,
  makeSelectProfile,
  makeSelectIsMobileCredentialPageLoading,
};
