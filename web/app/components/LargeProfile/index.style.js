import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 3;
  border-radius: 4px;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 1008px) {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
  }
`;

export const PaddingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 870px;
  height: 200px;
  
  @media (max-width: 1008px) {
    width: 100%;
    align-items: initial;
    height: auto;
    padding: 20px 10px 10px 25px;
  }
`;

export const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, .1);
  
  @media (max-width: 1008px) {
    width: 80px;
    height: 80px;
  }
`;

export const NameModifyButton = styled.div`
  cursor: pointer;  
  body.noTouchDevice &:hover {
    color: #444444;
  }
`;

export const ProfileDetailBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const NameInput = styled.input`
  border: 1px solid #e2e2e2;
  box-sizing: border-box;
  background-color: #F8F8F8;
  padding: 3.5px 0px 3.5px 5px;
  margin: 0px 0px 0px -5px;
  width: 300px;
  color: black;
  font-size: 35px;
  font-weight: 700;
  border-radius: 3px;
  color: black;
  margin: 0px;
  padding: 3.5px 0px;
  font-size: 35px;
  font-weight: 700;
`;

export const CancelButton = styled.div`
  font-size: 14px;
  width: 50px;
  text-align: center;
  color: #444444;
  padding: 7px 5px;
  cursor: pointer;
  
  body.noTouchDevice &:hover {
    color: #000000;
    text-decoration: underline;
  }
`;

export const SubmitButton = styled.div`
  font-size: 14px;
  width: 50px;
  text-align: center;
  color: white;
  padding: 7px 5px;
  cursor: pointer;
  background-color: #2bc3a3;
  trainsition: background-color .1s ease;
  border-radius: 3px;
  font-weight: 700;

  body.noTouchDevice &:hover {
    background-color: #00a07f;
  }
`;

export const ModifyButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  
  body.noTouchDevice &:hover {
    button {
      visibility: visible;
    }
  }
`;

export const WebEditToggleButton = styled.button`
  visibility: hidden;
  padding: 3.5px 0px;
  margin-left: 0.5em;
  margin-bottom: 0.4em;
  height: 14px;
  line-height: 14px;
  font-size: 15px;
  color: rgb(153, 153, 153);
  cursor: pointer;

  @media (max-width: 1008px) and (min-width: 640px) {
    visibility: visible;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

export const ProfileDetailInput = styled.input`
  font-size: 16px;
  color:#5e5e5e;
  border: 1px solid #e2e2e2;
  box-sizing: border-box;
  background-color: #F8F8F8;
  padding: 0px 0px 0px 5px;
  margin: 0px 0px 1px 8px;
  width: 400px;
  height: 30px;
  font-weight: 400;
  border-radius: 3px;
  word-break: keep-all;
`;

export const ProfileDetailSubmitButton = styled.div`
  margin-top: 8px;
  margin-left: 8px;
  color: #444444;
  cursor: pointer;
  
  body.noTouchDevice &:hover {
    color: #000000;
  }
`;


export const ErrorMessage = styled.p`
  display: ${(props) => (props.hidden ? 'none' : 'inherit')};
  font-size: 15px !important;
  font-weight: 500 !important;
  color: #ff8080;
  margin-left: 4px !important;
  margin-bottom: 0px !important;
`;

export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 1008px) {
    flex-direction: column;
  }
`;

export const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  
  @media (max-width: 1008px) {
    border-top: 2px solid #eeeeee;
    border-bottom: 2px solid #eeeeee;
  }
`;

export const StatElement = styled.div`
  display: flex;
  margin-top: 20px;
  margin-right: 30px;
  
  font-weight: 500;
  font-size: 15px;
  color: #7c7c7c;
  
  @media (max-width: 1008px) {
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    color: #9f9f9f;
    margin: 20px 5vw 0px 5vw;
  }
`;

export const StatNumber = styled.div`
  font-weight: 500;
  font-size: 15px;
  color: #494949;
  
  margin-left: 8px;
  
  @media (max-width: 1008px) {
    margin-left: 0px;
    color: #303030;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const MobileFlexContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;  
`;

export const HiddenDivider = styled.div`
  height: 18px;
`;

export const FlexItem = styled.div`
  display: flex;
  @media (max-width: 1008px) {
    margin-top: -13px;
  }
  
  @media (min-width: 1008px) {
    align-items: center;
  }
`;

export const ProfileContentContainer = styled.div`
  padding-left: 30px;
`;

export const MobileProfileEdit = styled.div`
  display: ${(props) => props.visible ? 'block' : 'none'};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  background-color: #f2f2f2;
`;

export const MobileEditList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin: 0;

  li {
    padding: 17px 20px;
    border-bottom: 1px solid #e2e2e2;
    background-color: white;
    font-size: 15px;
    font-weight: bold;
  }
  input {
    margin: 0px 20px;
    width: 70%;
    font-weight: medium;
  }

  textarea {
    margin-top: 15px;
    padding: 0;
    width: 100%;
    font-weight: medium;
  }
`;

export const MobileEditButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
`;

export const MobileEditToggleButton = styled.button`
  display: none;
  @media (max-width: 1008px) {
    display: block;
    height: 14px;
    line-height: 14px;
    margin-top: -4px;
    font-size: 16px;
    color: rgb(153, 153, 153);
    cursor: pointer;
  }
`;

export const RelativeDiv = styled.div`
  position: flex;
`;

export const MobileNavbar = styled.div`
  border-bottom: 1px solid #e2e2e2;
  background-color: white;
  display: flex;
  height: 50px;
`;

export const NavbarItem = styled.div`
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
  font-size: 16px;
  font-weight: bold;
`;

export const Name = styled.div`
  color: #333333;
  margin: 0px;
  padding: 3.5px 0px;
  font-size: 21px;
  font-weight: bold;
  
  @media (max-width: 1008px) {
    font-size: 19px;
  }
`;

export const Description = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #5e5e5e;
  margin: 0px 0px 0px 14px;
  
  @media (max-width: 1008px) {
    margin: 10px 0px 0px 0px;
    font-size: 14px;
    padding-right: 40px;
  }
`;

export const ViewMoreButton = styled.button`
  position: absolute;
  bottom: 0px;
  right: 7px;
  font-size: 17px;
  color: #555555;
`;

export const MobileContainer = styled.div`
  width: 100%;
`;

export const UserFollowButtonWrapper = styled.div`
  @media (max-width: 1008px) {
    margin-right: 10px;
    display: flex;
    align-items: flex-end;
  }
  @media (min-width: 1008px) {
    margin-bottom: 37px;
  }
`;

export const CameraButton = styled.div`
  position: relative;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover .camera_icon {
    visibility: visible;
  }
`;

export const CameraBoxWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  opacity: .7;
  width: 120px;
  height: 30px;
  background-color: black;
  display: flex;
  align-items: flex-end;
  color: white;
  padding: 0px 5px 5px 6px;
  font-size: 13px;
  font-weight: 700;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  visibility: hidden;
`;

export const CameraButtonIcon = styled(Icon)`
  color: white;
  font-size: 15px !important;
  margin-bottom: 1px !important;
`;
