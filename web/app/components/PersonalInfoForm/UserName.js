/**
 * Created by donghoon on 17. 11. 20.
 */
import React from 'react';
import onClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';
import * as Style from './index.style';

class UserName extends React.Component {
  handleClickOutside(evt) {
    this.props.onNameChangeToggle();
  }

  render() {
    return (
      <Style.CustomInput placeholder="이름을 입력해주세요" value={this.props.userName} onChange={this.props.onNameChange} autoFocus />
    );
  }
}

UserName.propTypes = {
  onNameChangeToggle: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  userName: PropTypes.object.isRequired,
};

export default onClickOutside(UserName);
