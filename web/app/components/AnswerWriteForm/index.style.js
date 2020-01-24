/**
 * Created by donghoon on 17. 8. 21.
 */
import styled from 'styled-components';

export const WriterInfoContainer = styled.div`
  padding: 12px 15px;
  border-top: 1px solid #D7D7D7;
  border-right: 1px solid #D7D7D7;
  border-left: 1px solid #D7D7D7;
`;

export const ActionContainer = styled.div`
  z-index: 1;
  margin-top: -1px;
  padding: 0px 14px 14px 14px;
  border-top: 1px solid white;
  border-right: 1px solid #D7D7D7;
  border-left: 1px solid #D7D7D7;
  border-bottom: 1px solid #D7D7D7;
  display: flex;
  justify-content: flex-end;
`;

export const Action = styled.button`
  border: 1px solid ${(props) => (props.desaturateColor) ? '#B0B0B0' : '#2BC3A3'};
  width: 90px;
  height: 28px;
  margin-left: 10px;
  border-radius: 14px;
  color: #737373;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  font-family: ${(props) => props.theme.primaryFont};
  
  body.noTouchDevice &:hover {
    border: 1px solid ${(props) => (props.desaturateColor) ? '#bfbfbf' : '#43d6b6'};
    color: #8c8c8c;
  }
`;
