export function getAttributeFromName(node, attrName) {
  if (node instanceof Element) {
    const result = node.getAttribute(attrName);
    if (result) {
      return result;
    }
  }

  return null;
}


export function getBlockKeyForNode(node) {
  if (node instanceof Element) {
    const blockKey = node.getAttribute('data-block-key');
    if (blockKey) {
      return blockKey;
    }
    // for (var ii = 0; ii < node.childNodes.length; ii++) {
    //   var childOffsetKey = getBlockKeyForNode(node.childNodes[ii]);
    //   if (childOffsetKey) {
    //     return childOffsetKey;
    //   }
    // }
  }
  return null;
}

/**
 * Get the block key from the node's nearest ancestor.
 */
export function findBlockKey(node) {
  let searchNode = node;
  while (searchNode && searchNode !== document.documentElement) {
    const blockKey = getBlockKeyForNode(searchNode);
    if (blockKey != null) {
      return blockKey;
    }
    searchNode = searchNode.parentNode;
  }
  return null;
}

/**
 * Get the nearest block.
 */
export function findNearestBlock(node) {
  let searchNode = node;
  while (searchNode && searchNode !== document.documentElement) {
    const isBlock = getAttributeFromName(searchNode, 'data-is-block');
    if (isBlock === 'true') {
      return searchNode;
    }
    searchNode = searchNode.parentNode;
  }
  return null;
}

export function getOffsetOfNode(node) {
  if (node instanceof Element) {
    const offset = node.getAttribute('data-offset');
    if (offset) {
      return offset;
    }
    // for (var ii = 0; ii < node.childNodes.length; ii++) {
    //   var childOffsetKey = getBlockKeyForNode(node.childNodes[ii]);
    //   if (childOffsetKey) {
    //     return childOffsetKey;
    //   }
    // }
  }
  return null;
}

/**
 * Get offset of node
 */
export function findOffsetOfNode(node) {
  let searchNode = node;
  while (searchNode && searchNode !== document.documentElement) {
    const offset = getOffsetOfNode(searchNode);
    if (offset != null) {
      return offset;
    }
    searchNode = searchNode.parentNode;
  }
  return null;
}

export function setNodeAttribute(node, attrName, value) {
  if (node instanceof Element) {
    node.setAttribute(attrName, value);
  }
}

export function countTextLengthInNodeBefore(node, referenceNode) {
  if (node === referenceNode) {
    return 0;
  }

  if (node instanceof Node) {
    // const isText = node.getAttribute('data-is-text');

    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent.replace(/\u200B/g, '').length;
    } else if (node instanceof Element) {
      let result = 0;
      let searchNode = node.firstChild;

      while (searchNode) {
        if (searchNode === referenceNode) {
          return result;
        }

        result += countTextLengthInNodeBefore(searchNode, referenceNode);
        searchNode = searchNode.nextSibling;
      }

      return result;
    }
  }

  return 0;
}

/**
 * Get Selection Info.
 * @returns {{startBlockKey, startOffset, endBlockKey, endOffset}}
 */
export function getSelectionInfo() {
  const sel = document.getSelection();

  const anchorSegmentNode = findNearestSegmentNode(sel.anchorNode);
  const focusSegmentNode = findNearestSegmentNode(sel.focusNode);

  const startBlockKey = findBlockKey(sel.anchorNode);
  let startOffset = (parseInt(getAttributeFromName(anchorSegmentNode, 'data-offset'), 10) + countTextLengthInNodeBefore(anchorSegmentNode, sel.anchorNode) + parseInt(sel.anchorOffset, 10)) || 0;
  const endBlockKey = findBlockKey(sel.focusNode);
  let endOffset = (parseInt(getAttributeFromName(focusSegmentNode, 'data-offset'), 10) + countTextLengthInNodeBefore(focusSegmentNode, sel.focusNode) + parseInt(sel.focusOffset, 10)) || 0;

  // update offset if there is &#8203;
  if (startBlockKey === endBlockKey && startOffset === endOffset && sel.anchorNode) {
    const text = sel.anchorNode.textContent;
    let newOffset = startOffset;
    // console.log('newOffset', newOffset);
    for (let i = 0; i < sel.anchorOffset; i += 1) {
      if (text.charAt(i) === '\u200b') {
        newOffset -= 1;
      }
    }
    // console.log('newOffset after update', newOffset);

    startOffset = newOffset;
    endOffset = newOffset;
  }

  if (!startBlockKey || !endBlockKey) {
    return null;
  } else {
    return {
      startBlockKey,
      startOffset,
      endBlockKey,
      endOffset,
    };
  }
}


