import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PersonalInfoForm from 'components/PersonalInfoForm';
import {
  getCredentialListRequestAction,
  updateProfileImageRequestAction,
  updateProfileRequestAction,
} from '../../global/profile/actions';

import {
  makeSelectLoggedInUser,
} from '../../global/selectors';

const mapStateToProps = createStructuredSelector({
  user: makeSelectLoggedInUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onUpdateProfileImage: (blobSrc) => {
      dispatch(updateProfileImageRequestAction(blobSrc));
    },
    onUpdateProfile: (data) => {
      dispatch(updateProfileRequestAction(data));
    },
    onGetCredentialList: () => {
      dispatch(getCredentialListRequestAction());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoForm);
