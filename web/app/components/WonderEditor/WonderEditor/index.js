/**
*
* WonderEditor
*
*/

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Immutable, { Stack, Map } from 'immutable';
import MediaQuery from 'react-responsive';

import { Icon } from 'semantic-ui-react';

import request from 'utils/request';
import requestS3Upload from 'utils/s3-upload';

import LinkForm from './LinkForm';
import MobileLinkFormModal from './MobileLinkFormModal';

import WonderEditorView from '../WonderEditorView';
import * as Style from './index.style';

import {
  createEmptyEditorState,
  checkStyleContainsSelection,
  styleText,
  removeStyle,
  getBlockDataFromBlockKey,
  getOverlappedUrlFromSelection,
  checkTypeEquals,
  checkSelectionContainsListItem,
  checkCodeBlockContainsSelection,
  } from '../utils/editor-state-utils';
import {
  getSelectionInfo,
  // findNearestSegmentNode,
  // createSegment,
} from '../utils/dom-utils';
import {
  isSingleSelection,
  nextSelectionIfSingle,
} from '../utils/selection-info-utils';
// import { EDITOR_STATE_MOCK } from './mock';
import {
  updateEditorStateAfterDeleteKeyPress,
  updateEditorStateAfterEditUrl,
  updateEditorStateAfterEnterKeyPress,
  updateEditorStateAfterLinkSubmit,
  updateEditorStateAfterTabKeyPress,
  updateEditorStateAfterRemoveList,
  updateEditorStateAfterAddList,
  updateEditorStateAfterRemoveCodeBlock,
  updateEditorStateAfterAddCodeBlock,
  updateEditorStateAfterAddImage,
} from '../utils/update-editor-state-utils';