/**
 * Traverse nodes by preorder and return text
 * @param node
 * @returns {string}
 */
export function nodeTraversalHelper(node) {
  if (node instanceof Node) {
    // const isText = node.getAttribute('data-is-text');
    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue.replace(/\u200B/g, '');
    } else {
      let result = '';
      let searchNode = node.firstChild;

      while (searchNode) {
        result += nodeTraversalHelper(searchNode);
        searchNode = searchNode.nextSibling;
      }

      return result;
    }
  }

  return '';
}

/**
 * return text content from block
 * @param node
 */
export function blockToText(node) {
  return nodeTraversalHelper(node);
}


export function isNodeChild(node, childNode) {
  let searchNode = node.firstChild;

  while (searchNode) {
    if (searchNode === childNode) {
      return true;
    }

    searchNode = searchNode.nextSibling;
  }

  return false;
}


export function getNodeTree(node) {
  const nodeTreeResult = {
    node,
    childs: [],
  };

  let searchNode = node.firstChild;

  while (searchNode) {
    nodeTreeResult.childs.push(getNodeTree(searchNode));
    searchNode = searchNode.nextSibling;
  }

  return nodeTreeResult;
}

export function removeNodeIfContains(node, checkingNode) {
  if (node.contains(checkingNode)) {
    checkingNode.parentNode.removeChild(checkingNode);
  }
}

export function restoreDOMNodeFromNodeTree(nodeTree) {
  const node = nodeTree.node;

  // console.log('nodeTree', nodeTree);

  let searchNode = node.firstChild;
  let index = 0;
  let childTree = nodeTree.childs[index];

  while (searchNode || childTree) {
    let nextSearchNode = searchNode;
    let nextIndex = index;

    if (childTree && childTree.node) { // 추가할 child node 남아있음
      if (searchNode !== childTree.node) { // 다르면 insert해야됨
        removeNodeIfContains(node, childTree.node);

        // console.log('adding node', childTree.node);

        const nextSearchNodeCandidate = (searchNode) ? searchNode.nextSibling : null; // searchNode가 다른데서 추가됨에 따라 사라질 것을 방지

        if (searchNode && isNodeChild(node, searchNode)) {
          // console.log('searchNode', searchNode.cloneNode(true));
          // console.log('searchNode.parent', searchNode.parentNode.cloneNode(true));
          // console.log('searchNode.parent.parent', searchNode.parentNode.parentNode.cloneNode(true));
          // console.log('node', node.cloneNode(true));
          node.insertBefore(childTree.node, searchNode);
        } else { // searchNode finish
          // console.log('searchNode', null);
          node.appendChild(childTree.node);
        }

        // console.log('after add node', node.cloneNode(true));

        if (!isNodeChild(node, searchNode)) {
          nextSearchNode = nextSearchNodeCandidate;
        }
      } else {
        nextSearchNode = searchNode.nextSibling;
      }

      restoreDOMNodeFromNodeTree(childTree);

      nextIndex = index + 1;
    } else if (searchNode) { // searchNode 삭제해야함

      // console.log('removing searchNode', searchNode.cloneNode(true));

      nextSearchNode = searchNode.nextSibling;

      if (isNodeChild(node, searchNode)) {
        node.removeChild(searchNode);
      }
    }

    searchNode = nextSearchNode;
    index = nextIndex;
    childTree = nodeTree.childs[index];
  }

  // console.log('restoreDOMNodeFromNodeTree end');
}

export function getChildNodeList(node) {
  const result = [];

  if (node) {
    let searchNode = node.firstChild;

    while (searchNode) {
      result.push(searchNode);
      searchNode = searchNode.nextSibling;
    }
  }

  return result;
}

