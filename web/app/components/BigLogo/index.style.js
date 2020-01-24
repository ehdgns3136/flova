import styled from 'styled-components';


export const LogoContainer = styled.div`
  font-family: ${(props) => props.theme.logoFont};
  font-size: 4rem;
  font-weight: 700;
  margin: 0px 0px 6px 0px;
  color: ${(props) => props.theme.primaryColor}
  position: relative;
  height: 72px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
`;

export const Beta = styled.div`
  color: #aaaaaa;
  font-size: 1rem;
  font-weight: 600;
  font-style: italic;
  position: absolute;
  top: 20%;
  right: -22%;
`;
