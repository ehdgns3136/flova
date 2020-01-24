/**
 * Created by donghoon on 17. 8. 30.
 */
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router';

export const CommentItemWrapper = styled.div`
  position: relative;
  font-family: ${(props) => props.theme.primaryFont};
  display: flex;
  margin: 10px 0px 4px 0px;
  body.noTouchDevice &:hover .option_button {
    visibility: visible;
  }
`;

export const ProfileImageWrapper = styled(Link)`
  width: 40px;
  height: 40px;
  margin-right: 12px;
`;

export const ProfileImage = styled.img `
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, .1);
  display: inline-block;
  cursor: pointer;
`;

export const WriterName = styled(Link)`
  color: black;
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  body.noTouchDevice &:hover {
    color: black;
    text-decoration: underline;
  }
`;

export const IconWrapper = styled(Icon)`
  font-family:FontAwesome;
  font-size: 12px !important;
`;
export const ContentWrapper = styled.div`
`;

export const Content = styled.div`
  font-family: ${(props) => props.theme.primaryFont};
  font-size:13px;
  color:#000000;
  text-align:justify;
  margin-bottom: 4px;
  flex-grow: 1;
  padding-right: 40px;
  line-height: 18px;
  
  word-break: break-all;
`;

export const ExtraIntoWrapper = styled.div`
  display: flex;
`;

export const LikeWrapper = styled.div`
  color: ${(props) => props.is_liked ? '#2BC3A3' : 'rgba(0,0,0,.4)'};
  font-size: 12px;
  cursor: pointer;
`;

export const MiddleDot = styled.div`
  margin-left: 6px;
  margin-right: 6px;
  color: rgba(0,0,0,.4);
  font-size: 14px;
  font-weight: 900;
`;

export const Created = styled.div`
  color: rgba(0,0,0,.4);
  font-size: 12px;
`;


export const OptionWrapper = styled.div`
  color: rgba(0, 0, 0, 0.6);
  position: absolute;
  right: 2.7%;
  @media (max-width: 640px) {
    right: 4.2%;
  }
  font-size: 20px;
  font-weight: 700;
`;

export const OptionText = styled.div`
  visibility: hidden;
  cursor: pointer;
  margin-left: -12px;
`;

export const BlockA = styled.a`
  font-family: ${(props) => props.theme.primaryFont};
  font-size: 12px;
  font-weight: 500;
  display: block;
  white-space: nowrap;
  height: 25px;
  width: 50px;
  cursor: pointer;
  padding-left: 13px;
  padding-top: 6px;
  z-index: 2000;
  body.noTouchDevice &:hover {
    background: #2cb296;
    color: white;
  }
`;

export const PopupContent = styled.div`
  padding: 5.5px 0px;
`;

export const CommentInput = styled.textarea`
  resize: none;
  height: 39px;
  min-height: 35px;
  max-height: 500px;
  border: 1px solid rgba(0,0,0,.18);
  border-radius: 5px;
  margin-left: 12px;
  padding: 10px 10px 6px 10px;
  width: 86%;
  font-size: 13px;
  color: rgba(0,0,0,.8)
  background: white;
  line-height: 18px;
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  padding: 10px 0px 3px 0px;
`;

export const SubmitButton = styled.button`
  margin-left: 5px;
  font-weight: 900;
  font-size: 14px;
  color: #2BC3A3;
  cursor: pointer;
  white-space: nowrap;
`;

export const ModifyProfileImage = styled.img `
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, .1);
  display: inline-block;
`;

export const CommentActionSheetWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
`;
