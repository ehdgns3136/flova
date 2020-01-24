
import { fromJS } from 'immutable';
import introPageReducer from '../reducer';

import {
  loginSuccessAction,
} from '../actions';

describe('introPageReducer', () => {
  it('returns the initial state', () => {
    expect(introPageReducer(undefined, {})).toMatchSnapshot();
  });

  it('handles loginSuccessAction', () => {
    expect(introPageReducer(undefined, loginSuccessAction())).toMatchSnapshot();
  });
});
