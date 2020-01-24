import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

export const BackgroundDiv = styled.div`
  background-color: #FFFFFF;
  border-bottom: 1px solid #dbdbdb;
  padding: 45px 0px;
  display: flex;
  justify-content: center;
  
  @media (max-width: 640px) {
    padding: 28px 15px 0px 30px;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 700px;
`;

export const TopicImage = styled.img`
  height: 110px;
  width: 110px;
  object-fit: cover;
  border-radius: 4px;

  @media (max-width: 640px) {
    height: 70px;
    width: 70px;
  }
`;

export const FollowButton = styled.button`
  display: block;
  box-sizing: border-box;
  cursor: pointer;
  color: #2bc3a3;
  border: 1px #2bc3a3 solid;
  border-radius: 100px;
  font-size: ${(props) => {
  if (props.size === 'big') {
    return '16px';
  } else {
    return '14px';
  }
}};
  width: ${(props) => {
  if (props.size === 'big') {
    return '100px';
  } else {
    return '85px';
  }
}};
  height: ${(props) => {
  if (props.size === 'big') {
    return '34px';
  } else {
    return '29px';
  }
}};
  text-align: center;
  
  body.noTouchDevice &:hover {
    background: rgba(43,195,163,0.05);
  }
`;

export const UnfollowButton = styled.button`
  display: block;
  box-sizing: border-box;
  cursor: pointer;
  color: white;
  background-color: #2bc3a3;
  border-radius: 100px;
  font-size: ${(props) => {
  if (props.size === 'big') {
    return '16px';
  } else {
    return '14px';
  }
}};
    width: ${(props) => {
  if (props.size === 'big') {
    return '100px';
  } else {
    return '85px';
  }
}};
    height: ${(props) => {
  if (props.size === 'big') {
    return '34px';
  } else {
    return '29px';
  }
}};
  text-align: center;
  
  body.noTouchDevice &:hover {
    span {
      display: none;
    }
    background-color: #f1744a;
    &:before {
      content: '언팔로우';
    }
  }
`;

export const Stats = styled.div`
  display: flex;
  
  font-size: 15px;
  text-align: left;
  color: #7c7c7c;
  margin-top: 22px;
  font-weight: 500;
`;

export const StatNumber = styled.div`
  color: #303030;
  font-size: 15px;
  
  @media (min-width: 640px) {
    margin-right: 30px;
    margin-left: 10px;
  }
`;

export const MobileDescription = styled.div`
  line-height: 1.5rem;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 640px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0px 20px;
  
  @media (max-width: 640px) {
    padding: 0px;
    margin-bottom: 25px;
  }
`;

export const TopicInfo = styled.div`
  margin-left: 40px;
`;

export const Title = styled.div`
  font-size: 21px;
  font-weight: bold;
  color: #303030;
  
  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

export const FlexItem = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

export const TopicContentContainer = styled.div`
  display: flex;
  margin-top: 30px;
`;

export const StatElement = styled.div`
  display: flex;
  margin-top: 20px;
  margin-right: 30px;
  
  font-weight: 500;
  font-size: 13px;
  color: #9f9f9f;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    margin: 0px 5vw;
  }
`;

export const UserFollowButtonContainer = styled.div`
  margin-right: 7px;
  @media (min-width: 640px) {
    margin-bottom: 45px;
  }
`;

export const CameraButton = styled.div`
  position: relative;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover .camera_icon {
    visibility: visible;
  }
`;

export const CameraBoxWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  opacity: .7;
  width: 110px;
  height: 30px;
  background-color: black;
  display: flex;
  align-items: flex-end;
  color: white;
  padding: 0px 5px 5px 6px;
  font-size: 13px;
  font-weight: 700;
  visibility: hidden;
`;

export const CameraButtonIcon = styled(Icon)`
  color: white;
  font-size: 15px !important;
  margin-bottom: 1px !important;
`;
