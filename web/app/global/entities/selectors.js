// import { createSelector } from 'reselect';

/**
 * Direct selector to the global state domain
 */

const selectEntitiesDomain = () => (state) => state.get('entities');


/**
 * Entities selectors
 */

export default selectEntitiesDomain;
export {
};
