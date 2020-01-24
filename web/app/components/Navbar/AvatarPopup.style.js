import styled from 'styled-components';
import { Link } from 'react-router';


export const AvatarPopupContainer = styled.div`
  width: 150px;
  color: black;
  text-align: left;
`;

export const AvatarPopupHeader = styled.div`
  font-size: 18px;
  font-weight: 600;
  height: 44px;
  vertical-align: middle;
  line-height: 44px;
  padding-left: 13px;
`;

export const AvatarPopupItem = styled(Link)`
  width: auto;
  font-size: 14px;
  padding: 7px 15px;
  display: block;
  border-bottom: 1px solid #D4D4D5;
  cursor: pointer;
  text-decoration: none;
  
  body.noTouchDevice &:hover {
    background: #daefea;
  }
`;

export const AvatarPopupFooter = styled.div`
  padding: 3px 5px 3px 15px;
  color: #2BC3A3;
  font-size: 14px;
  font-weight: 600;
  line-height: 28px;
  vertical-align: middle;
  text-align: center;
`;

export const MetaList = styled.ul`
  color: #898989;
  padding: 0 !important;
  font-size: 12px;
  line-height: 1.4;
  word-wrap: break-word;
  margin: 5px 0 5px 0;
  text-align: left;
  font-weight: 400;

  > li {
    display: inline;
    list-style-type: none;
    > a {
      color: #898989;
      text-decoration: none;
      margin-right: 10px;
      &:hover {
        color: #898989;
        text-decoration: underline;
      }
    }
  }
`;
