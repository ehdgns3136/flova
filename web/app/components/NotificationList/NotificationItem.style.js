import styled from 'styled-components';


export const NotificationContainer = styled.div`
  font-size: 12px;
  color: #090909 !important;
  background-color: ${(props) => props.isRead ? 'inherit' : '#eafaf7'} !important;
  padding: 16px 8px 4px 8px;
  min-height: 80px;
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
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  margin-right: 20px;
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
  font-size: 13px;
  word-break: break-all;
  line-height: 1.2;
  margin-bottom: 4px;
  color: ${(props) => props.theme.paragraphColor};
`;

export const DateMeta = styled.div`
  flex-grow: 0;
  font-size: 12px;
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
