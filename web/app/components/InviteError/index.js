import React from 'react';
import { browserHistory } from 'react-router';
import BigLogo from 'components/BigLogo';
import * as Style from './index.style';


function InviteError() {
  return (
    <Style.Wrapper>
      <BigLogo />
      <Style.Description>
        잘못된 접근입니다.
      </Style.Description>
      <Style.Description>
        이미 초대장을 사용하셨거나, <br />
        초대된 사람이 아닐 수 있습니다.
      </Style.Description>
      <Style.Description>
        이와 같은 문제가 계속 발생할 경우, <br />
        <a href="mailto:info@flova.kr">관리자에게 문의</a>해주세요.
      </Style.Description>
      <Style.GoBackButton onClick={() => browserHistory.goBack()}>
        뒤로 가기
      </Style.GoBackButton>
    </Style.Wrapper>
  );
}

InviteError.propTypes = {

};

export default InviteError;
