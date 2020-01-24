/**
 *
 * CredentialFormModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import CredentialForm from 'global/profile/CredentialForm';

import * as Style from './index.style';
// import styled from 'styled-components';


class CredentialFormModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      educationAdd: false,
      employmentAdd: false,
      textAdd: false,
    };
    this.onAddEducation = this.onAddEducation.bind(this);
    this.onAddEmployment = this.onAddEmployment.bind(this);
    this.onAddText = this.onAddText.bind(this);
    this.onCancelAddEducation = this.onCancelAddEducation.bind(this);
    this.onCancelAddEmployment = this.onCancelAddEmployment.bind(this);
    this.onCancelAddText = this.onCancelAddText.bind(this);
  }


  onAddEducation() {
    this.setState({
      educationAdd: true,
    });
  }

  onAddEmployment() {
    this.setState({
      employmentAdd: true,
    });
  }

  onAddText() {
    this.setState({
      textAdd: true,
    });
  }

  onCancelAddEducation() {
    this.setState({
      educationAdd: false,
    });
  }

  onCancelAddEmployment() {
    this.setState({
      employmentAdd: false,
    });
  }

  onCancelAddText() {
    this.setState({
      textAdd: false,
    });
  }

  render() {
    const { isCredentialFormModalOpened, onCloseModalRequest, isMine } = this.props;
    return (
      <Style.CustomModal open={isCredentialFormModalOpened} onClose={() => onCloseModalRequest()}>
        <Style.CloseIcon name="close" onClick={onCloseModalRequest} ></Style.CloseIcon>
        <Style.CustomHeader>상세 프로필</Style.CustomHeader>
        <Modal.Content>
          <CredentialForm
            isMine={isMine}
            educationAdd={this.state.educationAdd}
            employmentAdd={this.state.employmentAdd}
            textAdd={this.state.textAdd}
            onAddEducation={this.onAddEducation}
            onAddEmployment={this.onAddEmployment}
            onAddText={this.onAddText}
            onCancelAddEducation={this.onCancelAddEducation}
            onCancelAddEmployment={this.onCancelAddEmployment}
            onCancelAddText={this.onCancelAddText}
          />
        </Modal.Content>
      </Style.CustomModal>
    );
  }
}

CredentialFormModal.propTypes = {
  isCredentialFormModalOpened: PropTypes.bool.isRequired,
  onCloseModalRequest: PropTypes.func.isRequired,
  isMine: PropTypes.bool.isRequired,
};

export default CredentialFormModal;
