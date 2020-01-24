import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LoginForm from 'components/LoginForm';

import {
  loginRequestAction,
  checkSocialUserExistRequestAction,
} from './actions';

import { moveToTermsAction } from '../IntroSignUpPage/actions';

import {
  makeSelectLoginError,
  makeSelectIsLoading,
} from './selectors';

import { emptyAccessTokenRequestAction } from '../../global/actions';

const mapStateToProps = createStructuredSelector({
  loginError: makeSelectLoginError(),
  isLoading: makeSelectIsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoginRequest: (email, password) => {
      dispatch(loginRequestAction(email, password));
    },
    onMoveToTerms: () => {
      dispatch(moveToTermsAction());
    },
    onCheckSocialUserExist: (token, tokenType) => {
      dispatch(checkSocialUserExistRequestAction(token, tokenType));
    },
    emptyAccessToken: () => {
      dispatch(emptyAccessTokenRequestAction());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
