import styled from 'styled-components';
import { Dimmer } from 'semantic-ui-react';

export const IntroPasswordResetFormContainer = styled.div`
  min-height: 162px;
  width: 350px;
  height: auto;
  background: white;
  border-radius: 6px;
  padding: 15px 10px 20px 10px;
  display: flex;
  flex-direction: column;
  font-weight: 600 !important;
  align-items: center;
  color: black;
  z-index: 1;
  @media (max-width: 640px) {
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

export const ResetButton = styled.button`
  cursor: pointer;
  padding: 0.7em 1em 0.7em 1em;
  border-radius: 2px;
  color: white;
  background-color: ${(props) => props.theme.primaryColor};
  font-weight: 600;
  outline-width: 0;
  width: 100%;
  height: 45px;
  font-size: 16px;
  margin-bottom: -12px;
  
  body.noTouchDevice &:hover {
      background-color: ${(props) => props.theme.primaryDarkerColor};
  }
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
  margin-bottom: -10px !important;
`;
