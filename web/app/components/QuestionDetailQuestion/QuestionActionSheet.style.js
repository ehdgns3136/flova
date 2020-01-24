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

  i {
    line-height: 16px;
  }
`;

export const IconButton = styled.button `
  padding: 0;
  font-size: 19px;
  color: #666;
  cursor: pointer;
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
