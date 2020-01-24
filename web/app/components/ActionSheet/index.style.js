import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  z-index: 100001;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const slidein = keyframes`
  from { 
   bottom: -300px; 
  }
  to { 
    bottom: 0px;
  }
`;

export const ActionBox = styled.div`
  animation: ${slidein} 100ms ease-out 0s 1 normal forwards;
  position: fixed;
  opacity: 1;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
`;

export const ActionNavbar = styled.div`
  border-bottom: 1px solid #e2e2e2;
  background-color: white;
  display: flex;
  height: 50px;
`;

export const NavbarItem = styled.button`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0px 10px;
`;

const getPosition = (position) => {
  switch (position) {
    case 'left':
      return 'flex-start';
    case 'right':
      return 'flex-end';
    case 'center':
      return 'center';
    default:
      return 'flex-start';
  }
};

export const NavbarItemContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  width: 50px;
  justify-content: ${(props) => getPosition(props.position)};
`;

export const NavbarTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  font-size: 14px;
  font-weight: bold;
`;

export const Unstyled = styled.div`
  padding: 0;
  color: inherit;
`;
