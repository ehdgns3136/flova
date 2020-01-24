/**
*
* AnswerForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import AnswerWriterInfo from 'components/AnswerWriterInfo';
import WonderEditor from 'components/WonderEditor/WonderEditor';

import * as Style from './index.style';

class AnswerWriteForm extends React.Component {
  constructor(props) {
    super(props);

    this.submitAnswer = this.submitAnswer.bind(this);
    this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  submitAnswer() {
    const editorState = this.getFinalEditorState();

    this.props.onSubmit(editorState);
  }

  handleEditorStateChange(newEditorState) {
    this.props.onEditorStateChange(newEditorState);
  }

  cancel() {
    this.props.onCancel();
  }

  render() {
    return (
      <div>
        <Style.WriterInfoContainer>
          <AnswerWriterInfo
            answerWriter={this.props.answerWriter}
            showCreated={false}
            disableProfilePopup
          />
        </Style.WriterInfoContainer>
        <WonderEditor
          placeholder="답변을 작성해주세요..."
          editorState={this.props.editorState}
          onEditorStateChange={this.handleEditorStateChange}
          getFinalEditorStateRef={(func) => { this.getFinalEditorState = func; }}
        />
        <Style.ActionContainer>
          {
            this.props.isModifying ? (
              <Style.Action desaturateColor onClick={this.cancel}>수정 취소</Style.Action>
            ) : null
          }
          <Style.Action onClick={this.submitAnswer}>{(this.props.isModifying) ? '수정 완료' : '답변 등록'}</Style.Action>
        </Style.ActionContainer>
      </div>
    );
  }
}

AnswerWriteForm.defaultProps = {
  isModifying: false,
};

AnswerWriteForm.propTypes = {
  answerWriter: PropTypes.object,
  editorState: PropTypes.instanceOf(Immutable.List).isRequired,
  onEditorStateChange: PropTypes.func.isRequired,
  isModifying: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default AnswerWriteForm;
