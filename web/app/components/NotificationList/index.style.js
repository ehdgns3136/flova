import styled from 'styled-components';


export const NotificationListContainer = styled.div`
  padding-top: 110px;
  padding-bottom: 20px;
  max-width: 700px;
  margin: 0 auto;
  
  @media (max-width: 1008px) {
    padding-top: 50px;
  }
`;

export const Header = styled.div`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 24px;
  
  @media (max-width: 1008px) {
    display: none;
  }
`;

export const LoaderWrapper = styled.div`
  position: relative;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

export const GreyCenteredDiv = styled.div`
  padding-top: 60px;
  width: 100%;
  text-align: center;
  color: grey;
  font-size: 18px;
`;
