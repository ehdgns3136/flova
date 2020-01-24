/**
 * Created by donghoon on 17. 10. 23.
 */
import styled from 'styled-components';
import { Link } from 'react-router';
import { Icon } from 'semantic-ui-react';

export const ProfilePopupContainer = styled.div`
  padding: 20px;
  padding-bottom: ${(props) => (props.paddingBottom ? '20px' : '15px')};
  color: rgba(0,0,0,.87);
  width: 290px;
  font-weight: 400;
  white-space: normal;
`;

export const PopupFlex = styled.div`
  display: flex;
`;

export const PopupProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, .1);
`;

export const PopupUserInfo = styled.div`
  margin-left: 10px;
  margin-top: 5px;
`;

export const PopupWriterName = styled(Link)`
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  body.noTouchDevice &:hover {
    color: black;
    text-decoration: underline;
  }
`;

export const PopupDescription = styled.div`
  font-size: 14px;
  margin-top: 9px;
  color: #727272;
`;

export const FollowerInfo = styled.div`
  margin-top: 8px
  font-size: 14px;
`;

export const UserFollowButtonContainer = styled.div`
  margin-left: 25px; 
`;

export const CredentialIcon = styled(Icon)`
  color: #999999 !important;
  margin-right: 10px !important;
`;

export const UserInfoElement = styled.div`
  font-size: 14px !important;
  margin-bottom: 10px;
`;
