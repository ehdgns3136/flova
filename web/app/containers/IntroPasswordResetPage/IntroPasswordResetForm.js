/**
 * Created by donghoon on 17. 9. 12.
 */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import IntroPasswordResetForm from 'components/IntroPasswordResetForm';
import {
  makeSelectEmail,
  makeSelectValidate,
  makeSelectValidateLoading,
  makeSelectPasswordKey,
} from './selectors';

import {
  passwordResetRequestAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  validate: makeSelectValidate(),
  validateLoading: makeSelectValidateLoading(),
  passwordKey: makeSelectPasswordKey(),
});

function mapDispatchToProps(dispatch) {
  return {
    onPasswordResetClick: (password, key) => {
      dispatch(passwordResetRequestAction(password, key));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroPasswordResetForm);
