/**
 * Created by donghoon on 17. 8. 15.
 */
/**
 * Created by donghoon on 17. 8. 9.
 */
import styled from 'styled-components';
import { List, Checkbox } from 'semantic-ui-react';
import Select from 'react-select';

export const ListItemWrapper = styled(List.Item)`
  background-color: #F8F8F8 !important;
  border-top: 1px solid rgba(34, 36, 38, 0.15) !important;
  padding-top: 13px !important;
  padding-bottom: 0px !important;
`;

export const CustomCheckbox = styled(Checkbox)`
  margin-top: 6px;
`;

export const SaveButton = styled.button`
  cursor: pointer;
  margin: 0 2px 0 2px;
  padding: 0.7em 1em 0.7em 1em;
  border-radius: 2px;
  box-shadow: 0 0 0 1.5px #2bc3a3 inset!important
  font-weight: 600;
  font-size: 11px;
  transition: all 0.2s ease;
  outline-width: 0;
  background-color: #2BC3A3 !important;
  color: white !important;
  body.noTouchDevice &:hover {
    background-color: #2cb296 !important;
    box-shadow: 0 0 0 1.5px #2cb296 inset!important
  }
`;

export const CancelButton = styled.button`
  cursor: pointer;
  margin: 0 2px 0 2px;
  padding: 0.7em 1em 0.7em 1em;
  border-radius: 2px;
  box-shadow: 0 0 0 1.5px #ced0d4 inset!important
  font-weight: 600;
  font-size: 11px;
  transition: all 0.2s ease;
  outline-width: 0;
  background-color: #f6f7f9 !important;
  color: #4b4f56 !important;
  body.noTouchDevice &:hover {
    background-color: #ededed !important;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px !important;
  padding-top: 15px !important;
  background-color: white;
`;

export const ErrorMessage = styled.p`
  display: ${(props) => (props.hidden ? 'none' : 'inherit')};
  margin-left: 110px !important;
  margin-top: -10px !important;
  margin-bottom: 7px !important;
  font-size: 12px;
  font-weight: 500;
  color: #ff8080;
`;

export const FieldWrapper = styled.div`
  padding: 0 10px;
  margin-bottom: 10px;
  color: black;
`;

export const FieldLabel = styled.label`
  display: block;
  margin-bottom: .28571429rem;
  font-size: .92857143em;
  font-weight: bold;
  color: ${(props) => (props.disabled) ? 'rgba(191, 191, 191, 0.87)' : 'black'}
`;

export const FieldSelectCreatable = styled(Select.Creatable)`
  width: 100%;
`;

export const FieldSelect = styled(Select)`
  width: 100%;
`;

export const InputWrapper = styled.input`
  border-radius: 4px;
  border: 1px solid #ccc
  color: #333;
  background-color: #fff;
  line-height: 34px;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Divider = styled.div`
  height: 1px;
  border-top: 1px solid rgba(34, 36, 38, 0.15)
`;
