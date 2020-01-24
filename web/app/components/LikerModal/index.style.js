/**
 * Created by donghoon on 17. 12. 5.
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
  width: 440px !important;
  height: 480px !important;
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
  font-size: 16px;
  font-weight: bold;
  margin: 2px 0px 18px 10px;
`;

export const Content = styled.div`
  border-top: 1px solid #e9ebee;
  padding: 0px 5px 0px 5px;
`;
