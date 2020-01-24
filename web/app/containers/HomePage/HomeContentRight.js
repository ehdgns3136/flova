import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomeContentRight from 'components/HomeContentRight';

import {
  makeSelectLoggedInUser,
} from '../../global/selectors';
import {
  openInviteModal,
} from '../../global/inviteModal/actions';

const mapStateToProps = createStructuredSelector({
  loggedInUser: makeSelectLoggedInUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onOpenInviteModal: () => {
      dispatch(openInviteModal());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContentRight);
