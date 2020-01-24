import { createSelector } from 'reselect';

/**
 * Direct selector to the passwordResetPage state domain
 */
const selectIntroPasswordResetPageDomain = () => (state) => state.get('passwordResetPage');

/**
 * Other specific selectors
 */

const makeSelectEmail = () => createSelector(
  selectIntroPasswordResetPageDomain(),
  (substate) => substate.get('email'),
);

const makeSelectValidate = () => createSelector(
  selectIntroPasswordResetPageDomain(),
  (substate) => substate.get('validate'),
);

const makeSelectValidateLoading = () => createSelector(
  selectIntroPasswordResetPageDomain(),
  (substate) => substate.get('validateLoading'),
);

const makeSelectPasswordKey = () => createSelector(
  selectIntroPasswordResetPageDomain(),
  (substate) => substate.get('passwordKey'),
);

/**
 * Default selector used by IntroPasswordResetPage
 */

const makeSelectIntroPasswordResetPage = () => createSelector(
  selectIntroPasswordResetPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectIntroPasswordResetPage;
export {
  selectIntroPasswordResetPageDomain,
  makeSelectEmail,
  makeSelectValidate,
  makeSelectValidateLoading,
  makeSelectPasswordKey,
};
