import { createSelector } from 'reselect';

/**
 * Direct selector to the InvitePage state domain
 */
const selectInvitePageDomain = () => (state) => state.get('invitePage');

/**
 * Other specific selectors
 */

const makeSelectInviteKey = () => createSelector(
  selectInvitePageDomain(),
  (substate) => substate.get('inviteKey'),
);
const makeSelectInvitedName = () => createSelector(
  selectInvitePageDomain(),
  (substate) => substate.get('invitedName'),
);
const makeSelectValidateError = () => createSelector(
  selectInvitePageDomain(),
  (substate) => substate.get('validateError'),
);
const makeSelectIsValidating = () => createSelector(
  selectInvitePageDomain(),
  (substate) => substate.get('isValidating'),
);

export {
  selectInvitePageDomain,
  makeSelectInviteKey,
  makeSelectInvitedName,
  makeSelectValidateError,
  makeSelectIsValidating,
};
