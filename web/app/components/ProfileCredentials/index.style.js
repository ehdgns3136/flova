import styled from 'styled-components';
import { Link } from 'react-router';


export const Container = styled.div`
  flex-grow: 1;
  padding-bottom: 10px;
  align-self: flex-start;

  @media (min-width: 1008px) {
    background-color: #FFFFFF;
    padding: 10px 0px 0px;
    margin: 20px 0px;
    border: 1px solid #e9e9e9;
  }
  
  @media (max-width: 1008px) {
    max-width: 700px;
    margin: 0 auto;
  }
`;

export const ListHeader = styled.h2`
  font-size: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  margin: 0px 18px 10px 18px;

  @media (max-width: 640px) {
    font-size: 14px;
    margin-bottom: 5px;
  }
`;

export const IconContainer = styled.span`
  position: absolute;
  left: 0;
  width: 20px;
  height: 20px;
`;

export const CredentialList = styled.ul`
  list-style-type: none;
  padding-left: 0px;
  position: relative;
  
  @media (max-width: 640px) {
    margin: 10px 0px 10px 0px;
  }

  li {
    color: #222222;
    position: relative;
    padding-left: 22px;
    padding-right: 0px;
    margin-top: 7px;
    line-height: 25px;
    line-height: 1.5em;
    margin: 0px 18px 0px 18px;
    @media (max-width: 640px) {
      padding-right: 30px;
      font-size: 13px;
      margin-top: 2px;
      color: #5e5e5e;
    }
  }
`;

export const CredentialButton = styled.button`
  cursor: pointer;
  font-size: 13px;
  margin-top: 2px;
  color: #888888;
  
  body.noTouchDevice &:hover {
    color: #333333;
  }
`;

export const MobileCredentialButton = styled(Link)`
  cursor: pointer;
  font-size: 12px;
  margin-top: 2px;
  text-decoration: none;
  position: absolute;
  right: 20px;
  top: 0px;
  z-index: 100;
  font-weight: 500;
  color: #9e9e9e;
  
  body.noTouchDevice &:hover {
    color: #333333;
  }
`;

export const Divider = styled.div`
  height: 1px;
  border-top: 1px solid rgba(34, 36, 38, 0.15)
  margin: 0px 20px;
  @media (min-width: 640px) {
    margin: 0px;
  }
`;
