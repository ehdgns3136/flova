/**
*
* ShareButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import CustomPopup from 'components/CustomPopup';
import MediaQuery from 'react-responsive';
import Immutable from 'immutable';
import * as Style from './index.style';
import { facebookShare, kakaoShareQuestion, kakaoShareAnswer } from '../../utils/share';
import ShareButtonActionSheet from './ShareButtonActionSheet';


class ShareButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.kakaoShare = this.kakaoShare.bind(this);
  }

  kakaoShare() {
    if (!this.props.answer) {
      kakaoShareQuestion(this.props.question);
    } else {
      kakaoShareAnswer(this.props.question, this.props.answer);
    }
  }

  render() {
    const isKakaoAvailable = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)/i);

    return (
      <div>
        <MediaQuery minWidth={1008}>
          <CustomPopup
            closeOnInsideClick
            wrapElement={<div />}
            trigger={
              <Style.Button>
                <Icon name="share" />
                <div className="underline">
                  공유하기
                </div>
              </Style.Button>
            }
            arrowPositionRight="55px"
            marginTop="10px"
          >
            <Style.PopupContent>
              <Style.BlockA onClick={() => facebookShare(this.props.url)}>
                <Icon name="facebook square" />
                페이스북 공유
              </Style.BlockA>
              {
                isKakaoAvailable ?
                  <Style.BlockA onClick={this.kakaoShare} >
                    <Icon name="talk" />
                    카카오톡 공유
                  </Style.BlockA>
                  : null
              }
              <Style.BlockA className="clipboard" data-clipboard-text={this.props.url} >
                <Icon name="linkify" />
                링크 복사하기
              </Style.BlockA>
            </Style.PopupContent>
          </CustomPopup>
        </MediaQuery>
        <MediaQuery maxWidth={1008}>
          <ShareButtonActionSheet
            onFacebookShare={() => facebookShare(this.props.url)}
            onKakaoShare={this.kakaoShare}
            url={this.props.url}
            icon={this.props.icon}
            answer={this.props.answer}
          />
        </MediaQuery>
      </div>
    );
  }
}

ShareButton.propTypes = {
  question: PropTypes.instanceOf(Immutable.Map),
  answer: PropTypes.instanceOf(Immutable.Map),
  url: PropTypes.string.isRequired,
  icon: PropTypes.bool,
};

export default ShareButton;
