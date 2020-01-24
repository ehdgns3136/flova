/*
 *
 * MobileAnswerWritePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import { createStructuredSelector } from 'reselect';
import Immutable from 'immutable';
import { browserHistory } from 'react-router';

import withAuthentication from 'hoc/withAuthentication';
import Navbar from 'global/containers/Navbar';
import MobileSimpleNavbar from 'global/containers/MobileSimpleNavbar';
import MobileAnswerForm from 'components/MobileAnswerForm';
import { getEditorStateLength } from 'components/WonderEditor/utils/editor-state-utils';

import * as Style from './index.style';

import {
  makeSelectLoggedInUser,
} from '../../global/selectors';

import {
  makeSelectIsAnswerUploading,
  makeSelectInitialTitle,
} from '../../global/models/answer/selectors';

import {
  postAnswerRequest,
} from '../../global/models/answer/actions';

import { openAnnounceModalRequestAction } from '../../global/actions';

export class MobileAnswerWritePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(editorState) {
    if (getEditorStateLength(editorState) <= 50) {
      this.props.onOpenAnnounceModalRequest('over50Character');
    } else {
      this.props.onPostAnswerRequest(editorState, this.props.params.id);
      browserHistory.push(`/question/${this.props.params.id}`);
    }
  }

  render() {
    const { loggedInUser, isUploading, initialTitle } = this.props;

    return (
      <div>
        <Helmet>
          <title>답변 작성 - 플로바(Flova)</title>
          <meta name="description" content="답변 작성 페이지입니다." />
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <MediaQuery minWidth={1008}>
          <Navbar transparent={false} />
        </MediaQuery>
        <MediaQuery maxWidth={1008}>
          <MobileSimpleNavbar title="답변 작성" />
        </MediaQuery>
        <Style.Container>
          <MobileAnswerForm
            loggedInUser={loggedInUser}
            submitAnswer={this.handleSubmit}
            isUploading={isUploading}
            initialTitle={initialTitle}
          />
        </Style.Container>
      </div>
    );
  }
}

MobileAnswerWritePage.propTypes = {
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  params: PropTypes.object,
  onPostAnswerRequest: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  initialTitle: PropTypes.string.isRequired,
  onOpenAnnounceModalRequest: PropTypes.func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  loggedInUser: makeSelectLoggedInUser(),
  isUploading: makeSelectIsAnswerUploading(),
  initialTitle: makeSelectInitialTitle(),
});

function mapDispatchToProps(dispatch) {
  return {
    onPostAnswerRequest: (editorState, questionID) => {
      dispatch(postAnswerRequest(editorState, questionID));
    },
    onOpenAnnounceModalRequest: (announceType) => {
      dispatch(openAnnounceModalRequestAction(announceType));
    },
  };
}

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(MobileAnswerWritePage));
