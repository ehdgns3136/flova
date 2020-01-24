/*
 *
 * SettingsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import withAuthentication from 'hoc/withAuthentication';
import Navbar from 'global/containers/Navbar';
import PasswordResetForm from 'components/PasswordResetForm';
import SettingsCategories from 'components/SettingsCategories';

import makeSelectSettingsPage from './selectors';
import * as Style from './index.style';

export class SettingsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>설정 - 플로바(Flova)</title>
          <meta name="description" content="설정 페이지입니다." />
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <Navbar transparent={false} />
        <Style.SettingsPageContainer>
          <Style.Grid width="250px">
            <SettingsCategories />
          </Style.Grid>
          <Style.Grid width="830px">
            <PasswordResetForm />
          </Style.Grid>
        </Style.SettingsPageContainer>
      </div>
    );
  }
}

SettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  SettingsPage: makeSelectSettingsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(SettingsPage));
