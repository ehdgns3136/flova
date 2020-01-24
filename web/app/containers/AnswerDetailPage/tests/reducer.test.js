
import { fromJS, is } from 'immutable';
import answerDetailPageReducer, { initialState } from '../reducer';
import { initializeReducer } from '../actions';

describe('answerDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(answerDetailPageReducer(undefined, {})).toMatchSnapshot();
  });

  it('should initialize reducer', () => {
    expect(is(answerDetailPageReducer(undefined, initializeReducer()), initialState)).toBe(true);

    const MOCK_STATE = fromJS({
      answer: null,
      question: null,
      isAnswersLoading: true,
      isQuestionLoading: true,
    });

    expect(is(answerDetailPageReducer(MOCK_STATE, initializeReducer()), initialState)).toBe(true);
  });
});
