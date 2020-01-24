/**
*
* AnswerDetailQuestion
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Immutable, { fromJS } from 'immutable';
import {
  createEmptyEditorState,
  isEditorStateEmpty,
  safelyParseEditorStateString,
} from 'components/WonderEditor/utils/editor-state-utils';
import WonderEditorView from 'components/WonderEditor/WonderEditorView';

import * as Style from './index.style';

class AnswerDetailQuestion extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      editorState: this.props.question ? safelyParseEditorStateString(this.props.question.get('content')) : createEmptyEditorState(),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.question && nextProps.question !== this.props.question) {
      const editorState = safelyParseEditorStateString(nextProps.question.get('content'));

      this.setState({
        editorState,
      });
    }
  }

  isQuestionEmpty() {
    return isEditorStateEmpty(this.state.editorState);
  }

  render() {
    const { question } = this.props;
    const topics = question.get('topics');

    return (
      <div>
        <Style.CardMeta>
          {
            topics.map((category) =>
              <Style.TopicHeader key={category.get('id')} to={`/topic/${category.get('id')}`}>{category.get('title')}</Style.TopicHeader>
            )
          }
        </Style.CardMeta>
        <Style.CardHeaderWrapper to={`/question/${question.get('id')}`}>
          {`Q.${question.get('title')}`}
        </Style.CardHeaderWrapper>
        <Style.CardDescription>
          {
            (this.isQuestionEmpty()) ?
              null :
              <WonderEditorView
                editorState={this.state.editorState}
                readOnly
              />
          }
        </Style.CardDescription>
      </div>
    );
  }
}

AnswerDetailQuestion.propTypes = {
  question: PropTypes.instanceOf(Immutable.Map),
};

export default AnswerDetailQuestion;
