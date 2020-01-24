import styled from 'styled-components';
import { Link } from 'react-router';

export const PaddingTopDiv = styled.div`
  padding-top: 95px;
  @media (max-width: 1008px) {
    padding-top: 65px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Footer = styled.footer`
  font-size: 11px;
  text-align: center;
  margin-bottom: 20px;
  line-height: 20px;
  color: grey;
`;

export const Container = styled.div`
  max-width: 600px;
  width: 100%;
  box-sizing: border-box;
`;

export const Divider1 = styled.div`
  margin: 25px 0px 14px 0px;
  height: 1px;
  border-bottom: solid 1px #dbdbdb;
`;

export const Divider2 = styled.div`
  margin: 0px 0px 34px 0px;
  height: 1px;
  border-bottom: solid 1px #dbdbdb;
`;

export const GreyCenteredDiv = styled.div`
  padding: 50px 0px 150px 0px;
  text-align: center;
  color: grey;
  line-height: 20px;
  font-size: 15px;
`;

export const StyledIcon = styled.i`
  font-size: 70px;
  margin-bottom: 20px;
`;

export const ArrowRight = styled.i`
  margin-left: 7px;
`;

export const MoreAnswer = styled(Link)`
  color: ${(props) => props.theme.primaryColor};
  text-decoration: none;
  
  body.noTouchDevice &:hover {
    color: ${(props) => props.theme.primaryDarkerColor};
  }
  
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  margin: 40px 0px 50px 0px;
`;