export function restoreChildsByNodeList(node, nodeList) {
  let searchNode = node.firstChild;
  let index = 0;
  let child = nodeList[index];

  while (searchNode || child) {
    let nextSearchNode = searchNode;
    let nextIndex = index;

    if (child) {
      if (searchNode !== child) {
        if (isNodeChild(node, child)) {
          node.removeChild(child);
        }

        node.insertBefore(child, searchNode);
      } else {
        nextSearchNode = searchNode.nextSibling;
      }

      nextIndex = index + 1;
    } else if (searchNode) {
      nextSearchNode = searchNode.nextSibling;

      node.removeChild(searchNode);
    }

    searchNode = nextSearchNode;
    index = nextIndex;
    child = nodeList[index];
  }
}


export function getLengthOfNode(node) {
  if (node instanceof Element) {
    const length = node.getAttribute('data-length');
    if (length) {
      return length;
    }
  }
  return null;
}

export function getTextOrImageNode(node) {
  let searchNode = node;

  while (searchNode) {
    if (searchNode.nodeType === Node.TEXT_NODE || searchNode.tagName === 'BR' || searchNode.tagName === 'IMG') {
      return searchNode;
    }

    searchNode = searchNode.firstChild;
  }

  return null;
}

export function getNodeAndOffsetFromSelectionInfoHelper(node, offset) {
  let searchNode = node.firstChild;

  let searchNodeOffset;
  let searchNodeLength;
  while (searchNode) {
    if (getAttributeFromName(searchNode, 'data-is-segment') !== 'true') {
      const result = getNodeAndOffsetFromSelectionInfoHelper(searchNode, offset);
      if (result) {
        return result;
      }
    } else {
      searchNodeOffset = parseInt(getOffsetOfNode(searchNode), 10);
      searchNodeLength = parseInt(getLengthOfNode(searchNode), 10);

      if (offset < searchNodeOffset) {
        return [getTextOrImageNode(searchNode), 0];
      }

      if (offset <= searchNodeOffset + searchNodeLength) {
        // console.log('textNode', getTextOrImageNode(searchNode));
        return [getTextOrImageNode(searchNode), offset - searchNodeOffset];
      }
    }

    searchNode = searchNode.nextSibling;
  }

  return null;
}

export function getNodeAndOffsetFromSelectionInfo(block, offset) {
  // console.log('block', block);
  // console.log('offset', offset);

  const result = getNodeAndOffsetFromSelectionInfoHelper(block, offset);

  if (result) {
    return result;
  } else {
    return [getTextOrImageNode(block.lastChild), 0];
  }
}

export function findNearestSegmentNode(node) {
  let searchNode = node;

  while (searchNode && searchNode !== document.documentElement && getAttributeFromName(searchNode, 'data-is-block') !== 'true') {
    const isSegment = getAttributeFromName(searchNode, 'data-is-segment');
    if (isSegment === 'true') {
      return searchNode;
    }
    searchNode = searchNode.parentNode;
  }

  return null;
}
//
// export function createSegment(offset) {
//   const segment = document.createElement('span');
//   segment.setAttribute('data-offset', offset);
//   segment.setAttribute('data-length', 0);
//   segment.setAttribute('data-editor-key', 'wondereditor');
//
//   const textNode = document.createElement('span');
//   textNode.setAttribute('data-is-text', true);
//
//   segment.appendChild(textNode);
//
//   return segment;
// }

export function findChangeSegment(blockNode) {
  let searchNode = blockNode.firstChild;

  while (searchNode) {
    const isChangeSegment = getAttributeFromName(searchNode, 'data-is-change-segment');

    if (isChangeSegment === 'true') {
      return searchNode;
    }

    searchNode = searchNode.nextSibling;
  }

  return null;
}

// export function isSelectionEndOfLink() {
//   const sel = document.getSelection();
//
//   if (!sel.anchorNode || !sel.focusNode) {
//     return false;
//   }
//
//   if (sel.anchorNode !== sel.focusNode || sel.anchorOffset !== sel.focusOffset) {
//     return false;
//   }
//
//   if (sel.anchorNode.textContent.length !== sel.anchorOffset) {
//     return false;
//   }
//
//   const segmentNode = findNearestSegmentNode(sel.anchorNode);
//
//   if (!segmentNode.parentNode) {
//     return false;
//   }
//
//   if (segmentNode.parentNode.tagName !== 'A') {
//     return false;
//   }
//
//   if (segmentNode.nextSibling) {
//     return false;
//   } else {
//     return true;
//   }
// }
