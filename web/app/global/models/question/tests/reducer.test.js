
import { fromJS } from 'immutable';
import questionReducer from '../reducer';
import {
  openFollowerModal,
  closeFollowerModal,
  getQuestionFollowersRequest,
  getQuestionFollowersSuccess,
  getQuestionFollowersFailure,
} from '../actions';
import { MOCK_USERS } from './mocks/index';


describe('questionReducer', () => {
  it('should return the initial state', () => {
    expect(questionReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle openFollowerModal action correctly', () => {
    const state1 = fromJS({
      isFollowerModalOpened: false,
    });

    const stateResult1 = fromJS({
      isFollowerModalOpened: true,
    });

    expect(questionReducer(state1, openFollowerModal())).toEqual(stateResult1);
  });

  it('should handle closeFollowerModal action correctly', () => {
    const state1 = fromJS({
      isFollowerModalOpened: true,
    });

    const stateResult1 = fromJS({
      isFollowerModalOpened: false,
    });

    expect(questionReducer(state1, closeFollowerModal())).toEqual(stateResult1);
  });

  it('should handle getQuestionFollowersRequest action correctly', () => {
    const state1 = fromJS({
      followers: null,
      isFollowersLoading: false,
    });

    const stateResult1 = fromJS({
      followers: null,
      isFollowersLoading: true,
    });

    expect(questionReducer(state1, getQuestionFollowersRequest())).toEqual(stateResult1);
  });

  it('should handle getQuestionFollowersSuccess action correctly', () => {
    const state1 = fromJS({
      followers: null,
      isFollowersLoading: true,
    });

    const stateResult1 = fromJS({
      followers: [
        1,
        2,
        3,
      ],
      isFollowersLoading: false,
    });

    expect(questionReducer(state1, getQuestionFollowersSuccess(MOCK_USERS))).toEqual(stateResult1);
  });

  it('should handle getQuestionFollowersFailure action correctly', () => {
    const state1 = fromJS({
      followers: [
        1,
        2,
        3,
      ],
      isFollowersLoading: true,
    });

    const stateResult1 = fromJS({
      followers: null,
      isFollowersLoading: false,
    });

    expect(questionReducer(state1, getQuestionFollowersFailure())).toEqual(stateResult1);
  });
});
