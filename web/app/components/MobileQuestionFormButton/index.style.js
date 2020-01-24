/**
 * Created by donghoon on 17. 10. 14.
 */
import styled from 'styled-components';
import { Link } from 'react-router';

export const Container = styled(Link)`
  cursor: pointer;
  background-color: white;
  padding: 14px 17px 16px 15px;
  margin-bottom: 20px;
  border: 1px solid #e2e2e2;
  border-radius: 3px;
  display: flex;
  text-decoration: none;
  
  &:hover {
    text-decoration: none;    
  }
  
  @media (max-width: 640px) {
    border: none;
  }

  @media (min-width: 640px) {
    max-width: 600px;
    margin: 0 auto 20px;
  }
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, .1);
`;

export const Placeholder = styled.div`
  color: ${(props) => props.theme.greyFontColor};
  margin: 11px 0px 0px 7px;
  font-size: 15px;
`;
