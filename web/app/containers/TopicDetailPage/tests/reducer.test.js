//
// import { fromJS } from 'immutable';
import topicDetailPageReducer from '../reducer';

describe('topicDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(topicDetailPageReducer(undefined, {})).toMatchSnapshot();
  });
});
