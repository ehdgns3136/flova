/**
 *
 * QuestionFormModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Immutable, { fromJS } from 'immutable';
import { Modal, Icon, Message, Dimmer, Loader } from 'semantic-ui-react';
import {
  makeChainedValidateFunc,
  makeHandleFieldChange,
  makeValidateMaxLength,
  makeValidateMinLength,
} from 'utils/validation';
import WonderEditor from 'components/WonderEditor/WonderEditor';
import { createEmptyEditorState, isEditorStateEmpty } from 'components/WonderEditor/utils/editor-state-utils';
import TopicMultiSelect from 'components/TopicMultiSelect';

import * as Style from './index.style';

const TITLE_MAX_LENGTH = 200;

class QuestionEditFormModal extends React.Component { // eslint-disable-line react/prefer-stateless-functio
  constructor(props) {
    super(props);

    const editorState = props.initialContent ? fromJS(JSON.parse(props.initialContent)) : createEmptyEditorState();

    const topics = props.initialTopics ? props.initialTopics.map((topic) => ({
      value: topic.id,
      label: topic.title,
    })) : [];

    this.state = {
      contentFormOpened: !isEditorStateEmpty(editorState),
      title: props.initialTitle ? props.initialTitle : '',
      editorState,
      topics,
      validation: {
        title: props.initialTitle ? props.initialTitle.length < TITLE_MAX_LENGTH : false,
      },
      errorMessageOpened: false,
    };

    this.handleTitleChange = makeHandleFieldChange(
      'title',
      makeChainedValidateFunc([makeValidateMinLength(1), makeValidateMaxLength(TITLE_MAX_LENGTH)])
    ).bind(this);

    this.handleClose = this.handleClose.bind(this);
    this.openContentForm = this.openContentForm.bind(this);
    this.closeContentForm = this.closeContentForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
    this.handleTopicsChange = this.handleTopicsChange.bind(this);
  }

  handleClose() {
    const { onCloseRequest } = this.props;
    onCloseRequest();
  }

  openContentForm() {
    this.setState({
      contentFormOpened: true,
    });
  }

  handleValidation() {
    return Object.keys(this.state.validation).every((key) => (this.state.validation[key] === true));
  }

  closeContentForm() {
    this.setState({
      contentFormOpened: false,
    });
  }

  handleEditorStateChange(newEditorState) {
    this.setState({
      editorState: newEditorState,
    });
  }

  handleSubmit() {
    this.setState({
      errorMessageOpened: false,
    });
    if (this.handleValidation()) {
      const { title, topics } = this.state;

      const editorState = this.state.contentFormOpened ? this.getFinalEditorState() : createEmptyEditorState();
      this.props.requestEditQuestion(this.props.questionID, title, editorState, topics);
    } else {
      this.setState({
        errorMessageOpened: true,
      });
    }
  }

  renderValidationMessage() {
    const { validation } = this.state;

    return (
      <Message error>
        <Message.Header>오류</Message.Header>
        <Message.List>
          {
            !validation.title ?
              <Message.Item>질문 제목은 {TITLE_MAX_LENGTH}자 미만으로 작성해주세요.</Message.Item>
              : null
          }
        </Message.List>
      </Message >
    );
  }

  preventEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  handleTopicsChange(newTopics) {
    this.setState({
      topics: newTopics,
    });
  }

  render() {
    const { isUploading } = this.props;
    const { contentFormOpened, title, errorMessageOpened, topics } = this.state;

    return (
      <Modal open>
        {
          isUploading ?
            <Dimmer active inverted>
              <Loader inverted>업로딩 중입니다...</Loader>
            </Dimmer>
            : null
        }
        <Style.CloseIcon name="close" onClick={this.handleClose}></Style.CloseIcon>
        {
          errorMessageOpened && !this.handleValidation() ?
            this.renderValidationMessage()
            : null
        }
        <Style.TitleContent>
          Q. &nbsp;<Style.TitleTextarea placeholder="질문을 입력하세요..." value={title} onChange={this.handleTitleChange} onKeyDown={this.preventEnter} />
        </Style.TitleContent>
        <Style.EditorContainer>
          {
            contentFormOpened ?
              <WonderEditor
                placeholder="내용을 입력하세요..."
                editorState={this.state.editorState}
                onEditorStateChange={this.handleEditorStateChange}
                getFinalEditorStateRef={(func) => { this.getFinalEditorState = func; }}
              />
              : null
          }
        </Style.EditorContainer>
        <Style.Categories>
          <label htmlFor="topics-select">주제</label>
          <TopicMultiSelect
            value={topics}
            onChange={this.handleTopicsChange}
          />
        </Style.Categories>
        <Style.FlexActions>
          {
            contentFormOpened ?
              <Style.BasicButton basic onClick={this.closeContentForm}>
                내용 빼기
              </Style.BasicButton>
              :
              <Style.BasicButton basic onClick={this.openContentForm}>
                내용 추가
              </Style.BasicButton>
          }
          <Style.SubmitButton color='green' inverted onClick={this.handleSubmit}>
            <Icon name='checkmark' /> 수정완료
          </Style.SubmitButton>
        </Style.FlexActions>
      </Modal>
    );
  }
}

QuestionEditFormModal.propTypes = {
  onCloseRequest: PropTypes.func.isRequired,
  requestEditQuestion: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  questionID: PropTypes.number.isRequired,
  initialTitle: PropTypes.string.isRequired,
  initialContent: PropTypes.string.isRequired,
  initialTopics: PropTypes.array.isRequired,
};

export default QuestionEditFormModal;
