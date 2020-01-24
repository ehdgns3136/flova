/*
 *
 * IntroSignUpPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { makeSelectSignUpStep } from './selectors';
import SignUpForm from './SignUpForm';
import TopicForm from './TopicForm';
import TermsForm from './TermsForm';

import backgroundImg from '../../assets/intro-background.jpg';
import * as Style from './index.style';

export class IntroSignUpPage extends React.Component {
  render() {
    return (
      <Style.IntroSignUpPageContainer>
        <Helmet>
          <title>회원가입 - 플로바(Flova)</title>
          <meta name="description" content="세상을 이해하는 더 나은 방법, 플로바(Flova)에 가입해보세요." />
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <Style.BackgroundImage src={backgroundImg} role="presentation" width="100%" height="135%" />
        {
          {
            TermsForm: (
              <TermsForm />
            ),
            SignUpForm: (
              <SignUpForm />
            ),
            TopicForm: (
              <TopicForm />
            ),
          }[this.props.signUpStep]
        }
      </Style.IntroSignUpPageContainer>
    );
  }
}

IntroSignUpPage.propTypes = {
  signUpStep: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signUpStep: makeSelectSignUpStep(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroSignUpPage);
