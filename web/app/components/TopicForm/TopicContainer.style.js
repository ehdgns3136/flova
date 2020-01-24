import styled from 'styled-components';


export const TopicContainer = styled.div`
  width: 648px;
  height: 300px;
  position: relative;
  overflow-y: auto;
  margin: 15px 0px 20px 0px;
  padding: 0px 0px 0px 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0,0,0,0.7);
  }

  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }
  
  @media (max-width: 640px) {
    width: 100vw;
    height: 80vh;
    padding: 0px 0px 0px 20px;
  }
`;
