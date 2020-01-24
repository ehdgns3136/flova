/**
*
* WonderEditorView
*
*/

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Immutable, { fromJS } from 'immutable';
import Block from './Block';
import * as Style from './index.style';
import {
  getAttributeFromName,
  getSelectionInfo,
  blockToText,
  getNodeAndOffsetFromSelectionInfo,
  getChildNodeList,
  restoreChildsByNodeList,
  findChangeSegment,
} from '../utils/dom-utils';
import {
  isEditorStateEmpty,
  updateStylesAndOffsets,
  processEditorStateForOrderedList,
  processEditorStateForCodeBlock,
} from '../utils/editor-state-utils';
import {
  isImeKey,
  isKeyCommand,
  isKeyPrintable,
  isMacCommandKey,
} from '../utils/key-check-utils';
import {
  getBlockDataListFromClipboardEvent,
} from '../utils/copy-paste';
import {
  isSingleSelection,
} from '../utils/selection-info-utils';
import {
  updateEditorStateAfterPaste
} from '../utils/update-editor-state-utils';


class WonderEditorView extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.isFocusing = false;
    this.isComposing = false;
    this.blockRefMap = {};
    this.blockNodes = [];

    this.newTextBlockKeys = []; // text update해야하는 block들의 key
    this.shouldUpdateEditorState = false; // newEditorState를 반영해야하는지에 대한 indicator
    this.newEditorState = null; // 업데이트된 가장 최근 state. 내부적으로만 저장하고 나중에 반영.

    // this is for safari. composition start event triggered before key down event.
    this.isCompositionStartTriggered = false;
    this.isKeyDownTriggeredAfterCompositionStart = false;
    this.compositionStartSelectionInfo = null;

    // check가 필요한 selectionInfo들
    // a, b를 빠르게 치면 a keydown -> b keydown -> a keyup -> b keyup이 일어나면서 a keydown의 selectionInfo가 reset될 수 있음.
    // 그것을 방지하기위해 check가 필요한 selectionInfo들을 저장.
    this.needCheckSelectionInfos = [];

    // setState 하는 동안 keyEvent 방지
    this.preventKeyEvent = false;

    this.MacCommandKeyPressed = false;

    // this is for single line selection
    this.styleChanges = fromJS({
      remove: [],
      add: [],
    });
    this.selectionInfoOnStyleChange = null;

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleCompositionStart = this.handleCompositionStart.bind(this);
    this.handleCompositionEnd = this.handleCompositionEnd.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCut = this.handleCut.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.checkSelectionAndAddUpdateTasks = this.checkSelectionAndAddUpdateTasks.bind(this);
    this.getNewEditorState = this.getNewEditorState.bind(this);
    this.resetUpdateTasks = this.resetUpdateTasks.bind(this);
    this.emitEditorStateUpdateEmitEvent = this.emitEditorStateUpdateEmitEvent.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
  }

  componentDidMount() {
    if (this.props.readOnly) {
      return;
    }

    // save block nodes
    this.blockNodes = getChildNodeList(ReactDOM.findDOMNode(this));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.selectionInfo) {
      return true;
    }

    if (nextProps.selectionInfo.startBlockKey !== nextProps.selectionInfo.endBlockKey ||
      nextProps.selectionInfo.startOffset !== nextProps.selectionInfo.endOffset) {
      // safe for updating (조합중일 땐 multi selection이 될 수 없음)
      return true;
    }

    if (!this.props.selectionInfo) {
      return true;
    }

    return nextProps.editorState !== this.props.editorState;
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.readOnly) {
      return;
    }

    // save selection info
    // const newSelectionInfo = getSelectionInfo();
    // this.selectionInfo = newSelectionInfo || this.selectionInfo;

    // restore block nodes
    restoreChildsByNodeList(ReactDOM.findDOMNode(this), this.blockNodes);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.readOnly) {
      return;
    }

    // save block nodes
    this.blockNodes = getChildNodeList(ReactDOM.findDOMNode(this));

    if (!this.isFocusing) {
      return;
    }

    if (this.selectionInfoOnStyleChange) {
      const blockRef = this.blockRefMap[this.selectionInfoOnStyleChange.startBlockKey];
      if (blockRef) {
        const blockNode = ReactDOM.findDOMNode(blockRef);
        const changeSegment = findChangeSegment(blockNode);

        if (changeSegment) {
          const sel = document.getSelection();
          sel.collapse(changeSegment.firstChild, 1);
          return;
        }
      }
    }

    // restore selection info
    if (this.props.selectionInfo) {
      const startBlockRef = this.blockRefMap[this.props.selectionInfo.startBlockKey];
      const endBlockRef = this.blockRefMap[this.props.selectionInfo.endBlockKey];

      if (startBlockRef && endBlockRef) {
        const startBlockNode = ReactDOM.findDOMNode(startBlockRef);
        const endBlockNode = ReactDOM.findDOMNode(endBlockRef);

        let [anchorNode, anchorOffset] = getNodeAndOffsetFromSelectionInfo(startBlockNode, this.props.selectionInfo.startOffset);
        let [focusNode, focusOffset] = getNodeAndOffsetFromSelectionInfo(endBlockNode, this.props.selectionInfo.endOffset);

        // ios specific code (except firefox)
        const iOSorMac = /Mac|iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isFireFox = navigator.userAgent.toUpperCase().indexOf('FIREFOX') >= 0;
        if (iOSorMac && !isFireFox) {
          if (blockToText(startBlockNode) !== startBlockRef.props.block.get('text')) {
            console.log('different! ios bug!');

            if (anchorNode) {
              const anchorText = anchorNode.nodeValue;
              if (anchorText) {
                anchorNode.nodeValue = anchorText.substr(0, anchorOffset) + anchorText.substr(anchorOffset + 1, anchorText.length);
              }
            }
          }
        }

        // console.log('anchorNode', anchorNode);
        // console.log('anchorOffset', anchorOffset);
        // console.log('focusNode', focusNode);
        // console.log('focusOffset', focusOffset);
        // console.log('anchorNode.nodeValue', anchorNode.nodeValue);

        if (anchorNode && focusNode) {
          if (anchorNode.nodeValue) {
            anchorOffset = (anchorOffset <= anchorNode.nodeValue.length) ? anchorOffset : anchorNode.nodeValue.length;
          } else if (anchorNode.tagName === 'BR') {
            anchorOffset = 0;
          }

          if (focusNode.nodeValue) {
            focusOffset = (focusOffset <= focusNode.nodeValue.length) ? focusOffset : focusNode.nodeValue.length;
          } else if (focusNode.tagName === 'BR') {
            focusOffset = 0;
          }

          if ((anchorNode.tagName === 'IMG' && anchorOffset > 0) || (focusNode.tagName === 'IMG' && focusOffset > 0)) {
            return;
          }

          const sel = document.getSelection();
          sel.collapse(anchorNode, anchorOffset);
          sel.extend(focusNode, focusOffset);

          // firefox specific
          const isFireFox = navigator.userAgent.toUpperCase().indexOf('FIREFOX') >= 0;
          if (isFireFox && anchorNode.tagName === 'BR') {
            sel.collapse(anchorNode.parentNode, anchorOffset);
          }
        }
      }
    } else if (this.isFocusing && this.blockNodes.length > 0) { // required for placeholder focusing
      document.getSelection().collapse(this.blockNodes[0], 0);
    }
  }

  handleFocus(evt) {
    this.isFocusing = true;

    if (!this.props.readOnly) {
      this.forceUpdate();
    }
  }

  handleBlur(evt) {
    this.isFocusing = false;
    if (!this.props.readOnly) {
      this.emitEditorStateUpdateEmitEvent();
      this.forceUpdate();
    }
  }

  handleKeyDown(evt) {
    if (this.props.readOnly) {
      return;
    }

    // console.log('keydown event triggered!');
    // console.log('evt', evt);
    // console.log('keyCode', evt.keyCode);
    // console.log('which', evt.which);
    // console.log('key', evt.key);
    // console.log('type', evt.type);
    // console.log('ctrlKey', evt.ctrlKey);
    // console.log('metaKey', evt.metaKey);
    // console.log('shiftKey', evt.shiftKey);

    if (!this.isFocusing) {
      return;
    }

    if (this.preventKeyEvent) {
      return;
    }

    if (this.isCompositionStartTriggered) {
      this.isKeyDownTriggeredAfterCompositionStart = true;
    } else {
      this.isKeyDownTriggeredAfterCompositionStart = false;
    }

    const newSelectionInfo = getSelectionInfo() || this.props.selectionInfo;

    if (isKeyCommand(evt)) {
      this.props.onKeyCommand(evt, newSelectionInfo);
    } else if (isMacCommandKey(evt)) {
      this.MacCommandKeyPressed = true;
    } else if (this.MacCommandKeyPressed || evt.ctrlKey) {
      this.props.onShortcut(evt);
    } else { // maybe charcter
      // console.log('newSelectionInfo', newSelectionInfo);

      if (isKeyPrintable(evt)) {
        // preventDefault if image
        const startBlockRef = this.blockRefMap[newSelectionInfo.startBlockKey];
        const endBlockRef = this.blockRefMap[newSelectionInfo.endBlockKey];
        const startBlockNode = ReactDOM.findDOMNode(startBlockRef);
        const endBlockNode = ReactDOM.findDOMNode(endBlockRef);

        const startBlockNodeType = getAttributeFromName(startBlockNode, 'data-type');
        const endBlockNodeType = getAttributeFromName(endBlockNode, 'data-type');

        if (startBlockNodeType === 'image' || endBlockNodeType === 'image') {
          evt.preventDefault();
          this.props.onKeyCommand({
            which: 13,
            preventDefault: () => null,
          }, newSelectionInfo);
        }
      }

      this.needCheckSelectionInfos.push(newSelectionInfo);
    }
  }

  handleKeyPress(evt) {
    // console.log('key press event triggered!');
    // console.log('key', evt.key);
    // console.log('key code', evt.keyCode);
    // console.log('which', evt.which);
    // console.log('charCode', evt.charCode);
    // console.log('isComposing', evt.isComposing);
    //
    // console.log('key press native event');
    // console.log('key', evt.nativeEvent.key);
    // console.log('key code', evt.nativeEvent.keyCode);
    // console.log('which', evt.nativeEvent.which);
    // console.log('charCode', evt.nativeEvent.charCode);
    // console.log('isComposing', evt.nativeEvent.isComposing);
    // console.log('keydown iscomposing', evt.nativeEvent.isComposing);

    if (!this.isFocusing) {
      return;
    }

    // firefox specific
    const isFireFox = navigator.userAgent.toUpperCase().indexOf('FIREFOX') >= 0;

    if (isFireFox && isKeyCommand(evt)) {
      const newSelectionInfo = getSelectionInfo() || this.props.selectionInfo;

      this.props.onKeyCommand(evt, newSelectionInfo);
    }
  }

  handleKeyUp(evt) {
    if (this.props.readOnly) {
      return;
    }

    // console.log('key up event triggered!');
    // console.log('keyCode', evt.keyCode);
    // console.log('which', evt.which);
    // console.log('key', evt.key);
    // console.log('type', evt.type);

    if (!this.isFocusing) {
      return;
    }

    if (isMacCommandKey(evt)) {
      this.MacCommandKeyPressed = false;
    }

    if (this.isKeyDownTriggeredAfterCompositionStart) {
      // this is for safari
      this.checkSelectionAndAddUpdateTasks(this.compositionStartSelectionInfo, this.isCompositionStartTriggered);
    }

    this.needCheckSelectionInfos.forEach((selectionInfo) => {
      // console.log('checking selectionInfo', selectionInfo);
      this.checkSelectionAndAddUpdateTasks(selectionInfo, this.isCompositionStartTriggered);
    });

    this.needCheckSelectionInfos = [];

    this.isCompositionStartTriggered = false;
    this.isKeyDownTriggeredAfterCompositionStart = false;

    // update editorState if safe
    if (evt.key !== 'Unidentified' && !this.isComposing && isKeyPrintable(evt) && !isImeKey(evt)) {
      this.emitEditorStateUpdateEmitEvent();
    }
  }

  handleCompositionStart(evt) {
    if (this.props.readOnly) {
      return;
    }

    if (!this.isFocusing) {
      return;
    }

    // console.log('composition start event triggered!');
    this.isComposing = true;
    this.isCompositionStartTriggered = true;
    this.compositionStartSelectionInfo = getSelectionInfo();
  }

  handleCompositionEnd(evt) {
    if (this.props.readOnly) {
      return;
    }

    if (!this.isFocusing) {
      return;
    }

    // console.log('composition end event triggered!');
    this.isComposing = false;
  }

  handleSelect(evt) {
    if (this.props.readOnly) {
      return;
    }

    if (!this.isFocusing) {
      return;
    }

    if (this.preventKeyEvent) {
      return;
    }

    const newSelectionInfo = getSelectionInfo();

    if (newSelectionInfo && this.props.selectionInfo) {
      // check if selection line changed
      if (this.props.selectionInfo.startBlockKey === this.props.selectionInfo.endBlockKey &&
          newSelectionInfo.startBlockKey === newSelectionInfo.endBlockKey &&
          this.props.selectionInfo.startBlockKey !== newSelectionInfo.startBlockKey) {
        this.emitEditorStateUpdateEmitEvent();
      } else if (newSelectionInfo.startBlockKey !== newSelectionInfo.endBlockKey ||
                  newSelectionInfo.startOffset !== newSelectionInfo.endOffset) {
        this.emitEditorStateUpdateEmitEvent();
      }
    }

    if (!this.selectionInfoOnStyleChange
      || !isSingleSelection(newSelectionInfo)
      || newSelectionInfo.startBlockKey !== this.selectionInfoOnStyleChange.startBlockKey
      || newSelectionInfo.startOffset !== this.selectionInfoOnStyleChange.startOffset) {
      this.styleChanges = this.styleChanges.set('add', fromJS([])).set('remove', fromJS([]));
      this.selectionInfoOnStyleChange = null;
    }

    if (newSelectionInfo) {
      this.props.onSelectionChange(newSelectionInfo);
    }
  }

  handleCut(evt) {
    if (this.props.readOnly) {
      return;
    }

    if (!this.isFocusing) {
      return;
    }

    this.needCheckSelectionInfos.push(getSelectionInfo());
  }

  handlePaste(evt) {
    if (this.props.readOnly) {
      return;
    }

    if (!this.isFocusing) {
      return;
    }

    evt.preventDefault();

    this.needCheckSelectionInfos.forEach((selectionInfo) => {
      this.checkSelectionAndAddUpdateTasks(selectionInfo, this.isCompositionStartTriggered);
    });
    this.needCheckSelectionInfos = [];

    const blockDataList = getBlockDataListFromClipboardEvent(evt);

    const editorState = this.getNewEditorState();
    const selectionInfo = getSelectionInfo() || this.props.selectionInfo;

    const [newEditorState, newSelectionInfo] = updateEditorStateAfterPaste(editorState, selectionInfo, blockDataList);

    this.props.onEditorStateUpdate(newEditorState, this.resetUpdateTasks);
    this.props.onSelectionChange(newSelectionInfo);
  }

  checkSelectionAndAddUpdateTasks(selectionInfo, isComposition = false) { // update this.newTextBlockKeys, this.shouldUpdateEditorState, this.newEditorState
    // check if blocks should be removed
    // console.log('check should remove blocks. selection info: ', selectionInfo);

    if (!selectionInfo) {
      return;
    }

    const startBlockKey = selectionInfo.startBlockKey;
    const endBlockKey = selectionInfo.endBlockKey;
    let newTextBlockKey = startBlockKey;

    if (startBlockKey !== endBlockKey) {
      let startBlock = ReactDOM.findDOMNode(this.blockRefMap[startBlockKey]);
      let endBlock = ReactDOM.findDOMNode(this.blockRefMap[endBlockKey]);
      const thisNode = ReactDOM.findDOMNode(this);

      // console.log('startBlock', startBlock);
      // console.log('endBlock', endBlock);
      // console.log('thisNode', thisNode.cloneNode(true));

      if (isComposition || !thisNode.contains(startBlock) || !thisNode.contains(endBlock)) {
        // 확실하게 update를 하기 위해서 실제로 removed 되었는지 확인.
        // handleCompositionStart에서 이 함수를 부를 경우, 확실하게 remove해도 상관 없음.
        // 그리고 composition event는 dom update가 이루어지기 전에 불리기 때문에 제대로 조건문을 통과하려면 isCompositionEvent or 조건이 필요함.
        // console.log('should remove blocks!', startBlockKey, endBlockKey);

        // for accumulating updates
        this.newEditorState = (this.shouldUpdateEditorState) ? this.newEditorState : this.props.editorState;

        let startBlockIndex = this.newEditorState.findIndex((value) => (value.get('key') === startBlockKey));
        let endBlockIndex = this.newEditorState.findIndex((value) => (value.get('key') === endBlockKey));

        if (startBlockIndex !== -1 && endBlockIndex !== -1) { // index가 유효할 때만
          // swap indexes if startBlockIndex is bigger than endBlockIndex
          if (startBlockIndex > endBlockIndex) {
            newTextBlockKey = endBlockKey;

            [startBlockIndex, endBlockIndex] = [endBlockIndex, startBlockIndex];
            [startBlock, endBlock] = [endBlock, startBlock];
          }

          // if last block not removed
          if (thisNode.contains(endBlock)) {
            endBlockIndex -= 1;

            // if first block removed (firefox)
            if (!thisNode.contains(startBlock)) {
              startBlockIndex -= 1;
              newTextBlockKey = this.newEditorState.get(endBlockIndex).get('key');
            }
          } else if (!thisNode.contains(endBlock)) { // firefox
            newTextBlockKey = null;

            const startBlockData = this.newEditorState.get(startBlockIndex);

            const sel = document.getSelection();

            let newText;
            if (sel.anchorNode && sel.anchorNode.textContent) {
              newText = sel.anchorNode.textContent;
            } else {
              newText = '';
            }

            this.newEditorState = this.newEditorState.set(startBlockIndex, startBlockData.set('text', newText));
            this.shouldUpdateEditorState = true;

            this.props.onSelectionChange({
              startBlockKey: startBlockData.get('key'),
              startOffset: sel.anchorOffset,
              endBlockKey: startBlockData.get('key'),
              endOffset: sel.focusOffset,
            });
          }

          if (startBlockIndex !== endBlockIndex) {
            this.newEditorState = this.newEditorState.splice(startBlockIndex + 1, endBlockIndex - startBlockIndex);
          }

          // console.log('this.newEditorState updated!', this.newEditorState.toJS());

          this.shouldUpdateEditorState = true;
        } else {
          newTextBlockKey = null; // 유효하지 않았을 때는 newTextBlockKey 추가 안 하기 위함.
        }
      }
    }

    // add newTextBlockKeys if not already exists
    if (newTextBlockKey !== null && this.newTextBlockKeys.indexOf(newTextBlockKey) === -1) {
      this.newTextBlockKeys.push(newTextBlockKey);
      // console.log('newTextBlockKeys added!', this.newTextBlockKeys);
    }
  }

  getNewEditorState() {
    this.newEditorState = (this.shouldUpdateEditorState) ? this.newEditorState : this.props.editorState;

    // update new text blocks
    this.newTextBlockKeys.forEach((blockKey) => {
      const block = ReactDOM.findDOMNode(this.blockRefMap[blockKey]);
      const blockText = blockToText(block);

      const blockIndex = this.newEditorState.findIndex((value) => (value.get('key') === blockKey));

      if (blockIndex !== -1) {
        let blockData = this.newEditorState.get(blockIndex);

        if (blockData.get('text') !== blockText) {
          blockData = updateStylesAndOffsets(blockData, block, this.blockRefMap[blockKey].nodeTree, blockText.length);

          this.props.onSelectionChange(getSelectionInfo()); // update selectionInfo after offset update

          blockData = blockData.set('text', blockText);
        }

        if (blockData !== this.newEditorState.get(blockIndex)) {
          this.newEditorState = this.newEditorState.set(blockIndex, blockData);
        }
      }
    });

    this.newTextBlockKeys = [];

    return this.newEditorState;
  }

  resetUpdateTasks() {
    this.shouldUpdateEditorState = false;
    this.newEditorState = null;
  }

  emitEditorStateUpdateEmitEvent() {
    const newEditorState = this.getNewEditorState();

    this.props.onEditorStateUpdate(newEditorState, this.resetUpdateTasks);
  }

  handleImageClick(blockKey) {
    const newSelectionInfo = {
      startBlockKey: blockKey,
      startOffset: 0,
      endBlockKey: blockKey,
      endOffset: 0,
    };

    this.props.onSelectionChange(newSelectionInfo, () => {
      this.forceUpdate();
    });
  }

  render() {
    let shouldDisplayPlaceholder = !this.isFocusing && !this.props.readOnly && isEditorStateEmpty(this.props.editorState);

    const ui = navigator.userAgent.toLowerCase();
    if (ui.indexOf('firefox') > -1 || ui.indexOf('msie') > -1 || ui.indexOf('trident') > -1) { // firefox or ie
      shouldDisplayPlaceholder = false;
    }

    const processedEditorState = processEditorStateForCodeBlock(processEditorStateForOrderedList(this.props.editorState));

    return (
      <Style.WonderEditorViewContainer
        contentEditable={!this.props.readOnly}
        spellCheck={false}
        suppressContentEditableWarning
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
        onKeyUp={this.handleKeyUp}
        onCompositionStart={this.handleCompositionStart}
        onCompositionEnd={this.handleCompositionEnd}
        onSelect={this.handleSelect}
        onCut={this.handleCut}
        onPaste={this.handlePaste}
      >
        {
          shouldDisplayPlaceholder ? (
            <Style.Placeholder contentEditable={false}>{this.props.placeholder}</Style.Placeholder>
          ) : null
        }
        {
          processedEditorState.map((block) => (
            <Block
              key={block.get('key')}
              block={block}
              styleChanges={(this.selectionInfoOnStyleChange && block.get('key') === this.selectionInfoOnStyleChange.startBlockKey) ? this.styleChanges : null}
              selectionInfoOnStyleChange={this.selectionInfoOnStyleChange}
              onShowMore={this.props.onShowMore}
              readOnly={this.props.readOnly}
              handleImageClick={this.handleImageClick}
              ref={(node) => { this.blockRefMap[block.get('key')] = node; }}
            />))
        }
      </Style.WonderEditorViewContainer>
    );
  }
}

WonderEditorView.propTypes = {
  editorState: PropTypes.instanceOf(Immutable.Iterable),
  selectionInfo: PropTypes.object,
  onEditorStateUpdate: PropTypes.func,
  onSelectionChange: PropTypes.func,
  handleDelete: PropTypes.func,
  onKeyCommand: PropTypes.func,
  onShortcut: PropTypes.func,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  onShowMore: PropTypes.func, // if editorstate was trimmed
};

WonderEditorView.defaultProps = {
  readOnly: true,
};

export default WonderEditorView;
