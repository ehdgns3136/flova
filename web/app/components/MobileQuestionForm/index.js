/**
*
* MobileQuestionForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Immutable, { fromJS } from 'immutable';
import { Modal, Icon, Message, Dimmer, Loader } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
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
import defaultProfileImg from '../../assets/default-profile.png';

const TITLE_MAX_LENGTH = 200;


class MobileQuestionForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const editorState = props.edit ? (
      props.initialContent ? fromJS(JSON.parse(props.initialContent)) : createEmptyEditorState()
    ) : (
      createEmptyEditorState()
    );

    const topics = props.edit ? (
      props.initialTopics ? props.initialTopics.map((topic) => ({
        value: topic.id,
        label: topic.title,
      })) : []
    ) : (
      []
    );

    this.state = {
      contentFormOpened: this.props.edit ? !isEditorStateEmpty(editorState) : false,
      title: this.props.initialTitle ? this.props.initialTitle : '',
      editorState,
      anonymous: false,
      topics: topics,
      validation: {
        title: this.props.initialTitle ? this.props.initialTitle.length < TITLE_MAX_LENGTH : false,
      },
      errorMessageOpened: false,
    };
    this.openContentForm = this.openContentForm.bind(this);
    this.closeContentForm = this.closeContentForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleTitleChange = makeHandleFieldChange(
      'title',
      makeChainedValidateFunc([makeValidateMinLength(1), makeValidateMaxLength(TITLE_MAX_LENGTH)])
    ).bind(this);

    this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
    this.handleAnonymousChange = this.handleAnonymousChange.bind(this);
    this.handleTopicsChange = this.handleTopicsChange.bind(this);
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
      const { title, anonymous, topics } = this.state;

      const editorState = this.state.contentFormOpened ? this.getFinalEditorState() : createEmptyEditorState();
      if(this.props.edit) {
        this.props.requestEditQuestion(this.props.questionID, title, editorState, topics);
        browserHistory.push(`/question/${this.props.questionID}`);
      } else {
        this.props.onPostQuestionRequest(title, editorState, anonymous, topics);
      }
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
              <Message.Item>질문 제목은 1자 이상 {TITLE_MAX_LENGTH}자 이하로 작성해주세요.</Message.Item>
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

  handleAnonymousChange(event) {
    this.setState({
      anonymous: event.target.checked,
    });
  }

  handleTopicsChange(newTopics) {
    this.setState({
      topics: newTopics,
    });
  }

  render() {
    const { loggedInUser, isUploading } = this.props;
    const { contentFormOpened, title, errorMessageOpened, topics } = this.state;

    return (
      <div>
        {
          isUploading ?
            <Dimmer active inverted>
              <Loader inverted>업로딩 중입니다...</Loader>
            </Dimmer>
            : null
        }
        <Style.HeaderContainer>
          {
            this.props.edit ? (
              null
            ) : (
              this.state.anonymous ?
                <Style.StyledUsername>
                  <Style.UserAvatar src={defaultProfileImg} />
                  익명의 유저 님
                </Style.StyledUsername>
                :
                <Style.StyledUsername>
                  {(loggedInUser.get('profile_image')) ? (
                    <Style.UserAvatar src={loggedInUser.get('profile_image')} />
                  ) : (
                    <Style.UserAvatar src={defaultProfileImg} />
                  )}
                  {loggedInUser.get('name')} 님
                </Style.StyledUsername>
            )
          }
          {
            errorMessageOpened && !this.handleValidation() ?
              this.renderValidationMessage()
              : null
          }
          <Style.TitleContainer>
            <Style.TitleQ>Q.</Style.TitleQ>
            <Style.TitleTextarea placeholder="질문을 입력하세요..." value={title} onChange={this.handleTitleChange} onKeyDown={this.preventEnter} />
          </Style.TitleContainer>
        </Style.HeaderContainer>
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
          <Style.TopicLabel>주제</Style.TopicLabel>
          <TopicMultiSelect
            value={topics}
            onChange={this.handleTopicsChange}
          />
        </Style.Categories>
        <Style.FlexActions>
          {
            this.props.edit ? (
              <Style.LeftActions>
              </Style.LeftActions>
            ) : (
              <Style.LeftActions>
                <Style.AnonymousCheckbox type="checkbox" id="anonymous" checked={this.state.anonymous} onChange={this.handleAnonymousChange} />
                <Style.PointerLabel htmlFor="anonymous">익명으로 질문하기</Style.PointerLabel>
              </Style.LeftActions>
            )
          }
          <Style.ButtonGroup>
            {
              contentFormOpened ?
                <Style.BasicButton onClick={this.closeContentForm}>
                  내용 빼기
                </Style.BasicButton>
                :
                <Style.BasicButton onClick={this.openContentForm}>
                  내용 추가
                </Style.BasicButton>
            }
            {
              this.props.edit ? (
                <Style.SubmitButton onClick={this.handleSubmit}>
                  수정하기
                </Style.SubmitButton>
              ) : (
                <Style.SubmitButton onClick={this.handleSubmit}>
                  질문하기
                </Style.SubmitButton>
              )
            }
          </Style.ButtonGroup>
        </Style.FlexActions>
      </div>
    );
  }
}

MobileQuestionForm.propTypes = {
  loggedInUser: PropTypes.instanceOf(Immutable.Map).isRequired,
  onPostQuestionRequest: PropTypes.func,
  requestEditQuestion: PropTypes.func,
  isUploading: PropTypes.bool.isRequired,
  edit: PropTypes.bool,
  questionID: PropTypes.number,
  initialTitle: PropTypes.string,
  initialContent: PropTypes.string,
  initialTopics: PropTypes.array,
};

export default MobileQuestionForm;
