
import { fromJS } from 'immutable';
import introEmailCheckPageReducer from '../reducer';

describe('introEmailCheckPageReducer', () => {
  it('returns the initial state', () => {
    expect(introEmailCheckPageReducer(undefined, {})).toMatchSnapshot();
  });
});
