import { List, Map } from 'immutable';
import {
  createNewBlock,
  createNewKey,
} from '../models/block';
import {
  createLink,
} from '../models/entity';
import {
  isEditorStateEmpty,
  concatBlock,
  removeTexts,
  sliceBlock,
} from './editor-state-utils';

export function updateEditorStateAfterEnterKeyPress(editorState, selectionInfo) {
  let newEditorState = editorState;
  let newSelectionInfo = selectionInfo;

  let startBlockIndex = newEditorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
  let endBlockIndex = newEditorState.findIndex((value) => (value.get('key') === selectionInfo.endBlockKey));
  let startBlockKey = selectionInfo.startBlockKey;
  let endBlockKey = selectionInfo.endBlockKey;
  let startBlockOffset = selectionInfo.startOffset;
  let endBlockOffset = selectionInfo.endOffset;

  if (startBlockIndex !== endBlockIndex) { // multi line selection
    if (startBlockIndex > endBlockIndex) {
      [startBlockIndex, endBlockIndex] = [endBlockIndex, startBlockIndex];
      [startBlockKey, endBlockKey] = [endBlockKey, startBlockKey];
      [startBlockOffset, endBlockOffset] = [endBlockOffset, startBlockOffset];
    }

    let startBlock = newEditorState.get(startBlockIndex);
    let endBlock = newEditorState.get(endBlockIndex);

    startBlock = removeTexts(startBlock, startBlockOffset, startBlock.get('text').length - startBlockOffset);
    newEditorState = newEditorState.set(startBlockIndex, startBlock);

    endBlock = removeTexts(endBlock, 0, endBlockOffset);
    newEditorState = newEditorState.set(endBlockIndex, endBlock);

    newEditorState = newEditorState.splice(startBlockIndex + 1, endBlockIndex - startBlockIndex - 1);
    newSelectionInfo = {
      startBlockKey: endBlockKey,
      startOffset: 0,
      endBlockKey: endBlockKey,
      endOffset: 0,
    };
  } else { // single line selection
    if (startBlockOffset > endBlockOffset) {
      [startBlockOffset, endBlockOffset] = [endBlockOffset, startBlockOffset];
    }

    let blockData = newEditorState.get(startBlockIndex);
    const blockType = blockData.get('type');

    if (blockData.get('text').length === 0 && (blockType === 'ordered-list-item' || blockType === 'unordered-list-item')) {
      if (blockData.get('depth') <= 0) {
        blockData = blockData.set('type', 'unstyled');
      } else {
        blockData = blockData.set('depth', blockData.get('depth') - 1);
      }

      newEditorState = newEditorState.set(startBlockIndex, blockData);
    } else {
      let slicedBlock = sliceBlock(blockData, endBlockOffset, blockData.get('text').length - endBlockOffset);
      blockData = removeTexts(blockData, startBlockOffset, blockData.get('text').length - startBlockOffset);

      slicedBlock = slicedBlock.set('key', createNewKey());

      if (slicedBlock.get('type') === 'image') {
        slicedBlock = slicedBlock.set('type', 'unstyled').set('data', null);
      }

      newEditorState = newEditorState.set(startBlockIndex, blockData);

      newEditorState = newEditorState.insert(startBlockIndex + 1, slicedBlock);

      newSelectionInfo = {
        startBlockKey: slicedBlock.get('key'),
        startOffset: 0,
        endBlockKey: slicedBlock.get('key'),
        endOffset: 0,
      };
    }
  }

  return [newEditorState, newSelectionInfo];
}

