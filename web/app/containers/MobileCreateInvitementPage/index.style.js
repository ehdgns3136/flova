import styled from 'styled-components';


export const Header = styled.div`
  margin-top: 20px;
  font-size: 28px;
  color: ${(props) => props.theme.paragraphColor};
  font-weight: bold;
  line-height: 45px;

  span {
    font-family: ${(props) => props.theme.logoFont};
    font-weight: 500;
  }
`;

export const MobileContent = styled.div`
  padding: 100px 30px 0px;
  text-align: center;
`;

export const Description = styled.div`
  font-size: 14px !important;
  color: #535353;
  line-height: 20px;
  margin: 10px 0px;
  span {
    font-family: ${(props) => props.theme.logoFont};
    font-weight: 500;
  }
`;

export const NameInput = styled.input`
  background-color: #F2F2F2;
  border: 1px #e2e2e2 solid;
  border-radius: 4px;
  width: 100px;
  height: 30px;
  text-align: center;
`;

export const MakeLinkButton = styled.button`
  width: 100%;
  margin-top: 10px;
  padding: 8px 0px 7px;
  color: white;
  background-color: ${(props) => props.isLoading ? props.theme.primaryDarkerColor : props.theme.primaryColor};
  border-radius: 2px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  trainsition: background-color .1s ease;

  body.noTouchDevice &:hover {
    background-color: ${(props) => props.theme.primaryDarkerColor};
  }

  body.touchDevice &:active {
    background-color: ${(props) => props.theme.primaryDarkerColor};
  }

  &:disabled {
    opacity: 0.5;

    &:hover, &:active {
      background-color: ${(props) => props.theme.primaryColor};
    }
  }
`;


export const SuccessMessage = styled.div`
  margin: 10px 0px 5px;
  display: flex;
  width: 100%;
  padding: 10px 15px;
  border-radius: 1px;
  border: 1px solid ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.primaryColor};
  align-items: center;
  background-color: #F7FFFD;

  @media (max-width: 640px) {
    background-color: transparent;
  }
`;

export const CheckIcon = styled.i`
  font-size: 20px;
  padding-bottom: 5px;
`;

export const SuccessMessageContent = styled.div`
  margin-left: 15px;
  font-size: 12px;
  font-weight: bold;
  line-height: 18px;
  text-align: left;
`;


const getBackgroundColor = (type) => {
  switch (type) {
    case 'copy':
      return '#888888';
    case 'kakao':
      return '#FEE934';
    default:
      return null;
  }
};

const getColor = (type) => {
  switch (type) {
    case 'copy':
      return 'white';
    case 'kakao':
      return '#3B1E1F';
    default:
      return null;
  }
};

const getActiveBackgroundColor = (type) => {
  switch (type) {
    case 'copy':
      return '#555555';
    case 'kakao':
      return '#E0CE38';
    default:
      return null;
  }
};

export const MobileButton = styled.button`
  background-color: ${(props) => getBackgroundColor(props.type)};
  height: 40px;
  width: 100%;
  color: ${(props) => getColor(props.type)};
  font-weight: bold;
  text-align: center;
  margin: 10px 0px 0px;
  padding: 6px 0px 5px;
  border-radius: 3px;

  &:active {
    background-color: ${(props) => getActiveBackgroundColor(props.type)};
  }
`;
