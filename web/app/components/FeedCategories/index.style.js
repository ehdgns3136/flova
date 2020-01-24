import styled from 'styled-components';
import { Link } from 'react-router';

export const ListContainer = styled.div`
`;

export const ListItem = styled.div `
  display: block;
  color: #000000;
  cursor: pointer;
  color: rgba(0,0,0,.87);
  padding: 5px 0px 5px 8px;
  border-radius: 2px;
  text-decoration: none;
  
  margin-top: 2px;
  font-weight: 600;
  background: ${(props) => props.isActive ? '#e6e6e6' : ''};

  body.noTouchDevice &:hover {
    text-decoration: none;
    background: #e6e6e6;
    color: #000000;
  }
`;

export const ConstantListItem = styled.div`
  color: rgba(0,0,0,.87);
  font-weight: 600;
  padding: 5px 0px 5px 8px;
`;

export const UnstyledLink = styled(Link) `
  text-decoration: none;
  color: inherit;
`;

export const IndentedListItem = styled.div `
  display: block;
  margin-left: 10px;
  cursor: pointer;
  font-weight: 500;
  color: rgba(0,0,0,.4);
  padding: 5px 0px 5px 8px;
  border-radius: 7px;
  background: ${(props) => props.isActive ? '#e6e6e6' : 'inherit'};
  text-decoration: none;
  color: #7d7d7d;

  body.noTouchDevice &:hover {
    text-decoration: none;
    background: #e6e6e6;
    color: #7d7d7d;
  }
`;

export const PaddingTopDiv = styled.div`
  padding-top: 10px;
  padding-left: 20px;
  position: fixed;
  top: 92px;
  width: 200px;
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

export const TealHeader = styled.div`
  color: #2BC3A3;
  font-weight: 600;
  font-size: 18px;
`;


export const MobileMenu = styled.div`
  white-space: nowrap;
  border-bottom: 1px solid #dbdbdb;
  background-color: white;
  width: 100vw;
  height: 40px;
  position: fixed;
  z-index: 800;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
`;

export const MobileContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
`;

export const MobileItem = styled.div `
  text-decoration: none;
  display: inline-block;
  text-align: center;
  
  color: ${(props) => props.isActive ? '#000000' : '#7d7d7d'};
  padding: 13px 15px;
  font-weight: 500;
  cursor: pointer;

  body.touchDevice &:active {
    text-decoration: none;
    color: ${(props) => props.isActive ? '#000000' : '#7d7d7d'};
  }

  body.noTouchDevice &:hover {
    background-color: #f6f6f6;
  }
`;
