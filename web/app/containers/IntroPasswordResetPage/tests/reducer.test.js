//
// import { fromJS } from 'immutable';
import passwordResetPageReducer from '../reducer';

describe('passwordResetPageReducer', () => {
  it('returns the initial state', () => {
    expect(passwordResetPageReducer(undefined, {})).toMatchSnapshot();
  });
});
