/**
 * Created by donghoon on 17. 11. 14.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ActionSheet from 'components/ActionSheet';
import { Icon } from 'semantic-ui-react';

import * as Style from './ShareButtonActionSheet.style';

class ShareButtonActionSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({
      isOpened: true,
    });
  }

  handleClose() {
    this.setState({
      isOpened: false,
    });
  }

  render() {
    const { isOpened } = this.state;
    const { onFacebookShare, onKakaoShare, icon, answer } = this.props;
    const isKakaoAvailable = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)/i);

    return (
      <Style.Wrapper>
        {
          icon ? (
            <Style.IconButton onClick={this.handleOpen}>
              <i className="fa fa-share" />
            </Style.IconButton>
          ) : (
            <Style.Button onClick={this.handleOpen}>
              <Icon name="share" />
              <div className="underline">
                공유하기
              </div>
            </Style.Button>
          )
        }
        {
          isOpened ?
            <ActionSheet onClose={this.handleClose} title={answer ? '답변 공유하기' : '질문 공유하기'}>
              <div>
                <Style.Item onClick={onFacebookShare}>
                  <Style.FacebookIcon className="fa fa-facebook" />
                  페이스북 공유
                </Style.Item>
                {
                  isKakaoAvailable ?
                    <Style.Item onClick={onKakaoShare}>
                      <Style.KakaoIcon className="fa fa-comment" />
                      카카오톡 공유
                    </Style.Item>
                    : null
                }
                <Style.Item className="clipboard" data-clipboard-text={this.props.url}>
                  링크 복사하기
                </Style.Item>
              </div>
            </ActionSheet>
            : null
        }
      </Style.Wrapper>
    );
  }
}

ShareButtonActionSheet.propTypes = {
  onFacebookShare: PropTypes.func.isRequired,
  onKakaoShare: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  icon: PropTypes.bool,
  answer: PropTypes.object,
};

export default ShareButtonActionSheet;
