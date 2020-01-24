/*
 *
 * IntroPasswordResetPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import {
  validatePasswordResetKeyRequestAction,
} from './actions';

import * as Style from './index.style';
import IntroPasswordResetForm from './IntroPasswordResetForm';
import backgroundImg from '../../assets/intro-background.jpg';

export class IntroPasswordResetPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onValidatePasswordResetKey(this.props.params.key);
  }

  render() {
    return (
      <Style.IntroPasswordResetPageContainer>
        <Helmet>
          <title>비밀번호 재설정 - 플로바(Flova)</title>
          <meta name="description" content="비밀번호 재설정 페이지입니다." />
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <Style.BackgroundImage src={backgroundImg} role="presentation" width="100%" height="135%" />
        <IntroPasswordResetForm />
      </Style.IntroPasswordResetPageContainer>
    );
  }
}

IntroPasswordResetPage.propTypes = {
  onValidatePasswordResetKey: PropTypes.func.isRequired,
  params: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    onValidatePasswordResetKey: (key) => {
      dispatch(validatePasswordResetKeyRequestAction(key));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroPasswordResetPage);
