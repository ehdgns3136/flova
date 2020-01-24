import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  height: 100%;
`;

export const Contents = styled.div`
  max-width: 700px;
  margin: 20px 0px;
  width: 100%;

  @media(max-width: 640px) {
    margin: 14px 0px;
  }
`;
