//
import { is } from 'immutable';
import profilePageReducer, { initialState } from '../reducer';
import { initializeState } from '../actions';

describe('profilePageReducer', () => {
  it('returns the initial state', () => {
    expect(profilePageReducer(undefined, {})).toMatchSnapshot();
  });

  it('should initialize state', () => {
    expect(is(profilePageReducer(undefined, initializeState()), initialState)).toBe(true);
  });
});
