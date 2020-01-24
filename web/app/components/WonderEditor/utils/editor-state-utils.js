import {
  fromJS,
  List,
} from 'immutable';
import {
  getAttributeFromName,
  getLengthOfNode,
  getOffsetOfNode,
  setNodeAttribute,
} from './dom-utils';
import {
  createStyleEventsList,
} from './render-utils';
import {
  createNewBlock,
} from '../models/block';
import {
  createNewInlineStyle,
} from '../models/inline-style';


export function createEmptyEditorState() {
  return List().push(createNewBlock(''));
}

export function isEditorStateEmpty(editorState) {
  return (editorState.count() === 1 && editorState.first().get('text').length === 0);
}

/**
 * remove texts in block
 * @param blockData
 * @param offset : string offset (not selection offset!)
 * @param length
 */
export function removeTexts(blockData, offset, length) {
  const oldText = blockData.get('text');
  const newText = oldText.slice(0, offset) + oldText.slice(offset + length, oldText.length);

  const oldBlockStyles = blockData.get('styles');
  let newBlockStyles = oldBlockStyles.map((blockStyle) => {
    const styleStart = blockStyle.get('start');
    const styleLength = blockStyle.get('length');

    if (styleStart + styleLength <= offset) {
      return blockStyle;
    }

    if (styleStart < offset) {
      if (styleStart + styleLength < offset + length) {
        return blockStyle.set('length', offset - styleStart);
      } else {
        return blockStyle.set('length', styleLength - length);
      }
    } else if (styleStart < offset + length) {
      if (styleStart + styleLength < offset + length) {
        return blockStyle.set('length', 0);
      } else {
        return blockStyle.set('start', offset).set('length', styleStart + styleLength - offset - length);
      }
    } else {
      return blockStyle.set('start', styleStart - length);
    }
  });

  const oldEntities = blockData.get('entities') || List();
  let newEntities = oldEntities.map((entity) => {
    const entityStart = entity.get('start');
    const entityLength = entity.get('length');

    if (entityStart + entityLength <= offset) {
      return entity;
    }

    if (entityStart < offset) {
      if (entityStart + entityLength < offset + length) {
        return entity.set('length', offset - entityStart);
      } else {
        return entity.set('length', entityLength - length);
      }
    } else if (entityStart < offset + length) {
      if (entityStart + entityLength < offset + length) {
        return entity.set('length', 0);
      } else {
        return entity.set('start', offset).set('length', entityStart + entityLength - offset - length);
      }
    } else {
      return entity.set('start', entityStart - length);
    }
  });

  newEntities = newEntities.filter((entity) => (entity.get('length') > 0))

  newBlockStyles = mergeStyles(newBlockStyles, newText.length);

  return blockData.set('text', newText).set('styles', newBlockStyles).set('entities', newEntities);
}

/**
 * slice block
 * @param blockData
 * @param offset
 * @param length
 */
