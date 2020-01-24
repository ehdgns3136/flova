//
import { fromJS, is } from 'immutable';
import questionDetailPageReducer, { initialState } from '../reducer';
import { initializeReducer } from '../actions';

describe('questionDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(questionDetailPageReducer(undefined, {})).toMatchSnapshot();
  });

  it('should initialize reducer', () => {
    expect(is(questionDetailPageReducer(undefined, initializeReducer()), initialState)).toBe(true);

    const MOCK_STATE = fromJS({
      answers: [],
      question: null,
      isAnswersLoading: true,
      isQuestionLoading: true,
    });

    expect(is(questionDetailPageReducer(MOCK_STATE, initializeReducer()), initialState)).toBe(true);
  });
});
