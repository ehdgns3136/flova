/**
*
* AnnounceModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import WonderEditorView from 'components/WonderEditor/WonderEditorView';
import { createEmptyEditorState, safelyParseEditorStateString } from 'components/WonderEditor/utils/editor-state-utils';

import * as Style from './index.style';
import { firstAnswererAnnounce, over50CharacterAnnounce } from './announces';

class AnnounceModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    let title = '';
    let content = createEmptyEditorState();
    if (props.announceType) {
      const announce = {
        firstAnswerer: (firstAnswererAnnounce),
        over50Character: (over50CharacterAnnounce),
      }[props.announceType];
      title = announce.title;
      content = safelyParseEditorStateString(announce.content);
    }

    this.state = {
      announce: {
        title,
        content,
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.announceType) {
      const announce = {
        firstAnswerer: (firstAnswererAnnounce),
        over50Character: (over50CharacterAnnounce),
      }[nextProps.announceType];
      this.setState({
        announce: {
          title: announce.title,
          content: safelyParseEditorStateString(announce.content),
        },
      });
    }
  }

  render() {
    const { isAnnounceModalOpened, onCloseModalRequest } = this.props;
    return (
      <Style.CustomModal open={isAnnounceModalOpened}>
        <Style.CloseIcon name="close" onClick={onCloseModalRequest} />
        <Style.CustomHeader>{this.state.announce.title}</Style.CustomHeader>
        <Style.CustomContent>
          <WonderEditorView
            editorState={this.state.announce.content}
            readOnly
          />
        </Style.CustomContent>
      </Style.CustomModal>
    );
  }
}

AnnounceModal.propTypes = {
  isAnnounceModalOpened: PropTypes.bool.isRequired,
  onCloseModalRequest: PropTypes.func.isRequired,
  announceType: PropTypes.string.isRequired,
};

export default AnnounceModal;