export function sliceBlock(blockData, offset, length) {
  const oldText = blockData.get('text');
  const newText = oldText.slice(offset, offset + length);

  const oldBlockStyles = blockData.get('styles');
  let newBlockStyles;

  const oldEntities = blockData.get('entities') || List();
  let newEntities = oldEntities;

  if (length === 0) {
    newBlockStyles = oldBlockStyles.filter((blockStyle) => {
      if (blockStyle.get('start') <= offset && blockStyle.get('start') + blockStyle.get('length') >= offset) {
        return true;
      } else {
        return false;
      }
    });

    return blockData.set('text', newText).set('styles', newBlockStyles).set('entities', List());
  }

  newBlockStyles = oldBlockStyles.filter((blockStyle) => {
    const styleStart = blockStyle.get('start');
    const styleLength = blockStyle.get('length');

    if (styleStart + styleLength <= offset) {
      return false;
    }

    if (styleStart >= offset + length) {
      return false;
    }

    return true;
  });

  newEntities = oldEntities.filter((entity) => {
    const entityStart = entity.get('start');
    const entityLength = entity.get('length');

    if (entityStart + entityLength <= offset) {
      return false;
    }

    if (entityStart >= offset + length) {
      return false;
    }

    return true;
  });

  newBlockStyles = newBlockStyles.map((blockStyle) => {
    const styleStart = blockStyle.get('start');
    const styleLength = blockStyle.get('length');

    if (styleStart < offset) {
      if (styleStart + styleLength < offset + length) {
        return blockStyle.set('start', 0).set('length', styleStart + styleLength - offset);
      } else {
        return blockStyle.set('start', 0).set('length', length);
      }
    } else {
      if (styleStart + styleLength < offset + length) {
        return blockStyle.set('start', styleStart - offset);
      } else {
        return blockStyle.set('start', styleStart - offset).set('length', offset + length - styleStart);
      }
    }
  });

  newBlockStyles = newBlockStyles.filter((blockStyle) => (blockStyle.get('length') > 0));

  newEntities = newEntities.map((entity) => {
    const entityStart = entity.get('start');
    const entityLength = entity.get('length');

    if (entityStart < offset) {
      if (entityStart + entityLength < offset + length) {
        return entity.set('start', 0).set('length', entityStart + entityLength - offset);
      } else {
        return entity.set('start', 0).set('length', length);
      }
    } else {
      if (entityStart + entityLength < offset + length) {
        return entity.set('start', entityStart - offset);
      } else {
        return entity.set('start', entityStart - offset).set('length', offset + length - entityStart);
      }
    }
  });

  return blockData.set('text', newText).set('styles', newBlockStyles).set('entities', newEntities);
}

/**
 * concatenate srcBlockData at the end of destBlockData
 * @param destBlockData
 * @param srcBlockData
 */
export function concatBlock(destBlockData, srcBlockData) {
  const oldDestText = destBlockData.get('text');
  const oldSrcText = srcBlockData.get('text');
  const newText = oldDestText + oldSrcText;

  const oldDestBlockStyles = destBlockData.get('styles');
  const oldSrcBlockStyles = srcBlockData.get('styles');

  const oldDestEntities = destBlockData.get('entities') || List();
  const oldSrcEntities = srcBlockData.get('entities') || List();

  const newSrcBlockStyles = oldSrcBlockStyles.map((blockStyle) => {
    return blockStyle.set('start', blockStyle.get('start') + oldDestText.length);
  });

  const newSrcEntities = oldSrcEntities.map((entity) => {
    return entity.set('start', entity.get('start') + oldDestText.length);
  });

  let newDestBlockStyles = oldDestBlockStyles.concat(newSrcBlockStyles);
  newDestBlockStyles = mergeStyles(newDestBlockStyles, newText.length);

  const newDestEntities = oldDestEntities.concat(newSrcEntities);

  return destBlockData.set('text', newText).set('styles', newDestBlockStyles).set('entities', newDestEntities);
}

export function checkStyleContainsSelectionHelper(blockData, startOffset, endOffset, styleName) {
  return blockData.get('styles').some((blockStyle) => {
    if (blockStyle.get('type') !== styleName) {
      return false;
    }

    if (startOffset === endOffset) {
      if (startOffset === 0 && blockStyle.get('start') === 0) {
        return true;
      }

      return (blockStyle.get('start') < startOffset && blockStyle.get('start') + blockStyle.get('length') >= endOffset);
    } else {
      return (blockStyle.get('start') <= startOffset && blockStyle.get('start') + blockStyle.get('length') >= endOffset);
    }
  });
}

