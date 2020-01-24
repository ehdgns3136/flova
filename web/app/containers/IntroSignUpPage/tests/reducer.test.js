
import { fromJS } from 'immutable';
import introSignUpPageReducer from '../reducer';

describe('introSignUpPageReducer', () => {
  it('returns the initial state', () => {
    expect(introSignUpPageReducer(undefined, {})).toMatchSnapshot();
  });
});
