import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
`;

export const Wrapper = styled.div`
  height: auto;
  background: white;
  border-radius: 6px;
  max-width: 400px;
  width: 336px;
  padding: 24px 24px 20px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  z-index: 1;
  font-weight: 500 !important;

  @media (max-width: 640px) {
    width: 100vw;
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  text-align: center;
  font-weight: 400;
  margin-bottom: 3px;
  line-height: 1.5rem;
  color: #4e4e4e;

  span {
    font-family: ${(props) => props.theme.logoFont};
  }
`;

export const GoBackButton = styled.button`
  background-color: ${(props) => props.theme.primaryColor};
  color: white;
  width: 100%;
  padding: 0.7em 1em 0.7em 1em;
  margin-top: 30px;
  border-radius: 3px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  height: 45px;
  
  @media (min-device-width: 640px) {
    &:hover {
      background-color: ${(props) => props.theme.primaryDarkerColor};
    }
  }

  @media (max-device-width: 640px) {
    &:active {
      background-color: ${(props) => props.theme.primaryDarkerColor};
    }
  }
`;