export function checkStyleContainsSelection(editorState, selectionInfo, styleName) {
  if (!selectionInfo) {
    return false;
  }

  if (selectionInfo.startBlockKey !== selectionInfo.endBlockKey) {
    let startBlockIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
    let endBlockIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.endBlockKey));
    let startOffset = selectionInfo.startOffset;
    let endOffset = selectionInfo.endOffset;

    if (startBlockIndex > endBlockIndex) {
      [startBlockIndex, endBlockIndex] = [endBlockIndex, startBlockIndex];
      [startOffset, endOffset] = [endOffset, startOffset];
    }

    for (let i = startBlockIndex + 1; i < endBlockIndex; i += 1) {
      const blockData = editorState.get(i);
      if (!checkStyleContainsSelectionHelper(blockData, 0, blockData.get('text').length, styleName)) {
        return false;
      }
    }

    const startBlockData = editorState.get(startBlockIndex);
    const endBlockdata = editorState.get(endBlockIndex);

    if (!checkStyleContainsSelectionHelper(startBlockData, startOffset, startBlockData.get('text').length, styleName)) {
      return false;
    }

    if (!checkStyleContainsSelectionHelper(endBlockdata, 0, endOffset, styleName)) {
      return false;
    }

    return true;
  } else {
    let [startOffset, endOffset] = [selectionInfo.startOffset, selectionInfo.endOffset];

    if (startOffset > endOffset) {
      [startOffset, endOffset] = [endOffset, startOffset];
    }

    const blockIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
    return checkStyleContainsSelectionHelper(editorState.get(blockIndex), startOffset, endOffset, styleName);
  }
}

export function getOverlappedUrlFromSelection(editorState, selectionInfo) {
  if (!selectionInfo) {
    return null;
  }

  if (selectionInfo.startBlockKey !== selectionInfo.endBlockKey) {
    let startBlockIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
    let endBlockIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.endBlockKey));
    let startOffset = selectionInfo.startOffset;
    let endOffset = selectionInfo.endOffset;

    if (startBlockIndex > endBlockIndex) {
      [startBlockIndex, endBlockIndex] = [endBlockIndex, startBlockIndex];
      [startOffset, endOffset] = [endOffset, startOffset];
    }

    const startEntities = editorState.get(startBlockIndex).get('entities') || List();
    for (let i = 0; i < startEntities.count(); i += 1) {
      const entity = startEntities.get(i);

      if (entity.get('type') === 'link' && entity.get('start') + entity.get('length') > startOffset) {
        return entity.get('data').get('url');
      }
    }

    const endEntities = editorState.get(endBlockIndex).get('entities') || List();
    for (let i = 0; i < endEntities.count(); i += 1) {
      const entity = endEntities.get(i);

      if (entity.get('type') === 'link' && entity.get('start') < endOffset) {
        return entity.get('data').get('url');
      }
    }

    for (let i = startBlockIndex + 1; i < endBlockIndex; i += 1) {
      const entities = editorState.get(i).get('entities') || List();

      for (let j = 0; j < entities.count(); j += 1) {
        const entity = entities.get(j);

        if (entity.get('type') === 'link') {
          return entity.get('data').get('url');
        }
      }
    }
  } else {
    let [startOffset, endOffset] = [selectionInfo.startOffset, selectionInfo.endOffset];

    if (startOffset > endOffset) {
      [startOffset, endOffset] = [endOffset, startOffset];
    }

    const blockIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
    const entities = editorState.get(blockIndex).get('entities') || List();

    for (let i = 0; i < entities.count(); i += 1) {
      const entity = entities.get(i);

      if (entity.get('type') === 'link' && entity.get('start') < endOffset && entity.get('start') + entity.get('length') > startOffset) {
        return entity.get('data').get('url');
      }
    }
  }

  return null;
}

