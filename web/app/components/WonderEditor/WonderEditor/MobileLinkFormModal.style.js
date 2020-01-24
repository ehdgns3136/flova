import styled from 'styled-components';


export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const LinkFormContainer = styled.form`
  width: 100%;
  padding: 8px 10px 8px 10px;
`;

export const Label = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 14px;
`;

export const UrlInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #CFCFCF;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
  padding: 0px 10px;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ActionButton = styled.button`
  border: 1px solid ${(props) => (props.desaturateColor) ? '#B0B0B0' : '#2BC3A3'};
  width: 80px;
  height: 30px;
  border-radius: 15px;
  color: #737373;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  font-family: ${(props) => props.theme.primaryFont};
  margin-left: 14px;
  
  body.noTouchDevice &:hover {
    border: 1px solid ${(props) => (props.desaturateColor) ? '#bfbfbf' : '#43d6b6'};
    color: #8c8c8c;
  }
`;
