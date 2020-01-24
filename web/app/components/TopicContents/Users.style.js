import styled from 'styled-components';
import { Link } from 'react-router';

export const LoaderWrapper = styled.div`
  padding-top: 200px;
  position: relative;
`;

export const User = styled.div`
  min-height: 80px;
  display: flex;
  padding: 10px 10px 10px 15px;
  align-items: center;
`;

export const Rank = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 30px;
  margin-right: 12px;
`;

export const ProfileImage = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  border: 1px solid rgba(0, 0, 0, .1);
`;

export const NameAndDescription = styled.div`
`;

export const Name = styled(Link) `
  display: block;
  font-size: 16px;
  font-weight: bold;
  opacity: 1;
  color: black;
  margin-bottom: 5px;
  text-decoration: none;

  body.noTouchDevice &:hover {
    color: black;
    text-decoration: underline;
  }
`;

export const UserList = styled.div`
  border: 1px solid #e2e2e2;
  background-color: white;

  @media (max-width: 640px) {
    border: none;
  }

  hr {
    border: 0.5px solid #dbdbdb;
    margin: 0;
  }
`;

export const GreyCentered = styled.div`
  color: grey;
  text-align: center;
  padding-top: 70px;
`;
