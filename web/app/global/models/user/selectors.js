// import { createSelector } from 'reselect';

/**
 * Direct selector to the global state domain
 */

const selectUserDomain = () => (state) => state.get('user');


/**
 * Entities selectors
 */

export default selectUserDomain;
export {
};