export function styleText(editorState, selectionInfo, styleName) {
  let newEditorState = editorState;

  if (selectionInfo.startBlockKey !== selectionInfo.endBlockKey) {
    let startBlockIndex = newEditorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
    let endBlockIndex = newEditorState.findIndex((value) => (value.get('key') === selectionInfo.endBlockKey));
    let startOffset = selectionInfo.startOffset;
    let endOffset = selectionInfo.endOffset;

    if (startBlockIndex > endBlockIndex) {
      [startBlockIndex, endBlockIndex] = [endBlockIndex, startBlockIndex];
      [startOffset, endOffset] = [endOffset, startOffset];
    }

    let startBlockData = newEditorState.get(startBlockIndex);
    startBlockData = startBlockData.set('styles', startBlockData.get('styles').push(createNewInlineStyle(styleName, startOffset, startBlockData.get('text').length - startOffset)));
    startBlockData = startBlockData.set('styles', mergeStyles(startBlockData.get('styles'), startBlockData.get('text').length));
    newEditorState = newEditorState.set(startBlockIndex, startBlockData);

    let endBlockData = newEditorState.get(endBlockIndex);
    endBlockData = endBlockData.set('styles', endBlockData.get('styles').push(fromJS({
      type: styleName,
      start: 0,
      length: endOffset,
    })));
    endBlockData = endBlockData.set('styles', mergeStyles(endBlockData.get('styles'), endBlockData.get('text').length));
    newEditorState = newEditorState.set(endBlockIndex, endBlockData);

    newEditorState = newEditorState.map((blockData, index) => {
      if (index > startBlockIndex && index < endBlockIndex) {
        return blockData.set('styles', blockData.get('styles').push(fromJS({
          type: styleName,
          start: 0,
          length: blockData.get('text').length,
        })));
      }

      return blockData;
    });
  } else {
    // single line selection
    let startOffset = selectionInfo.startOffset;
    let endOffset = selectionInfo.endOffset;

    if (startOffset > endOffset) {
      [startOffset, endOffset] = [endOffset, startOffset];
    }

    const blockIndex = newEditorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
    let blockData = newEditorState.get(blockIndex);

    blockData = blockData.set('styles', blockData.get('styles').push(fromJS({
      type: styleName,
      start: startOffset,
      length: endOffset - startOffset,
    })));
    blockData = blockData.set('styles', mergeStyles(blockData.get('styles'), blockData.get('text').length));

    newEditorState = newEditorState.set(blockIndex, blockData);
  }

  return [newEditorState, selectionInfo];
}

export function removeStyleHelper(blockData, startOffset, endOffset, styleName) {
  const oldBlockStyles = blockData.get('styles');
  let newBlockStyles = fromJS([]);

  oldBlockStyles.forEach((blockStyle) => {
    if (blockStyle.get('type') !== styleName) {
      newBlockStyles = newBlockStyles.push(blockStyle);
      return;
    }

    if (blockData.get('text').length === 0) {
      return;
    }

    const styleStart = blockStyle.get('start');
    const styleLength = blockStyle.get('length');

    if (styleStart + styleLength <= startOffset) {
      newBlockStyles = newBlockStyles.push(blockStyle);
      return;
    }

    if (styleStart >= endOffset) {
      newBlockStyles = newBlockStyles.push(blockStyle);
      return;
    }

    if (styleStart < startOffset) {
      if (styleStart + styleLength <= endOffset) {
        newBlockStyles = newBlockStyles.push(blockStyle.set('length', startOffset - styleStart));
      } else {
        newBlockStyles = newBlockStyles.push(blockStyle.set('length', startOffset - styleStart));
        newBlockStyles = newBlockStyles.push(blockStyle.set('start', endOffset).set('length', styleStart + styleLength - endOffset));
      }
    } else {
      if (styleStart + styleLength <= endOffset) {
        return;
      } else {
        newBlockStyles = newBlockStyles.push(blockStyle.set('start', endOffset).set('length', styleStart + styleLength - endOffset));
      }
    }
  });

  return blockData.set('styles', newBlockStyles);
}

