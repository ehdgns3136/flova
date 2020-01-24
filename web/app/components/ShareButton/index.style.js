/**
 * Created by donghoon on 17. 8. 31.
 */
import styled from 'styled-components';

export const PopupContent = styled.div`
  padding: 5.5px 0px;
`;

export const BlockA = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 12px;
  font-weight: 600;
  display: block;
  white-space: nowrap;
  height: 25px;
  cursor: pointer;
  padding: 2px 12px 4px 12px;
  color: #2BC3A3;
  body.noTouchDevice &:hover {
    background: #2cb296;
    color: white;
  }
`;

export const Button = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  cursor: pointer;
  padding: 0px 0px 0px 0px;
  height: 18px;
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.enable ? '#2BC3A3' : '#666'};

  body.noTouchDevice &:hover .underline{
    text-decoration: underline;
  }
`;
