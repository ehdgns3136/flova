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
  padding: 0;
  font-size: 18px !important;
  color: #666;
  cursor: pointer;

  body.touchDevice &:active {
    opacity: 1;
  }

  body.noTouchDevice &:hover {
    opacity: 1;
  }
`;
