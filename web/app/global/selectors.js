import { createSelector } from 'reselect';

/**
 * Direct selector to the global state domain
 */

const selectGlobalDomain = () => (state) => state.get('global');


/**
 * Other specific selectors
 */

const makeSelectIsLoggedIn = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.get('isLoggedIn'),
);

const makeSelectCheckingAuth = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.get('checkingAuth'),
);

const makeSelectLoggedInUser = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.get('loggedInUser')
);

const makeSelectFollowingTopics = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.get('followingTopics'),
);

const makeSelectSearchText = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.get('searchText'),
);

const makeSelectMainSearchResults = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.get('mainSearchResults'),
);

const makeSelectIsSearchLoading = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.get('isSearchLoading'),
);

const makeSelectRedirectPage = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.get('redirectPage'),
);

const makeSelectIsAnnounceModalOpened = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.get('isAnnounceModalOpened'),
);

const makeSelectAnnounceType = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.get('announceType'),
);

const makeSelectAccessToken = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.get('accessToken'),
);

const makeSelectAccessTokenType = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.get('accessTokenType'),
);

/**
 * Default selector used by global
 */

const makeSelectGlobal = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.toJS()
);

export default makeSelectGlobal;
export {
  selectGlobalDomain,
  makeSelectIsLoggedIn,
  makeSelectCheckingAuth,
  makeSelectLoggedInUser,
  makeSelectFollowingTopics,
  makeSelectSearchText,
  makeSelectMainSearchResults,
  makeSelectIsSearchLoading,
  makeSelectRedirectPage,
  makeSelectIsAnnounceModalOpened,
  makeSelectAnnounceType,
  makeSelectAccessToken,
  makeSelectAccessTokenType,
};
