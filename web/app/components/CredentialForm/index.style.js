/**
 * Created by donghoon on 17. 9. 20.
 */
import styled from 'styled-components';
import { Header, Modal, List, Icon } from 'semantic-ui-react';

export const ListWrapper = styled(List)`
  width: 100% !important;
  margin: 10px 0px -10px 0px !important;
`;

export const DottedBox = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #2bc3a3;
  border-style: dotted;
  margin-right: 10px;
`;

export const AddListItem = styled.div`
  cursor: pointer;
  display: flex !important;
  color: #919191;
`;

export const AddListItemHeader = styled(Header)`
  color: #2bc3a3 !important;
  margin-top: 9px !important;
`;

export const PlusIcon = styled(Icon)`
  margin-right: 5px !important;
  color: #919191 !important;
`;

export const StyleButton = styled.button`
  cursor: pointer;
  padding: 0.7em 1em 0.7em 1em;
  border-radius: 2px;
  color: white;
  background-color: #2BC3A3;
  font-weight: 600;
  transition: all 0.2s ease;
  outline-width: 0;
  width: 100%;
  height: 45px;
  margin-top: 10px;
  font-size: 16px;
`;

export const ButtonGroup = styled.div`
  display: flex;
`;

export const CloseIcon = styled(Icon) `
  position: absolute !important;
  top: .5rem !important;
  right: .5rem !important;
  color: rgba(0,0,0,.87) !important;
`;

export const CustomModal = styled(Modal)`
  width: 440px !important;
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
  margin: .5rem 0px 0px 10px;
`;

export const ListHeader = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.theme.primaryColor};
  margin-bottom: 10px;
`;

export const NothingHeader = styled.div`
  font-size: 1.2em;
  font-weight: 600;
  margin-top: -30px;
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Divider = styled.div`
  height: 1px;
  border-top: 1px solid rgba(34, 36, 38, 0.15)
  margin-bottom: 10px;
`;

export const EmptyText = styled.div`
  color: #919191;
  display: flex;
  justify-content: center;
`;

export const HiddenDivider = styled.div`
  height: 20px;
  opacity: 100%;
`;
