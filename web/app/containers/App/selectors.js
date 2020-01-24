import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const makeSelectNextToastType = () => createSelector(
  selectGlobal(),
  (substate) => substate.get('nextToastType'),
);

const makeSelectNextToastTitle = () => createSelector(
  selectGlobal(),
  (substate) => substate.get('nextToastTitle'),
);

const makeSelectNextToastContent = () => createSelector(
  selectGlobal(),
  (substate) => substate.get('nextToastContent'),
);

export {
  makeSelectLocationState,
  makeSelectNextToastContent,
  makeSelectNextToastTitle,
  makeSelectNextToastType,
};
