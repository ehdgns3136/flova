import styled from 'styled-components';
import { Link } from 'react-router';

export const Item = styled.button`
  height: 55px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export const CustomATag = styled.a`
  color: black;
  text-decoration: none;
  
  &:hover {
    color: black !important;
  }
`;
