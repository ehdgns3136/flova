import styled from 'styled-components';
import { Modal } from 'semantic-ui-react';


export const WonderEditorContainer = styled.div`
  z-index: 0;
  width: 100%;
  border: 1px solid #d7d7d7;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #D7D7D7;
  background-color: white;
  z-index: 1;
  height: 38px;
  position: ${(props) => props.isSticky ? 'fixed' : 'initial'};
  top: ${(props) => props.isSticky ? `${props.fixedTop}px` : 'initial'};
  width: ${(props) => props.isSticky ? `${props.fixedWidth}px` : 'initial'};

  @media (max-width: 640px) {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

export const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Action = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.isHighlight ? props.theme.primaryColor : 'black'};
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  margin-right: 6px;
  
  body.noTouchDevice &:hover {
    background-color: #F4F4F4;
  }
`;

export const EmptyActionContainerForSticky = styled.div`
  height: ${(props) => props.isSticky ? `${props.fixedHeight}px` : '0'};
`;

export const ViewContainer = styled.div`
  padding: 16px 20px 10px 20px;
  min-height: 200px;
`;

export const StyledModal = styled(Modal)`
  padding: 0 !important;
`;
