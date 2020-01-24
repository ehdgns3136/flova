import styled from 'styled-components';


export const MobileSimpleNavbar = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  z-index: 900;
  margin: 0;
  background: white;
  color: black;
  box-shadow: 0px 1px #e6e6e6;
  display: flex;
`;

export const Action = styled.div`
  width: 50px;
  height: 100%;
`;

export const ActionButton = styled.button`
  width: 100%;
  height: 100%;
  font-size: 18px;
  padding-top: 5px;
  cursor: pointer;
`;

export const Title = styled.div`
  flex-grow: 1;
  height: 100%;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.titleColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