export function updateEditorStateAfterDeleteKeyPress(editorState, selectionInfo) {
  let newEditorState = editorState;
  let newSelectionInfo = Object.assign({}, selectionInfo);

  if (!selectionInfo) {
    return [newEditorState, newSelectionInfo];
  }

  if (selectionInfo.startBlockKey !== selectionInfo.endBlockKey) { // multi line selection
    let startBlockIndex = newEditorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
    let endBlockIndex = newEditorState.findIndex((value) => (value.get('key') === selectionInfo.endBlockKey));
    let startOffset = selectionInfo.startOffset;
    let endOffset = selectionInfo.endOffset;

    if (startBlockIndex > endBlockIndex) {
      [startBlockIndex, endBlockIndex] = [endBlockIndex, startBlockIndex];
      [startOffset, endOffset] = [endOffset, startOffset];
    }

    let startBlock = newEditorState.get(startBlockIndex);
    let endBlock = newEditorState.get(endBlockIndex);

    startBlock = removeTexts(startBlock, startOffset, startBlock.get('text').length - startOffset);
    endBlock = removeTexts(endBlock, 0, endOffset);

    startBlock = concatBlock(startBlock, endBlock);

    const startBlockKey = newEditorState.get(startBlockIndex).get('key');

    newEditorState = newEditorState.splice(startBlockIndex + 1, endBlockIndex - startBlockIndex);
    newEditorState = newEditorState.set(startBlockIndex, startBlock);

    newSelectionInfo = {
      startBlockKey: startBlockKey,
      startOffset: startOffset,
      endBlockKey: startBlockKey,
      endOffset: startOffset,
    };
  } else { // single line selection
    let [newStartOffset, newEndOffset] = [selectionInfo.startOffset, selectionInfo.endOffset];

    // swap offset if startOffset is bigger than endOffset
    if (newStartOffset > newEndOffset) {
      [newStartOffset, newEndOffset] = [newEndOffset, newStartOffset];
    }

    const blockIndex = newEditorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
    let blockData = newEditorState.get(blockIndex);

    if (newStartOffset !== newEndOffset) { // multi length selection
      if (blockData.get('type') === 'image') {
        blockData = blockData.set('type', 'unstyled').set('text', '');
      } else {
        blockData = removeTexts(blockData, newStartOffset, newEndOffset - newStartOffset);
      }

      newEditorState = newEditorState.set(blockIndex, blockData);

      newSelectionInfo = {
        startBlockKey: selectionInfo.startBlockKey,
        startOffset: newStartOffset,
        endBlockKey: selectionInfo.startBlockKey,
        endOffset: newStartOffset,
      };
    } else if (newStartOffset !== 0) { // single selection and not offset 0
      if (blockData.get('type') === 'image') {
        blockData = blockData.set('type', 'unstyled').set('text', '');
      } else {
        blockData = removeTexts(blockData, newStartOffset - 1, 1);
      }

      newEditorState = newEditorState.set(blockIndex, blockData);

      newSelectionInfo = {
        startBlockKey: selectionInfo.startBlockKey,
        startOffset: newStartOffset - 1,
        endBlockKey: selectionInfo.startBlockKey,
        endOffset: newStartOffset - 1,
      };
    } else if (blockIndex > 0) { // offset 0 and not first block
      if (blockData.get('type') !== 'image') {
        let destBlockData = newEditorState.get(blockIndex - 1);

        if (destBlockData.get('type') !== 'image') {
          newEditorState = newEditorState.splice(blockIndex, 1);

          const destBlockKey = destBlockData.get('key');
          const destOldText = destBlockData.get('text');

          destBlockData = concatBlock(destBlockData, blockData);

          newEditorState = newEditorState.set(blockIndex - 1, destBlockData);

          newSelectionInfo = {
            startBlockKey: destBlockKey,
            startOffset: destOldText.length,
            endBlockKey: destBlockKey,
            endOffset: destOldText.length,
          };
        } else {
          newEditorState = newEditorState.splice(blockIndex - 1, 1);
        }
      }
    }
  }

  return [newEditorState, newSelectionInfo];
}

export function updateEditorStateAfterPaste(editorState, selectionInfo, blockDataList) {
  let newEditorState = editorState;
  let newSelectionInfo = selectionInfo;

  if (selectionInfo.startBlockKey !== selectionInfo.endBlockKey || selectionInfo.startOffset !== selectionInfo.endOffset) {
    [newEditorState, newSelectionInfo] = updateEditorStateAfterDeleteKeyPress(editorState, selectionInfo);
  }

  if (blockDataList.count() > 0) {
    const blockIndex = newEditorState.findIndex((value) => (value.get('key') === newSelectionInfo.startBlockKey));

    let formerBlockData = sliceBlock(newEditorState.get(blockIndex), 0, newSelectionInfo.startOffset);
    const latterBlockData = sliceBlock(newEditorState.get(blockIndex), newSelectionInfo.startOffset, newEditorState.get(blockIndex).get('text').length - newSelectionInfo.startOffset);

    let newBlockDataList = blockDataList.set(blockDataList.count() - 1, concatBlock(blockDataList.last(), latterBlockData));

    if (formerBlockData.get('type') === 'code-block') {
      newBlockDataList = newBlockDataList.map((blockData) => blockData.set('type', 'code-block').set('depth', 0));
    }

    formerBlockData = concatBlock(formerBlockData, newBlockDataList.first());

    newEditorState = newEditorState.set(blockIndex, formerBlockData);

    for (let i = 1; i < newBlockDataList.count(); i += 1) {
      newEditorState = newEditorState.insert(blockIndex + i, newBlockDataList.get(i));
    }

    const newStartBlockKey = newEditorState.get(blockIndex + newBlockDataList.count() - 1).get('key');
    const newStartOffset = newEditorState.get(blockIndex + newBlockDataList.count() - 1).get('text').length - latterBlockData.get('text').length;

    newSelectionInfo = {
      startBlockKey: newStartBlockKey,
      startOffset: newStartOffset,
      endBlockKey: newStartBlockKey,
      endOffset: newStartOffset,
    };
  }

  return [newEditorState, newSelectionInfo];
}

