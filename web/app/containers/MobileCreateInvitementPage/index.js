import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import withAuthentication from 'hoc/withAuthentication';
import MobileSimpleNavbar from 'global/containers/MobileSimpleNavbar';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectLoggedInUser,
} from 'global/selectors';
import {
  createInviteKeyRequest,
} from 'global/inviteModal/actions';
import {
  makeSelectIsCreating,
  makeSelectInviteKey,
} from 'global/inviteModal/selectors';
import Helmet from 'react-helmet';
import CreateInvitement from 'components/CreateInvitement';

import * as Style from './index.style';

export class MobileCreateInvitementPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { onCreateInviteKeyRequest, isLoading, inviteKey, loggedInUser } = this.props;

    return (
      <div>
        <Helmet>
          <title>초대장 만들기 - 플로바(Flova)</title>
          <meta name="description" content="초대장을 만들어서 플로바(Flova)에 친구를 초대해보세요!" />
          <style type="text/css">{'body, html { background-color: #fbfbfb; }'}</style>
        </Helmet>
        <MobileSimpleNavbar title="초대장 만들기" />
        <Style.MobileContent>
          <CreateInvitement
            isLoading={isLoading}
            inviteKey={inviteKey}
            loggedInUser={loggedInUser}
            onCreateInviteKeyRequest={onCreateInviteKeyRequest}
          />
        </Style.MobileContent>
      </div>
    );
  }
}

MobileCreateInvitementPage.propTypes = {
  onCreateInviteKeyRequest: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  inviteKey: PropTypes.string,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
};


const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsCreating(),
  inviteKey: makeSelectInviteKey(),
  loggedInUser: makeSelectLoggedInUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCreateInviteKeyRequest: (invitedName) => {
      dispatch(createInviteKeyRequest(invitedName));
    },
  };
}


export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(MobileCreateInvitementPage));
