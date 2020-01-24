import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';

export const ResultSegment = styled(Segment)`
  width: 100%;
  z-index: 1002;
  color: black;
  text-align: left;
  padding: 0px 0px 7px 0px !important;
  @media (max-width: 1008px) {
    border-bottom: 1px solid white !important;
  }
`;

export const RightAlignedDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 14px;
  padding-right: 9px;
  height: 53px;
  
  @media (max-width: 1008px) {
    width: 100%;
    justify-content: center;
    padding-right: 0px;
    padding-top: 7px;
  }
`;

export const ButtonMeta = styled.p`
  margin: 0px 10px 0px 0px;
  color: rgba(0,0,0,.6);
  font-size: 12px;
  
  @media (max-width: 1008px) {
    font-size: 14px;
    margin-right: 20px;
    margin-bottom: 3px;
  }
`;

export const TealButton = styled.button`
  font-size: 15px;
  border: 1.2px solid #2bc3a3;
  color: #2bc3a3;
  height: 30px;
  cursor: pointer;
  border-radius: 13px;
  padding: 5px 21px 5px 21px;
  margin-right: 7px;
  
  body.noTouchDevice &:hover {
    background: rgba(43,195,163,0.05);
  }
`;
