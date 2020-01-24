/**
 *
 * EmailCheckForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';


import { Grid, Form, Dimmer, Loader } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import BigLogo from 'components/BigLogo';
import { validateEmail } from 'utils/validation';
import * as Style from './index.style';

class EmailCheckForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailExist: null,
      emailValidation: true,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      emailExist: nextProps.emailExist,
    });
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
      emailExist: null,
      emailValidation: validateEmail(event.target.value),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.emailValidation !== false && this.state.email !== '') {
      this.props.onCheckEmailExistClick(this.state.email);
    }
  }

  render() {
    return (
      <Style.FlexContainer>
        <Style.EmailCheckFormContainer>
          <Dimmer active={this.props.isLoading} inverted>
            <Loader size="large" />
          </Dimmer>
          <BigLogo />
          <Style.Description>
            이메일 주소를 입력해주세요.
            <br />
            비밀번호 재설정 방법을 이메일로 보내드립니다.
          </Style.Description>
          <Style.MiddleContainer>
            <Grid container>
              <Grid.Row>
                <Grid.Column>
                  <Form noValidate onSubmit={this.handleSubmit}>
                    <Form.Field>
                      <Style.InputField
                        type="email"
                        placeholder="이메일"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        error={this.state.emailValidation === false || this.state.emailExist === false}
                      />
                      <Style.ErrorMessage hidden={this.state.emailValidation !== false}>유효한 이메일 주소를 입력해주세요</Style.ErrorMessage>
                      <Style.ErrorMessage hidden={this.state.emailExist !== false}>존재하지 않는 이메일입니다.</Style.ErrorMessage>
                      <Style.SuccessMessage hidden={this.state.emailExist !== true}>이메일 전송이 완료되었습니다. 메일함을 확인해주세요.</Style.SuccessMessage>
                    </Form.Field>
                    <div>
                      <Style.SendButton disabled={this.state.emailValidation === false || this.state.email === ''} type="submit" >이메일 전송</Style.SendButton>
                    </div>
                    <div>
                      <Style.GoBackButton onClick={browserHistory.goBack} grey>뒤로가기</Style.GoBackButton>
                    </div>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Style.MiddleContainer>
        </Style.EmailCheckFormContainer>
      </Style.FlexContainer>
    );
  }
}

EmailCheckForm.propTypes = {
  onCheckEmailExistClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default EmailCheckForm;
