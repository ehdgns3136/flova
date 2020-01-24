import { fromJS, List } from 'immutable';
import {
  getAttributeFromName,
} from './dom-utils';
import {
  concatBlock,
  createEmptyEditorState,
  sliceBlock,
} from './editor-state-utils';
import {
  createNewBlock,
  createNewKey,
} from '../models/block';
import {
  createLink,
  findUrlsWithinText,
  addEntityIfNotOverlap,
} from '../models/entity';


export function isEditorKeyExists(node) {
  if (getAttributeFromName(node, 'data-editor-key') === 'wondereditor') {
    return true;
  }

  let searchNode = node.firstChild;

  while (searchNode) {
    if (isEditorKeyExists(searchNode)) {
      return true;
    }

    searchNode = searchNode.nextSibling;
  }

  return false;
}

export function htmlStringToBlockDataListHelper(node, styles = []) {
  let blockDataList = createEmptyEditorState();

  if (!(node instanceof Node)) {
    return blockDataList;
  }

  if (!(node instanceof Element)) {
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
      const text = node.nodeValue;

      if (/^\n*$/.test(text)) { // if nodeValue contains only new line characters
        return blockDataList;
      }

      let blockData = createNewBlock(text);

      let blockStyles = blockData.get('styles');

      styles.forEach((styleName) => {
        blockStyles = blockStyles.push(fromJS({
          type: styleName,
          start: 0,
          length: text.length,
        }));
      });

      blockData = blockData.set('styles', blockStyles);

      return blockDataList.set(0, blockData);
    } else if (node.tagName === 'BR') {
      return blockDataList.push(createNewBlock(''));
    } else {
      return blockDataList;
    }
  }

  const newStyles = styles.slice();

  if (node.style) {
    const fontWeight = node.style.fontWeight;
    if (fontWeight === 'bold' || fontWeight === '700' || fontWeight === '800' || fontWeight === '900') {
      if (newStyles.indexOf('bold') === -1) {
        newStyles.push('bold');
      }
    } else if (fontWeight) {
      while (newStyles.indexOf('bold') > -1) {
        newStyles.splice(newStyles.indexOf('bold'), 1);
      }
    }

    const textDecoration = node.style.textDecoration;
    if (textDecoration.indexOf('none') > -1) {
      while (newStyles.indexOf('underline') > -1) {
        newStyles.splice(newStyles.indexOf('underline'), 1);
      }

      while (newStyles.indexOf('line-through') > -1) {
        newStyles.splice(newStyles.indexOf('line-through'), 1);
      }
    } else {
      if (textDecoration.indexOf('underline') > -1) {
        if (newStyles.indexOf('underline') === -1) {
          newStyles.push('underline');
        }
      }

      if (textDecoration.indexOf('line-through') > -1) {
        if (newStyles.indexOf('line-through') === -1) {
          newStyles.push('line-through');
        }
      }
    }
  }

  let searchNode = node.firstChild;
  let metDiv = false;

  while (searchNode) {
    let searchNodeBlockDataList = htmlStringToBlockDataListHelper(searchNode, newStyles);

    if (searchNode.tagName === 'A') {
      let firstBlockData = searchNodeBlockDataList.first();
      const url = getAttributeFromName(searchNode, 'href');

      if (url) {
        const newEntity = createLink(0, firstBlockData.get('text').length, url);
        firstBlockData = firstBlockData.set('entities', firstBlockData.get('entities').push(newEntity));
        searchNodeBlockDataList = searchNodeBlockDataList.set(0, firstBlockData);
      }
    }

    if (getAttributeFromName(searchNode, 'data-is-block') === 'true') {
      const type = getAttributeFromName(searchNode, 'data-type');

      if (type === 'ordered-list-item' || type === 'unordered-list-item') {
        const depth = parseInt(getAttributeFromName(searchNode, 'data-depth'), 10);
        blockDataList = blockDataList.set(blockDataList.count() - 1, blockDataList.last().set('type', type).set('depth', depth));
      } else if (type === 'code-block') {
        blockDataList = blockDataList.set(blockDataList.count() - 1, blockDataList.last().set('type', type));
      }
    }

    blockDataList = blockDataList.set(blockDataList.count() - 1, concatBlock(blockDataList.last(), searchNodeBlockDataList.first()));

    for (let i = 1; i < searchNodeBlockDataList.count(); i += 1) {
      blockDataList = blockDataList.push(searchNodeBlockDataList.get(i));
    }

    if (searchNode.tagName === 'DIV') {
      metDiv = true;
      blockDataList = blockDataList.push(createNewBlock(''));
    }

    searchNode = searchNode.nextSibling;
  }

  if (metDiv) {
    blockDataList = blockDataList.splice(blockDataList.count() - 1, 1);
  }

  return blockDataList;
}

export function processLineBreakCharacters(blockDataList) {
  let newBlockDataList = fromJS([]);

  blockDataList.forEach((blockData) => {
    const text = blockData.get('text');

    let segmentStart = 0;
    for (let i = 0; i < text.length; i += 1) {
      if (text.charAt(i) === '\n') {
        const slicedBlockData = sliceBlock(blockData, segmentStart, i - segmentStart).set('key', createNewKey());
        newBlockDataList = newBlockDataList.push(slicedBlockData);

        segmentStart = i + 1;
      }
    }

    const slicedBlockData = sliceBlock(blockData, segmentStart, text.length - segmentStart).set('key', createNewKey());
    newBlockDataList = newBlockDataList.push(slicedBlockData);
  });

  return newBlockDataList;
}

export function processLink(blockDataList) {
  return blockDataList.map((blockData) => {
    let newBlockData = blockData;
    let newEntities = newBlockData.get('entities') || List();

    const urls = findUrlsWithinText(newBlockData.get('text'));

    urls.forEach((urlData) => {
      if (urlData.start + urlData.length >= newBlockData.get('text').length) {
        newBlockData = newBlockData.set('text', `${newBlockData.get('text')} `);
      }

      newEntities = addEntityIfNotOverlap(newEntities, createLink(urlData.start, urlData.length, urlData.url));
    });

    return newBlockData.set('entities', newEntities);
  });
}

export function getBlockDataListFromClipboardEvent(evt) {
  const htmlString = evt.clipboardData.getData('text/html');

  const element = document.createElement('div');
  element.innerHTML = htmlString;

  let blockDataList;
  if (isEditorKeyExists(element)) {
    blockDataList = htmlStringToBlockDataListHelper(element);
  } else {
    let text = evt.clipboardData.getData('text/plain');

    text = text.replace(/\r\n|\r/g, '\n'); // for windows

    blockDataList = fromJS([createNewBlock(text)]);
  }

  return processLink(processLineBreakCharacters(blockDataList));
}
