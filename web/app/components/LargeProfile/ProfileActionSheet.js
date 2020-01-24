import React from 'react';
import PropTypes from 'prop-types';
import ActionSheet from 'components/ActionSheet';
import { browserHistory } from 'react-router';

import * as Style from './ProfileActionSheet.style';

class ProfileActionSheet extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenInviteModal = this.handleOpenInviteModal.bind(this);
  }

  handleOpenInviteModal() {
    const isTouchDevice = document.body.className.match('touchDevice') != null;
    this.props.onClose();

    if (isTouchDevice) {
      browserHistory.push('/create_invitement');
    } else {
      this.props.onOpenInviteModal();
    }
  }

  render() {
    const { isOpened, onClose, onLogout } = this.props;
    return (
      <div>
        {
          isOpened ?
            <ActionSheet onClose={onClose} title="프로필">
              <Style.CustomLink to="/settings/profile">
                <Style.Item>
                  프로필 수정
                </Style.Item>
              </Style.CustomLink>
              <Style.CustomATag href="mailto:info@flova.kr">
                <Style.Item >
                    이메일로 문의하기
                </Style.Item>
              </Style.CustomATag>
              <Style.CustomATag target="_blank" href="http://pf.kakao.com/_dFxbHxl">
                <Style.Item >
                    플러스 친구
                </Style.Item>
              </Style.CustomATag>
              {/*<Style.CustomLink to="/settings/password">*/}
                {/*<Style.Item>*/}
                  {/*비밀번호 수정*/}
                {/*</Style.Item>*/}
              {/*</Style.CustomLink>*/}
              <Style.Item onClick={onLogout}>
                로그아웃
              </Style.Item>
            </ActionSheet>
            : null
        }
      </div>
    );
  }
}

ProfileActionSheet.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpenInviteModal: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default ProfileActionSheet;
