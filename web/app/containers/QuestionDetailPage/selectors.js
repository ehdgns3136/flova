import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import selectEntitiesDomain from 'global/entities/selectors';
import { answersSchema } from './schemas';
import { questionSchema } from '../../global/entities/schemas';
/**
 * Direct selector to the questionDetailPage state domain
 */
const selectQuestionDetailPageDomain = () => (state) => state.get('questionDetailPage');

/**
 * Other specific selectors
 */

const makeSelectAnswers = () => createSelector(
  selectQuestionDetailPageDomain(),
  selectEntitiesDomain(),
  (substate, entities) => denormalize(substate.get('answers'), answersSchema, entities),
);

const makeSelectQuestion = () => createSelector(
  selectQuestionDetailPageDomain(),
  selectEntitiesDomain(),
  (substate, entities) => denormalize(substate.get('question'), questionSchema, entities),
);

const makeSelectIsAnswersLoading = () => createSelector(
  selectQuestionDetailPageDomain(),
  (substate) => substate.get('isAnswersLoading'),
);

const makeSelectIsQuestionLoading = () => createSelector(
  selectQuestionDetailPageDomain(),
  (substate) => substate.get('isQuestionLoading'),
);


/**
 * Default selector used by QuestionDetailPage
 */

const makeSelectQuestionDetailPage = () => createSelector(
  selectQuestionDetailPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectQuestionDetailPage;
export {
  selectQuestionDetailPageDomain,
  makeSelectAnswers,
  makeSelectQuestion,
  makeSelectIsAnswersLoading,
  makeSelectIsQuestionLoading,
};