export function updateEditorStateAfterLinkSubmit(editorState, selectionInfo, url) {
  let newEditorState = editorState;
  let newSelectionInfo = selectionInfo;
  let newUrl = url;

  if (newUrl.search(/^http[s]?\:\/\//) == -1) {
    newUrl = `http://${newUrl}`;
  }

  if (!selectionInfo) {
    let newBlock = createNewBlock(`${newUrl} `);
    newBlock = newBlock.set('entities', newBlock.get('entities').push(createLink(0, newUrl.length, newUrl)));

    if (isEditorStateEmpty(editorState)) {
      newEditorState = newEditorState.set(0, newBlock);
    } else {
      newEditorState = newEditorState.push(newBlock);
    }

    newSelectionInfo = {
      startBlockKey: newBlock.get('key'),
      startOffset: newBlock.get('text').length,
      endBlockKey: newBlock.get('key'),
      endOffset: newBlock.get('text').length,
    };

    return [newEditorState, newSelectionInfo];
  }

  if (selectionInfo.startBlockKey === selectionInfo.endBlockKey) {
    const blockIndex = newEditorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));

    if (selectionInfo.startOffset === selectionInfo.endOffset) { // single selection
      let formerBlockData = sliceBlock(newEditorState.get(blockIndex), 0, newSelectionInfo.startOffset);
      const latterBlockData = sliceBlock(newEditorState.get(blockIndex), newSelectionInfo.startOffset, newEditorState.get(blockIndex).get('text').length - newSelectionInfo.startOffset);

      let newBlock = createNewBlock(`${newUrl} `); // space after url
      newBlock = newBlock.set('entities', newBlock.get('entities').push(createLink(0, newUrl.length, newUrl)));

      formerBlockData = concatBlock(formerBlockData, newBlock);

      const newOffset = formerBlockData.get('text').length;
      formerBlockData = concatBlock(formerBlockData, latterBlockData);

      newEditorState = newEditorState.set(blockIndex, formerBlockData);
      newSelectionInfo = {
        startBlockKey: selectionInfo.startBlockKey,
        startOffset: newOffset,
        endBlockKey: selectionInfo.startBlockKey,
        endOffset: newOffset,
      };
    } else { // single line multi selection
      let startOffset = selectionInfo.startOffset;
      let endOffset = selectionInfo.endOffset;

      if (startOffset > endOffset) {
        [startOffset, endOffset] = [endOffset, startOffset];
      }

      let blockData = newEditorState.get(blockIndex);
      const entities = blockData.get('entities') || List();
      blockData = blockData.set('entities', entities.push(createLink(startOffset, endOffset - startOffset, newUrl)));
      newEditorState = newEditorState.set(blockIndex, blockData);
    }
  } else { // multi line selection
    let startBlockIndex = newEditorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
    let endBlockIndex = newEditorState.findIndex((value) => (value.get('key') === selectionInfo.endBlockKey));
    let startOffset = selectionInfo.startOffset;
    let endOffset = selectionInfo.endOffset;

    if (startBlockIndex > endBlockIndex) {
      [startBlockIndex, endBlockIndex] = [endBlockIndex, startBlockIndex];
      [startOffset, endOffset] = [endOffset, startOffset];
    }

    let startBlockData = newEditorState.get(startBlockIndex);
    let endBlockData = newEditorState.get(endBlockIndex);

    const startEntities = startBlockData.get('entities') || List();
    const endEntities = endBlockData.get('entities') || List();

    startBlockData = startBlockData.set('entities', startEntities.push(createLink(startOffset, startBlockData.get('text').length - startOffset, newUrl)));
    endBlockData = endBlockData.set('entities', endEntities.push(createLink(0, endOffset, newUrl)));

    newEditorState = newEditorState.set(startBlockIndex, startBlockData).set(endBlockIndex, endBlockData);

    newEditorState = newEditorState.map((blockData, index) => {
      if (index > startBlockIndex && index < endBlockIndex) {
        const entities = blockData.get('entities') || List();
        return blockData.set('entities', entities.push(createLink(0, blockData.get('text').length, newUrl)));
      }

      return blockData;
    });
  }

  return [newEditorState, newSelectionInfo];
}

