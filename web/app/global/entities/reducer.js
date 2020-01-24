/*
 *
 * Global reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_QUESTION_COMMENTS_REQUEST,
  GET_QUESTION_COMMENTS_SUCCESS,
  POST_QUESTION_COMMENT_SUCCESS,
  DELETE_QUESTION_COMMENT_SUCCESS,
  LIKE_QUESTION_COMMENT_REQUEST,
  LIKE_QUESTION_COMMENT_FAILURE,
  GET_ANSWER_COMMENTS_REQUEST,
  GET_ANSWER_COMMENTS_SUCCESS,
  POST_ANSWER_COMMENT_SUCCESS,
  DELETE_ANSWER_COMMENT_SUCCESS,
  LIKE_ANSWER_COMMENT_REQUEST,
  LIKE_ANSWER_COMMENT_FAILURE,
} from '../models/comment/constants';

import {
  POST_ANSWER_SUCCESS,
  DELETE_ANSWER_SUCCESS,
  LIKE_ANSWER_REQUEST,
  LIKE_ANSWER_FAILURE,
  DOWNVOTE_ANSWER_REQUEST,
  DOWNVOTE_ANSWER_FAILURE,
  BOOKMARK_ANSWER_REQUEST,
  BOOKMARK_ANSWER_FAILURE,
} from '../models/answer/constants';

import {
  FOLLOW_QUESTION_REQUEST,
  FOLLOW_QUESTION_FAILURE,
  BOOKMARK_QUESTION_REQUEST,
  BOOKMARK_QUESTION_FAILURE,
} from '../models/question/constants';

import {
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_FAILURE,
} from '../models/user/constants';

const initialState = fromJS({
});


function entitiesReducer(state = initialState, action) {
  switch (action.type) {
    case FOLLOW_QUESTION_REQUEST:
      return state.updateIn(['questions', action.questionID.toString()], (question) => question.merge({
        is_followed: !question.get('is_followed'),
        followed_num: question.get('is_followed') ? question.get('followed_num') - 1 : question.get('followed_num') + 1,
      }));
    case FOLLOW_QUESTION_FAILURE:
      return state.updateIn(['questions', action.questionID.toString()], (question) => question.merge({
        is_followed: !question.get('is_followed'),
        followed_num: question.get('is_followed') ? question.get('followed_num') - 1 : question.get('followed_num') + 1,
      }));
    case LIKE_ANSWER_REQUEST:
      return state.updateIn(['answers', action.answerID.toString()], (answer) => answer.merge({
        is_liked: !answer.get('is_liked'),
        liked_num: answer.get('is_liked') ? answer.get('liked_num') - 1 : answer.get('liked_num') + 1,
        is_downvoted: false,
      }));
    case LIKE_ANSWER_FAILURE:
      return state.updateIn(['answers', action.answerID.toString()], (answer) => answer.merge({
        is_liked: !answer.get('is_liked'),
        liked_num: answer.get('is_liked') ? answer.get('liked_num') - 1 : answer.get('liked_num') + 1,
        is_downvoted: action.isDownVoted,
      }));
    case DOWNVOTE_ANSWER_REQUEST:
      return state.updateIn(['answers', action.answerID.toString()], (answer) => answer.merge({
        is_downvoted: !answer.get('is_downvoted'),
        liked_num: action.isLiked ? answer.get('liked_num') - 1 : answer.get('liked_num'),
        is_liked: false,
      }));
    case DOWNVOTE_ANSWER_FAILURE:
      return state.updateIn(['answers', action.answerID.toString()], (answer) => answer.merge({
        is_downvoted: !answer.get('is_downvoted'),
        liked_num: action.isLiked ? answer.get('liked_num') + 1 : answer.get('liked_num'),
        is_liked: action.isLiked,
      }));
    case FOLLOW_USER_REQUEST:
      return state.updateIn(['users', action.userId.toString()], (user) => user.merge({
        is_following: !user.get('is_following'),
        follower_num: user.get('is_following') ? user.get('follower_num') - 1 : user.get('follower_num') + 1,
      }));
    case FOLLOW_USER_FAILURE:
      return state.updateIn(['users', action.userId.toString()], (user) => user.merge({
        is_following: !user.get('is_following'),
        follower_num: user.get('is_following') ? user.get('follower_num') - 1 : user.get('follower_num') + 1,
      }));
    case GET_QUESTION_COMMENTS_REQUEST:
      return state.updateIn(['questions', action.questionID.toString()], (question) => question.set('isCommentsLoading', true));
    case GET_QUESTION_COMMENTS_SUCCESS: {
      return state.updateIn(['questions', action.questionID.toString()], (question) => question.merge({
        isCommentsLoading: false,
        comments: fromJS(action.payload.result).concat(question.get('comments')),
      }));
    }
    case POST_QUESTION_COMMENT_SUCCESS:
      return state.updateIn(['questions', action.questionID.toString()], (question) => question.merge({
        comments: question.get('comments').push(fromJS(action.payload.result)),
        comment_num: question.get('comment_num') + 1,
      }));
    case DELETE_QUESTION_COMMENT_SUCCESS:
      return state.updateIn(['questions', action.questionID.toString(), 'comments'], (comments) => comments.remove(
        comments.findIndex((comment) => comment === action.commentID)
      )).updateIn(['questions', action.questionID.toString()], (question) => question.set('comment_num', question.get('comment_num') - 1));
    case LIKE_QUESTION_COMMENT_REQUEST: {
      return state.updateIn(['questionComments', action.commentID.toString()], (comment) => comment.merge({
        is_liked: !comment.get('is_liked'),
        liked_num: comment.get('is_liked') ? comment.get('liked_num') - 1 : comment.get('liked_num') + 1,
      }));
    }
    case LIKE_QUESTION_COMMENT_FAILURE:
      return state.updateIn(['questionComments', action.commentID.toString()], (comment) => comment.merge({
        is_liked: !comment.get('is_liked'),
        liked_num: comment.get('is_liked') ? comment.get('liked_num') - 1 : comment.get('liked_num') + 1,
      }));
    case GET_ANSWER_COMMENTS_REQUEST:
      return state.updateIn(['answers', action.answerID.toString()], (answer) => answer.set('isCommentsLoading', true));
    case GET_ANSWER_COMMENTS_SUCCESS: {
      return state.updateIn(['answers', action.answerID.toString()], (answer) => answer.merge({
        isCommentsLoading: false,
        comments: fromJS(action.payload.result).concat(answer.get('comments')),
      }));
    }
    case POST_ANSWER_COMMENT_SUCCESS:
      return state.updateIn(['answers', action.answerID.toString()], (answer) => answer.merge({
        comments: answer.get('comments').push(fromJS(action.payload.result)),
        comment_num: answer.get('comment_num') + 1,
      }));
    case DELETE_ANSWER_COMMENT_SUCCESS:
      return state.updateIn(['answers', action.answerID.toString(), 'comments'], (comments) => comments.remove(
        comments.findIndex((comment) => comment === action.commentID)
      )).updateIn(['answers', action.answerID.toString()], (answer) => answer.set('comment_num', answer.get('comment_num') - 1));
    case LIKE_ANSWER_COMMENT_REQUEST: {
      return state.updateIn(['answerComments', action.commentID.toString()], (comment) => comment.merge({
        is_liked: !comment.get('is_liked'),
        liked_num: comment.get('is_liked') ? comment.get('liked_num') - 1 : comment.get('liked_num') + 1,
      }));
    }
    case LIKE_ANSWER_COMMENT_FAILURE:
      return state.updateIn(['answerComments', action.commentID.toString()], (comment) => comment.merge({
        is_liked: !comment.get('is_liked'),
        liked_num: comment.get('is_liked') ? comment.get('liked_num') - 1 : comment.get('liked_num') + 1,
      }));
    case POST_ANSWER_SUCCESS:
      return state.updateIn(['questions', action.questionID.toString()], (question) => question.merge({
        is_answered: true,
        my_answer: fromJS(action.payload.result),
        answer_num: question.get('answer_num') + 1,
      }));
    case DELETE_ANSWER_SUCCESS:
      return state.updateIn(['questions', action.questionID.toString()], (question) => question.merge({
        is_answered: false,
        my_answer: null,
        answer_num: question.get('answer_num') - 1,
      }));
    case BOOKMARK_QUESTION_REQUEST:
      return state.updateIn(['questions', action.questionID.toString()], (question) => question.merge({
        is_bookmark: !question.get('is_bookmark'),
      }));
    case BOOKMARK_QUESTION_FAILURE:
      return state.updateIn(['questions', action.questionID.toString()], (question) => question.merge({
        is_bookmark: !question.get('is_bookmark'),
      }));
    case BOOKMARK_ANSWER_REQUEST:
      return state.updateIn(['answers', action.answerID.toString()], (answer) => answer.merge({
        is_bookmark: !answer.get('is_bookmark'),
      }));
    case BOOKMARK_ANSWER_FAILURE:
      return state.updateIn(['answers', action.answerID.toString()], (answer) => answer.merge({
        is_bookmark: !answer.get('is_bookmark'),
      }));
    default: {
      return state;
    }
  }
}

function mergeEntities(state = initialState, action) {
  const payload = action.payload;

  if (payload && payload.entities) {
    return state.mergeDeep(payload.entities);
  }

  return state;
}

function combinedEntityReducer(state = initialState, action) {
  return entitiesReducer(mergeEntities(state, action), action);
}

export default combinedEntityReducer;
