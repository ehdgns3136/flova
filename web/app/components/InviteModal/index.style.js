import styled from 'styled-components';
import { Modal } from 'semantic-ui-react';
import { Link } from 'react-router';

export const ModalWrapper = styled(Modal) `
  width: 350px !important;
  position: absolute !important;
  left: 0 !important;
  right: 0 !important;
  margin-left: auto !important;
  margin-right: auto !important;
  padding: 20px 20px 17px 20px !important;
  text-align: center !important;
`;

export const CloseIcon = styled.i`
  position: absolute;
  top: .5rem;
  right: .5rem;
  color: rgba(0,0,0,.87);
  cursor: pointer;
`;

export const Header = styled.div`
  margin-top: 20px;
  font-size: 28px;
  color: ${(props) => props.theme.paragraphColor};
  font-weight: bold;
  line-height: 45px;
  
  span {
    font-family: ${(props) => props.theme.logoFont};
    font-weight: 500;
  }
`;

export const Description = styled.div`
  font-size: 14px !important;
  color: #535353;
  line-height: 20px;
  margin: 10px 0px;
  span {
    font-family: ${(props) => props.theme.logoFont};
    font-weight: 500;
  }
`;

export const NameInput = styled.input`
  background-color: #F2F2F2;
  border: 1px #e2e2e2 solid;
  border-radius: 4px;
  width: 100px;
  height: 30px;
  text-align: center;
`;

export const MakeLinkButton = styled.button`
  width: 100%;
  margin-top: 10px;
  padding: 8px 0px 7px;
  color: white;
  background-color: ${(props) => props.isLoading ? props.theme.primaryDarkerColor : props.theme.primaryColor};
  border-radius: 2px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  trainsition: background-color .1s ease;

  @media (min-width: 640px) {
    &:hover {
      background-color: ${(props) => props.theme.primaryDarkerColor};
    }
  }
  @media (max-width: 640px) {
    &:active {
      background-color: ${(props) => props.theme.primaryDarkerColor};
    }
  }

  &:disabled {
    opacity: 0.5;

    &:hover, &:active {
      background-color: ${(props) => props.theme.primaryColor};
    }
  }
`;

export const SuccessMessage = styled.div`
  margin: 10px 0px 5px;
  display: flex;
  width: 100%;
  padding: 10px 15px;
  border-radius: 1px;
  border: 1px solid ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.primaryColor};
  align-items: center;
  background-color: #F7FFFD;

  @media (max-width: 640px) {
    background-color: transparent;
  }
`;

export const CheckIcon = styled.i`
  font-size: 20px;
  padding-bottom: 5px;
`;

export const SuccessMessageContent = styled.div`
  margin-left: 15px;
  font-size: 12px;
  font-weight: bold;
  line-height: 18px;
  text-align: left;
`;

export const SemiHeader = styled.h2`
  margin: 10px 0px 8px;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.paragraphColor};
`;

export const LinkBox = styled.div`
  text-align: left;
  padding: 8px 10px;
  border-radius: 2px;
  background-color: #FBFBFB;
  border: 1px solid #979797;
  font-size: 8px;
  line-height: 12px;
  word-wrap: break-word;
`;

export const InviteLink = styled(Link) `
  font-size: 10px !important;
  color: #4A90E2 !important;
  word-wrap: break-word;
  line-height: 12px;
`;


export const ButtonContainer = styled.div`
  display: flex;
  margin: 10px 0px 0px;
  justify-content: flex-end;
`;

export const CopyButton = styled.button`
  color: ${(props) => props.theme.primaryColor};
  font-size: 14px;
  padding: 6px 15px 5px;
  border: 1px solid ${(props) => props.theme.primaryColor};
  border-radius: 20px;
  cursor: pointer;
`;

export const MobileAbsolutePage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  background-color: #fbfbfb;
  text-align: center;
`;

export const MobileNavbar = styled.div`
  border-bottom: 1px solid #e2e2e2;
  background-color: white;
  display: flex;
  height: 50px;
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

export const NavbarItem = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0px 10px;
`;


export const NavbarTitle = styled.div`
  margin: 0 auto;
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-content: center;
`;

export const NavbarTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  font-size: 16px;
  font-weight: bold;
`;

export const MobileContent = styled.div`
  padding: 80px 30px 0px;
`;


const getBackgroundColor = (type) => {
  switch (type) {
    case 'copy':
      return '#888888';
    case 'kakao':
      return '#FEE934';
    default:
      return null;
  }
};

const getColor = (type) => {
  switch (type) {
    case 'copy':
      return 'white';
    case 'kakao':
      return '#3B1E1F';
    default:
      return null;
  }
};

const getActiveBackgroundColor = (type) => {
  switch (type) {
    case 'copy':
      return '#555555';
    case 'kakao':
      return '#E0CE38';
    default:
      return null;
  }
};

export const MobileButton = styled.button`
  background-color: ${(props) => getBackgroundColor(props.type)};
  height: 40px;
  width: 100%;
  color: ${(props) => getColor(props.type)};
  font-weight: bold;
  text-align: center;
  margin: 10px 0px 0px;
  padding: 6px 0px 5px;
  border-radius: 3px;

  &:active {
    background-color: ${(props) => getActiveBackgroundColor(props.type)};
  }
`;
