/**
 * Created by donghoon on 17. 11. 20.
 */
import React from 'react';
import onClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';
import * as Style from './index.style';

class Description extends React.Component {
  handleClickOutside(evt) {
    this.props.onDescriptionChangeToggle();
  }

  render() {
    return (
      <Style.CustomInput placeholder="자기소개를 입력해주세요." value={this.props.description} onChange={this.props.onDescriptionChange} autoFocus />
    );
  }
}

Description.propTypes = {
  onDescriptionChangeToggle: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  description: PropTypes.object.isRequired,
};

export default onClickOutside(Description);
