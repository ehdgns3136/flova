/*
 *
 * NotificationPage
 *
 */

import React from 'react';
import MediaQuery from 'react-responsive';
import Helmet from 'react-helmet';
// import PropTypes from 'prop-types';

import withAuthentication from 'hoc/withAuthentication';
import Navbar from 'global/containers/Navbar';
import MobileSimpleNavbar from 'global/containers/MobileSimpleNavbar';
import NotificationList from './NotificationList';


export class NotificationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>알림 - 플로바(Flova)</title>
          <meta name="description" content="알림 페이지입니다." />
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <MediaQuery minWidth={1008}>
          <Navbar transparent={false} />
        </MediaQuery>
        <MediaQuery maxWidth={1008}>
          <MobileSimpleNavbar title="알림" />
        </MediaQuery>
        <NotificationList />
      </div>
    );
  }
}

NotificationPage.propTypes = {
};


export default withAuthentication(NotificationPage);
