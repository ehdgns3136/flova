import styled from 'styled-components';


export const IntroSignUpPageContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 640px) {
    padding: 0px;
  }
`;

export const BackgroundImage = styled.img`
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 0;
  filter: brightness(90%);
  object-fit: cover;
  
  @media (max-width: 640px) {
    filter: opacity(0%);
  }
`;
