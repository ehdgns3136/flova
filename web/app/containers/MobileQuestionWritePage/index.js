/*
 *
 * MobileQuestionWritePage
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
import MobileQuestionWriteForm from 'global/containers/MobileQuestionWriteForm';

import * as Style from './index.style';

export class MobileQuestionWritePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>질문 작성 - 플로바(Flova)</title>
          <meta name="description" content="질문 작성 페이지입니다." />
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <MediaQuery minWidth={1008}>
          <Navbar transparent={false} />
        </MediaQuery>
        <MediaQuery maxWidth={1008}>
          <MobileSimpleNavbar title="질문 작성" />
        </MediaQuery>
        <Style.Container>
          <MobileQuestionWriteForm />
        </Style.Container>
      </div>
    );
  }
}

MobileQuestionWritePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default withAuthentication(connect(null, mapDispatchToProps)(MobileQuestionWritePage));
