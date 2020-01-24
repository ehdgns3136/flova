import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import EmailCheckForm from 'components/EmailCheckForm';
// import { showToastRequest } from 'global/actions';
import { makeSelectEmailExist, makeSelectIsLoading } from './selectors';
import { checkEmailExistRequestAction } from './actions';

const mapStateToProps = createStructuredSelector({
  emailExist: makeSelectEmailExist(),
  isLoading: makeSelectIsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCheckEmailExistClick: (email) => {
      dispatch(checkEmailExistRequestAction(email));
    },
    // showEmailCheckResult: (toastType, title, content) => {
    //   dispatch(showToastRequest(toastType, title, content));
    // },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailCheckForm);
