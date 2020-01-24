import styled from 'styled-components';
import { Link } from 'react-router';
import { Icon } from 'semantic-ui-react';


export const Navbar = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 900;
  margin: 0;
  background: ${(props) => (props.transparent) ? 'transparent' : 'white'};
  color: ${(props) => (props.transparent) ? 'white' : 'black'};
  box-shadow: ${(props) => (props.transparent) ? 'none' : '0px 1px #e6e6e6'};
  display: flex;
  justify-content: center;
  padding-right: 5px;
  
  @media(max-width: 1008px) {
    height: 50px;
    box-shadow: ${(props) => (props.mainPage) ? 'none' : '0px 1px #e6e6e6'};
  }
`;

export const NavbarContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 24px;
`;

export const LogoContainer = styled.div`
  flex-grow: 0;
  color: #2BC3A3 !important;
  font-family: ${(props) => props.theme.logoFont};
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0 15px 0 0;
  padding: 0px 30px 0px 15px;
  font-size: 1.9rem;
  font-weight: 700;
  position: relative;
`;

export const Beta = styled.div`
  color: #aaaaaa;
  font-size: 0.9rem;
  font-weight: 600;
  font-style: italic;
  position: absolute;
  top: 20%;
  right: 0;
`;

export const SearchFormContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  align-items: center;
`;

export const SearchForm = styled.div`
  position: relative;
`;

export const StyledInput = styled.input`
  background-color: #F8F8F8;
  padding: 5px 20px 5px 20px;
  width: 250px;
  height: 35px;
  border-radius: 21px;
  font-size: 14px;
  padding-right: 30px;
  transition: width 0.2s cubic-bezier(0.4, 0, 1, 1);
  
  &:focus {
    background-color: white;
    border: 1px solid #CBD2D1;
    width: 800px;
    outline: none;    
  }
`;

export const SearchIcon = styled(Icon) `
  position: absolute;
  right: 7px;
  top: 8px;
  font-size: 18px !important;
`;


export const MenuContainer = styled.div`
  flex-grow: 0;
  display: flex;
  align-items: center;
`;

export const ItemContainer = styled.div`
  width: 60px !important;
  height: 60px !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: 100 !important;

  @media (max-width: 1008px) {
    height: 50px !important;
  }
  @media (max-width: 640px) {
    width: 50px !important;
    margin-right: ${(props) => (props.marginRight) ? props.marginRight + 'px' : ''};
  }
  body.noTouchDevice &:hover {
    background: ${(props) => (props.transparent) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
  }
`;

export const AlarmIcon = styled(Icon) `
  margin: 0px !important;
`;

export const AlarmLabel = styled.div`
  position: absolute;
  color: white;
  background-color: #DB2828;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 900;
  
  @media (min-width: 1008px) {
    height: 21px;
    top: 9px;
    right: 9px;
    padding: 2px 5px 2px 5px;
  }
  
  @media (min-width: 640px) and (max-width: 1008px) {
    height: 21px;
    top: 6px;
    right: 73px;
    padding: 2px 5px 2px 5px;
  }
  
  @media(max-width: 640px) {
    top: 6px;
    right: 60px;
    font-size: 10px;
    height: 19px;
    padding: 1px 4px 1px 4px;
  }
`;

export const UserAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  object-fit: cover;
  user-select: none;
  border: 1px solid rgba(0, 0, 0, .1);
`;

export const QuestionButton = styled.button`
  font-size: 15px;
  border: 1px solid ${(props) => (props.transparent) ? 'white' : '#2bc3a3'};
  color: ${(props) => (props.transparent) ? 'white' : '#2bc3a3'};
  height: 30px;
  cursor: pointer;
  border-radius: 15px;
  padding: 5px 21px 5px 21px;
  margin: 0px 10px;
  
  body.noTouchDevice &:hover {
    background: ${(props) => (props.transparent) ? 'rgba(255,255,255,0.1)' : 'rgba(43,195,163,0.05)'};
  }
`;

export const SignInButton = styled.button`
  margin: 0 16px;
  font-size: 15px;
  border: 1.2px solid #2bc3a3;
  color: #2bc3a3;
  height: 30px;
  cursor: pointer;
  border-radius: 13px;
  padding: 5px 21px 5px 21px;
  
  body.noTouchDevice &:hover {
    background: rgba(43,195,163,0.05);
  }
  @media (max-width: 640px) {
    margin: 0 5px;
  }
`;

export const MobileMenuLink = styled(Link) `
  display: inline-block;
  text-decoration: none;
  height: 100%;
  color: black;
  
  &:hover {
    color: black;
    cursor: pointer;
  }

  body.touchDevice &:active {
    color: black;
  }
`;

export const SearchPageButton = styled(Link) `
  width: 60px !important;
  height: 100% !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: 100 !important;
  color: black;
  text-decoration: none;
  
  @media (max-width: 640px) {
    width: 50px !important;
  }
  
  body.noTouchDevice &:hover {
    background: ${(props) => (props.transparent) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
    color: black;
    text-decoration: none;
  }
`;

export const UnstyledLink = styled(Link) `
`;
