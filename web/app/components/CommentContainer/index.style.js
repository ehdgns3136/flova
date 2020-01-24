/**
 * Created by donghoon on 17. 8. 30.
 */
import styled from 'styled-components';
import { Loader } from 'semantic-ui-react';

export const CommentWrapper = styled.div`
  font-family: ${(props) => props.theme.primaryFont};
  background: #F7F7F7;
  
  @media (max-width: 640px) {
    background: #F6F6F6;
  }
  padding: 10px 16px 6px 16px;
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
  font-size: 14px;
  color: rgba(0,0,0,.8)
  background: white;
  line-height: 18px;
`;

export const CommentInputWrapper = styled.div`
  display: flex;
`;

export const SubmitButton = styled.button`
  margin-left: 5px;
  font-weight: 900;
  font-size: 14px;
  color: #2BC3A3;
  cursor: pointer;
  white-space: nowrap;
`;


export const ProfileImage = styled.img `
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, .1);
`;

export const MoreComment = styled.div`
  font-size: 13px;
  margin: 16px 0px;
  font-weight: bold;
  cursor: pointer;
  body.noTouchDevice &:hover {
    text-decoration: underline;
  }
`;

export const MoreLoader = styled(Loader)`
  position: relative !important;
  margin-top: 35px !important;
`;
