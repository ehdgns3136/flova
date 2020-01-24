/*
 *
 * InvitePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Loader } from 'semantic-ui-react';
import InviteError from 'components/InviteError';
import { browserHistory } from 'react-router';

import WelcomeForm from './WelcomeForm';
import {
  makeSelectIsValidating,
  makeSelectValidateError,
} from './selectors';
import * as Style from './index.style';
import backgroundImg from '../../assets/intro-background.jpg';
import {
  validateInviteKeyRequest,
} from './actions';
import {
  makeSelectLoggedInUser,
} from '../../global/selectors';


export class InvitePage extends React.Component {
  componentDidMount() {
    this.props.onValidateInviteKeyRequest(this.props.params.key);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.validateError || nextProps.loggedInUser) {
      browserHistory.push('/signup');
    }
  }

  isFormInvisible() {
    const { loggedInUser, isValidating, validateError } = this.props;

    if (loggedInUser) {
      return true;
    }

    return isValidating || validateError;
  }

  render() {
    const { isValidating, validateError, loggedInUser } = this.props;
    return (
      <Style.InvitePageContainer>
        <Helmet>
          <title>초대장 - 플로바(Flova)</title>
          <meta name="description" content="초대장을 만들어서 플로바(Flova)에 친구를 초대해보세요!" />
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <Style.BackgroundImage src={backgroundImg} role="presentation" width="100%" height="135%" />
        {
          isValidating ?
            <Loader active />
            : null
        }
        {
          this.isFormInvisible() ?
            null
            : <WelcomeForm />
        }
      </Style.InvitePageContainer>
    );
  }
}

InvitePage.propTypes = {
  validateError: PropTypes.object,
  isValidating: PropTypes.bool,
  onValidateInviteKeyRequest: PropTypes.func.isRequired,
  params: PropTypes.object,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
};

const mapStateToProps = createStructuredSelector({
  validateError: makeSelectValidateError(),
  isValidating: makeSelectIsValidating(),
  loggedInUser: makeSelectLoggedInUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onValidateInviteKeyRequest: (inviteKey) => {
      dispatch(validateInviteKeyRequest(inviteKey));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitePage);
