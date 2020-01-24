import styled from 'styled-components';


export const NotificationContainer = styled.div`
  font-size: 12px;
  color: #090909 !important;
  background-color: ${(props) => props.isRead ? 'inherit' : '#eafaf7'} !important;
  padding: 12px 0px 4px 4px;
  min-height: 60px;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
  display: flex;
  align-items: flex-start;

  body.noTouchDevice &:hover {
    background-color: ${(props) => props.isRead ? '#F8F8F8' : '#E2F1EE'} !important;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ProfileImage = styled.img`
  width: 38px;
  height: 38px;
  min-width: 38px;
  min-height: 38px;
  margin-right: 12px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, .1);
`;

export const RightContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const NotificationText = styled.div`
  flex-grow: 1;
  margin: 0;
  font-size: 12px;
  word-break: break-all;
  line-height: 1.2;
  color: ${(props) => props.theme.paragraphColor};
`;

export const DateMeta = styled.div`
  flex-grow: 0;
  font-size: 11px;
  color: ${(props) => props.theme.metaColor};
  text-align: left;
`;

export const BoldText = styled.span`
  font-weight: 600;
`;

export const BlueText = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.linkColor};
`;
