
import { fromJS } from 'immutable';
import entitiesReducer from '../reducer';
import {
  followQuestionRequest,
  followQuestionFailure,
  bookmarkQuestionRequest,
  bookmarkQuestionFailure,
} from '../../models/question/actions';

import {
  likeAnswerRequest,
  likeAnswerFailure,
  downvoteAnswerRequest,
  downvoteAnswerFailure,
  bookmarkAnswerRequest,
  bookmarkAnswerFailure,
  postAnswerSuccess,
  deleteAnswerSuccess,
} from '../../models/answer/actions';

import {
  getQuestionCommentsRequestAction,
  getQuestionCommentsSuccessAction,
  postQuestionCommentSuccessAction,
  deleteQuestionCommentSuccessAction,
  likeQuestionCommentRequestAction,
  likeQuestionCommentFailureAction,
  getAnswerCommentsRequestAction,
  getAnswerCommentsSuccessAction,
  postAnswerCommentSuccessAction,
  deleteAnswerCommentSuccessAction,
  likeAnswerCommentRequestAction,
  likeAnswerCommentFailureAction,
} from '../../models/comment/actions';

import {
  followUserRequest,
  followUserFailure,
} from '../../models/user/actions';

import {
  PAYLOAD_MOCK_1,
  PAYLOAD_MOCK_2,
  PAYLOAD_MOCK_3,
  ANSWER_MOCK_1,
  COMMENTS_MOCK_1,
  COMMENT_MOCK_1,
} from './mocks';


