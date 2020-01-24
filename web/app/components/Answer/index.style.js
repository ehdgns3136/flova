/**
 * Created by donghoon on 17. 7. 6.
 */
/**
 * Created by donghoon on 17. 7. 5.
 */
import React from 'react';
import { Card, Statistic, Image, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router';

export const StatisticValueWrapper = styled(Statistic.Value) `
  margin-bottom: 20px;
`;

export const Profile = styled(Image) `
  margin-top: 5px;
`;

export const CardHeaderWrapper = styled.div`
  font-weight: 700;
  font-size: 1.28571429em;
  margin-top: -.21425em;
  line-height: 1.2857em;
  display: block;
  color: rgba(0,0,0,.85);
  background-repeat: no-repeat;
  box-sizing: inherit;
  margin-bottom: 15px;
`;

export const CardContentWrapper = styled(Card.Content) `
  margin-up: 10px;
`;

export const CardMeta = styled.div`
  font-size: 1em;
  color: rgba(0,0,0,.4);
  background-repeat: no-repeat;
  box-sizing: inherit;
  line-height: 1.4285em;
  cursor: default;
  margin-bottom: 10px;
`;

export const CardHeader = styled.div`
    font-weight: 700;
    font-size: 1.28571429em;
    margin-top: -.21425em;
    line-height: 1.2857em;
    display: block;
    color: rgba(0,0,0,.85);
    background-repeat: no-repeat;
    box-sizing: inherit;
`;

export const CardDescription = styled.div`
    clear: both;
    color: rgba(0,0,0,.68);
    background-repeat: no-repeat;
    box-sizing: inherit;
    font-size: 1em;
    line-height: 1.4285em;
    cursor: default;
    margin-bottom: 30px;
`;

export const CardContentExtra = styled.div`
  display: flex;
  align-items: center;
  padding: .3em 0 1em;
  justify-content: space-between;
`;

export const LeftButtons = styled.div`
  display: flex;
  justify-content: flex-start;
`;


export const FlexRight = styled.div`
  font-size: 16px !important;
  margin-left: auto;
`;

export const AddUser = styled.a`
    float: right;
    margin-left: 10px;
    margin-top: 10px;
`;

export const HeightDiv = styled.div`
  height: 50px;
`;

export const AnswerWrapper = styled.div`
  margin: 10px 0px 10px 0px;
  padding: 5px 0px 5px 0px;
`;

export const MarginRightButton = styled.button`
  font-family: ${(props) => props.theme.primaryFont};
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 0px;
  margin-right: 25px;
  height: 20px;
  font-size: 14px;
  color: ${(props) => props.enable ? '#2BC3A3' : '#666'};

  @media(max-width: 640px) {
    margin-right: 20px;
  }
  
  body.noTouchDevice &:hover .underline{
    text-decoration: underline;
  }
  
  i {
    font-size: 18px;
  }
`;

export const CommentButton = styled.button`
  display: flex;
  cursor: pointer;
  margin-right: 10px;
  height: 17px;
  color: ${(props) => props.enable ? '#2BC3A3' : 'rgba(0,0,0,.6)'};

  body.noTouchDevice &:hover .underline{
    text-decoration: underline;
  }
`;

export const SmallNum = styled.div`
  font-family: ${(props) => props.theme.primaryFont};
  display: flex;
  margin-left: 5px;
  border-radius: 4px;
  padding: 2px 5px;
  margin-top: 3px;
  height: 17px;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.enable ? '#2BC3A3' : '#777'};
  background: ${(props) => props.enable ? '#d7f2ec' : '#e0e0e0'};
`;

export const BlockA = styled.a`
  font-family: ${(props) => props.theme.primaryFont};
  font-size: 12px;
  font-weight: 500;
  display: block;
  white-space: nowrap;
  height: 25px;
  cursor: pointer;
  padding-left: 13px;
  padding-top: 2px;
  padding-right: 13px;
  z-index: 2000;
  body.noTouchDevice &:hover {
    background: #2cb296;
    color: white;
  }
`;

export const TealIcon = styled(Icon) `
  color: ${(props) => props.clicked ? '#25a78b' : 'rgba(0, 0, 0, 0.6)'};
`;

export const RightIconButton = styled.button`
  padding: 0;
  font-size: 18px !important;
  margin-left: auto !important;
  color: #666;
  cursor: pointer;
`;

export const FlexDiv = styled.div`
  display: flex;
`;

export const FlexRightA = styled.a`
  margin-left: auto;
  color: #25a78b;
`;

export const AnswerContent = styled.div`
  margin: 10px 0px;

  @media (max-width: 640px) {
    margin-bottom: 0px;
  }
`;

export const PopupContent = styled.div`
  padding: 5.5px 0px;
`;

export const MobileStats = styled.div`
  display: flex;
  font-size: 13px;
  color: ${(props) => props.theme.greyLighterFontColor};
  margin: 7px 0px;
  
  span {
    cursor: pointer;
    margin: 0px 3px;
    body.noTouchDevice &:hover {
      text-decoration: underline;
    }
  }
`;

export const PreventStyleLink = styled(Link)`
  margin-right: 2px;
  text-decoration: none !important;
  color: ${(props) => props.theme.greyLighterFontColor} !important;
`;

export const AnswerExceptComment = styled.div`
  @media (max-width: 640px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;
