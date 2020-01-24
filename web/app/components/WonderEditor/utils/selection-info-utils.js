export function isSingleSelection(selectionInfo) {
  return selectionInfo && selectionInfo.startBlockKey === selectionInfo.endBlockKey && selectionInfo.startOffset === selectionInfo.endOffset;
}

export function nextSelectionIfSingle(editorState, selectionInfo) {
  if (!selectionInfo) {
    return null;
  }

  if (!isSingleSelection(selectionInfo)) {
    return selectionInfo;
  }

  const blockIndex = editorState.findIndex((value) => (value.get('key') === selectionInfo.startBlockKey));
  const blockData = editorState.get(blockIndex);

  if (blockData.get('type') === 'image') {
    if (selectionInfo.startOffset === 0) {
      return {
        startBlockKey: selectionInfo.startBlockKey,
        startOffset: 1,
        endBlockKey: selectionInfo.startBlockKey,
        endOffset: 1,
      };
    } else {
      return null;
    }
  }

  if (selectionInfo.startOffset < blockData.get('text').length) {
    return {
      startBlockKey: selectionInfo.startBlockKey,
      startOffset: selectionInfo.startOffset + 1,
      endBlockKey: selectionInfo.startBlockKey,
      endOffset: selectionInfo.startOffset + 1,
    };
  } else if (blockIndex < editorState.count() - 1) {
    const newBlockKey = editorState.get(blockIndex + 1).get('key');
    return {
      startBlockKey: newBlockKey,
      startOffset: 0,
      endBlockKey: newBlockKey,
      endOffset: 0,
    };
  } else {
    return null;
  }
}