export function updateEditorStateAfterEditUrl(editorState, selectionInfo, url) {
  let newEditorState = editorState;
  let newSelectionInfo = selectionInfo;
  let newUrl = url;

  if (newUrl.search(/^http[s]?\:\/\//) == -1) {
    newUrl = `http://${newUrl}`;
  }

  if (!selectionInfo) {
    return [newEditorState, newSelectionInfo];
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

    let startEntities = editorState.get(startBlockIndex).get('entities') || List();

    startEntities = startEntities.map((entity) => {
      if (entity.get('type') === 'link' && entity.get('start') + entity.get('length') > startOffset) {
        return entity.set('data', entity.get('data').set('url', newUrl));
      }

      return entity;
    });

    newEditorState = newEditorState.set(startBlockIndex, newEditorState.get(startBlockIndex).set('entities', startEntities));

    let endEntities = editorState.get(endBlockIndex).get('entities') || List();

    endEntities = endEntities.map((entity) => {
      if (entity.get('type') === 'link' && entity.get('start') < endOffset) {
        return entity.set('data', entity.get('data').set('url', newUrl));
      }

      return entity;
    });

    newEditorState = newEditorState.set(endBlockIndex, newEditorState.get(endBlockIndex).set('entities', endEntities));

    for (let i = startBlockIndex + 1; i < endBlockIndex; i += 1) {
      let entities = editorState.get(i).get('entities') || List();

      entities = entities.map((entity) => {
        if (entity.get('type') === 'link') {
          return entity.set('data', entity.get('data').set('url', newUrl));
        }

        return entity;
      });

      newEditorState = newEditorState.set(i, newEditorState.get(i).set('entities', entities));
    }
  } else {
    let [startOffset, endOffset] = [selectionInfo.startOffset, selectionInfo.endOffset];

    if (startOffset > endOffset) {
      [startOffset, endOffset] = [endOffset, startOffset];
    }

    const blockIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
    let entities = editorState.get(blockIndex).get('entities') || List();

    entities = entities.map((entity) => {
      if (entity.get('type') === 'link' && entity.get('start') < endOffset && entity.get('start') + entity.get('length') > startOffset) {
        return entity.set('data', entity.get('data').set('url', newUrl));
      }

      return entity;
    });

    newEditorState = newEditorState.set(blockIndex, newEditorState.get(blockIndex).set('entities', entities));
  }

  return [newEditorState, newSelectionInfo];
}

export function updateEditorStateAfterTabKeyPress(editorState, selectionInfo, shiftKey) {
  let newEditorState = editorState;
  let newSelectionInfo = Object.assign({}, selectionInfo);

  let startIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
  let endIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.endBlockKey));

  if (startIndex > endIndex) {
    [startIndex, endIndex] = [endIndex, startIndex];
  }

  for (let i = startIndex; i <= endIndex; i += 1) {
    let blockData = editorState.get(i);

    const blockType = blockData.get('type');

    if (blockType === 'ordered-list-item' || blockType === 'unordered-list-item') {
      if (shiftKey) { // unindent
        if (blockData.get('depth') > 0) {
          blockData = blockData.set('depth', blockData.get('depth') - 1);
        }
      } else { // indent
        if (blockData.get('depth') < 2) {
          blockData = blockData.set('depth', blockData.get('depth') + 1);
        }
      }
    } else if (blockType === 'code-block') {
      if (shiftKey) { // unindent code block
        let removeLength = 0;

        if (blockData.get('text').charAt(0) === ' ') {
          removeLength += 1;
        }

        if (blockData.get('text').charAt(1) === ' ') {
          removeLength += 1;
        }

        if (blockData.get('key') === selectionInfo.startBlockKey) {
          newSelectionInfo.startOffset -= removeLength;
        }

        if (blockData.get('key') === selectionInfo.endBlockKey) {
          newSelectionInfo.endOffset -= removeLength;
        }

        blockData = removeTexts(blockData, 0, removeLength);
      } else { // indent code block
        const newBlock = createNewBlock('  ').set('type', 'code-block');
        blockData = concatBlock(newBlock, blockData).set('key', blockData.get('key'));

        if (blockData.get('key') === selectionInfo.startBlockKey) {
          newSelectionInfo.startOffset += 2;
        }

        if (blockData.get('key') === selectionInfo.endBlockKey) {
          newSelectionInfo.endOffset += 2;
        }
      }
    }

    newEditorState = newEditorState.set(i, blockData);
  }

  return [newEditorState, newSelectionInfo];
}

