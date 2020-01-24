import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import Textarea from 'react-textarea-autosize';

export const HeaderContainer = styled.div`
  padding: 0px 14px;
`;

export const StyledUsername = styled.div`
  font-size: 14px;
  color: #000000;
  margin-bottom: 16px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: start;
  line-height: 20px;
  font-size: 20px;
  margin-bottom: 22px;
`;

export const TitleQ = styled.span`
  font-weight: bold;
  margin: 2px 4px 0px 0px;
`;

export const TitleTextarea = styled(Textarea) `
  width: 90%;
  font-weight: bold;
  resize: none;
  
  &:focus {
    outline-width: 0;
  }
  
  &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #777777;
  }
  &::-moz-placeholder { /* Firefox 19+ */
    color: #777777;
  }
  &:-ms-input-placeholder { /* IE 10+ */
    color: #777777;
  }
  &:-moz-placeholder { /* Firefox 18- */
    color: #777777;
  }
`;

export const EditorContainer = styled.div`
  margin-bottom: 17px;
`;

export const BasicButton = styled.button`
  cursor: pointer;
  color: #777777;
  outline-width: 0;
  margin-right: 11px;

  &:hover, &:visited, &:active {
    color: #666666;
  }
`;

export const SubmitButton = styled.button`
  width: 90px;
  border: 1px solid ${(props) => props.cancel ? '#b0b0b0' : '#2bc3a3'};
  color: ${(props) => props.cancel ? '#b0b0b0' : '#2bc3a3'};
  height: 26px;
  cursor: pointer;
  border-radius: 15px;
  
  body.noTouchDevice &:hover {
    background: ${(props) => props.cancel ? 'rgba(0,0,0,0.02)' : 'rgba(43,195,163,0.05)'};
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

export const FlexActions = styled.div`
  display: flex;
  padding: 17px 14px 0px 14px;
  justify-content: space-between;
  align-items: center;
`;

export const PointerLabel = styled.label` 
  cursor: pointer;
  user-select: none;
`;

export const Categories = styled.div`
  padding-bottom: 17px 0px;
`;

export const UserAvatar = styled.img`
  width: 40px !important;
  height: 40px !important;
  border-radius: 20px !important;
  overflow: hidden;
  object-fit: cover;
  margin-right: 15px;
  border: 1px solid rgba(0, 0, 0, .1);
`;

export const TopicLabel = styled.div`
  margin: 0px 0px 8px 5px;
  font-size: 13px;
  color: #a5a5a5;
`;

export const ButtonGroup = styled.div`
  
`;
