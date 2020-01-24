/**
 * Created by donghoon on 17. 7. 28.
 */

import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router';

export const ResultMeta = styled.div`
  margin-top: 4px;
  color: rgba(0,0,0,.6);
  font-size: 0.8em;
  font-weight: 500;
`;

export const ResultHeader = styled.div`
  margin-top: 1px;
  font-weight: 600;
`;

export const ResultIcon = styled(Icon) `
  position: absolute;
  top: 35%;
  right: 10px;
`;

export const ItemContainer = styled(Link) `
  display: block;
  color: black;
  padding: 10px 30px 10px 16px;
  position: relative;
  display: ${(props) => props.flex ? 'flex' : ''};
  cursor: pointer;
  text-decoration: none;
  line-height: 110%;
  
  .icon {
    color: ${(props) => props.hover ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)'};
  }
  
  background: ${(props) => props.hover ? 'rgba(0, 0, 0, 0.08)' : ''};
  color: ${(props) => props.hover ? 'rgba(0, 0, 0, 0.8)' : ''};
  border-bottom: ${(props) => props.underline ? 'solid 1px rgba(0,0,0,0.15)' : ''};
  
  body.noTouchDevice &:hover {
    color: black;
  }
  
  @media (max-width: 1008px) {
    border-bottom: solid 1px rgba(0,0,0,0.15);
  }
`;

export const HighLight = styled.span`
  font-weight: 600;
  color: #2BC3A3;
`;

export const TopicImage = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 8px;
  object-fit: cover;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, .1);
`;

export const ContentContainer = styled.div`
`;
