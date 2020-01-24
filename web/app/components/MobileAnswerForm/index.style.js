/**
 * Created by donghoon on 17. 8. 21.
 */
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  padding: 0px 14px;
`;

export const StyledUsername = styled.div`
  font-size: 14px;
  color: #000000;
  margin-bottom: 16px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: start;
  line-height: 20px;
  font-size: 20px;
  margin-bottom: 22px;
`;

export const TitleQ = styled.span`
  font-weight: bold;
  margin: -2px 4px 0px 0px;
`;

export const Title = styled.div`
  font-weight: bold;
`;

export const UserAvatar = styled.img`
  width: 40px !important;
  height: 40px !important;
  border-radius: 20px !important;
  overflow: hidden;
  object-fit: cover;
  margin-right: 15px;
  border: 1px solid rgba(0, 0, 0, .1);
`;

export const SubmitButton = styled.button`
  width: 90px;
  border: 1px solid ${(props) => props.cancel ? '#b0b0b0' : '#2bc3a3'};
  color: ${(props) => props.cancel ? '#b0b0b0' : '#2bc3a3'};
  height: 26px;
  cursor: pointer;
  border-radius: 15px;
  
  body.noTouchDevice &:hover {
    background: ${(props) => props.cancel ? 'rgba(0,0,0,0.02)' : 'rgba(43,195,163,0.05)'};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 17px 14px 0px 0px;
`;
