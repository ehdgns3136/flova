import styled from 'styled-components';
import { Link } from 'react-router';
import { Form, Icon } from 'semantic-ui-react';

export const FlexFormContainer = styled.div`
  display: flex;
  height: 100vh;
  min-height: 630px;
  align-items: center;
`;

export const SignUpFormContainer = styled.div`
  width: 336px;
  height: auto;
  background: white;
  border-radius: 6px;
  padding: 15px 25px 20px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  z-index: 1;
  font-weight: 500 !important;
  position: relative;
  
  @media (max-width: 640px) {
    width: 100vw;
    border-radius: 0px;
    padding: 0px 35px 0px 35px;
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #696969;
  margin-bottom: ${(props) => props.marginEnable ? '40px' : '0px'};
`;

export const FormContainer = styled.div`
  width: 100%;
`;

export const WarningIcon = styled(Icon)`
  font-size: 18px !important;
`;

export const ErrorMessage = styled.p`
  display: ${(props) => (props.hidden ? 'none' : 'inherit')};
  font-size: 12px;
  font-weight: 500;
  color: #ff8080;
  margin-bottom: -5px !important;
`;

export const FormCheckBoxWrapper = styled.div`
  display: flex;
  margin: 13px 0px 13px 0px !important
`;

export const CheckBox = styled(Form.Checkbox)`
  margin-right: 7px !important;
  focus: none;
`;

export const SignUpButton = styled.button`
  cursor: ${(props) => props.disabled ? '' : 'pointer'};
  padding: 0.7em 1em 0.7em 1em;
  border-radius: 4px;
  color: white;
  background-color: ${(props) => props.disabled ? props.theme.primaryLighterColor : props.theme.primaryColor};
  
  font-weight: 600;
  outline-width: 0;
  width: 100%;
  height: 45px;
  font-size: 16px;
  
  body.noTouchDevice &:hover {
    background-color: ${(props) => props.disabled ? props.theme.primaryLighterColor : props.theme.primaryDarkerColor};
  }
`;

export const GoBackButton = styled.button`
  cursor: pointer;
  padding: 0.7em 1em 0.7em 1em;
  border-radius: 4px;
  color: white;
  background-color: ${(props) => props.theme.greyLighterFontColor};
  font-weight: 600;
  outline-width: 0;
  width: 100% !important;
  height: 45px;
  margin-top: 10px;
  font-size: 16px;
  text-decoration: none;
  
  body.noTouchDevice &:hover {
      background-color: ${(props) => props.theme.greyColor};
      color: white;
      text-decoration: none;
  }
`;

export const InputField = styled.input`
  height: 44px;
  border-radius: 4px !important;
  background: ${(props) => (props.error) ? '#FFF6F6 !important' : ''};
  color: ${(props) => (props.error) ? '#9F3A38 !important' : ''};
  border-color: ${(props) => (props.error) ? '#E0B4B4 !important' : '#afafaf !important'};
`;

export const FlexContainer = styled.div`
  margin: 24px 0px 10px 0px;
  display: flex;
  justify-content: space-between;
  padding: 0px 0px 0px 0px;
  width: 104%;
  color: #b2b2b2;
`;

export const Line = styled.div`
  width: 37%;
  height: 2px;
  border: solid 1px #b2b2b2;
  margin: 9px 10px 0px 10px;
`;

export const Footer = styled.p`
  margin: 0px;
  display: flex;
  justify-content: space-between;
  width: 87%;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  flex-grow: 1.2;
  align-items: center;
  
`;

export const SocialLoginIcon = styled.img `
  width: 60px;
  height: 60px;
  border-radius: 0%;
  object-fit: cover;
  cursor: pointer;
  
  body.noTouchDevice &:hover {
    filter: brightness(.92);
  }
`;

export const ActionDescription = styled.p`
  font-size: 0.9rem;
  text-align: center;
  margin: 10px 0px 0px 0px;
  @media (max-width: 640px) {
    margin-top: 16px;
  }
  color: #4e4e4e;
`;

export const StyledA = styled.a`
  cursor: pointer;
  color: #65B2ED;
  font-weight: 500;
  body.noTouchDevice &:hover {
    color: #4e8ab7;
  }
`;

export const CustomLink = styled(Link)`
  margin-left: ${(props) => props.left ? '5px' : '0px'};
  margin-right: ${(props) => props.right ? '5px' : '0px'};
  color: #65B2ED;
  cursor: pointer;
  text-decoration: none;
  
  body.noTouchDevice &:hover {
    color: #4889ba !important;
  }
  
  body.touchDevice &:hover {
    color: #65B2ED !important;
  }
`;