export function removeStyle(editorState, selectionInfo, styleName) {
  if (!selectionInfo) {
    return false;
  }

  let newEditorState = editorState;

  if (selectionInfo.startBlockKey !== selectionInfo.endBlockKey) {
    let startBlockIndex = newEditorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
    let endBlockIndex = newEditorState.findIndex((value) => (value.get('key') === selectionInfo.endBlockKey));
    let startOffset = selectionInfo.startOffset;
    let endOffset = selectionInfo.endOffset;

    if (startBlockIndex > endBlockIndex) {
      [startBlockIndex, endBlockIndex] = [endBlockIndex, startBlockIndex];
      [startOffset, endOffset] = [endOffset, startOffset];
    }

    for (let i = startBlockIndex + 1; i < endBlockIndex; i += 1) {
      const blockData = newEditorState.get(i);

      newEditorState = newEditorState.set(i, removeStyleHelper(blockData, 0, blockData.get('text').length, styleName));
    }

    const startBlockData = newEditorState.get(startBlockIndex);
    const endBlockdata = newEditorState.get(endBlockIndex);

    newEditorState = newEditorState.set(startBlockIndex, removeStyleHelper(startBlockData, startOffset, startBlockData.get('text').length, styleName));
    newEditorState = newEditorState.set(endBlockIndex, removeStyleHelper(endBlockdata, 0, endOffset, styleName));
  } else {
    let [startOffset, endOffset] = [selectionInfo.startOffset, selectionInfo.endOffset];

    if (startOffset > endOffset) {
      [startOffset, endOffset] = [endOffset, startOffset];
    }

    const blockIndex = newEditorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
    const blockData = newEditorState.get(blockIndex);

    newEditorState = newEditorState.set(blockIndex, removeStyleHelper(blockData, startOffset, endOffset, styleName));
  }

  return [newEditorState, selectionInfo];
}

export function getSegmentNodeTrees(nodeTree) {
  let segmentNodeTrees = [];

  nodeTree.childs.forEach((childNodeTree) => {
    if (getAttributeFromName(childNodeTree.node, 'data-is-segment') === 'true') {
      segmentNodeTrees.push(childNodeTree);
    } else {
      segmentNodeTrees = segmentNodeTrees.concat(getSegmentNodeTrees(childNodeTree));
    }
  });

  return segmentNodeTrees;
}

/**
 * update styles in block after dom text change
 * @param blockData
 * @param block
 * @param nodeTree
 * @param newTextLength
 * @returns {*}
 */
