import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router';

export const AnswerWriterInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Writer = styled.div`
  
`;

export const RightIcon = styled(Icon) `
  float: right;
  font-size: 18px !important;
  line-height: 38px !important;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, .1);
`;

export const WriterInfo = styled.div`
  font-weight: 300;
  text-decoration: none;
  margin-bottom: 1px;
  line-height: 17px;
`;

export const WriterName = styled(Link)`
  display: inline;
  margin: 0;
  padding: 0;
  cursor: pointer;
  color: black;
  text-decoration: none;
  body.noTouchDevice &:hover {
    color: black;
    text-decoration: underline;
  }
  body.touchDevice &:hover {
    color: black;
    text-decoration: none;
  }
`;

export const Description = styled.div`
  color: rgba(0,0,0,.4);
  font-size: 11px;
`;
