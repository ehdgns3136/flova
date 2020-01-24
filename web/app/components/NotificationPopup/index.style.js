import styled from 'styled-components';
import { Link } from 'react-router';


export const NotificationPopupContainer = styled.div`
  width: 350px;
  color: black;
  text-align: left;
`;

export const NotificationPopupHeader = styled.div`
  font-size: 18px;
  font-weight: 600;
  height: 44px;
  vertical-align: middle;
  line-height: 44px;
  padding-left: 16px;
`;

export const NotificationListContainer = styled.div`
  max-height: 340px;
  overflow-y: auto;
  padding: 0px 14px 0px 16px;
  
  &::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: rgba(100,100,100,0.7);
  }

  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }
`;

export const NotificationPopupFooter = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  color: #2BC3A3;
  border-top: 1px solid #D4D4D5;
`;

export const LoaderWrapper = styled.div`
  position: relative;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

export const GreyCenteredDiv = styled.div`
  text-align: center;
  color: grey;
  height: 140px;
  width: 100%;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

export const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  font-size: 13px;
  font-weight: 600;
  line-height: 28px;
  text-align: center;
  text-decoration: none;
  
  body.noTouchDevice &:hover {
    text-decoration: underline;
    cursor: pointer;
    color: ${(props) => props.theme.primaryColor};
  }
`;
