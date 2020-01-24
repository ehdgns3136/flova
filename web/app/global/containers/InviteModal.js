import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InviteModal from 'components/InviteModal';
import {
  makeSelectLoggedInUser,
} from 'global/selectors';

import {
  closeInviteModal,
  createInviteKeyRequest,
} from '../inviteModal/actions';
import {
  makeSelectIsCreating,
  makeSelectInviteKey,
} from '../inviteModal/selectors';

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsCreating(),
  inviteKey: makeSelectInviteKey(),
  loggedInUser: makeSelectLoggedInUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onClose: () => {
      dispatch(closeInviteModal());
    },
    onCreateInviteKeyRequest: (invitedName) => {
      dispatch(createInviteKeyRequest(invitedName));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteModal);
