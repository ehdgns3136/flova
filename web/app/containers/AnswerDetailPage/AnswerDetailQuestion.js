/**
 * Created by donghoon on 18. 1. 30.
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AnswerDetailQuestion from 'components/AnswerDetailQuestion';
import { makeSelectQuestion } from './selectors';

const mapStateToProps = createStructuredSelector({
  question: makeSelectQuestion(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerDetailQuestion);
