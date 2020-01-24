import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import * as Style from './AvatarPopup.style';


class AvatarPopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.onLogout();
  }

  render() {
    return (
      <Style.AvatarPopupContainer>
        <Style.AvatarPopupItem to={`/user/${this.props.loggedInUser.get('id')}`}>프로필</Style.AvatarPopupItem>
        {/*<Style.AvatarPopupItem to="/settings">설정</Style.AvatarPopupItem>*/}
        <Style.AvatarPopupItem onClick={this.handleLogout} >로그아웃</Style.AvatarPopupItem>
        <Style.AvatarPopupFooter>
          <Style.MetaList>
            <li>
              <div>&copy; 2017 Flova</div>
              <a href="mailto:info@flova.kr">Contact</a>
              <a target="_blank" href="http://pf.kakao.com/_dFxbHxl">플러스친구</a>
              <a target="_blank" href="https://www.facebook.com/flova.kr">Facebook</a>
            </li>
          </Style.MetaList>
        </Style.AvatarPopupFooter>
      </Style.AvatarPopupContainer>
    );
  }
}

AvatarPopup.propTypes = {
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onLogout: PropTypes.func.isRequired,
};

export default AvatarPopup;
