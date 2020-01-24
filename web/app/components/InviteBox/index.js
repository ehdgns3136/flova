import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './index.style';


function InviteBox({ onOpenInviteModal }) {
  return (
    <Style.Box>
      <Style.Title>초대하기</Style.Title>
      <Style.Description>같이 즐길 친구를 초대해주세요.</Style.Description>
      <Style.InviteButton onClick={onOpenInviteModal}>
        친구 초대하기
      </Style.InviteButton>
    </Style.Box>
  );
}

InviteBox.propTypes = {
  onOpenInviteModal: PropTypes.func.isRequired,
};

export default InviteBox;
