/*
 *
 * MobilePasswordResetPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import { createStructuredSelector } from 'reselect';
import Immutable from 'immutable';
import PasswordResetForm from 'components/PasswordResetForm';

import Navbar from 'global/containers/Navbar';
import MobileSimpleNavbar from 'global/containers/MobileSimpleNavbar';

import * as Style from './index.style';
import { makeSelectLoggedInUser } from '../../global/selectors';

export class MobilePasswordResetPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>비밀번호 재설정 - 플로바(Flova)</title>
          <meta name="description" content="비밀번호 재설정 페이지입니다." />
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <MediaQuery minWidth={1008}>
          <Navbar transparent={false} />
        </MediaQuery>
        <MediaQuery maxWidth={1008}>
          <MobileSimpleNavbar title="비밀번호 재설정" />
        </MediaQuery>
        <Style.MobilePasswordResetFormContainer>
          <PasswordResetForm mobile />
        </Style.MobilePasswordResetFormContainer>
      </div>
    );
  }
}

MobilePasswordResetPage.propTypes = {
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
};

const mapStateToProps = createStructuredSelector({
  loggedInUser: makeSelectLoggedInUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobilePasswordResetPage);
