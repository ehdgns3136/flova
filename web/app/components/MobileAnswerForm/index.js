/**
*
* MobileAnswerForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Immutable, { fromJS } from 'immutable';
import { createEmptyEditorState } from 'components/WonderEditor/utils/editor-state-utils';
import { Dimmer, Loader } from 'semantic-ui-react';
import WonderEditor from 'components/WonderEditor/WonderEditor';

import * as Style from './index.style';
import defaultProfileImg from '../../assets/default-profile.png';

class MobileAnswerForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const editorState = props.edit ? (
      props.initialContent ? fromJS(JSON.parse(props.initialContent)) : createEmptyEditorState()
    ) : (
      createEmptyEditorState()
    );

    this.state = {
      editorState,
    };

    this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEditorStateChange(newAnswerWriteEditorState) {
    this.setState({
      editorState: newAnswerWriteEditorState,
    });
  }

  handleSubmit() {
    const editorState = this.getFinalEditorState();
    this.props.submitAnswer(editorState);
  }

  render() {
    const { loggedInUser, isUploading, initialTitle } = this.props;
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
          <Style.TitleContainer>
            <Style.TitleQ>Q.</Style.TitleQ>
            <Style.Title >
              {initialTitle}
            </Style.Title>
          </Style.TitleContainer>
          {
            <Style.StyledUsername>
              {(loggedInUser.get('profile_image')) ? (
                <Style.UserAvatar src={loggedInUser.get('profile_image')} />
              ) : (
                <Style.UserAvatar src={defaultProfileImg} />
              )}
              {loggedInUser.get('name')} 님
            </Style.StyledUsername>
          }
        </Style.HeaderContainer>
        <WonderEditor
          placeholder="답변을 작성해주세요..."
          editorState={this.state.editorState}
          onEditorStateChange={this.handleEditorStateChange}
          getFinalEditorStateRef={(func) => { this.getFinalEditorState = func; }}
        />
        <Style.ButtonContainer>
          <Style.SubmitButton onClick={this.handleSubmit}>
            작성하기
          </Style.SubmitButton>
        </Style.ButtonContainer>
      </div>
    );
  }
}

MobileAnswerForm.propTypes = {
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  edit: PropTypes.bool,
  initialContent: PropTypes.string,
  initialTitle: PropTypes.string,
  isUploading: PropTypes.bool.isRequired,
  submitAnswer: PropTypes.func.isRequired,
};

export default MobileAnswerForm;
