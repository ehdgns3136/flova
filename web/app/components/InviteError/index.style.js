import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 400px;
  height: auto;
  background: white;
  border-radius: 6px;
  padding: 15px 25px 20px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  z-index: 1;
  font-weight: 500 !important;
`;

export const Description = styled.p`
  font-size: 1rem;
  text-align: center;
`;

export const GoBackButton = styled.button`
  background-color: ${(props) => props.theme.primaryColor};
  color: white;
  width: 100%;
  padding: 10px 0px 9px;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;

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

