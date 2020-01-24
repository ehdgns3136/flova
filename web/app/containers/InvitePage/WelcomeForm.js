import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import WelcomeForm from 'components/WelcomeForm';
import {
  makeSelectInvitedName,
  makeSelectInviteKey,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  invitedName: makeSelectInvitedName(),
  inviteKey: makeSelectInviteKey(),
});

export default connect(mapStateToProps, null)(WelcomeForm);
