import _ from 'lodash';

export function createStyleEventsList(styles, textLength) {
  const styleEventsList = new Array(textLength + 1);
  for (let i = 0; i < styleEventsList.length ; i++) {
    styleEventsList[i] = [];
  }

  // add style event list
  styles.forEach((style) => {
    // should place 'start' event before 'end' event.
    const styleEventsStart = styleEventsList[style.get('start')];
    if (styleEventsStart) {
      styleEventsStart.push({
        styleType: style.get('type'),
        eventType: 'start',
      });
    }

    const styleEventsEnd = styleEventsList[style.get('start') + style.get('length')];
    if (styleEventsEnd) {
      styleEventsEnd.push({
        styleType: style.get('type'),
        eventType: 'end',
      });
    }
  });

  return styleEventsList;
}

export function createEntityEventsList(entities, textLength) {
  const entityEventsList = new Array(textLength + 1);

  for (let i = 0; i < entityEventsList.length ; i++) {
    entityEventsList[i] = false;
  }

  if (entities) {
    entities.forEach((style) => {
      entityEventsList[style.get('start')] = true;
      entityEventsList[style.get('start') + style.get('length')] = true;
    });
  }

  return entityEventsList;
}

export function splitBlockToSegments(styles, entities, textLength, styleChanges, selectionInfoOnStyleChange) {
  let shouldStyleChange = false;
  let styleChangeRemove = [];
  let styleChangeAdd = [];
  if (styleChanges) { // styleChanges can be null
    styleChangeRemove = styleChanges.get('remove').toJS();
    styleChangeAdd = styleChanges.get('add').toJS();

    if (selectionInfoOnStyleChange && (styleChangeRemove.length || styleChangeAdd.length)) {
      shouldStyleChange = true;
    }
  }

  const styleEventsList = createStyleEventsList(styles, textLength);
  const entityEventsList = createEntityEventsList(entities, textLength);

  const segments = [];
  let state = [];
  let prevState = [];
  let groupStartIndex = 0;
  styleEventsList.forEach((styleEvents, index) => {
    prevState = state;
    const newState = state.slice();

    styleEvents.forEach((styleEvent) => {
      if (styleEvent.eventType === 'start') {
        newState.push(styleEvent.styleType);
      } else if (newState.includes(styleEvent.styleType)) {
        newState.splice(newState.indexOf(styleEvent.styleType), 1);
      }
    });

    // if state changed or this is the last element, add new segment
    if (index !== 0 && (!_.isEqual(prevState.sort(), newState.sort()) || entityEventsList[index] || index === textLength || (shouldStyleChange && index === selectionInfoOnStyleChange.startOffset))) {
      segments.push({
        start: groupStartIndex,
        end: index - 1,
        styles: prevState.slice(),
      });

      groupStartIndex = index;
    }

    if (shouldStyleChange && index === selectionInfoOnStyleChange.startOffset) {
      const changedStyles = prevState.slice();

      styleChangeRemove.forEach((style) => {
        if (changedStyles.includes(style)) {
          changedStyles.splice(changedStyles.indexOf(style), 1);
        }
      });

      styleChangeAdd.forEach((style) => {
        if (!changedStyles.includes(style)) {
          changedStyles.push(style);
        }
      });

      segments.push({
        start: groupStartIndex,
        end: groupStartIndex - 1,
        styles: changedStyles,
        changeSegment: true,
        styleChangeRemove,
        styleChangeAdd,
      });
    }

    state = newState;
  });

  return segments;
}

