/**
*
* WelcomeForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import BigLogo from 'components/BigLogo';
import * as Style from './index.style';


class WelcomeForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { invitedName, inviteKey } = this.props;

    return (
      <Style.FlexContainer>
        <Style.Wrapper>
          <BigLogo />
          <Style.Description>
            <strong>{invitedName}</strong>님 안녕하세요!<br />
            Flova에 초대되신 것을 축하드립니다. <br />
          </Style.Description>
          <Style.Description>
            Flova는 당신이 <strong>관심있는</strong> 분야에서 <br />
            <strong>가치 있는</strong> 지식을 주고받을 수 있는 <br />
            소셜 Q&A 플랫폼입니다.
          </Style.Description>
          <Style.Description>
            지금 Flova의 일원이 되어주세요!
          </Style.Description>
          <Style.MoveToSignUpButton to={{ pathname: '/signup', state: { invitedName, inviteKey } }}>
            지금 바로 시작하기
          </Style.MoveToSignUpButton>
        </Style.Wrapper>
      </Style.FlexContainer>
    );
  }
}

WelcomeForm.propTypes = {
  invitedName: PropTypes.string,
  inviteKey: PropTypes.string,
};

export default WelcomeForm;
