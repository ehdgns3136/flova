import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

export const PaddingTopDiv = styled.div`
  padding-top: 95px;
  @media (max-width: 1008px) {
    padding-top: 65px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  max-width: 600px;
  @media (min-width: 1008px) {
    margin-right: 100px;  
  }
  width: 100%;
  box-sizing: border-box;
`;

export const Footer = styled.footer`
  font-size: 11px;
  text-align: center;
  margin-bottom: 20px;
  line-height: 20px;
  color: grey;
`;

export const QuestionStatContainer = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  color: #000000;
  font-size: 15px;
  font-weight: 500;
`;

export const Divider = styled.div`
  height: 1px;
  border-top: 1px solid rgba(34, 36, 38, 0.15);
  margin: 10px 0px;
`;

export const StatElement = styled.div`
  font-size: 14px;
  color: #727272 !important;
  font-weight: 400;
  margin-bottom: 15px;
`;

export const CustomIcon = styled(Icon)`
  margin-right: 9px !important;
`;
