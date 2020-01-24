import LargeProfile from 'components/LargeProfile';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { openInviteModal } from 'global/inviteModal/actions';
import { makeSelectLoggedInUser } from 'global/selectors';
import { updateProfileImageRequestAction, updateProfileRequestAction } from 'global/profile/actions';
import { followUserRequest } from 'global/models/user/actions';
import { logout } from 'global/actions';

import { makeSelectProfile } from './selectors';

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  loggedInUser: makeSelectLoggedInUser(),
});


function mapDispatchToProps(dispatch) {
  return {
    onUpdateProfileImage: (src) => {
      dispatch(updateProfileImageRequestAction(src));
    },
    onUpdateProfile: (data) => {
      dispatch(updateProfileRequestAction(data));
    },
    onFollowUserRequest: (id) => {
      dispatch(followUserRequest(id));
    },
    onOpenInviteModal: () => {
      dispatch(openInviteModal());
    },
    onLogout: () => {
      dispatch(logout());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LargeProfile);