export function updateStylesAndOffsets(blockData, block, rootNodeTree, newTextLength) {
  // console.log('blockData', blockData);
  // console.log('block', block);
  // console.log('nodeTrees', nodeTrees);

  const oldBlockStyles = blockData.get('styles');
  const oldEntities = blockData.get('entities') || List();
  let newBlockStyles = oldBlockStyles;
  let newEntities = oldEntities;

  let aggregatedDiff = 0;

  const changeSegments = [];

  getSegmentNodeTrees(rootNodeTree).forEach((nodeTree) => {
    // console.log('child node', nodeTree.node);

    const nodeOffset = parseInt(getOffsetOfNode(nodeTree.node), 10);
    const nodeLength = parseInt(getLengthOfNode(nodeTree.node), 10);

    let diff = 0; // length difference in segment
    if (!block.contains(nodeTree.node)) {
      diff = -nodeLength;
    } else {
      const text = nodeTree.node.textContent;
      if (text) {
        diff = text.replace(/\u200B/g, '').length - nodeLength;
      }

      if (getAttributeFromName(nodeTree.node, 'data-is-change-segment') === 'true') {
        changeSegments.push({
          offset: nodeOffset,
          length: diff,
          styleChangeAdd: JSON.parse(getAttributeFromName(nodeTree.node, 'data-style-change-add')),
          styleChangeRemove: JSON.parse(getAttributeFromName(nodeTree.node, 'data-style-change-remove')),
        });
      }
    }
    // console.log('diff', diff);

    if (diff !== 0) {
      oldBlockStyles.forEach((blockStyle, index) => {
        let newBlockStyle = newBlockStyles.get(index);

        if (blockStyle.get('start') >= nodeOffset + nodeLength) { // styles after segment
          if (blockData.get('text').length === 0) { // special case (empty block)
            newBlockStyle = newBlockStyle.set('start', 0).set('length', newTextLength);
            newBlockStyles = newBlockStyles.set(index, newBlockStyle);
          } else {
            newBlockStyle = newBlockStyle.set('start', newBlockStyle.get('start') + diff);
            newBlockStyles = newBlockStyles.set(index, newBlockStyle);
          }
        } else if (blockStyle.get('start') <= nodeOffset
          && blockStyle.get('start') + blockStyle.get('length') >= nodeOffset + nodeLength) { // styles which contains segment
          newBlockStyle = newBlockStyle.set('length', newBlockStyle.get('length') + diff);
          newBlockStyles = newBlockStyles.set(index, newBlockStyle);
        }
      });

      oldEntities.forEach((entity, index) => {
        let newEntity = newEntities.get(index);

        if (entity.get('start') >= nodeOffset + nodeLength) { // styles after segment
          if (blockData.get('text').length === 0) { // special case (empty block)
            newEntity = newEntity.set('start', 0).set('length', newTextLength);
            newEntities = newEntities.set(index, newEntity);
          } else {
            newEntity = newEntity.set('start', newEntity.get('start') + diff);
            newEntities = newEntities.set(index, newEntity);
          }
        } else if (entity.get('start') <= nodeOffset
          && entity.get('start') + entity.get('length') >= nodeOffset + nodeLength) { // styles which contains segment
          newEntity = newEntity.set('length', newEntity.get('length') + diff);
          newEntities = newEntities.set(index, newEntity);
        }
      });
    }

    // update offset
    setNodeAttribute(nodeTree.node, 'data-offset', nodeOffset + aggregatedDiff);
    setNodeAttribute(nodeTree.node, 'data-length', nodeLength + diff);
    aggregatedDiff += diff;
  });

  let newBlockData = blockData.set('styles', newBlockStyles).set('entities', newEntities);

  changeSegments.forEach((changeSegment) => {
    changeSegment.styleChangeAdd.forEach((style) => {
      newBlockData = newBlockData.set('styles', newBlockData.get('styles').push(fromJS({
        type: style,
        start: changeSegment.offset,
        length: changeSegment.length,
      })));
    });

    changeSegment.styleChangeRemove.forEach((style) => {
      newBlockData = removeStyleHelper(newBlockData, changeSegment.offset, changeSegment.offset + changeSegment.length, style);
    });
  });

  newBlockData = newBlockData.set('styles', mergeStyles(newBlockData.get('styles'), newTextLength));

  return newBlockData;
}

/**
 * merge overlapped styles
 * @param blockStyles
 * @param newTextLength
 * @returns {*}
 */
