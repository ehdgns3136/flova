import styled from 'styled-components';

export const BlockContainer = styled.div`
  position: relative;
  padding-top: ${(props) => (props.type === 'code-block') ? ((props.codeBlockStart) ? '12px' : '0px') : '4px'};
  padding-bottom: ${(props) => (props.type === 'code-block') ? ((props.codeBlockEnd) ? '14px' : '0px') : '4px'};
  padding-right: ${(props) => (props.type === 'code-block') ? '18px' : '0px'};
  padding-left: ${(props) => (props.type === 'code-block') ? '18px' : '0px'};
  font-size: ${(props) => (props.type === 'code-block') ? '13px' : '15px'};
  font-family: ${(props) => (props.type === 'code-block') ? "'Droid Sans Mono', monospace" : props.theme.primaryFont};
  color: ${(props) => (props.type === 'code-block') ? '#444444' : props.theme.paragraphColor};
  min-height: ${(props) => (props.type === 'code-block') ? '18px' : '32px'};
  line-height: ${(props) => (props.type === 'code-block') ? '1.4' : '1.6'};
  border-top-left-radius: ${(props) => (props.codeBlockStart) ? '4px' : '0'};
  border-top-right-radius: ${(props) => (props.codeBlockStart) ? '4px' : '0'};
  border-bottom-left-radius: ${(props) => (props.codeBlockEnd) ? '4px' : '0'};
  border-bottom-right-radius: ${(props) => (props.codeBlockEnd) ? '4px' : '0'};
  display: ${(props) => (props.type === 'unordered-list-item') ? 'list-item' : 'block'};
  margin-top: ${(props) => (props.codeBlockStart) ? '8px' : '0'};
  margin-bottom: ${(props) => (props.codeBlockEnd) ? '8px' : '0'};
  margin-left: ${(props) => {
    if (props.type === 'unordered-list-item' || props.type === 'ordered-list-item') {
      switch (props.depth) {
        case 0:
          return '24px';
        case 1:
          return '44px';
        case 2:
          return '64px';
        default:
          return '24px';
      }
    }

    return '0px';
  }};
  list-style-type: ${(props) => {
    if (props.type === 'unordered-list-item') {
      switch (props.depth) {
        case 0:
          return 'disc';
        case 1:
          return 'circle';
        case 2:
          return 'square';
        default:
          return 'disc';
      }
    }

    return 'none';
  }};
  background-color: ${(props) => (props.type === 'code-block') ? 'rgba(0, 0, 0, 0.05)' : 'initial'};
  
  &:before {
    position: absolute;
    left: -34px;
    width: 30px;
    text-align: right;
    content: ${(props) => (props.type === 'ordered-list-item') ? `'${props.count}. '` : "''"};
  }
`;

export const StyledA = styled.a`
  color: #2b6dad;
  text-decoration: none;
  
  body.noTouchDevice &:hover {
    color: #2b6dad;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const ShowMore = styled.a`
  cursor: pointer;
  font-size: 15px;
  font-family: ${(props) => props.theme.primaryFont};
  color: ${(props) => props.theme.primaryColor};

  body.noTouchDevice &:hover {
    text-decoration: underline;
  }
`;

export const Image = styled.img`
  max-width: 100%;
`;
