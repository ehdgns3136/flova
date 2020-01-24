/**
 * Created by donghoon on 17. 11. 28.
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import QuestionDetailStats from 'components/QuestionDetailStats';

import {
  makeSelectQuestion,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  question: makeSelectQuestion(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailStats);
