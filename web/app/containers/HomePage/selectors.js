import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import selectEntitiesDomain from 'global/entities/selectors';
import {
  activitiesSchema,
} from 'global/entities/schemas';


/**
 * Direct selector to the introPage state domain
 */
const selectHomePageDomain = () => (state) => state.get('homePage');

/**
 * Other specific selectors
 */

const makeSelectIsLoading = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.get('isLoading'),
);

const makeSelectIsError = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.get('isError'),
);

const makeSelectActivities = () => createSelector(
  selectHomePageDomain(),
  selectEntitiesDomain(),
  (substate, entities) => denormalize(substate.get('activities'), activitiesSchema, entities),
);

const makeSelectNextCursor = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.get('nextCursor'),
);

const makeSelectPreviousCursor = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.get('previousCursor'),
);

const makeSelectActiveCategory = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.get('activeCategory'),
);
/**
 * Default selector used by IntroPage
 */

const makeSelectHomePage = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectHomePage;
export {
  makeSelectIsLoading,
  makeSelectIsError,
  makeSelectActivities,
  makeSelectNextCursor,
  makeSelectPreviousCursor,
  makeSelectActiveCategory,
};