// TODO : style 아예 새로 만드는게 아니라 변경할 것만 변경하도록 바꿀 것. Immutable의 장점 활용.
export function mergeStyles(blockStyles, newTextLength) {
  let newBlockStyles = blockStyles;

  if (newTextLength === 0) { // preserve style if block is empty
    newBlockStyles = newBlockStyles.filter((blockStyle) => blockStyle.get('start') === 0)
    newBlockStyles = newBlockStyles.map((blockStyle) => blockStyle.set('length', 0));

    return newBlockStyles;
  }

  // remove useless styles
  newBlockStyles = newBlockStyles.filter((blockStyle) => {
    if (blockStyle.get('length') <= 0) {
      return false;
    }

    if (blockStyle.get('start') >= newTextLength) {
      return false;
    }

    return true;
  });

  newBlockStyles = newBlockStyles.map((blockStyle) => {
    if (blockStyle.get('start') + blockStyle.get('length') > newTextLength) {
      return blockStyle.set('length', newTextLength - blockStyle.get('start'));
    }

    return blockStyle;
  });

  const styleEventsList = createStyleEventsList(newBlockStyles, newTextLength);

  const state = {};
  /* state example
  {
    'bold': {
      count: 3, (3 bold styles waiting for close event)
      start: 2, (started at 2)
      isCollecting: true,
    },
    'italic': {
      count: 0, (no italic styles waiting for close event)
      start: 2, (useless)
      isCollecting: false,
    }
  }
  */
  const newStyles = [];
  styleEventsList.forEach((styleEvents, index) => {
    // console.log(index);
    styleEvents.forEach((styleEvent) => {
      if (!state[styleEvent.styleType]) {
        state[styleEvent.styleType] = {
          count: 0,
          start: 0,
          isCollecting: false,
        };
      }

      if (styleEvent.eventType === 'start') {
        state[styleEvent.styleType].count += 1;
      } else if (state[styleEvent.styleType].count > 0) {
        state[styleEvent.styleType].count -= 1;
      }
    });

    // console.log('state', Object.assign({}, state));

    Object.keys(state).forEach((key) => {
      const styleState = state[key];

      if (styleState.count === 0) {
        if (styleState.isCollecting) { // collection end
          newStyles.push({
            type: key,
            start: styleState.start,
            length: index - styleState.start,
          });
          styleState.isCollecting = false;
        }
      } else {
        if (!styleState.isCollecting) {
          styleState.isCollecting = true;
          styleState.start = index;
        }
      }
    });

    // console.log('newStyles', Object.assign({}, newStyles));
  });

  if (newStyles.length < newBlockStyles.count()) {
    return fromJS(newStyles);
  }

  // console.log(styleEventsList);

  return newBlockStyles;
}

export function getBlockDataFromBlockKey(editorState, blockKey) {
  const blockIndex = editorState.findIndex((value) => (value.get('key') === blockKey));
  return editorState.get(blockIndex);
}

export function checkTypeEquals(editorState, selectionInfo, type) {
  if (!selectionInfo) {
    return false;
  }

  let startIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
  let endIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.endBlockKey));

  if (startIndex > endIndex) {
    [startIndex, endIndex] = [endIndex, startIndex];
  }

  for (let i = startIndex; i <= endIndex; i += 1) {
    const blockData = editorState.get(i);
    if (blockData.get('type') !== type) {
      return false;
    }
  }

  return true;
}

export function checkSelectionContainsListItem(editorState, selectionInfo) {
  if (!selectionInfo) {
    return false;
  }

  let startIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
  let endIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.endBlockKey));

  if (startIndex > endIndex) {
    [startIndex, endIndex] = [endIndex, startIndex];
  }

  for (let i = startIndex; i <= endIndex; i += 1) {
    const blockData = editorState.get(i);
    const blockType = blockData.get('type');
    if (blockType === 'ordered-list-item' || blockType === 'unordered-list-item') {
      return true;
    }
  }

  return false;
}

export function checkCodeBlockContainsSelection(editorState, selectionInfo) {
  if (!selectionInfo) {
    return false;
  }

  let startIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
  let endIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.endBlockKey));

  if (startIndex > endIndex) {
    [startIndex, endIndex] = [endIndex, startIndex];
  }

  for (let i = startIndex; i <= endIndex; i += 1) {
    const blockData = editorState.get(i);
    const blockType = blockData.get('type');
    if (blockType !== 'code-block') {
      return false;
    }
  }

  return true;
}

