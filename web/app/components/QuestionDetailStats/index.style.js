import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

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
