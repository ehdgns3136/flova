import styled from 'styled-components';

export const LoaderContainer = styled.div`
  display: ${(props) => !props.hasMore ? 'none' : 'block'};
  position: relative;
  height: 60px;
`;
