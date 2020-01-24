export const EDITOR_STATE_MOCK = [
  {
    key: '1',
    type: 'unstyled',
    text: '목 데이이이터후후 와우',
    depth: 0,
    styles: [
      {
        type: 'bold',
        start: 2,
        length: 3,
      },
    ],
    entities: [
      {
        type: 'link',
        start: 6,
        length: 2,
        data: {
          url: 'https://www.facebook.com',
        },
      },
    ],
  },
  {
    key: '2',
    type: 'unordered-list-item',
    text: '',
    depth: 0,
    styles: [],
  },
  {
    key: '3',
    type: 'unordered-list-item',
    text: '후후후',
    depth: 1,
    styles: [],
  },
  {
    key: '4',
    type: 'ordered-list-item',
    text: 'ㅇㅇ',
    depth: 0,
    styles: [],
  },
  {
    key: '5',
    type: 'code-block',
    text: 'export function add(a, b) {',
    depth: 0,
    styles: [],
  },
  {
    key: '6',
    type: 'code-block',
    text: '    return a + b;',
    depth: 0,
    styles: [],
  },
  {
    key: '7',
    type: 'code-block',
    text: '}',
    depth: 0,
    styles: [],
  },
  {
    key: '8',
    type: 'image',
    text: '',
    depth: 0,
    styles: [],
    data: {
      src: 'https://s3.ap-northeast-2.amazonaws.com/flova/b8403857-7327-4c09-baa4-054ac01750ab.jpg',
    },
  },
];
