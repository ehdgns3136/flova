import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import CreateInvitement from 'components/CreateInvitement';

import * as Style from './index.style';


class InviteModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({
      step: 0,
      invitedName: '',
    });
    this.props.onClose();
  }

  render() {
    const { loggedInUser, onCreateInviteKeyRequest, isLoading, inviteKey } = this.props;
    if (!loggedInUser) {
      return <div />;
    }

    return (
      <Style.ModalWrapper
        open
        onClose={this.handleClose}
      >
        <Style.CloseIcon className="fa fa-times" onClick={this.handleClose} />
        <CreateInvitement
          isLoading={isLoading}
          inviteKey={inviteKey}
          loggedInUser={loggedInUser}
          onCreateInviteKeyRequest={onCreateInviteKeyRequest}
        />
      </Style.ModalWrapper>
    );
  }
}

InviteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreateInviteKeyRequest: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  inviteKey: PropTypes.string,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
};

export default InviteModal;
