/**
*
* SignUpForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { Dimmer, Loader, Message, Form } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import BigLogo from 'components/BigLogo';
import { makeHandleFieldChange, makeChainedValidateFunc, validateEmail, validatePassword, validateName, makeValidateMinLength, makeValidateMaxLength, makeValidateMatch } from 'utils/validation';
import * as Style from './index.style';
import KakaoIcon from '../../assets/kakao.png';
import FacebookIcon from '../../assets/facebook.png';
import GoogleIcon from '../../assets/google.png';


class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fbStatusLoaded: false,
      email: '',
      password: '',
      passwordConfirm: '',
      name: this.props.invitedName || '',
      validation: {
        email: null,
        password: null,
        passwordConfirm: null,
        name: null,
      },
    };

    this.handleEmailChange = makeHandleFieldChange(
      'email',
      validateEmail
    ).bind(this);

    this.handlePasswordChange = makeHandleFieldChange(
      'password',
      makeChainedValidateFunc([validatePassword, makeValidateMinLength(6), makeValidateMaxLength(16)])
    ).bind(this);

    this.handlePasswordConfirmChange = makeHandleFieldChange(
      'passwordConfirm',
      makeValidateMatch('password', this)
    ).bind(this);

    this.handleNameChange = makeHandleFieldChange(
      'name',
      validateName
    ).bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.continueFacebook = this.continueFacebook.bind(this);
    this.continueKakao = this.continueKakao.bind(this);

    if (this.state.name !== '') {
      this.state.validation.name = validateName(this.state.name);
    }
  }
  componentDidMount() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      const auth2 = gapi.auth2.init({
        client_id: '112070089622-35hq97huegonici7mf0nud5k03s9fijv.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'credential' and 'email'
        //scope: 'additional_scope'
      });
      const element = document.getElementById('googleBtn');
      auth2.attachClickHandler(element, {},
        (googleUser) => {
          const token = googleUser.getAuthResponse().id_token;
          this.props.onSocialUserContinue(token, 'google');
        }, (error) => {
          console.log(error);
        });
    });
    FB.getLoginStatus((response) => {
      this.fbLoginStatusResponse = response;
      this.setState({
        fbStatusLoaded: true,
      });
    });
  }

  continueFacebook() {
    if (this.state.fbStatusLoaded) {
      if (this.fbLoginStatusResponse.status === 'not_authorized' || this.fbLoginStatusResponse.status === 'unknown') {
        FB.login((response) => {
          this.props.onSocialUserContinue(response.authResponse.accessToken, 'facebook');
        }, { scope: 'user_friends' });
      }
      if (this.fbLoginStatusResponse.status === 'connected') {
        this.props.onSocialUserContinue(this.fbLoginStatusResponse.authResponse.accessToken, 'facebook');
      }
    }
  }

  continueKakao() {
    Kakao.Auth.login({
      success: (authObj) => {
        this.props.onSocialUserContinue(authObj.access_token, 'kakao');
      },
      fail: (err) => {
        console.log(err);
      },
    });
  }

  handleSubmit(event) {
    if (Object.keys(this.state.validation).every((key) => (this.state.validation[key] === true))) {
      this.props.onSignUpRequest(this.state.email, this.state.password, this.state.name);
    }
  }

  render() {
    const signUpDisabled = !Object.keys(this.state.validation).every((key) => (this.state.validation[key] === true));

    return (
      <Style.FlexFormContainer>
        <Style.SignUpFormContainer>
          <Dimmer active={this.props.isLoading} inverted>
            <Loader />
          </Dimmer>
          <BigLogo />
          <Style.Description marginEnable={!this.props.signUpErrorMessage}>
            회원가입 정보를 입력해주세요.
          </Style.Description>
          <Message hidden={!this.props.signUpErrorMessage} size="tiny" icon negative>
            <Style.WarningIcon name='warning circle' />
            <Message.Header>{this.props.signUpErrorMessage}</Message.Header>
          </Message>
          <Style.FormContainer>
            <Form noValidate >
              <Form.Field>
                <Style.InputField type="email" spellCheck={false} label="이메일" placeholder="이메일" value={this.state.email} onChange={this.handleEmailChange} error={this.state.validation.email === false} />
                <Style.ErrorMessage hidden={this.state.validation.email !== false}>유효한 이메일 주소를 입력해주세요</Style.ErrorMessage>
              </Form.Field>
              <Form.Field>
                <Style.InputField type="password" label="비밀번호" placeholder="비밀번호" value={this.state.password} onChange={this.handlePasswordChange} error={this.state.validation.password === false} />
                <Style.ErrorMessage hidden={this.state.validation.password !== false}>비밀번호는 6자 이상 16자 이하의 영문 대소문자(반드시 포함), 숫자(반드시 포함) 및 특수문자로 입력해주세요</Style.ErrorMessage>
              </Form.Field>
              <Form.Field>
                <Style.InputField type="password" label="비밀번호 확인" placeholder="비밀번호 확인" value={this.state.passwordConfirm} onChange={this.handlePasswordConfirmChange} error={this.state.password !== this.state.passwordConfirm} />
                <Style.ErrorMessage hidden={this.state.password === this.state.passwordConfirm}>비밀번호가 일치하지 않습니다. 다시 확인해주시기 바랍니다</Style.ErrorMessage>
              </Form.Field>
              <Form.Field>
                <Style.InputField spellCheck={false} type="text" label="이름" placeholder="이름 (실명)" value={this.state.name} onChange={this.handleNameChange} error={this.state.validation.name === false} />
                <Style.ErrorMessage hidden={this.state.validation.name !== false}>한글 및 영문 대소문자로 입력해주세요 (공백 포함)</Style.ErrorMessage>
              </Form.Field>
              <Style.SignUpButton onClick={this.handleSubmit} disabled={signUpDisabled}>가입하기</Style.SignUpButton>
              <Style.GoBackButton onClick={this.props.onMoveToTerms} >뒤로가기</Style.GoBackButton>
            </Form>
          </Style.FormContainer>
          <Style.FlexContainer>
            <Style.Line />
            또는
            <Style.Line />
          </Style.FlexContainer>
          <Style.Footer>
            <Style.SocialLoginIcon src={FacebookIcon} onClick={this.continueFacebook} title="페이스북 아이디로 계속하기" />
            <Style.SocialLoginIcon src={GoogleIcon} id="googleBtn" title="구글 아이디로 계속하기" />
            <Style.SocialLoginIcon src={KakaoIcon} onClick={this.continueKakao} title="카카오 아이디로 계속하기" />
          </Style.Footer>
        </Style.SignUpFormContainer>
      </Style.FlexFormContainer>
    );
  }
}

SignUpForm.propTypes = {
  signUpErrorMessage: PropTypes.string,
  onSignUpRequest: PropTypes.func.isRequired,
  invitedName: PropTypes.string,
  onSocialUserContinue: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  onMoveToTerms: PropTypes.func.isRequired,
};

export default SignUpForm;
