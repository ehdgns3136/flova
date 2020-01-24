import styled from 'styled-components';

export const PopupContainer = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  top: ${(props) => props.smoothOpen ? (
    props.isUpsideDown ? `-${props.componentHeight + 30}px` : '90%') : (
      props.isUpsideDown ? `-${props.componentHeight + props.triggerHeight}px` : '100%')};
  right: calc(50% - ${(props) => props.arrowPositionRight});
  bottom: auto;
  margin-top: ${(props) => props.marginTop};
  background-color: white;
  border: 1px solid #D4D4D5;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: default;
  z-index: 800;
  
  -webkit-transition: ${(props) => props.smoothOpen ? '0.3s' : '0s'};
  -moz-transition: ${(props) => props.smoothOpen ? '0.3s' : '0s'};
  -o-transition: ${(props) => props.smoothOpen ? '0.3s' : '0s'};
  transition: ${(props) => props.smoothOpen ? '0.3s' : '0s'};
  opacity: ${(props) => props.isOpen ? '1' : '0'};
  visibility: ${(props) => props.isOpen ? 'visible' : 'hidden'};
`;

export const Arrow = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  top: ${(props) => props.isUpsideDown ? 'auto' : '-6px'};
  left: auto;
  right: calc(${(props) => props.arrowPositionRight} - 3px);
  bottom: ${(props) => props.isUpsideDown ? '-6px' : 'auto'};
  border-top: 1px solid #D4D4D5;
  border-left: 1px solid #D4D4D5;
  border-radius: 2px;
  background-color: white;
  transform: ${(props) => props.isUpsideDown ? 'rotate(225deg)' : 'rotate(45deg)'};
  z-index: -1;
`;

export const TransparentBox = styled.div`
  position: absolute;
  width: 110px;
  height: 40px;
  top: ${(props) => props.isUpsideDown ? 'auto' : '-20px'};
  left: auto;
  right: calc(${(props) => props.arrowPositionRight} - 50px);
  bottom: ${(props) => props.isUpsideDown ? '-13px' : 'auto'};
  opacity: 0;
`;
