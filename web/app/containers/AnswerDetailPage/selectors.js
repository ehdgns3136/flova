import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import selectEntitiesDomain from 'global/entities/selectors';
import { answerSchema, questionSchema } from '../../global/entities/schemas';

/**
 * Direct selector to the answerDetailPage state domain
 */
const selectAnswerDetailPageDomain = () => (state) => state.get('answerDetailPage');

/**
 * Other specific selectors
 */

const makeSelectAnswer = () => createSelector(
  selectAnswerDetailPageDomain(),
  selectEntitiesDomain(),
  (substate, entities) => denormalize(substate.get('answer'), answerSchema, entities),
);

const makeSelectQuestion = () => createSelector(
  selectAnswerDetailPageDomain(),
  selectEntitiesDomain(),
  (substate, entities) => denormalize(substate.get('question'), questionSchema, entities),
);

const makeSelectIsAnswerLoading = () => createSelector(
  selectAnswerDetailPageDomain(),
  (substate) => substate.get('isAnswerLoading'),
);

const makeSelectIsQuestionLoading = () => createSelector(
  selectAnswerDetailPageDomain(),
  (substate) => substate.get('isQuestionLoading'),
);

/**
 * Default selector used by AnswerDetailPage
 */

const makeSelectAnswerDetailPage = () => createSelector(
  selectAnswerDetailPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectAnswerDetailPage;
export {
  selectAnswerDetailPageDomain,
  makeSelectAnswer,
  makeSelectQuestion,
  makeSelectIsAnswerLoading,
  makeSelectIsQuestionLoading,
};
