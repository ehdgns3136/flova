/**
*
* PasswordResetForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './index.style';

class PasswordResetForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        {
          (this.props.mobile) ? (
            <div>
              <Style.InputContainer mobile={this.props.mobile}>
                <Style.MobileCustomInput placeholder="기존 비밀번호" autoFocus type="password" />
                <Style.MobileCustomInput placeholder="새로운 비밀번호" type="password" />
                <Style.MobileCustomInput placeholder="새로운 비밀번호 확인" type="password" />
              </Style.InputContainer>
              <Style.MobileCustomButton type="submit">
                변경 완료
              </Style.MobileCustomButton>
            </div>
          ) : (
            <div>
              <Style.Container>
                <Style.Header>
                  비밀번호 수정
                </Style.Header>
                <Style.Divider />
                <Style.InputContainer mobile={this.props.mobile}>
                  <Style.InputElement>
                    기존 비밀번호
                    <Style.CustomInput autoFocus type="password" />
                  </Style.InputElement>
                  <Style.InputElement>
                    새로운 비밀번호
                    <Style.CustomInput type="password" />
                  </Style.InputElement>
                  <Style.InputElement>
                    새로운 비밀번호 확인
                    <Style.CustomInput type="password" />
                  </Style.InputElement>
                </Style.InputContainer>
                <Style.ButtonContainer>
                  <Style.CustomButton cancel>
                    취소
                  </Style.CustomButton>
                  <Style.CustomButton type="submit">
                    변경 완료
                  </Style.CustomButton>
                </Style.ButtonContainer>
              </Style.Container>
            </div>
          )
        }
      </div>
    );
  }
}

PasswordResetForm.propTypes = {
  mobile: PropTypes.bool,
};

export default PasswordResetForm;
