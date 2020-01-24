import { Map } from 'immutable';


export function createNewInlineStyle(type, start, length) {
  return Map({
    type,
    start,
    length,
  });
}
