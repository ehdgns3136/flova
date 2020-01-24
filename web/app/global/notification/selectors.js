import { createSelector } from 'reselect';

/**
 * Direct selector to the global state domain
 */

const selectNotificationDomain = () => (state) => state.get('notification');


/**
 * Other specific selectors
 */

const makeSelectUnreadNotificationCount = () => createSelector(
  selectNotificationDomain(),
  (substate) => substate.get('unreadNotificationCount'),
);

const makeSelectIsNotificationListPulledBefore = () => createSelector(
  selectNotificationDomain(),
  (substate) => substate.get('isNotificationListPulledBefore'),
);

const makeSelectIsNotificationListLoading = () => createSelector(
  selectNotificationDomain(),
  (substate) => substate.get('isNotificationListLoading'),
);

const makeSelectNotificationListNextUrl = () => createSelector(
  selectNotificationDomain(),
  (substate) => substate.get('notificationListNextUrl'),
);

const makeSelectNotificationList = () => createSelector(
  selectNotificationDomain(),
  (substate) => substate.get('notificationList'),
);


export default selectNotificationDomain;
export {
  makeSelectUnreadNotificationCount,
  makeSelectIsNotificationListPulledBefore,
  makeSelectIsNotificationListLoading,
  makeSelectNotificationListNextUrl,
  makeSelectNotificationList,
};
