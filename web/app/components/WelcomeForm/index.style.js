import styled from 'styled-components';
import { Link } from 'react-router';

export const FlexContainer = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 340px;
  height: auto;
  background: white;
  border-radius: 6px;
  padding: 30px 30px 30px;
  display: flex;
  flex-direction: column;
  font-weight: 500 !important;
  align-items: center;
  color: black;
  z-index: 1;
  @media (max-width: 640px) {
    width: 100vw;
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  text-align: center;
  color: ${(props) => props.theme.paragraphColor};
  margin-bottom: 20px;

  span {
    font-family: ${(props) => props.theme.logoFont};
  }
`;

export const Welcome = styled.p`
  font-size: 1rem;
  text-align: center;
  color: ${(props) => props.theme.paragraphColor};
  margin-bottom: 15px;
`;

export const MoveToSignUpButton = styled(Link) `
  display: block;
  background-color: ${(props) => props.theme.primaryColor};
  color: white;
  width: 100%;
  height: 45px;
  padding: 0.7em 1em 0.7em 1em;
  font-size: 16px;
  margin: 10px 0px 0px;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  text-align: center;

  body.noTouchDevice &:hover {
    background-color: ${(props) => props.theme.primaryDarkerColor};
    color: white;
  }

  body.touchDevice &:active {
    background-color: ${(props) => props.theme.primaryDarkerColor};
  }
`;
