import styled from 'styled-components';


export const PersonalInfoFormContainer = styled.div`
  padding-top: 65px;
  background: white;
`;

export const MessageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  flex-direction: column;
  color: grey;
  font-size: 15px;
  
  @media (min-width: 640px) {
    justify-content: flex-start;
    font-size: 20px;
    padding-top: 200px;
  }
`;

export const StyledIcon = styled.i`
  font-size: 70px;
  margin-bottom: 10px;
`;
