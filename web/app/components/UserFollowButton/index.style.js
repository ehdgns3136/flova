/**
 * Created by donghoon on 17. 10. 23.
 */
import styled from 'styled-components';

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
