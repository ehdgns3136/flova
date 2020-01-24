/**
*
* TextCredentialWriteForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { Divider } from 'semantic-ui-react';
import * as Style from './index.style';

class TextCredentialWriteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      titleValidation: true,
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.credential) {
      this.setState({
        title: this.props.credential.get('title'),
      });
    }
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value,
    });
  }

  handleSubmit(event) {
    if (this.state.title) {
      this.props.onPostCredential(this.state, 'text');
      this.props.onClickCancel();
    }
    this.setState({
      titleValidation: false,
    });
  }

  render() {
    return (
      <Style.ListItemWrapper>
        <Style.FieldWrapper marginLeft="13px">
          <Style.FieldLabel>설명</Style.FieldLabel>
          <Style.FieldInput
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
        </Style.FieldWrapper>
        <Style.ErrorMessage hidden={this.state.titleValidation}>설명을 입력해주세요.</Style.ErrorMessage>
        <Style.Divider />
        <Style.ButtonGroup>
          <Style.SaveButton inverted onClick={this.handleSubmit}>변경내용 저장</Style.SaveButton>
          <Style.CancelButton inverted onClick={this.props.onClickCancel}>취소</Style.CancelButton>
        </Style.ButtonGroup>
      </Style.ListItemWrapper>
    );
  }
}

TextCredentialWriteForm.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  onPostCredential: PropTypes.func.isRequired,
  credential: PropTypes.object,
};

export default TextCredentialWriteForm;
