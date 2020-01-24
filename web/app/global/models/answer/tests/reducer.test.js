
import { fromJS } from 'immutable';
import answerReducer from '../reducer';
import {
  openLikerModal,
  closeLikerModal,
  getAnswerLikersRequest,
  getAnswerLikersSuccess,
  getAnswerLikersFailure,
} from '../actions';
import { MOCK_USERS } from './mocks/index';


describe('answerReducer', () => {
  it('should return the initial state', () => {
    expect(answerReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle openLikerModal action correctly', () => {
    const state1 = fromJS({
      isLikerModalOpened: false,
    });

    const stateResult1 = fromJS({
      isLikerModalOpened: true,
    });

    expect(answerReducer(state1, openLikerModal())).toEqual(stateResult1);
  });

  it('should handle closeLikerModal action correctly', () => {
    const state1 = fromJS({
      isLikerModalOpened: true,
    });

    const stateResult1 = fromJS({
      isLikerModalOpened: false,
    });

    expect(answerReducer(state1, closeLikerModal())).toEqual(stateResult1);
  });

  it('should handle getAnswerLikersRequest action correctly', () => {
    const state1 = fromJS({
      likers: null,
      isLikersLoading: false,
    });

    const stateResult1 = fromJS({
      likers: null,
      isLikersLoading: true,
    });

    expect(answerReducer(state1, getAnswerLikersRequest())).toEqual(stateResult1);
  });

  it('should handle getAnswerLikersSuccess action correctly', () => {
    const state1 = fromJS({
      likers: null,
      isLikersLoading: true,
    });

    const stateResult1 = fromJS({
      likers: [
        1,
        2,
        3,
      ],
      isLikersLoading: false,
    });

    expect(answerReducer(state1, getAnswerLikersSuccess(MOCK_USERS))).toEqual(stateResult1);
  });

  it('should handle getAnswerLikersFailure action correctly', () => {
    const state1 = fromJS({
      likers: [
        1,
        2,
        3,
      ],
      isLikersLoading: true,
    });

    const stateResult1 = fromJS({
      likers: null,
      isLikersLoading: false,
    });

    expect(answerReducer(state1, getAnswerLikersFailure())).toEqual(stateResult1);
  });
});
