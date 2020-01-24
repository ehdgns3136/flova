
import { fromJS } from 'immutable';
import invitePageReducer from '../reducer';

describe('invitePageReducer', () => {
  it('returns the initial state', () => {
    expect(invitePageReducer(undefined, {})).toMatchSnapshot();
  });
});
