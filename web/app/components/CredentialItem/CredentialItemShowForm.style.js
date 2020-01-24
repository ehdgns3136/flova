/**
 * Created by donghoon on 17. 8. 9.
 */

/**
 * Created by donghoon on 17. 8. 15.
 */
/**
 * Created by donghoon on 17. 8. 9.
 */
import styled from 'styled-components';
import { List, Icon } from 'semantic-ui-react';

export const ImageBox = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-top: 1px;
  margin-left: 1px;
`;

export const ListItemWrapper = styled(List.Item)`
  position: relative !important;
  display: flex !important;
  color: #303030;
  margin-bottom: -3px !important;
  padding-right: 20px !important;
`;

export const HeaderWrapper = styled(List.Header)`
  margin-top: 3px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #303030 !important;
`;

export const HeaderOnlyWrapper = styled(List.Header)`
  margin-top: 5px !important;
  margin-bottom: 10px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #303030 !important;
`;

export const DescriptionWrapper = styled.div`
  color: #9f9f9f !important;
  margin-bottom: 10px !important;
  font-size: 13px;
  font-weight: 500;
  padding-top: 0px;
`;

export const OptionWrapper = styled.div`
  color: #999999 !important;
  position: absolute;
  height: 55px;
  margin-top: -7px;
  font-size: 12px;
  right: -3px;
`;

export const OptionText = styled.div`
  font-size: 12px;
  margin-top: 8px;
  cursor: pointer;
`;

export const Ellipsis = styled(Icon)`
  color: #919191 !important;
  margin-top: -6px !important;
  margin-left: -1px !important;
`;

export const BlockA = styled.a`
  font-family: ${(props) => props.theme.primaryFont};
  display: block;
  white-space: nowrap;
  height: 25px;
  width: 120px;
  cursor: pointer;
  padding-left: 13px;
  padding-top: 2px;
  z-index: 2000;
  body.noTouchDevice &:hover {
    background: #2cb296;
    color: white;
  }
`;

export const PopupContent = styled.div`
  padding: 5.5px 0px;
`;

export const TealRightIcon = styled(Icon) `
  color: ${(props) => props.clicked ? '#25a78b' : 'rgba(0, 0, 0, 0.6)'};
  margin-left: auto !important;
`;

