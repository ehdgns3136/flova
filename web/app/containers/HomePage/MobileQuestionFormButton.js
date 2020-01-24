/**
 * Created by donghoon on 17. 10. 14.
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MobileQuestionFormButton from 'components/MobileQuestionFormButton';

import {
  makeSelectLoggedInUser,
} from '../../global/selectors';

import {
  setInitialTitle,
} from '../../global/models/question/actions';

const mapStateToProps = createStructuredSelector({
  loggedInUser: makeSelectLoggedInUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    setInitialTitle: (title) => {
      dispatch(setInitialTitle(title));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MobileQuestionFormButton);
