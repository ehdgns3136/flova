
import { fromJS } from 'immutable';
import mobileProfileSettingPageReducer from '../reducer';
import {
  getProfileRequest,
  getProfileSuccess,
  getProfileFailure,
} from '../actions';

describe('mobileProfileSettingPageReducer', () => {
  it('returns the initial state', () => {
    expect(mobileProfileSettingPageReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle getProfileRequest action correctly', () => {
    const state1 = fromJS({
      isMobileProfileSettingPageError: false,
      isMobileProfileSettingPageLoading: false,
      profile: null,
    });

    const stateResult1 = fromJS({
      isMobileProfileSettingPageError: false,
      isMobileProfileSettingPageLoading: true,
      profile: null,
    });

    expect(mobileProfileSettingPageReducer(state1, getProfileRequest(1))).toEqual(stateResult1);
  });

  it('should handle getProfileSuccess action correctly', () => {
    const profile = {
      id: 1,
      name: 'HongGilDong',
    };

    const state1 = fromJS({
      isMobileProfileSettingPageError: false,
      isMobileProfileSettingPageLoading: true,
      profile: null,
    });

    const stateResult1 = fromJS({
      isMobileProfileSettingPageError: false,
      isMobileProfileSettingPageLoading: false,
      profile,
    });

    expect(mobileProfileSettingPageReducer(state1, getProfileSuccess(profile))).toEqual(stateResult1);
  });

  it('should handle getProfileFailure action correctly', () => {
    const state1 = fromJS({
      isMobileProfileSettingPageError: false,
      isMobileProfileSettingPageLoading: true,
      profile: null,
    });

    const stateResult1 = fromJS({
      isMobileProfileSettingPageError: true,
      isMobileProfileSettingPageLoading: false,
      profile: null,
    });

    expect(mobileProfileSettingPageReducer(state1, getProfileFailure())).toEqual(stateResult1);
  });
});
