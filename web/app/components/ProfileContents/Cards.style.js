import styled from 'styled-components';

export const LoaderWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 200px;
`;

export const GreyCenteredDiv = styled.div`
  color: grey;
  text-align: center;
  padding-top: 70px;
  width: 100%;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  
  @media (min-width: 640px) {
    margin-left: 10px;
  }
`;
