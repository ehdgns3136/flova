/**
 * Created by donghoon on 17. 12. 5.
 */
import styled from 'styled-components';
export const Container = styled.div`
  height: 428px;
  overflow: auto;
  @media (max-width: 640px) {
    height: 100%;
  }
  &::-webkit-scrollbar { 
    display: none; 
  }
`;

export const HideScrollBar = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
`;
