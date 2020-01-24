export const PAYLOAD_MOCK_1 = {
  result: [
    {
      question: 1,
    },
  ],
  entities: {
    questions: {
      1: {
        id: 1,
        title: 'test',
        content: 'test content',
      },
    },
  },
};

export const PAYLOAD_MOCK_2 = {
  result: [
    {
      question: 2,
    },
  ],
  entities: {
    questions: {
      2: {
        id: 2,
        title: 'test 2',
        content: 'test 2 content',
      },
    },
  },
};

export const PAYLOAD_MOCK_3 = {
  result: [
    {
      question: 1,
    },
  ],
  entities: {
    questions: {
      1: {
        id: 1,
        title: 'test',
        content: 'test content',
        additionalData: 'additional data',
      },
    },
  },
};

export const ANSWER_MOCK_1 = {
  id: 1,
  question: 1,
  content: "[{\"key\":\"6mazrhaj\",\"type\":\"unstyled\",\"depth\":0,\"text\":\"hello\",\"styles\":[],\"entities\":[]}]",
  writer: {
    id: 1,
    name: '김삿갓',
  },
};

export const COMMENTS_MOCK_1 = [
  {
    id: 1,
    content: 'test1',
    writer: {
      id: 1,
      name: '김삿갓',
    },
  },
  {
    id: 2,
    content: 'test2',
    writer: {
      id: 2,
      name: '홍길동',
    },
  },
];

export const COMMENT_MOCK_1 = {
  id: 1,
  content: 'test',
  writer: {
    id: 1,
    name: '김삿갓',
  },
};

