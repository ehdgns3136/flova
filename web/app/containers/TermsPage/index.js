/*
 *
 * TermsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Navbar from 'global/containers/Navbar';
import WonderEditorView from 'components/WonderEditor/WonderEditorView';
import {
  createEmptyEditorState,
  safelyParseEditorStateString,
} from 'components/WonderEditor/utils/editor-state-utils';

import * as Style from './index.style';
import { terms, privacy } from '../../terms';

export class TermsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      editorState: createEmptyEditorState(),
    };
  }

  componentDidMount() {
    const editorState = safelyParseEditorStateString(this.getContent(this.props.params.subpath));
    this.setState({
      editorState,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.subpath !== this.props.params.subpath) {
      const editorState = safelyParseEditorStateString(this.getContent(nextProps.params.subpath));
      this.setState({
        editorState,
      });
    }
  }

  getTitle(subpath) {
    switch (subpath) {
      case 'terms':
        return '이용약관';
      case 'privacy':
        return '개인정보처리방침';
      default:
        return '';
    }
  }

  getTitleForTab(subpath) {
    switch (subpath) {
      case 'terms':
        return '이용약관 - 플로바(Flova)';
      case 'privacy':
        return '개인정보처리방침 - 플로바(Flova)';
      default:
        return '플로바(Flova)';
    }
  }

  getContent(subpath) {
    switch (subpath) {
      case 'terms':
        return terms;
      case 'privacy':
        return privacy;
      default:
        return '';
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{this.getTitleForTab(this.props.params.subpath)}</title>
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <Navbar transparent={false} />
        <Style.EditorViewContainer>
          <Style.Header>{this.getTitle(this.props.params.subpath)}</Style.Header>
          <WonderEditorView
            editorState={this.state.editorState}
            readOnly
          />
        </Style.EditorViewContainer>
      </div>
    );
  }
}

TermsPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default TermsPage;
