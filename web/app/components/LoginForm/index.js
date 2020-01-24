/**
*
* LoginForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

import { Grid, Form, Loader, Dimmer } from 'semantic-ui-react';
import { makeHandleFieldChange } from 'utils/validation';

import BigLogo from 'components/BigLogo';

import * as Style from './index.style';
import KakaoIcon from '../../assets/kakao.png';
import FacebookIcon from '../../assets/facebook.png';
import GoogleIcon from '../../assets/google.png';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fbStatusLoaded: false,
      email: '',
      password: '',
      validation: {
        email: null,
        password: null,
      },
    };

    this.handleEmailChange = makeHandleFieldChange('email').bind(this);
    this.handlePasswordChange = makeHandleFieldChange('password').bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.continueFacebook = this.continueFacebook.bind(this);
    this.continueKakao = this.continueKakao.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
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
          this.props.onCheckSocialUserExist(token, 'google');
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.onLoginRequest(this.state.email, this.state.password);
  }

  continueFacebook() {
    if (this.state.fbStatusLoaded) {
      const status = this.fbLoginStatusResponse.status;
      if (status === 'not_authorized' || status === 'unknown') {
        FB.login((response) => {
          this.props.onCheckSocialUserExist(response.authResponse.accessToken, 'facebook');
        }, { scope: 'user_friends' });
      }
      if (status === 'connected') {
        this.props.onCheckSocialUserExist(this.fbLoginStatusResponse.authResponse.accessToken, 'facebook');
      }
    } else {
      console.error('FB Status not loaded!');
    }
  }

  continueKakao() {
    Kakao.Auth.login({
      success: (authObj) => {
        this.props.onCheckSocialUserExist(authObj.access_token, 'kakao');
      },
      fail: (err) => {
        console.log(err);
      },
    });
  }

  onSignUp() {
    this.props.emptyAccessToken();
    this.props.onMoveToTerms();
  }

  render() {
    return (
      <Style.FlexContainer>
        <Style.LoginFormContainer>
          <Style.PaddingContainer>
            <Dimmer active={this.props.isLoading} inverted>
              <Loader />
            </Dimmer>
            <BigLogo />
            <Style.Description>
              세상을 이해하는 더 나은 방법,
              <br />
              당신을 위한 소셜 QnA 서비스
            </Style.Description>
            <Style.MiddleContainer>
              <Grid container>
                <Grid.Row>
                  <Grid.Column>
                    <Form noValidate onSubmit={this.handleSubmit}>
                      <Form.Field>
                        <Style.InputField spellCheck="false" type="email" value={this.state.email} placeholder="이메일" onChange={this.handleEmailChange} />
                      </Form.Field>
                      <Form.Field>
                        <Style.InputField spellCheck="false" type="password" value={this.state.password} placeholder="비밀번호" onChange={this.handlePasswordChange} />
                      </Form.Field>
                      <Style.LoginButton type="submit">로그인</Style.LoginButton>
                      <Style.ErrorMessage hidden={!this.props.loginError}>이메일과 비밀번호를 다시 확인해주시기 바랍니다</Style.ErrorMessage>
                    </Form>
                    <Style.ActionDescription>
                      계정이 없으시다면, <Style.StyledA to="/signup" onClick={this.onSignUp} >회원가입</Style.StyledA>
                      <br />
                      비밀번호를 잊어버리셨다면, <Style.StyledA to="/email_check">비밀번호 재설정</Style.StyledA>
                    </Style.ActionDescription>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Style.MiddleContainer>
          </Style.PaddingContainer>
          <MediaQuery minWidth={640}>
            <Style.Footer>
              <Style.SocialLoginIcon src={FacebookIcon} onClick={this.continueFacebook} title="페이스북 아이디로 계속하기" />
              <Style.SocialLoginIcon src={GoogleIcon} id="googleBtn" title="구글 아이디로 계속하기" />
              <Style.SocialLoginIcon src={KakaoIcon} onClick={this.continueKakao} title="카카오 아이디로 계속하기" />
            </Style.Footer>
            <Style.Contact>
              <div>
                궁금하신 사항이 있으신가요?
              </div>
              <div>
                <Style.CustomATag href="mailto:info@flova.kr">
                  이메일
                </Style.CustomATag>
                /
                <Style.CustomATag target="_blank" href="http://pf.kakao.com/_dFxbHxl">
                  플러스 친구
                </Style.CustomATag>
                /
                <Style.CustomATag target="_blank" href="https://www.facebook.com/flova.kr">
                  페이스북
                </Style.CustomATag>
              </div>
            </Style.Contact>
          </MediaQuery>
        </Style.LoginFormContainer>
        <MediaQuery maxWidth={640}>
          <Style.Footer>
            <Style.SocialLoginIcon src={FacebookIcon} onClick={this.continueFacebook} title="페이스북 아이디로 계속하기" />
            <Style.SocialLoginIcon src={GoogleIcon} id="googleBtn" title="구글 아이디로 계속하기" />
            <Style.SocialLoginIcon src={KakaoIcon} onClick={this.continueKakao} title="카카오 아이디로 계속하기" />
          </Style.Footer>
        </MediaQuery>
        <MediaQuery maxWidth={640}>
          <Style.Contact>
            <div>
              궁금하신 사항이 있으신가요?
            </div>
            <div>
              <Style.CustomATag href="mailto:info@flova.kr">
                이메일
              </Style.CustomATag>
              /
              <Style.CustomATag target="_blank" href="http://pf.kakao.com/_dFxbHxl">
                플러스 친구
              </Style.CustomATag>
              /
              <Style.CustomATag target="_blank" href="https://www.facebook.com/flova.kr">
                페이스북
              </Style.CustomATag>
            </div>
          </Style.Contact>
        </MediaQuery>
      </Style.FlexContainer>
    );
  }
}

LoginForm.propTypes = {
  loginError: PropTypes.bool.isRequired,
  onLoginRequest: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onMoveToTerms: PropTypes.bool.isRequired,
  onCheckSocialUserExist: PropTypes.func.isRequired,
  emptyAccessToken: PropTypes.func.isRequired,
};

export default LoginForm;
