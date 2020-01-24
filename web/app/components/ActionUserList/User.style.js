/**
 * Created by donghoon on 17. 12. 5.
 */
import styled from 'styled-components';
import { Link } from 'react-router';
export const SpaceBetweenContainer = styled.div`
  padding: 12px 3px;
  display: flex;
  justify-content: space-between;
  border-bottom: ${(props) => props.underline ? '1px' : '0px'} solid #e9ebee;
`;

export const Container = styled.div`
  display: flex;
  font-size: 14px;
`;

export const InfoContainer = styled.div`
  margin: 0px 0px 5px 4px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, .1);
`;

export const To = styled(Link)`
  color: ${(props) => props.theme.paragraphColor};
  text-decoration: none;
  
  body.noTouchDevice &:hover {
    color: ${(props) => props.theme.paragraphColor};
    text-decoration: underline;
  }
`;

export const Name = styled.div`
  
`;

export const Description = styled.div`
  color: ${(props) => props.theme.greyFontColor};
  margin-top: 3px;
`;

export const UserFolloweButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;
