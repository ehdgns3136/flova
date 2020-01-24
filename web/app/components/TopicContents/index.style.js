import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #dbdbdb;  
  background-color: white;
  height: 40px;
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  padding: 0px 10px;
  width: 700px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.active ? '#2bc3a3' : '#4b4b4b'};
  padding: 0px 15px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;

  body.noTouchDevice &:hover {
    color: #2bc3a3;
  }
  
  @media (max-width: 640px) {
    font-size: 13px;
  }
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  width: 670px;
`;

export const Contents = styled.div`
  max-width: 700px;
  margin: 20px 0px;
  width: 100%;
  
  @media (max-width: 640px) {
    margin: 15px 0px;
  }
`;
