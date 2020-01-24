import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import * as Style from './MobileLinkFormModal.style';


class MobileLinkFormModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.handleUrlInputChange = this.handleUrlInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      url: this.props.overlappedUrl || '',
    });
  }

  handleClickOutside(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this.props.closeMobileLinkFormModal();
  }

  handleModalClick(evt) {
    evt.stopPropagation();
  }

  handleUrlInputChange(evt) {
    this.setState({
      url: evt.target.value,
    });
  }

  handleKeyDown(evt) {
    if (evt.which === 13) {
      this.handleSubmit(evt);
    }
  }

  handleCancelButtonClick(evt) {
    evt.preventDefault();

    this.props.closeMobileLinkFormModal();
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.props.onSubmit(this.state.url);
    this.props.closeMobileLinkFormModal();
  }

  render() {
    return (
      <Style.ModalContainer onClick={this.handleModalClick}>
        <Style.LinkFormContainer onSubmit={this.handleSubmit}>
          <Style.Label>주소</Style.Label>
          <Style.UrlInput
            autoFocus
            placeholder="http://"
            type="text"
            value={this.state.url}
            onChange={this.handleUrlInputChange}
            onKeyDown={this.handleKeyDown}
          />
          <Style.ActionContainer>
            <Style.ActionButton desaturateColor onClick={this.handleCancelButtonClick}>취소</Style.ActionButton>
            <Style.ActionButton type="submit">확인</Style.ActionButton>
          </Style.ActionContainer>
        </Style.LinkFormContainer>
      </Style.ModalContainer>
    );
  }
}

MobileLinkFormModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  overlappedUrl: PropTypes.string,
  closeMobileLinkFormModal: PropTypes.func.isRequired,
};

export default onClickOutside(MobileLinkFormModal);
