/*
 *
 * MobileQuestionEditPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';

import withAuthentication from 'hoc/withAuthentication';
import Navbar from 'global/containers/Navbar';
import MobileSimpleNavbar from 'global/containers/MobileSimpleNavbar';
import MobileQuestionEditForm from 'global/containers/MobileQuestionEditForm';

import * as Style from './index.style';

export class MobileQuestionEditPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>질문 수정 - 플로바(Flova)</title>
          <meta name="description" content="질문 수정 페이지입니다." />
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <MediaQuery minWidth={1008}>
          <Navbar transparent={false} />
        </MediaQuery>
        <MediaQuery maxWidth={1008}>
          <MobileSimpleNavbar title="질문 수정" />
        </MediaQuery>
        <Style.Container>
          <MobileQuestionEditForm edit />
        </Style.Container>
      </div>
    );
  }
}

MobileQuestionEditPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default withAuthentication(connect(null, mapDispatchToProps)(MobileQuestionEditPage));
