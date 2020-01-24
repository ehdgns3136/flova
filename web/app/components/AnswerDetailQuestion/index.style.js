/**
 * Created by donghoon on 17. 7. 4.
 */
import styled from 'styled-components';
import { Link } from 'react-router';

export const CardMeta = styled.div`
  font-size: 1em;
  color: rgba(0,0,0,.4);
  background-repeat: no-repeat;
  box-sizing: inherit;
  line-height: 1.4285em;
  cursor: default;
  margin-bottom: 18px;
  
  @media (max-width: 640px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const TopicHeader = styled(Link)`
  padding: 3px 10px 3px 11px;
  background-color: #ececec;
  border-radius: 100px
  font-size: 14px;
  font-weight: bold;
  color: #666666;
  margin-right: 13px;
  
  cursor: pointer;
  text-decoration: none;
  
  body.noTouchDevice &:hover {
    color: rgba(0,0,0,.45);
  }
  
  body.touchDevice &:hover {
    color: rgba(0,0,0,.45);
    text-decoration: none;
  }
`;

export const CardHeaderWrapper = styled(Link)`
  font-weight: 700;
  margin-top: -.21425em;
  line-height: 1.2857em;
  display: block;
  background-repeat: no-repeat;
  box-sizing: inherit;
  margin-bottom: 15px;
  color: ${(props) => props.theme.titleColor};
  text-decoration: none;
  
  @media (min-width: 640px) {
    font-size: 26px;
  }
  
  @media (max-width: 640px) {
    padding-left: 15px;
    padding-right: 15px;
    font-size: 1.5em;
  }
  
  body.noTouchDevice &:hover {
    color: ${(props) => props.theme.titleColor} !important;
    text-decoration: underline;
  }
`;

export const CardDescription = styled.div`
  clear: both;
  color: rgba(0,0,0,.68);
  background-repeat: no-repeat;
  box-sizing: inherit;
  font-size: 1em;
  line-height: 1.4285em;
  cursor: default;
  
  @media (max-width: 640px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;