class WonderEditor extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    // const editorState = createEmptyEditorState();
    // const editorState = fromJS(EDITOR_STATE_MOCK);

    this.state = {
      // editorState,
      selectionInfo: null,
      undoStack: Stack(),
      redoStack: Stack(),
      isMobileLinkFormModalOpened: false,
      isSticky: false,
      fixedTop: 0,
      fixedWidth: 0,
      fixedHeight: 0,
    };

    this.selectionInfoAtEditorStateUpdate = null;

    this.preventScroll = false;
    this.lastScrollTop = 0;

    this.handleEditorStateUpdate = this.handleEditorStateUpdate.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleShortcut = this.handleShortcut.bind(this);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    this.handleCtrlA = this.handleCtrlA.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleBackDelete = this.handleBackDelete.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleStyleButtonClick = this.handleStyleButtonClick.bind(this);
    this.handleBoldButtonClick = this.handleBoldButtonClick.bind(this);
    this.handleUnderlineButtonClick = this.handleUnderlineButtonClick.bind(this);
    this.handleStrikeThroughButtonClick = this.handleStrikeThroughButtonClick.bind(this);
    this.handleListButtonClick = this.handleListButtonClick.bind(this);
    this.handleOrderedListButtonClick = this.handleOrderedListButtonClick.bind(this);
    this.handleUnorderedListButtonClick = this.handleUnorderedListButtonClick.bind(this);
    this.handleLinkSubmit = this.handleLinkSubmit.bind(this);
    this.handleIndentButtonClick = this.handleIndentButtonClick.bind(this);
    this.handleOutdentButtonClick = this.handleOutdentButtonClick.bind(this);
    this.handleCodeBlockButtonClick = this.handleCodeBlockButtonClick.bind(this);
    this.handleImageButtonClick = this.handleImageButtonClick.bind(this);
    this.handleMobileLinkButtonClick = this.handleMobileLinkButtonClick.bind(this);
    this.closeMobileLinkFormModal = this.closeMobileLinkFormModal.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.getNewEditorState = this.getNewEditorState.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.restoreScroll = this.restoreScroll.bind(this);

    if (typeof this.props.getFinalEditorStateRef === 'function') {
      this.props.getFinalEditorStateRef(this.getNewEditorState);
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleEditorStateUpdate(newEditorState, callback) {
    this.wonderEditorView.preventKeyEvent = true;

    const wrappedCallback = () => {
      this.wonderEditorView.preventKeyEvent = false;
      callback();
    };

    if (newEditorState !== this.props.editorState) {
      let newUndoStack = this.state.undoStack;
      const stackSize = newUndoStack.count();

      if (stackSize > 300) {
        newUndoStack = newUndoStack.splice(200, stackSize - 200);
      }

      this.props.onEditorStateChange(newEditorState);

      this.setState({
        undoStack: newUndoStack.unshift(Map({
          editorState: this.props.editorState,
          selectionInfo: this.selectionInfoAtEditorStateUpdate,
        })),
        redoStack: this.state.redoStack.clear(),
      }, wrappedCallback);

      this.selectionInfoAtEditorStateUpdate = this.state.selectionInfo;
    }

    wrappedCallback();
  }

  handleSelectionChange(newSelectionInfo, callback = () => null) {
    this.wonderEditorView.preventKeyEvent = true;

    const wrappedCallback = () => {
      this.wonderEditorView.preventKeyEvent = false;
      callback();
    };

    if (newSelectionInfo !== this.state.selectionInfo) {
      // TODO : deep check
      this.setState({
        selectionInfo: newSelectionInfo,
      }, wrappedCallback);
    }
  }

  handleKeyCommand(evt, selectionInfo) {
    switch (evt.which) {
      case 9: { // Tab
        evt.preventDefault();
        this.handleTab(selectionInfo, evt.shiftKey);
        break;
      }
      case 13: { // Enter
        evt.preventDefault();
        this.handleEnter(selectionInfo);
        break;
      }
      case 8: { // Backspace
        evt.preventDefault();
        this.handleDelete(selectionInfo);
        break;
      }
      case 46: { // Delete
        evt.preventDefault();
        this.handleBackDelete(selectionInfo);
        break;
      }
      default: {
        break;
      }
    }
  }

  handleShortcut(evt) {
    switch (evt.which) {
      case 65: {
        evt.preventDefault();
        this.handleCtrlA();
        break;
      }
      case 66: { // Ctrl(Command) + B
        evt.preventDefault();
        this.handleBoldButtonClick();
        break;
      }
      case 73: { // Ctrl(Command) + I
        evt.preventDefault();
        break;
      }
      case 85: { // Ctrl(Command) + U
        evt.preventDefault();
        this.handleUnderlineButtonClick();
        break;
      }
      case 83: { // Ctrl(Command) + S
        evt.preventDefault();
        this.handleStrikeThroughButtonClick();
        break;
      }
      case 90: { // Ctrl(Command) + Z or Ctrl(Command) + Shift + Z
        evt.preventDefault();

        if (evt.shiftKey) {
          this.redo();
        } else {
          this.undo();
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  undo() {
    if (this.state.undoStack.count() > 0) {
      const newState = this.state.undoStack.first();

      this.props.onEditorStateChange(newState.get('editorState'));

      this.setState({
        selectionInfo: newState.get('selectionInfo'),
        undoStack: this.state.undoStack.shift(),
        redoStack: this.state.redoStack.unshift(Map({
          editorState: this.props.editorState,
          selectionInfo: this.state.selectionInfo,
        })),
      });
    }
  }

  redo() {
    if (this.state.redoStack.count() > 0) {
      const newState = this.state.redoStack.first();

      this.props.onEditorStateChange(newState.get('editorState'));

      this.setState({
        selectionInfo: newState.get('selectionInfo'),
        undoStack: this.state.undoStack.unshift(Map({
          editorState: this.props.editorState,
          selectionInfo: this.state.selectionInfo,
        })),
        redoStack: this.state.redoStack.shift(),
      });
    }
  }

  handleCtrlA() {
    const newEditorState = this.getNewEditorState();
    const newSelectionInfo = {
      startBlockKey: newEditorState.first().get('key'),
      startOffset: 0,
      endBlockKey: newEditorState.last().get('key'),
      endOffset: newEditorState.last().get('text').length,
    };

    this.handleEditorStateUpdate(newEditorState, this.wonderEditorView.resetUpdateTasks);
    this.handleSelectionChange(newSelectionInfo);
  }

  handleTab(selectionInfo, shiftKey) {
    const editorState = this.getNewEditorState();

    const [newEditorState, newSelectionInfo] = updateEditorStateAfterTabKeyPress(editorState, selectionInfo, shiftKey);

    // iOS specific code
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (iOS) {
      // this will reset strange behavior with korean composition
      this.preventScroll = true;
      this.lastScrollTop = document.body.scrollTop;
      ReactDOM.findDOMNode(this.wonderEditorView).blur();
      this.restoreScroll();
      ReactDOM.findDOMNode(this.wonderEditorView).focus();
      this.restoreScroll();
    }

    this.handleEditorStateUpdate(newEditorState, this.wonderEditorView.resetUpdateTasks);
    this.handleSelectionChange(newSelectionInfo);
    this.selectionInfoAtEditorStateUpdate = newSelectionInfo;
  }

  handleEnter(selectionInfo) {
    const editorState = this.getNewEditorState();

    const [newEditorState, newSelectionInfo] = updateEditorStateAfterEnterKeyPress(editorState, selectionInfo);

    // iOS specific code
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (iOS) {
      // this will reset strange behavior with korean composition
      this.preventScroll = true;
      this.lastScrollTop = document.body.scrollTop;
      ReactDOM.findDOMNode(this.wonderEditorView).blur();
      this.restoreScroll();
      ReactDOM.findDOMNode(this.wonderEditorView).focus();
      this.restoreScroll();
    }

    this.handleEditorStateUpdate(newEditorState, this.wonderEditorView.resetUpdateTasks);
    this.handleSelectionChange(newSelectionInfo);
    this.selectionInfoAtEditorStateUpdate = newSelectionInfo;
  }

  handleDelete(selectionInfo) {
    const editorState = this.getNewEditorState();

    const [newEditorState, newSelectionInfo] = updateEditorStateAfterDeleteKeyPress(editorState, selectionInfo);

    // iOS specific code
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (iOS) {
      // this will reset strange behavior with korean composition
      this.preventScroll = true;
      this.lastScrollTop = document.body.scrollTop;
      ReactDOM.findDOMNode(this.wonderEditorView).blur();
      this.restoreScroll();
      ReactDOM.findDOMNode(this.wonderEditorView).focus();
      this.restoreScroll();
    }

    this.handleEditorStateUpdate(newEditorState, this.wonderEditorView.resetUpdateTasks);
    this.handleSelectionChange(newSelectionInfo);
    this.selectionInfoAtEditorStateUpdate = newSelectionInfo;
  }

  handleBackDelete(selectionInfo) {
    const editorState = this.getNewEditorState();

    const [newEditorState, newSelectionInfo] = updateEditorStateAfterDeleteKeyPress(editorState, nextSelectionIfSingle(editorState, selectionInfo));

    // iOS specific code
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (iOS) {
      // this will reset strange behavior with korean composition
      this.preventScroll = true;
      this.lastScrollTop = document.body.scrollTop;
      ReactDOM.findDOMNode(this.wonderEditorView).blur();
      this.restoreScroll();
      ReactDOM.findDOMNode(this.wonderEditorView).focus();
      this.restoreScroll();
    }

    this.handleEditorStateUpdate(newEditorState, this.wonderEditorView.resetUpdateTasks);
    this.handleSelectionChange(newSelectionInfo);
    this.selectionInfoAtEditorStateUpdate = newSelectionInfo;
  }

  handleStyleButtonClick(styleName) {
    const editorState = this.getNewEditorState();

    const selectionInfo = getSelectionInfo();

    if (!selectionInfo) {
      return;
    }

    let newEditorState = editorState;
    let newSelectionInfo = selectionInfo;
    if (isSingleSelection(selectionInfo) && getBlockDataFromBlockKey(editorState, selectionInfo.startBlockKey).get('text').length !== 0) {
      if (checkStyleContainsSelection(editorState, selectionInfo, styleName)) {
        let styleChangesRemove = this.wonderEditorView.styleChanges.get('remove');
        const selectionInfoOnStyleChange = this.wonderEditorView.selectionInfoOnStyleChange;
        if (selectionInfoOnStyleChange
          && selectionInfoOnStyleChange.startBlockKey === selectionInfo.startBlockKey
          && selectionInfoOnStyleChange.startOffset === selectionInfo.startOffset) {
          if (styleChangesRemove.includes(styleName)) {
            styleChangesRemove = styleChangesRemove.splice(styleChangesRemove.indexOf(styleName), 1);
          } else {
            styleChangesRemove = styleChangesRemove.push(styleName);
          }
        } else {
          this.wonderEditorView.selectionInfoOnStyleChange = selectionInfo;
          styleChangesRemove = styleChangesRemove.push(styleName);
        }

        this.wonderEditorView.styleChanges = this.wonderEditorView.styleChanges.set('remove', styleChangesRemove);
      } else {
        let styleChangesAdd = this.wonderEditorView.styleChanges.get('add');
        const selectionInfoOnStyleChange = this.wonderEditorView.selectionInfoOnStyleChange;
        if (selectionInfoOnStyleChange
          && selectionInfoOnStyleChange.startBlockKey === selectionInfo.startBlockKey
          && selectionInfoOnStyleChange.startOffset === selectionInfo.startOffset) {
          if (styleChangesAdd.includes(styleName)) {
            styleChangesAdd = styleChangesAdd.splice(styleChangesAdd.indexOf(styleName), 1);
          } else {
            styleChangesAdd = styleChangesAdd.push(styleName);
          }
        } else {
          this.wonderEditorView.selectionInfoOnStyleChange = selectionInfo;
          styleChangesAdd = styleChangesAdd.push(styleName);
        }

        this.wonderEditorView.styleChanges = this.wonderEditorView.styleChanges.set('add', styleChangesAdd);
      }

      this.wonderEditorView.forceUpdate();
    } else {
      if (checkStyleContainsSelection(editorState, selectionInfo, styleName)) {
        [newEditorState, newSelectionInfo] = removeStyle(editorState, selectionInfo, styleName);
      } else {
        [newEditorState, newSelectionInfo] = styleText(editorState, selectionInfo, styleName);
      }
    }

    this.handleEditorStateUpdate(newEditorState, this.wonderEditorView.resetUpdateTasks);
    this.handleSelectionChange(newSelectionInfo);
    this.selectionInfoAtEditorStateUpdate = newSelectionInfo;

    ReactDOM.findDOMNode(this.wonderEditorView).focus();
  }

  handleBoldButtonClick() {
    this.handleStyleButtonClick('bold');
  }

  handleUnderlineButtonClick() {
    this.handleStyleButtonClick('underline');
  }

  handleStrikeThroughButtonClick() {
    this.handleStyleButtonClick('strikethrough');
  }

  handleLinkSubmit(url) {
    const editorState = this.getNewEditorState();

    const isLinkOverlapped = getOverlappedUrlFromSelection(editorState, this.state.selectionInfo) ? true : false;

    let newEditorState = editorState;
    let newSelectionInfo = this.state.selectionInfo;
    if (isLinkOverlapped) {
      [newEditorState, newSelectionInfo] = updateEditorStateAfterEditUrl(editorState, this.state.selectionInfo, url);
    } else {
      [newEditorState, newSelectionInfo] = updateEditorStateAfterLinkSubmit(editorState, this.state.selectionInfo, url);
    }

    this.handleEditorStateUpdate(newEditorState, this.wonderEditorView.resetUpdateTasks);
    this.handleSelectionChange(newSelectionInfo);
    this.selectionInfoAtEditorStateUpdate = newSelectionInfo;

    ReactDOM.findDOMNode(this.wonderEditorView).focus();
  }

  handleListButtonClick(type) {
    const editorState = this.getNewEditorState();
    const selectionInfo = getSelectionInfo();

    if (!selectionInfo) {
      return;
    }

    let newEditorState = editorState;
    let newSelectionInfo = selectionInfo;

    if (checkTypeEquals(editorState, selectionInfo, type)) {
      [newEditorState, newSelectionInfo] = updateEditorStateAfterRemoveList(editorState, this.state.selectionInfo, type);
    } else {
      [newEditorState, newSelectionInfo] = updateEditorStateAfterAddList(editorState, this.state.selectionInfo, type);
    }

    this.handleEditorStateUpdate(newEditorState, this.wonderEditorView.resetUpdateTasks);
    this.handleSelectionChange(newSelectionInfo);
    this.selectionInfoAtEditorStateUpdate = newSelectionInfo;

    ReactDOM.findDOMNode(this.wonderEditorView).focus();
  }

  handleOrderedListButtonClick() {
    this.handleListButtonClick('ordered-list-item');
  }

  handleUnorderedListButtonClick() {
    this.handleListButtonClick('unordered-list-item');
  }

  handleIndentButtonClick() {
    const selectionInfo = getSelectionInfo();

    if (!selectionInfo) {
      return;
    }

    this.handleTab(selectionInfo, false);
  }

  handleOutdentButtonClick() {
    const selectionInfo = getSelectionInfo();

    if (!selectionInfo) {
      return;
    }

    this.handleTab(selectionInfo, true);
  }

  handleCodeBlockButtonClick() {
    const editorState = this.getNewEditorState();
    const selectionInfo = getSelectionInfo();

    if (!selectionInfo) {
      return;
    }

    let newEditorState = editorState;
    let newSelectionInfo = selectionInfo;

    if (checkCodeBlockContainsSelection(editorState, selectionInfo)) {
      [newEditorState, newSelectionInfo] = updateEditorStateAfterRemoveCodeBlock(editorState, this.state.selectionInfo);
    } else {
      [newEditorState, newSelectionInfo] = updateEditorStateAfterAddCodeBlock(editorState, this.state.selectionInfo);
    }

    this.handleEditorStateUpdate(newEditorState, this.wonderEditorView.resetUpdateTasks);
    this.handleSelectionChange(newSelectionInfo);
    this.selectionInfoAtEditorStateUpdate = newSelectionInfo;

    ReactDOM.findDOMNode(this.wonderEditorView).focus();
  }

  handleImageButtonClick() {
    this.fileInput.click(); // file upload하기 위해서는 <input type="file">을 만들고 숨긴 다음 이렇게 click해주는 방법밖에 없는 듯
  }

  handleImageUpload(evt) {
    const editorState = this.getNewEditorState();
    const selectionInfo = this.state.selectionInfo;

    const fileList = evt.target.files;

    const imageUploadPromiseList = [];
    for (let i = 0; i < fileList.length; i += 1) {
      const file = fileList[i];
      imageUploadPromiseList.push(requestS3Upload(file));
    }

    Promise.all(imageUploadPromiseList).then((imageUrls) => {
      this.fileInput.value = null;

      const [newEditorState, newSelectionInfo] = updateEditorStateAfterAddImage(editorState, selectionInfo, imageUrls);

      this.handleEditorStateUpdate(newEditorState, this.wonderEditorView.resetUpdateTasks);
      this.handleSelectionChange(newSelectionInfo);
      this.selectionInfoAtEditorStateUpdate = newSelectionInfo;

      ReactDOM.findDOMNode(this.wonderEditorView).focus();
    });
  }

  handleMobileLinkButtonClick() {
    this.setState({
      isMobileLinkFormModalOpened: true,
    });
  }

  closeMobileLinkFormModal() {
    this.setState({
      isMobileLinkFormModalOpened: false,
    });
  }

  getNewEditorState() {
    return this.wonderEditorView.getNewEditorState();
  }

  handleScroll(evt) {
    if (this.preventScroll) {
      this.restoreScroll();
      this.preventScroll = false;
    }

    const navbarRect = document.getElementsByClassName('wonder-navbar')[0].getBoundingClientRect();

    const actionContainerRect = ReactDOM.findDOMNode(this.actionContainer).getBoundingClientRect();

    const editorContainerRect = ReactDOM.findDOMNode(this).getBoundingClientRect();

    const GapBetweenActionAndEditor = editorContainerRect.height + editorContainerRect.top - navbarRect.height - actionContainerRect.height;

    if (editorContainerRect.top <= navbarRect.height && GapBetweenActionAndEditor >= 80) {
      if (!this.state.isSticky) {
        this.setState({
          isSticky: true,
          fixedTop: navbarRect.height,
          fixedWidth: actionContainerRect.width,
          fixedHeight: actionContainerRect.height,
        });
      }
    } else {
      if (this.state.isSticky) {
        this.setState({
          isSticky: false,
          fixedTop: 0,
        });
      }
    }
  }

  restoreScroll() {
    document.body.style.height = '';
    document.body.style.height = `${document.body.scrollHeight + 300}px`;

    document.body.scrollTop = this.lastScrollTop;
  }

  render() {
    const isBoldStyleContainsSelection = checkStyleContainsSelection(this.props.editorState, this.state.selectionInfo, 'bold');
    const isUnderlineStyleContainsSelection = checkStyleContainsSelection(this.props.editorState, this.state.selectionInfo, 'underline');
    const isStrikeThroughStyleContainsSelection = checkStyleContainsSelection(this.props.editorState, this.state.selectionInfo, 'strikethrough');
    const overlappedUrl = getOverlappedUrlFromSelection(this.props.editorState, this.state.selectionInfo);
    const isTypeOrderedListItem = checkTypeEquals(this.props.editorState, this.state.selectionInfo, 'ordered-list-item');
    const isTypeUnorderedListItem = checkTypeEquals(this.props.editorState, this.state.selectionInfo, 'unordered-list-item');
    const isSelectionContainsListItem = checkSelectionContainsListItem(this.props.editorState, this.state.selectionInfo);
    const isCodeBlockContainsSelection = checkCodeBlockContainsSelection(this.props.editorState, this.state.selectionInfo);

    return (
      <Style.WonderEditorContainer>
        <input type="file" accept="image/*" multiple ref={(node) => { this.fileInput = node; }} style={{ display: 'none' }} onChange={this.handleImageUpload} />
        {
          (this.state.isMobileLinkFormModalOpened) ? (
            <Style.StyledModal open>
              <MobileLinkFormModal
                overlappedUrl={overlappedUrl}
                onSubmit={this.handleLinkSubmit}
                closeMobileLinkFormModal={this.closeMobileLinkFormModal}
              />
            </Style.StyledModal>
          ) : null
        }
        <Style.ActionContainer ref={(node) => { this.actionContainer = node; }} isSticky={this.state.isSticky} fixedTop={this.state.fixedTop} fixedWidth={this.state.fixedWidth}>
          <Style.LeftContainer>
            <Style.Action key="bold" title="굵게" onClick={this.handleBoldButtonClick} isHighlight={isBoldStyleContainsSelection}><Icon name="bold" /></Style.Action>
            <Style.Action key="underline" title="밑줄" onClick={this.handleUnderlineButtonClick} isHighlight={isUnderlineStyleContainsSelection}><Icon name="underline" /></Style.Action>
            <Style.Action key="strikethrough" title="취소선" onClick={this.handleStrikeThroughButtonClick} isHighlight={isStrikeThroughStyleContainsSelection}><Icon name="strikethrough" /></Style.Action>
            <Style.Action key="ordered-list" title="숫자 리스트" onClick={this.handleOrderedListButtonClick} isHighlight={isTypeOrderedListItem}><Icon name="ordered list" /></Style.Action>
            <Style.Action key="unordered-list" title="리스트" onClick={this.handleUnorderedListButtonClick} isHighlight={isTypeUnorderedListItem}><Icon name="unordered list" /></Style.Action>
            {
              isSelectionContainsListItem ? ([
                <Style.Action key="indent" title="들여쓰기" onClick={this.handleIndentButtonClick}><Icon name="indent" /></Style.Action>,
                <Style.Action key="outdent" title="내어쓰기" onClick={this.handleOutdentButtonClick}><Icon name="outdent" /></Style.Action>,
              ]) : null
            }
            <Style.Action key="undo" title="되돌리기" onClick={this.undo}><Icon name="undo" /></Style.Action>
            <Style.Action key="redo" title="되돌리기 취소" onClick={this.redo}><Icon name="undo" flipped="horizontally" /></Style.Action>
          </Style.LeftContainer>
          <Style.RightContainer>
            <Style.Action key="code-block" title="코드" onClick={this.handleCodeBlockButtonClick} isHighlight={isCodeBlockContainsSelection}><Icon name="code" /></Style.Action>
            <Style.Action key="image" title="사진" onClick={this.handleImageButtonClick}><Icon name="image" /></Style.Action>
            <MediaQuery minWidth={640}>
              <LinkForm
                overlappedUrl={overlappedUrl}
                onSubmit={this.handleLinkSubmit}
              />
            </MediaQuery>
            <MediaQuery maxWidth={640}>
              <Style.Action key="link" title="링크" onClick={this.handleMobileLinkButtonClick} isHighlight={overlappedUrl ? true : false} ><Icon name="linkify" /></Style.Action>
            </MediaQuery>
          </Style.RightContainer>
        </Style.ActionContainer>
        <Style.EmptyActionContainerForSticky isSticky={this.state.isSticky} fixedHeight={this.state.fixedHeight}>
        </Style.EmptyActionContainerForSticky>
        <Style.ViewContainer>
          <WonderEditorView
            editorState={this.props.editorState}
            selectionInfo={this.state.selectionInfo}
            onEditorStateUpdate={this.handleEditorStateUpdate}
            onSelectionChange={this.handleSelectionChange}
            handleDelete={this.handleDelete}
            onKeyCommand={this.handleKeyCommand}
            onShortcut={this.handleShortcut}
            readOnly={false}
            placeholder={this.props.placeholder}
            ref={(node) => { this.wonderEditorView = node; }}
          />
          {/*<p style={{ whiteSpace: 'pre-wrap', border: '1px solid black' }}>{JSON.stringify(this.props.editorState)}</p>*/}
        </Style.ViewContainer>
      </Style.WonderEditorContainer>
    );
  }
}

WonderEditor.propTypes = {
  placeholder: PropTypes.string,
  editorState: PropTypes.instanceOf(Immutable.List),
  onEditorStateChange: PropTypes.func.isRequired,
  getFinalEditorStateRef: PropTypes.func.isRequired,
};

export default WonderEditor;
