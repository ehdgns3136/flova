/**
 * Created by donghoon on 17. 7. 4.
 */
import { Card, Statistic, Grid, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import { Link } from 'react-router';

export const StatisticValueWrapper = styled(Statistic.Value) `
  margin-bottom: 20px;
`;

export const GridWrapper = styled(Grid) `
  margin-bottom: 20px;
`;

export const CardHeaderWrapper = styled.div`
  font-weight: 700;
  margin-top: -.21425em;
  line-height: 1.2857em;
  display: block;
  color: ${(props) => props.theme.titleColor};
  background-repeat: no-repeat;
  box-sizing: inherit;
  margin-bottom: 15px;
  @media (min-width: 640px) {
    font-size: 26px;
  }
  
  @media (max-width: 640px) {
    padding-left: 15px;
    padding-right: 15px;
    font-size: 1.5em;
  }
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
  margin-bottom: 18px;
  
  @media (max-width: 640px) {
    padding-left: 15px;
    padding-right: 15px;
  }
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
  
  @media (max-width: 640px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const CardContentExtra = styled.div`
  display: flex;
  align-items: center;
  padding: .3em 0 1em;
  justify-content: space-between;
  
  @media (max-width: 640px) {
    padding-left: 15px;
    padding-right: 15px;
  }
  
  i {
    font-size: 18px;
  }
`;

export const StyledA = styled.a`
    margin-right: 10px;
`;

export const MarginDiv = styled.div`
  margin: 0px 0px 30px 0px;
`;

export const PaddingTopDiv = styled.div`
  padding-top: 200px;
`;

export const StyledSubmitButton = styled(Button) `
  margin-right: 15px !important;
`;

export const MarginRightButton = styled.button`
  font-family: ${(props) => props.theme.primaryFont};
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 0px;
  margin-right: 25px;
  font-size: 14px;
  color: ${(props) => props.enable ? '#2BC3A3' : '#666'};

  @media(max-width: 640px) {
    margin-right: 20px;
  }

  body.noTouchDevice &:hover .underline{
    text-decoration: underline;
  }
`;

export const SmallNum = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  margin-left: 5px;
  border-radius: 4px;
  padding: 2px 5px;
  margin-top: 3px;
  height: 17px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.15;
  color: ${(props) => props.enable ? '#2BC3A3' : '#777'};
  background: ${(props) => props.enable ? '#d7f2ec' : '#e0e0e0'};
`;

export const BlockA = styled.div`
  font-size: 12px;
  font-weight: 500;
  display: flex;
  white-space: nowrap;
  height: 25px;
  cursor: pointer;
  padding-left: 13px;
  padding-top: 3px;
  padding-right: 15px;
  z-index: 2000;
  color: #2cb296;
  body.noTouchDevice &:hover {
    background: #2cb296;
    color: white;
  }
`;

export const PopupButton = styled.div`
  font-size: 20px !important;
  margin-top: -3px;
`;

export const IconButton = styled.button`
  padding: 0;
  cursor: pointer;

  i {
    font-size: 18px;
    color: #666;
  }
`;


export const PopupContent = styled.div`
  padding: 5.5px 0px;
`;

export const TitleTextarea = styled(Textarea) `
  font-weight: 700;
  resize: none;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  height: 50px;
`;

export const PointerLabel = styled.label` 
  cursor: pointer;
  user-select: none;
`;

export const AnonymousCheckbox = styled.input`
  float: left;
  margin: 0px 7px;
`;

export const LeftActions = styled.div`
  display: inline-flex;
  margin-right: auto;
  align-items: center;
`;

export const Categories = styled.div`
  padding: 10px 0px;

  label {
    color: #8B8B8B;
    font-size: 13px;
    padding: 12px 0px;
  }
`;

export const Bookmark = styled(Icon)`
  cursor: pointer;
  font-size: 16px !important;
  margin-bottom: 2px !important;
`;

export const FlexDiv = styled.div`
  display: flex;
`;

export const EmptyDiv = styled.div`
  height: 1px;
`;

export const MobileStats = styled.div`
  display: flex;
  font-size: 13px;
  color: ${(props) => props.theme.greyLighterFontColor};
  margin: 7px 0px;
  
  @media (max-width: 640px) {
    padding-left: 15px;
    padding-right: 15px;
  }
  
  span {
    cursor: pointer;
    margin: 0px 3px;
    body.noTouchDevice &:hover {
      text-decoration: underline;
    }
  }
`;

export const LeftButtons = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const GreyCenteredDiv = styled.div`
  padding: 50px 0px 150px 0px;
  text-align: center;
  color: grey;
  line-height: 20px;
  font-size: 15px;
`;

export const StyledIcon = styled.i`
  font-size: 70px;
  margin-bottom: 20px;
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

export const ShareButtonWrapper = styled.div`
  height: 20px;
  padding-top: 2px;
`;

export const PreventStyleLink = styled(Link)`
  margin-right: 2px;
  text-decoration: none !important;
  color: ${(props) => props.theme.greyLighterFontColor} !important;
`;
