import styled from 'styled-components';
import { Link } from 'react-router';

export const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100px;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 15px;
  min-width: 270px;
  max-width: 270px;
  border: 1px solid #E9E9E9;
  border-radius: 3px;
  background-color: white;

  @media (max-width: 640px) {
    border: 0.5px #e2e2e2 solid;
    min-width: 325px;
    max-width: initial;
    margin: 0px;
    background-color: white;
  }
`;

export const ImageWrapper = styled(Link)`
`;

export const Image = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  display: flex;
  margin-right: 10px;
  border-radius: ${(props) => props.type === 'topic' ? '5px' : '50%'};
  border: 1px solid rgba(0, 0, 0, .1);
`;

export const Description = styled.div`
  p {
    font-size: 13px;
  }
`;

export const Name = styled(Link)`
  display: block;
  font-size: 15px;
  margin-bottom: 5px;
  color: black;
  text-decoration: none;
  font-weight: bold;
  margin-bottom: 5px;
  
  body.noTouchDevice &:hover {
    text-decoration: underline;
    color: black;
  }
  body.touchDevice &:hover {
    text-decoration: none;
    color: black;
  }
`;

export const FollowButton = styled.button`
  display: block;
  box-sizing: border-box;
  border: 1px ${(props) => props.isFollowing ? '#BDDCD5' : '#ddd'} solid;
  padding: 7px 10px 6px;
  margin-top: 8px;
  font-weight: 700;
  border-radius: 3px;
  background-color: ${(props) => props.isFollowing ? '#DFF6F1' : '#EEE'};
  color: ${(props) => props.isFollowing ? '#25A68B' : '#919191'};
  cursor: ${(props) => props.disabled ? '' : 'pointer'};
  transition: background-color ease-in-out 100ms, color ease-in-out 100ms, border-color ease-in-out 100ms;
  box-shadow: 0 1px 1px 0 rgba(200,200,200,0.2);

  span {
    margin-left: 5px;
    font-weight: 300;
    color: ${(props) => props.isFollowing ? '#BDDCD5' : '#ddd'};
  }

  div {
    display: inline;
  }

  body.noTouchDevice &:hover {
    border: 1px ${(props) => props.disabled ? (
        '#ddd'
      ) : (
        props.isFollowing ? '#25A68B' : '#919191'
      )} solid;

    span {
      color: ${(props) => props.disabled ? (
        '#ddd'
      ) : (
        props.isFollowing ? '#25A68B' : '#919191'
      )}
  }
`;