export function updateEditorStateAfterRemoveList(editorState, selectionInfo, type) {
  let newEditorState = editorState;
  const newSelectionInfo = selectionInfo;

  let startIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
  let endIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.endBlockKey));

  if (startIndex > endIndex) {
    [startIndex, endIndex] = [endIndex, startIndex];
  }

  for (let i = startIndex; i <= endIndex; i += 1) {
    const blockData = editorState.get(i);
    newEditorState = newEditorState.set(i, blockData.set('type', 'unstyled').set('depth', 0));
  }

  return [newEditorState, newSelectionInfo];
}

export function updateEditorStateAfterAddList(editorState, selectionInfo, type) {
  let newEditorState = editorState;
  const newSelectionInfo = selectionInfo;

  let startIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
  let endIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.endBlockKey));

  if (startIndex > endIndex) {
    [startIndex, endIndex] = [endIndex, startIndex];
  }

  for (let i = startIndex; i <= endIndex; i += 1) {
    const blockData = editorState.get(i);
    newEditorState = newEditorState.set(i, blockData.set('type', type).set('depth', 0));
  }

  return [newEditorState, newSelectionInfo];
}

export function updateEditorStateAfterRemoveCodeBlock(editorState, selectionInfo) {
  let newEditorState = editorState;
  const newSelectionInfo = selectionInfo;

  let startIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
  let endIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.endBlockKey));

  if (startIndex > endIndex) {
    [startIndex, endIndex] = [endIndex, startIndex];
  }

  for (let i = startIndex; i <= endIndex; i += 1) {
    const blockData = editorState.get(i);
    newEditorState = newEditorState.set(i, blockData.set('type', 'unstyled').set('depth', 0));
  }

  return [newEditorState, newSelectionInfo];
}

export function updateEditorStateAfterAddCodeBlock(editorState, selectionInfo) {
  let newEditorState = editorState;
  const newSelectionInfo = selectionInfo;

  let startIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
  let endIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.endBlockKey));

  if (startIndex > endIndex) {
    [startIndex, endIndex] = [endIndex, startIndex];
  }

  for (let i = startIndex; i <= endIndex; i += 1) {
    const blockData = editorState.get(i);
    newEditorState = newEditorState.set(i, blockData.set('type', 'code-block').set('depth', 0));
  }

  return [newEditorState, newSelectionInfo];
}

export function updateEditorStateAfterAddImage(editorState, selectionInfo, imageUrls) {
  let newEditorState = editorState;
  let newSelectionInfo = selectionInfo;

  let index = editorState.count() - 1;
  if (selectionInfo) {
    index = newEditorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
  }

  for (let i = 0; i < imageUrls.length; i += 1) {
    const imageBlock = createNewBlock().set('type', 'image').set('data', Map({ src: imageUrls[i] }));
    newEditorState = newEditorState.insert(index + 1 + i, imageBlock);
  }

  const emptyBlock = createNewBlock();

  newEditorState = newEditorState.insert(index + 1 + imageUrls.length, emptyBlock);

  newSelectionInfo = {
    startBlockKey: emptyBlock.get('key'),
    startOffset: 0,
    endBlockKey: emptyBlock.get('key'),
    endOffset: 0,
  };

  return [newEditorState, newSelectionInfo];
}
