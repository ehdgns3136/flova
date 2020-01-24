/**
 * Created by donghoon on 18. 2. 9.
 */
import styled from 'styled-components';
import { Link } from 'react-router';

export const Topics = styled.div`
  flex-shrink: 1;
  margin-right: 3px;
`;
// white-space: nowrap;
// overflow: hidden;
// text-overflow: ellipsis;

export const Topic = styled(Link) `
  text-decoration: none;
  color: ${(props) => props.theme.greyFontColor} !important;
  body.touchDevice &:hover {
    color: ${(props) => props.theme.greyFontColor} !important;
  }
  body.noTouchDevice &:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.greyFontColor} !important;
  }
`;

export const MarginMiddot = styled.span`
  margin: 0px 2px;
`;

export const AdditionalInfo = styled.div`
  display: flex;
  justify-content: ${(props) => props.left ? 'left' : 'space-between'};
  border-bottom: 1px solid #eeeeee;
  padding: 9px 17px 9px 17px;
  @media (max-width: 640px) {
    padding: 9px 17px 9px 17px;
  }
  margin: 0px -17px;
  font-size:13px;
  color: #929292;
  align-items: center;
`;

export const ActivityProfile = styled.img`
  height: 22px;
  width: 22px;
  border-radius: 11px;
  margin-right: 8px;
`;

export const Activity = styled.div`
  font-size: 13px;
`;
// white-space: nowrap;
// overflow: hidden;
// text-overflow: ellipsis;

export const ActivityDescription = styled(Link) `
  display: inline;
  margin: 0;
  padding: 0;
  cursor: pointer;
  font-weight: bold;
  color: ${(props) => props.theme.greyFontColor} !important;
  text-decoration: none;
  
  body.touchDevice &:hover {
    color: ${(props) => props.theme.greyFontColor} !important;
  }
  body.noTouchDevice &:hover {
    color: ${(props) => props.theme.greyFontColor} !important;
    text-decoration: underline;
  }
`;

