import React from 'react';
import PropTypes from 'prop-types';
import BigLogo from 'components/BigLogo';
import * as Style from './index.style';


class PleaseInvite extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Style.FlexContainer>
        <Style.Wrapper>
          <BigLogo />
          <Style.Description>
            현재는 가입하려면 <strong>초대장</strong>이 필요합니다.<br />
            오픈 베타를 기다리시거나, <br />
            주위에서 <span>Flova</span> 회원을 찾아보세요!
          </Style.Description>
          <a href="mailto:info@flova.kr">오픈 베타 소식을 미리 받아보세요!</a>
          <Style.GoBackButton onClick={this.props.goBack}>
            뒤로 가기
          </Style.GoBackButton>
        </Style.Wrapper>
      </Style.FlexContainer>
    );
  }
}

PleaseInvite.propTypes = {
  goBack: PropTypes.func.isRequired,
};

export default PleaseInvite;
