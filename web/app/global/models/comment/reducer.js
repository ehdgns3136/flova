/*
 *
 * Global reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_QUESTION_COMMENTS_SUCCESS,
  GET_ANSWER_COMMENTS_SUCCESS,
} from './constants';


const initialState = fromJS({
  questionsCommentsCursor: [],
  answerCommentsCursor: [],
});


function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTION_COMMENTS_SUCCESS: {
      let questionsCursor = state.get('questionsCommentsCursor');
      const cursorIndex = questionsCursor.findIndex((cursor) => cursor.get('id') === action.questionID);
      if (cursorIndex === -1) {
        questionsCursor = questionsCursor.push(fromJS({
          id: action.questionID,
          next: action.commentsNext,
          previous: action.commentsPrevious,
        }));
      } else {
        questionsCursor = questionsCursor.update(cursorIndex,
          (cursor) => cursor.set('next', action.commentsNext).set('previous', action.commentsPrevious)
        );
      }
      return state.set('questionsCommentsCursor', questionsCursor);
    }
    case GET_ANSWER_COMMENTS_SUCCESS: {
      let answersCursor = state.get('answerCommentsCursor');
      const cursorIndex = answersCursor.findIndex((cursor) => cursor.get('id') === action.answerID);
      if (cursorIndex === -1) {
        answersCursor = answersCursor.push(fromJS({
          id: action.answerID,
          next: action.commentsNext,
          previous: action.commentsPrevious,
        }));
      } else {
        answersCursor = answersCursor.update(cursorIndex,
          (cursor) => cursor.set('next', action.commentsNext).set('previous', action.commentsPrevious)
        );
      }
      return state.set('answerCommentsCursor', answersCursor);
    }
    default: {
      return state;
    }
  }
}

export default commentReducer;
