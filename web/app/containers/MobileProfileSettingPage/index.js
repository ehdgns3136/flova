/*
 *
 * MobileProfileSettingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import { createStructuredSelector } from 'reselect';

import withAuthentication from 'hoc/withAuthentication';
import Navbar from 'global/containers/Navbar';
import MobileSimpleNavbar from 'global/containers/MobileSimpleNavbar';
import { Loader } from 'semantic-ui-react';

import PersonalInfoForm from './PersonalInfoForm';
import * as Style from './index.style';
import { makeSelectIsMobileProfileSettingPageLoading } from './selectors';

export class MobileProfileSettingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>프로필 수정 - 플로바(Flova)</title>
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <MediaQuery minWidth={1008}>
          <Navbar transparent={false} />
        </MediaQuery>
        <MediaQuery maxWidth={1008}>
          <MobileSimpleNavbar title="프로필 수정" />
        </MediaQuery>
        {
          (this.props.isMobileProfileSettingPageLoading) ? (
            <Style.MessageContainer>
              <Loader active size="huge" />
            </Style.MessageContainer>
          ) : (
            <Style.PersonalInfoFormContainer>
              <PersonalInfoForm page="MobileProfileSettingPage" />
            </Style.PersonalInfoFormContainer>
          )
        }
      </div>
    );
  }
}

MobileProfileSettingPage.propTypes = {
  isMobileProfileSettingPageLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isMobileProfileSettingPageLoading: makeSelectIsMobileProfileSettingPageLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(MobileProfileSettingPage));
