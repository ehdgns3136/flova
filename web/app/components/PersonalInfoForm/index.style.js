import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

export const PersonalInfoFormContainer = styled.div`
  min-width: 400px;
  height: auto;
  background: white;
  border-radius: 6px;
  padding: 27px 28px 17px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  z-index: 1;
  
  @media (max-width: 640px) {
    width: 100vw;
    min-width: 300px;
    height: auto;
    min-height: 100vh;
    border-radius: 0px;
    padding: 20px;
  }
`;

export const FormHeader = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin: 0px 0px 23px 0px;
  color: #303030;
`;

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileElement = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

export const ElementHeader = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.theme.primaryColor};
  margin-bottom: 10px;
`;

export const CustomInput = styled.input`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  border: none;
  color: #303030;
  margin-top: -1px;
`;

export const CustomText = styled.div`
  font-size: 16px;
  font-weight: 500;
  border: none;
  color: ${(props) => props.grey ? '#8e8e8e' : '#303030'};
`;

export const FlexWrapper = styled.div`
  display: flex;
  color: #919191;
`;

export const CameraButton = styled.div`
  position: relative;
  cursor: pointer;
  margin-bottom: 20px;
  &:focus {
    outline: none;
  }
`;

export const ProfileImage = styled.img`
  border: 2px solid white;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, .1);
`;

export const CameraIconWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 4px;
  right: 8px;
  bottom: 3px;
  width: 25px;
  height: 25px;
  background-color: #d8d8d8;
  border-radius: 50%;
`;

export const CameraIcon = styled(Icon)`
  z-index: 100;
  color: white;
  font-size: 15px !important;
`;

export const StyleButton = styled.button`
  cursor: pointer;
  padding: 0.7em 1em 0.7em 1em;
  border-radius: 4px;
  color: white;
  background-color: #2BC3A3;
  font-weight: 600;
  transition: all 0.2s ease;
  outline-width: 0;
  width: 100%;
  height: 45px;
  margin-top: 10px;
  font-size: 16px;
`;

export const CredentialFormContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

export const PencilIcon = styled(Icon)`
  margin-left: 4px !important;
  margin-top: 1px !important;
  cursor: pointer;
`;

export const Divider = styled.div`
  height: 1px;
  border-top: 1px solid rgba(34, 36, 38, 0.15)
  margin-bottom: 10px;
`;

export const Test = styled.div`
  background: red;
  height: 200px;
`;
