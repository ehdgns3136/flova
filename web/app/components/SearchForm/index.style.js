/**
 * Created by donghoon on 17. 11. 1.
 */
import styled from 'styled-components';
import { Loader, Icon, Dimmer } from 'semantic-ui-react';


export const RelativeDiv = styled.div`
  position: relative;
`;

export const StyledInput = styled.input`
  background-color: #F4F4F4;
  padding: 5px 30px 5px 20px;
  width: 400px;
  height: 35px;
  border-radius: 21px;
  font-size: 14px;
  transition: width 0.2s cubic-bezier(0.4, 0, 1, 1);
  
  &:focus {
    background-color: white;
    border: 1px solid #CBD2D1;
    width: 600px;
    outline: none;    
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  right: 8px;
  top: 0px;
  width: 25px;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const SearchResultsContainer = styled.div`
  position: absolute;
  top: 52px;
  left: 0px;
  width: 100%;
`;

export const StyledDimmer = styled(Dimmer)`
  z-index: 100 !important;
  background-color: rgba(0,0,0,0.75) !important;
`;

export const MobileContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  background: white;
  z-index: 1001;
  min-height: 100vh;
`;

export const MobileInputContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  background: white;
  display: flex;
  padding: 11px 7px 12px 8px;
`;

export const MobileIconContainer = styled.div`
  position: absolute;
  top: 15px;
  left: 48px;
`;

export const MobileSearchIcon = styled(Icon)`
  font-size: 14px !important;
  color:#8f8f8f !important;
`;

export const MobileLoader = styled(Loader)`
  margin-top: 17px !important;
  margin-left: 6px !important;
  font-size: 12px !important;
`;

export const MobileStyledInput = styled.input`
  background:#e8e8e8;
  border-radius:4px;
  height: 30px;
  font-size: 14px;
  padding: 4px 5px 5px 30px;
  width: 90%;
  
  &:focus {
    background: white;
    border: 1px solid #c8c8c8;
  }
`;

export const MobileSearchResultsContainer = styled.div`
  position: absolute;
  top: 52px;
  left: 0px;
  width: 100%;
`;

export const Action = styled.div`
  width: 50px;
  height: 100%;
  margin-left: -8px;
  margin-right: -10px;
`;

export const ActionButton = styled.button`
  width: 100%;
  height: 100%;
  font-size: 18px;
  padding-top: 5px;
  cursor: pointer;
`;
