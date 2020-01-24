import { createSelector } from 'reselect';

/**
 * Direct selector to the global state domain
 */

const selectInviteModalDomain = () => (state) => state.get('inviteModal');


/**
 * Other specific selectors
 */
const makeSelectIsOpened = () => createSelector(
  selectInviteModalDomain(),
  (substate) => substate.get('isOpened'),
);

const makeSelectIsCreating = () => createSelector(
  selectInviteModalDomain(),
  (substate) => substate.get('isCreating'),
);

const makeSelectInviteKey = () => createSelector(
  selectInviteModalDomain(),
  (substate) => substate.get('inviteKey'),
);

const makeSelectError = () => createSelector(
  selectInviteModalDomain(),
  (substate) => substate.get('error'),
);


export default selectInviteModalDomain;
export {
  makeSelectIsOpened,
  makeSelectIsCreating,
  makeSelectInviteKey,
  makeSelectError,
};
