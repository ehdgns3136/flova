import styled from 'styled-components';

export const Box = styled.div`
  position: relative;
  background-color: #ffffff;
  margin: 10px 0px;
  border: 1px #e9e9e9 solid;
  padding: 9px 16px 10px 16px;
  width: 100%;
  color: #303030;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h2`
  margin-bottom: 6px;
  font-size: 15px;
  text-align: left;
`;

export const Description = styled.p`
  font-size: 14px;
  border-bottom: solid 1px #dcdcdc;
  margin: 0px -16px;
  padding: 0px 16px 17px 16px;
`;


export const InviteButton = styled.button`
  color: ${(props) => props.theme.primaryColor};
  padding: 8px 0px 0px 0px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  
  font-size: 14px;
  font-weight: bold;
  color: #2bc3a3;
  
  &:hover {
    color: ${(props) => props.theme.primaryDarkerColor};
  }
`;
