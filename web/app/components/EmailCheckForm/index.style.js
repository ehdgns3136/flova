import styled from 'styled-components';
import { Dimmer } from 'semantic-ui-react';

export const FlexContainer = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
`;

export const EmailCheckFormContainer = styled.div`
  position: relative;
  width: 340px;
  height: auto;
  background: white;
  border-radius: 6px;
  padding: 15px 10px 20px 10px;
  display: flex;
  flex-direction: column;
  font-weight: 500 !important;
  align-items: center;
  color: black;
  z-index: 1;
  
  @media (max-width: 640px) {
    width: 100vw;
    border-radius: 0px;
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  text-align: center;
`;

export const MiddleContainer = styled.div`
  width: 100%;
  margin: 15px 0px 15px 0px;
`;

export const SendButton = styled.button`
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
  margin-top: 10px;
  
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

export const ButtonContainer = styled.div`
  
`;

export const InputField = styled.input`
  height: 45px;
  border-radius: 4px !important;
  background: ${(props) => (props.error) ? '#FFF6F6 !important' : ''};
  color: ${(props) => (props.error) ? '#9F3A38 !important' : ''};
  border-color: ${(props) => (props.error) ? '#E0B4B4 !important' : '#afafaf !important'};
`;

export const ErrorMessage = styled.p`
  display: ${(props) => (props.hidden ? 'none' : 'inherit')};
  font-size: 12px;
  font-weight: 500;
  color: #ff8080;
  margin: 5px 0px -15px 0px !important;
`;

export const SuccessMessage = styled.p`
  display: ${(props) => (props.hidden ? 'none' : 'inherit')};
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.primaryColor}
  margin: 5px 0px -15px 0px !important;
`;
