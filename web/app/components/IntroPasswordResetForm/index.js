/**
*
* IntroPasswordResetForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Form, Loader } from 'semantic-ui-react';
import {
  makeHandleFieldChange,
  makeChainedValidateFunc,
  validatePassword,
  makeValidateMinLength,
  makeValidateMaxLength,
  makeValidateMatch,
} from 'utils/validation';
import BigLogo from 'components/BigLogo';
import * as Style from './index.style';

class IntroPasswordResetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      validation: {
        password: null,
        passwordConfirm: null,
      },
    };

    this.handlePasswordChange = makeHandleFieldChange(
      'password',
      makeChainedValidateFunc([validatePassword, makeValidateMinLength(6), makeValidateMaxLength(16)])
    ).bind(this);

    this.handlePasswordConfirmChange = makeHandleFieldChange(
      'passwordConfirm',
      makeValidateMatch('password', this)
    ).bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.validation.password && this.state.validation.passwordConfirm) {
      this.props.onPasswordResetClick(this.state.password, this.props.passwordKey);
    }
  }

  render() {
    return (
      (this.props.validateLoading) ? (
        <Style.IntroPasswordResetFormContainer>
          <Loader active />
        </Style.IntroPasswordResetFormContainer>
      ) : (
        (this.props.validate) ? (
          <Style.IntroPasswordResetFormContainer >
            <BigLogo />
            <Style.Description>
              비밀번호를 재설정 해주세요.
            </Style.Description>
            <Style.MiddleContainer>
              <Grid container>
                <Grid.Row>
                  <Grid.Column>
                    <Form noValidate onSubmit={this.handleSubmit}>
                      <Form.Field>
                        <Style.InputField
                          disabled
                          value={this.props.email}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Style.InputField
                          type="password"
                          placeholder="새 비밀번호"
                          value={this.state.password}
                          onChange={this.handlePasswordChange}
                          error={this.state.validation.password === false}
                        />
                        <Style.ErrorMessage hidden={this.state.validation.password !== false}>비밀번호는 6자 이상 16자 이하의 영문 대소문자(반드시 포함), 숫자(반드시 포함) 및 특수문자로 입력해주세요</Style.ErrorMessage>
                      </Form.Field>
                      <Form.Field>
                        <Style.InputField
                          type="password"
                          placeholder="새 비밀번호 확인"
                          value={this.state.passwordConfirm}
                          onChange={this.handlePasswordConfirmChange}
                          error={this.state.password !== this.state.passwordConfirm}
                        />
                        <Style.ErrorMessage hidden={this.state.password === this.state.passwordConfirm}>비밀번호가 일치하지 않습니다. 다시 확인해주시기 바랍니다</Style.ErrorMessage>
                      </Form.Field>
                      <Style.ResetButton type="submit" >새 비밀번호 설정</Style.ResetButton>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Style.MiddleContainer>
          </Style.IntroPasswordResetFormContainer>
        ) : (
          <Style.IntroPasswordResetFormContainer >
            <BigLogo />
            <Style.Description>
              비밀번호 재설정 링크가 올바르지 않거나 만료되었습니다.
              <br />
              Flova에 새 링크를 요청해주세요.
            </Style.Description>
          </Style.IntroPasswordResetFormContainer>
        )
      )
    );
  }
}

IntroPasswordResetForm.propTypes = {
  email: PropTypes.string.isRequired,
  validate: PropTypes.bool,
  validateLoading: PropTypes.bool,
  onPasswordResetClick: PropTypes.func.isRequired,
  passwordKey: PropTypes.string,
};

export default IntroPasswordResetForm;
