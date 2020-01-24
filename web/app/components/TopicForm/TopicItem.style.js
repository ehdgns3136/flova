import styled from 'styled-components';


export const TopicItemContainer = styled.div`
  width: 100px;
  height: 120px;
  margin: 0px 17px 16px 0px;
  cursor: pointer;

  body.noTouchDevice &:hover {
    filter: ${(props) => (props.selected ? 'unset' : 'brightness(50%)')} ;
  }
  
  @media (max-width: 640px) {
    width: 26vw;
    height: 30vw;
    margin-right: 4vw;
  }
`;

export const Image = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: white;
  background-image: ${(props) => ((props.selected ? 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),' : '') + `url(${props.backgroundImg})`)};
  background-size: cover;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 640px) {
    width: 26vw;
    height: 26vw;
  }
`;

export const Name = styled.div`
  width: 100px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #303030;
  
  @media (max-width: 640px) {
    width: 26vw;
  }
`;