describe('entitiesReducer', () => {
  it('should return the initial state', () => {
    expect(entitiesReducer(undefined, {})).toMatchSnapshot();
  });


  it('should merge entities correctly', () => {
    let state;

    state = entitiesReducer(undefined, {
      type: 'TEST',
      payload: PAYLOAD_MOCK_1,
    });
    expect(state).toMatchSnapshot();

    state = entitiesReducer(state, {
      type: 'TEST2',
      payload: PAYLOAD_MOCK_2,
    });
    expect(state).toMatchSnapshot();

    state = entitiesReducer(state, {
      type: 'TEST3',
      payload: PAYLOAD_MOCK_3,
    });
    expect(state).toMatchSnapshot();
  });


  it('should handle followQuestionRequest action correctly', () => {
    const state1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          is_followed: false,
          followed_num: 3,
        },
      },
    });

    const stateResult1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          is_followed: true,
          followed_num: 4,
        },
      },
    });

    expect(entitiesReducer(state1, followQuestionRequest(1))).toEqual(stateResult1);

    const state2 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          is_followed: true,
          followed_num: 3,
        },
      },
    });

    const stateResult2 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          is_followed: false,
          followed_num: 2,
        },
      },
    });

    expect(entitiesReducer(state2, followQuestionRequest(1))).toEqual(stateResult2);
  });


  it('should handle followQuestionFailure action correctly', () => {
    const state1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          is_followed: false,
          followed_num: 3,
        },
      },
    });

    const stateResult1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          is_followed: true,
          followed_num: 4,
        },
      },
    });

    expect(entitiesReducer(state1, followQuestionFailure(1))).toEqual(stateResult1);

    const state2 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          is_followed: true,
          followed_num: 3,
        },
      },
    });

    const stateResult2 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          is_followed: false,
          followed_num: 2,
        },
      },
    });

    expect(entitiesReducer(state2, followQuestionFailure(1))).toEqual(stateResult2);
  });


  it('should handle likeAnswerRequest action correctly', () => {
    const state1 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: false,
          liked_num: 3,
          is_downvoted: false,
        },
      },
    });

    const stateResult1 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: true,
          liked_num: 4,
          is_downvoted: false,
        },
      },
    });

    expect(entitiesReducer(state1, likeAnswerRequest(1, false))).toEqual(stateResult1);

    const state2 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: false,
          liked_num: 3,
          is_downvoted: true,
        },
      },
    });

    const stateResult2 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: true,
          liked_num: 4,
          is_downvoted: false,
        },
      },
    });

    expect(entitiesReducer(state2, likeAnswerRequest(1, true))).toEqual(stateResult2);

    const state3 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: true,
          liked_num: 3,
          is_downvoted: false,
        },
      },
    });

    const stateResult3 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: false,
          liked_num: 2,
          is_downvoted: false,
        },
      },
    });

    expect(entitiesReducer(state3, likeAnswerRequest(1, false))).toEqual(stateResult3);
  });


  it('should handle likeAnswerFailure action correctly', () => {
    const state1 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: false,
          liked_num: 3,
          is_downvoted: false,
        },
      },
    });

    const stateResult1 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: true,
          liked_num: 4,
          is_downvoted: false,
        },
      },
    });

    expect(entitiesReducer(state1, likeAnswerFailure(1, false))).toEqual(stateResult1);

    const state2 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: true,
          liked_num: 3,
          is_downvoted: false,
        },
      },
    });

    const stateResult2 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: false,
          liked_num: 2,
          is_downvoted: false,
        },
      },
    });

    const stateResult3 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: false,
          liked_num: 2,
          is_downvoted: true,
        },
      },
    });

    expect(entitiesReducer(state2, likeAnswerFailure(1, false))).toEqual(stateResult2);
    expect(entitiesReducer(state2, likeAnswerFailure(1, true))).toEqual(stateResult3);
  });


  it('should handle downvoteAnswerRequest action correctly', () => {
    const state1 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: false,
          liked_num: 3,
          is_downvoted: false,
        },
      },
    });

    const stateResult1 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: false,
          liked_num: 3,
          is_downvoted: true,
        },
      },
    });

    expect(entitiesReducer(state1, downvoteAnswerRequest(1, false))).toEqual(stateResult1);

    const state2 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: false,
          liked_num: 3,
          is_downvoted: true,
        },
      },
    });

    const stateResult2 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: false,
          liked_num: 3,
          is_downvoted: false,
        },
      },
    });

    expect(entitiesReducer(state2, downvoteAnswerRequest(1, false))).toEqual(stateResult2);

    const state3 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: true,
          liked_num: 3,
          is_downvoted: false,
        },
      },
    });

    const stateResult3 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: false,
          liked_num: 2,
          is_downvoted: true,
        },
      },
    });

    expect(entitiesReducer(state3, downvoteAnswerRequest(1, true))).toEqual(stateResult3);
  });


  it('should handle downvoteAnswerFailure action correctly', () => {
    const state1 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: false,
          liked_num: 3,
          is_downvoted: false,
        },
      },
    });

    const stateResult1 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: false,
          liked_num: 3,
          is_downvoted: true,
        },
      },
    });

    expect(entitiesReducer(state1, downvoteAnswerFailure(1, false))).toEqual(stateResult1);

    const state2 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: false,
          liked_num: 3,
          is_downvoted: true,
        },
      },
    });

    const stateResult2 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: false,
          liked_num: 3,
          is_downvoted: false,
        },
      },
    });

    const stateResult3 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_liked: true,
          liked_num: 4,
          is_downvoted: false,
        },
      },
    });

    expect(entitiesReducer(state2, downvoteAnswerFailure(1, false))).toEqual(stateResult2);
    expect(entitiesReducer(state2, downvoteAnswerFailure(1, true))).toEqual(stateResult3);
  });

  it('should handle bookmarkQuestionRequest action correctly', () => {
    const state1 = fromJS({
      questions: {
        1: {
          id: 1,
          content: 'test content',
          is_bookmark: false,
        },
      },
    });

    const stateResult1 = fromJS({
      questions: {
        1: {
          id: 1,
          content: 'test content',
          is_bookmark: true,
        },
      },
    });

    expect(entitiesReducer(state1, bookmarkQuestionRequest(1))).toEqual(stateResult1);
  });

  it('should handle bookmarkQuestionFailure action correctly', () => {
    const state1 = fromJS({
      questions: {
        1: {
          id: 1,
          content: 'test content',
          is_bookmark: false,
        },
      },
    });

    const stateResult1 = fromJS({
      questions: {
        1: {
          id: 1,
          content: 'test content',
          is_bookmark: true,
        },
      },
    });

    expect(entitiesReducer(state1, bookmarkQuestionFailure(1))).toEqual(stateResult1);
  });

  it('should handle bookmarkAnswerRequest action correctly', () => {
    const state1 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_bookmark: false,
        },
      },
    });

    const stateResult1 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_bookmark: true,
        },
      },
    });

    expect(entitiesReducer(state1, bookmarkAnswerRequest(1))).toEqual(stateResult1);
  });

  it('should handle bookmarkAnswerFailure action correctly', () => {
    const state1 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_bookmark: false,
        },
      },
    });

    const stateResult1 = fromJS({
      answers: {
        1: {
          id: 1,
          content: 'test content',
          is_bookmark: true,
        },
      },
    });

    expect(entitiesReducer(state1, bookmarkAnswerFailure(1))).toEqual(stateResult1);
  });

  it('should handle postAnswerSuccess action correctly', () => {
    // TODO : answers of state1 should be empty object Object: {}, but there is some error comparing two object state1 and stateResult1
    const state1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          is_answered: false,
          my_answer: null,
          answer_num: 0,
        },
      },
      answers: {
        1: {
          id: 1,
          content: "[{\"key\":\"6mazrhaj\",\"type\":\"unstyled\",\"depth\":0,\"text\":\"hello\",\"styles\":[],\"entities\":[]}]",
          question: 1,
          writer: 1,
        },
      },
      users: {
      },
    });

    const stateResult1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          is_answered: true,
          my_answer: 1,
          answer_num: 1,
        },
      },
      answers: {
        1: {
          id: 1,
          content: "[{\"key\":\"6mazrhaj\",\"type\":\"unstyled\",\"depth\":0,\"text\":\"hello\",\"styles\":[],\"entities\":[]}]",
          question: 1,
          writer: 1,
        },
      },
      users: {
        1: {
          id: 1,
          name: '김삿갓',
        },
      },
    });

    expect(entitiesReducer(state1, postAnswerSuccess(ANSWER_MOCK_1, 1))).toEqual(stateResult1);
  });

  it('should handle deleteAnswerSuccess action correctly', () => {
    const state1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          is_answered: true,
          my_answer: 1,
          answer_num: 1,
        },
      },
    });

    const stateResult1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          is_answered: false,
          my_answer: null,
          answer_num: 0,
        },
      },
    });

    expect(entitiesReducer(state1, deleteAnswerSuccess(1, 1))).toEqual(stateResult1);
  });

  it('should handle getQuestionCommentsRequest action correctly', () => {
    const state1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          isCommentsLoading: false,
        },
      },
    });

    const stateResult1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          isCommentsLoading: true,
        },
      },
    });

    expect(entitiesReducer(state1, getQuestionCommentsRequestAction(1))).toEqual(stateResult1);
  });

  it('should handle getQuestionCommentsSuccess action correctly', () => {
    const state1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          isCommentsLoading: true,
          comments: [],
        },
      },
      questionComments: {
      },
      users: {
      },
    });

    const stateResult1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          isCommentsLoading: false,
          comments: [
            1,
            2,
          ],
        },
      },
      questionComments: {
        1: {
          id: 1,
          content: 'test1',
          writer: 1,
        },
        2: {
          id: 2,
          content: 'test2',
          writer: 2,
        },
      },
      users: {
        1: {
          id: 1,
          name: '김삿갓',
        },
        2: {
          id: 2,
          name: '홍길동',
        },
      },
    });

    expect(entitiesReducer(state1, getQuestionCommentsSuccessAction(1, COMMENTS_MOCK_1, 'NEXT_CURSOR', 'PREVIOUS_CURSOR'))).toEqual(stateResult1);
  });

  it('should handle postQuestionCommentSuccess action correctly', () => {
    const state1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          comments: [],
          comment_num: 0,
        },
      },
      questionComments: {
      },
    });

    const stateResult1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          comments: [
            1,
          ],
          comment_num: 1,
        },
      },
      questionComments: {
        1: {
          id: 1,
          content: 'test',
          writer: 1,
        },
      },
      users: {
        1: {
          id: 1,
          name: '김삿갓',
        },
      },
    });

    expect(entitiesReducer(state1, postQuestionCommentSuccessAction(COMMENT_MOCK_1, 1))).toEqual(stateResult1);
  });

  it('should handle deleteQuestionCommentSuccess action correctly', () => {
    const state1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          comments: [
            1,
          ],
          comment_num: 1,
        },
      },
    });

    const stateResult1 = fromJS({
      questions: {
        1: {
          id: 1,
          title: 'test',
          content: 'test content',
          comments: [],
          comment_num: 0,
        },
      },
    });

    expect(entitiesReducer(state1, deleteQuestionCommentSuccessAction(1, 1))).toEqual(stateResult1);
  });

  it('should handle likeQuestionCommentRequest action correctly', () => {
    const state1 = fromJS({
      questionComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: false,
          liked_num: 0,
        },
      },
    });

    const stateResult1 = fromJS({
      questionComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: true,
          liked_num: 1,
        },
      },
    });

    expect(entitiesReducer(state1, likeQuestionCommentRequestAction(1))).toEqual(stateResult1);

    const state2 = fromJS({
      questionComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: true,
          liked_num: 1,
        },
      },
    });

    const stateResult2 = fromJS({
      questionComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: false,
          liked_num: 0,
        },
      },
    });

    expect(entitiesReducer(state2, likeQuestionCommentRequestAction(1))).toEqual(stateResult2);
  });

  it('should handle likeQuestionCommentFailure action correctly', () => {
    const state1 = fromJS({
      questionComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: true,
          liked_num: 1,
        },
      },
    });

    const stateResult1 = fromJS({
      questionComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: false,
          liked_num: 0,
        },
      },
    });

    expect(entitiesReducer(state1, likeQuestionCommentFailureAction(1))).toEqual(stateResult1);

    const state2 = fromJS({
      questionComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: false,
          liked_num: 0,
        },
      },
    });

    const stateResult2 = fromJS({
      questionComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: true,
          liked_num: 1,
        },
      },
    });

    expect(entitiesReducer(state2, likeQuestionCommentFailureAction(1))).toEqual(stateResult2);
  });

  it('should handle getAnswerCommentsRequest action correctly', () => {
    const state1 = fromJS({
      answers: {
        1: {
          isCommentsLoading: false,
        },
      },
    });

    const stateResult1 = fromJS({
      answers: {
        1: {
          isCommentsLoading: true,
        },
      },
    });

    expect(entitiesReducer(state1, getAnswerCommentsRequestAction(1))).toEqual(stateResult1);
  });

  it('should handle getAnswerCommentsSuccess action correctly', () => {
    const state1 = fromJS({
      answers: {
        1: {
          isCommentsLoading: true,
          comments: [],
        },
      },
      answerComments: {
      },
      users: {
      },
    });

    const stateResult1 = fromJS({
      answers: {
        1: {
          isCommentsLoading: false,
          comments: [
            1,
            2,
          ],
        },
      },
      answerComments: {
        1: {
          id: 1,
          content: 'test1',
          writer: 1,
        },
        2: {
          id: 2,
          content: 'test2',
          writer: 2,
        },
      },
      users: {
        1: {
          id: 1,
          name: '김삿갓',
        },
        2: {
          id: 2,
          name: '홍길동',
        },
      },
    });

    expect(entitiesReducer(state1, getAnswerCommentsSuccessAction(1, COMMENTS_MOCK_1, 'NEXT_CURSOR', 'PREVIOUS_CURSOR'))).toEqual(stateResult1);
  });

  it('should handle postAnswerCommentSuccess action correctly', () => {
    const state1 = fromJS({
      answers: {
        1: {
          isCommentsLoading: false,
          comments: [],
          comment_num: 0,
        },
      },
      answerComments: {
      },
      users: {
      },
    });

    const stateResult1 = fromJS({
      answers: {
        1: {
          isCommentsLoading: false,
          comments: [
            1,
          ],
          comment_num: 1,
        },
      },
      answerComments: {
        1: {
          id: 1,
          content: 'test',
          writer: 1,
        },
      },
      users: {
        1: {
          id: 1,
          name: '김삿갓',
        },
      },
    });

    expect(entitiesReducer(state1, postAnswerCommentSuccessAction(COMMENT_MOCK_1, 1))).toEqual(stateResult1);
  });

  it('should handle deleteAnswerCommentSuccess action correctly', () => {
    const state1 = fromJS({
      answers: {
        1: {
          isCommentsLoading: false,
          comments: [
            1,
          ],
          comment_num: 1,
        },
      },
    });

    const stateResult1 = fromJS({
      answers: {
        1: {
          isCommentsLoading: false,
          comments: [],
          comment_num: 0,
        },
      },
    });

    expect(entitiesReducer(state1, deleteAnswerCommentSuccessAction(1, 1))).toEqual(stateResult1);
  });

  it('should handle likeAnswerCommentRequest action correctly', () => {
    const state1 = fromJS({
      answerComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: false,
          liked_num: 0,
        },
      },
    });

    const stateResult1 = fromJS({
      answerComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: true,
          liked_num: 1,
        },
      },
    });

    expect(entitiesReducer(state1, likeAnswerCommentRequestAction(1))).toEqual(stateResult1);

    const state2 = fromJS({
      answerComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: true,
          liked_num: 1,
        },
      },
    });

    const stateResult2 = fromJS({
      answerComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: false,
          liked_num: 0,
        },
      },
    });

    expect(entitiesReducer(state2, likeAnswerCommentRequestAction(1))).toEqual(stateResult2);
  });

  it('should handle likeAnswerCommentFailure action correctly', () => {
    const state1 = fromJS({
      answerComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: true,
          liked_num: 1,
        },
      },
    });

    const stateResult1 = fromJS({
      answerComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: false,
          liked_num: 0,
        },
      },
    });

    expect(entitiesReducer(state1, likeAnswerCommentFailureAction(1))).toEqual(stateResult1);

    const state2 = fromJS({
      answerComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: false,
          liked_num: 0,
        },
      },
    });

    const stateResult2 = fromJS({
      answerComments: {
        1: {
          id: 1,
          content: 'test',
          is_liked: true,
          liked_num: 1,
        },
      },
    });

    expect(entitiesReducer(state2, likeAnswerCommentFailureAction(1))).toEqual(stateResult2);
  });

  it('should handle followUserRequest action correctly', () => {
    const state1 = fromJS({
      users: {
        1: {
          id: 1,
          is_following: false,
          follower_num: 0,
        },
      },
    });

    const stateResult1 = fromJS({
      users: {
        1: {
          id: 1,
          is_following: true,
          follower_num: 1,
        },
      },
    });

    expect(entitiesReducer(state1, followUserRequest(1))).toEqual(stateResult1);
  });

  it('should handle followUserFailure action correctly', () => {
    const state1 = fromJS({
      users: {
        1: {
          id: 1,
          is_following: true,
          follower_num: 1,
        },
      },
    });

    const stateResult1 = fromJS({
      users: {
        1: {
          id: 1,
          is_following: false,
          follower_num: 0,
        },
      },
    });

    expect(entitiesReducer(state1, followUserFailure(1))).toEqual(stateResult1);
  });
});
