import React from 'react';
import styled from 'styled-components';
import { Header, Modal, Icon } from 'semantic-ui-react';
import Textarea from 'react-textarea-autosize';

export const StyledUsername = styled(Header) `
  color: #666666 !important;
  font-weight: 500 !important;
  font-size: 15px !important;
`;


const isEdge = /Edge\/\d./i.test(navigator.userAgent);

let textareaComponent = Textarea;

if (isEdge) {
  textareaComponent = (props) => <textarea {...props} />;
}

export const TitleTextarea = styled(textareaComponent) `
  width: 90%;
  font-weight: 900;
  resize: none;
  
  &:focus {
    outline-width: 0;
  }
`;

export const TitleContent = styled(Modal.Content) `
  display: flex !important;
  align-items: start !important;
  line-height: 20px !important;
  font-size: 20px !important;
  font-weight: 700;
`;

export const EditorContainer = styled.div`
  padding: 0px 22px;
`;

export const BasicButton = styled.button`
  cursor: pointer;
  color: #777777;
  padding: 0.7em 1em 0.7em 1em;
  outline-width: 0;

  &:hover, &:visited, &:active {
    color: #666666;
  }
`;

export const SubmitButton = styled.button`
  cursor: pointer;
  margin: 0 5px 0 5px;
  padding: 0.7em 1em 0.7em 1em;
  border-radius: 5px;
  color: #2BC3A3;
  box-shadow: 0 0 0 1.5px #2bc3a3 inset!important
  font-weight: 900;
  transition: all 0.2s ease;
  outline-width: 0;

  body.noTouchDevice &:hover {
    color: white;
    background-color: #2BC3A3;
  }
`;


export const CloseIcon = styled(Icon) `
  position: absolute !important;
  top: .5rem !important;
  right: .5rem !important;
  color: rgba(0,0,0,.87) !important;
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

export const FlexActions = styled(Modal.Actions) `
  display: flex;
`;

export const PointerLabel = styled.label` 
  cursor: pointer;
  user-select: none;
`;

export const Categories = styled.div`
  padding: 10px 21px;

  label {
    color: #8B8B8B;
    font-size: 13px;
    padding: 12px 0px;
  }
`;

export const UserAvatar = styled.img`
  width: 35px !important;
  height: 35px !important;
  border-radius: 20px !important;
  overflow: hidden;
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, .1);
`;
