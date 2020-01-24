import styled from 'styled-components';
import { Icon, Divider } from 'semantic-ui-react';

export const AnswerNum = styled.div`
  margin: 10px 0px 10px 0px;
  font-size: 15px;
  font-weight: bold;
  color: #000000;
  
  @media (max-width: 640px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const GreyCenteredDiv = styled.div`
  padding: 50px 0px 150px 0px;
  text-align: center;
  color: grey;
  line-height: 20px;
`;

export const StyledIcon = styled(Icon) `
  margin-bottom: 15px !important;
`;

export const BoldSpan = styled.span`
  font-weight: bold;
`;

export const AnswerNumDivider = styled(Divider) `
  margin-bottom: 25px !important;
`;

export const AnswerDivider = styled(Divider) `
  opacity: 0.5;
`;
