import styled from 'styled-components';

import { Icon } from 'semantic-ui-react';


export const LinkFormContainer = styled.form`
  width: 190px;
  padding: 8px 10px 8px 10px;
`;

export const Label = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const UrlInput = styled.input`
  width: 100%;
  height: 24px;
  border: 1px solid #CFCFCF;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 12px;
  padding: 0px 4px;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ActionButton = styled.button`
  border: 1px solid ${(props) => (props.desaturateColor) ? '#B0B0B0' : '#2BC3A3'};
  width: 40px;
  height: 20px;
  border-radius: 10px;
  color: #737373;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  font-family: ${(props) => props.theme.primaryFont};
  margin-left: 8px;
  
  body.noTouchDevice &:hover {
    border: 1px solid ${(props) => (props.desaturateColor) ? '#bfbfbf' : '#43d6b6'};
    color: #8c8c8c;
  }
`;

export const Action = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.isHighlight ? '#2BC3A3' : 'black'};
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  margin-right: 6px;
  
  body.noTouchDevice &:hover {
    background-color: #F4F4F4;
  }
`;

export const LinkIcon = styled(Icon)`
  margin: 0px 0px 0px 3px !important;
`;
