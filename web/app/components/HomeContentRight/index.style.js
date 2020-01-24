import styled from 'styled-components';
import { Link } from 'react-router';

export const MetaList = styled.ul`
  color: #657786;
  padding: 20px 5px 20px 10px !important;
  font-size: 12px;
  line-height: 16px;
  word-wrap: break-word;
  margin: 20px 0 20px 0;
  background: #ffffff;
  border:1px solid #e9e9e9;

  > li {
    display: inline;
    list-style-type: none;
    padding-right: 8px;
  }
`;

export const MediaDiv = styled.div`
  padding-right: 20px;
  position: fixed;
  top: 92px;
  width: 250px;
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

export const ProfileContainer = styled.div`
  background: #ffffff;
  border:1px solid #e9e9e9;
  width:100%;
`;

export const Profile = styled.div`
  display: flex;
  border-bottom: 1px solid #e9e9e9;
  padding: 14px 14px 10px 13px;
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

export const NameContainer = styled.div`
  padding-top: 1px;
`;

export const Name = styled(Link)`
  cursor: pointer;
  color: black;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  body.noTouchDevice &:hover {
    color: black;
    text-decoration: underline;
  }
`;

export const Description = styled.div`
  color:#727272;
  margin-top: 2px;
  font-size: 12px;
  font-weight: 400;
`;

export const Summary = styled.div`
  padding: 4px 0px 14px 20px;
`;

export const SummaryElement = styled.div`
  display: flex;
  color:#727272;
  font-size: 13px;
  font-weight: 400;
  margin-top: 10px;
`;
