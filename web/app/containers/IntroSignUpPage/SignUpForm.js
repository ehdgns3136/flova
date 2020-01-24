import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SignUpForm from 'components/SignUpForm';
import { signUpRequestAction, moveToTermsAction } from './actions';
import { makeSelectSignUpErrorMessage, makeSelectIsLoading } from './selectors';
import { socialUserContinueRequestAction } from '../IntroPage/actions';

const mapStateToProps = createStructuredSelector({
  signUpErrorMessage: makeSelectSignUpErrorMessage(),
  isLoading: makeSelectIsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSignUpRequest: (email, password, name) => {
      dispatch(signUpRequestAction(email, password, name));
    },
    onMoveToTerms: () => {
      dispatch(moveToTermsAction());
    },
    onSocialUserContinue: (name, id) => {
      dispatch(socialUserContinueRequestAction(name, id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
