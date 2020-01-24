import styled from 'styled-components';

export const Container = styled.div`
  max-width: 400px;
`;

export const InputContainer = styled.div`
  margin-bottom: 15px;
  padding-right: ${(props) => props.mobile ? '0px' : '50px'};
  margin: ${(props) => props.mobile ? '' : '23px 0px 26px 0px'};
`;

export const InputElement = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin: 14px 0px;
`;

export const MobileCustomInput = styled.input`
  height: 40px;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  border: none;
  color: #303030;
  border-bottom: solid 1px #ededed;
  padding: 10px 0px;
  
  &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #aaaaaa;
  }
  &::-moz-placeholder { /* Firefox 19+ */
    color: #aaaaaa;
  }
  &:-ms-input-placeholder { /* IE 10+ */
    color: #aaaaaa;
  }
  &:-moz-placeholder { /* Firefox 18- */
    color: #aaaaaa;
  }
`;

export const MobileCustomButton = styled.button`
  cursor: pointer;
  padding: 0.7em 1em 0.7em 1em;
  border-radius: 4px;
  color: white;
  background-color: #2BC3A3;
  font-weight: 600;
  transition: all 0.2s ease;
  outline-width: 0;
  width: 100%;
  height: 45px;
  margin-top: 10px;
  font-size: 16px;
`;

export const CustomInput = styled.input`
  height: 28px;
  width: 160px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  border: solid 1px #b4b4b4;
  color: #303030;
  padding: 0px 10px;
  margin-left: 18px;
`;

export const CustomButton = styled.button`
  font-size: 15px;
  width: 99.2px;
  border: 1px solid ${(props) => props.cancel ? '#b0b0b0' : '#2bc3a3'};
  color: ${(props) => props.cancel ? '#b0b0b0' : '#2bc3a3'};
  height: 30px;
  cursor: pointer;
  border-radius: 15px;
  margin: 0px 10px;
  
  body.noTouchDevice &:hover {
    background: ${(props) => props.cancel ? 'rgba(0,0,0,0.02)' : 'rgba(43,195,163,0.05)'};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const Header = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #303030;
  margin: 14px 0px;
`;

export const Divider = styled.div`
  height: 1px;
  border-top: solid 1px #d4d4d4;
`;

