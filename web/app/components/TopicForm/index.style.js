import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

export const TopicFormContainer = styled.div`
  width: 648px;
  height: auto;
  background: white;
  border-radius: 6px;
  padding: 20px 40px 18px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  z-index: 1;
  overflow-y: hidden;
  overflow-x: hidden;
  -webkit-transform: translate3d(0,0,0); /** mac safari z-index bugs */
  
  @media (max-width: 640px) {
    width: 100vw;
    height: 100vh;
    border-radius: 0px;
    padding: 40px 20px 18px 20px;
  }
`;

export const Header = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin: 0px 0px 20px 0px;
  color: #303030;
`;

export const NextButton = styled(Button)`
  padding: 0.7em 1em 0.7em 1em !important;
  height: 45px;
  border-radius: 2px !important;
  color: white !important;
  background: #2BC3A3 !important;
  box-shadow: 0 0 0 1.5px #2bc3a3 inset!important
  font-weight: 600 !important;
  font-size: 16px !important;
  transition: all 0.2s ease;
  outline-width: 0;
`;

export const Divider = styled.div`
  margin-left: -5 px;
  margin-bottom: 5px;
  margin-top: -20px;
  width: 578px;
  height: 13px;
  box-shadow: 0px -5px 5px -6px;
`;

export const Explain = styled.div`
  padding: 0px 17px 22px 17px;
  font-size: 15px;
  color: #484848;
  text-align: center;
  line-height: 1.33;
  
  @media (max-width: 640px) {
    padding: 0px 13px 17px 13px;
  }
`;
