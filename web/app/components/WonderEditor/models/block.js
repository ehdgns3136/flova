import { Map, List } from 'immutable';


let lastBlockKey = null;
let index = 0;

export function createNewKey() {
  let newBlockKey = (new Date()).getTime().toString(36).split('').reverse().join('');

  if (lastBlockKey === newBlockKey) {
    index += 1;

    newBlockKey = newBlockKey.concat(index.toString());
  } else {
    lastBlockKey = newBlockKey;
  }

  return newBlockKey;
}

export function createNewBlock(text = '') {
  const newKey = createNewKey();
  return Map({
    key: newKey,
    type: 'unstyled',
    depth: 0,
    text,
    styles: List(),
    entities: List(),
  });
}
