import React from 'react';
import PropTypes from 'prop-types';

import CustomPopup from 'components/CustomPopup';

import * as Style from './LinkForm.style';


class LinkForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
    };

    this.handleOpenStateChange = this.handleOpenStateChange.bind(this);
    this.handleUrlInputChange = this.handleUrlInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpenStateChange(isOpen) {
    if (isOpen) {
      this.setState({
        url: this.props.overlappedUrl || '',
      });
    }
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

  handleCancelButtonClick() {
    this.changeOpenStateFunc(false);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.props.onSubmit(this.state.url);
    this.changeOpenStateFunc(false);
  }

  render() {
    return (
      <CustomPopup
        wrapElement={<span />}
        trigger={<Style.Action title="링크" isHighlight={this.props.overlappedUrl ? true : false} ><Style.LinkIcon name="linkify" /></Style.Action>}
        arrowPositionRight="15px"
        marginTop="6px"
        changeOpenStateFunctionRef={(func) => { this.changeOpenStateFunc = func; }}
        onOpenStateChange={this.handleOpenStateChange}
      >
        <Style.LinkFormContainer onSubmit={this.handleSubmit}>
          <Style.Label>주소</Style.Label>
          <Style.UrlInput placeholder="http://" type="text" value={this.state.url} onChange={this.handleUrlInputChange} onKeyDown={this.handleKeyDown}></Style.UrlInput>
          <Style.ActionContainer>
            <Style.ActionButton desaturateColor onClick={this.handleCancelButtonClick}>취소</Style.ActionButton>
            <Style.ActionButton type="submit">확인</Style.ActionButton>
          </Style.ActionContainer>
        </Style.LinkFormContainer>
      </CustomPopup>
    );
  }
}

LinkForm.propTypes = {
  onSubmit: PropTypes.func,
  overlappedUrl: PropTypes.string,
};

export default LinkForm;
