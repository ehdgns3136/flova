/**
 * Created by donghoon on 17. 11. 15.
 */
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


export const IconButton = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  cursor: pointer;
  padding: 0px;
  height: 17px;
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.enable ? '#2BC3A3' : '#666666'};

  body.noTouchDevice &:hover .underline{
    text-decoration: underline;
  }
`;
