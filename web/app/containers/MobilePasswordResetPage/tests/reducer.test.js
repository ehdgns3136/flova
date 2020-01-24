
import { fromJS } from 'immutable';
import mobilePasswordResetPageReducer from '../reducer';

describe('mobilePasswordResetPageReducer', () => {
  it('returns the initial state', () => {
    expect(mobilePasswordResetPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
