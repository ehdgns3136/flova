import styled from 'styled-components';
import { Card, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';


export const CardContainer = styled.div`
  background-color: white;
  padding: 0px 17px 12px 17px;
  margin-bottom: 25px;
  border: 1px solid #E9E9E9;
  border-radius: 3px;

  @media (max-width: 640px) {
    border: none;
    padding: 0px 17px 8px 17px;
  }
`;

export const LightA = styled.a`0;
  cursor: pointer;

  body.noTouchDevice &:hover {
    color: #25a78b !important;
  }
`;

export const AnswerWriteA = styled.div`
  margin-left: auto;
  font-family: ${(props) => props.theme.primaryFont};
  display: flex;
  cursor: pointer;
  height: 17px;
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.enable ? '#2BC3A3' : '#666666'};
  opacity: .8;
  &:hover{
    opacity: 1;
  }
  body.noTouchDevice &:hover .underline{
    text-decoration: underline;
  }
`;

export const BoldSpan = styled.span`
  font-weight: bold;
`;

export const TitleContainer = styled.div`
  margin: 0px 0px ${(props) => props.answerExist ? '14px' : '30px'} 0px;
  padding-top: 11px;
`;

export const MarginCardHeader = styled(Link) `
  font-size: 19px;
  cursor: pointer;
  text-decoration: none;
  color: ${(props) => props.theme.titleColor} !important;
  font-weight: bold;
  line-height: 1.4;

  body.noTouchDevice &:hover {
    color: black;
    text-decoration: underline;
  }
`;

export const A = styled.a`
  cursor: pointer;
  body.noTouchDevice &:hover {
    text-decoration: underline;
  }
`;

export const StyledLink = styled(Link) `
  text-decoration: none;

  body.noTouchDevice &:hover {
    text-decoration: underline;
  }
`;

export const StyledCardDescription = styled(Card.Description) `
  margin-top: 8px;
  display: flex;
`;

export const CardImage = styled.img`
  margin-left: 14px;
  width: 120px;
  height: 120px;
  object-fit: cover;
  align-self: center;
`;

export const FlexCardContent = styled.div`
  margin-top: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  i {
    font-size: 18px;
  }
`;

export const FlexItem = styled.div`
  display: flex;
  padding: 3px 0px;
`;

export const IconExtra = styled(Icon) `
  color: rgba(0, 0, 0, 0.6);
  opacity: .8;

  &:hover, &:active {
    opacity: 1;
  }
`;

export const PaddingCard = styled(Card) `
  padding: 5px !important;
`;

export const MarginRightButton = styled.button`
  font-family: ${(props) => props.theme.primaryFont};
  display: flex;
  cursor: pointer;
  padding: 0px;
  margin-right: 29px;
  height: 17px;
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.enable ? '#2BC3A3' : '#666'};
  
  body.noTouchDevice &:hover .underline{
    text-decoration: underline;
  }
`;

export const SmallNum = styled.div`
  font-family: ${(props) => props.theme.primaryFont};
  display: flex;
  margin-left: 5px;
  border-radius: 4px;
  padding: 1px 5px 2px 5px;
  height: 18px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  line-height: 17px;
  color: ${(props) => props.enable ? '#2BC3A3' : '#777'};
  background: ${(props) => props.enable ? '#d7f2ec' : '#e0e0e0'};
`;

export const AnswerWriteFormContainer = styled.div`
  margin: 20px 0px 6px 0px;
`;

export const AnswerContainer = styled.div`
  margin-bottom: 19px;
`;

export const CardStats = styled.div`
  display: flex;
  justify-content: left;
  color: #929292;
  padding: 0px 17px 0px 17px;
  margin: 0px -17px 10px -17px;
  font-size: 13px;
  cursor: default;
  align-items: center;
`;

export const CardStatElement = styled(Link)`
  margin: 0px 2px;
  cursor: pointer;
  color: #929292 !important;
  text-decoration: none;
  body.noTouchDevice &:hover {
    color: #929292;
    text-decoration: underline;
  }
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

export const IconButton = styled.button`
  padding: 0;
  cursor: pointer;
  color: #666666;
`;


export const PopupContent = styled.div`
  padding: 5.5px 0px;
`;

export const CommentContainerWrapper = styled.div`
  border-top: 1px solid #E9E9E9;
  margin: 10px -17px -12px -17px;
  @media (max-width: 640px) {
    border-bottom: 1px solid #E9E9E9;
    margin: 10px -17px -8px -17px;
  }
`;


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
