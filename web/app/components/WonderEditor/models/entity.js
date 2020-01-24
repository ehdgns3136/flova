import { Map } from 'immutable';


export function createNewEntity(type, start, length, data) {
  return Map({
    type,
    start,
    length,
    data,
  });
}

export function createLink(start, length, url) {
  const data = Map({
    url,
  });

  return createNewEntity('link', start, length, data);
}

export function findUrlsWithinText(text) {
  const urls = [];

  const urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  let searchText = text;
  let searchIndex = 0;
  while (searchText && searchIndex < text.length) {
    const startIndex = searchText.search(/($|[^\s])/);

    searchIndex += startIndex;
    searchText = searchText.slice(startIndex);

    const endIndex = searchText.search(/($|\s)/);

    const testText = searchText.slice(0, endIndex);
    if (urlRegex.test(testText)) {
      urls.push({
        start: searchIndex,
        length: testText.length,
        url: testText,
      });
    }

    searchIndex += endIndex;
    searchText = searchText.slice(endIndex);
  }

  return urls;
}

export function addEntityIfNotOverlap(entities, newEntity) {
  let newEntities = entities;

  const newEntityStart = newEntity.get('start');
  const newEntityLength = newEntity.get('length');

  for (let i = 0; i < entities.count(); i += 1) {
    const entity = entities.get(i);

    if (entity.get('start') + entity.get('length') >= entity.get('start') && entity.get('start') < newEntityStart + newEntityLength) {
      return newEntities;
    }
  }

  newEntities = newEntities.push(newEntity);

  return newEntities;
}
