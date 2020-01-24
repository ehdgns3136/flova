import styled from 'styled-components';

export const PaddingTopDiv = styled.div`
  padding-top: 60px;

  @media (max-width: 1008px) {
    padding-top: 50px;
  }
`;

export const LoaderWrapper = styled.div`
  position: relative;
  padding-top: 200px;
  background: white;
  height: 100vh;
`;

export const GreyCenteredDiv = styled.div`
  color: grey;
  text-align: center;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  flex-wrap: wrap;
  background-color: #FFFFFF;
  border-bottom: 1px solid #dbdbdb;

  @media (max-width: 1008px) {
    display: inline-block;
    background-color: #FFFFFF;
  }
`;

export const ProfileContentsContainer = styled.div`
  @media (min-width: 1008px) {
    width: 580px;
    margin-right: 30px;
  }

  @media (max-width: 640px) {
    margin: 0;
    width: 100%;
  }

  @media (max-width: 1008px) {
    margin: 0 auto;
    width: 100%;
    max-width: 700px;
  }
`;

export const GridRight = styled.div`
  width: 280px;
`;

export const FlexDiv = styled.div`
  justify-content: center;
  display: flex;
  max-width: 870px;
  margin: 0 auto;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #dbdbdb;  
  background-color: white;
  width: 100vw;
  height: 40px;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 640px) {
    height: 40px;
  }

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  max-width: 870px;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  @media (max-width: 640px) {
    padding-left: 10px;
  }

  @media (max-width: 1008px) {
    max-width: 700px;
  }
`;

export const Item = styled.button`
  color: ${(props) => props.active ? '#2bc3a3' : '#4b4b4b'};
  padding: 0px 19px 1px 19px;
  display: flex;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  align-items: center;

  body.noTouchDevice &:hover {
    color: #2bc3a3;
  }

  @media (max-width: 640px) {
    font-size: 13px;
    padding: 0 15px;
  }
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
