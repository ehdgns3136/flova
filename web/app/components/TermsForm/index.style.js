import styled from 'styled-components';
import { Link } from 'react-router';
import { Form, Icon } from 'semantic-ui-react';

export const FlexFormContainer = styled.div`
  display: flex;
  height: 100vh;
  min-height: 630px;
  align-items: center;
`;

export const TermsFormContainer = styled.div`
  width: 380px;
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
    padding: 0px 20px 0px 20px;
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
  margin-top: 20px;
`;


export const FormCheckBoxWrapper = styled.div`
  display: flex;
  margin: 13px 0px 13px 0px !important
  cursor: pointer;
`;

export const HoverText = styled.span`
  filter: opacity(0.8);
  -webkit-filter: opacity(0.8);
  color: #444444;
  body.noTouchDevice &:hover {
    filter: opacity(1);
    -webkit-filter: opacity(1);
  }
`;

export const CheckBox = styled(Form.Checkbox)`
  margin: 0px 7px 0px 0px!important;
  focus: none;
`;

export const Necessary = styled.span`
  margin-left: 3px;
  color: ${(props) => props.theme.primaryDarkerColor};
  font-weight: 400;
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

export const ScrollBox = styled.div`
  height: 120px;
  width: 100%;
  background: white;
  overflow-y: scroll;
  border: 1px solid #f0f0f0;
  background: #f7f7f7;
  padding: 10px 15px;
`;

export const BoxTitle = styled.div`
  color: #444444;
  font-size: 15px;
  margin: 0px 0px 5px 5px;
`;

export const CustomLink = styled(Link)`
  margin-left: 5px;
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
