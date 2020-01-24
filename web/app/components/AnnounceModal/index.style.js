/**
 * Created by donghoon on 17. 9. 20.
 */
import styled from 'styled-components';
import { Modal, Icon } from 'semantic-ui-react';

export const CloseIcon = styled(Icon) `
  position: absolute !important;
  top: .5rem !important;
  right: .5rem !important;
  color: rgba(0,0,0,.87) !important;
`;

export const CustomModal = styled(Modal)`
  width: 600px !important;
  position: absolute !important;
  left: 0 !important;
  right: 0 !important;
  margin-left: auto !important;
  margin-right: auto !important;

  @media (max-width: 640px) {
    width: 100% !important;
  }
`;

export const CustomHeader = styled.div`
  font-size: 20px;
  font-weight: 700;
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.primaryColor};
  margin-top: 10px;
  
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

export const CustomContent = styled.div`
  margin: 20px 20px 30px 20px;
  line-height: 25px;
  
  @media (max-width: 640px) {
    margin: 20px 2px 5px 2px;
    line-height: 22px;
  }
  max-height: 80vh;
  overflow-y: auto;
  padding: 15px;
  font-size: 14px;
  border: 2px solid ${(props) => props.theme.primaryLighterColor};
  border-radius: 2px;
  
`;

export const UnorderedList = styled.ul`
  margin: 20px 0px;
  padding-left: 20px;
`;

export const List = styled.li`
  margin: 25px 0px;
`;

export const CircleList = styled.ul`
  list-style-type: circle;
  padding-left: 20px;
`;
