import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import MediaQuery from 'react-responsive';

import * as Style from './index.style';
import Clipboard from 'clipboard/dist/clipboard';

class CreateInvitement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      invitedName: '',
      isCopyError: false,
      isCopySuccess: false,
    };
    this.handleNextStep = this.handleNextStep.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMakeLink = this.handleMakeLink.bind(this);
    this.kakaoShare = this.kakaoShare.bind(this);

    this.clipboard = new Clipboard('#invitement_copy');
  }

  componentDidMount() {
    this.clipboard.on('success', (e) => {
      this.setState({
        isCopySuccess: true,
        isCopyError: false,
      });
      e.clearSelection();
    });

    this.clipboard.on('error', (e) => {
      this.setState({
        isCopySuccess: false,
        isCopyError: true,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.step === 0 && this.props.inviteKey !== nextProps.inviteKey) {
      this.handleNextStep();
    }
  }


  handleNextStep() {
    this.setState({
      step: 1,
    });
  }

  handleChange(e) {
    this.setState({
      invitedName: e.target.value,
    });
  }

  handleMakeLink() {
    this.props.onCreateInviteKeyRequest(this.state.invitedName);
  }

  kakaoShare() {
    const { inviteKey, loggedInUser } = this.props;
    const url = `${URL_ROOT}/invite/${inviteKey}`;
    const loggedInUsername = loggedInUser.get('name');

    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '초대장',
        description: `${loggedInUsername}님이 당신을 Flova에 초대하셨습니다.`,
        imageUrl: 'https://s3.ap-northeast-2.amazonaws.com/flova/flova_kakao_invitement_light.png',
        link: {
          webUrl: url,
          mobileWebUrl: url,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            webUrl: url,
            mobileWebUrl: url,
          },
        },
      ],
    });
  }

  renderInviteContent() {
    const { isLoading, inviteKey } = this.props;

    const makeUrl = (key) => `${URL_ROOT}/invite/${key}`;

    switch (this.state.step) {
      case 0:
        return (
          <div key={3}>
            <Style.Description>
              초대할 친구의 <strong>이름</strong>을 입력해주세요.
            </Style.Description>
            <Style.NameInput spellCheck={false} value={this.state.invitedName} onChange={this.handleChange} />
            <Style.MakeLinkButton onClick={this.handleMakeLink} isLoading={isLoading} >
              <div>
                {
                  isLoading ?
                    <i className="fa fa-spinner fa-spin" />
                    : <i className="fa fa-link" />
                }
                &nbsp;링크 만들기
              </div>
              </Style.MakeLinkButton>
          </div >
        );
      case 1:
        return (
          <div key={3}>
            <Style.SuccessMessage>
              <Style.CheckIcon className="fa fa-check" />
              <Style.SuccessMessageContent>
                {
                  this.state.isCopySuccess && !this.state.isCopyError ?
                    <div>
                      클립보드에 복사되었습니다.
                    </div>
                    : (
                      <div>
                        초대장 링크를 만드는 데 성공했습니다. <br />
                        친구에게 링크를 공유해주세요.
                      </div>
                    )
                }
              </Style.SuccessMessageContent>
            </Style.SuccessMessage>
            <Style.SemiHeader>링크</Style.SemiHeader>
            <MediaQuery minDeviceWidth={1025}>
              <Style.LinkBox>
                {makeUrl(inviteKey)}
              </Style.LinkBox>
              <Style.ButtonContainer>
                <Style.CopyButton className="clipboard" data-clipboard-text={makeUrl(inviteKey)}>
                  <i className="fa fa-copy" />&nbsp;
                  복사하기
              </Style.CopyButton>
              </Style.ButtonContainer>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1025}>
              <Style.MobileButton id="invitement_copy" type="copy" data-clipboard-text={makeUrl(inviteKey)}>
                <i className="fa fa-copy" />&nbsp;
                링크 복사하기
              </Style.MobileButton>
              <Style.MobileButton type="kakao" onClick={this.kakaoShare}>
                <i className="fa fa-comment" />&nbsp;
                카카오톡으로 공유
              </Style.MobileButton>
            </MediaQuery>
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <Style.Header key={1}>
          <i className="fa fa-envelope-o" /> <br />
          <span>Flova</span>에 <br />
          친구를 초대해보세요!
          </Style.Header>
        {this.renderInviteContent()}
      </div>
    );
  }
}

CreateInvitement.propTypes = {
  isLoading: PropTypes.bool,
  inviteKey: PropTypes.string,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onCreateInviteKeyRequest: PropTypes.func.isRequired,
};

export default CreateInvitement;
