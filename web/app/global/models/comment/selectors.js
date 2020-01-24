import { createSelector } from 'reselect';

/**
 * Direct selector to the global state domain
 */

const selectCommentDomain = () => (state) => state.get('comment');


/**
 * Entities selectors
 */
const makeSelectQuestionsCommentsCursor = () => createSelector(
  selectCommentDomain(),
  (substate) => substate.get('questionsCommentsCursor'),
);

const makeSelectAnswerCommentsCursor = () => createSelector(
  selectCommentDomain(),
  (substate) => substate.get('answerCommentsCursor'),
);

export default selectCommentDomain;
export {
  makeSelectQuestionsCommentsCursor,
  makeSelectAnswerCommentsCursor,
};
