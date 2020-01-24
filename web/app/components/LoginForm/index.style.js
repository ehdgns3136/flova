import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router';

export const FlexContainer = styled.div`
  display: flex;
  height: 100vh;
  min-height: 568px;
  align-items: center;
  z-index: 1;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const LoginFormContainer = styled.div`
  width: 340px;
  height: auto;
  background: white;
  border-radius: 6px;
  font-weight: 500 !important;
  color: black;
  z-index: 1;
  position: relative;
  @media (max-width: 640px) {
    width: 100vw;
    border-radius: 0px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;

export const PaddingContainer = styled.div`
  padding: 20px 10px 0px 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-weight: 500 !important;
  align-items: center;
`;

export const Description = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #696969;
`;

export const MiddleContainer = styled.div`
  width: 100%;
  margin: 15px 0px 15px 0px;
  
  @media (max-width: 640px) {
    margin: 15px 0px 0px 0px;
  }
`;

export const ButtonWrapper = styled(Button)`
  margin: 0px 0px 16px 0px !important;
`;

export const ActionDescription = styled.p`
  font-size: 0.9rem;
  text-align: center;
  margin: 18px 0px 0px 0px;
  color: #4e4e4e;
`;

export const StyledA = styled(Link)`
  cursor: pointer;
  color: #65B2ED;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    color: #4889ba !important;
    text-decoration: none;
  }
`;

export const StyledA2 = styled.a`
  cursor: pointer;
  color: #65B2ED;
  font-weight: 500;
  margin-right: 9px !important;
  &:hover {
    color: #4889ba !important;
  }
`;

export const ErrorMessage = styled.p`
  display: ${(props) => (props.hidden ? 'none' : 'inherit')};
  font-size: 12px;
  font-weight: 300;
  color: #ff8080;
  text-align: center;
`;

export const LoginButton = styled.button`
  cursor: pointer;
  padding: 0.7em 1em 0.7em 1em;
  border-radius: 4px;
  color: white;
  background-color: ${(props) => props.theme.primaryColor};
  font-weight: 600;
  outline-width: 0;
  width: 100%;
  height: 45px;
  font-size: 16px;
  
  body.noTouchDevice &:hover {
      background-color: ${(props) => props.theme.primaryDarkerColor};
  }
`;

export const Footer = styled.p`
  margin: 0px;
  display: flex;
  justify-content: space-between;
  width: 70%;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  flex-grow: 1.2;
  align-items: center;
  
  @media (min-width: 640px) {
    width: 100%;
    padding: 0px 50px;
  }
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

export const InputField = styled.input`
  height: 45px;
  border-radius: 4px !important;
  border: solid 1px #afafaf !important;
`;

export const Contact = styled.div`
  color: #4e4e4e;
  font-size: 0.9rem;
  margin-top: 17px;
  width: 100%;
  height: 73px;
  font-weight: 500;
  line-height: 1.4285em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
  @media (max-width: 640px) {
    margin-top: 0px;
    height: 12vh;
    flex-grow: 0;
  }
`;

export const CustomATag = styled.a`
  cursor: pointer;
  color: #4e4e4e;
  margin: 0px 5px;
  text-decoration: none;
  body.noTouchDevice &:hover {
    color: #4e4e4e !important;
    text-decoration: underline;
  }
  
  body.touchDevice &:hover {
    color: #4e4e4e !important;
    text-decoration: none;
  }
`;