export function processEditorStateForOrderedList(editorState) {
  let newEditorState = editorState;

  const depthCountMap = {
    0: 0,
    1: 0,
    2: 0,
  };
  let currentDepth = -1;
  for (let i = 0; i < newEditorState.count(); i += 1) {
    let blockData = newEditorState.get(i);

    if (blockData.get('type') === 'ordered-list-item') {
      const depth = blockData.get('depth');
      depthCountMap[depth] += 1;

      if (depth < currentDepth) {
        depthCountMap[currentDepth] = 0;
      }

      blockData = blockData.set('count', depthCountMap[depth]);
      newEditorState = newEditorState.set(i, blockData);

      currentDepth = depth;
    } else {
      depthCountMap[0] = 0;
      depthCountMap[1] = 0;
      depthCountMap[2] = 0;
      currentDepth = -1;
    }
  }

  return newEditorState;
}

export function processEditorStateForCodeBlock(editorState) {
  let newEditorState = editorState;

  let isCurrentCodeBlock = false;
  for (let i = 0; i < newEditorState.count(); i += 1) {
    let blockData = newEditorState.get(i);

    if (blockData.get('type') === 'code-block') {
      if (!isCurrentCodeBlock) {
        blockData = blockData.set('codeBlockStart', true);
        newEditorState = newEditorState.set(i, blockData);
      }
      isCurrentCodeBlock = true;
    } else {
      if (isCurrentCodeBlock) {
        newEditorState = newEditorState.set(i - 1, newEditorState.get(i - 1).set('codeBlockEnd', true));
      }
      isCurrentCodeBlock = false;
    }
  }

  if (isCurrentCodeBlock) {
    newEditorState = newEditorState.set(newEditorState.count() - 1, newEditorState.last().set('codeBlockEnd', true));
  }

  return newEditorState;
}

/**
 * trim editor state until maxLength
 * @param editorState
 * @param maxLength
 * @param maxBlockNum
 * @returns {[trimmedEditorState, isTrimmed, firstImageUrl]}
 */
export function trimEditorState(editorState, maxLength, maxBlockNum) {
  let trimmedEditorState = List();

  let firstImageUrl = null;

  for (let i = 0; i < editorState.count(); i += 1) {
    const blockData = editorState.get(i);

    if (blockData.get('type') === 'image') {
      if (!firstImageUrl) {
        firstImageUrl = blockData.get('data').get('src');
        break;
      }
    }
  }

  let accumulatedLength = 0;
  let accumulatedBlockNum = 0;
  for (let i = 0; i < editorState.count(); i += 1) {
    const blockData = editorState.get(i);

    if (blockData.get('type') !== 'image') {
      const textLength = blockData.get('text').length;

      if (accumulatedLength + textLength >= maxLength) {
        let slicedBlock = sliceBlock(blockData, 0, maxLength - accumulatedLength)
        slicedBlock = slicedBlock.set('isTrimmed', true);
        slicedBlock = slicedBlock.set('text', `${slicedBlock.get('text')}... `);
        return [trimmedEditorState.push(slicedBlock), true, firstImageUrl];
      } else if (accumulatedBlockNum >= maxBlockNum - 1) {
        let newBlockData = blockData.set('isTrimmed', true);
        newBlockData = newBlockData.set('text', `${newBlockData.get('text')}... `);
        return [trimmedEditorState.push(newBlockData), true, firstImageUrl];
      } else {
        trimmedEditorState = trimmedEditorState.push(blockData);
        accumulatedLength += textLength;
        accumulatedBlockNum += 1;
      }
    }
  }

  return [trimmedEditorState, false, firstImageUrl];
}

export function safelyParseEditorStateString(editorStateString) {
  try {
    return fromJS(JSON.parse(editorStateString));
  } catch (err) {
    return createEmptyEditorState();
  }
}

export function editorStateToString(editorState) {
  let text = '';

  for (let i = 0; i < editorState.count(); i += 1) {
    text += editorState.get(i).get('text');
    if (i > 0) {
      text += '\n';
    }
  }

  return text;
}

export function getEditorStateLength(editorState) {
  let length = 0;

  for (let i = 0; i < editorState.count(); i += 1) {
    length += editorState.get(i).get('text').length;
  }

  return length;
}
