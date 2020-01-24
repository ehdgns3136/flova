/**
 * Created by donghoon on 17. 11. 14.
 */
import styled from 'styled-components';

export const Wrapper = styled.div`
  color: ${(props) => props.theme.paragraphColor};
`;

export const Item = styled.button`
  padding: 0;
  height: 55px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;


export const Button = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  cursor: pointer;
  padding: 0px;
  height: 17px;
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.enable ? '#2BC3A3' : '#666'};

  body.noTouchDevice &:hover .underline{
    text-decoration: underline;
  }
`;

export const IconButton = styled.button`
  display: block;
  padding: 0;
  color: ${(props) => props.theme.greyFontColor};
  font-size: 18px;
  color: #666;
  padding-top: 2px;
  margin-right: 2.5px;

  i {
    margin-right: 10px;
  }
`;


export const FacebookIcon = styled.i`
  color: ${(props) => props.theme.facebookColor};
  padding-bottom: 3px;
  margin-right: 13px;
`;

export const KakaoIcon = styled.i`
  color: ${(props) => props.theme.kakaoBrown};
  padding-bottom: 5px;
  margin-right: 11px;
`;
